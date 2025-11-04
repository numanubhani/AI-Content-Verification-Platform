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

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="mb-4 text-sm font-medium text-foreground/70">Trust Score</div>
          <div className="mx-auto h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData}>
                <RadialBar dataKey="value" fill="#8b5cf6" cornerRadius={12} background />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center text-3xl font-bold text-purple-600">{trust}%</div>
          <div className="text-center text-sm text-foreground/60">Higher means more likely AI-assisted</div>
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
        </div>
      </div>
    </div>
  );
}


