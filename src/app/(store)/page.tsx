"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  fabricType: { name: string };
  colourVariants: { colourHex: string | null }[];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?limit=4")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-surface-alt py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-display-xl font-bold text-neutral-900 leading-tight mb-6">
            Find the Fabric That
            <br />
            <span className="text-primary-500">Tells Your Story</span>
          </h1>
          <p className="text-body-lg text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium Lace, Ankara, Silk, Satin, and more — available by the yard.
            Shop online for delivery across Nigeria and worldwide.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center h-12 px-8 bg-accent-500 text-neutral-900 font-semibold rounded-lg hover:bg-accent-600 transition-colors no-underline"
          >
            Browse Fabrics
          </Link>
        </div>
      </section>

      {/* Featured Fabrics */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-h1 font-bold text-neutral-900">
              Featured Fabrics
            </h2>
            <Link
              href="/catalogue"
              className="text-primary-500 font-medium text-sm hover:text-primary-600 no-underline"
            >
              View All →
            </Link>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all no-underline"
                >
                  <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center text-neutral-300 text-sm overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <span className="text-xs text-primary-500 font-medium uppercase tracking-wider">
                      {product.fabricType?.name || "Fabric"}
                    </span>
                    <h3 className="font-heading text-h3 font-bold text-neutral-900 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-body-lg font-semibold text-primary-500">
                      ₦{product.price.toLocaleString()} / yd
                    </p>
                    {product.colourVariants?.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {product.colourVariants.slice(0, 5).map((v, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-neutral-200"
                            style={{ backgroundColor: v.colourHex || "#ccc" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-[3/4] bg-neutral-100" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-3 bg-neutral-100 rounded w-16" />
                    <div className="h-5 bg-neutral-100 rounded w-3/4" />
                    <div className="h-4 bg-neutral-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section className="bg-surface-alt py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-h1 font-bold text-neutral-900 mb-6">
            About FabricStore
          </h2>
          <p className="text-body text-neutral-500 leading-relaxed">
            We bring together the finest fabrics from Nigeria and beyond, making
            it easy to find exactly what you need — in the colour and quantity
            you want. Whether you are in Lagos or London, we deliver.
          </p>
        </div>
      </section>

      {/* Categories / Fabric Types */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-h1 font-bold text-neutral-900 mb-8 text-center">
            Shop by Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Lace",
              "Ankara",
              "Silk",
              "Satin",
              "Beaded Lace",
              "Mikado",
              "Jonkuso",
              "Other",
            ].map((type) => (
              <Link
                key={type}
                href={`/catalogue?type=${encodeURIComponent(type)}`}
                className="bg-surface border border-border rounded-xl p-6 text-center hover:shadow-md hover:border-primary-300 transition-all no-underline"
              >
                <span className="font-heading text-h3 font-bold text-neutral-900">
                  {type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
