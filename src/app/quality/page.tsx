import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Quality",
  description:
    "Our quality philosophy, six standing commitments, and an honest, empty certifications slot.",
};

const COMMITMENTS = [
  ["Quality-conscious product selection", "Products enter the portfolio on the strength of the molecule, the dossier and the manufacturer — never on landed cost alone."],
  ["Qualified manufacturing partnerships", "Licence status, site capability, testing facilities and audit history are assessed and recorded before any product is commissioned."],
  ["Regulatory compliance", "Labelling, packaging, promotion and schedule handling follow the Drugs and Cosmetics Act, 1940 and the Drugs and Magic Remedies Act, 1954."],
  ["Documentation and traceability", "Batch records, certificates of analysis and release approvals are retained per product and per batch, and produced on request."],
  ["Reliable supply", "Forecasts are shared with manufacturing partners ahead of demand so that continuity, not firefighting, is the normal state."],
  ["Continuous improvement", "Complaints, deviations and market feedback are reviewed on a fixed cycle and fed back into selection and partner assessment."],
];

const STEPS = [
  "Vendor qualification and licence verification",
  "Specification and artwork approval before production",
  "Batch documentation and certificate-of-analysis review",
  "Release authorisation to trade, recorded per batch",
  "Complaint handling and traceable recall route",
];

const CERT_SLOTS = [
  ["ISO", "Management system"],
  ["WHO-GMP", "Partner site standard"],
  ["FSSAI", "Nutraceutical licence"],
  ["Drug licence", "Marketing / sale"],
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        tag="Quality"
        title="Quality is a paper trail, not a promise"
        sub="Our quality philosophy, six standing commitments, and an honest, empty certifications slot."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "start" }}>
            <p className="lead" data-reveal>
              A marketing company cannot inspect quality into a product at the
              end. It can only decide who makes it, on what specification, and
              what evidence it accepts before release.
            </p>
            <div data-reveal>
              <p className="prose">
                That is the whole of our quality function, and it is deliberately
                unglamorous: choose carefully, verify licences, agree
                specifications in writing, read the batch paperwork, and keep it.
                Where we hold responsibility we describe it precisely. Where
                responsibility sits with a licensed manufacturing partner, we name
                that too.
              </p>
              <ol style={{ margin: "28px 0 0", padding: 0, listStyle: "none" }}>
                {STEPS.map((step, i) => (
                  <li
                    key={step}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "46px minmax(0, 1fr)",
                      gap: 16,
                      padding: "16px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <span className="data" style={{ color: "var(--copper-deep)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "var(--ink)", fontSize: 16 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section section--white">
        <Reveal className="shell">
          <p className="eyebrow" data-reveal>
            Six commitments
          </p>
          <h2
            className="display display--l"
            style={{ margin: "clamp(20px, 2.4vw, 32px) 0 clamp(32px, 4vw, 52px)", maxWidth: "16ch" }}
            data-reveal
          >
            What we hold ourselves to
          </h2>
          <div className="grid grid--3">
            {COMMITMENTS.map(([title, body], i) => (
              <article className="card card--lift" key={title} data-reveal>
                <span className="card__n">Q{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <h2 className="display display--m" style={{ margin: 0 }} data-reveal>
              Certifications
            </h2>
            <span className="tagpill" data-reveal>
              Awaiting verification
            </span>
          </div>
          <p className="prose" style={{ marginBottom: "clamp(32px, 4vw, 48px)", maxWidth: "70ch" }} data-reveal>
            No certification marks are displayed on this site. Certifications held
            by our manufacturing partners belong to those partners and are not
            ours to show. Any certification issued to {SITE.name} will appear
            here with its issuing body, scope, certificate number
            and validity dates — and not before.
          </p>

          <div className="grid grid--4">
            {CERT_SLOTS.map(([label, sub], i) => (
              <div
                className="card"
                key={label}
                data-reveal
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  border: "1px dashed var(--line)",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span className="card__n">Slot {String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 style={{ marginBottom: 6 }}>{label}</h3>
                  <p className="dim" style={{ fontSize: 15 }}>
                    {sub}
                  </p>
                  <p className="data dim" style={{ marginTop: 14, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Not held · not displayed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
