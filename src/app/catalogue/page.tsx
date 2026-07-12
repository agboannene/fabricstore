"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FabricType {
  id: number;
  name: string;
  slug: string;
}

interface ColourVariant {
  id: number;
  colourName: string;
  colourHex: string | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  fabricType: FabricType;
  colourVariants: ColourVariant[];
}

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fabricTypes, setFabricTypes] = useState<FabricType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/fabric-types")
      .then((r) => r.json())
      .then((d) => { if (d.success) setFabricTypes(d.data); });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (selectedType) params.set("typeId", selectedType);
    if (search) params.set("search", search);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setProducts(d.data); })
      .finally(() => setLoading(false));
  }, [selectedType, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <h1 className="text-h2 font-heading font-bold text-neutral-900">Catalogue</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search fabrics..."
          className="h-10 w-full max-w-xs px-3 border border-neutral-300 rounded-md text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedType("")}
          className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${
            !selectedType
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white text-neutral-700 border-neutral-300 hover:border-primary-500"
          }`}
        >
          All
        </button>
        {fabricTypes.map((ft) => (
          <button
            key={ft.id}
            onClick={() => setSelectedType(ft.id.toString())}
            className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${
              selectedType === ft.id.toString()
                ? "bg-primary-500 text-white border-primary-500"
                : "bg-white text-neutral-700 border-neutral-300 hover:border-primary-500"
            }`}
          >
            {ft.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white border border-neutral-200 rounded-md overflow-hidden hover:shadow-md transition-shadow no-underline"
            >
              <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>No image</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-primary-500 font-medium uppercase mb-1">
                  {product.fabricType?.name}
                </p>
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-neutral-900 mt-2">
                  ₦{product.price.toLocaleString()}
                </p>
                {product.colourVariants.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {product.colourVariants.slice(0, 5).map((v) => (
                      <span
                        key={v.id}
                        className="w-4 h-4 rounded-full border border-neutral-200"
                        style={{ backgroundColor: v.colourHex || "#ccc" }}
                        title={v.colourName}
                      />
                    ))}
                    {product.colourVariants.length > 5 && (
                      <span className="text-xs text-neutral-400 self-center">
                        +{product.colourVariants.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
