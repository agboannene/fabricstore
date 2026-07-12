import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, successResponsePaginated, errorResponse } from "@/lib/api-response";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const typeId = searchParams.get("typeId");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

  let fabrics = db
    .getAll<any>("fabrics")
    .filter((f: any) => f.isActive)
    .map((f: any) => ({
      ...f,
      images: JSON.parse(f.images),
      specs: f.specs ? JSON.parse(f.specs) : null,
      fabricType: db.getById("fabricTypes", f.fabricTypeId),
      colourVariants: db.getByField("colourVariants", "fabricId", f.id).filter((v: any) => v.isActive),
    }));

  const search = searchParams.get("search") || "";
  if (typeId) {
    fabrics = fabrics.filter((f: any) => f.fabricTypeId === parseInt(typeId));
  }
  if (search) {
    const q = search.toLowerCase();
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
    const { name, slug, fabricTypeId, description, price, colourVariants } = body;

    if (!name || !price || !fabricTypeId) {
      return errorResponse("Name, price, and fabric type are required");
    }

    const productSlug = slug || slugify(name);
    const existing = db.getOneByField<any>("fabrics", "slug", productSlug);
    if (existing) {
      return errorResponse("A product with this name already exists");
    }

    const fabric = db.create("fabrics", {
      name,
      slug: productSlug,
      fabricTypeId,
      description: description || null,
      specs: null,
      price: parseFloat(price),
      images: "[]",
      isActive: true,
    });

    if (colourVariants && Array.isArray(colourVariants)) {
      for (const v of colourVariants) {
        if (v.colourName) {
          db.create("colourVariants", {
            fabricId: fabric.id,
            colourName: v.colourName,
            colourHex: v.colourHex || null,
            stockQuantity: v.stockQuantity || 0,
            lowStockThreshold: v.lowStockThreshold ?? 5,
            isActive: true,
          });
        }
      }
    }

    const result = {
      ...fabric,
      images: JSON.parse(fabric.images),
      fabricType: db.getById("fabricTypes", fabric.fabricTypeId),
      colourVariants: db.getByField("colourVariants", "fabricId", fabric.id),
    };

    return successResponse(result, 201);
  } catch (error) {
    console.error("POST /api/products error:", error);
    return errorResponse("Failed to create product", 500);
  }
}
