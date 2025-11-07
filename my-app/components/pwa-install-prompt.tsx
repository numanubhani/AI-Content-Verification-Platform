"use client";

import { useEffect, useState, useCallback } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  const isStandalone = () =>
    (typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone)) || false;

  // Show only if not installed and not recently dismissed
  const maybeOpen = useCallback(() => {
    if (isStandalone()) return;
    const dismissedUntil = localStorage.getItem("pwa-dismiss-until");
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;
    if (deferredPrompt) setOpen(true);
  }, [deferredPrompt]);

  useEffect(() => {
    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      const ev = e as BeforeInstallPromptEvent;
      setDeferredPrompt(ev);
      // slight delay to avoid flashing on load
      setTimeout(maybeOpen, 600);
    }
    function onInstalled() {
      setDeferredPrompt(null);
      setOpen(false);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [maybeOpen]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setOpen(false);
    await deferredPrompt.prompt();
    try {
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "dismissed") {
        // Snooze for 7 days
        localStorage.setItem("pwa-dismiss-until", String(Date.now() + 7 * 24 * 60 * 60 * 1000));
      }
    } finally {
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    // Snooze for 2 days on close
    localStorage.setItem("pwa-dismiss-until", String(Date.now() + 2 * 24 * 60 * 60 * 1000));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="text-base font-semibold">Install AI Verify</div>
          <button aria-label="Close" onClick={handleClose} className="rounded p-1 hover:bg-foreground/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-4 text-sm text-foreground/70">
          Install this app for a faster, full-screen experience. Works offline and from your home screen.
        </div>
        <div className="flex gap-3 px-5 py-4 border-t">
          <button
            onClick={handleClose}
            className="flex-1 rounded-full border-2 border-purple-600/30 px-4 py-2 font-medium text-purple-600 hover:bg-purple-600/10"
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
          >
            <Download className="h-4 w-4" />
            Install
          </button>
        </div>
      </div>
    </div>
  );
}


