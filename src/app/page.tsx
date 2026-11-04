import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/SiteNav";
import VideoFrame from "@/components/VideoFrame";
import { PRODUCTS } from "@/data/products";
import { ATTRIBUTION, SITE } from "@/data/site";
import { asset } from "@/lib/asset";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "USB Lifescience | Pharmaceutical Marketing Company in India" },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    title: "USB Lifescience | Pharmaceutical Marketing Company in India",
    description: SITE.description,
    url: siteUrl("/"),
    images: [{ url: siteUrl("/assets/lifescience-social-1200x630.png"), width: 1200, height: 630, alt: SITE.name }],
  },
};

const STRENGTHS = [
  ["Product selection discipline", "Molecules and combinations are chosen against therapeutic need, channel demand and a documented dossier — not against what is cheapest to source."],
  ["Manufacturer qualification", "Every manufacturing partner is assessed on licence status, site capability and audit history before a single batch is commissioned."],
  ["Documentation as default", "Batch records, certificates of analysis and release approvals are retained per product, per batch, and are retrievable on request."],
  ["Supply reliability", "Forecast-led planning with the manufacturing partner, so the stockist is not the person who discovers a shortage."],
];

const SERVICES = [
  ["Pharmaceutical marketing", "Brand ownership, artwork and packaging development, prescriber and channel communication, and field promotion within the limits Indian advertising law sets for prescription products."],
  ["Portfolio development", "Molecule and combination selection against therapeutic need and channel demand, dossier review, dosage-form and pack-size decisions, and lifecycle planning."],
  ["Manufacturing coordination", "Qualification of licensed manufacturing partners, specification agreement, production scheduling, and documentation review through to release."],
  ["Distribution and supply", "Distributor and stockist appointment, forecast-led replenishment, batch traceability to dispatch, and a defined route for complaints and recall."],
  ["Business partnerships", "In-licensing and out-licensing discussions, co-marketing arrangements, and territory agreements."],
];

