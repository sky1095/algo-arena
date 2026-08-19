"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LIBRARY_PROBLEMS, LIBRARY_TOTAL, libraryStats } from "@/lib/data/library";
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

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LIBRARY_PROBLEMS.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.slug.includes(q)) return false;
      return true;
    });
  }, [query, difficulty]);

  const stats = libraryStats();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Library</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          The complete archive — {LIBRARY_TOTAL.toLocaleString()} problems with JavaScript
          solutions ({stats.byDifficulty.Easy} easy · {stats.byDifficulty.Medium} medium ·{" "}
          {stats.byDifficulty.Hard} hard).
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-9"
            placeholder="Search the archive by name or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={difficulty} onValueChange={(v) => setDifficulty((v ?? "All") as DifficultyFilter)}>
          <SelectTrigger className="h-9 w-full sm:w-36">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-xs">
        <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b bg-muted/30 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>#</span>
          <span>Title</span>
          <span>Difficulty</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            No problems match your search.
          </div>
        ) : (
          filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/library/${p.slug}`}
              className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b px-4 py-3 text-xs sm:text-sm transition-colors last:border-b-0 hover:bg-accent/60"
            >
              <span className="text-xs sm:text-sm tabular-nums text-muted-foreground">{p.id}</span>
              <div className="min-w-0 truncate font-medium text-xs sm:text-sm">{p.title}</div>
              <Badge variant="secondary" className={cn("px-2 py-0.5 text-[11px]", difficultyColor(p.difficulty))}>
                {p.difficulty}
              </Badge>
            </Link>
          ))
        )}
      </div>

      <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
        Showing {filtered.length.toLocaleString()} of {LIBRARY_TOTAL.toLocaleString()} problems
      </p>
    </main>
  );
}
