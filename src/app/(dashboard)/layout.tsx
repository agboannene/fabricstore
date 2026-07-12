"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "◉" },
  { label: "Orders", href: "/dashboard/orders", icon: "☰" },
  { label: "Products", href: "/dashboard/products", icon: "▤" },
  { label: "Inventory", href: "/dashboard/inventory", icon: "▣" },
  { label: "Sales", href: "/dashboard/sales", icon: "▲" },
  { label: "Customers", href: "/dashboard/customers", icon: "◎" },
  { label: "Activity Log", href: "/dashboard/activity", icon: "⚙" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙" },
  { label: "Staff", href: "/dashboard/staff", icon: "👤" },
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/dashboard/login") {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
        } else {
          router.push("/dashboard/login");
        }
      })
      .catch(() => {
        router.push("/dashboard/login");
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dashboard">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
  }

  return (
    <div className="min-h-screen flex bg-surface-dashboard">
      {/* Sidebar */}
      <aside className="w-60 bg-neutral-800 text-white flex flex-col shrink-0 max-md:hidden">
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          <span className="font-bold text-lg">FabricStore</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 no-underline transition-all",
                  "hover:bg-white/10 hover:text-white",
                  active && "bg-white/10 text-white border-l-[3px] border-accent-500"
                )}
              >
                <span className="w-5 h-5 shrink-0 flex items-center justify-center text-sm">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
          <span className="text-sm text-neutral-500"></span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">
              {user.name} ({user.role.replace("_", " ")})
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
