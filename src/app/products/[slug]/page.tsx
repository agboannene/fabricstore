"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ColourVariant {
  id: number;
  colourName: string;
  colourHex: string | null;
  stockQuantity: number;
}

interface FabricType {
  id: number;
  name: string;
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

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColour, setSelectedColour] = useState<ColourVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/products?limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const found = d.data.find((p: Product) => p.slug === slug);
          setProduct(found || null);
          if (found?.colourVariants.length) {
            setSelectedColour(found.colourVariants[0]);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-neutral-500">Product not found.</p>
        <Link href="/catalogue" className="text-primary-500 hover:underline mt-4 inline-block">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const inStock = selectedColour ? selectedColour.stockQuantity > 0 : false;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href="/" className="hover:text-primary-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/catalogue" className="hover:text-primary-500">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-[3/4] bg-neutral-100 rounded-md flex items-center justify-center text-neutral-400">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-md" />
          ) : (
            <span>No image available</span>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-primary-500 font-medium uppercase mb-2">
            {product.fabricType?.name}
          </p>
          <h1 className="text-h2 font-heading font-bold text-neutral-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-neutral-900 mb-6">
            ₦{product.price.toLocaleString()}
          </p>

          {product.description && (
            <p className="text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Colour Selection */}
          {product.colourVariants.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-700 mb-2">
                Colour: <span className="text-neutral-900">{selectedColour?.colourName}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colourVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedColour(v)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColour?.id === v.id
                        ? "border-primary-500 scale-110"
                        : "border-neutral-300 hover:border-neutral-400"
                    }`}
                    style={{ backgroundColor: v.colourHex || "#ccc" }}
                    title={`${v.colourName} (${v.stockQuantity} in stock)`}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {inStock
                  ? `${selectedColour!.stockQuantity} in stock`
                  : "Out of stock"}
              </p>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-medium text-neutral-700 mb-2">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 border border-neutral-300 rounded-md text-lg hover:bg-neutral-50"
              >
                −
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 border border-neutral-300 rounded-md text-lg hover:bg-neutral-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={!inStock}
            className="w-full h-12 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
