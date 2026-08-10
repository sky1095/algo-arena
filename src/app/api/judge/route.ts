import { NextRequest, NextResponse } from "next/server";
import { judgeSolution } from "@/lib/judge/judge";
import { problemBySlug } from "@/lib/data/problems";
import { libraryProblemAsProblem } from "@/lib/data/library/judge";
import { languageById } from "@/lib/judge/languages";
import type { LanguageId } from "@/lib/types";

export const maxDuration = 60;

interface JudgeBody {
  slug: string;
  lang: string;
  code: string;
  mode: "run" | "submit";
}

export async function POST(req: NextRequest) {
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
    return NextResponse.json(outcome);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Judge failed" },
      { status: 500 }
    );
  }
}
