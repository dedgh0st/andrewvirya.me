import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LabsHeader from "@/components/labs/labs-header";
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

export default function LabBriefingPage({ params }: LabPageProps) {
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

        <Suspense fallback={<LabBriefingFallback />}>
          <LabBriefingContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function LabBriefingContent({ params }: LabPageProps) {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  if (!entry) {
    notFound();
  }

  const demoHref = `/labs/${entry.vulnSlug}/${entry.labSlug}/demo`;

  return (
    <article className="grid gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/labs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Back to Labs
        </Link>
        <Link
          href={demoHref}
          className="group flex min-h-20 w-full items-center justify-between gap-6 border border-red-500/40 bg-background/80 px-5 py-4 text-left transition-colors hover:border-red-500 hover:bg-red-500/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 sm:w-auto sm:min-w-64"
        >
          <span className="grid gap-1">
            <span className="font-heading text-base font-semibold text-red-500">
              Access Lab
            </span>
            <span className="text-sm text-muted-foreground">
              Open the safe simulation
            </span>
          </span>
          <ArrowRightIcon
            aria-hidden="true"
            className="size-5 shrink-0 text-red-500 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </div>

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
        <h2 id="how-it-works" className="font-heading text-xl font-semibold">
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

      <section aria-labelledby="references">
        <h2 id="references" className="font-heading text-xl font-semibold">
          Research References
        </h2>
        <ul className="mt-3 grid gap-2 text-sm leading-6">
          {entry.references.map((reference) => (
            <li key={reference.url}>
              <a
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                className="text-red-500 underline underline-offset-4 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
              >
                {reference.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function LabBriefingFallback() {
  return (
    <article
      aria-busy="true"
      className="grid gap-8"
      aria-label="Loading lab briefing"
      aria-live="polite"
    >
      <div className="grid gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          Loading lab briefing…
        </p>
        <div
          aria-hidden="true"
          className="h-9 w-3/4 animate-pulse bg-muted/70 motion-reduce:animate-none"
        />
        <div
          aria-hidden="true"
          className="h-16 w-full animate-pulse bg-muted/40 motion-reduce:animate-none"
        />
      </div>
      <div className="grid gap-3">
        <div
          aria-hidden="true"
          className="h-6 w-40 animate-pulse bg-muted/70 motion-reduce:animate-none"
        />
        <div
          aria-hidden="true"
          className="h-20 w-full animate-pulse bg-muted/40 motion-reduce:animate-none"
        />
      </div>
      <div className="grid gap-3">
        <div
          aria-hidden="true"
          className="h-6 w-48 animate-pulse bg-muted/70 motion-reduce:animate-none"
        />
        <div
          aria-hidden="true"
          className="h-20 w-full animate-pulse bg-muted/40 motion-reduce:animate-none"
        />
      </div>
    </article>
  );
}
