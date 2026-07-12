import crypto from "crypto";
import bcrypt from "bcryptjs";
import { db } from "./db";
import type { StaffUser } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";

export interface JwtPayload {
  staffUserId: number;
  email: string;
  role: string;
  exp: number;
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64").toString("utf8");
}

function hmacSha256(secret: string, data: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

export function signToken(user: StaffUser): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      staffUserId: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    })
  );
  const signature = hmacSha256(JWT_SECRET, `${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): JwtPayload {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token format");

  const [header, payload, signature] = parts;
  const expectedSig = hmacSha256(JWT_SECRET, `${header}.${payload}`);

  if (signature !== expectedSig) throw new Error("Invalid signature");

  const decoded = JSON.parse(base64UrlDecode(payload)) as JwtPayload;

  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return decoded;
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function getStaffUserFromPayload(payload: JwtPayload): StaffUser | undefined {
  return db.getById<StaffUser>("staffUsers", payload.staffUserId);
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/token=([^;]+)/);
  if (match) return match[1];

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);

  return null;
}

export function authenticateRequest(request: Request): { user: StaffUser; payload: JwtPayload } | { error: string; status: number } {
  const token = getTokenFromRequest(request);
  if (!token) return { error: "Authentication required", status: 401 };

  try {
    const payload = verifyToken(token);
    const user = getStaffUserFromPayload(payload);
    if (!user || !user.isActive) return { error: "User not found or inactive", status: 401 };
    return { user, payload };
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
}
