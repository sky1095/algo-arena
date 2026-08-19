"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Code2, Flame, LogOut, Moon, Sun, Upload, UserRound } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useProgress, type ImportResult } from "@/lib/progress";
import { useAuthDialog } from "@/components/auth-dialog";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/problems", label: "Problems" },
  { href: "/library", label: "Library" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/profile", label: "Stats" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { streak, profile, signIn, signUp, signOut, mergeProgress, importData, unlockBackup } = useProgress();
  const { state: auth, setOpen, setMode, setEmail, setPendingImport } = useAuthDialog();
  const { open, mode, email, pendingImport } = auth;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // A password-protected backup picked in this dialog, waiting to be unlocked.
  const [backupFile, setBackupFile] = useState<File | null>(null);
  const [backupPassword, setBackupPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  // next-themes' `resolvedTheme` is undefined during SSR and only resolves on the
  // client after mount, so gate theme-dependent UI behind this flag to avoid
  // hydration mismatches (server renders Moon, client hydrates as Sun).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && !profile) {
      // Reset the entry fields each time the dialog opens (email is managed by
      // the auth-dialog provider so it can be prefilled, e.g. from an import).
      setName("");
      setPassword("");
      setBackupFile(null);
      setBackupPassword("");
    }
  }, [open, profile]);

  // A backup awaiting authentication is only applied on success — if the dialog
  // closes without signing in/up, discard the pending import (and any picked
  // encrypted file) so it never sneaks into a later session.
  useEffect(() => {
    if (!open) {
      setPendingImport(null);
      setBackupFile(null);
      setBackupPassword("");
    }
  }, [open, pendingImport, setPendingImport]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const result =
        mode === "signup"
          ? await signUp(name.trim(), email.trim(), password)
          : await signIn(email.trim(), password);
      if (result.ok) {
        // Only now, after the password was verified, do we merge the imported
        // backup into the account (the guest state merges in along with it).
        if (pendingImport) {
          mergeProgress(pendingImport);
          setPendingImport(null);
          toast.success(mode === "signup" ? "Account created — backup attached!" : "Backup attached to your account");
        } else {
          toast.success(mode === "signup" ? "Account created — welcome!" : `Welcome back!`);
        }
        setOpen(false);
      } else {
        toast.error(result.error ?? "Something went wrong.");
      }
    } finally {
      setPending(false);
    }
  };

  /** Shared post-parse handling for backups picked in this dialog. */
  const applyImported = (result: ImportResult) => {
    if (!result.state) return;
    // Backup belongs to an account: attach it only after that account signs in.
    if (result.email) {
      setPendingImport(result.state);
      setMode("signin");
      setEmail(result.email);
      toast.info("Backup ready — sign in to attach it.");
      return;
    }
    // Email-less backup: merge straight into the current (guest) state.
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
      setBackupFile(file);
      setBackupPassword("");
      toast.info("This backup is password protected — enter its password to unlock it.");
      return;
    }
    applyImported(result);
  };

  const submitUnlock = async () => {
    if (unlocking || !backupFile) return;
    setUnlocking(true);
    try {
      const result = await unlockBackup(backupFile, backupPassword);
      if (!result.ok || !result.state) {
        toast.error(result.error ?? "Could not unlock this backup.");
        return; // wrong password — keep the field so they can retry
      }
      // The password was just proven by decryption — if the backup belongs to an
      // account, it's almost certainly the account password too, so sign in with
      // the same one instead of asking for it again.
      if (result.email) {
        const r = await signIn(result.email, backupPassword);
        if (r.ok) {
          mergeProgress(result.state);
          toast.success("Backup unlocked and attached to your account");
          setOpen(false);
        } else {
          // Passwords differ (or the account doesn't exist here) — fall back to
          // the regular sign-in flow with the email prefilled.
          setPendingImport(result.state);
          setMode("signin");
          setEmail(result.email);
          toast.info("Backup unlocked — enter your account password to attach it.");
        }
      } else {
        // Email-less backup: merge straight into the current (guest) state.
        mergeProgress(result.state);
        toast.success(`Unlocked — ${result.solvedCount} solved, ${result.submissionCount} submissions`);
      }
      setBackupFile(null);
      setBackupPassword("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not unlock this backup.");
    } finally {
      setUnlocking(false);
    }
  };

  const initials = profile
    ? profile.name
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-90">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Code2 className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline font-semibold">Algo Arena</span>
        </Link>

        <nav className="ml-1 sm:ml-4 flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/problems"
                ? pathname.startsWith("/problems")
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: cn(
                    "px-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors",
                    active && "bg-accent text-accent-foreground font-semibold"
                  ),
                })}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {streak > 0 && (
            <span className="hidden items-center gap-1 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-500 md:flex">
              <Flame className="h-3.5 w-3.5" />
              {streak} day{streak === 1 ? "" : "s"}
            </span>
          )}

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {mounted && (resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </Button>

          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="h-8 gap-2 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-28 truncate text-sm font-medium md:inline">
                      {profile.name}
                    </span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="truncate">{profile.name}</span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {profile.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <UserRound className="h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={signOut}>
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger render={<Button size="sm">Sign in</Button>} />
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>{mode === "signup" ? "Create account" : "Sign in"}</DialogTitle>
                  <DialogDescription>
                    {email
                      ? `This backup belongs to ${email} — ${mode === "signup" ? "create an account" : "sign in"} to attach your imported progress.`
                      : mode === "signup"
                        ? "Create an account to keep your progress synced to the server."
                        : "Sign in to pick up your progress from any device."}
                  </DialogDescription>
                </DialogHeader>
                {backupFile && (
                  <div className="grid gap-2 rounded-lg border bg-muted/40 p-3">
                    <Label htmlFor="backup-password">Backup password</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backup-password"
                        type="password"
                        value={backupPassword}
                        onChange={(e) => setBackupPassword(e.target.value)}
                        placeholder="Password this backup was encrypted with"
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="shrink-0"
                        onClick={submitUnlock}
                        disabled={unlocking || !backupPassword}
                      >
                        {unlocking ? "…" : "Unlock"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter the password this backup was encrypted with — if it&apos;s your
                      account password, you&apos;ll be signed in automatically.
                    </p>
                  </div>
                )}
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  {mode === "signup" && (
                    <div className="grid gap-2">
                      <Label htmlFor="signin-name">Name</Label>
                      <Input
                        id="signin-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                        required
                      />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto px-0 text-xs"
                    onClick={() => {
                      setMode(mode === "signin" ? "signup" : "signin");
                    }}
                  >
                    {mode === "signin"
                      ? "New here? Create an account"
                      : "Already have an account? Sign in"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto px-0 text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-1 h-3.5 w-3.5" /> Import a backup file…
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={handleImport}
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-full" disabled={pending}>
                      {pending
                        ? "Please wait…"
                        : mode === "signup"
                          ? "Create account"
                          : "Sign in"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}
