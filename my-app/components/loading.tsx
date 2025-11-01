"use client";

import { Loader2 } from "lucide-react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
};

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} style={{ color: '#ff0eb0' }} />
      {text && <p className="text-sm text-foreground/70">{text}</p>}
    </div>
  );
}

type LoadingOverlayProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    </div>
  );
}

type LoadingPageProps = {
  text?: string;
};

export function LoadingPage({ text = "Loading..." }: LoadingPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

