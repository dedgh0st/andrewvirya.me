import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgImageTemplate } from "@/components/og-image-template";

export const alt = "Password Security Suite | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgImageTemplate
      category="Privacy-first tools"
      path="/password-tools"
      title="Password Security Suite"
      subtitle="Check password exposure and generate strong secrets locally in your browser."
    />,
    size,
  );
}
