"use client";

import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // Placeholder: integrate Sentry here if available
    if (typeof window !== 'undefined') {
      // Avoid breaking rendering if logging fails
      try { console.error("ErrorBoundary caught", error, info); } catch {}
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg rounded-2xl border-2 border-purple-600/20 bg-white p-6 text-center dark:bg-gray-900">
          <div className="text-xl font-semibold mb-2">Something went wrong</div>
          <div className="text-sm text-foreground/70">Please refresh the page. If the issue persists, contact support.</div>
        </div>
      );
    }
    return this.props.children;
  }
}


