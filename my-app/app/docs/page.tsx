"use client";

import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-foreground/70">Frontend preview. Replace with Swagger or MDX later.</p>
      </div>
      <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-xl font-semibold mb-3">Authentication</h2>
        <pre className="rounded-lg border border-purple-600/10 bg-purple-50/30 p-4 text-sm dark:bg-purple-950/20">POST /api/auth/login {`{ email, password }`}</pre>
      </div>
      <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-xl font-semibold mb-3">Analyze</h2>
        <pre className="rounded-lg border border-purple-600/10 bg-purple-50/30 p-4 text-sm dark:bg-purple-950/20">POST /api/analyze?kind=text|image|video</pre>
      </div>
      <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-xl font-semibold mb-3">Stats</h2>
        <pre className="rounded-lg border border-purple-600/10 bg-purple-50/30 p-4 text-sm dark:bg-purple-950/20">GET /api/stats</pre>
      </div>
      <div className="text-sm text-foreground/70">Looking for a full OpenAPI? <Link href="#" className="text-purple-600">Contact us</Link>.</div>
    </div>
  );
}


