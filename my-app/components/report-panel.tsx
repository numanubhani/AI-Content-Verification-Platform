"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from "recharts";

type Result = {
  label: string;
  trust_score: number;
  details: Record<string, string[]>;
};

export function ReportPanel({
  kind,
  originalText,
  result,
}: {
  kind: "text" | "image" | "video";
  originalText?: string;
  result: Result;
}) {
  const [explain, setExplain] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [provenance, setProvenance] = useState<null | { matches: Array<{ source: string; confidence: number }> }>(null);
  const [certificate, setCertificate] = useState(false);
  const trust = result.trust_score;

  const radialData = useMemo(() => [{ name: "AI", value: trust }], [trust]);
  const COLORS = ["#8b5cf6", "#ff0eb0", "#f59e0b"]; 

  const signals = useMemo(() => {
    // Flatten details into a simple list for display; expect keys like 'text', 'image', 'video'
    const key = kind;
    return result.details?.[key] || result.details?.general || [];
  }, [result, kind]);

  const highlightedText = useMemo(() => {
    if (!originalText || !explain) return null;
    const suspicious = result.details?.text || [];
    if (!suspicious.length) return originalText;
    try {
      // Build a regex to wrap suspicious phrases; escape special chars
      const escaped = suspicious
        .filter(Boolean)
        .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
      if (!escaped) return originalText;
      const re = new RegExp(`(${escaped})`, "gi");
      const parts = originalText.split(re);
      return parts.map((p, i) =>
        re.test(p) ? (
          <mark key={i} className="rounded px-0.5 bg-yellow-200 text-foreground">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      );
    } catch {
      return originalText;
    }
  }, [originalText, explain, result]);

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getScoreLabel(score: number) {
    if (score >= 80) return 'Likely Human';
    if (score >= 50) return 'Mixed Content';
    return 'Likely AI-Generated';
  }

  // Custom tooltip that only shows the trust percentage (avoid confusing 0/value pairs)
  const TrustTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const v = payload[0]?.value ?? trust;
    return (
      <div className="rounded-md border bg-white px-2.5 py-1.5 text-xs shadow-sm dark:bg-gray-900">
        <div className="font-medium">Trust</div>
        <div className="text-foreground/70">{Math.round(Number(v))}%</div>
      </div>
    );
  };

  function generateFingerprint() {
    // Simple deterministic hash for demo purposes
    const data = `${kind}:${originalText || ''}:${result.label}:${result.trust_score}`;
    let h = 2166136261;
    for (let i = 0; i < data.length; i++) {
      h ^= data.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    setFingerprint((h >>> 0).toString(16));
  }

  function mockProvenanceLookup() {
    // Frontend-only placeholder: show example reverse-search hits
    setProvenance({
      matches: [
        { source: 'StockImagePortal.com/asset/12345', confidence: 92 },
        { source: 'ExampleNews.org/article/ai-edited-photo', confidence: 71 }
      ]
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="mb-4 text-sm font-medium text-foreground/70">Trust Score</div>
          <div className="relative mx-auto h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Trust', value: trust }]}> 
                <RadialBar 
                  background 
                  dataKey="value" 
                  fill="#8b5cf6" 
                  cornerRadius={12}
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(139, 92, 246, 0.3))' }}
                />
                <Tooltip content={<TrustTooltip />} cursor={false} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className={`text-4xl font-bold ${getScoreColor(trust)}`}>{trust}%</div>
              <div className="text-sm font-medium mt-1">{getScoreLabel(trust)}</div>
              <div className="text-xs text-foreground/70 mt-1">Human-made confidence</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="mb-3 text-sm font-medium text-foreground/70">Reasoning</div>
          {signals.length === 0 ? (
            <div className="text-sm text-foreground/60">No noteworthy signals found.</div>
          ) : (
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
              {signals.slice(0, 6).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
          {kind === "text" && (
            <div className="mt-4">
              <button
                onClick={() => setExplain((v) => !v)}
                className="rounded-full border-2 border-purple-600/30 px-3 py-1 text-sm font-medium text-purple-600 hover:bg-purple-600/10"
              >
                {explain ? "Hide Explainability" : "Explainability Mode"}
              </button>
              {explain && originalText && (
                <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-purple-600/20 bg-purple-50/30 p-3 text-sm dark:bg-purple-950/20">
                  {highlightedText}
                </div>
              )}
            </div>
          )}

          {/* Image heatmap placeholder */}
          {kind === 'image' && (
            <div className="mt-4">
              <div className="rounded-xl border border-purple-600/20 bg-purple-50/30 p-3 text-sm dark:bg-purple-950/20">
                <div className="mb-2 font-medium">Explainability Mode (Preview)</div>
                <div className="h-40 rounded-lg bg-gradient-to-br from-purple-200/60 to-pink-200/60 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-foreground/60">
                  Heatmap overlay placeholder
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Provenance + Fingerprint actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="mb-3 text-sm font-medium text-foreground/70">Source Provenance</div>
          <button onClick={mockProvenanceLookup} className="rounded-full border-2 border-purple-600/30 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-600/10">
            {kind === 'image' ? 'Reverse image search' : 'Check provenance'}
          </button>
          {provenance && (
            <div className="mt-3 space-y-2 text-sm">
              {provenance.matches.map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-purple-600/10 bg-purple-50/30 p-2 dark:bg-purple-950/20">
                  <span className="truncate pr-3">{m.source}</span>
                  <span className="font-semibold text-purple-600">{m.confidence}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="mb-3 text-sm font-medium text-foreground/70">AI Fingerprint</div>
          <button onClick={generateFingerprint} className="rounded-full border-2 border-purple-600/30 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-600/10">
            Generate fingerprint
          </button>
          {fingerprint && (
            <div className="mt-3 rounded-lg border border-purple-600/10 bg-purple-50/30 p-3 font-mono text-xs dark:bg-purple-950/20">
              {fingerprint}
            </div>
          )}
          {fingerprint && (
            <div className="mt-4">
              <button onClick={() => setCertificate(true)} className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">Issue authenticity certificate</button>
            </div>
          )}
          {certificate && fingerprint && (
            <div className="mt-4 rounded-2xl border p-4 text-sm">
              <div className="font-semibold mb-1">Certificate of Authenticity</div>
              <div>Fingerprint: <span className="font-mono">{fingerprint}</span></div>
              <div>Issued: {new Date().toLocaleString()}</div>
              <div>Label: {result.label}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


