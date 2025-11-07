"use client";

import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.plan !== "enterprise") {
      router.push("/dashboard/history");
    }
  }, [user, router]);

  if (!user || user.plan !== "enterprise") {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-foreground/70">System monitoring and user management</p>
        </div>
        <div className="rounded-full border px-3 py-1 text-sm">
          Admin: <span className="font-medium">{user.email}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-foreground/70">Total Users</div>
          <div className="mt-2 text-3xl font-bold">15,247</div>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-foreground/70">Active Users</div>
          <div className="mt-2 text-3xl font-bold">8,432</div>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-foreground/70">Total Analyses</div>
          <div className="mt-2 text-3xl font-bold">1,254,809</div>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="text-sm text-foreground/70">Success Rate</div>
          <div className="mt-2 text-3xl font-bold">99.56%</div>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span>User registration</span>
            <span className="text-foreground/60">2 minutes ago</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Analysis completed</span>
            <span className="text-foreground/60">5 minutes ago</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>New subscription</span>
            <span className="text-foreground/60">12 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
