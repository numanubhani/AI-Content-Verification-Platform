"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // In development, avoid registering to prevent caching dev chunks
    const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
    if (process.env.NODE_ENV !== 'production' || isLocalhost) return;
    const swUrl = "/sw.js";
    navigator.serviceWorker.register(swUrl).catch(() => {});
    // Optional: force update check on visibility change
    const onVisible = () => {
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: "CHECK_FOR_UPDATE" });
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);
  return null;
}


