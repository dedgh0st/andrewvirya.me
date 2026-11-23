import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgImageTemplate } from "@/components/og-image-template";

export const alt = "About Andrew Virya Victorio | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgImageTemplate
      category="About me / WHOAMI"
      path="/who-am-i"
      title="Andrew Virya Victorio"
      subtitle="Offensive security practitioner focused on web application security, penetration testing, and research."
    />,
    size,
  );
}
