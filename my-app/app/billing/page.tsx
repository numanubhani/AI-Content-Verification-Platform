"use client";

import { useAuthStore } from "@/store/auth";

export default function BillingPage() {
  const user = useAuthStore((s) => s.user);
  const setPlan = useAuthStore((s) => s.setPlan);
  if (!user) return <div className="rounded-2xl border p-6">Please log in to manage billing.</div>;
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <div className="rounded-2xl border p-6 space-y-3">
        <div className="text-sm text-foreground/70">Current plan</div>
        <div className="text-lg font-medium capitalize">{user.plan}</div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="rounded-full border px-4 py-2 text-sm">Update payment method</button>
          <button onClick={() => setPlan('free' as any)} className="rounded-full border px-4 py-2 text-sm text-red-600">Cancel subscription</button>
        </div>
      </div>
    </div>
  );
}


