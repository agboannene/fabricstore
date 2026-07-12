"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Badge, Modal } from "@/components/ui";
import { formatCurrency, slugify } from "@/lib/utils";

interface FabricType {
  id: number;
  name: string;
}

interface ColourVariant {
  id: number;
  colourName: string;
  colourHex: string | null;
  stockQuantity: number;
  lowStockThreshold: number;
}

interface Fabric {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string;
  isActive: boolean;
  fabricType: FabricType;
  colourVariants: ColourVariant[];
}

interface Props {
  fabrics: Fabric[];
  fabricTypes: FabricType[];
}

export function ProductManager({ fabrics, fabricTypes }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    fabricTypeId: fabricTypes[0]?.id || 0,
    description: "",
    price: "",
    colourVariants: [{ colourName: "", colourHex: "#000000", stockQuantity: 0, lowStockThreshold: 5 }],
  });

  function resetForm() {
    setForm({
      name: "",
      fabricTypeId: fabricTypes[0]?.id || 0,
      description: "",
      price: "",
      colourVariants: [{ colourName: "", colourHex: "#000000", stockQuantity: 0, lowStockThreshold: 5 }],
    });
    setEditingId(null);
    setError("");
  }

  function openEdit(fabric: Fabric) {
    setForm({
      name: fabric.name,
      fabricTypeId: fabric.fabricType.id,
      description: fabric.description || "",
      price: String(fabric.price),
      colourVariants: fabric.colourVariants.map((v) => ({
        colourName: v.colourName,
        colourHex: v.colourHex || "#000000",
        stockQuantity: v.stockQuantity,
        lowStockThreshold: v.lowStockThreshold,
      })),
    });
    setEditingId(fabric.id);
    setShowModal(true);
  }

  function addVariant() {
    setForm((f) => ({
      ...f,
      colourVariants: [
        ...f.colourVariants,
        { colourName: "", colourHex: "#000000", stockQuantity: 0, lowStockThreshold: 5 },
      ],
    }));
  }

  function removeVariant(index: number) {
    setForm((f) => ({
      ...f,
      colourVariants: f.colourVariants.filter((_, i) => i !== index),
    }));
  }

  function updateVariant(index: number, field: string, value: string | number) {
    setForm((f) => ({
      ...f,
      colourVariants: f.colourVariants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const price = parseFloat(form.price);
    if (!form.name || !price || price <= 0) {
      setError("Name and a valid price are required.");
      setSaving(false);
      return;
    }

    const body = {
      name: form.name,
      slug: slugify(form.name),
      fabricTypeId: form.fabricTypeId,
      description: form.description,
      price,
      colourVariants: form.colourVariants.filter((v) => v.colourName),
    };

    try {
      const res = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      setShowModal(false);
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product and all its colour variants?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Products table */}
      <div className="bg-surface border border-border rounded-md overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50">
              <th className="text-left p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Product
              </th>
              <th className="text-left p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Type
              </th>
              <th className="text-left p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Colours
              </th>
              <th className="text-left p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Price
              </th>
              <th className="text-left p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Total Stock
              </th>
              <th className="text-right p-3 font-medium text-xs uppercase tracking-wider text-neutral-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fabrics.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-12 text-neutral-400">
                  No products yet. Click "Add Product" to get started.
                </td>
              </tr>
            ) : (
              fabrics.map((fabric) => {
                const totalStock = fabric.colourVariants.reduce(
                  (sum, v) => sum + v.stockQuantity,
                  0
                );
                const lowStockCount = fabric.colourVariants.filter(
                  (v) => v.stockQuantity <= v.lowStockThreshold
                ).length;

                return (
                  <tr key={fabric.id} className="border-t border-border-light hover:bg-surface-hover">
                    <td className="p-3">
                      <span className="font-medium text-neutral-900">
                        {fabric.name}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-500">
                      {fabric.fabricType.name}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1 items-center">
                        {fabric.colourVariants.slice(0, 4).map((v) => (
                          <span
                            key={v.id}
                            className="w-5 h-5 rounded-full border border-border inline-block"
                            style={{ backgroundColor: v.colourHex || "#ccc" }}
                            title={`${v.colourName} (${v.stockQuantity})`}
                          />
                        ))}
                        {fabric.colourVariants.length > 4 && (
                          <span className="text-xs text-neutral-400 ml-1">
                            +{fabric.colourVariants.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      {formatCurrency(fabric.price)}
                    </td>
                    <td className="p-3">
                      <span className={lowStockCount > 0 ? "text-warning-500 font-medium" : "text-neutral-600"}>
                        {totalStock}
                      </span>
                      {lowStockCount > 0 && (
                        <Badge variant="warning" size="sm" className="ml-2">
                          {lowStockCount} low
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openEdit(fabric)}
                        className="text-primary-500 text-sm hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(fabric.id)}
                        className="text-error-500 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? "Edit Product" : "Add Product"}
        size="lg"
        dashboard
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={saving}>
              {editingId ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-error-50 text-error-600 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Product Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g., Premium French Lace"
              required
              dashboard
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-neutral-800">
                Fabric Type
              </label>
              <select
                value={form.fabricTypeId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fabricTypeId: Number(e.target.value) }))
                }
                className="h-8 px-3 text-sm border-[1.5px] border-border rounded-md bg-surface text-neutral-900 outline-none focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(26,35,126,0.12)]"
              >
                {fabricTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-800">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Fabric description, specs, care instructions..."
              rows={3}
              className="h-auto min-h-[60px] px-3 py-2 text-sm border-[1.5px] border-border rounded-md bg-surface text-neutral-900 outline-none resize-y focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(26,35,126,0.12)]"
            />
          </div>

          <Input
            label="Price (per yard/metre)"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="15000"
            required
            dashboard
          />

          {/* Colour Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-neutral-800">
                Colour Variants
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addVariant}
              >
                + Add Colour
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {form.colourVariants.map((variant, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-neutral-50 rounded-md"
                >
                  <input
                    type="color"
                    value={variant.colourHex || "#000000"}
                    onChange={(e) =>
                      updateVariant(index, "colourHex", e.target.value)
                    }
                    className="w-8 h-8 rounded border border-border cursor-pointer shrink-0"
                    title="Pick colour"
                  />
                  <input
                    type="text"
                    value={variant.colourName}
                    onChange={(e) =>
                      updateVariant(index, "colourName", e.target.value)
                    }
                    placeholder="Colour name"
                    className="flex-1 h-8 px-2 text-sm border-[1.5px] border-border rounded-md bg-surface outline-none focus:border-border-focus"
                  />
                  <input
                    type="number"
                    value={variant.stockQuantity}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "stockQuantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="Stock"
                    className="w-20 h-8 px-2 text-sm border-[1.5px] border-border rounded-md bg-surface outline-none focus:border-border-focus"
                    title="Stock quantity"
                  />
                  <input
                    type="number"
                    value={variant.lowStockThreshold}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "lowStockThreshold",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="Threshold"
                    className="w-16 h-8 px-2 text-sm border-[1.5px] border-border rounded-md bg-surface outline-none focus:border-border-focus"
                    title="Low stock threshold"
                  />
                  {form.colourVariants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-error-500 text-lg leading-none hover:text-error-600 shrink-0"
                      title="Remove colour"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
