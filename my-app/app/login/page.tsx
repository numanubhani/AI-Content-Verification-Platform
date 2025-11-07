"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.plan === "enterprise") {
        router.push("/admin");
      } else {
        router.push("/dashboard/history");
      }
    }
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Use <strong>admin@gmail.com</strong> for admin dashboard, or any email for user dashboard
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await login(email, password);
          // Redirect based on plan
          if (email.toLowerCase() === "admin@gmail.com") {
            router.push("/admin");
          } else {
            router.push("/dashboard/history");
          }
        }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input 
            className="mt-1 w-full rounded-lg border px-3 py-2" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com or any email"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input 
            className="mt-1 w-full rounded-lg border px-3 py-2" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Any password"
          />
        </div>
        <button className="w-full rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Continue</button>
      </form>
    </div>
  );
}


