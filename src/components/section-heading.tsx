import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">
        <span className="h-px w-6 bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="heading-lg mt-4">{heading}</h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p> : null}
    </Reveal>
  );
}
