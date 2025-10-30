"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: string; email: string; plan: "free" | "basic" | "pro" | "suite" | "enterprise" } | null;

type AuthState = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setPlan: (plan: User extends null ? never : User["plan"]) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      async login(email) {
        set({ user: { id: "u-" + Date.now(), email, plan: "free" } });
      },
      async signup(email) {
        set({ user: { id: "u-" + Date.now(), email, plan: "free" } });
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


