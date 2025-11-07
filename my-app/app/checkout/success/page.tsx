"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg text-center space-y-4">
      <div className="text-3xl font-bold">Payment successful</div>
      <p className="text-foreground/70">Your subscription is now active. You can manage it anytime from Billing.</p>
      <div className="flex justify-center gap-3">
        <Link href="/dashboard" className="rounded-full bg-purple-600 px-5 py-2 text-white hover:bg-purple-700">Go to Dashboard</Link>
        <Link href="/billing" className="rounded-full border-2 border-purple-600/30 px-5 py-2 text-purple-600 hover:bg-purple-600/10">Manage Billing</Link>
      </div>
    </div>
  );
}


