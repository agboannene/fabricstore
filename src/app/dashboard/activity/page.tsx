"use client";

import { useEffect, useState } from "react";

interface ActivityLog {
  id: number;
  staffUserId: number;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  createdAt: string;
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activity")
      .then((r) => r.json())
      .then((d) => { if (d.success) setLogs(d.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Activity Log</h1>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : logs.length === 0 ? (
        <div className="bg-surface border border-border rounded-md p-8 text-center">
          <p className="text-neutral-500">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Action</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Entity</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Description</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center h-6 px-2 rounded text-xs font-medium bg-neutral-100 text-neutral-700">
                      {log.actionType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {log.entityType}#{log.entityId}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{log.description}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(log.createdAt).toLocaleString()}
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
