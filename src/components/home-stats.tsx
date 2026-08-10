"use client";

import { useProgress } from "@/lib/progress";
import { TOTAL_PROBLEMS } from "@/lib/data/problems";
import { CATEGORIES } from "@/lib/data/categories";

export function HomeStats() {
  const { solvedCount, streak } = useProgress();
  const stats = [
    { label: "Problems solved", value: solvedCount, sub: `of ${TOTAL_PROBLEMS} total` },
    { label: "Day streak", value: streak, sub: "keep it going" },
    { label: "Categories", value: CATEGORIES.length, sub: "curated roadmap" },
    { label: "Languages", value: 5, sub: "Python · JS · TS · Java · C++" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border bg-card p-4">
          <div className="text-3xl font-bold tabular-nums">{s.value}</div>
          <div className="mt-1 text-sm font-medium">{s.label}</div>
          <div className="text-xs text-muted-foreground">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
