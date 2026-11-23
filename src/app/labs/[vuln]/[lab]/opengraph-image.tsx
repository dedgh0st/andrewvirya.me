import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgCard } from "@/components/og-card";
import { getLab, LABS } from "@/data/labs";

export const alt = "Security Lab | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type LabImageProps = {
  params: Promise<{ vuln: string; lab: string }>;
};

export function generateStaticParams() {
  return LABS.map(({ vulnSlug, labSlug }) => ({
    vuln: vulnSlug,
    lab: labSlug,
  }));
}

export default async function Image({ params }: LabImageProps) {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  if (!entry) {
    notFound();
  }

  return new ImageResponse(
    <OgCard
      path={`/labs/${vuln}/${lab}`}
      title={entry.title}
      subtitle={entry.summary}
    />,
    size,
  );
}
