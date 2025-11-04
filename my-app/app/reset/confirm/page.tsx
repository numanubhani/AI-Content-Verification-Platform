"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetConfirmPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Create new password</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); if (password !== confirm) { setError("Passwords do not match"); return; } router.push('/login'); }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">New password</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Confirm new password</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        {error && <div className="rounded-md bg-red-50 text-red-700 text-sm p-2">{error}</div>}
        <button className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">Update password</button>
      </form>
    </div>
  );
}


