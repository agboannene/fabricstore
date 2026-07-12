"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = search ? `/api/customers?search=${encodeURIComponent(search)}` : "/api/customers";
    fetch(url)
      .then((r) => r.json())
      .then((d) => { if (d.success) setCustomers(d.data); })
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Customers</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="h-9 w-64 px-3 border border-neutral-300 rounded-md text-sm"
        />
      </div>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : customers.length === 0 ? (
        <div className="bg-surface border border-border rounded-md p-8 text-center">
          <p className="text-neutral-500">No customers found.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Phone</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-600">Orders</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-600">Total Spent</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Since</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-neutral-600">{c.email || "—"}</td>
                  <td className="px-4 py-3 text-neutral-600">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-right">{c.totalOrders}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₦{c.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(c.createdAt).toLocaleDateString()}
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
