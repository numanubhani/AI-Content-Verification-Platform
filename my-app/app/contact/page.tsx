"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full rounded-lg border px-3 py-2" type="email" required />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea className="mt-1 w-full rounded-lg border px-3 py-2" rows={4} required />
        </div>
        <button className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Send</button>
        {sent && <p className="text-sm text-emerald-600">Thanks! We will get back to you.</p>}
      </form>
    </div>
  );
}


