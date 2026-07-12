import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { Order, OrderItem, OrderStatusHistory, Customer } from "@/lib/types";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const orderId = parseInt(id);
  const order = db.getById<Order>("orders", orderId);
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  const items = db.getByField<OrderItem>("orderItems", "orderId", orderId);
  const history = db.getByField<OrderStatusHistory>("orderStatusHistory", "orderId", orderId);

  return NextResponse.json({ success: true, data: { ...order, items, history } });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const orderId = parseInt(id);
  const order = db.getById<Order>("orders", orderId);
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  const body = await request.json();

  if (body.status && body.status !== order.status) {
    const historyEntry: Omit<OrderStatusHistory, "id"> = {
      orderId,
      fromStatus: order.status,
      toStatus: body.status,
      changedBy: auth.user.id,
      reason: body.reason || null,
      createdAt: new Date().toISOString(),
    };
    db.create<OrderStatusHistory>("orderStatusHistory" as any, historyEntry as any);
    db.update<Order>("orders", orderId, { status: body.status } as Partial<Order>);
  }

  if (body.staffNotes !== undefined) {
    db.update<Order>("orders", orderId, { staffNotes: body.staffNotes } as Partial<Order>);
  }

  if (body.assignedTo !== undefined) {
    db.update<Order>("orders", orderId, { assignedTo: body.assignedTo } as Partial<Order>);
  }

  const updated = db.getById<Order>("orders", orderId);
  return NextResponse.json({ success: true, data: updated });
}
