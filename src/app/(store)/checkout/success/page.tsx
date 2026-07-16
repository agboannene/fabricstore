"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [details, setDetails] = useState<{ amount?: number; paid_at?: string }>({});

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    fetch(`/api/payments/verify?reference=${reference}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.status === "success") {
          setStatus("success");
          setDetails({ amount: d.data.amount, paid_at: d.data.paid_at });
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [reference]);

  if (status === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Verifying Payment...</h1>
        <p className="text-neutral-500">Please wait while we confirm your payment.</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-neutral-500 mb-6">
          We could not verify your payment. If you were charged, please contact support.
        </p>
        <Link
          href="/catalogue"
          className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Payment Successful!</h1>
      <p className="text-neutral-600 mb-2">
        Thank you for your payment of <strong>₦{details.amount?.toLocaleString()}</strong>.
      </p>
      <p className="text-neutral-500 text-sm mb-6">
        Your order has been confirmed. You will be contacted shortly for delivery.
      </p>
      <Link
        href="/catalogue"
        className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
