"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "@/lib/customer-auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { setCustomer } = useCustomerAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Registration failed");
        return;
      }

      setCustomer(data.data);
      router.push("/account");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-6 text-center">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full h-11 px-3 border border-neutral-300 rounded-md text-sm"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full h-11 px-3 border border-neutral-300 rounded-md text-sm"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full h-11 px-3 border border-neutral-300 rounded-md text-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          className="w-full h-11 px-3 border border-neutral-300 rounded-md text-sm"
          required
          minLength={6}
        />

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
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-sm text-neutral-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
