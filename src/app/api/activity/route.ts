import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import type { ActivityLog } from "@/lib/types";

export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "30");

  let logs = db.getAll<ActivityLog>("activityLogs");
  logs.sort((a, b) => b.id - a.id);

  const total = logs.length;
  const start = (page - 1) * limit;
  const paged = logs.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paged,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  });
}
