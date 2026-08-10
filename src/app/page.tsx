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
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="flex flex-col items-start gap-6">
        <Badge variant="secondary" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Free &amp; offline — no account needed
        </Badge>
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ace the coding interview, one problem at a time.
          </h1>
          <p className="text-lg text-muted-foreground">
            A curated roadmap of classic algorithm problems — the same patterns asked at top
            companies — with a real judge that runs your code in Python, JavaScript, TypeScript,
            Java and C++.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/problems" className={buttonVariants({ size: "lg" })}>
            Browse problems <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link href="/roadmap" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Open the roadmap
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <HomeStats />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <Link
          href={`/problems/${today.slug}`}
          className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Daily problem
          </div>
          <div className="mt-3 text-xl font-semibold group-hover:underline">{today.title}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <Badge className={difficultyColor(today.difficulty)}>{today.difficulty}</Badge>
            <span className="text-muted-foreground">{category?.name}</span>
          </div>
        </Link>

        <div className="rounded-xl border bg-card p-5">
          <div className="text-sm font-medium text-muted-foreground">Problem mix</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-green-600 dark:text-green-400">Easy</span>
              <span className="tabular-nums">{easy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-500">Medium</span>
              <span className="tabular-nums">{medium}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-500">Hard</span>
              <span className="tabular-nums">{hard}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full">
                <div className="bg-green-500" style={{ width: `${(easy / ALL_PROBLEMS.length) * 100}%` }} />
                <div className="bg-amber-500" style={{ width: `${(medium / ALL_PROBLEMS.length) * 100}%` }} />
                <div className="bg-red-500" style={{ width: `${(hard / ALL_PROBLEMS.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="text-sm font-medium text-muted-foreground">How it works</div>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>1. Pick a problem from the roadmap</li>
            <li>2. Write code in the built-in editor</li>
            <li>3. Run it against sample tests, then submit</li>
            <li>4. Track progress and build your streak</li>
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Roadmap categories</h2>
          <Link href="/roadmap" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/roadmap#${cat.id}`}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-medium">{cat.name}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
