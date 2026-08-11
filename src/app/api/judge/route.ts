import { NextRequest, NextResponse } from "next/server";
import { judgeSolution } from "@/lib/judge/judge";
import { problemBySlug } from "@/lib/data/problems";
import { libraryProblemAsProblem } from "@/lib/data/library/judge";
import { languageById } from "@/lib/judge/languages";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";
import type { LanguageId } from "@/lib/types";

export const maxDuration = 60;

/** Reasonable cap — real solutions are a few KB; anything bigger is abuse. */
const MAX_CODE_BYTES = 50_000;

/** Per-IP submissions per minute (judge runs are CPU-heavy). */
const JUDGE_RATE_LIMIT = 30;

interface JudgeBody {
  slug: string;
  lang: string;
  code: string;
  mode: "run" | "submit";
}

export async function POST(req: NextRequest) {
  const rateHeaders = new Headers();
  if (checkRateLimit(req, JUDGE_RATE_LIMIT, { headers: rateHeaders }) === 0) {
    return rateLimited();
  }

  let body: JudgeBody;
  try {
    body = (await req.json()) as JudgeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const problem = problemBySlug(body.slug) ?? libraryProblemAsProblem(body.slug);
  if (!problem) return NextResponse.json({ error: "Unknown problem" }, { status: 404 });
  if (!languageById(body.lang)) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }
  if (problem.availableLangs && !problem.availableLangs.includes(body.lang as LanguageId)) {
    return NextResponse.json({ error: "Language not available for this problem" }, { status: 400 });
  }
  if (typeof body.code !== "string" || body.code.trim().length === 0) {
    return NextResponse.json({ error: "Empty code" }, { status: 400 });
  }
  if (body.code.length > MAX_CODE_BYTES) {
    return NextResponse.json({ error: "Code too large" }, { status: 413 });
  }

  const tests = body.mode === "submit" ? [...problem.visibleTests, ...problem.hiddenTests] : problem.visibleTests;

  try {
    const url = new URL(req.url);
    if (url.searchParams.get("dump") === "1") {
      const { buildSubmission } = await import("@/lib/judge/harness");
      const built = buildSubmission(
        body.lang as LanguageId,
        body.code,
        problem.methodName,
        problem.argTypes as never,
        tests as never,
        problem.outputType,
        problem.classSpec
      );
      return NextResponse.json({
        hasClassSpec: !!problem.classSpec,
        classSpec: problem.classSpec,
        files: built.files.map((f) => ({ name: f.name, content: f.content.slice(-1200) })),
      });
    }
    const outcome = await judgeSolution({
      lang: body.lang as LanguageId,
      code: body.code,
      methodName: problem.methodName,
      argTypes: problem.argTypes,
      outputType: problem.outputType,
      compare: problem.compare,
      testCases: tests as never,
      classSpec: problem.classSpec,
    });
    return NextResponse.json(outcome, { headers: rateHeaders });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Judge failed" },
      { status: 500 }
    );
  }
}
