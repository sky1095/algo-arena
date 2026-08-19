"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowLeft, ArrowRight, Check, Copy, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { LibraryProblem, LibrarySolution } from "@/lib/data/library";
import { difficultyColor, difficultyTextColor } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  problem: LibraryProblem;
  solution: LibrarySolution;
  prev?: LibraryProblem;
  next?: LibraryProblem;
}

export function LibraryWorkspace({ problem, solution, prev, next }: Props) {
  const { resolvedTheme } = useTheme();
  // `resolvedTheme` is undefined during SSR; gate the code block behind mount
  // so the server and first client render agree (no hydration mismatch).
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(solution.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-4 sm:mb-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Library
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono text-xs sm:text-sm font-semibold tabular-nums ${difficultyTextColor(problem.difficulty)}`}>
              #{problem.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{problem.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("px-2 py-0.5 text-xs", difficultyColor(problem.difficulty))}>
              {problem.difficulty}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{solution.description}</ReactMarkdown>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5 rounded-xl border border-dashed bg-muted/40 p-3.5 sm:p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Why is this view-only?</span>{" "}
              The auto-judge evaluates plain return values, so pointer-heavy linked-list and tree
              structures are presented here as curated reference solutions.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
            <div className="flex items-center justify-between border-b bg-muted/30 px-3.5 py-2">
              <span className="font-mono text-xs text-muted-foreground">solution.js</span>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs" onClick={copy}>
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            {mounted && (
              <SyntaxHighlighter
                language="javascript"
                style={resolvedTheme === "dark" ? oneDark : oneLight}
                customStyle={{ margin: 0, fontSize: 13, borderRadius: 0, maxHeight: 560 }}
                wrapLongLines
              >
                {solution.solution}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-6">
        {prev ? (
          <Link
            href={`/library/${prev.slug}`}
            className="group flex flex-col gap-1 rounded-xl border bg-card p-4 text-sm transition-all hover:border-primary/40 hover:shadow-xs"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Previous problem
            </span>
            <span className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
              #{prev.id}. {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/library/${next.slug}`}
            className="group flex flex-col items-start sm:items-end gap-1 rounded-xl border bg-card p-4 text-sm transition-all hover:border-primary/40 hover:shadow-xs"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              Next problem
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
              #{next.id}. {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
