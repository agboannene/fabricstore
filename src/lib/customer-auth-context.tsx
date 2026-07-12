"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface CustomerUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomerAuthContextType {
  customer: CustomerUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/customer/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCustomer(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    setCustomer(null);
  }

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
