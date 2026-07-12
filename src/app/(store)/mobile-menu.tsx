"use client";

import { useState } from "react";
import Link from "next/link";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { useCart } from "@/lib/cart-context";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { customer } = useCustomerAuth();
  const { itemCount } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-9 h-9 flex items-center justify-center text-white"
        aria-label="Menu"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-50 bg-primary-500 md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            <Link href="/catalogue" onClick={() => setOpen(false)} className="text-white text-lg font-medium no-underline">
              Catalogue
            </Link>
            <Link href="/track" onClick={() => setOpen(false)} className="text-white text-lg font-medium no-underline">
              Track Order
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-white text-lg font-medium no-underline">
              Contact
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="text-white text-lg font-medium no-underline flex items-center gap-2">
              Cart{itemCount > 0 && ` (${itemCount})`}
            </Link>
            <Link href={customer ? "/account" : "/login"} onClick={() => setOpen(false)} className="text-white text-lg font-medium no-underline">
              {customer ? customer.name : "Sign In"}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
