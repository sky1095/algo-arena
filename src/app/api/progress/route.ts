import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicUser } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getProgressFile, saveProgressFile } from "@/lib/progress-store";
import { emptyProgress, type ProgressState } from "@/lib/types";

export async function GET(req: NextRequest) {
  const user = getSessionUser(req);
  if (!user) return NextResponse.json(emptyProgress);
  const state = getProgressFile(user.id) ?? { ...emptyProgress };
  return NextResponse.json({ ...state, profile: publicUser(user) });
}

export async function POST(req: NextRequest) {
  const user = getSessionUser(req);
  if (!user) {
    // Guests keep their progress in localStorage; only accounts persist to disk.
    return NextResponse.json({ ok: false, reason: "not-signed-in" }, { status: 401 });
  }

  let incoming: unknown;
  try {
    incoming = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const state = sanitizeState(incoming);
  const saved = saveProgressFile(user.id, state);
  return NextResponse.json({ ok: true, saved: { ...saved, profile: publicUser(user) } });
}

function sanitizeState(v: unknown): ProgressState {
  const s = (v ?? {}) as Partial<ProgressState>;
  return {
    solved: Array.isArray(s.solved) ? s.solved.filter((x): x is string => typeof x === "string") : [],
    attempted: Array.isArray(s.attempted) ? s.attempted.filter((x): x is string => typeof x === "string") : [],
    submissions: Array.isArray(s.submissions) ? s.submissions.filter(isSubmission) : [],
    profile: null, // profile is always read from the users table, never the client
  };
}

function isSubmission(v: unknown): boolean {
  if (!v || typeof v !== "object") return false;
  const s = v as { id?: unknown; slug?: unknown; language?: unknown; status?: unknown; createdAt?: unknown };
  return (
    typeof s.id === "string" &&
    typeof s.slug === "string" &&
    typeof s.language === "string" &&
    typeof s.status === "string" &&
    typeof s.createdAt === "number"
  );
}
