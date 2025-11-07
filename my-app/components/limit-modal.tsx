"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Lock, Crown, ArrowRight } from "lucide-react";

type LimitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentCount: number;
  limit: number;
};

export function LimitModal({ isOpen, onClose, currentCount, limit }: LimitModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-md rounded-3xl border-2 border-purple-600/20 bg-white dark:bg-gray-900 p-8 shadow-2xl transition-all ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-purple-600/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-foreground/70" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-purple-600/10 mb-6">
          <Lock className="h-8 w-8" style={{ color: '#ff0eb0' }} />
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            Free Limit Reached
          </h2>
          <p className="text-foreground/70 mb-6">
            You&apos;ve used <span className="font-semibold text-purple-600">{currentCount} out of {limit}</span> free analyses today.
            Upgrade to continue verifying content without limits.
          </p>

          {/* Features list */}
          <div className="text-left bg-purple-600/5 dark:bg-purple-950/20 rounded-2xl p-4 mb-6">
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Crown className="h-4 w-4" style={{ color: '#ff0eb0' }} />
              Upgrade Benefits:
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Unlimited analyses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Detailed reports & insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>API access</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-all hover:-translate-y-0.5 font-medium"
              onClick={handleClose}
            >
              View Pricing Plans
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              onClick={handleClose}
              className="flex-1 rounded-full border-2 border-purple-600/30 bg-transparent px-6 py-3 text-purple-600 hover:bg-purple-600/10 transition-all font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

