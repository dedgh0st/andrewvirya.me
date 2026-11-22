import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClickFixDemo from "@/components/labs/clickfix-demo";
import { getLab, LABS } from "@/data/labs";

type DemoPageProps = {
  params: Promise<{ vuln: string; lab: string }>;
};

export function generateStaticParams() {
  return LABS.filter(
    (entry) =>
      entry.vulnSlug === "clickfix" && entry.labSlug === "captcha-verification",
  ).map(({ vulnSlug, labSlug }) => ({
    vuln: vulnSlug,
    lab: labSlug,
  }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  return {
    title: entry
      ? `${entry.title} Demo | Security Labs`
      : "Lab Demo | andrewvirya.me",
    robots: { index: false, follow: false },
  };
}

export default function LabDemoPage({ params }: DemoPageProps) {
  return (
    <Suspense fallback={<LabDemoFallback />}>
      <LabDemoContent params={params} />
    </Suspense>
  );
}

async function LabDemoContent({ params }: DemoPageProps) {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  if (
    !entry ||
    entry.vulnSlug !== "clickfix" ||
    entry.labSlug !== "captcha-verification"
  ) {
    notFound();
  }

  return (
    <ClickFixDemo
      briefingHref={`/labs/${entry.vulnSlug}/${entry.labSlug}`}
      references={entry.references}
    />
  );
}

function LabDemoFallback() {
  return (
    <main className="min-h-screen bg-white px-4 pb-28 pt-24 font-sans text-[#202124] sm:px-8">
      <div className="fixed inset-x-0 top-0 z-70 flex min-h-12 flex-wrap items-center gap-x-2 gap-y-1 border-b border-[#e5e5e5] bg-[#fff7ed] px-4 py-2 text-xs leading-5 text-[#713f12] shadow-sm sm:px-6">
        <strong className="font-semibold tracking-wide">
          EDUCATIONAL SIMULATION
        </strong>
        <span aria-hidden="true">—</span>
        <span>andrewvirya.me/labs</span>
        <span aria-hidden="true">|</span>
        <span>Benign Rickroll PoC (No Malicious Payload)</span>
        <span aria-hidden="true">|</span>
        <Link
          href="/labs"
          className="font-semibold underline underline-offset-2 hover:text-[#431407] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f38020]"
        >
          Back to Labs
        </Link>
      </div>

      <section
        aria-busy="true"
        aria-live="polite"
        className="mx-auto grid w-full max-w-3xl gap-8 pt-8 sm:pt-12"
      >
        <header className="grid gap-2">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            One more step
          </h1>
          <p className="text-lg text-[#3c4043]">
            Preparing the educational verification simulation…
          </p>
        </header>
        <div className="max-w-lg border border-[#d9d9d9] bg-[#f9f9f9] shadow-sm">
          <div className="flex min-h-16 items-center gap-4 px-4">
            <span
              aria-hidden="true"
              className="size-7 shrink-0 animate-pulse border border-[#b8b8b8] bg-white motion-reduce:animate-none"
            />
            <span className="text-sm">Loading simulation…</span>
          </div>
          <p className="border-t border-[#e5e5e5] px-4 py-3 text-sm leading-6 text-[#5f6368]">
            This page does not execute commands or establish remote access.
          </p>
        </div>
      </section>
    </main>
  );
}
