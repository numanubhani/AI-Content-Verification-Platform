"use client";

import { useState } from "react";

export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">Send reset link</button>
        {sent && <div className="text-sm text-foreground/70">If an account exists, a reset link has been sent.</div>}
      </form>
    </div>
  );
}


