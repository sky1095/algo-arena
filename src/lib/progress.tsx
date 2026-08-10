"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LanguageId, Submission, UserProfile } from "@/lib/types";

const STORAGE_KEY = "algo-arena:progress:v1";

interface ProgressState {
  solved: string[];
  attempted: string[];
  submissions: Submission[];
  profile: UserProfile | null;
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
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  resetProgress: () => void;
}

const initialState: ProgressState = {
  solved: [],
  attempted: [],
  submissions: [],
  profile: null,
};

function mergeStates(a: ProgressState, b: ProgressState): ProgressState {
  const solved = [...new Set([...a.solved, ...b.solved])];
  const attempted = [...new Set([...a.attempted, ...b.attempted])];
  const byId = new Map<string, Submission>();
  for (const sub of [...a.submissions, ...b.submissions]) byId.set(sub.id, sub);
  const submissions = [...byId.values()].sort((x, y) => y.createdAt - x.createdAt).slice(0, 200);
  // Prefer the profile that has been around longer so a re-login doesn't reset joinedAt.
  const profile =
    a.profile && b.profile
      ? (a.profile.joinedAt <= b.profile.joinedAt ? a.profile : b.profile)
      : (a.profile ?? b.profile);
  return { solved, attempted, submissions, profile };
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

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState);
  // Never persist the pre-hydration empty state over saved data.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let local: ProgressState = { ...initialState };
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<ProgressState>;
          local = {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
            profile: parsed.profile ?? null,
          };
        }
      } catch {
        // Corrupt storage — start fresh.
      }
      let remote: ProgressState = { ...initialState };
      try {
        const res = await fetch("/api/progress");
        if (res.ok) remote = (await res.json()) as ProgressState;
      } catch {
        // Server unreachable — fall back to local-only.
      }
      if (!cancelled) {
        setState(mergeStates(local, remote));
        setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Mirror to localStorage immediately (fast offline cache), and push to the
  // repo-backed store on the server with a short debounce.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable — ignore.
    }
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
  }, [state, hydrated]);

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

  const signIn = useCallback((name: string, email: string) => {
    setState((prev) => ({
      ...prev,
      profile: { name, email, joinedAt: prev.profile?.joinedAt ?? Date.now() },
    }));
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, profile: null }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(initialState);
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
      signOut,
      resetProgress,
    }),
    [state, isSolved, isAttempted, statusOf, recordRun, recordSubmission, streak, signIn, signOut, resetProgress]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
