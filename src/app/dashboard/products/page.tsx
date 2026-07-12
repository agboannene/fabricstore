import { db } from "@/lib/db";
import { ProductManager } from "./product-manager";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const fabrics = db
    .getAll<any>("fabrics")
    .filter((f: any) => f.isActive)
    .map((f: any) => ({
      ...f,
      images: JSON.parse(f.images),
      specs: f.specs ? JSON.parse(f.specs) : null,
      fabricType: db.getById("fabricTypes", f.fabricTypeId),
      colourVariants: db.getByField("colourVariants", "fabricId", f.id).filter((v: any) => v.isActive),
    }))
    .sort((a: any, b: any) => b.id - a.id);

  const fabricTypes = db.getAll<any>("fabricTypes");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">Products</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {fabrics.length} product{fabrics.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <ProductManager fabrics={fabrics} fabricTypes={fabricTypes} />
    </div>
  );
}
