import { NextResponse } from "next/server";
import { ALL_PROBLEMS } from "@/lib/data/problems";
import { judgeSolution } from "@/lib/judge/judge";
import type { LanguageId } from "@/lib/types";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

/** Dev/QA tool — runs the full judge suite. Never exposed in production. */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const url = new URL(req.url);
  const only = url.searchParams.get("lang") as LanguageId | null;
  const start = Number(url.searchParams.get("start") ?? 0);
  const end = Number(url.searchParams.get("end") ?? ALL_PROBLEMS.length);
  const problems = ALL_PROBLEMS.slice(start, end);
  const results: unknown[] = [];
  for (const p of problems) {
    const langs: LanguageId[] = only
      ? [only]
      : ["python", "javascript", "typescript"];
    const lang = langs.find((l) => p.editorial.code[l]);
    if (!lang) {
      results.push({ slug: p.slug, skipped: "no editorial" });
      continue;
    }
    try {
      const outcome = await judgeSolution({
        lang,
        code: p.editorial.code[lang]!,
        methodName: p.methodName,
        argTypes: p.argTypes,
        outputType: p.outputType,
        compare: p.compare,
        testCases: [...p.visibleTests, ...p.hiddenTests] as never,
        classSpec: p.classSpec,
      });
      results.push({
        slug: p.slug,
        lang,
        status: outcome.status,
        total: outcome.results.length,
        fails: outcome.results
          .filter((r) => !r.passed)
          .map((r) => ({ i: r.index, out: r.output, exp: r.expected, err: r.error })),
      });
    } catch (err) {
      results.push({ slug: p.slug, judgeError: err instanceof Error ? err.message : String(err) });
    }
  }
  const bad = results.filter((r: any) => r.status && r.status !== "Accepted");
  return NextResponse.json({ total: ALL_PROBLEMS.length, bad: bad.length, results });
}
