import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { BusinessSetting } from "@/lib/types";

export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const settings = db.getAll<BusinessSetting>("businessSettings");
  return NextResponse.json({ success: true, data: settings });
}

export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { key, value } = await request.json();
  if (!key || value === undefined) {
    return NextResponse.json({ success: false, error: "Key and value are required" }, { status: 400 });
  }

  const setting = db.getOneByField<BusinessSetting>("businessSettings", "key", key);
  if (!setting) {
    return NextResponse.json({ success: false, error: "Setting not found" }, { status: 404 });
  }

  db.update<BusinessSetting>("businessSettings", setting.id, {
    value,
    updatedBy: auth.user.id,
    updatedAt: new Date().toISOString(),
  } as Partial<BusinessSetting>);

  return NextResponse.json({ success: true, data: { ...setting, value } });
}
