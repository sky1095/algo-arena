"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Code2, Flame, LogOut, Moon, Sun, UserRound } from "lucide-react";
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
import { useProgress } from "@/lib/progress";
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
  const { streak, profile, signIn, signOut } = useProgress();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  // next-themes' `resolvedTheme` is undefined during SSR and only resolves on the
  // client after mount, so gate theme-dependent UI behind this flag to avoid
  // hydration mismatches (server renders Moon, client hydrates as Sun).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && !profile) {
      setName("");
      setEmail("");
    }
  }, [open, profile]);

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
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Code2 className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Algo Arena</span>
        </Link>

        <nav className="ml-4 flex items-center gap-1">
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
                  className: cn(active && "bg-accent text-accent-foreground"),
                })}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {streak > 0 && (
            <span className="hidden items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium text-orange-500 sm:flex">
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
                  <DialogTitle>Sign in</DialogTitle>
                  <DialogDescription>
                    Demo auth — your progress is stored locally in this browser.
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (name.trim() && email.trim()) {
                      signIn(name.trim(), email.trim());
                      setOpen(false);
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="signin-name">Name</Label>
                    <Input
                      id="signin-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ada Lovelace"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@example.com"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Sign in
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
