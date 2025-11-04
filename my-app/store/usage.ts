"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsageState = {
  deviceId: string | null;
  analysisCount: number;
  lastResetDate: string;
  freeLimit: number;
  countsByKind: Record<"text" | "image" | "video", number>;
  limitsByKind: Record<"text" | "image" | "video", number>;
  setDeviceId: (id: string) => void;
  incrementUsage: () => void;
  incrementUsageKind: (kind: "text" | "image" | "video") => void;
  resetUsage: () => void;
  checkLimitReached: () => boolean;
  checkLimitReachedKind: (kind: "text" | "image" | "video") => boolean;
};

// Check if a date is today
const isToday = (dateStr: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return dateStr === today;
};

export const useUsageStore = create<UsageState>()(
  persist(
    (set, get) => ({
      deviceId: null,
      analysisCount: 0,
      lastResetDate: new Date().toISOString().split('T')[0],
      freeLimit: 6, // legacy overall cap (sum of kind limits)
      countsByKind: { text: 0, image: 0, video: 0 },
      limitsByKind: { text: 3, image: 2, video: 1 },

      setDeviceId: (id: string) => set({ deviceId: id }),

      incrementUsage: () => {
        const { analysisCount, lastResetDate } = get();
        
        // Reset if it's a new day
        if (!isToday(lastResetDate)) {
          set({ 
            analysisCount: 1, 
            lastResetDate: new Date().toISOString().split('T')[0] 
          });
        } else {
          set({ analysisCount: analysisCount + 1 });
        }
      },

      incrementUsageKind: (kind) => {
        const { countsByKind, lastResetDate } = get();
        // Reset if it's a new day
        if (!isToday(lastResetDate)) {
          set({
            countsByKind: { text: 0, image: 0, video: 0 },
            analysisCount: 0,
            lastResetDate: new Date().toISOString().split('T')[0],
          });
        }
        set({
          countsByKind: { ...countsByKind, [kind]: countsByKind[kind] + 1 },
          analysisCount: get().analysisCount + 1,
        });
      },

      resetUsage: () => {
        set({ 
          analysisCount: 0,
          countsByKind: { text: 0, image: 0, video: 0 },
          lastResetDate: new Date().toISOString().split('T')[0] 
        });
      },

      checkLimitReached: () => {
        const { analysisCount, lastResetDate, freeLimit } = get();
        
        // Reset if it's a new day
        if (!isToday(lastResetDate)) {
          set({ 
            analysisCount: 0,
            countsByKind: { text: 0, image: 0, video: 0 },
            lastResetDate: new Date().toISOString().split('T')[0] 
          });
          return false;
        }
        
        return analysisCount >= freeLimit;
      },

      checkLimitReachedKind: (kind) => {
        const { countsByKind, limitsByKind, lastResetDate } = get();
        // Reset if it's a new day
        if (!isToday(lastResetDate)) {
          set({ 
            countsByKind: { text: 0, image: 0, video: 0 },
            analysisCount: 0,
            lastResetDate: new Date().toISOString().split('T')[0] 
          });
          return false;
        }
        return countsByKind[kind] >= limitsByKind[kind];
      },
    }),
    { name: "usage-store" }
  )
);

