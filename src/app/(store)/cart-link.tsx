"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="text-white/85 no-underline text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
    >
      Cart
      {itemCount > 0 && (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-primary-500 text-xs font-bold">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
