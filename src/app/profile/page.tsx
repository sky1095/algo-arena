"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CalendarDays, CheckCircle2, Flame, RotateCcw, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/data/categories";
import { ALL_PROBLEMS, problemsInCategory } from "@/lib/data/problems";
import { useProgress } from "@/lib/progress";
import { difficultyTextColor, formatRuntime } from "@/lib/format";
import { languageById } from "@/lib/judge/languages";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { profile, solvedCount, attemptedCount, streak, statusOf, submissions, resetProgress } =
    useProgress();

  const byDifficulty = useMemo(() => {
    const out = { Easy: 0, Medium: 0, Hard: 0 };
    for (const p of ALL_PROBLEMS) if (statusOf(p.slug) === "solved") out[p.difficulty]++;
    return out;
  }, [statusOf]);

  const total = ALL_PROBLEMS.length;
  const pct = total === 0 ? 0 : Math.round((solvedCount / total) * 100);

  const recent = submissions.slice(0, 25);

  const handleReset = () => {
    if (confirm("Reset all progress, submissions and streak? This cannot be undone.")) {
      resetProgress();
      toast.info("Progress reset");
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
          {profile ? profile.name.slice(0, 1).toUpperCase() : "G"}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {profile ? profile.name : "Guest"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile
              ? profile.email
              : "Signed out — progress is still saved locally."}
          </p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto" onClick={handleReset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset progress
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Target className="h-4 w-4" /> Solved
          </div>
          <div className="mt-2 text-4xl font-bold tabular-nums">
            {solvedCount}
            <span className="text-lg font-normal text-muted-foreground"> / {total}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{pct}% of the roadmap</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Flame className="h-4 w-4" /> Streak
          </div>
          <div className="mt-2 text-4xl font-bold tabular-nums">
            {streak}
            <span className="text-lg font-normal text-muted-foreground"> days</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {streak > 0 ? "Keep solving daily!" : "Solve a problem today to start a streak."}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" /> Attempted
          </div>
          <div className="mt-2 text-4xl font-bold tabular-nums">{attemptedCount}</div>
          <p className="mt-2 text-xs text-muted-foreground">problems you have started</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold">Difficulty breakdown</h2>
          <div className="mt-3 space-y-2 rounded-xl border bg-card p-4">
            {(["Easy", "Medium", "Hard"] as const).map((d) => {
              const done = byDifficulty[d];
              const inTotal = ALL_PROBLEMS.filter((p) => p.difficulty === d).length;
              const w = inTotal === 0 ? 0 : Math.round((done / inTotal) * 100);
              return (
                <div key={d} className="flex items-center gap-3 text-sm">
                  <span className={cn("w-14 font-medium", difficultyTextColor(d))}>{d}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        d === "Easy" && "bg-green-500",
                        d === "Medium" && "bg-amber-500",
                        d === "Hard" && "bg-red-500"
                      )}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                  <span className="w-16 text-right tabular-nums text-muted-foreground">
                    {done} / {inTotal}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Category progress</h2>
          <div className="mt-3 max-h-96 space-y-1.5 overflow-y-auto rounded-xl border bg-card p-4">
            {CATEGORIES.map((cat) => {
              const problems = problemsInCategory(cat.id);
              const solved = problems.filter((p) => statusOf(p.slug) === "solved").length;
              const w = problems.length === 0 ? 0 : Math.round((solved / problems.length) * 100);
              return (
                <Link
                  key={cat.id}
                  href={`/roadmap#${cat.id}`}
                  className="flex items-center gap-3 rounded-lg px-1.5 py-1.5 text-sm hover:bg-accent/60"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="min-w-0 flex-1 truncate">{cat.name}</span>
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${w}%` }} />
                  </div>
                  <span className="w-10 text-right tabular-nums text-muted-foreground">
                    {solved}/{problems.length}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Recent submissions</h2>
        {recent.length === 0 ? (
          <div className="mt-3 rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
            Nothing yet — <Link href="/problems" className="font-medium text-foreground underline underline-offset-2">try a problem</Link>.
          </div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-xl border bg-card">
            {recent.map((s) => (
              <Link
                key={s.id}
                href={`/problems/${s.slug}`}
                className="flex items-center gap-3 border-b px-4 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-accent/60"
              >
                <CheckCircle2
                  className={cn(
                    "h-4 w-4 shrink-0",
                    s.status === "Accepted" ? "text-green-500" : "text-muted-foreground/40"
                  )}
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {ALL_PROBLEMS.find((p) => p.slug === s.slug)?.title ?? s.slug}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    s.status === "Accepted"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                  )}
                >
                  {s.status}
                </Badge>
                <span className="hidden w-20 text-right text-muted-foreground sm:block">
                  {languageById(s.language)?.label}
                </span>
                {s.status === "Accepted" && (
                  <span className="hidden w-16 text-right tabular-nums text-muted-foreground sm:block">
                    {formatRuntime(s.runtimeMs)}
                  </span>
                )}
                <span className="w-32 text-right text-xs tabular-nums text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
