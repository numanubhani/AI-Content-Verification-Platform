"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = useAuthStore((s) => s.signup);
  const router = useRouter();
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signup(email, password);
          router.push("/dashboard/history");
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
        <button className="w-full rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Create account</button>
      </form>
    </div>
  );
}


