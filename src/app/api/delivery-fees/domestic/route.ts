import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { DomesticDeliveryFee } from "@/lib/types";

export async function GET() {
  const fees = db.getAll<DomesticDeliveryFee>("domesticDeliveryFees");
  return NextResponse.json({ success: true, data: fees });
}
