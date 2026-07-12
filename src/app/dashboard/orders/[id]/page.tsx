"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

interface OrderItem {
  id: number;
  colourVariantId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  id: number;
  orderIdDisplay: string;
  customerId: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  deliveryFee: number;
  deliveryAddressLine1: string;
  deliveryAddressLine2: string | null;
  deliveryCity: string;
  deliveryState: string | null;
  deliveryCountry: string;
  deliveryNotes: string | null;
  staffNotes: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [staffNotes, setStaffNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setOrder(d.data);
          setNewStatus(d.data.status);
          setStaffNotes(d.data.staffNotes || "");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate() {
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus !== order?.status ? newStatus : undefined,
          staffNotes,
        }),
      });
      const data = await res.json();
      if (data.success) setOrder(data.data);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-neutral-500">Loading...</p>;
  if (!order) return <p className="text-neutral-500">Order not found.</p>;

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => router.push("/dashboard/orders")}
        className="text-sm text-primary-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Orders
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">{order.orderIdDisplay}</h1>
        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Order Items */}
        <div className="bg-surface border border-border rounded-md p-4">
          <h2 className="font-semibold text-neutral-900 mb-3">Items</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-2 font-medium text-neutral-600">Item</th>
                <th className="text-right pb-2 font-medium text-neutral-600">Qty</th>
                <th className="text-right pb-2 font-medium text-neutral-600">Price</th>
                <th className="text-right pb-2 font-medium text-neutral-600">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="py-2">Variant #{item.colourVariantId}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">₦{item.unitPrice.toLocaleString()}</td>
                  <td className="py-2 text-right font-medium">₦{item.subtotal.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-border mt-3 pt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>₦{(order.totalAmount - order.deliveryFee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery</span>
              <span>₦{order.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900">
              <span>Total</span>
              <span>₦{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-surface border border-border rounded-md p-4">
          <h2 className="font-semibold text-neutral-900 mb-2">Delivery</h2>
          <p className="text-sm text-neutral-600">{order.deliveryAddressLine1}</p>
          {order.deliveryAddressLine2 && <p className="text-sm text-neutral-600">{order.deliveryAddressLine2}</p>}
          <p className="text-sm text-neutral-600">
            {order.deliveryCity}{order.deliveryState ? `, ${order.deliveryState}` : ""}, {order.deliveryCountry}
          </p>
          <p className="text-sm text-neutral-500 mt-1">Payment: {order.paymentMethod.replace("_", " ")} — {order.paymentStatus}</p>
        </div>

        {/* Update Status */}
        <div className="bg-surface border border-border rounded-md p-4">
          <h2 className="font-semibold text-neutral-900 mb-3">Update Order</h2>
          <div className="flex flex-col gap-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="h-10 px-3 border border-neutral-300 rounded-md text-sm"
            >
              {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <textarea
              value={staffNotes}
              onChange={(e) => setStaffNotes(e.target.value)}
              placeholder="Staff notes..."
              className="h-20 px-3 py-2 border border-neutral-300 rounded-md text-sm resize-none"
            />
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="self-start h-9 px-4 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
