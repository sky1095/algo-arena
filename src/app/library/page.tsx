"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LIBRARY_PROBLEMS, LIBRARY_TOTAL, libraryStats } from "@/lib/data/library";
import { difficultyColor } from "@/lib/format";
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
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Library</h1>
        <p className="text-muted-foreground">
          The complete archive — {LIBRARY_TOTAL.toLocaleString()} problems with JavaScript
          solutions ({stats.byDifficulty.Easy} easy · {stats.byDifficulty.Medium} medium ·{" "}
          {stats.byDifficulty.Hard} hard).
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search the archive…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={difficulty} onValueChange={(v) => setDifficulty((v ?? "All") as DifficultyFilter)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>#</span>
          <span>Title</span>
          <span>Difficulty</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No problems match your search.
          </div>
        ) : (
          filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/library/${p.slug}`}
              className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/60"
            >
              <span className="text-sm tabular-nums text-muted-foreground">{p.id}</span>
              <div className="min-w-0 truncate font-medium">{p.title}</div>
              <Badge variant="secondary" className={difficultyColor(p.difficulty)}>
                {p.difficulty}
              </Badge>
            </Link>
          ))
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length.toLocaleString()} of {LIBRARY_TOTAL.toLocaleString()} problems
      </p>
    </main>
  );
}
