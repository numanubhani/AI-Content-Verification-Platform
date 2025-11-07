"use client";

import { useBillingStore } from "@/store/billing";
import Link from "next/link";

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
        {plans.map((p, idx) => {
          const isPopular = idx === 1; // mark second card as Popular
          return (
          <div
            key={p.name}
            className={`relative overflow-hidden rounded-2xl p-6 border ${
              isPopular
                ? 'border-2 border-purple-600 shadow-[0_0_40px_rgba(139,92,246,0.35)]'
                : 'shadow-sm'
            }`}
          >
            {isPopular && (
              <div className="pointer-events-none absolute -right-12 top-3 rotate-45">
                <div className="bg-purple-600 text-white text-xs font-semibold py-1 px-16 shadow">POPULAR</div>
              </div>
            )}
            <h3 className="text-lg font-medium">{p.name}</h3>
            <div className="mt-2 text-3xl font-bold">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Link
              href={`/checkout?plan=${p.key}`}
              onClick={() => selectPlan(p.key as any)}
              className="mt-6 block w-full rounded-full bg-purple-600 px-4 py-2 text-center text-white hover:bg-purple-700"
            >
              Purchase now
            </Link>
          </div>
          );
        })}
      </div>
    </div>
  );
}


