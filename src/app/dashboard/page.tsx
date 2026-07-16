"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  revenueToday: number;
  ordersToday: number;
  pendingOrders: number;
  lowStockItems: number;
}

interface AttendanceRecord {
  id: number;
  clockIn: string;
  clockOut: string | null;
  staffUser: { name: string; role: string };
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [present, setPresent] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/stats").then((r) => r.json()).catch(() => null),
      fetch("/api/staff/attendance/who").then((r) => r.json()).catch(() => null),
    ]).then(([statsRes, whoRes]) => {
      if (statsRes?.success) setStats(statsRes.data);
      if (whoRes?.success) setPresent(whoRes.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-neutral-500 text-sm">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Revenue Today", value: `₦${(stats?.revenueToday || 0).toLocaleString()}`, color: "text-green-600" },
          { label: "Orders Today", value: String(stats?.ordersToday || 0), color: "text-primary-600" },
          { label: "Pending Orders", value: String(stats?.pendingOrders || 0), color: "text-amber-600" },
          { label: "Low Stock Items", value: String(stats?.lowStockItems || 0), color: "text-red-600" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-neutral-200 rounded-md p-4">
            <p className="text-sm text-neutral-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {present.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-md p-4 mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Staff Present Today ({present.length})</h2>
          <div className="flex flex-wrap gap-2">
            {present.map((r) => (
              <span key={r.id} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {r.staffUser.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-neutral-200 rounded-md p-4">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center h-9 px-4 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors no-underline"
          >
            View Orders
          </Link>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center h-9 px-4 border border-primary-500 text-primary-500 text-sm font-semibold rounded-md hover:bg-primary-50 transition-colors no-underline"
          >
            Manage Products
          </Link>
          <Link
            href="/dashboard/inventory"
            className="inline-flex items-center h-9 px-4 border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-md hover:bg-neutral-50 transition-colors no-underline"
          >
            Check Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
