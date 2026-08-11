"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CalendarDays, CheckCircle2, Download, Flame, RotateCcw, Target, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/data/categories";
import { ALL_PROBLEMS, problemsInCategory } from "@/lib/data/problems";
import { useProgress, type ImportResult } from "@/lib/progress";
import { useAuthDialog } from "@/components/auth-dialog";
import { difficultyTextColor, formatRuntime } from "@/lib/format";
import { languageById } from "@/lib/judge/languages";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const {
    profile,
    solvedCount,
    attemptedCount,
    streak,
    statusOf,
    submissions,
    resetProgress,
    exportData,
    importData,
    unlockBackup,
    mergeProgress,
    signIn,
  } = useProgress();
  const { openWith, setPendingImport } = useAuthDialog();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportPassword, setExportPassword] = useState("");
  const [exporting, setExporting] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [pendingUnlockFile, setPendingUnlockFile] = useState<File | null>(null);

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

  const handleExport = () => {
    // Export is account-only: prompt guests to sign up first.
    if (!profile) {
      toast.info("Create an account to export your progress.");
      openWith({ mode: "signup" });
      return;
    }
    // Nothing to back up yet — don't download an empty file.
    if (solvedCount === 0 && submissions.length === 0) {
      toast.info("Nothing to export yet — solve a problem first.");
      return;
    }
    setExportPassword("");
    setExportOpen(true);
  };

  const submitExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const { solvedCount: solved, submissionCount: subs } = await exportData(exportPassword);
      toast.success(`Exported ${solved} solved, ${subs} submissions (password protected)`);
      setExportOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  };

  /** Shared post-parse handling: attach via auth, or merge straight away. */
  const applyImported = (result: ImportResult) => {
    if (!result.state) return;
    // Signed out and the backup carries an account email: the import only lands
    // after that account has authenticated.
    if (!profile && result.email) {
      setPendingImport(result.state);
      openWith({ mode: "signin", email: result.email });
      toast.info("Backup ready — sign in to attach it.");
      return;
    }
    // No email in the backup (or already signed in): merge straight away.
    mergeProgress(result.state);
    toast.success(`Imported — ${result.solvedCount} solved, ${result.submissionCount} submissions`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-importing the same file later
    if (!file) return;
    const result = await importData(file);
    if (!result.ok) {
      toast.error(result.error ?? "Import failed.");
      return;
    }
    // Password-protected backup: ask for the password before anything is read.
    if (result.encrypted) {
      setPendingUnlockFile(file);
      setUnlockPassword("");
      setUnlockOpen(true);
      toast.info("This backup is password protected — enter the password to unlock it.");
      return;
    }
    applyImported(result);
  };

  const submitUnlock = async () => {
    if (unlocking || !pendingUnlockFile) return;
    setUnlocking(true);
    let success = false;
    try {
      const result = await unlockBackup(pendingUnlockFile, unlockPassword);
      if (!result.ok || !result.state) {
        toast.error(result.error ?? "Could not unlock this backup.");
        return; // wrong password — keep the dialog open to retry
      }
      // The password was just proven by decryption — if there's an account email
      // and we're signed out, attach with the same password directly.
      if (!profile && result.email) {
        const r = await signIn(result.email, unlockPassword);
        if (r.ok) {
          mergeProgress(result.state);
          toast.success("Backup unlocked and attached to your account");
        } else {
          setPendingImport(result.state);
          openWith({ mode: "signin", email: result.email });
          toast.info("Backup unlocked — sign in to attach it.");
        }
      } else {
        mergeProgress(result.state);
        toast.success(`Unlocked — ${result.solvedCount} solved, ${result.submissionCount} submissions`);
      }
      success = true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not unlock this backup.");
    } finally {
      setUnlocking(false);
      if (success) {
        setUnlockOpen(false);
        setPendingUnlockFile(null);
        setUnlockPassword("");
      }
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

      <div className="mt-8 rounded-xl border bg-card p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">Backup your data</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Export your progress as a JSON file to keep it safe or move it to another
              machine — import it back anytime to restore or merge. Your file contains
              everything: solved problems, attempts and submissions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export data
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-1.5 h-3.5 w-3.5" /> Import data
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImport}
            />
          </div>
        </div>
      </div>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Protect your backup</DialogTitle>
            <DialogDescription>
              Enter your account password to encrypt this backup. The same password
              unlocks it on any machine — including where your account doesn&apos;t exist.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitExport();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="export-password">Password</Label>
              <Input
                id="export-password"
                type="password"
                value={exportPassword}
                onChange={(e) => setExportPassword(e.target.value)}
                placeholder="Your account password"
                autoComplete="current-password"
                autoFocus
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={exporting}>
                {exporting ? "Encrypting…" : "Encrypt & download"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={unlockOpen} onOpenChange={setUnlockOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Unlock backup</DialogTitle>
            <DialogDescription>
              Enter the password this backup was encrypted with to read your progress.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitUnlock();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="unlock-password">Password</Label>
              <Input
                id="unlock-password"
                type="password"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder="Backup password"
                autoComplete="current-password"
                autoFocus
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={unlocking}>
                {unlocking ? "Unlocking…" : "Unlock"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
