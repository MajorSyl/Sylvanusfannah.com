import { ImageResponse } from "next/og";
import { site, type Locale } from "@/content";

export const ogSize = { width: 1200, height: 630 };

export function renderOgImage(locale: Locale) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #e6fbff 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(11,92,255,0.28) 0%, rgba(11,92,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: 200,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0b5cff, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            SF
          </div>
          <div style={{ fontSize: 26, color: "#334155", fontWeight: 600 }}>{site.domain}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#0b5cff", fontWeight: 600, marginBottom: 12 }}>{site.name}</div>
          <div style={{ fontSize: 88, color: "#0b1220", fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>
            {site.tagline[locale]}
          </div>
          <div style={{ fontSize: 30, color: "#5b6b82", marginTop: 24 }}>
            {locale === "es"
              ? "Automatización con IA · Apps web y móviles · Sistemas de negocio"
              : "AI automation · Web & mobile apps · Business systems"}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
