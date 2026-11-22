import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LabsHeader from "@/components/labs/labs-header";
import { Button } from "@/components/ui/button";
import { getLab, LABS } from "@/data/labs";

type LabPageProps = {
  params: Promise<{ vuln: string; lab: string }>;
};

export function generateStaticParams() {
  return LABS.map(({ vulnSlug, labSlug }) => ({
    vuln: vulnSlug,
    lab: labSlug,
  }));
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  if (!entry) {
    return { title: "Lab Not Found | andrewvirya.me" };
  }

  return {
    title: `${entry.title} | Security Labs`,
    description: entry.summary,
  };
}

export default async function LabBriefingPage({ params }: LabPageProps) {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  if (!entry) {
    notFound();
  }

  const demoHref = `/labs/${entry.vulnSlug}/${entry.labSlug}/demo`;

  return (
    <main className="min-h-screen bg-linear-to-br from-red-500/5 via-background to-rose-500/10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-16 sm:py-12">
        <LabsHeader />

        <aside
          aria-label="Lab safety disclaimer"
          className="border border-red-500/40 bg-red-500/10 p-4 text-sm leading-6"
        >
          <p className="font-mono font-semibold text-red-500">
            Safe scope boundary
          </p>
          <p className="mt-1 text-muted-foreground">
            This is a benign educational simulation for security awareness and
            defensive research. The site does not execute commands or establish
            remote access.
          </p>
        </aside>

        <article className="grid gap-8">
          <header className="grid gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-red-500">
              {entry.vulnSlug} / {entry.category}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              {entry.title}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              {entry.summary}
            </p>
          </header>

          <section aria-labelledby="how-it-works">
            <h2
              id="how-it-works"
              className="font-heading text-xl font-semibold"
            >
              How It Works
            </h2>
            <ol className="mt-3 grid list-inside list-decimal gap-2 text-sm leading-6 text-muted-foreground">
              {entry.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="mitigation">
            <h2 id="mitigation" className="font-heading text-xl font-semibold">
              Defensive Mitigation
            </h2>
            <ul className="mt-3 grid list-inside list-disc gap-2 text-sm leading-6 text-muted-foreground">
              {entry.mitigation.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={demoHref}>
                Access Lab
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-4" />
              Back to Labs
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
