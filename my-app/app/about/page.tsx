"use client";

import Link from "next/link";
import { Globe, GitBranch, Server, Brain, Shield, Mail, FileText, Newspaper } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-3xl border-2 border-purple-600/20 bg-purple-600/5 p-10 sm:p-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">About AI Verify</h1>
          <p className="text-lg text-foreground/70">
            We help organizations worldwide verify the authenticity of text, images, and videos with a
            privacy-first, explainable AI platform.
          </p>
        </div>
      </section>

      {/* Mission & Transparency */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            <h2 className="text-xl font-semibold">Mission</h2>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            Our mission is to make authenticity measurable and accessible. We build tools that enable
            journalists, educators, and enterprises to evaluate content integrity at scale—across
            languages and formats—while respecting user privacy.
          </p>
        </div>
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            <h2 className="text-xl font-semibold">Transparency Statement</h2>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            We follow an “Explainable AI” approach: model decisions are surfaced through human‑readable
            signals. We disclose the limitations of our models, continuously evaluate bias, and support
            regional data protection standards. Clear documentation is provided for model behavior and
            API usage.
          </p>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-purple-600/10 p-5 bg-purple-50/30 dark:bg-purple-950/20">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <GitBranch className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              Frontend
            </div>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>React (Next.js)</li>
              <li>TypeScript, Tailwind UI</li>
              <li>Radix UI, Recharts</li>
              <li>PWA, Service Worker</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-600/10 p-5 bg-purple-50/30 dark:bg-purple-950/20">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Server className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              Backend
            </div>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>Django / Django REST</li>
              <li>Celery Workers</li>
              <li>PostgreSQL / Redis</li>
              <li>Object Storage (S3 compatible)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-600/10 p-5 bg-purple-50/30 dark:bg-purple-950/20">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Brain className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              AI Models
            </div>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>Text: stylometry + transformer detectors</li>
              <li>Image: GAN/DIFF artifacts & frequency analysis</li>
              <li>Video: frame‑level consistency & ASR alignment</li>
              <li>Ensemble scoring with explainability signals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact / Press / Docs */}
      <section className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-6">Contact & Resources</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/contact" className="group rounded-xl border border-purple-600/10 p-5 hover:border-purple-600/30">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <Mail className="h-5 w-5" /> Contact
            </div>
            <p className="text-sm text-foreground/70">Partnerships, support, and general inquiries.</p>
          </Link>
          <Link href="/press" className="group rounded-xl border border-purple-600/10 p-5 hover:border-purple-600/30">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <Newspaper className="h-5 w-5" /> Press
            </div>
            <p className="text-sm text-foreground/70">Press kit, brand assets, and media contacts.</p>
          </Link>
          <Link href="/docs" className="group rounded-xl border border-purple-600/10 p-5 hover:border-purple-600/30">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <FileText className="h-5 w-5" /> Docs
            </div>
            <p className="text-sm text-foreground/70">API reference, SDKs, and integration guides.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Duplicate legacy export removed


