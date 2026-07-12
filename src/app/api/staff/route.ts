import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { StaffUser } from "@/lib/types";

export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const staff = db.getAll<StaffUser>("staffUsers").map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    lastLoginAt: u.lastLoginAt,
  }));

  return NextResponse.json({ success: true, data: staff });
}
