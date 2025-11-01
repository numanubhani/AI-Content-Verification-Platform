"use client";

import { useState, useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useHistoryStore } from "@/store/history";
import { useUsageStore } from "@/store/usage";
import { useAuthStore } from "@/store/auth";
import { LimitModal } from "@/components/limit-modal";

const Dashboard = dynamic(() => import("@/components/upload-dashboard"), { ssr: false });

type Result = {
  label: string;
  trust_score: number;
  details: Record<string, string[]>;
};

export default function UploadPage() {
  type Status = "idle" | "uploading" | "analyzing" | "completed";
  const [statusByKind, setStatusByKind] = useState<Record<"text" | "image" | "video", Status>>({ text: "idle", image: "idle", video: "idle" });
  const [resultByKind, setResultByKind] = useState<Record<"text" | "image" | "video", Result | null>>({ text: null, image: null, video: null });
  const [textInput, setTextInput] = useState("");
  const [showLimitModal, setShowLimitModal] = useState(false);
  const addHistory = useHistoryStore((s) => s.add);
  const router = useRouter();
  const pasteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Usage tracking
  const user = useAuthStore((s) => s.user);
  const checkLimitReached = useUsageStore((s) => s.checkLimitReached);
  const incrementUsage = useUsageStore((s) => s.incrementUsage);
  const analysisCount = useUsageStore((s) => s.analysisCount);
  const freeLimit = useUsageStore((s) => s.freeLimit);

  async function simulateAnalysis(kind: "text" | "image" | "video") {
    // Check if limit reached (only for free users)
    const isPaidUser = user && user.plan !== "free";
    if (!isPaidUser && checkLimitReached()) {
      setShowLimitModal(true);
      setStatusByKind((s) => ({ ...s, [kind]: "idle" }));
      return;
    }

    // Increment usage counter (only for free users)
    if (!isPaidUser) {
      incrementUsage();
    }

    setStatusByKind((s) => ({ ...s, [kind]: "analyzing" }));
    try {
      const res = await fetch(`/api/analyze?kind=${kind}`);
      const json = await res.json();
      const mock: Result = { label: json.label, trust_score: json.trust_score, details: json.details };
      setResultByKind((r) => ({ ...r, [kind]: mock }));
      setStatusByKind((s) => ({ ...s, [kind]: "completed" }));
      addHistory({ id: json.id, kind, label: mock.label, trust_score: mock.trust_score, createdAt: Date.now() });
    } catch (e) {
      setStatusByKind((s) => ({ ...s, [kind]: "idle" }));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Content Verification</h1>
            <p className="text-lg text-foreground/70">Upload or paste your content to verify authenticity instantly</p>
          </div>
          {(!user || user.plan === "free") && (
            <div className="rounded-full border-2 border-purple-600/20 bg-purple-600/5 dark:bg-purple-950/20 px-4 py-2">
              <span className="text-sm font-medium text-foreground/70">
                Free: <span className="text-purple-600 font-semibold">{freeLimit - analysisCount} left</span>
              </span>
            </div>
          )}
        </div>
      </div>
      <Tabs.Root defaultValue="text" className="w-full">
        <Tabs.List className="flex gap-2 overflow-x-auto rounded-full bg-purple-600/10 p-1 border border-purple-600/20">
          {[
            { v: "text", l: "Text" },
            { v: "image", l: "Image" },
            { v: "video", l: "Video" },
          ].map((t) => (
            <Tabs.Trigger
              key={t.v}
              value={t.v}
              className="whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:text-foreground/70 transition-all"
            >
              {t.l}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {(["text", "image", "video"] as const).map((kind) => (
          <Tabs.Content key={kind} value={kind} className="mt-6">
            {kind === "text" ? (
              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
                  <label className="block text-sm font-medium mb-3">Paste text to analyze</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setTextInput(newValue);
                      
                      // Clear any existing timeout
                      if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                      }
                      
                      // Auto-analyze after user stops typing for 2 seconds (if content > 100 chars)
                      if (newValue.length > 100 && statusByKind.text === "idle") {
                        typingTimeoutRef.current = setTimeout(() => {
                          setStatusByKind((s) => ({ ...s, text: "uploading" }));
                          simulateAnalysis("text");
                        }, 2000);
                      }
                    }}
                    onPaste={(e) => {
                      // Auto-analyze on paste after a short delay
                      if (pasteTimeoutRef.current) {
                        clearTimeout(pasteTimeoutRef.current);
                      }
                      pasteTimeoutRef.current = setTimeout(() => {
                        // Read the textarea value after paste event completes
                        const target = e.target as HTMLTextAreaElement;
                        if (target.value.length > 100 && statusByKind.text === "idle") {
                          if (typingTimeoutRef.current) {
                            clearTimeout(typingTimeoutRef.current);
                          }
                          setStatusByKind((s) => ({ ...s, text: "uploading" }));
                          simulateAnalysis("text");
                        }
                      }, 500);
                    }}
                    rows={10}
                    className="w-full rounded-xl border border-purple-600/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                    placeholder="Paste or type your text here... Analysis starts automatically!"
                  />
                </div>
              </div>
            ) : (
              <Dashboard
                kind={kind}
                onStart={() => setStatusByKind((s) => ({ ...s, [kind]: "uploading" }))}
                onComplete={() => simulateAnalysis(kind)}
              />
            )}

            {statusByKind[kind] !== "idle" && (
              <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium uppercase tracking-wide text-foreground/70">Status</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600">
                    {statusByKind[kind] === "analyzing" && <span className="animate-spin">⚙️</span>}
                    {statusByKind[kind] === "completed" && "✓"}
                    {statusByKind[kind] === "uploading" && "↑"}
                    <span className="capitalize">{statusByKind[kind]}</span>
                  </span>
                </div>
                {statusByKind[kind] === "analyzing" && (
                  <div className="space-y-2">
                    <p className="text-sm text-foreground/70">Analyzing content with advanced AI models...</p>
                    <div className="h-2 w-full bg-purple-600/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {statusByKind[kind] === "completed" && resultByKind[kind] && (
              <div className="space-y-4 rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
                <h3 className="text-lg font-semibold">Analysis Complete</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-purple-50/30 dark:bg-purple-950/20 p-4 border border-purple-600/10">
                    <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Label</p>
                    <p className="text-base font-semibold">{resultByKind[kind]!.label}</p>
                  </div>
                  <div className="rounded-xl bg-purple-50/30 dark:bg-purple-950/20 p-4 border border-purple-600/10">
                    <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Trust Score</p>
                    <p className="text-2xl font-bold text-purple-600">{resultByKind[kind]!.trust_score}%</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/report/mock-${Date.now()}`)}
                    className="flex-1 rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-all hover:-translate-y-0.5 font-medium"
                  >
                    View Detailed Report
                  </button>
                  <button
                    onClick={() => {
                      setStatusByKind((s) => ({ ...s, [kind]: "idle" }));
                      setResultByKind((r) => ({ ...r, [kind]: null }));
                      if (kind === "text") setTextInput("");
                    }}
                    className="rounded-full border-2 border-purple-600/30 bg-white px-6 py-3 text-purple-600 hover:bg-purple-600/10 transition-all font-medium"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            )}
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Free Limit Modal */}
      <LimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        currentCount={analysisCount}
        limit={freeLimit}
      />
    </div>
  );
}


