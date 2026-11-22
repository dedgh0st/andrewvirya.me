import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function LabDemoPage({ params }: DemoPageProps) {
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
    <ClickFixDemo briefingHref={`/labs/${entry.vulnSlug}/${entry.labSlug}`} />
  );
}
