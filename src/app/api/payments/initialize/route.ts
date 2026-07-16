import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || "";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || "https://fabricstore-vpri.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const { email, amount, orderId, metadata } = await request.json();

    if (!email || !amount) {
      return NextResponse.json({ success: false, error: "Email and amount are required" }, { status: 400 });
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        currency: "NGN",
        reference: orderId || `FS-${Date.now()}`,
        callback_url: `${NEXT_PUBLIC_URL}/checkout/success`,
        metadata: metadata || {},
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ success: false, error: data.message || "Payment initialization failed" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
        access_code: data.data.access_code,
      },
    });
  } catch (e) {
    console.error("Paystack initialize error:", e);
    return NextResponse.json({ success: false, error: "Payment initialization failed" }, { status: 500 });
  }
}
