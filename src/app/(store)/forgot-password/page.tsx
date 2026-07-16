"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-sm mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Check Your Email</h1>
        <p className="text-neutral-500 mb-6">
          If an account exists with <strong>{email}</strong>, we&apos;ve sent a password reset link.
        </p>
        <Link
          href="/login"
          className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-2 text-center">
        Forgot Password?
      </h1>
      <p className="text-sm text-neutral-500 text-center mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-3 border border-neutral-300 rounded-md text-sm"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm text-neutral-500 text-center">
          Remember your password?{" "}
          <Link href="/login" className="text-primary-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
