"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { Menu, UserCircle, LogOut, LayoutDashboard } from "lucide-react";

export function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-5 w-5 rounded bg-purple-600" />
          <span>AI Verify</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <Link href="/" className="hover:opacity-80">Home</Link>
            <Link href="/upload" className="hover:opacity-80">Upload</Link>
            <Link href="/pricing" className="hover:opacity-80">Pricing</Link>
            <Link href="/about" className="hover:opacity-80">About</Link>
            {user ? (
              <div className="relative">
                <button
                  aria-label="Profile menu"
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-foreground/5"
                  onClick={() => setProfileOpen((o) => !o)}
                >
                  <UserCircle size={18} />
                  <span className="hidden md:inline">{user.email.split('@')[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-background shadow-lg">
                    <Link
                      href={user.plan === "enterprise" ? "/admin" : "/dashboard"}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-foreground/5"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-foreground/5"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hover:opacity-80">Login</Link>
            )}
            <ThemeToggle />
          </nav>
          {/* Mobile: show theme toggle to the left of hamburger */}
          <div className="sm:hidden"><ThemeToggle /></div>
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
                <Link
                  href={user.plan === "enterprise" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="flex items-center gap-2 rounded-full border px-3 py-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="py-1" onClick={() => setOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


