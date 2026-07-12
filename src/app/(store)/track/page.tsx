"use client";

import { useState } from "react";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?limit=100`);
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(
          (o: any) =>
            o.orderIdDisplay.toLowerCase() === orderId.trim().toLowerCase()
        );
        if (found) {
          setOrder(found);
        } else {
          setError("Order not found. Check your order ID and try again.");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-2">
        Track Order
      </h1>
      <p className="text-neutral-500 mb-6">
        Enter your order ID to check its status.
      </p>

      <form onSubmit={handleTrack} className="flex gap-2 mb-6">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. ORD-ABC123"
          className="flex-1 h-11 px-3 border border-neutral-300 rounded-md text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {order && (
        <div className="bg-white border border-neutral-200 rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-900">{order.orderIdDisplay}</h2>
            <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-medium text-neutral-900">
                ₦{order.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status</span>
              <span className="capitalize">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{order.deliveryCity}, {order.deliveryState || order.deliveryCountry}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
