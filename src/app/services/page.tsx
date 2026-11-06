import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ATTRIBUTION } from "@/data/site";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Pharmaceutical Marketing & Distribution Services",
  description:
    "Explore USB Lifescience's pharmaceutical marketing, portfolio development, manufacturing coordination and distribution services in India.",
};

const SERVICES = [
  ["Pharmaceutical marketing", "Brand ownership // Channel communication", "Brand ownership, artwork and packaging development, prescriber and channel communication, and field promotion within the limits Indian advertising law sets for prescription products.", "Portfolio in build · no field force appointed yet"],
  ["Portfolio development", "Molecule selection // Lifecycle", "Molecule and combination selection against therapeutic need and channel demand, dossier review, dosage-form and pack-size decisions, and lifecycle planning across the catalogue.", `${PRODUCTS.length} supported brands · compositions published`],
  ["Third-party manufacturing coordination", "Partner qualification // Release", "Identification and qualification of licensed manufacturing partners, specification agreement, production scheduling, and documentation review through to release. USB coordinates manufacturing; USB does not manufacture.", "Partner qualification in progress"],
  ["Distribution and supply", "Stockists // Traceability", "Distributor and stockist appointment, forecast-led replenishment with the manufacturing partner, batch traceability to the point of dispatch, and a defined route for complaints and recall.", "Channel appointments open"],
  ["Business partnerships", "Licensing // Territory", "In-licensing and out-licensing discussions, co-marketing arrangements, and territory agreements. Terms are still being set, which is the useful time to talk.", "Open to enquiry"],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Our service"
        title="Five capabilities, real scope"
        sub="What USB does today, what is still in progress, and where a licensed manufacturing partner takes over."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          {SERVICES.map(([title, sub, body, scope], i) => (
            <article className="srow" key={title} data-reveal>
              <span className="data" style={{ color: "var(--copper-deep)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="display display--s" style={{ margin: 0 }}>
                {title}
              </h2>
              <div>
                <p className="srow__sub">{sub}</p>
                <p style={{ margin: "0 0 20px", fontSize: 16.5, lineHeight: 1.65 }}>{body}</p>
                <p
                  className="data dim"
                  style={{
                    margin: 0,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderTop: "1px solid var(--line)",
                    paddingTop: 14,
                  }}
                >
                  Scope today · {scope}
                </p>
              </div>
            </article>
          ))}

          <p className="notice" style={{ marginTop: "clamp(36px, 4vw, 60px)" }} data-reveal>
            <b>ATTRIBUTION · </b>
            {ATTRIBUTION}
          </p>
        </Reveal>
      </section>
    </>
  );
}
