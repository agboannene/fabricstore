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

  const fabric = await db.getById<any>("fabrics", fabricId);
  if (!fabric) return errorResponse("Product not found", 404);

  const [fabricType, colourVariants] = await Promise.all([
    db.getById("fabricTypes", fabric.fabricTypeId),
    db.getByField("colourVariants", "fabricId", fabricId),
  ]);

  return successResponse({
    ...fabric,
    images: JSON.parse(fabric.images),
    specs: fabric.specs ? JSON.parse(fabric.specs) : null,
    fabricType,
    colourVariants: colourVariants.filter((v: any) => v.isActive),
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
    const { name, fabricTypeId, description, price, images, colourVariants } = body;

    const existing = await db.getById<any>("fabrics", fabricId);
    if (!existing) return errorResponse("Product not found", 404);

    await db.update("fabrics", fabricId, {
      name: name || existing.name,
      slug: slugify(name || existing.name),
      fabricTypeId: fabricTypeId || existing.fabricTypeId,
      description: description !== undefined ? description : existing.description,
      price: price ? parseFloat(price) : existing.price,
      images: images !== undefined ? JSON.stringify(images) : existing.images,
      updatedAt: new Date().toISOString(),
    });

    if (colourVariants && Array.isArray(colourVariants)) {
      const existingVariants = await db.getByField<any>("colourVariants", "fabricId", fabricId);
      for (const v of existingVariants) {
        await db.delete("colourVariants", v.id);
      }

      for (const v of colourVariants) {
        if (v.colourName) {
          await db.create("colourVariants", {
            fabricId,
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

    const updated = await db.getById<any>("fabrics", fabricId);
    const [fabricType, variants] = await Promise.all([
      db.getById("fabricTypes", updated.fabricTypeId),
      db.getByField("colourVariants", "fabricId", fabricId),
    ]);

    return successResponse({
      ...updated,
      images: JSON.parse(updated.images),
      fabricType,
      colourVariants: variants,
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

    const existing = await db.getById<any>("fabrics", fabricId);
    if (!existing) return errorResponse("Product not found", 404);

    await db.update("fabrics", fabricId, { isActive: false });
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return errorResponse("Failed to delete product", 500);
  }
}
