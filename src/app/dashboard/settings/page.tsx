"use client";

import { useEffect, useState } from "react";

interface Setting {
  id: number;
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/business-settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSettings(d.data);
          const initial: Record<string, string> = {};
          d.data.forEach((s: Setting) => { initial[s.key] = s.value; });
          setEdits(initial);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(key: string) {
    setSaving(true);
    try {
      await fetch("/api/business-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: edits[key] }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Settings</h1>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Key</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600">Value</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-600 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {settings.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                  <td className="px-4 py-3 font-mono text-xs text-neutral-700">{s.key}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={edits[s.key] || ""}
                      onChange={(e) => setEdits({ ...edits, [s.key]: e.target.value })}
                      className="w-full h-8 px-2 border border-neutral-300 rounded text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleSave(s.key)}
                      disabled={saving}
                      className="h-8 px-3 bg-primary-500 text-white text-xs font-medium rounded hover:bg-primary-600 disabled:opacity-50"
                    >
                      Save
                    </button>
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
