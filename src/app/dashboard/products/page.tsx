import { db } from "@/lib/db";
import { ProductManager } from "./product-manager";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const allFabrics = await db.getAll<any>("fabrics");
  const activeFabrics = allFabrics.filter((f: any) => f.isActive);

  const fabrics = await Promise.all(
    activeFabrics.map(async (f: any) => {
      const [fabricType, colourVariants] = await Promise.all([
        db.getById("fabricTypes", f.fabricTypeId),
        db.getByField("colourVariants", "fabricId", f.id),
      ]);
      return {
        ...f,
        images: JSON.parse(f.images),
        specs: f.specs ? JSON.parse(f.specs) : null,
        fabricType,
        colourVariants: colourVariants.filter((v: any) => v.isActive),
      };
    })
  );
  fabrics.sort((a: any, b: any) => b.id - a.id);

  const fabricTypes = await db.getAll<any>("fabricTypes");

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
