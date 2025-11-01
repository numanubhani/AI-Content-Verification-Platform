"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Info, AlertTriangle, CheckCircle, TrendingDown, Copy, Download } from "lucide-react";

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [copied, setCopied] = useState(false);

  const trust = 74;
  
  const breakdown = [
    { name: "Text", value: 45, signals: ["Repetition anomalies", "GPT-like phrasing", "Perplexity variations"] },
    { name: "Image", value: 30, signals: ["Low EXIF data", "GAN noise patterns", "Inconsistent lighting"] },
    { name: "Video", value: 25, signals: ["Synthetic speech patterns", "Frame inconsistencies", "Audio-visual mismatch"] },
  ];

  const COLORS = ["#8b5cf6", "#ff0eb0", "#f59e0b"]; 

  const radialData = useMemo(() => [{ name: "Human", value: 100 - trust }, { name: "AI", value: trust }], [trust]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Likely Human";
    if (score >= 50) return "Mixed Content";
    return "Likely AI-Generated";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Verification Report</h1>
        <p className="text-lg text-foreground/70">Detailed analysis of content authenticity</p>
      </div>

      {/* Main Score Display */}
      <div className="grid gap-6 rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-8 md:grid-cols-2">
        <div className="relative flex items-center justify-center">
          <div className="h-72 w-72">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "score", value: trust }]}> 
                <RadialBar 
                  background 
                  dataKey="value" 
                  fill="#8b5cf6" 
                  cornerRadius={12}
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(139, 92, 246, 0.3))' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className={`text-5xl font-bold ${getScoreColor(trust)}`}>{trust}%</div>
            <div className="text-base font-medium mt-1">{getScoreLabel(trust)}</div>
            <div className="text-sm text-foreground/70 mt-2">Human-made confidence</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Report ID</p>
            <p className="text-lg font-bold">#{id}</p>
          </div>
          <div className="rounded-xl bg-purple-600/10 p-4 border border-purple-600/20">
            <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Classification Label</p>
            <p className="text-lg font-semibold flex items-center gap-2">
              {trust >= 80 ? <CheckCircle className="h-5 w-5 text-green-600" /> : 
               trust >= 50 ? <AlertTriangle className="h-5 w-5 text-yellow-600" /> : 
               <TrendingDown className="h-5 w-5 text-red-600" />}
              Partially AI-assisted
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Summary</p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Mixed human and AI signals detected across multiple modalities. The content shows characteristics of 
              both authentic human-created material and AI-generated elements, suggesting collaborative or edited creation.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="flex-1 rounded-full border-2 border-purple-600/30 bg-white px-4 py-2.5 text-purple-600 hover:bg-purple-600/10 transition-all font-medium">
              Re-analyze
            </button>
            <button 
              onClick={handleCopyLink}
              className="flex-1 rounded-full bg-purple-600 px-4 py-2.5 text-white hover:bg-purple-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Share"}
            </button>
            <button className="rounded-full border-2 border-purple-600/30 bg-white px-4 py-2.5 text-purple-600 hover:bg-purple-600/10 transition-all">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Content Distribution</h2>
            <Info className="h-5 w-5 text-foreground/40" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={radialData} 
                  outerRadius={90} 
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {radialData.map((_, index) => (
                    <Cell 
                      key={index} 
                      fill={index === 0 ? "#8b5cf6" : "#ff0eb0"}
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Signal Breakdown</h2>
            <Info className="h-5 w-5 text-foreground/40" />
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={breakdown} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#8b5cf6">
                  {breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Signal Details Section */}
      <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold mb-4">Detailed Signal Analysis</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {breakdown.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-purple-600/10 p-4 bg-purple-50/30 dark:bg-purple-950/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center gap-1">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  >
                    {item.value}%
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {item.signals.map((signal, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
                    <span className="text-foreground/70">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability Section */}
      <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">AI Explainability</h2>
          <div className="group relative">
            <Info className="h-5 w-5 text-foreground/40 cursor-help" />
            <div className="absolute left-full top-0 ml-2 w-64 p-3 bg-foreground text-background rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
              This section highlights specific AI-generated patterns found in your content to help you understand the verification results.
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" style={{ color: '#ff0eb0' }} />
                <span className="font-semibold text-sm">GPT-like Phrasing Detected</span>
              </div>
              <p className="text-sm text-foreground/70 mb-3">
                The following content patterns match characteristics commonly found in AI-generated text:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-yellow-600">→</span>
                  <span>Overly formal or structured language patterns</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-yellow-600">→</span>
                  <span>Repetitive sentence structures</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-yellow-600">→</span>
                  <span>Lack of conversational tone or natural variation</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-purple-600/30 bg-white dark:bg-gray-800 p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs" style={{ backgroundColor: '#ff0eb0' }}>!</span>
                Confidence Score Breakdown
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-foreground/70">Text Analysis</span>
                    <span className="text-xs font-semibold">{breakdown[0].value}%</span>
                  </div>
                  <div className="h-2 bg-purple-600/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600" style={{ width: `${breakdown[0].value}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-foreground/70">Image Analysis</span>
                    <span className="text-xs font-semibold">{breakdown[1].value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${breakdown[1].value}%`, backgroundColor: '#ff0eb0' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-foreground/70">Video Analysis</span>
                    <span className="text-xs font-semibold">{breakdown[2].value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${breakdown[2].value}%`, backgroundColor: '#f59e0b' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


