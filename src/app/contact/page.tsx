import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Business Enquiries",
  description:
    `Contact ${SITE.shortName} for product, distributor and business enquiries. Email ${SITE.email} or call ${SITE.phone}.`,
};

const ENQUIRY_CATEGORIES = [
  ["General", "Anything that is not covered below"],
  ["Business", "Distributors, stockists, channel appointment"],
  ["Partnership", "Manufacturing partners, CDMOs, licensing"],
  ["Careers", "Applications and speculative CVs"],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="One inbox for every enquiry"
        sub={`General, business, partnership and careers enquiries all go to ${SITE.email}. Use the form to prepare an email in your own email app.`}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 56px)", alignItems: "start" }}>
            <div data-reveal>
              <div className="card" style={{ marginBottom: "clamp(14px, 1.6vw, 22px)" }}>
                <p className="eyebrow" style={{ marginBottom: 22 }}>
                  Registered office
                </p>
                <p className="data" style={{ margin: 0, fontSize: 14, lineHeight: 2 }}>
                  {SITE.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                  <span className="dim">CIN · {SITE.cin}</span>
                </p>
              </div>

              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 22 }}>
                  Enquiries
                </p>
                {ENQUIRY_CATEGORIES.map(([label, note]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "16px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <div>
                      <div style={{ color: "var(--ink)", fontSize: 16, fontWeight: 500 }}>{label}</div>
                      <div className="dim" style={{ fontSize: 14.5, marginTop: 3 }}>
                        {note}
                      </div>
                    </div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="data"
                      style={{ color: "var(--copper-deep)", textDecoration: "none", whiteSpace: "nowrap" }}
                    >
                      {SITE.email}
                    </a>
                  </div>
                ))}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                  <a href={SITE.phoneHref} className="chip">
                    {SITE.phone}
                  </a>
                </div>
              </div>
            </div>

            <div data-reveal>
              <EnquiryForm />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section section--white">
        <Reveal className="shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 26,
            }}
          >
            <h2 className="display display--m" style={{ margin: 0 }} data-reveal>
              Location
            </h2>
            <span className="data dim" data-reveal>
              Google Maps embed pending registered address
            </span>
          </div>
          <div
            data-reveal
            style={{
              borderRadius: "var(--card-lg)",
              border: "1px dashed var(--line)",
              aspectRatio: "21 / 7",
              minHeight: 220,
              display: "grid",
              placeItems: "center",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          >
            <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--copper)",
                  display: "block",
                }}
              />
              <span className="data dim" style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}>
                Google Maps embed · address pending
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
