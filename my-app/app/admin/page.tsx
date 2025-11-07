"use client";

import { useAuthStore } from "@/store/auth";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Shield, Users, Activity, Globe, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.plan !== "enterprise") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user || user.plan !== "enterprise") return null;

  // Mock admin data (memoized to avoid recomputation)
  const mockStats = useMemo(() => ({
    totalUsers: 15247,
    activeUsers: 8432,
    totalAnalyses: 1254809,
    successfulAnalyses: 1249234,
    failedAnalyses: 5575,
    topCountries: [
      { country: "United States", count: 452309, percentage: 36 },
      { country: "United Kingdom", count: 234567, percentage: 19 },
      { country: "Canada", count: 156789, percentage: 12 },
      { country: "Australia", count: 123456, percentage: 10 },
      { country: "Germany", count: 98765, percentage: 8 },
    ],
    userPlans: {
      free: 8234,
      basic: 3456,
      pro: 2345,
      suite: 876,
      enterprise: 336,
    },
    recentActivity: [
      { id: 1, type: "signup", user: "user@example.com", plan: "pro", time: "2 mins ago", ip: "192.168.1.1" },
      { id: 2, type: "analysis", user: "test@example.com", plan: "free", time: "5 mins ago", ip: "10.0.0.1" },
      { id: 3, type: "upgrade", user: "premium@example.com", plan: "enterprise", time: "12 mins ago", ip: "172.16.0.1" },
      { id: 4, type: "analysis", user: "demo@example.com", plan: "basic", time: "18 mins ago", ip: "192.168.1.2" },
      { id: 5, type: "analysis", user: "trial@example.com", plan: "free", time: "25 mins ago", ip: "10.0.0.2" },
    ],
  }), []);

  const successRate = useMemo(() => ((mockStats.successfulAnalyses / mockStats.totalAnalyses) * 100).toFixed(2), [mockStats]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-lg text-foreground/70">System monitoring and user management</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8" style={{ color: '#ff0eb0' }} />
          <span className="text-sm font-medium text-foreground/70">Enterprise Admin</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <Users className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{mockStats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-foreground/70">Total Users</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <Activity className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{mockStats.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-foreground/70">Active Users</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-600/10">
              <CheckCircle className="h-6 w-6" style={{ color: '#16a34a' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{successRate}%</div>
          <div className="text-sm text-foreground/70">Success Rate</div>
        </div>

        <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600/10">
              <TrendingUp className="h-6 w-6" style={{ color: '#ff0eb0' }} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{mockStats.totalAnalyses.toLocaleString()}</div>
          <div className="text-sm text-foreground/70">Total Analyses</div>
        </div>
      </div>

      {/* User Plan Distribution */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-xl font-bold mb-4">User Plan Distribution</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Free</p>
            <p className="text-2xl font-bold text-purple-600">{mockStats.userPlans.free.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Basic</p>
            <p className="text-2xl font-bold text-purple-600">{mockStats.userPlans.basic.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Pro</p>
            <p className="text-2xl font-bold text-purple-600">{mockStats.userPlans.pro.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Suite</p>
            <p className="text-2xl font-bold text-purple-600">{mockStats.userPlans.suite.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-purple-600/10 bg-purple-50/30 dark:bg-purple-950/20 p-4">
            <p className="text-sm uppercase tracking-wide text-foreground/60 mb-2">Enterprise</p>
            <p className="text-2xl font-bold text-purple-600">{mockStats.userPlans.enterprise.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-xl font-bold mb-4">Top Countries by Usage</h3>
        <div className="space-y-4">
          {mockStats.topCountries.map((country, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-foreground/40" />
                <span className="font-medium">{country.country}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-purple-600/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full transition-all" 
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-24 text-right">{country.count.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-600/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/70">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/70">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/70">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/70">IP Address</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/70">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockStats.recentActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-purple-600/10 hover:bg-purple-600/5 transition-colors">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide rounded-full bg-purple-600/10 px-2 py-1">
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{activity.user}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-medium capitalize">{activity.plan}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-foreground/60">{activity.ip}</td>
                  <td className="py-3 px-4 text-sm text-foreground/60">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failed Analyses Alert */}
      <div className="rounded-3xl border-2 border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6" style={{ color: '#eab308' }} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Failed Analyses Detected</h3>
            <p className="text-foreground/70">
              {mockStats.failedAnalyses.toLocaleString()} failed analyses detected in the last 24 hours. Consider reviewing system health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
