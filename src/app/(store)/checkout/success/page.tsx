import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Verifying Payment...</h1>
          <p className="text-neutral-500">Please wait while we confirm your payment.</p>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
