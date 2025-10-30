"use client";

import { useBillingStore } from "@/store/billing";

const plans = [
  { key: "basic", name: "Basic", price: "$9.90", features: ["100 checks/mo", "Email support"] },
  { key: "pro", name: "Professional", price: "$49", features: ["1,500 checks/mo", "Priority support", "API access"] },
  { key: "suite", name: "Media & Education Suite", price: "$99", features: ["5,000 checks/mo", "Team seats", "SAML/SSO"] },
  { key: "enterprise", name: "Enterprise", price: "Custom", features: ["Unlimited checks", "Dedicated support", "On-prem options"] },
] as const;

export default function PricingPage() {
  const selectPlan = useBillingStore((s) => s.selectPlan);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md">
            <h3 className="text-lg font-medium">{p.name}</h3>
            <div className="mt-2 text-3xl font-bold">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <a
              href="/checkout"
              onClick={() => selectPlan(p.key as any)}
              className="mt-6 block w-full rounded-full bg-emerald-600 px-4 py-2 text-center text-white hover:bg-emerald-700"
            >
              Start Free Trial
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


