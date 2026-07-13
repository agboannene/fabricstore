import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Customer, Order } from "@/lib/types";

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as any;
    if (payload.role !== "customer") {
      return NextResponse.json({ success: false, error: "Not authorized" }, { status: 401 });
    }

    const customer = await db.getById<Customer>("customers", payload.id);
    if (!customer) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });
    }

    const allOrders = await db.getAll<Order>("orders");
    const orders = allOrders
      .filter((o) => o.customerId === customer.id)
      .sort((a, b) => b.id - a.id);

    return NextResponse.json({
      success: true,
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        orders,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
  }
}
