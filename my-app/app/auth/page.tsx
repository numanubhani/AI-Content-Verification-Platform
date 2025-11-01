"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const signup = useAuthStore((s) => s.signup);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "login") {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    router.push("/dashboard/history");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{mode === "login" ? "Log in" : "Create account"}</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            {mode === "login" ? "Continue" : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-foreground/70">
          {mode === "login" ? (
            <button onClick={() => setMode("signup")} className="text-purple-600 underline">
              Don't have an account? Sign up
            </button>
          ) : (
            <button onClick={() => setMode("login")} className="text-purple-600 underline">
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


