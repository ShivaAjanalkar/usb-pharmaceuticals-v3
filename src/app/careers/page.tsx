import { Arrow } from "@/components/SiteNav";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    `${SITE.shortName} recruits slowly and describes roles honestly. No positions are open today.`,
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        tag="Careers"
        title="We recruit slowly and describe roles honestly"
        sub="No positions are open today. That is a fact about the company, not a gap in this page."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "start" }}>
            <div data-reveal>
              <p className="lead" style={{ marginBottom: 24 }}>
                A small team cannot build a pharmaceutical company alone. We are hiring
                for judgement, not headcount.
              </p>
              <p className="prose">
                The people who do well here are comfortable with documentation,
                uncomfortable with vague claims, and willing to say when something
                is not ready. In a company this young, every hire changes how the
                company works — so we recruit slowly and describe the role
                honestly.
              </p>
              <p className="prose">
                Expected functions as we grow: quality assurance and regulatory
                affairs, supply chain and planning, field sales and area
                management, medical and product management, finance and
                compliance.
              </p>
            </div>

            <div className="card" data-reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>
                Apply
              </p>
              <p style={{ margin: "0 0 24px", fontSize: 16.5, lineHeight: 1.65 }}>
                Send a CV and a short note on the function you want to own.
                Speculative applications are read.
              </p>
              <a href={`mailto:${SITE.email}`} className="btn btn--copper" style={{ wordBreak: "break-all" }}>
                {SITE.email} <Arrow />
              </a>
              <p className="data dim" style={{ marginTop: 26, paddingTop: 20, borderTop: "1px solid var(--line)", fontSize: 11, lineHeight: 1.8 }}>
                Office location · {SITE.postalAddress.addressLocality}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section section--white">
        <Reveal className="shell">
          <h2 className="display display--m" style={{ marginBottom: "clamp(28px, 3vw, 44px)" }} data-reveal>
            Current openings
          </h2>
          <div
            className="card"
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(24px, 3vw, 48px)",
              alignItems: "center",
              padding: "clamp(32px, 4.6vw, 64px)",
              border: "1px dashed var(--line)",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <span
              className="display"
              style={{
                fontSize: "clamp(56px, 8vw, 104px)",
                color: "var(--line)",
                lineHeight: 1,
                flex: "none",
              }}
            >
              00
            </span>
            <div>
              <h3 className="display display--s" style={{ margin: "0 0 14px", textTransform: "none", letterSpacing: "-0.03em" }}>
                No positions are open today.
              </h3>
              <p style={{ margin: "0 0 22px", maxWidth: "58ch", fontSize: 16.5, lineHeight: 1.65 }}>
                This is accurate rather than a placeholder — we have not yet
                opened recruitment. When roles open they will be listed here with
                function, location, experience band and reporting line.
              </p>
              <a href={`mailto:${SITE.email}`} className="btn btn--ghost">
                Register interest instead <Arrow />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
