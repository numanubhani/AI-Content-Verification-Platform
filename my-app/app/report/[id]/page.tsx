"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const trust = 74;
  const breakdown = [
    { name: "Text", value: 45 },
    { name: "Image", value: 30 },
    { name: "Video", value: 25 },
  ];

  const COLORS = ["#22c55e", "#60a5fa", "#f59e0b"]; 

  const radialData = useMemo(() => [{ name: "Human", value: 100 - trust }, { name: "AI", value: trust }], [trust]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 rounded-2xl border p-6 md:grid-cols-2">
        <div className="relative flex items-center justify-center">
          <div className="h-60 w-60">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ name: "score", value: trust }]}> 
                <RadialBar background dataKey="value" fill="#22c55e" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold">{trust}%</div>
            <div className="text-sm text-foreground/70">Human-made confidence</div>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Report #{id}</h1>
          <p className="text-foreground/70">Label: <span className="font-medium">Partially AI-assisted</span></p>
          <p className="text-foreground/70">Summary: Mixed human and AI signals detected across modalities.</p>
          <div className="pt-1">
            <button className="rounded-full border px-4 py-2 hover:bg-foreground/5">Re-check</button>
            <button className="ml-3 rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Copy Share Link</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">Overview</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={radialData} outerRadius={80} dataKey="value">
                  {radialData.map((_, index) => (
                    <Cell key={index} fill={index === 0 ? "#22c55e" : "#ef4444"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">Breakdown</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <BarChart data={breakdown}>
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="text-lg font-medium">Explainability</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4 text-sm leading-relaxed">
            <span className="rounded bg-yellow-100 px-1 py-0.5 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-200">GPT-like phrasing</span>
            detected in the following sentences…
          </div>
          <div className="grid gap-4">
            <div className="h-36 rounded-xl border bg-gradient-to-br from-transparent via-emerald-500/20 to-transparent" />
            <div className="h-36 rounded-xl border bg-gradient-to-br from-transparent via-sky-500/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}


