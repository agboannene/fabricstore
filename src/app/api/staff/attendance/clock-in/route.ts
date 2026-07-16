import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(request: Request) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const today = getTodayDate();
  const now = new Date();

  const existing = await prisma.staffAttendance.findUnique({
    where: { staffUserId_date: { staffUserId: auth.user.id, date: today } },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "Already clocked in today" },
      { status: 400 }
    );
  }

  const record = await prisma.staffAttendance.create({
    data: {
      staffUserId: auth.user.id,
      clockIn: now,
      date: today,
    },
  });

  return NextResponse.json({ success: true, data: record });
}
