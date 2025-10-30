"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { Menu } from "lucide-react";

export function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-emerald-500 to-sky-500" />
          <span>AI Verify</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <Link href="/" className="hover:opacity-80">Home</Link>
            <Link href="/upload" className="hover:opacity-80">Upload</Link>
            <Link href="/pricing" className="hover:opacity-80">Pricing</Link>
            <Link href="/about" className="hover:opacity-80">About</Link>
            {user ? (
              <>
                <Link href="/dashboard/history" className="hover:opacity-80">Dashboard</Link>
                <button onClick={logout} className="rounded-full border px-3 py-1 hover:bg-foreground/5">Logout</button>
              </>
            ) : (
              <Link href="/auth" className="hover:opacity-80">Login</Link>
            )}
            <ThemeToggle />
          </nav>
          <button
            className="inline-flex items-center rounded-lg border px-2 py-1 sm:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
            <Link href="/" className="py-1" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/upload" className="py-1" onClick={() => setOpen(false)}>Upload</Link>
            <Link href="/pricing" className="py-1" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/about" className="py-1" onClick={() => setOpen(false)}>About</Link>
            {user ? (
              <>
                <Link href="/dashboard/history" className="py-1" onClick={() => setOpen(false)}>Dashboard</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="rounded-full border px-3 py-1">Logout</button>
              </>
            ) : (
              <Link href="/auth" className="py-1" onClick={() => setOpen(false)}>Login</Link>
            )}
            <div className="pt-2"><ThemeToggle /></div>
          </nav>
        </div>
      )}
    </header>
  );
}


