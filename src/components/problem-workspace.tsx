"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Editor, { loader, type OnMount } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Code2,
  Loader2,
  LockKeyhole,
  Play,
  Send,
  TerminalSquare,
  WandSparkles,
  XCircle,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_LIST, languageById } from "@/lib/judge/languages";
import { formatCode } from "@/lib/format-code";
import { CATEGORIES } from "@/lib/data/categories";
import { useProgress } from "@/lib/progress";
import { difficultyColor, formatRuntime, formatValue } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  ClassExample,
  Example,
  JudgeOutcome,
  LanguageId,
  Problem,
  Submission,
} from "@/lib/types";

// Serve monaco locally (public/vs) so the editor works fully offline.
loader.config({ paths: { vs: "/vs" } });

const CODE_KEY = (slug: string) => `algo-arena:code:${slug}`;

interface Props {
  problem: Problem;
}

export function ProblemWorkspace({ problem }: Props) {
  const { resolvedTheme } = useTheme();
  const { statusOf, recordRun, recordSubmission, submissions } = useProgress();
  const category = CATEGORIES.find((c) => c.id === problem.category);

  const [lang, setLang] = useState<LanguageId>("python");
  const [codeByLang, setCodeByLang] = useState<Partial<Record<LanguageId, string>>>({});
  const [codeHydrated, setCodeHydrated] = useState(false);
  const [tab, setTab] = useState("description");
  const [running, setRunning] = useState<"run" | "submit" | null>(null);
  const [outcome, setOutcome] = useState<JudgeOutcome | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [formatting, setFormatting] = useState(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const actionsRef = useRef<{ judge: (mode: "run" | "submit") => Promise<void>; format: () => Promise<void> } | null>(null);

  const code = codeByLang[lang] ?? problem.starter[lang] ?? (languageById(lang)?.defaultTemplate(problem.methodName, problem.argTypes) ?? '');

  // Persist edits per problem + language (never clobber saved code with the empty initial state).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CODE_KEY(problem.slug));
      if (raw) setCodeByLang(JSON.parse(raw));
    } catch {
      // ignore
    } finally {
      setCodeHydrated(true);
    }
  }, [problem.slug]);

  useEffect(() => {
    if (!codeHydrated) return;
    try {
      localStorage.setItem(CODE_KEY(problem.slug), JSON.stringify(codeByLang));
    } catch {
      // ignore
    }
  }, [problem.slug, codeByLang, codeHydrated]);

  const setCode = (value: string | undefined) => {
    if (value === undefined) return;
    setCodeByLang((prev) => ({ ...prev, [lang]: value }));
  };

  const resetCode = () => {
    setCodeByLang((prev) => ({ ...prev, [lang]: problem.starter[lang] ?? languageById(lang)?.defaultTemplate(problem.methodName, problem.argTypes) ?? '' }));
  };

  const formatCodeInEditor = async () => {
    const editor = editorRef.current;
    if (!editor || formatting || running) return;
    const model = editor.getModel();
    if (!model) return;
    const current = model.getValue();
    if (!current.trim()) return;

    setFormatting(true);
    try {
      if (lang === "javascript" || lang === "typescript") {
        // Monaco ships a built-in JS/TS formatter — run it directly so undo works.
        const action = editor.getAction("editor.action.formatDocument");
        if (action) {
          await action.run();
          toast.success("Code formatted");
          return;
        }
      }
      const formatted = await formatCode(lang, current);
      if (formatted !== current) {
        editor.executeEdits("format", [{ range: model.getFullModelRange(), text: formatted }]);
      }
      toast.success("Code formatted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not format code");
    } finally {
      setFormatting(false);
    }
  };

  const judge = async (mode: "run" | "submit") => {
    if (running) return;
    setRunning(mode);
    setApiError(null);
    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: problem.slug, lang, code, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOutcome(null);
        setApiError(data.error ?? `Request failed (${res.status})`);
        return;
      }
      setOutcome(data as JudgeOutcome);
      if (mode === "run") {
        // Any completed run counts as an attempt (unlocks the editorial).
        recordRun(problem.slug);
        if (data.status === "Accepted") {
          toast.success("All sample tests passed");
        } else {
          toast.error(data.status);
        }
      } else {
        const sub: Submission = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          slug: problem.slug,
          language: lang,
          code,
          status: data.status,
          runtimeMs: data.runtimeMs,
          createdAt: Date.now(),
          testResults: data.results,
        };
        recordSubmission(sub);
        if (data.status === "Accepted") {
          toast.success(`Accepted — ${formatRuntime(data.runtimeMs)}`);
        } else {
          toast.error(data.status);
        }
        setTab("submissions");
      }
    } catch {
      setApiError("Could not reach the judge. Is the dev server running?");
    } finally {
      setRunning(null);
    }
  };

  // Keep the keyboard-shortcut handlers pointed at the latest render's closures
  // (lang/code/running change per render, but the editor mounts only once).
  useEffect(() => {
    actionsRef.current = { judge, format: formatCodeInEditor };
  });

  const mySubmissions = useMemo(
    () => submissions.filter((s) => s.slug === problem.slug),
    [submissions, problem.slug]
  );

  const status = statusOf(problem.slug);
  // Keep the editorial hidden until the student has actually attempted the problem.
  const solutionsLocked = status === null;
  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "light";
  const langs = useMemo(
    () =>
      problem.availableLangs
        ? problem.availableLangs.map((id) => languageById(id)).filter((l): l is NonNullable<typeof l> => !!l)
        : LANGUAGE_LIST,
    [problem.availableLangs]
  );

  return (
    <main className="flex min-h-[calc(100dvh-3.5rem)] lg:h-[calc(100vh-3.5rem)] flex-col lg:overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex w-full items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 overflow-x-auto text-xs sm:text-sm">
          <Link
            href={problem.isLibrary ? "/library" : "/problems"}
            className={buttonVariants({ variant: "ghost", size: "sm", className: "h-7 px-2 text-xs" })}
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> {problem.isLibrary ? "Library" : "Problems"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          {problem.isLibrary ? (
            <span className="text-xs text-muted-foreground shrink-0">Archive</span>
          ) : (
            <Link
              href={`/roadmap#${problem.category}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category?.color }} />
              {category?.name}
            </Link>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <h1 className="font-semibold truncate text-xs sm:text-sm text-foreground max-w-[200px] sm:max-w-[320px] md:max-w-none">{problem.title}</h1>
          <Badge variant="secondary" className={cn("px-1.5 py-0 text-[10px] sm:text-xs shrink-0", difficultyColor(problem.difficulty))}>
            {problem.difficulty}
          </Badge>
          {status === "solved" && (
            <Badge variant="outline" className="gap-1 border-green-500/40 text-green-600 dark:text-green-400 px-1.5 py-0 text-[10px] sm:text-xs shrink-0">
              <CheckCircle2 className="h-3 w-3" /> Solved
            </Badge>
          )}
        </div>
      </div>

      <div className="grid w-full flex-1 min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
        {/* Left: description / solutions / submissions */}
        <div className="flex min-h-[380px] lg:min-h-0 flex-col border-b lg:border-b-0 lg:border-r bg-card/20">
          <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
            <TabsList className="mx-3 sm:mx-4 mt-2.5 sm:mt-3 w-fit">
              <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
              <TabsTrigger value="solutions" className="text-xs sm:text-sm">
                Solutions
                {solutionsLocked && <LockKeyhole className="ml-1.5 h-3 w-3 text-muted-foreground" />}
              </TabsTrigger>
              <TabsTrigger value="submissions" className="text-xs sm:text-sm">
                Submissions
                {mySubmissions.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] tabular-nums">
                    {mySubmissions.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="min-h-0 flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4">
              <DescriptionTab problem={problem} />
            </TabsContent>
            <TabsContent value="solutions" className="min-h-0 flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4">
              {solutionsLocked ? (
                <SolutionsLocked onBack={() => setTab("description")} />
              ) : (
                <SolutionsTab problem={problem} theme={resolvedTheme === "dark" ? "dark" : "light"} />
              )}
            </TabsContent>
            <TabsContent value="submissions" className="min-h-0 flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4">
              <SubmissionsTab submissions={mySubmissions} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: editor + console */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b bg-card px-3 sm:px-4 py-2">
            <Select value={lang} onValueChange={(v) => setLang((v ?? "python") as LanguageId)}>
              <SelectTrigger className="h-8 w-32 sm:w-36 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {langs.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" className="ml-auto h-8 px-2 sm:px-3 text-xs" onClick={resetCode}>
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 sm:px-3 text-xs"
              disabled={formatting || running !== null}
              onClick={(e) => {
                e.currentTarget.blur();
                formatCodeInEditor();
              }}
              title={`Format ${languageById(lang)?.label ?? "code"} (Shift+Cmd/Ctrl+F)`}
            >
              {formatting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <WandSparkles className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">Format</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-2.5 sm:px-3 text-xs shadow-xs"
              disabled={running !== null}
              onClick={(e) => {
                e.currentTarget.blur();
                judge("run");
              }}
              title="Run (Ctrl/Cmd + Enter)"
            >
              {running === "run" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              <span>Run</span>
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-8 px-2.5 sm:px-3 text-xs shadow-xs"
              disabled={running !== null}
              onClick={(e) => {
                e.currentTarget.blur();
                judge("submit");
              }}
            >
              {running === "submit" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>Submit</span>
            </Button>
            {!consoleOpen && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 sm:px-3 text-xs gap-1.5"
                onClick={() => setConsoleOpen(true)}
              >
                <TerminalSquare className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Console</span>
                {(running || outcome || apiError) && (
                  <span className={`h-1.5 w-1.5 rounded-full ${outcome?.status === "Accepted" ? "bg-green-500" : outcome ? "bg-red-500" : running ? "bg-amber-500" : "bg-transparent"}`} />
                )}
              </Button>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
            <div className="min-h-[320px] min-w-0 flex-1 flex flex-col">
              <Editor
                height="100%"
                language={languageById(lang)?.monaco}
                value={code}
                onChange={setCode}
                onMount={(editor, monaco) => {
                  editorRef.current = editor;
                  // Run: Ctrl/Cmd+Enter · Format: Shift+Cmd/Ctrl+F (dynamic bindings win over Monaco defaults).
                  editor.addAction({
                    id: "run-code",
                    label: "Run Code",
                    keybindings: [
                      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                    ],
                    run: () => {
                      void actionsRef.current?.judge("run");
                    },
                  });
                  editor.addAction({
                    id: "format-code",
                    label: "Format Code",
                    keybindings: [
                      monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
                      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
                    ],
                    run: () => {
                      void actionsRef.current?.format();
                    },
                  });
                }}
                theme={editorTheme}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 4,
                  automaticLayout: true,
                  padding: { top: 12 },
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              />
            </div>

            {consoleOpen && (
              <ConsolePanel
                running={running}
                outcome={outcome}
                apiError={apiError}
                visibleCount={problem.visibleTests.length}
                totalCount={problem.visibleTests.length + problem.hiddenTests.length}
                onClose={() => setConsoleOpen(false)}
              />
            )}
          </div>
          {!consoleOpen && (running || outcome || apiError) && (
            <button
              onClick={() => setConsoleOpen(true)}
              className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs sm:text-sm shadow-lg hover:bg-accent xl:hidden"
            >
              <TerminalSquare className="h-4 w-4" />
              Console
              {outcome && !running && (
                <span className={`h-2 w-2 rounded-full ${outcome.status === "Accepted" ? "bg-green-500" : "bg-red-500"}`} />
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* ------------------------------ Description ------------------------------ */

function DescriptionTab({ problem }: { problem: Problem }) {
  return (
    <div className="max-w-none space-y-6">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{problem.description}</ReactMarkdown>
      </div>

      <div className="space-y-4">
        {problem.examples.map((ex, i) => (
          <ExampleCard key={i} example={ex} index={i} />
        ))}
      </div>

      <div>
        <h3 className="text-base font-semibold">Constraints</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {problem.constraints.map((c, i) => (
            <li key={i}>
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
                {c}
              </code>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {problem.topics.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ExampleCard({ example, index }: { example: Example | ClassExample; index: number }) {
  const isClass = "ops" in example;
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="font-mono text-sm font-semibold">Example {index + 1}</div>
      {isClass ? (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-xs text-muted-foreground">
                <th className="pr-3 pb-1">Operation</th>
                <th className="pr-3 pb-1">Input</th>
                <th className="pb-1">Return</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {example.ops.map((op, j) => (
                <tr key={j} className="align-top">
                  <td className="pr-3 py-0.5">{op}</td>
                  <td className="pr-3 py-0.5 text-muted-foreground">
                    {formatValue(example.args[j])}
                  </td>
                  <td className="py-0.5 text-muted-foreground">
                    {formatValue(example.output[j])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-2 space-y-1 font-mono text-sm">
          <div>
            <span className="text-muted-foreground">Input: </span>
            {example.args.map((a, j) => (
              <span key={j}>
                {j > 0 && <span className="text-muted-foreground">, </span>}
                {formatValue(a)}
              </span>
            ))}
          </div>
          <div>
            <span className="text-muted-foreground">Output: </span>
            <span>{formatValue(example.output)}</span>
          </div>
        </div>
      )}
      {example.explain && (
        <p className="mt-2 text-sm text-muted-foreground">{example.explain}</p>
      )}
    </div>
  );
}

/* ------------------------------- Solutions ------------------------------- */

function SolutionsLocked({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <LockKeyhole className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-base font-semibold">Solutions are locked</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          Give it a shot first — press <span className="font-medium">Run</span> or{" "}
          <span className="font-medium">Submit</span> to unlock the approach and reference solution.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onBack}>
        Back to description
      </Button>
    </div>
  );
}

function SolutionsTab({ problem, theme }: { problem: Problem; theme: "dark" | "light" }) {
  const available = LANGUAGE_LIST.filter((l) => problem.editorial.code[l.id]);
  const [solLang, setSolLang] = useState<LanguageId | null>(null);
  const effectiveLang = solLang && problem.editorial.code[solLang] ? solLang : (available[0]?.id ?? "python");
  const code = problem.editorial.code[effectiveLang];
  const style = theme === "dark" ? oneDark : oneLight;

  return (
    <div className="max-w-none space-y-6">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{problem.editorial.approach}</ReactMarkdown>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-lg border px-3 py-2">
          <div className="text-xs text-muted-foreground">Time complexity</div>
          <div className="font-mono text-sm font-medium">{problem.editorial.complexity.time}</div>
        </div>
        <div className="rounded-lg border px-3 py-2">
          <div className="text-xs text-muted-foreground">Space complexity</div>
          <div className="font-mono text-sm font-medium">{problem.editorial.complexity.space}</div>
        </div>
      </div>

      {code !== undefined && (
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-1">
              {available.map((l) => (
                <Button
                  key={l.id}
                  variant={effectiveLang === l.id ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setSolLang(l.id)}
                >
                  {l.label}
                </Button>
              ))}
            </div>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <SyntaxHighlighter
            language={monacoLangFor(effectiveLang)}
            style={style}
            customStyle={{ margin: 0, fontSize: 13, borderRadius: 0 }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

function monacoLangFor(lang: LanguageId): string {
  switch (lang) {
    case "python":
      return "python";
    case "javascript":
      return "javascript";
    case "typescript":
      return "typescript";
    case "java":
      return "java";
    case "cpp":
      return "cpp";
    case "dart":
      return "dart";
  }
}

/* ------------------------------ Submissions ------------------------------ */

const STATUS_STYLES: Record<Submission["status"], string> = {
  Accepted: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  "Wrong Answer": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  "Runtime Error": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  "Time Limit Exceeded": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  "Compile Error": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
};

function SubmissionsTab({ submissions }: { submissions: Submission[] }) {
  if (submissions.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No submissions yet. Write a solution and hit <span className="font-medium">Submit</span>.
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {submissions.map((s) => (
        <div
          key={s.id}
          className="flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm"
        >
          <Badge variant="secondary" className={STATUS_STYLES[s.status]}>
            {s.status}
          </Badge>
          <span className="text-muted-foreground">{languageById(s.language)?.label}</span>
          {s.status === "Accepted" && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Zap className="h-3.5 w-3.5" />
              {formatRuntime(s.runtimeMs)}
            </span>
          )}
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {new Date(s.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Console -------------------------------- */

function ConsolePanel({
  running,
  outcome,
  apiError,
  visibleCount,
  totalCount,
  onClose,
}: {
  running: "run" | "submit" | null;
  outcome: JudgeOutcome | null;
  apiError: string | null;
  visibleCount: number;
  totalCount: number;
  onClose: () => void;
}) {
  return (
    <div className="flex h-[240px] sm:h-[280px] min-h-0 flex-col border-t bg-card xl:h-full xl:w-[340px] 2xl:w-[380px] xl:min-w-[300px] xl:border-l xl:border-t-0 shadow-xs">
      <div className="flex items-center gap-2 border-b bg-muted/20 px-3.5 sm:px-4 py-2">
        <span className="text-xs sm:text-sm font-semibold">Console</span>
        {running && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            Running {running === "submit" ? `${totalCount} tests` : `${visibleCount} tests`}…
          </span>
        )}
        {outcome && !running && <OutcomeBadge outcome={outcome} />}
        <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground cursor-pointer" title="Close console">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto px-4 py-3">
        {apiError && (
          <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="font-mono whitespace-pre-wrap">{apiError}</span>
          </div>
        )}
        {!apiError && running && (
          <p className="text-sm text-muted-foreground">Compiling and running your code…</p>
        )}
        {!apiError && !running && !outcome && (
          <p className="text-sm text-muted-foreground">
            Press <span className="font-medium">Run</span> to test against sample cases, or{" "}
            <span className="font-medium">Submit</span> to run against all tests.
          </p>
        )}
        {!apiError && !running && outcome && <OutcomeDetails outcome={outcome} />}
      </div>
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: JudgeOutcome }) {
  const ok = outcome.status === "Accepted";
  const cls = ok
    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
  return (
    <span className="flex items-center gap-2 text-xs">
      <Badge variant="secondary" className={cls}>
        {ok ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
        {outcome.status}
      </Badge>
      <span className="text-muted-foreground">{formatRuntime(outcome.runtimeMs)}</span>
      {outcome.compileMs > 0 && (
        <span className="text-muted-foreground">compile {formatRuntime(outcome.compileMs)}</span>
      )}
    </span>
  );
}

function OutcomeDetails({ outcome }: { outcome: JudgeOutcome }) {
  if (outcome.status === "Accepted") {
    const count = outcome.results.length;
    return (
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          All {count} test{count === 1 ? "" : "s"} passed!
        </p>
        {outcome.userStdout && <StdoutBlock stdout={outcome.userStdout} />}
      </div>
    );
  }

  const failed = outcome.results.filter((r) => !r.passed);
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        {failed.length} of {outcome.results.length} test{outcome.results.length === 1 ? "" : "s"} failed:
      </p>
      {failed.map((r) => (
        <div key={r.index} className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <XCircle className="h-3.5 w-3.5 text-red-500" />
            Test #{r.index + 1}
            {r.timedOut && <Badge variant="secondary">Time limit exceeded</Badge>}
          </div>
          {r.error ? (
            <pre className="mt-1 max-h-40 overflow-auto font-mono text-xs whitespace-pre-wrap text-red-600 dark:text-red-400">
              {r.error}
            </pre>
          ) : (
            <div className="mt-1 space-y-1 font-mono text-xs">
              <div>
                <span className="text-muted-foreground">Output: </span>
                <span className="break-all">{formatValue(r.output)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Expected: </span>
                <span className="break-all">{formatValue(r.expected)}</span>
              </div>
            </div>
          )}
        </div>
      ))}
      {outcome.userStdout && <StdoutBlock stdout={outcome.userStdout} />}
    </div>
  );
}

function StdoutBlock({ stdout }: { stdout: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">Your stdout</div>
      <pre className="mt-1 max-h-32 overflow-auto rounded-lg bg-muted/50 p-2 font-mono text-xs whitespace-pre-wrap">
        {stdout}
      </pre>
    </div>
  );
}
