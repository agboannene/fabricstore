"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

interface Order {
  id: number;
  orderIdDisplay: string;
  customerId: number;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const url = statusFilter
      ? `/api/orders?status=${statusFilter}`
      : "/api/orders";
    fetch(url)
      .then((r) => r.json())
      .then((d) => { if (d.success) setOrders(d.data); })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 border border-neutral-300 rounded-md text-sm"
        >
          <option value="">All statuses</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="bg-surface border border-border rounded-md p-8 text-center">
          <p className="text-neutral-500">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Payment</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-600">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-neutral-50 cursor-pointer" onClick={() => window.location.href = `/dashboard/orders/${order.id}`}>
                  <td className="px-4 py-3 font-medium text-primary-500 hover:underline">{order.orderIdDisplay}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center h-6 px-2 rounded text-xs font-medium bg-neutral-100 text-neutral-700">
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize">{order.paymentStatus}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₦{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
