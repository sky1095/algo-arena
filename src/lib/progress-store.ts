import { mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ProgressState, Submission } from "@/lib/types";
import { emptyProgress, mergeProgressStates } from "@/lib/types";

/**
 * Per-user progress store: one JSON file per user, mirroring the client's
 * ProgressState shape exactly (solved / attempted / submissions). There is no
 * unified table holding everyone's progress — each account owns its own file,
 * which is exactly what the Export/Import feature moves around.
 *
 * Files live in `data/progress/<userId>.json` by default (override with
 * `PROGRESS_DIR`). Writes are atomic (tmp file + rename), so a crash never
 * corrupts a user's file.
 */

const PROGRESS_DIR = process.env.PROGRESS_DIR ?? path.join(process.cwd(), "data", "progress");

function fileFor(userId: string): string {
  return path.join(PROGRESS_DIR, `${userId}.json`);
}

/** Read a user's progress file, or null when they have none yet. */
export function getProgressFile(userId: string): ProgressState | null {
  try {
    const raw = readFileSync(fileFor(userId), "utf8");
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      solved: Array.isArray(parsed.solved) ? parsed.solved.filter((s): s is string => typeof s === "string") : [],
      attempted: Array.isArray(parsed.attempted)
        ? parsed.attempted.filter((s): s is string => typeof s === "string")
        : [],
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions.filter(isSubmission) : [],
      profile: null, // profile is always derived from the users table, never stored
    };
  } catch {
    return null; // missing or corrupt — caller falls back to empty progress
  }
}

function isSubmission(v: unknown): v is Submission {
  if (!v || typeof v !== "object") return false;
  const s = v as Partial<Submission>;
  return (
    typeof s.id === "string" &&
    typeof s.slug === "string" &&
    typeof s.language === "string" &&
    typeof s.status === "string" &&
    typeof s.createdAt === "number"
  );
}

/** Merge incoming state into the user's stored state and persist it atomically. */
export function saveProgressFile(userId: string, incoming: ProgressState): ProgressState {
  mkdirSync(PROGRESS_DIR, { recursive: true });
  const current = getProgressFile(userId) ?? { ...emptyProgress };
  const merged = mergeProgressStates(current, incoming);
  const file = fileFor(userId);
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, JSON.stringify(merged, null, 2));
  renameSync(tmp, file);
  return merged;
}

export function deleteProgressFile(userId: string): void {
  try {
    unlinkSync(fileFor(userId));
  } catch {
    // no file — nothing to do
  }
}
