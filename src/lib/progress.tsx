"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LanguageId, Submission, UserProfile, ProgressState } from "@/lib/types";
import { emptyProgress, mergeProgressStates } from "@/lib/types";
import { decryptBackup, encryptBackup, isEncryptedBackup } from "@/lib/backup-crypto";

const LEGACY_STORAGE_KEY = "algo-arena:progress:v1";
const GUEST_STORAGE_KEY = "algo-arena:progress:v1:guest";
const userStorageKey = (userId: string) => `algo-arena:progress:v1:user:${userId}`;

export interface AuthResult {
  ok: boolean;
  error?: string;
}

export interface ExportSummary {
  solvedCount: number;
  submissionCount: number;
}

export interface ImportResult {
  ok: boolean;
  error?: string;
  solvedCount: number;
  submissionCount: number;
  /** Email of the account the backup was exported from, if any. */
  email: string | null;
  /** Parsed + sanitized progress (null on failure). Apply with mergeProgress. */
  state: ProgressState | null;
  /** True when the backup is password-encrypted and unlockBackup() is required. */
  encrypted: boolean;
}

interface ProgressContextValue extends ProgressState {
  isSolved: (slug: string) => boolean;
  isAttempted: (slug: string) => boolean;
  statusOf: (slug: string) => "solved" | "attempted" | null;
  recordRun: (slug: string) => void;
  recordSubmission: (sub: Submission) => void;
  solvedCount: number;
  attemptedCount: number;
  streak: number;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetProgress: () => void;
  /** Download the current progress encrypted with the account password. */
  exportData: (password: string) => Promise<ExportSummary>;
  /** Parse + validate an exported JSON file without merging it yet. */
  importData: (file: File) => Promise<ImportResult>;
  /** Decrypt a password-protected backup and return its parsed state. */
  unlockBackup: (file: File, password: string) => Promise<ImportResult>;
  /** Merge an imported (or otherwise parsed) state into the current one. */
  mergeProgress: (incoming: ProgressState) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

function computeStreak(solved: string[], submissions: Submission[]): number {
  const solvedDays = new Set<string>();
  for (const sub of submissions) {
    if (sub.status === "Accepted") solvedDays.add(dayKey(sub.createdAt));
  }
  // If a submission lacks a date entry, fall back to nothing.
  if (solvedDays.size === 0) return 0;
  let streak = 0;
  const cursor = new Date();
  // A streak can include today even if not solved yet; start from today.
  for (;;) {
    const key = dayKey(cursor.getTime());
    if (solvedDays.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (streak === 0) {
      // Today not solved yet — allow the streak to start from yesterday.
      cursor.setDate(cursor.getDate() - 1);
      const yesterday = dayKey(cursor.getTime());
      if (solvedDays.has(yesterday)) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return streak;
}

function readLocal(key: string): ProgressState | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      solved: Array.isArray(parsed.solved) ? parsed.solved.filter((s): s is string => typeof s === "string") : [],
      attempted: Array.isArray(parsed.attempted)
        ? parsed.attempted.filter((s): s is string => typeof s === "string")
        : [],
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
      profile: null,
    };
  } catch {
    return null; // Corrupt storage — start fresh.
  }
}

function isSubmissionLike(v: unknown): v is Submission {
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

/** Validate a parsed backup file into a ProgressState (no profile — that's server-derived). */
function sanitizeImported(v: unknown): ProgressState | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const raw = v as Record<string, unknown>;
  const solved = Array.isArray(raw.solved) ? raw.solved.filter((x): x is string => typeof x === "string") : [];
  const attempted = Array.isArray(raw.attempted)
    ? raw.attempted.filter((x): x is string => typeof x === "string")
    : [];
  const submissions = Array.isArray(raw.submissions) ? raw.submissions.filter(isSubmissionLike) : [];
  // Only accept files that actually carry progress data.
  if (!Array.isArray(raw.solved) && !Array.isArray(raw.attempted) && !Array.isArray(raw.submissions)) {
    return null;
  }
  return { solved, attempted, submissions, profile: null };
}

function readGuestLocal(): ProgressState {
  const guest = readLocal(GUEST_STORAGE_KEY);
  if (guest) return guest;
  // Migrate any pre-accounts data from the legacy key.
  const legacy = readLocal(LEGACY_STORAGE_KEY);
  if (legacy) {
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(legacy));
    } catch {
      // Storage unavailable — ignore.
    }
    return legacy;
  }
  return { ...emptyProgress };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(emptyProgress);
  // Never persist the pre-hydration empty state over saved data.
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let user: UserProfile | null = null;
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) user = ((await res.json()) as { user: UserProfile | null }).user ?? null;
      } catch {
        // Server unreachable — stay a guest.
      }

      const local = user ? readLocal(userStorageKey(user.id)) ?? { ...emptyProgress } : readGuestLocal();
      let remote: ProgressState = { ...emptyProgress };
      try {
        const res = await fetch("/api/progress");
        if (res.ok) remote = (await res.json()) as ProgressState;
      } catch {
        // Server unreachable — fall back to local-only.
      }
      if (!cancelled) {
        setState(mergeProgressStates(local, remote));
        setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentKey = state.profile ? userStorageKey(state.profile.id) : GUEST_STORAGE_KEY;

  // Mirror to localStorage immediately (fast offline cache), and push to the
  // database on the server with a short debounce (only for signed-in users —
  // guest progress lives in localStorage until they create an account).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(currentKey, JSON.stringify(state));
    } catch {
      // Storage unavailable — ignore.
    }
    if (!state.profile) return;
    const t = setTimeout(() => {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).catch(() => {
        // Offline or server down — localStorage still has the data;
        // it will be merged back up on the next load.
      });
    }, 500);
    return () => clearTimeout(t);
  }, [state, hydrated, currentKey]);

  const isSolved = useCallback((slug: string) => state.solved.includes(slug), [state.solved]);
  const isAttempted = useCallback((slug: string) => state.attempted.includes(slug), [state.attempted]);
  const statusOf = useCallback(
    (slug: string): "solved" | "attempted" | null => {
      if (state.solved.includes(slug)) return "solved";
      if (state.attempted.includes(slug)) return "attempted";
      return null;
    },
    [state.solved, state.attempted]
  );

  const recordRun = useCallback((slug: string) => {
    setState((prev) =>
      prev.solved.includes(slug)
        ? prev
        : { ...prev, attempted: prev.attempted.includes(slug) ? prev.attempted : [...prev.attempted, slug] }
    );
  }, []);

  const recordSubmission = useCallback((sub: Submission) => {
    setState((prev) => {
      const submissions = [sub, ...prev.submissions].slice(0, 200);
      const solved = sub.status === "Accepted" && !prev.solved.includes(sub.slug)
        ? [...prev.solved, sub.slug]
        : prev.solved;
      const attempted =
        sub.status !== "Accepted" && !prev.attempted.includes(sub.slug)
          ? [...prev.attempted, sub.slug]
          : prev.attempted;
      return { ...prev, submissions, solved, attempted };
    });
  }, []);

  /** Merge any local (guest) progress into the account, then load the server state. */
  const syncAccountState = useCallback(async (): Promise<ProgressState> => {
    const local = readLocal(GUEST_STORAGE_KEY);
    if (local && (local.solved.length > 0 || local.attempted.length > 0 || local.submissions.length > 0)) {
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...local, profile: null }),
        });
      } catch {
        // The merge is lossless (unions + dedupes), so a retry on next load is fine.
      }
    }
    const res = await fetch("/api/progress");
    if (!res.ok) throw new Error("Failed to load progress");
    return (await res.json()) as ProgressState;
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = (await res.json()) as { user?: UserProfile; error?: string };
        if (!res.ok || !data.user) return { ok: false, error: data.error ?? "Sign in failed." };
        setState(await syncAccountState());
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error — please try again." };
      }
    },
    [syncAccountState]
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = (await res.json()) as { user?: UserProfile; error?: string };
        if (!res.ok || !data.user) return { ok: false, error: data.error ?? "Sign up failed." };
        setState(await syncAccountState());
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error — please try again." };
      }
    },
    [syncAccountState]
  );

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      // Even if the server is unreachable, drop the local session display.
    }
    // Switch back to the guest view (restoring their local guest progress) so
    // the mirror effect doesn't wipe the guest storage key with an empty state.
    setState(readGuestLocal());
  }, []);

  const resetProgress = useCallback(() => {
    setState({ ...emptyProgress });
  }, []);

  /** Merge parsed progress into the current state (union + dedupe, idempotent). */
  const mergeProgress = useCallback((incoming: ProgressState) => {
    setState((prev) => mergeProgressStates(prev, incoming));
  }, []);

  /** Download the current progress as a password-encrypted JSON backup file. */
  const exportData = useCallback(async (password: string): Promise<ExportSummary> => {
    const { solved, attempted, submissions, profile } = stateRef.current;
    if (!profile) throw new Error("You must be signed in to export.");
    // Catch a wrong password before producing an unusable backup.
    const check = await fetch("/api/auth/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: profile.email, password }),
    });
    const { ok: verified } = (await check.json()) as { ok: boolean };
    if (!verified) throw new Error("Incorrect password — no backup was created.");

    const payload = {
      app: "algo-arena",
      version: 1,
      exportedAt: new Date().toISOString(),
      // Email only (never a password/session) so the importing side can offer
      // to attach the restored progress to the matching account.
      ...(profile?.email ? { email: profile.email } : {}),
      solved,
      attempted,
      submissions,
    };
    const envelope = await encryptBackup(JSON.stringify(payload), password);
    const blob = new Blob([envelope], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `algo-arena-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return { solvedCount: solved.length, submissionCount: submissions.length };
  }, []);

  /** Restore/merge progress from an exported JSON file (idempotent union). */
  const importData = useCallback(async (file: File): Promise<ImportResult> => {
    let text: string;
    try {
      text = await file.text();
    } catch {
      return { ok: false, error: "Could not read the file.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: false };
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, error: "Not a valid JSON file.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: false };
    }
    // Password-protected backup — needs unlockBackup() before anything else.
    if (isEncryptedBackup(parsed)) {
      return { ok: true, encrypted: true, solvedCount: 0, submissionCount: 0, email: null, state: null };
    }
    const imported = sanitizeImported(parsed);
    if (!imported) {
      return {
        ok: false,
        error: "This file doesn't look like an Algo Arena backup.",
        solvedCount: 0,
        submissionCount: 0,
        email: null,
        state: null,
        encrypted: false,
      };
    }
    const raw = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
    const email = typeof raw.email === "string" && raw.email.trim() ? raw.email.trim().slice(0, 200) : null;
    // No merge happens here — the caller decides when to apply the parsed state
    // (immediately for signed-in users or email-less backups, or only after the
    // backup's password has been verified).
    return {
      ok: true,
      encrypted: false,
      solvedCount: imported.solved.length,
      submissionCount: imported.submissions.length,
      email,
      state: imported,
    };
  }, []);

  /** Decrypt a password-protected backup; returns the parsed state (no merge). */
  const unlockBackup = useCallback(async (file: File, password: string): Promise<ImportResult> => {
    let text: string;
    try {
      text = await file.text();
    } catch {
      return { ok: false, error: "Could not read the file.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: true };
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, error: "Not a valid JSON file.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: true };
    }
    if (!isEncryptedBackup(parsed)) {
      return { ok: false, error: "This backup isn't password protected.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: false };
    }
    let plaintext: string;
    try {
      plaintext = await decryptBackup(parsed, password);
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Could not unlock this backup.",
        solvedCount: 0,
        submissionCount: 0,
        email: null,
        state: null,
        encrypted: true,
      };
    }
    let inner: unknown;
    try {
      inner = JSON.parse(plaintext);
    } catch {
      return { ok: false, error: "The backup contents are corrupted.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: true };
    }
    const imported = sanitizeImported(inner);
    if (!imported) {
      return { ok: false, error: "This file doesn't look like an Algo Arena backup.", solvedCount: 0, submissionCount: 0, email: null, state: null, encrypted: true };
    }
    const raw = inner && typeof inner === "object" && !Array.isArray(inner) ? (inner as Record<string, unknown>) : {};
    const email = typeof raw.email === "string" && raw.email.trim() ? raw.email.trim().slice(0, 200) : null;
    return {
      ok: true,
      encrypted: true,
      solvedCount: imported.solved.length,
      submissionCount: imported.submissions.length,
      email,
      state: imported,
    };
  }, []);

  const streak = useMemo(
    () => computeStreak(state.solved, state.submissions),
    [state.solved, state.submissions]
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      isSolved,
      isAttempted,
      statusOf,
      recordRun,
      recordSubmission,
      solvedCount: state.solved.length,
      attemptedCount: state.attempted.length,
      streak,
      signIn,
      signUp,
      signOut,
      resetProgress,
      exportData,
      importData,
      unlockBackup,
      mergeProgress,
    }),
    [state, isSolved, isAttempted, statusOf, recordRun, recordSubmission, streak, signIn, signUp, signOut, resetProgress, exportData, importData, unlockBackup, mergeProgress]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
