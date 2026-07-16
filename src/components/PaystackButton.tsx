"use client";

import { useState } from "react";

interface PaystackButtonProps {
  email: string;
  amount: number;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onError: (error: string) => void;
  beforeOpen?: () => Promise<string | null>;
  disabled?: boolean;
  children?: React.ReactNode;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string; status: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export default function PaystackButton({
  email,
  amount,
  metadata,
  onSuccess,
  onError,
  beforeOpen,
  disabled = false,
  children,
}: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!window.PaystackPop) {
      onError("Paystack script not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      let ref = `FS-${Date.now()}`;
      if (beforeOpen) {
        const orderId = await beforeOpen();
        if (orderId) ref = orderId;
      }

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        email,
        amount: Math.round(amount * 100),
        currency: "NGN",
        ref,
        metadata: metadata || {},
        callback: (response) => {
          setLoading(false);
          onSuccess(response.reference);
        },
        onClose: () => {
          setLoading(false);
        },
      });

      handler.openIframe();
    } catch {
      setLoading(false);
      onError("Failed to initialize payment");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full h-12 bg-[#1A5632] text-white text-sm font-semibold rounded-md hover:bg-[#15472A] disabled:opacity-50 transition-colors"
    >
      {loading ? "Processing..." : children || `Pay ₦${amount.toLocaleString()}`}
    </button>
  );
}
