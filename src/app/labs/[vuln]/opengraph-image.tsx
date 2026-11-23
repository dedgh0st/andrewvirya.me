import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgCard } from "@/components/og-card";
import { LABS } from "@/data/labs";

export const alt = "Vulnerability category | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type VulnerabilityImageProps = {
  params: Promise<{ vuln: string }>;
};

export function generateStaticParams() {
  return Array.from(new Set(LABS.map(({ vulnSlug }) => vulnSlug))).map(
    (vuln) => ({ vuln }),
  );
}

export default async function Image({ params }: VulnerabilityImageProps) {
  const { vuln } = await params;
  const entries = LABS.filter((entry) => entry.vulnSlug === vuln);
  const vulnerabilityTitle =
    entries[0]?.title.split(":")[0] ??
    vuln
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return new ImageResponse(
    <OgCard
      path={`/labs/${vuln}`}
      title={`${vulnerabilityTitle} Labs`}
      subtitle={
        entries[0]?.summary ??
        "Safe, isolated demonstrations with practical defensive guidance."
      }
    />,
    size,
  );
}
