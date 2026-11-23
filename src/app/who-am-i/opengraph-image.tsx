import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgCard } from "@/components/og-card";

export const alt = "About Andrew Virya Victorio | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      path="/who-am-i"
      title="Andrew Virya Victorio"
      subtitle="Offensive security practitioner focused on web application security, penetration testing, and research."
    />,
    size,
  );
}
