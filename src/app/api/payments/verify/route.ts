import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ success: false, error: "Reference is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ success: false, error: data.message || "Verification failed" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        status: data.data.status,
        reference: data.data.reference,
        amount: data.data.amount / 100,
        currency: data.data.currency,
        paid_at: data.data.paid_at,
        metadata: data.data.metadata,
      },
    });
  } catch (e) {
    console.error("Paystack verify error:", e);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
