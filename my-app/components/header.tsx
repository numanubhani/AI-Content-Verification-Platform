"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-emerald-500 to-sky-500" />
          <span>AI Verify</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <Link href="/upload" className="hover:opacity-80">Upload</Link>
          <Link href="/pricing" className="hover:opacity-80">Pricing</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


