import { notFound } from "next/navigation";
import {
  LIBRARY_PROBLEMS,
  libraryProblemBySlug,
  librarySolutionBySlug,
} from "@/lib/data/library";
import { libraryProblemAsProblem } from "@/lib/data/library/judge";
import { ProblemWorkspace } from "@/components/problem-workspace";
import { LibraryWorkspace } from "@/components/library-workspace";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LIBRARY_PROBLEMS.map((p) => ({ slug: p.slug }));
}

export default async function LibraryProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = libraryProblemBySlug(slug);
  const solution = librarySolutionBySlug(slug);
  if (!problem || !solution) notFound();

  // Judged problems get the full editor + judge experience (same as the 150).
  const judged = libraryProblemAsProblem(`lib-${slug}`);
  if (judged) {
    return <ProblemWorkspace problem={judged} />;
  }

  const index = LIBRARY_PROBLEMS.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? LIBRARY_PROBLEMS[index - 1] : undefined;
  const next = index >= 0 && index < LIBRARY_PROBLEMS.length - 1 ? LIBRARY_PROBLEMS[index + 1] : undefined;

  return <LibraryWorkspace problem={problem} solution={solution} prev={prev} next={next} />;
}
