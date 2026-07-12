"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCustomerAuth } from "@/lib/customer-auth-context";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

interface Order {
  id: number;
  orderIdDisplay: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function AccountPage() {
  const { customer, loading, logout } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (customer) {
      fetch("/api/auth/customer/me")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.data.orders) setOrders(d.data.orders);
        });
    }
  }, [customer]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-6 py-16 text-center text-neutral-500">Loading...</div>;
  }

  if (!customer) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">My Account</h1>
        <p className="text-neutral-500 mb-6">Sign in to view your orders and account details.</p>
        <Link
          href="/login"
          className="inline-flex h-10 px-6 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 items-center no-underline"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h2 font-heading font-bold text-neutral-900">My Account</h1>
        <button onClick={logout} className="text-sm text-neutral-500 hover:text-red-500">
          Sign Out
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-md p-4 mb-6">
        <p className="font-medium text-neutral-900">{customer.name}</p>
        <p className="text-sm text-neutral-500">{customer.email}</p>
        <p className="text-sm text-neutral-500">{customer.phone}</p>
      </div>

      <h2 className="font-semibold text-neutral-900 mb-4">Order History</h2>

      {orders.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-md p-6 text-center">
          <p className="text-neutral-500 mb-4">No orders yet.</p>
          <Link
            href="/catalogue"
            className="text-primary-500 hover:underline text-sm font-medium"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Order</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-600">Total</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-neutral-200 last:border-0">
                  <td className="px-4 py-3 font-medium">{order.orderIdDisplay}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex h-6 px-2 rounded text-xs font-medium bg-neutral-100 text-neutral-700">
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
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
