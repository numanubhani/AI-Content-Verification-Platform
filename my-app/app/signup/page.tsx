"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signup = useAuthStore((s) => s.signup);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => setError(null), [email, password, confirm]);

  useEffect(() => {
    if (user) {
      if (user.plan === "enterprise") router.push("/admin");
      else router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Use <strong>admin@gmail.com</strong> for admin dashboard, or any email
        for user dashboard
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);

          if (password !== confirm) {
            setError("Passwords do not match");
            return;
          }

          if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
          }

          setLoading(true);
          try {
            await signup(email, password);
          } catch (err: any) {
            setError(err.message || "Signup failed. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
        className="mt-6 space-y-4 rounded-2xl border p-6"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com or any email"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Any password"
          />
        </div>
        <div>
          <label className="block text-sm">Confirm Password</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        {error && (
          <div className="rounded-md bg-red-50 text-red-700 text-sm p-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-foreground/10" />
          <span className="text-xs text-foreground/50">or</span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm"
          >
            <span>Continue with Google</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm"
          >
            <span>Continue with GitHub</span>
          </button>
        </div>
        <div className="text-sm text-center">
          <span className="text-foreground/70">Already have an account? </span>
          <Link className="text-purple-600 hover:underline" href="/login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
