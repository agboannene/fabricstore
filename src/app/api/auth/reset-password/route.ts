import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, error: "Token and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { token, used: false },
    });

    if (!resetToken) {
      return NextResponse.json({ success: false, error: "Invalid or already used reset link" }, { status: 400 });
    }

    if (new Date(resetToken.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, error: "Reset link has expired. Please request a new one." }, { status: 400 });
    }

    const customer = await prisma.customer.findFirst({ where: { email: resetToken.email } });

    if (!customer) {
      return NextResponse.json({ success: false, error: "Account not found" }, { status: 404 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.customer.update({
      where: { id: customer.id },
      data: { passwordHash },
    });

    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    return NextResponse.json({ success: true, data: { message: "Password updated successfully" } });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
