"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useHistoryStore } from "@/store/history";
import { useUsageStore } from "@/store/usage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, TrendingUp, Shield, Clock, ArrowRight, Crown, Activity, Settings, Key, Lock, LogOut } from "lucide-react";
import { useMemo } from "react";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const items = useHistoryStore((s) => s.items);
  const analysisCount = useUsageStore((s) => s.analysisCount);
  const freeLimit = useUsageStore((s) => s.freeLimit);
  const router = useRouter();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Redirect enterprise (admin) users to the admin dashboard to avoid mixing views
    if (user.plan === "enterprise") {
      router.push("/admin");
    }
  }, [user, router]);

  const isPaidUser = user ? user.plan !== "free" : false;
  const recentItems = useMemo(() => items.slice(0, 5), [items]);

  // Calculate stats (memoized to avoid recomputation on unrelated state changes)
  const { totalAnalyses, avgTrustScore, textCount, imageCount, videoCount } = useMemo(() => {
    const total = items.length;
    if (total === 0) {
      return { totalAnalyses: 0, avgTrustScore: 0, textCount: 0, imageCount: 0, videoCount: 0 };
    }
    let trustSum = 0;
    let text = 0, image = 0, video = 0;
    for (const item of items) {
      trustSum += item.trust_score;
      if (item.kind === "text") text++;
      else if (item.kind === "image") image++;
      
      else if (item.kind === "video") video++;
    }
    return {
      totalAnalyses: total,
      avgTrustScore: Math.round(trustSum / total),
      textCount: text,
      imageCount: image,
      videoCount: video,
    };
  }, [items]);

  // Block UI render while unauthenticated or while redirecting admins
  if (!user || user.plan === "enterprise") return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-lg text-foreground/70">Welcome back, {user.email.split('@')[0]}!</p>
        </div>
        <Link 
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 transition-all hover:-translate-y-0.5 font-medium"
        >
          {isPaidUser ? "Manage Plan" : "Upgrade"}
          {!isPaidUser && <Crown className="h-4 w-4" />}
        </Link>
      </div>

      {/* Usage Overview */}
      {!isPaidUser && (
        <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm uppercase tracking-wide text-foreground/60 mb-3">Usage Overview</p>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">
              {analysisCount} of {freeLimit} free checks used
            </h2>
            <div className="text-2xl font-bold text-purple-600">{freeLimit - analysisCount} left</div>
          </div>
          <div className="w-full bg-purple-600/10 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-purple-600 h-full transition-all duration-500" 
              style={{ width: `${(analysisCount / freeLimit) * 100}%` }}
            />
          </div>
          <p className="text-sm text-foreground/70 mt-3">
            Upgrade to unlock unlimited analyses and advanced features
          </p>
        </div>
      )}

      {/* Current Plan */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Current Plan</p>
            <h2 className="text-2xl font-bold capitalize">{user.plan}</h2>
            <p className="text-foreground/70 mt-1">
              {isPaidUser ? "Unlimited analyses and priority support" : "5 free analyses per day"}
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-600/10">
            <Shield className="h-10 w-10" style={{ color: '#ff0eb0' }} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <FileText className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{totalAnalyses}</div>
          <div className="text-sm text-foreground/70">Total Analyses</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <TrendingUp className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{avgTrustScore}%</div>
          <div className="text-sm text-foreground/70">Avg Trust Score</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <Activity className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{textCount + imageCount + videoCount}</div>
          <div className="text-sm text-foreground/70">All Content Types</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <Clock className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{recentItems.length}</div>
          <div className="text-sm text-foreground/70">Recent Items</div>
        </div>
      </div>

      {/* Content Type Breakdown */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-xl font-bold mb-4">Content Type Distribution</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Text</p>
            <p className="text-2xl font-bold text-purple-600">{textCount}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Images</p>
            <p className="text-2xl font-bold text-purple-600">{imageCount}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Videos</p>
            <p className="text-2xl font-bold text-purple-600">{videoCount}</p>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Recent Reports</h3>
          {items.length > 0 && (
            <Link 
              href="/dashboard/history" 
              className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg font-medium mb-2">No reports yet</div>
            <p className="text-foreground/70 mb-4">Upload a file to generate your first report.</p>
            <Link 
              href="/upload" 
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 transition-all font-medium"
            >
              Go to Upload
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentItems.map((r) => (
              <Link 
                key={r.id} 
                href={`/report/${r.id}`} 
                className="group flex items-center justify-between rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4 transition-all hover:border-purple-600/30 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600/10">
                    <FileText className="h-5 w-5" style={{ color: '#ff0eb0' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{r.label}</span>
                      <span className="text-xs uppercase tracking-wide text-foreground/60">{r.kind}</span>
                    </div>
                    <p className="text-sm text-foreground/60">
                      {new Date(r.createdAt).toLocaleDateString()} {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">{r.trust_score}%</div>
                  <div className="text-xs text-foreground/60">Trust Score</div>
                </div>
                <ArrowRight className="h-5 w-5 text-foreground/40 group-hover:text-purple-600 transition-colors ml-4" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6" style={{ color: '#ff0eb0' }} />
          <h3 className="text-xl font-bold">Settings</h3>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordDialog(true)}
            className="w-full flex items-center justify-between rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4 transition-all hover:border-purple-600/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              <div className="text-left">
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-foreground/60">Update your account password</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/40" />
          </button>
          
          <button
            onClick={() => setShow2FADialog(true)}
            className="w-full flex items-center justify-between rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4 transition-all hover:border-purple-600/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5" style={{ color: '#ff0eb0' }} />
              <div className="text-left">
                <div className="font-medium">Two-Factor Authentication (2FA)</div>
                <div className="text-sm text-foreground/60">Add an extra layer of security</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/40" />
          </button>

          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center justify-between rounded-xl border border-red-500/20 bg-red-50/30 dark:bg-red-950/20 p-4 transition-all hover:border-red-500/30 hover:shadow-lg text-red-600"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Logout</div>
                <div className="text-sm text-foreground/60">Sign out of your account</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

