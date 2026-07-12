import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { InternationalDeliveryFee } from "@/lib/types";

export async function GET() {
  const fees = db.getAll<InternationalDeliveryFee>("internationalDeliveryFees");
  return NextResponse.json({ success: true, data: fees });
}
