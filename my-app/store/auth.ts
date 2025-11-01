"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Plan = "free" | "basic" | "pro" | "suite" | "enterprise";
type User = { id: string; email: string; plan: Plan };

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setPlan: (plan: Plan) => void;
};

// Admin emails that get enterprise plan access
const ADMIN_EMAILS = ["admin@aiverify.com", "admin@example.com", "admin@gmail.com"];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      async login(email) {
        const plan = ADMIN_EMAILS.includes(email.toLowerCase()) ? "enterprise" as Plan : "free" as Plan;
        set({ user: { id: "u-" + Date.now(), email, plan } });
      },
      async signup(email) {
        const plan = ADMIN_EMAILS.includes(email.toLowerCase()) ? "enterprise" as Plan : "free" as Plan;
        set({ user: { id: "u-" + Date.now(), email, plan } });
      },
      logout() {
        set({ user: null });
      },
      setPlan(plan) {
        const u = get().user;
        if (!u) return;
        set({ user: { ...u, plan } });
      },
    }),
    { name: "auth-store" }
  )
);


