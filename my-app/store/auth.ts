"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/lib/api-client";

type Plan = "free" | "basic" | "pro" | "suite" | "enterprise";
type User = { id: string; email: string; plan: Plan };

type AuthState = {
  user: User | null;
  token: string | null;
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
      token: null,
      async login(email: string, password: string) {
        // Call backend API for login
        const response = await apiClient.login(email, password);
        const token = response.access_token;

        if (!token) {
          throw new Error("No token received from server");
        }

        // Fetch user info from backend
        const userInfo = await apiClient.getCurrentUser(token) as {
          id: number;
          email: string;
          plan: string;
          is_active: boolean;
        };

        // Use plan from backend
        const plan = (userInfo.plan || "free") as Plan;

        set({ 
          user: { 
            id: String(userInfo.id), 
            email: userInfo.email, 
            plan 
          }, 
          token 
        });
      },
      async signup(email: string, password: string) {
        // Register user in backend - posts data to backend
        const response = await apiClient.register(email, password);
        const token = response.access_token;

        if (!token) {
          throw new Error("No token received from server");
        }

        // Fetch user info from backend to confirm registration
        const userInfo = await apiClient.getCurrentUser(token) as {
          id: number;
          email: string;
          plan: string;
          is_active: boolean;
        };
        
        // Use plan from backend
        const plan = (userInfo.plan || "free") as Plan;

        set({ 
          user: { 
            id: String(userInfo.id), 
            email: userInfo.email, 
            plan 
          }, 
          token 
        });
      },
      logout() {
        set({ user: null, token: null });
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


