import { NextRequest, NextResponse } from "next/server";
import { executeSubmission } from "@/lib/judge/runner";
import { buildSubmission } from "@/lib/judge/harness";
import { problemBySlug } from "@/lib/data/problems";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "two-sum";
  const lang = (url.searchParams.get("lang") ?? "python") as never;
  const problem = problemBySlug(slug)!;
  const code = url.searchParams.get("code") ?? problem.starter[lang as keyof typeof problem.starter] ?? "";
  const tests = [...problem.visibleTests, ...problem.hiddenTests];
  const built = buildSubmission(
    lang,
    code,
    problem.methodName,
    problem.argTypes as never,
    tests as never,
    problem.outputType,
    problem.classSpec
  );
  const files = built.files.map((f) => ({ name: f.name, content: f.content.slice(-2200) }));
  return NextResponse.json({ files, compile: built.compile, run: built.run, stdin: (built.stdin ?? "").slice(0, 800) });
}
