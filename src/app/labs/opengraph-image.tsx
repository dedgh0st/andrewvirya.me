import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgImageTemplate } from "@/components/og-image-template";

export const alt = "Security Labs | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgImageTemplate
      category="Security research"
      path="/labs"
      title="Security Labs"
      subtitle="Safe, isolated demonstrations of real-world techniques with practical defensive guidance."
    />,
    size,
  );
}
