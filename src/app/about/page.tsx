import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About the Company",
  description:
    `Who ${SITE.shortName} is, why it was founded, and exactly what the company does and does not do.`,
};

const VALUES = [
  ["Patient safety first", "Where a commercial decision and a safety decision conflict, the safety decision is not negotiable."],
  ["Documented, not asserted", "If a claim cannot be produced on paper when asked, we do not make it."],
  ["Regulatory literacy", "Indian pharmaceutical law is a design constraint on how we work, not a compliance chore at the end."],
  ["Honest scope", "We describe what we do and name what we do not do. We do not manufacture, and we say so on every page."],
  ["Supply as a duty", "A stockout in a chronic therapy is a clinical event, not an inventory error."],
  ["Partnership over transaction", "Manufacturers and distributors are held to standards and treated as long-term counterparties."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About USB"
        title="Designed to be checked, not admired"
        sub={`Who ${SITE.shortName} is, why it was founded, and exactly what the company does and does not do.`}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 72px)", alignItems: "start" }}>
            <p className="lead" data-reveal>
              {SITE.name} was incorporated in India as a
              pharmaceutical marketing company. The name expands to {SITE.tagline}.
            </p>
            <div data-reveal>
              <p className="prose">
                The company was founded by professionals who had each spent
                years inside the Indian pharmaceutical trade — in formulation
                selection, quality assurance, regulatory documentation,
                distribution and field marketing — and who kept meeting the same
                failure. A product would reach the market with a good molecule
                behind it and no discipline around it: no traceable vendor
                qualification, no retained batch documentation, no forecast, and
                no one accountable when supply stopped.
              </p>
              <p className="prose">
                USB was founded to operate the other way round. We start from the
                documentation and work outward. Before a product is commissioned,
                the manufacturing partner&rsquo;s licence is verified, the
                specification is agreed in writing, and the release process is
                defined. Nothing goes to trade on trust alone.
              </p>
              <p className="prose">
                We are early. The portfolio is being assembled, the manufacturing
                partnerships are being qualified, and the certifications that will
                eventually sit on this site have not been issued. We would rather
                state that plainly to a partner than pad the page.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="shell">
          <div className="grid grid--2" style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
            <div className="card card--lift" data-reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>
                Vision
              </p>
              <p className="display display--s" style={{ color: "var(--ink)", margin: 0, textTransform: "none", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                To make well-documented, dependably supplied medicine the ordinary
                standard rather than the exception.
              </p>
            </div>
            <div className="card card--lift" data-reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>
                Mission
              </p>
              <p className="display display--s" style={{ color: "var(--ink)", margin: 0, textTransform: "none", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                To select the right formulations, qualify the right manufacturers,
                and keep the channel supplied without surprises.
              </p>
            </div>
          </div>

          <p className="eyebrow" data-reveal>
            Six values
          </p>
          <h2
            className="display display--l"
            style={{ margin: "clamp(20px, 2.4vw, 32px) 0 clamp(32px, 4vw, 52px)", maxWidth: "16ch" }}
            data-reveal
          >
            How we work
          </h2>

          <div className="grid grid--3">
            {VALUES.map(([title, body], i) => (
              <article className="card card--lift" key={title} data-reveal>
                <span className="card__n">V{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section section--white">
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "start" }}>
            <div data-reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>
                Business model
              </p>
              <p className="display display--s" style={{ color: "var(--ink)", textTransform: "none", letterSpacing: "-0.03em", lineHeight: 1.24, margin: "0 0 20px" }}>
                Pharmaceutical marketing plus third-party and contract
                manufacturing coordination.
              </p>
              <p className="prose" style={{ maxWidth: "52ch" }}>
                USB holds the brand and the commercial relationship. Licensed
                manufacturing partners hold the plant and the manufacturing
                licence. Both roles are named on every product record.
              </p>
            </div>

            <div data-reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>
                Markets
              </p>
              <dl style={{ margin: 0 }}>
                {[
                  ["Primary", "India — domestic trade"],
                  ["Channel", "Distributors · stockists · retail"],
                  ["States", "[STATE LIST — TBC]"],
                  ["Export", "Planned — not yet active"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "16px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <dt className="data dim" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      {k}
                    </dt>
                    <dd className="data" style={{ margin: 0, textAlign: "right", color: v.startsWith("[") ? "var(--copper)" : "var(--ink)" }}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
