import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgImageTemplate } from "@/components/og-image-template";

export const alt = "Schedule with me | andrewvirya.me";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgImageTemplate
      category="Let's connect"
      path="/schedule-with-me"
      title="Schedule with me"
      subtitle="Choose a time to plan a getaway, catch up, or have a date night."
    />,
    size,
  );
}
