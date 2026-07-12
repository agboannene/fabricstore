import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fabricId = parseInt(id);

  const fabric = db.getById<any>("fabrics", fabricId);
  if (!fabric) return errorResponse("Product not found", 404);

  return successResponse({
    ...fabric,
    images: JSON.parse(fabric.images),
    specs: fabric.specs ? JSON.parse(fabric.specs) : null,
    fabricType: db.getById("fabricTypes", fabric.fabricTypeId),
    colourVariants: db.getByField("colourVariants", "fabricId", fabricId).filter((v: any) => v.isActive),
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fabricId = parseInt(id);
    const body = await request.json();
    const { name, fabricTypeId, description, price, colourVariants } = body;

    const existing = db.getById<any>("fabrics", fabricId);
    if (!existing) return errorResponse("Product not found", 404);

    db.update("fabrics", fabricId, {
      name: name || existing.name,
      slug: slugify(name || existing.name),
      fabricTypeId: fabricTypeId || existing.fabricTypeId,
      description: description !== undefined ? description : existing.description,
      price: price ? parseFloat(price) : existing.price,
    });

    // Replace colour variants
    if (colourVariants && Array.isArray(colourVariants)) {
      // Remove existing
      const existingVariants = db.getByField<any>("colourVariants", "fabricId", fabricId);
      for (const v of existingVariants) {
        db.delete("colourVariants", v.id);
      }

      // Create new
      for (const v of colourVariants) {
        if (v.colourName) {
          db.create("colourVariants", {
            fabricId,
            colourName: v.colourName,
            colourHex: v.colourHex || null,
            stockQuantity: v.stockQuantity || 0,
            lowStockThreshold: v.lowStockThreshold ?? 5,
            isActive: true,
          });
        }
      }
    }

    const updated = db.getById<any>("fabrics", fabricId);
    return successResponse({
      ...updated,
      images: JSON.parse(updated.images),
      fabricType: db.getById("fabricTypes", updated.fabricTypeId),
      colourVariants: db.getByField("colourVariants", "fabricId", fabricId),
    });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return errorResponse("Failed to update product", 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fabricId = parseInt(id);

    const existing = db.getById<any>("fabrics", fabricId);
    if (!existing) return errorResponse("Product not found", 404);

    db.update("fabrics", fabricId, { isActive: false });
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return errorResponse("Failed to delete product", 500);
  }
}
