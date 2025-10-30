"use client";

import { useBillingStore } from "@/store/billing";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const plan = useBillingStore((s) => s.selectedPlan);
  const setPlan = useAuthStore((s) => s.setPlan);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  if (!plan) {
    return <div className="rounded-2xl border p-8">No plan selected. Go to <a className="text-emerald-600 underline" href="/pricing">Pricing</a>.</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="rounded-2xl border p-6">
        <div className="text-sm text-foreground/70">Selected plan</div>
        <div className="text-lg font-medium capitalize">{plan}</div>
        <button
          onClick={() => {
            if (!user) { router.push('/login'); return; }
            setPlan(plan as any);
            router.push('/dashboard/history');
          }}
          className="mt-6 w-full rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Confirm and Activate
        </button>
      </div>
    </div>
  );
}


