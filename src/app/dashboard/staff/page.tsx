"use client";

import { useEffect, useState } from "react";
import { STAFF_ROLE_LABELS } from "@/lib/constants";

interface StaffUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff")
      .then((r) => r.json())
      .then((d) => { if (d.success) setStaff(d.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Staff</h1>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : staff.length === 0 ? (
        <div className="bg-surface border border-border rounded-md p-8 text-center">
          <p className="text-neutral-500">No staff members yet.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Role</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-neutral-600">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center h-6 px-2 rounded text-xs font-medium bg-neutral-100 text-neutral-700">
                      {STAFF_ROLE_LABELS[s.role] || s.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center h-6 px-2 rounded text-xs font-medium ${
                        s.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {s.lastLoginAt
                      ? new Date(s.lastLoginAt).toLocaleDateString()
                      : "Never"}
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
