"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect admins to admin dashboard, others to user dashboard
      if (user.plan === "enterprise") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await login(email, password);
        }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">Continue</button>
      </form>
    </div>
  );
}


