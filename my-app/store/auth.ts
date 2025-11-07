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

// Admin email for admin dashboard access
const ADMIN_EMAIL = "admin@gmail.com";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      async login(email: string, password: string) {
        // Dummy login - any email/password works
        // admin@gmail.com gets enterprise plan (admin dashboard)
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        const plan = isAdmin ? "enterprise" : "free";
        set({ user: { id: "u-" + Date.now(), email, plan } });
      },
      async signup(email: string, password: string) {
        // Dummy signup - any email/password works
        // admin@gmail.com gets enterprise plan (admin dashboard)
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        const plan = isAdmin ? "enterprise" : "free";
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


