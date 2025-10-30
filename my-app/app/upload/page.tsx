"use client";

import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useHistoryStore } from "@/store/history";

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
  const addHistory = useHistoryStore((s) => s.add);
  const router = useRouter();

  async function simulateAnalysis(kind: "text" | "image" | "video") {
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
      <h1 className="text-2xl font-semibold">Upload</h1>
      <Tabs.Root defaultValue="text" className="w-full">
        <Tabs.List className="flex gap-2 rounded-full bg-foreground/5 p-1">
          {[
            { v: "text", l: "Text" },
            { v: "image", l: "Image" },
            { v: "video", l: "Video" },
          ].map((t) => (
            <Tabs.Trigger
              key={t.v}
              value={t.v}
              className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow data-[state=active]:ring-1 data-[state=active]:ring-foreground/10"
            >
              {t.l}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {(["text", "image", "video"] as const).map((kind) => (
          <Tabs.Content key={kind} value={kind} className="mt-4 space-y-4">
            {kind === "text" ? (
              <div className="space-y-4">
                <div className="rounded-xl border p-4">
                  <label className="block text-sm mb-2">Paste text to analyze</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={8}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Paste or type your text here..."
                  />
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        if (!textInput.trim()) return;
                        setStatusByKind((s) => ({ ...s, text: "uploading" }));
                        simulateAnalysis("text");
                      }}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                    >
                      Analyze Text
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Dashboard
                kind={kind}
                onStart={() => setStatusByKind((s) => ({ ...s, [kind]: "uploading" }))}
                onComplete={() => simulateAnalysis(kind)}
              />
            )}

            <div className="rounded-xl border p-4">
              <p className="text-sm">Status: <span className="font-medium capitalize">{statusByKind[kind]}</span></p>
            </div>

            {statusByKind[kind] === "completed" && resultByKind[kind] && (
              <div className="space-y-3 rounded-xl border p-4">
                <p className="text-sm">Label: <span className="font-medium">{resultByKind[kind]!.label}</span></p>
                <p className="text-sm">Trust score: <span className="font-medium">{resultByKind[kind]!.trust_score}%</span></p>
                <button
                  onClick={() => router.push(`/report/mock-${Date.now()}`)}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  View Detailed Report
                </button>
              </div>
            )}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}


