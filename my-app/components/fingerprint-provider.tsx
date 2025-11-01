"use client";

import { useEffect, useState } from "react";
import { useUsageStore } from "@/store/usage";
import { useAuthStore } from "@/store/auth";

export function FingerprintProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const setDeviceId = useUsageStore((s) => s.setDeviceId);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    // Skip fingerprinting if user is logged in with a paid plan (authenticated users have unlimited usage)
    // Free plan users still need tracking
    if (user && user.plan !== "free") {
      setIsLoaded(true);
      return;
    }

    // Load FingerprintJS from CDN
    const loadFingerprint = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@4/dist/fp.min.js';
      script.onload = () => {
        // Use FingerprintJS without API key for free tier
        (window as any).FingerprintJS.load().then((fp: any) => {
          fp.get().then((result: any) => {
            setDeviceId(result.visitorId);
            setIsLoaded(true);
          }).catch(() => {
            // Fallback if fingerprinting fails
            const fallbackId = localStorage.getItem('device-id') || `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('device-id', fallbackId);
            setDeviceId(fallbackId);
            setIsLoaded(true);
          });
        }).catch(() => {
          // Fallback if library load fails
          const fallbackId = localStorage.getItem('device-id') || `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('device-id', fallbackId);
          setDeviceId(fallbackId);
          setIsLoaded(true);
        });
      };
      script.onerror = () => {
        // Fallback if CDN fails
        const fallbackId = localStorage.getItem('device-id') || `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('device-id', fallbackId);
        setDeviceId(fallbackId);
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadFingerprint();
  }, [user, setDeviceId]);

  // Don't block rendering, just show loading state if needed
  return <>{children}</>;
}

