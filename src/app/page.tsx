import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/SiteNav";
import VideoFrame from "@/components/VideoFrame";
import { SegmentIcon } from "@/components/icons";
import { PRODUCTS, SEGMENTS } from "@/data/products";
import { ATTRIBUTION } from "@/data/site";
import { asset } from "@/lib/asset";

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
  { q: "Does USB own a manufacturing facility?", a: "No. USB operates its own quality-control laboratory, but every product is manufactured by a third-party partner holding a valid manufacturing licence under the Drugs and Cosmetics Act, 1940. That partner is named on each product record. Testing a batch and manufacturing it are different things, and we do not describe a partner's plant as ours." },
  { q: "What certifications does USB hold today?", a: "None yet, and we will not display any until they are issued and independently verifiable. The Quality page shows the slots where certifications will appear, labelled as awaiting verification. Certifications held by our manufacturing partners belong to those partners and are not ours to show." },
  { q: "Why does the catalogue not show indications or pricing?", a: "Because Indian law does not permit it. Prescription products under Schedules H, H1 and X cannot be advertised to the public under the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954. The public catalogue therefore carries composition, strength, dosage form, pack size and therapeutic category only." },
  { q: "How do I become a distributor or stockist?", a: "Send a business enquiry through the contact page with your territory, current portfolio and warehousing capability. Channel appointments are open and terms are still being set, which is the useful moment to be in the conversation." },
  { q: "Are you looking for manufacturing partners?", a: "Yes. Partner qualification is active. We assess licence status, site capability, testing facilities and audit history before commissioning any product, so an enquiry should include your licence details and the dosage forms your site is approved for." },
  { q: "How large is the portfolio?", a: "Twelve combinations across eight pharmacological categories are selected and in development. The catalogue lists all of them with their compositions and pack presentations. Nothing in it is launched yet, and the site says so rather than implying otherwise." },
];

export default function HomePage() {
  return (
    <>
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
                USB Pharmaceuticals selects, markets and supplies finished
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
                  src={asset("/media/usb-lab-01.jpg")}
                  alt="Analysts at work in the USB Pharmaceuticals quality-control laboratory"
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
            className="grid grid--4"
            data-reveal
            style={{
              background: "var(--white)",
              borderRadius: "var(--r-lg)",
              padding: "clamp(28px, 3.4vw, 52px)",
              gap: "clamp(24px, 3vw, 40px)",
            }}
          >
            {[
              [PRODUCTS.length, "Combinations selected and in development"],
              [SEGMENTS.length, "Pharmacological categories in the portfolio"],
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
                USB Pharmaceuticals Pvt. Ltd. is a new Indian pharmaceutical
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
                    src={asset("/media/usb-lab-02.jpg")}
                    alt="The USB Pharmaceuticals laboratory"
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
                Eight categories, twelve combinations
              </h2>
            </div>
            <p className="data dim" style={{ maxWidth: "34ch" }} data-reveal>
              Named pharmacologically, never by indication — s.3, Drugs and Magic
              Remedies Act, 1954.
            </p>
          </div>

          <div className="grid grid--4">
            {SEGMENTS.map((segment) => (
              <Link
                href="/products/"
                key={segment.name}
                className="card card--lift"
                data-reveal
                style={{ textDecoration: "none", display: "block" }}
              >
                <div className="card__icon">
                  <SegmentIcon category={segment.name} size={30} />
                </div>
                <h3>{segment.name}</h3>
                <p className="data" style={{ color: "var(--copper-deep)" }}>
                  {String(segment.count).padStart(2, "0")}{" "}
                  {segment.count === 1 ? "combination" : "combinations"}
                </p>
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
                If the answer you need is not here, the contact page routes your
                enquiry to the function that owns it.
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