const FAQ = [
  { q: "Does USB own a manufacturing facility?", a: "No. USB operates its own quality-control laboratory, but every product is manufactured by a third-party partner holding a valid manufacturing licence under the Drugs and Cosmetics Act, 1940. Manufacturing-partner particulars will be published with the confirmed product information. Testing a batch and manufacturing it are different things, and we do not describe a partner's plant as ours." },
  { q: "What certifications does USB hold today?", a: "None yet, and we will not display any until they are issued and independently verifiable. The Quality page shows the slots where certifications will appear, labelled as awaiting verification. Certifications held by our manufacturing partners belong to those partners and are not ours to show." },
  { q: "Why does the catalogue not show indications or pricing?", a: "This is a corporate and brand-reference website. We currently publish the confirmed brand names; product particulars will follow once verified. Indications, efficacy claims and pricing are not published here. Please speak to a registered healthcare professional for medical advice." },
  { q: "How do I become a distributor or stockist?", a: "Send a business enquiry through the contact page with your territory, current portfolio and warehousing capability. Channel appointments are open and terms are still being set, which is the useful moment to be in the conversation." },
  { q: "How large is the portfolio?", a: `Our supported portfolio includes ${PRODUCTS.length} brands. The catalogue lists the current names. Product compositions and pack details will be published once confirmed; contact us for further information.` },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization", "@id": siteUrl("/#organization"),
            name: SITE.shortName, legalName: SITE.name,
            url: siteUrl("/"), description: SITE.description,
            logo: siteUrl("/assets/lifescience-logo.png"),
            email: SITE.email, telephone: SITE.phoneHref.replace("tel:", ""),
          },
          {
            "@type": "WebSite", "@id": siteUrl("/#website"),
            url: siteUrl("/"), name: SITE.shortName,
            alternateName: SITE.name, inLanguage: "en-IN",
            publisher: { "@id": siteUrl("/#organization") },
          },
        ],
      }} />
      {/* ── hero ─────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "clamp(120px, 15vh, 172px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <Reveal className="shell">
          <div
            className="grid grid--2"
            style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "center" }}
          >
            <div>
              <p className="eyebrow" data-reveal>
                Universal Science for Better Life
              </p>
              <h1
                className="display display--xl"
                style={{ margin: "clamp(18px, 2vw, 28px) 0 0" }}
                data-reveal
              >
                Medicine that arrives documented, and on time
              </h1>
              <p className="lead" style={{ marginTop: 24 }} data-reveal>
                {SITE.shortName} selects, markets and supplies finished
                formulations in India — manufactured for us, under our documented
                quality oversight, by qualified third-party partners.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }} data-reveal>
                <Link href="/products/" className="btn btn--navy">
                  View the catalogue <Arrow />
                </Link>
                <Link href="/quality/" className="btn btn--ghost">
                  Our quality approach
                </Link>
              </div>
            </div>

            <div data-reveal>
              <div className="media media--hero">
                <Image
                  src={asset("/media/lifescience-lab-01.webp")}
                  alt={`Analysts at work in the ${SITE.shortName} quality-control laboratory`}
                  width={1536}
                  height={1024}
                  priority
                />
                <span className="media__badge">USB laboratory</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── the numbers that are true ────────────────────────────────────── */}
      <section className="section--tight">
        <Reveal className="shell">
          <div
            className="grid grid--3"
            data-reveal
            style={{
              background: "var(--white)",
              borderRadius: "var(--r-lg)",
              padding: "clamp(28px, 3.4vw, 52px)",
              gap: "clamp(24px, 3vw, 40px)",
            }}
          >
            {[
              [PRODUCTS.length, "Brands in our supported portfolio"],
              [1, "Quality-control laboratory, operated by USB"],
              [0, "Certifications held — none displayed until issued"],
            ].map(([value, label]) => (
              <div className="stat" key={label as string}>
                <span className="stat__value">
                  <Counter value={value as number} />
                </span>
                <span className="stat__label">{label as string}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── about ────────────────────────────────────────────────────────── */}
      <section className="section">
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "center" }}>
            <div data-reveal>
              <VideoFrame
                src="/media/lab-analysis.mp4"
                poster="/media/lab-analysis-poster.jpg"
                caption="Analytical work · USB laboratory"
                className="media--wide"
              />
            </div>
            <div data-reveal>
              <p className="eyebrow">About USB</p>
              <h2 className="display display--l" style={{ margin: "18px 0 22px" }}>
                A company built to be audited
              </h2>
              <p className="prose">
                {SITE.name} is an Indian pharmaceutical
                company. We are deliberately narrow: we do not own a
                manufacturing plant and do not claim to. What we own is the
                selection of the molecule, the qualification of the manufacturer,
                the laboratory that checks what arrives, and the documentation
                trail behind every batch we release.
              </p>
              <p className="prose">
                Everything on this site that is not yet decided is shown as an
                empty slot rather than filled with something plausible. A partner
                reading this should be able to tell exactly what exists today.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/about/" className="btn btn--ghost">
                  More about us <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── why choose us ────────────────────────────────────────────────── */}
      <section className="section section--white">
        <Reveal className="shell">
          <div style={{ maxWidth: "44ch", marginBottom: "clamp(32px, 4vw, 56px)" }}>
            <p className="eyebrow" data-reveal>
              Why partners choose us
            </p>
            <h2 className="display display--l" style={{ marginTop: 18 }} data-reveal>
              Four things a marketing partner is actually buying
            </h2>
          </div>

          <div className="grid grid--4">
            {STRENGTHS.map(([title, body], i) => (
              <article className="card card--lift" key={title} data-reveal>
                <div className="card__icon">
                  <span className="data" style={{ fontSize: 14 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── the laboratory ───────────────────────────────────────────────── */}
      <section className="section section--navy">
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "center" }}>
            <div data-reveal>
              <p className="eyebrow eyebrow--light">Inside the laboratory</p>
              <h2 className="display display--l" style={{ margin: "18px 0 22px", color: "var(--white)" }}>
                Quality is a paper trail, not a promise
              </h2>
              <p className="prose" style={{ color: "rgba(255,255,255,.76)" }}>
                A marketing company cannot inspect quality into a product at the
                end. It can only decide who makes it, on what specification, and
                what evidence it accepts before release. Our laboratory is where
                that evidence is checked — licences verified, specifications
                agreed in writing, batch paperwork read and kept.
              </p>
              <p className="notice" style={{ marginTop: 26 }}>
                <b>ATTRIBUTION · </b>
                {ATTRIBUTION}
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/quality/" className="btn btn--copper">
                  The quality approach <Arrow />
                </Link>
              </div>
            </div>

            <div className="grid" style={{ gap: "clamp(14px, 1.6vw, 20px)" }} data-reveal>
              <VideoFrame
                src="/media/lab-sampling.mp4"
                poster="/media/lab-sampling-poster.jpg"
                caption="Sample preparation"
                className="media--wide"
              />
              <div className="grid grid--2" style={{ gap: "clamp(14px, 1.6vw, 20px)" }}>
                <VideoFrame
                  src="/media/lab-glassware.mp4"
                  poster="/media/lab-glassware-poster.jpg"
                  caption="Glassware"
                  className="media--tall"
                />
                <div className="media media--tall">
                  <Image
                    src={asset("/media/lifescience-lab-02.webp")}
                    alt={`The ${SITE.shortName} laboratory`}
                    width={1536}
                    height={1024}
                  />
                  <span className="media__caption">USB laboratory</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── portfolio ────────────────────────────────────────────────────── */}
      <section className="section">
        <Reveal className="shell">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(32px, 4vw, 52px)",
            }}
          >
            <div style={{ maxWidth: "40ch" }}>
              <p className="eyebrow" data-reveal>
                Our portfolio
              </p>
              <h2 className="display display--l" style={{ marginTop: 18 }} data-reveal>
                {PRODUCTS.length} brands, one commitment to quality
              </h2>
            </div>
            <p className="data dim" style={{ maxWidth: "34ch" }} data-reveal>
              Explore our supported brands. Product particulars are being
              confirmed before publication.
            </p>
          </div>

          <div className="grid grid--4">
            {PRODUCTS.map((product) => (
              <Link href={`/products/${product.slug}/`} key={product.slug}
                className="card card--lift" data-reveal
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 18 }}>
                <span className="card__icon" aria-hidden="true" style={{ fontSize: 28, fontWeight: 300 }}>{product.letter}</span>
                <h3 style={{ margin: 0, overflowWrap: "anywhere" }}>{product.brand}</h3>
                <span style={{ marginTop: "auto", fontSize: 14, color: "var(--copper-deep)" }}>View brand <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── services ─────────────────────────────────────────────────────── */}
      <section className="section section--white">
        <Reveal className="shell">
          <div style={{ maxWidth: "40ch", marginBottom: "clamp(28px, 3.4vw, 44px)" }}>
            <p className="eyebrow" data-reveal>
              Our services
            </p>
            <h2 className="display display--l" style={{ marginTop: 18 }} data-reveal>
              Five capabilities, described at their real scope
            </h2>
          </div>

          <div>
            {SERVICES.map(([title, body], i) => (
              <article className="srow" key={title} data-reveal>
                <span className="data" style={{ color: "var(--copper-deep)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display display--s" style={{ margin: 0, fontWeight: 300 }}>
                  {title}
                </h3>
                <p style={{ margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── faq ──────────────────────────────────────────────────────────── */}
      <section className="section">
        <Reveal className="shell">
          <div className="grid grid--2" style={{ gap: "clamp(28px, 4vw, 64px)", alignItems: "start" }}>
            <div data-reveal>
              <p className="eyebrow">Questions</p>
              <h2 className="display display--l" style={{ margin: "18px 0 22px" }}>
                What partners ask first
              </h2>
              <p className="prose">
                If the answer you need is not here, email us or call the office.
                Our contact page has the details.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/contact/" className="btn btn--navy">
                  Ask us directly <Arrow />
                </Link>
              </div>
            </div>
            <div data-reveal>
              <Accordion items={FAQ} />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
