import { notFound } from "next/navigation";
import { ALL_PROBLEMS, problemBySlug } from "@/lib/data/problems";
import { ProblemWorkspace } from "@/components/problem-workspace";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ALL_PROBLEMS.map((p) => ({ slug: p.slug }));
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = problemBySlug(slug);
  if (!problem) notFound();

  return <ProblemWorkspace problem={problem} />;
}
