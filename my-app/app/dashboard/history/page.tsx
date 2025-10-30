"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useHistoryStore } from "@/store/history";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const user = useAuthStore((s) => s.user);
  const items = useHistoryStore((s) => s.items);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your reports</h1>
          <p className="text-sm text-foreground/70">Recent verifications appear here.</p>
        </div>
        <div className="rounded-full border px-3 py-1 text-sm">Plan: <span className="font-medium capitalize">{user.plan}</span></div>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center">
          <div className="text-lg font-medium">No reports yet</div>
          <p className="mt-1 text-sm text-foreground/70">Upload a file to generate your first report.</p>
          <Link href="/upload" className="mt-4 inline-block rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Go to Upload</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Link key={r.id} href={`/report/${r.id}`} className="group rounded-2xl border p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between text-sm">
                <span className="rounded-full bg-foreground/5 px-2 py-0.5 uppercase tracking-wide">{r.kind}</span>
                <span className="text-foreground/60">{new Date(r.createdAt).toLocaleDateString()} {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="mt-3 text-lg font-medium">{r.label}</div>
              <div className="mt-1 text-foreground/70">Trust score: <span className="font-semibold">{r.trust_score}%</span></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


