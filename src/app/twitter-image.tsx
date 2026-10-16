import { site } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = site.seoTitle.en;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
