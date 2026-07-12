"use client";

import { useEffect, useState } from "react";

interface ColourVariant {
  id: number;
  fabricId: number;
  colourName: string;
  colourHex: string | null;
  stockQuantity: number;
  lowStockThreshold: number;
}

interface Fabric {
  id: number;
  name: string;
  colourVariants: ColourVariant[];
}

export default function InventoryPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setFabrics(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const allVariants = fabrics.flatMap((f) =>
    f.colourVariants.map((v) => ({ ...v, fabricName: f.name }))
  );
  const lowStock = allVariants.filter(
    (v) => v.stockQuantity <= v.lowStockThreshold && v.stockQuantity > 0
  );
  const outOfStock = allVariants.filter((v) => v.stockQuantity === 0);

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Inventory</h1>

      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Low Stock Alert */}
          {lowStock.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h2 className="text-sm font-semibold text-amber-800 mb-2">
                Low Stock ({lowStock.length})
              </h2>
              <div className="flex flex-col gap-1">
                {lowStock.map((v) => (
                  <p key={v.id} className="text-sm text-amber-700">
                    {v.fabricName} — {v.colourName}: {v.stockQuantity} left
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Out of Stock */}
          {outOfStock.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h2 className="text-sm font-semibold text-red-800 mb-2">
                Out of Stock ({outOfStock.length})
              </h2>
              <div className="flex flex-col gap-1">
                {outOfStock.map((v) => (
                  <p key={v.id} className="text-sm text-red-700">
                    {v.fabricName} — {v.colourName}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* All Stock */}
          <div className="bg-surface border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-neutral-50">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Product</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Colour</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-600">Stock</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-600">Threshold</th>
                </tr>
              </thead>
              <tbody>
                {allVariants.map((v) => (
                  <tr
                    key={v.id}
                    className={`border-b border-border last:border-0 hover:bg-neutral-50 ${
                      v.stockQuantity === 0
                        ? "bg-red-50"
                        : v.stockQuantity <= v.lowStockThreshold
                        ? "bg-amber-50"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{v.fabricName}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {v.colourHex && (
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-300"
                          style={{ backgroundColor: v.colourHex }}
                        />
                      )}
                      {v.colourName}
                    </td>
                    <td className="px-4 py-3 text-right">{v.stockQuantity}</td>
                    <td className="px-4 py-3 text-right text-neutral-500">{v.lowStockThreshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
