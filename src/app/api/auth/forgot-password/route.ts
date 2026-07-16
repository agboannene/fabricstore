import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const customer = await prisma.customer.findFirst({ where: { email: email.toLowerCase().trim() } });

    if (!customer) {
      return NextResponse.json({ success: true, data: { message: "If an account exists with that email, a reset link has been sent." } });
    }

    await prisma.passwordResetToken.updateMany({
      where: { email: email.toLowerCase().trim(), used: false },
      data: { used: true },
    });

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase().trim(),
        token,
        expiresAt,
      },
    });

    const resetUrl = `${request.headers.get("origin") || "https://fabricstore-vpri.vercel.app"}/reset-password?token=${token}`;

    console.log(`[PASSWORD RESET] ${customer.name} <${email}> — ${resetUrl}`);

    return NextResponse.json({
      success: true,
      data: { message: "If an account exists with that email, a reset link has been sent." },
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
