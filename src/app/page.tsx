import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HomeStats } from "@/components/home-stats";
import { CATEGORIES } from "@/lib/data/categories";
import { ALL_PROBLEMS, dailyProblem } from "@/lib/data/problems";
import { difficultyColor } from "@/lib/format";

export const dynamic = "force-static";

export default function Home() {
  const today = dailyProblem();
  const category = CATEGORIES.find((c) => c.id === today.category);
  const easy = ALL_PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const medium = ALL_PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hard = ALL_PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <section className="flex flex-col items-start gap-5 sm:gap-6">
        <Badge variant="secondary" className="gap-1.5 border border-primary/10 px-3 py-1 text-xs font-medium shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Free &amp; offline — no account needed
        </Badge>
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
            Ace the coding interview,{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              one problem at a time.
            </span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            A curated roadmap of classic algorithm problems — the same patterns asked at top
            companies — with a real judge that runs your code in Python, JavaScript, TypeScript,
            Java and C++.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href="/problems" className={buttonVariants({ size: "lg", className: "shadow-xs" })}>
            Browse problems <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
          <Link href="/roadmap" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Open the roadmap
          </Link>
        </div>
      </section>

      <section className="mt-8 sm:mt-12">
        <HomeStats />
      </section>

      <section className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/problems/${today.slug}`}
          className="group flex flex-col justify-between rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-xs"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              Daily problem
            </div>
            <div className="mt-2.5 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
              {today.title}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="secondary" className={difficultyColor(today.difficulty)}>{today.difficulty}</Badge>
            <span className="text-xs text-muted-foreground">{category?.name}</span>
          </div>
        </Link>

        <div className="flex flex-col justify-between rounded-xl border bg-card p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Problem mix</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-600 dark:text-green-400">Easy</span>
              <span className="text-xs font-semibold tabular-nums">{easy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-500">Medium</span>
              <span className="text-xs font-semibold tabular-nums">{medium}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-red-500">Hard</span>
              <span className="text-xs font-semibold tabular-nums">{hard}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full">
                <div className="bg-green-500 transition-all" style={{ width: `${(easy / ALL_PROBLEMS.length) * 100}%` }} />
                <div className="bg-amber-500 transition-all" style={{ width: `${(medium / ALL_PROBLEMS.length) * 100}%` }} />
                <div className="bg-red-500 transition-all" style={{ width: `${(hard / ALL_PROBLEMS.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border bg-card p-5 sm:col-span-2 lg:col-span-1">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">How it works</div>
          <ol className="mt-3 space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <li><span className="font-medium text-foreground">1.</span> Pick a problem from the roadmap</li>
            <li><span className="font-medium text-foreground">2.</span> Write code in the built-in editor</li>
            <li><span className="font-medium text-foreground">3.</span> Run against sample tests, then submit</li>
            <li><span className="font-medium text-foreground">4.</span> Track progress &amp; maintain streaks</li>
          </ol>
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Roadmap categories</h2>
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">Master fundamental patterns topic by topic.</p>
          </div>
          <Link href="/roadmap" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/roadmap#${cat.id}`}
              className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">{cat.name}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
