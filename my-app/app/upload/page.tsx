"use client";

import { useState, useRef, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { FileText, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video">("text");
  const [showLimitModal, setShowLimitModal] = useState(false);
  const addHistory = useHistoryStore((s) => s.add);
  const router = useRouter();
  const pasteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const statusByKindRef = useRef(statusByKind);
  
  // Usage tracking
  const user = useAuthStore((s) => s.user);
  const checkLimitReached = useUsageStore((s) => s.checkLimitReached);
  const incrementUsage = useUsageStore((s) => s.incrementUsage);
  const analysisCount = useUsageStore((s) => s.analysisCount);
  const freeLimit = useUsageStore((s) => s.freeLimit);

  // Keep ref in sync with state
  useEffect(() => {
    statusByKindRef.current = statusByKind;
  }, [statusByKind]);

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
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Content Verification</h1>
            <p className="text-lg text-foreground/70">Upload or paste your content to verify authenticity instantly</p>
          </div>
          {(!user || user.plan === "free") && (
            <div className="rounded-full border-2 border-purple-600/20 bg-purple-600/5 dark:bg-purple-950/20 px-4 py-2 w-fit">
              <span className="text-sm font-medium text-foreground/70">
                Free: <span className="text-purple-600 font-semibold">{freeLimit - analysisCount} left</span>
              </span>
            </div>
          )}
        </div>
      </div>
      <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900">
          <div className="px-4 pt-4">
            <Tabs.List className="flex gap-6 border-b border-purple-600/20">
              <Tabs.Trigger
                value="text"
                className="-mb-px inline-flex items-center gap-2 border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-foreground/70 transition-colors data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="image"
                className="-mb-px inline-flex items-center gap-2 border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-foreground/70 transition-colors data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 hover:text-foreground"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Image</span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="video"
                className="-mb-px inline-flex items-center gap-2 border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-foreground/70 transition-colors data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 hover:text-foreground"
              >
                <VideoIcon className="h-4 w-4" />
                <span>Video</span>
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <div className="p-6">
            <Tabs.Content value={activeTab} className="mt-2">
                {activeTab === "text" ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium">Paste text to analyze</label>
                    <textarea
                      ref={textareaRef}
                      value={textInput}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTextInput(newValue);
                        
                        // Clear any existing timeout
                        if (typingTimeoutRef.current) {
                          clearTimeout(typingTimeoutRef.current);
                        }
                        
                        // Auto-analyze after user stops typing for 3 seconds (if content > 20 chars)
                        if (newValue.length > 20 && statusByKindRef.current.text === "idle") {
                          typingTimeoutRef.current = setTimeout(() => {
                            setStatusByKind((s) => ({ ...s, text: "uploading" }));
                            simulateAnalysis("text");
                          }, 3000);
                        }
                      }}
                      onPaste={(e) => {
                        // Auto-analyze on paste after 3 seconds delay
                        if (pasteTimeoutRef.current) {
                          clearTimeout(pasteTimeoutRef.current);
                        }
                        pasteTimeoutRef.current = setTimeout(() => {
                          // Read the textarea value after paste event completes
                          const textValue = textareaRef.current?.value || "";
                          if (textValue.length > 20 && statusByKindRef.current.text === "idle") {
                            if (typingTimeoutRef.current) {
                              clearTimeout(typingTimeoutRef.current);
                            }
                            setStatusByKind((s) => ({ ...s, text: "uploading" }));
                            simulateAnalysis("text");
                          }
                        }, 3000);
                      }}
                      rows={10}
                      className="w-full rounded-xl border border-purple-600/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                      placeholder="Paste or type your text here... Analysis starts automatically!"
                    />
                  </div>
                ) : (
                  <Dashboard
                    kind={activeTab}
                    onStart={() => setStatusByKind((s) => ({ ...s, [activeTab]: "uploading" }))}
                    onComplete={() => simulateAnalysis(activeTab)}
                  />
                )}

                {statusByKind[activeTab] !== "idle" && (
                  <div className="mt-6 rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-medium uppercase tracking-wide text-foreground/70">Status</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/10 px-3 py-1 text-sm font-medium text-purple-600">
                        {statusByKind[activeTab] === "analyzing" && <span className="animate-spin">⚙️</span>}
                        {statusByKind[activeTab] === "completed" && "✓"}
                        {statusByKind[activeTab] === "uploading" && "↑"}
                        <span className="capitalize">{statusByKind[activeTab]}</span>
                      </span>
                    </div>
                    {statusByKind[activeTab] === "analyzing" && (
                      <div className="space-y-2">
                        <p className="text-sm text-foreground/70">Analyzing content with advanced AI models...</p>
                        <div className="h-2 w-full rounded-full bg-purple-600/10 overflow-hidden">
                          <div className="h-full bg-purple-600 animate-pulse" style={{ width: '60%' }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {statusByKind[activeTab] === "completed" && resultByKind[activeTab] && (
                  <div className="mt-6 space-y-4 rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
                    <h3 className="text-lg font-semibold">Analysis Complete</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 p-4 dark:bg-purple-950/20">
                        <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">Label</p>
                        <p className="text-base font-semibold">{resultByKind[activeTab]!.label}</p>
                      </div>
                      <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 p-4 dark:bg-purple-950/20">
                        <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">Trust Score</p>
                        <p className="text-2xl font-bold text-purple-600">{resultByKind[activeTab]!.trust_score}%</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/report/mock-${Date.now()}`)}
                        className="flex-1 rounded-full bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-purple-700"
                      >
                        View Detailed Report
                      </button>
                      <button
                        onClick={() => {
                          setStatusByKind((s) => ({ ...s, [activeTab]: "idle" }));
                          setResultByKind((r) => ({ ...r, [activeTab]: null }));
                          if (activeTab === "text") setTextInput("");
                        }}
                        className="rounded-full border-2 border-purple-600/30 bg-white px-6 py-3 font-medium text-purple-600 transition-all hover:bg-purple-600/10"
                      >
                        New Analysis
                      </button>
                    </div>
                  </div>
                )}
            </Tabs.Content>
          </div>
        </div>
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



