import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const result = authenticateRequest(request);

  if ("error" in result) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: result.status }
    );
  }

  const { user } = result;
  return NextResponse.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
