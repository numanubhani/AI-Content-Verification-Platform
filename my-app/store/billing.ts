"use client";

import { create } from "zustand";

type Plan = "basic" | "pro" | "suite" | "enterprise";

type BillingState = {
  selectedPlan: Plan | null;
  selectPlan: (p: Plan) => void;
  clear: () => void;
};

export const useBillingStore = create<BillingState>()((set) => ({
  selectedPlan: null,
  selectPlan: (p) => set({ selectedPlan: p }),
  clear: () => set({ selectedPlan: null }),
}));


