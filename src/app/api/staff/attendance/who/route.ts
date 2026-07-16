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

export async function GET(request: Request) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  if (auth.user.role !== "owner" && auth.user.role !== "manager") {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  const today = getTodayDate();
  const records = await prisma.staffAttendance.findMany({
    where: { date: today },
    include: { staffUser: { select: { id: true, name: true, role: true } } },
    orderBy: { clockIn: "desc" },
  });

  return NextResponse.json({ success: true, data: records });
}
