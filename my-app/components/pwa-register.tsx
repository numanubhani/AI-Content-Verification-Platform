"use client";

import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "[::1]"
    );
    if (!("serviceWorker" in navigator)) return;
    // Register even on localhost so you can test offline locally
    const swUrl = "/sw.js";
    navigator.serviceWorker
      .register(swUrl)
      .catch(() => {
        // no-op
      });
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


