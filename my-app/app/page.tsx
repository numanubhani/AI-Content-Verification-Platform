import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl border p-10 bg-background">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0">
          {/* soft grid */}
          <div
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              color: "#0f172a",
            }}
          />
          {/* radial orbs */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl dark:bg-emerald-500/20" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl dark:bg-sky-500/20" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            AI Content Verification for Media & Education
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Check text, photos, and videos for AI usage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/upload" className="w-full rounded-full bg-emerald-600 px-5 py-2.5 text-center text-white shadow hover:bg-emerald-700 sm:w-auto">
              Try Free for Schools
            </Link>
            <Link href="/contact" className="w-full rounded-full border border-foreground/20 bg-background/60 px-5 py-2.5 text-center text-foreground backdrop-blur hover:bg-foreground/10 sm:w-auto">
              See API for Media
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Upload", desc: "Text, image or video via secure upload." },
            { title: "Analyze", desc: "AI signals detected using multiple models." },
            { title: "Report", desc: "Readable summary with trust score." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Who We Help</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Media Teams", desc: "Verify sources and UGC before publishing." },
            { title: "Educational Platforms", desc: "Support academic integrity at scale." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border p-8 text-center">
        <h2 className="text-2xl font-semibold">Simple pricing that scales</h2>
        <p className="mt-2 text-foreground/70">Start free and grow with your needs.</p>
        <Link href="/pricing" className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:bg-emerald-700">
          View Pricing
        </Link>
      </section>
    </div>
  );
}


