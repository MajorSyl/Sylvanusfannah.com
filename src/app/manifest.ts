import type { MetadataRoute } from "next";
import { site } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Sylvanus",
    description: site.seoDescription.en,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8fb",
    theme_color: "#0b5cff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
