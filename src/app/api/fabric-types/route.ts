import { db } from "@/lib/db";
import { successResponse } from "@/lib/api-response";

export async function GET() {
  const types = db.getAll<any>("fabricTypes");
  return successResponse(types);
}
