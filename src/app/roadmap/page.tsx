"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Circle, CircleDashed } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { problemsInCategory } from "@/lib/data/problems";
import { useProgress } from "@/lib/progress";
import { difficultyTextColor } from "@/lib/format";
import { cn } from "@/lib/utils";

function StatusIcon({ status }: { status: "solved" | "attempted" | null }) {
  if (status === "solved") return <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />;
  if (status === "attempted") return <Circle className="h-4 w-4 shrink-0 text-amber-500" />;
  return <CircleDashed className="h-4 w-4 shrink-0 text-muted-foreground/40" />;
}

export default function RoadmapPage() {
  const { statusOf, solvedCount } = useProgress();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const total = useMemo(() => CATEGORIES.reduce((n, c) => n + problemsInCategory(c.id).length, 0), []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && CATEGORIES.some((c) => c.id === hash)) {
      setExpanded((prev) => new Set(prev).add(hash));
    }
  }, []);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const pct = total === 0 ? 0 : Math.round((solvedCount / total) * 100);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Roadmap</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Work through the categories in order. Each builds on the last.
        </p>
      </div>

      <div className="mt-6 rounded-xl border bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-foreground">Overall progress</span>
          <span className="tabular-nums text-xs sm:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{solvedCount}</span> / {total} solved ({pct}%)
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {(["Data Structures", "Algorithms"] as const).map((section) => (
        <section key={section} className="mt-8 sm:mt-10">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {section}
          </h2>
          <div className="mt-3 space-y-2.5">
            {CATEGORIES.filter((c) => c.section === section).map((cat) => {
              const problems = problemsInCategory(cat.id);
              const solved = problems.filter((p) => statusOf(p.slug) === "solved").length;
              const isOpen = expanded.has(cat.id);
              return (
                <div key={cat.id} id={cat.id} className="overflow-hidden rounded-xl border bg-card shadow-xs transition-colors hover:border-primary/30">
                  <button
                    onClick={() => toggle(cat.id)}
                    className="flex w-full items-center gap-2.5 sm:gap-3.5 px-3.5 sm:px-4 py-3 sm:py-3.5 text-left transition-colors hover:bg-accent/50 cursor-pointer"
                  >
                    <span
                      className="h-9 sm:h-10 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm sm:text-base">{cat.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {problems.length} problems · {cat.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm tabular-nums shrink-0">
                      <span className={cn("font-medium", solved === problems.length && "text-green-500 font-semibold")}>
                        {solved}
                      </span>
                      <span className="text-muted-foreground">/{problems.length}</span>
                    </div>
                    <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted sm:w-20 shrink-0">
                      <div
                        className="h-full rounded-full bg-green-500 transition-all"
                        style={{
                          width: `${problems.length === 0 ? 0 : (solved / problems.length) * 100}%`,
                        }}
                      />
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <ul className="border-t divide-y bg-muted/10">
                      {problems.map((p, i) => {
                        const status = statusOf(p.slug);
                        return (
                          <li key={p.slug}>
                            <Link
                              href={`/problems/${p.slug}`}
                              className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 text-sm transition-colors hover:bg-accent/60"
                            >
                              <span className="w-5 shrink-0 text-right tabular-nums text-xs text-muted-foreground/60">
                                {i + 1}
                              </span>
                              <StatusIcon status={status} />
                              <span className="min-w-0 flex-1 truncate font-medium text-xs sm:text-sm">{p.title}</span>
                              <span className={cn("text-xs font-medium shrink-0", difficultyTextColor(p.difficulty))}>
                                {p.difficulty}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
