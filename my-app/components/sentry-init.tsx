"use client";

import { useEffect } from "react";

export function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn || typeof window === 'undefined') return;
    // Load Sentry from CDN to avoid bundler dependency
    const existing = document.querySelector('script[data-sentry]') as HTMLScriptElement | null;
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/7.114.0/bundle.tracing.min.js';
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-sentry', 'true');
    script.onload = () => {
      try {
        const Sentry = (window as any).Sentry;
        if (!Sentry) return;
        Sentry.init({ dsn, tracesSampleRate: 0.1 });
        window.addEventListener('unhandledrejection', (e) => {
          try { Sentry.captureException((e as any).reason); } catch {}
        });
        window.addEventListener('error', (e) => {
          try { Sentry.captureException((e as any).error || (e as any).message); } catch {}
        });
      } catch {}
    };
    document.head.appendChild(script);
  }, []);
  return null;
}


