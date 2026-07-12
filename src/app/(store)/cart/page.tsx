"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">Cart</h1>
        <p className="text-neutral-500 mb-6">Your cart is empty.</p>
        <Link
          href="/catalogue"
          className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h2 font-heading font-bold text-neutral-900">Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div
            key={item.colourVariantId}
            className="flex items-center gap-4 bg-white border border-neutral-200 rounded-md p-4"
          >
            <div className="flex-1">
              <Link
                href={`/products/${item.productSlug}`}
                className="font-semibold text-neutral-900 hover:text-primary-500"
              >
                {item.productName}
              </Link>
              <p className="text-sm text-neutral-500">Colour: {item.colourName}</p>
              <p className="text-sm font-medium text-neutral-900">
                ₦{item.unitPrice.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.colourVariantId, -1)}
                className="w-8 h-8 border border-neutral-300 rounded text-lg hover:bg-neutral-50"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.colourVariantId, 1)}
                className="w-8 h-8 border border-neutral-300 rounded text-lg hover:bg-neutral-50"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold">
              ₦{(item.unitPrice * item.quantity).toLocaleString()}
            </p>

            <button
              onClick={() => removeItem(item.colourVariantId)}
              className="text-neutral-400 hover:text-red-500 text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 rounded-md p-4">
        <div className="flex items-center justify-between text-lg font-bold text-neutral-900">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1">Delivery fee calculated at checkout</p>
      </div>

      <Link
        href="/checkout"
        className="mt-4 w-full h-12 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 flex items-center justify-center no-underline"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
