import { promises as fs } from "fs";
import path from "path";
import type { Submission, UserProfile } from "@/lib/types";

/**
 * Server-side, file-backed progress store. Progress is persisted to
 * `data/progress.json` in the repo root so it survives browser sessions
 * (cleared storage, new devices, incognito) for as long as the project
 * directory does.
 *
 * This module touches the filesystem and must only be imported from
 * server code (API routes), never from client components.
 */

export interface ProgressState {
  solved: string[];
  attempted: string[];
  submissions: Submission[];
  profile: UserProfile | null;
}

export const emptyProgress: ProgressState = {
  solved: [],
  attempted: [],
  submissions: [],
  profile: null,
};

const DATA_DIR = path.join(process.cwd(), "data");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");

function sanitize(value: unknown): ProgressState {
  const v = (value ?? {}) as Partial<ProgressState>;
  return {
    solved: Array.isArray(v.solved) ? v.solved.filter((s): s is string => typeof s === "string") : [],
    attempted: Array.isArray(v.attempted) ? v.attempted.filter((s): s is string => typeof s === "string") : [],
    submissions: Array.isArray(v.submissions) ? v.submissions.filter(isSubmission) : [],
    profile: isProfile(v.profile) ? v.profile : null,
  };
}

function isSubmission(v: unknown): v is Submission {
  if (!v || typeof v !== "object") return false;
  const s = v as Submission;
  return typeof s.id === "string" && typeof s.slug === "string" && typeof s.createdAt === "number";
}

function isProfile(v: unknown): v is UserProfile {
  if (!v || typeof v !== "object") return false;
  const p = v as UserProfile;
  return typeof p.name === "string" && typeof p.email === "string";
}

export async function loadProgress(): Promise<ProgressState> {
  try {
    const raw = await fs.readFile(PROGRESS_FILE, "utf8");
    return sanitize(JSON.parse(raw));
  } catch {
    // Missing or corrupt file — start fresh.
    return { ...emptyProgress };
  }
}

// Serialize writes so concurrent POSTs can't interleave.
let writeQueue: Promise<void> = Promise.resolve();

export async function saveProgress(next: ProgressState): Promise<void> {
  const payload = sanitize(next);
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(PROGRESS_FILE, JSON.stringify(payload, null, 2), "utf8");
  });
  return writeQueue;
}
