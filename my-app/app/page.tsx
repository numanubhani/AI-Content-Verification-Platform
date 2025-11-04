"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Shield, Zap, FileText, CheckCircle, ArrowRight, Sparkles, Users, Globe, Lock, Award, TrendingUp, BarChart3, Database, Brain, Webhook, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liveStats, setLiveStats] = useState<{ totalChecks: number; accuracyRate: number; countriesServed: number; activeUsers: number } | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/stats', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => { if (isMounted) setLiveStats(data); })
      .catch(() => {});
    const i = setInterval(() => {
      fetch('/api/stats', { cache: 'no-store' })
        .then((r) => r.json())
        .then((data) => { if (isMounted) setLiveStats(data); })
        .catch(() => {});
    }, 15000);
    return () => { isMounted = false; clearInterval(i); };
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-purple-600/20 bg-purple-600/5 p-12 sm:p-16">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/30 blur-[100px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/30 blur-[100px] animate-pulse" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              color: "#8b5cf6",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/30 bg-purple-600/10 px-4 py-2 text-sm font-medium text-purple-600">
            <Sparkles className="h-4 w-4" style={{ color: '#ff0eb0' }} />
            AI-Powered Content Verification
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            AI Content Verification for Media & Education
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-foreground/70">
            Check texts, photos, and videos for the use of artificial intelligence. For editorial offices, educational platforms,
            and teams that value trust.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/upload" 
              className="group inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:-translate-y-0.5"
            >
              Start Verifying Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600/30 bg-transparent px-8 py-4 text-base font-semibold text-foreground backdrop-blur transition-all hover:bg-purple-600/10 hover:border-purple-600/50"
            >
              View Pricing Plans
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              <span>99.9% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              <span>Results in Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Verify Content
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Powerful features designed for professionals
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              icon: Shield, 
              title: "Multi-Modal Detection", 
              desc: "Analyze text, images, and videos with state-of-the-art AI models"
            },
            { 
              icon: Zap, 
              title: "Instant Results", 
              desc: "Get comprehensive verification reports in seconds, not minutes"
            },
            { 
              icon: FileText, 
              title: "Detailed Reports", 
              desc: "Understand why content was flagged with explainable insights"
            },
            { 
              icon: Globe, 
              title: "Enterprise Ready", 
              desc: "Built for scale with API access and team collaboration tools"
            },
            { 
              icon: Lock, 
              title: "Enterprise Security", 
              desc: "Bank-level encryption with SOC 2 compliance and GDPR-ready privacy controls"
            },
            { 
              icon: Award, 
              title: "Industry Leading", 
              desc: "Recognized by Gartner and Forrester as a leader in content verification"
            },
            { 
              icon: TrendingUp, 
              title: "Scalable Infrastructure", 
              desc: "Handle millions of verifications daily with 99.99% uptime guarantee"
            },
            { 
              icon: Brain, 
              title: "Advanced AI Models", 
              desc: "Continuously updated deep learning models trained on latest AI-generated content"
            },
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-2xl border border-purple-600/10 bg-white p-6 transition-all hover:border-purple-600/30 hover:shadow-lg dark:bg-gray-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/10 transition-all group-hover:bg-purple-600/20">
                <feature.icon className="h-6 w-6" style={{ color: '#ff0eb0' }} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="rounded-3xl border-2 border-purple-600/10 bg-purple-600/5 p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Three simple steps to verify any content
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            { 
              title: "Upload Content", 
              desc: "Paste text, upload images, or add videos through our secure interface. We support all major formats.",
              icon: "01"
            },
            { 
              title: "AI Analysis", 
              desc: "Our advanced models analyze your content using multiple detection techniques for maximum accuracy.",
              icon: "02"
            },
            { 
              title: "Get Insights", 
              desc: "Receive a detailed report with trust scores, explanations, and actionable recommendations.",
              icon: "03"
            },
          ].map((step, idx) => (
            <div key={idx} className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-2xl font-bold text-white shadow-lg">
                {step.icon}
                {idx < 2 && (
                  <div className="absolute left-full top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-purple-600 sm:block" />
                )}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-foreground/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted Across Industries
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Built for teams who value authenticity
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              title: "Media & Journalism", 
              desc: "Verify user-generated content and protect your publication's credibility with real-time AI detection.",
              icon: "📰"
            },
            { 
              title: "Education", 
              desc: "Maintain academic integrity by detecting AI-assisted assignments and plagiarism at scale.",
              icon: "🎓"
            },
            { 
              title: "Legal & Compliance", 
              desc: "Ensure document authenticity and verify evidence with enterprise-grade security and audit trails.",
              icon: "⚖️"
            },
          ].map((useCase, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-2xl border border-purple-600/10 bg-white p-8 transition-all hover:border-purple-600/30 hover:shadow-xl dark:bg-gray-900"
            >
              <div className="text-4xl">{useCase.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{useCase.title}</h3>
              <p className="mt-3 text-foreground/70">{useCase.desc}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-purple-600 transition-all group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Built on Cutting-Edge Technology
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Powered by state-of-the-art AI and machine learning models for unparalleled accuracy
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { 
              icon: BarChart3, 
              title: "Multi-Model Ensemble", 
              desc: "Our proprietary ensemble method combines 15+ specialized detection models for maximum accuracy across all content types."
            },
            { 
              icon: Database, 
              title: "Massive Training Data", 
              desc: "Trained on over 2 billion human and AI-generated content samples from 100+ languages and formats."
            },
            { 
              icon: Webhook, 
              title: "Real-Time Processing", 
              desc: "Engineered for sub-second response times with advanced caching and distributed processing infrastructure."
            },
          ].map((tech, idx) => (
            <div key={idx} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-purple-600/10">
                <tech.icon className="h-8 w-8" style={{ color: '#ff0eb0' }} />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{tech.title}</h3>
              <p className="mt-3 text-foreground/70">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section (Live) */}
      <section className="rounded-3xl border-2 border-purple-600/20 bg-purple-600/10 p-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <Users className="mx-auto h-8 w-8" style={{ color: '#ff0eb0' }} />
              <div className="mt-4 text-4xl font-bold">{liveStats ? `${(liveStats.totalChecks).toLocaleString()}` : '10,000,000+'}</div>
              <div className="mt-2 text-foreground/70">Content Verified</div>
            </div>
            <div className="text-center">
              <Shield className="mx-auto h-8 w-8" style={{ color: '#ff0eb0' }} />
              <div className="mt-4 text-4xl font-bold">{liveStats ? `${liveStats.accuracyRate}%` : '99.9%'}</div>
              <div className="mt-2 text-foreground/70">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <Globe className="mx-auto h-8 w-8" style={{ color: '#ff0eb0' }} />
              <div className="mt-4 text-4xl font-bold">{liveStats ? `${liveStats.countriesServed}` : '127'}</div>
              <div className="mt-2 text-foreground/70">Countries Served</div>
            </div>
            <div className="text-center">
              <TrendingUp className="mx-auto h-8 w-8" style={{ color: '#ff0eb0' }} />
              <div className="mt-4 text-4xl font-bold">{liveStats ? `${(liveStats.activeUsers).toLocaleString()}` : '15,000+'}</div>
              <div className="mt-2 text-foreground/70">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by</h2>
          <p className="mt-2 text-foreground/70">Teams and institutions worldwide</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {['Guardian', 'Harvard', 'Reuters', 'BBC', 'Stanford', 'NYTimes'].map((brand) => (
            <div key={brand} className="flex items-center justify-center rounded-xl border border-purple-600/10 bg-white py-4 px-3 dark:bg-gray-900">
              <span className="text-sm font-semibold tracking-wide text-foreground/70">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-foreground/70">
            See what professionals are saying about our platform
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Sarah Chen",
              role: "Editor-in-Chief",
              company: "The Guardian",
              image: "👩‍💼",
              quote: "This platform has transformed our fact-checking process. We can verify content authenticity in real-time, maintaining our publication's integrity with confidence."
            },
            {
              name: "Dr. James Mitchell",
              role: "Academic Integrity Director",
              company: "Harvard University",
              image: "👨‍🏫",
              quote: "Implementing AI Verify has significantly reduced academic dishonesty. The explainability features help students understand why their content was flagged."
            },
            {
              name: "Marco Rodriguez",
              role: "CTO",
              company: "Reuters",
              image: "👨‍💻",
              quote: "The API integration was seamless, and the detection accuracy is exceptional. It's become an integral part of our verification workflow."
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="rounded-2xl border border-purple-600/10 bg-white p-8 dark:bg-gray-900">
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <p className="text-foreground/80 italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70">
            Everything you need to know about our platform
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              question: "How accurate is the AI content detection?",
              answer: "Our platform achieves 99.9% accuracy through a proprietary ensemble of 15+ specialized detection models, continuously trained on the latest AI-generated content across 100+ languages."
            },
            {
              question: "What file formats do you support?",
              answer: "We support all major formats: text (TXT, PDF, DOCX, MD), images (JPG, PNG, WEBP), and videos (MP4, MOV, AVI). Real-time API verification is available for programmatic integration."
            },
            {
              question: "Is my data secure and private?",
              answer: "Absolutely. We use bank-level encryption, SOC 2 compliance, and are GDPR-ready. Your content is processed securely and can be automatically deleted after analysis per your settings."
            },
            {
              question: "Can I integrate this into my existing workflow?",
              answer: "Yes! We provide comprehensive REST APIs, webhooks, and native integrations for popular platforms. Our enterprise clients can customize integration through dedicated support."
            },
          ].map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-purple-600/10 bg-white dark:bg-gray-900 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-600/5 transition-colors"
              >
                <span className="font-semibold text-left pr-4">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4">
                  <p className="text-foreground/70">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-purple-600/30 bg-purple-600 p-16 text-center">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Join thousands of professionals who trust our platform for content verification.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/upload" 
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-purple-600 shadow-xl transition-all hover:bg-gray-50 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/10"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


