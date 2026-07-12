"use client";

import Link from "next/link";
import { useCustomerAuth } from "@/lib/customer-auth-context";

export default function AuthNav() {
  const { customer } = useCustomerAuth();

  if (customer) {
    return (
      <Link
        href="/account"
        className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors"
      >
        {customer.name}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors"
    >
      Sign In
    </Link>
  );
}
