import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgImageTemplate } from "@/components/og-image-template";
import { getLab } from "@/data/labs";

export const alt = "Security Lab | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type LabImageProps = {
  params: Promise<{ vuln: string; lab: string }>;
};

export default async function Image({ params }: LabImageProps) {
  const { vuln, lab } = await params;
  const entry = getLab(vuln, lab);

  return new ImageResponse(
    <OgImageTemplate
      category={entry?.category ?? "Security research"}
      path={`/labs/${vuln}/${lab}`}
      title={entry?.title ?? "Security Lab"}
      subtitle={
        entry?.summary ??
        "Safe, isolated demonstrations with practical defensive guidance."
      }
    />,
    size,
  );
}
