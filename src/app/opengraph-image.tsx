import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgCard } from "@/components/og-card";

export const alt = "Andrew Virya Victorio | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      path="/"
      title="Andrew Virya Victorio"
      subtitle="Offensive security practitioner, penetration tester, and cybersecurity researcher."
    />,
    size,
  );
}
