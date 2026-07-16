import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET(request: Request) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const today = getTodayDate();
  const todayStart = new Date(`${today}T00:00:00`);

  const [ordersToday, pendingOrders, lowStockVariants] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: todayStart } },
      select: { totalAmount: true },
    }),
    prisma.order.count({
      where: { status: { in: ["pending_payment", "confirmed", "assigned_to_packing"] } },
    }),
    prisma.colourVariant.findMany({
      where: { isActive: true },
      select: { stockQuantity: true, lowStockThreshold: true },
    }),
  ]);

  const revenueToday = ordersToday.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockItems = lowStockVariants.filter((v) => v.stockQuantity <= v.lowStockThreshold).length;

  return NextResponse.json({
    success: true,
    data: {
      revenueToday,
      ordersToday: ordersToday.length,
      pendingOrders,
      lowStockItems,
    },
  });
}
