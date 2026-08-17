import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrescribingPanel from "@/components/PrescribingPanel";
import Reveal from "@/components/Reveal";
import { PackDiagram, SegmentIcon } from "@/components/icons";
import { PRODUCTS, getProduct } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.brand} — ${product.composition}`,
    description: `${product.composition}. ${product.form}, ${product.pack}. ${product.category}. Published particulars only — no indications or pricing.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const rows: [string, string][] = [
    ["Composition", product.composition],
    ["Dosage form", product.form],
    ["Pack size", product.pack],
    ["Therapeutic category", product.category],
    ["Schedule", product.schedule],
    ["Storage", "[STORAGE STATEMENT]"],
    ["Shelf life", "[MONTHS]"],
    ["Reserved names", product.alternates.join(" · ")],
  ];

  return (
    <>
      <section style={{ paddingTop: "clamp(130px, 16vh, 190px)", paddingBottom: "clamp(32px, 4vw, 56px)" }}>
        <Reveal className="shell">
          <Link
            href="/products/"
            className="eyebrow"
            style={{ textDecoration: "none" }}
            data-reveal
          >
            Back to catalogue
          </Link>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "center",
              justifyContent: "space-between",
              margin: "clamp(20px, 2.4vw, 34px) 0 0",
            }}
          >
            <h1
              className="display display--l"
              style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 1.8vw, 26px)", margin: 0 }}
            >
              <SegmentIcon
                category={product.category}
                size={48}
                className="segment-icon"
              />
              {product.brand}
            </h1>
            <span className="tagpill" style={{ fontSize: 13, padding: "9px 16px" }}>
              {product.id}
            </span>
          </div>

          <p className="data" style={{ marginTop: 22, fontSize: 15 }} data-reveal>
            {product.composition}
          </p>
        </Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ alignItems: "start", gap: "clamp(20px, 3vw, 44px)" }}>
            <div data-reveal>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 24 }}>
                  Published particulars
                </p>
                <dl style={{ margin: 0 }}>
                  {rows.map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 20,
                        padding: "15px 0",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <dt className="data dim" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        {key}
                      </dt>
                      <dd
                        className="data"
                        style={{
                          margin: 0,
                          textAlign: "right",
                          color: value.startsWith("[") ? "var(--muted)" : "var(--ink)",
                        }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* A diagram drawn from the pack data itself — the honest
                  alternative to product photography that does not exist yet. */}
              <figure className="card" style={{ margin: "clamp(14px, 1.6vw, 22px) 0 0" }}>
                <p className="eyebrow" style={{ marginBottom: 24 }}>
                  Pack presentation
                </p>
                <PackDiagram
                  units={product.units}
                  form={product.form}
                  className="pack-diagram"
                />
                <figcaption
                  className="data dim"
                  style={{ marginTop: 18, fontSize: 11, lineHeight: 1.7, maxWidth: "46ch" }}
                >
                  Diagram · {product.pack} · {product.form.toLowerCase()}. Schematic
                  only — pack artwork is not final and is not shown here.
                </figcaption>
              </figure>

              <p className="notice" style={{ marginTop: "clamp(20px, 2.4vw, 30px)", fontSize: 12 }}>
                <b>MANUFACTURED BY · </b>
                [MANUFACTURING PARTNER — name, address, manufacturing licence no.]
                Marketed by USB Pharmaceuticals Pvt. Ltd. USB does not own or
                operate a manufacturing facility.
              </p>
            </div>

            <div data-reveal>
              <PrescribingPanel slug={product.slug} />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
