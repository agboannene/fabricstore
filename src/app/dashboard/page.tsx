import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Revenue Today", value: "₦0" },
          { label: "Orders Today", value: "0" },
          { label: "Pending Orders", value: "0" },
          { label: "Low Stock Items", value: "0" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-surface border border-border rounded-md p-4"
          >
            <p className="text-sm text-neutral-500 mb-1">{kpi.label}</p>
            <p className="text-xl font-bold text-neutral-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-md p-4">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center h-9 px-4 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors no-underline"
          >
            Add Product
          </Link>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center h-9 px-4 border border-primary-500 text-primary-500 text-sm font-semibold rounded-md hover:bg-primary-50 transition-colors no-underline"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
