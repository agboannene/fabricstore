import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, successResponsePaginated, errorResponse } from "@/lib/api-response";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const typeId = searchParams.get("typeId");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

  const allFabrics = await db.getAll<any>("fabrics");
  const activeFabrics = allFabrics.filter((f: any) => f.isActive);

  const enriched = await Promise.all(
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

  let fabrics = enriched;
  if (typeId) {
    fabrics = fabrics.filter((f: any) => f.fabricTypeId === parseInt(typeId));
  }
  if (searchParams.get("search")) {
    const q = searchParams.get("search")!.toLowerCase();
    fabrics = fabrics.filter(
      (f: any) =>
        f.name.toLowerCase().includes(q) ||
        (f.description || "").toLowerCase().includes(q) ||
        (f.fabricType?.name || "").toLowerCase().includes(q)
    );
  }

  const total = fabrics.length;
  const paginated = fabrics.slice((page - 1) * limit, page * limit);

  return successResponsePaginated(paginated, { total, page, limit });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, fabricTypeId, description, price, images, colourVariants } = body;

    if (!name || !price || !fabricTypeId) {
      return errorResponse("Name, price, and fabric type are required");
    }

    const productSlug = slug || slugify(name);
    const existing = await db.getOneByField<any>("fabrics", "slug", productSlug);
    if (existing) {
      return errorResponse("A product with this name already exists");
    }

    const fabric = await db.create<any>("fabrics", {
      name,
      slug: productSlug,
      fabricTypeId,
      description: description || null,
      specs: null,
      price: parseFloat(price),
      images: JSON.stringify(images || []),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (colourVariants && Array.isArray(colourVariants)) {
      for (const v of colourVariants) {
        if (v.colourName) {
          await db.create("colourVariants", {
            fabricId: fabric.id,
            colourName: v.colourName,
            colourHex: v.colourHex || null,
            stockQuantity: v.stockQuantity || 0,
            lowStockThreshold: v.lowStockThreshold ?? 5,
            isActive: true,
            createdAt: new Date().toISOString(),
          });
        }
      }
    }

    const [fabricType, variants] = await Promise.all([
      db.getById("fabricTypes", fabric.fabricTypeId),
      db.getByField("colourVariants", "fabricId", fabric.id),
    ]);

    const result = {
      ...fabric,
      images: JSON.parse(fabric.images),
      fabricType,
      colourVariants: variants,
    };

    return successResponse(result, 201);
  } catch (error) {
    console.error("POST /api/products error:", error);
    return errorResponse("Failed to create product", 500);
  }
}
