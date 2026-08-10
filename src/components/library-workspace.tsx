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
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Library
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono text-sm tabular-nums ${difficultyTextColor(problem.difficulty)}`}>
              {problem.id}.
            </span>
            <h1 className="text-3xl font-bold tracking-tight">{problem.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className={difficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{solution.description}</ReactMarkdown>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5 rounded-lg border border-dashed bg-muted/40 px-3.5 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Why is this view-only?</span>{" "}
              The auto-judge can only build test cases from plain values (numbers, strings,
              arrays), so linked-list and tree problems can&apos;t be auto-tested here. View the
              reference solution below.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
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

      <div className="mt-10 flex items-center justify-between gap-4 border-t pt-6">
        {prev ? (
          <Link
            href={`/library/${prev.slug}`}
            className="group flex min-w-0 flex-col gap-0.5 text-sm transition-colors hover:text-foreground"
          >
            <span className="text-xs text-muted-foreground">
              <ArrowLeft className="mr-1 inline h-3 w-3" />
              Previous
            </span>
            <span className="truncate font-medium text-muted-foreground group-hover:text-foreground">
              {prev.id}. {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/library/${next.slug}`}
            className="group flex min-w-0 flex-col items-end gap-0.5 text-sm transition-colors hover:text-foreground"
          >
            <span className="text-xs text-muted-foreground">
              Next
              <ArrowRight className="ml-1 inline h-3 w-3" />
            </span>
            <span className="truncate font-medium text-muted-foreground group-hover:text-foreground">
              {next.id}. {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
