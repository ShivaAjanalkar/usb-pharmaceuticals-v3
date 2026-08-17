import Reveal from "@/components/Reveal";

export default function PageHero({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: string;
  sub?: string;
}) {
  return (
    <section
      style={{
        paddingTop: "clamp(118px, 15vh, 168px)",
        paddingBottom: "clamp(32px, 4vw, 56px)",
      }}
    >
      <Reveal className="shell">
        <p className="eyebrow" data-reveal>
          {tag}
        </p>
        <h1
          className="display display--l"
          style={{ margin: "clamp(16px, 2vw, 26px) 0 0", maxWidth: "20ch" }}
          data-reveal
        >
          {title}
        </h1>
        {sub && (
          <p className="lead" style={{ marginTop: 22, maxWidth: "56ch" }} data-reveal>
            {sub}
          </p>
        )}
      </Reveal>
    </section>
  );
}
