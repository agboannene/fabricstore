import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { StaffUser } from "@/lib/types";

export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const allStaff = await db.getAll<StaffUser>("staffUsers");
  const staff = allStaff.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    lastLoginAt: u.lastLoginAt,
  }));

  return NextResponse.json({ success: true, data: staff });
}
