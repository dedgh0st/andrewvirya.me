import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import LabsHeader from "@/components/labs/labs-header";
import { LABS } from "@/data/labs";

export const metadata: Metadata = {
  title: "Security Labs | andrewvirya.me",
  description:
    "Benign security awareness simulations and defensive research labs.",
};

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-red-500/5 via-background to-rose-500/10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-16 sm:py-12">
        <LabsHeader />

        <aside
          aria-label="Labs safety disclaimer"
          className="border border-red-500/40 bg-red-500/10 p-4 text-sm leading-6"
        >
          <p className="font-mono font-semibold text-red-500">
            Educational simulations only
          </p>
          <p className="mt-1 text-muted-foreground">
            All labs are benign demonstrations for security awareness and
            defensive research. They contain no malicious payloads or
            remote-access behavior, and this site never executes commands on
            your device.
          </p>
        </aside>

        <section aria-labelledby="labs-title" className="grid gap-5">
          <div className="grid gap-2">
            <p className="font-mono text-xs uppercase tracking-widest text-red-500">
              / directory
            </p>
            <h1
              id="labs-title"
              className="font-heading text-3xl font-semibold tracking-tight"
            >
              Security Labs
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Explore safe, isolated demonstrations of techniques seen in the
              wild, alongside practical defensive guidance.
            </p>
          </div>

          <div className="grid gap-4">
            {LABS.map((lab) => (
              <Link
                key={`${lab.vulnSlug}/${lab.labSlug}`}
                href={`/labs/${lab.vulnSlug}/${lab.labSlug}`}
                aria-labelledby={`lab-title-${lab.vulnSlug}-${lab.labSlug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
              >
                <article className="grid gap-4 border border-border bg-background/70 p-5 transition-colors group-hover:border-red-500/60 group-hover:bg-background sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border border-red-500/40 px-2 py-1 font-mono text-xs text-red-500">
                      {lab.vulnSlug}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {lab.category}
                    </span>
                  </div>
                  <h2
                    id={`lab-title-${lab.vulnSlug}-${lab.labSlug}`}
                    className="font-heading text-xl font-semibold"
                  >
                    {lab.title}
                  </h2>
                  <div className="grid gap-3 text-sm leading-6 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        What is it
                      </h3>
                      <p className="mt-1">{lab.summary}</p>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        How it works
                      </h3>
                      <p className="mt-1">{lab.howItWorks[0]}</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 text-sm font-medium text-red-500 underline-offset-4 group-hover:underline">
                    Access Lab
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
