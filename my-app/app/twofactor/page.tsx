"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [method, setMethod] = useState<"email" | "authenticator">("email");
  const router = useRouter();
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Two-Factor Authentication</h1>
      <div className="rounded-2xl border p-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Method</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button onClick={() => setMethod("email")} className={`rounded-lg border px-3 py-2 text-sm ${method==='email' ? 'border-purple-600' : ''}`}>Email OTP</button>
            <button onClick={() => setMethod("authenticator")} className={`rounded-lg border px-3 py-2 text-sm ${method==='authenticator' ? 'border-purple-600' : ''}`}>Authenticator App</button>
          </div>
        </div>
        <div>
          <label className="block text-sm">Enter 6‑digit code</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2 tracking-widest text-center" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
        </div>
        <button onClick={() => router.push('/dashboard')} className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">Verify</button>
      </div>
      <p className="text-sm text-foreground/70">Note: Frontend-only preview. Backend verification to be connected.</p>
    </div>
  );
}


