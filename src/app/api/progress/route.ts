import { NextResponse } from "next/server";
import { loadProgress, saveProgress, type ProgressState } from "@/lib/progress-store";

/** Merge two progress states, unioning solved/attempted and de-duping submissions. */
function mergeStates(a: ProgressState, b: ProgressState): ProgressState {
  const solved = [...new Set([...a.solved, ...b.solved])];
  const attempted = [...new Set([...a.attempted, ...b.attempted])];
  const byId = new Map<string, (typeof a.submissions)[number]>();
  for (const sub of [...a.submissions, ...b.submissions]) byId.set(sub.id, sub);
  const submissions = [...byId.values()].sort((x, y) => y.createdAt - x.createdAt).slice(0, 200);
  return {
    solved,
    attempted,
    submissions,
    profile: b.profile ?? a.profile,
  };
}

export async function GET() {
  const state = await loadProgress();
  return NextResponse.json(state);
}

export async function POST(req: Request) {
  let incoming: unknown;
  try {
    incoming = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const base = await loadProgress();
  const next = mergeStates(base, incoming as ProgressState);
  await saveProgress(next);
  return NextResponse.json({ ok: true, saved: next });
}
