import Link from "next/link";

export default function HomePage() {
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
          <h2 className="font-heading text-h1 font-bold text-neutral-900 mb-8">
            Featured Fabrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center text-neutral-300 text-sm">
                  Image {i}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs text-primary-500 font-medium uppercase tracking-wider">
                    Lace
                  </span>
                  <h3 className="font-heading text-h3 font-bold text-neutral-900 leading-snug">
                    Premium Fabric
                  </h3>
                  <p className="text-body-lg font-semibold text-primary-500">
                    ₦15,000 / yd
                  </p>
                </div>
              </div>
            ))}
          </div>
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
