import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { Order, OrderItem, OrderStatusHistory } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const orderId = parseInt(id);
  const order = await db.getById<Order>("orders", orderId);
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  const items = await db.getByField<OrderItem>("orderItems", "orderId", orderId);
  const history = await db.getByField<OrderStatusHistory>("orderStatusHistory", "orderId", orderId);

  return NextResponse.json({ success: true, data: { ...order, items, history } });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const orderId = parseInt(id);
  const order = await db.getById<Order>("orders", orderId);
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  const body = await request.json();

  if (body.status && body.status !== order.status) {
    await db.create<OrderStatusHistory>("orderStatusHistory" as any, {
      orderId,
      fromStatus: order.status,
      toStatus: body.status,
      changedBy: auth.user.id,
      reason: body.reason || null,
      createdAt: new Date().toISOString(),
    } as any);
    await db.update<Order>("orders", orderId, { status: body.status } as any);
  }

  if (body.staffNotes !== undefined) {
    await db.update<Order>("orders", orderId, { staffNotes: body.staffNotes } as any);
  }

  if (body.assignedTo !== undefined) {
    await db.update<Order>("orders", orderId, { assignedTo: body.assignedTo } as any);
  }

  const updated = await db.getById<Order>("orders", orderId);
  return NextResponse.json({ success: true, data: updated });
}
