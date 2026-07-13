import { db } from "@/lib/db";
import type { Order } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SalesPage() {
  const orders = await db.getAll<Order>("orders");
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "completed");
  const paidRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingRevenue = orders
    .filter((o) => o.paymentStatus === "pending")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const orderCount = orders.length;
  const avgOrderValue = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0;

  const metrics = [
    { label: "Total Revenue (All)", value: `₦${totalRevenue.toLocaleString()}` },
    { label: "Paid Revenue", value: `₦${paidRevenue.toLocaleString()}` },
    { label: "Pending Revenue", value: `₦${pendingRevenue.toLocaleString()}` },
    { label: "Total Orders", value: orderCount.toString() },
    { label: "Avg Order Value", value: `₦${avgOrderValue.toLocaleString()}` },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Sales Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-surface border border-border rounded-md p-4">
            <p className="text-sm text-neutral-500 mb-1">{m.label}</p>
            <p className="text-xl font-bold text-neutral-900">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
