import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicUser } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getSessionUser(req);
  return NextResponse.json({ user: user ? publicUser(user) : null });
}
