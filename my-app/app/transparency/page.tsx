"use client";

import { useEffect, useState } from "react";

export default function TransparencyPage() {
  const [stats, setStats] = useState<{ totalChecks: number; accuracyRate: number } | null>(null);
  useEffect(() => {
    let mounted = true;
    const load = () => fetch('/api/stats', { cache: 'no-store' }).then(r => r.json()).then(d => { if (mounted) setStats(d); });
    load();
    const i = setInterval(load, 10000);
    return () => { mounted = false; clearInterval(i); };
  }, []);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Public Transparency</h1>
        <p className="text-foreground/70">Live usage metrics — updated every few seconds.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6 text-center">
          <div className="text-sm text-foreground/60 mb-2">Total Checks (Today)</div>
          <div className="text-4xl font-bold">{stats ? stats.totalChecks.toLocaleString() : '—'}</div>
        </div>
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6 text-center">
          <div className="text-sm text-foreground/60 mb-2">AI Traces (Confidence)</div>
          <div className="text-4xl font-bold">{stats ? `${Math.round(100 - stats.accuracyRate)}%` : '—'}</div>
        </div>
      </div>
    </div>
  );
}


