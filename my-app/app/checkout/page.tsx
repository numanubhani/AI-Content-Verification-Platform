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
    return <div className="rounded-2xl border p-8">No plan selected. Go to <a className="text-purple-600 underline" href="/pricing">Pricing</a>.</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="rounded-2xl border p-6 space-y-4">
        <div className="text-sm text-foreground/70">Selected plan</div>
        <div className="text-lg font-medium capitalize">{plan}</div>
        {/* Mock Stripe card form (frontend only) */}
        <div className="grid gap-3">
          <div>
            <label className="block text-sm">Card number</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm">Expiry</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="MM / YY" />
            </div>
            <div>
              <label className="block text-sm">CVC</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="CVC" />
            </div>
          </div>
          <div>
            <label className="block text-sm">Name on card</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Jane Doe" />
          </div>
        </div>
        <button
          onClick={() => {
            if (!user) { router.push('/login'); return; }
            setPlan(plan as any);
            router.push('/checkout/success');
          }}
          className="mt-4 w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Pay and Activate
        </button>
      </div>
    </div>
  );
}


