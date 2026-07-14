import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { Order, OrderItem, Customer, ColourVariant } from "@/lib/types";

export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const status = searchParams.get("status");

  let orders = await db.getAll<Order>("orders");
  if (status) {
    orders = orders.filter((o) => o.status === status);
  }
  orders.sort((a, b) => b.id - a.id);

  const total = orders.length;
  const start = (page - 1) * limit;
  const paged = orders.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paged,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, delivery, paymentMethod, notes } = body;

    if (!customer?.name || !customer?.phone || !items?.length) {
      return NextResponse.json(
        { success: false, error: "Customer name, phone, and items are required" },
        { status: 400 }
      );
    }

    let cust = await db.getOneByField<Customer>("customers", "phone", customer.phone);
    if (!cust) {
      cust = await db.create<Customer>("customers", {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || null,
        passwordHash: null,
        isReturning: false,
        firstOrderAt: null,
        lastOrderAt: null,
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
      });
    }

    let totalAmount = 0;
    const orderItems: Omit<OrderItem, "id">[] = [];

    for (const item of items) {
      const variant = await db.getById<ColourVariant>("colourVariants", item.colourVariantId);
      if (!variant) continue;

      const unitPrice = item.unitPrice || 0;
      const qty = item.quantity || 1;
      const subtotal = unitPrice * qty;
      totalAmount += subtotal;

      orderItems.push({
        orderId: 0,
        colourVariantId: item.colourVariantId,
        quantity: qty,
        unitPrice,
        subtotal,
      });
    }

    const deliveryFee = delivery?.fee || 0;
    totalAmount += deliveryFee;

    const now = new Date().toISOString();
    const orderIdDisplay = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const order = await db.create<Order>("orders", {
      orderIdDisplay,
      customerId: cust.id,
      status: "pending_payment",
      paymentMethod: paymentMethod || "pay_on_delivery",
      paymentStatus: "pending",
      paymentCurrency: "NGN",
      paymentAmountNgn: totalAmount,
      deliveryFee,
      totalAmount,
      deliveryAddressLine1: delivery?.addressLine1 || "",
      deliveryAddressLine2: delivery?.addressLine2 || null,
      deliveryCity: delivery?.city || "",
      deliveryState: delivery?.state || null,
      deliveryCountry: delivery?.country || "Nigeria",
      deliveryNotes: notes || null,
      assignedTo: null,
      staffNotes: null,
      isDomestic: delivery?.isDomestic ?? true,
    } as any);

    for (const item of orderItems) {
      await db.create<OrderItem>("orderItems", { ...item, orderId: order.id });
    }

    await db.update<Customer>("customers", cust.id, {
      isReturning: cust.totalOrders > 0,
      firstOrderAt: cust.totalOrders === 0 ? now : cust.firstOrderAt,
      lastOrderAt: now,
      totalOrders: cust.totalOrders + 1,
      totalSpent: cust.totalSpent + totalAmount,
    } as any);

    for (const item of items) {
      const variant = await db.getById<ColourVariant>("colourVariants", item.colourVariantId);
      if (variant) {
        await db.update<ColourVariant>("colourVariants", variant.id, {
          stockQuantity: Math.max(0, variant.stockQuantity - (item.quantity || 1)),
        } as any);
      }
    }

    return NextResponse.json({ success: true, data: { id: order.id, orderIdDisplay, totalAmount } }, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}
