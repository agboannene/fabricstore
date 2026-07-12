import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signToken, comparePassword } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { Customer } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingEmail = db.getOneByField<Customer>("customers", "email", email);
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    const existingPhone = db.getOneByField<Customer>("customers", "phone", phone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, error: "Phone number already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const customer = db.create<Customer>("customers", {
      name,
      email,
      phone,
      passwordHash,
      isReturning: false,
      firstOrderAt: null,
      lastOrderAt: null,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
    });

    const token = signToken({ id: customer.id, email: customer.email!, role: "customer", name: customer.name! } as any);

    const cookieStore = await cookies();
    cookieStore.set("customer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
