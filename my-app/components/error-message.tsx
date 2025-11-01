"use client";

import { AlertCircle, RefreshCw, X } from "lucide-react";

type ErrorMessageProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: "default" | "destructive" | "warning";
  className?: string;
};

export function ErrorMessage({
  title,
  message,
  onRetry,
  onDismiss,
  variant = "default",
  className = "",
}: ErrorMessageProps) {
  const variantStyles = {
    default: "border-purple-600/20 bg-purple-50/50 dark:bg-purple-950/20",
    destructive: "border-red-500/30 bg-red-50/50 dark:bg-red-950/20",
    warning: "border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20",
  };

  const iconColor = variant === "destructive" ? "#ef4444" : variant === "warning" ? "#eab308" : "#ff0eb0";

  return (
    <div className={`rounded-2xl border-2 p-6 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start gap-4">
        <AlertCircle className="h-6 w-6 flex-shrink-0" style={{ color: iconColor }} />
        <div className="flex-1">
          {title && <h3 className="font-semibold mb-2">{title}</h3>}
          <p className="text-foreground/70">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition-all font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="rounded-full p-1 hover:bg-foreground/10 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-5 w-5 text-foreground/60" />
          </button>
        )}
      </div>
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
};

export function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-12 text-center">
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-600/10">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 mb-6 max-w-md mx-auto">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-all hover:-translate-y-0.5 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

