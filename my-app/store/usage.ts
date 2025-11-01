"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsageState = {
  deviceId: string | null;
  analysisCount: number;
  lastResetDate: string;
  freeLimit: number;
  setDeviceId: (id: string) => void;
  incrementUsage: () => void;
  resetUsage: () => void;
  checkLimitReached: () => boolean;
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
      freeLimit: 5, // 5 free analyses per day

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

      resetUsage: () => {
        set({ 
          analysisCount: 0, 
          lastResetDate: new Date().toISOString().split('T')[0] 
        });
      },

      checkLimitReached: () => {
        const { analysisCount, lastResetDate, freeLimit } = get();
        
        // Reset if it's a new day
        if (!isToday(lastResetDate)) {
          set({ 
            analysisCount: 0, 
            lastResetDate: new Date().toISOString().split('T')[0] 
          });
          return false;
        }
        
        return analysisCount >= freeLimit;
      },
    }),
    { name: "usage-store" }
  )
);

