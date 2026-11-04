import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/SiteNav";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Business Enquiries",
  description:
    `Contact ${SITE.shortName} in Mysore for product, distributor and business enquiries. Email ${SITE.email} or call ${SITE.phone}.`,
};

const ENQUIRY_CATEGORIES = [
  ["General", "Anything that is not covered below"],
  ["Business", "Distributors, stockists, channel appointment"],
  ["Partnership", "Manufacturing partners, CDMOs, licensing"],
  ["Careers", "Applications and speculative CVs"],
];

const OFFICE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.join(", "))}`;

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
                  Office address
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
            }}
          >
            <h2 className="display display--m" style={{ margin: 0 }} data-reveal>
              Visit our office
            </h2>
            <div data-reveal>
              <p className="prose" style={{ margin: "0 0 20px" }}>
                Jayanagar, Mysore - {SITE.postalAddress.postalCode}.<br />
                Near Ashokapuram Railway Station.
              </p>
              <a href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--navy">
                Open in Google Maps <Arrow />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
