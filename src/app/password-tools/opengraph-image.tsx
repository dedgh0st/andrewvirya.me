import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgCard } from "@/components/og-card";

export const alt = "Password Security Suite | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      path="/password-tools"
      title="Password Security Suite"
      subtitle="Check password exposure and generate strong secrets locally in your browser."
    />,
    size,
  );
}
