"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Circle, CircleDashed, Search } from "lucide-react";
import { ALL_PROBLEMS } from "@/lib/data/problems";
import { CATEGORIES } from "@/lib/data/categories";
import { useProgress } from "@/lib/progress";
import { difficultyColor } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Difficulty } from "@/lib/types";

type DifficultyFilter = "All" | Difficulty;
type StatusFilter = "All" | "Solved" | "Attempted";

function StatusIcon({ status }: { status: "solved" | "attempted" | null }) {
  if (status === "solved") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (status === "attempted") return <Circle className="h-5 w-5 text-amber-500" />;
  return <CircleDashed className="h-5 w-5 text-muted-foreground/40" />;
}

export default function ProblemsPage() {
  const { statusOf } = useProgress();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<StatusFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PROBLEMS.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (category !== "All" && p.category !== category) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.slug.includes(q)) return false;
      if (status !== "All") {
        const s = statusOf(p.slug);
        if (status === "Solved" && s !== "solved") return false;
        if (status === "Attempted" && s !== "attempted") return false;
      }
      return true;
    });
  }, [query, difficulty, category, status, statusOf]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Problems</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {ALL_PROBLEMS.length} problems across {CATEGORIES.length} curated categories.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 md:flex-row md:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-9"
            placeholder="Search problems by name or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center gap-2">
          <Select value={difficulty} onValueChange={(v) => setDifficulty((v ?? "All") as DifficultyFilter)}>
            <SelectTrigger className="h-9 w-full md:w-32">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={(v) => setCategory(v ?? "All")}>
            <SelectTrigger className="h-9 w-full md:w-44">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All topics</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => setStatus((v ?? "All") as StatusFilter)}>
            <SelectTrigger className="h-9 w-full col-span-2 sm:col-span-1 md:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All status</SelectItem>
              <SelectItem value="Solved">Solved</SelectItem>
              <SelectItem value="Attempted">Attempted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-xs">
        <div className="grid grid-cols-[2rem_1fr] items-center gap-3 border-b bg-muted/30 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid-cols-[2.5rem_1fr_7rem_10rem]">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="hidden sm:block">Difficulty</span>
          <span className="hidden sm:block">Category</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            No problems match your search filters.
          </div>
        ) : (
          filtered.map((p) => {
            const cat = CATEGORIES.find((c) => c.id === p.category);
            return (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="grid grid-cols-[2rem_1fr] items-center gap-3 border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/60 sm:grid-cols-[2.5rem_1fr_7rem_10rem]"
              >
                <div className="flex justify-center">
                  <StatusIcon status={statusOf(p.slug)} />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium text-sm sm:text-base">{p.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
                    <Badge variant="secondary" className={cn("px-1.5 py-0 text-[10px]", difficultyColor(p.difficulty))}>
                      {p.difficulty}
                    </Badge>
                    <span>·</span>
                    <span className="truncate">{cat?.name}</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Badge variant="secondary" className={difficultyColor(p.difficulty)}>
                    {p.difficulty}
                  </Badge>
                </div>
                <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: cat?.color }}
                  />
                  <span className="truncate">{cat?.name}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
        Showing {filtered.length} of {ALL_PROBLEMS.length} problems
      </p>
    </main>
  );
}
