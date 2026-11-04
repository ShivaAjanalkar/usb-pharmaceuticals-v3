import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrescribingPanel from "@/components/PrescribingPanel";
import LegacyCatalogueLink from "@/components/LegacyCatalogueLink";
import Reveal from "@/components/Reveal";
import { PRODUCTS, LEGACY_SLUGS, getProduct } from "@/data/products";
import { SITE } from "@/data/site";
import Breadcrumbs from "@/components/Breadcrumbs";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return [...PRODUCTS.map((p) => ({ slug: p.slug })), ...LEGACY_SLUGS.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Catalogue updated", robots: { index: false, follow: true } };
  return {
    title: product.brand,
    description: `${product.brand} is part of the ${SITE.shortName} portfolio. Product particulars are awaiting confirmation.`,
    alternates: { canonical: siteUrl(`/products/${product.slug}/`) },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    if (!(LEGACY_SLUGS as readonly string[]).includes(slug)) notFound();
    return <section className="section" style={{ paddingTop: 160 }}><div className="shell"><h1 className="display display--m">Explore our current brands</h1><LegacyCatalogueLink /></div></section>;
  }
  return (
    <>
      <section className="section" style={{ paddingTop: "clamp(130px, 16vh, 190px)", paddingBottom: 32 }}>
        <Reveal className="shell">
          <Breadcrumbs items={[
            {name: "Home", path: "/"},
            {name: "Our brands", path: "/products/"},
            {name: product.brand, path: `/products/${product.slug}/`},
          ]} />
          <h1 className="display display--l" style={{ marginTop: 28, overflowWrap: "anywhere" }} data-reveal>{product.brand}</h1>
          <p className="lead" style={{ marginTop: 22 }} data-reveal>Part of the {SITE.shortName} portfolio.</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div className="grid grid--2" style={{ alignItems: "start", gap: "clamp(20px, 3vw, 44px)" }}>
            <div data-reveal>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 22 }}>Product information</p>
                <h2 style={{ fontWeight: 400 }}>Details awaiting confirmation</h2>
                <p>Composition, strength, dosage form, pack presentation and other product particulars will be published once confirmed.</p>
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Product enquiry — ${product.brand}`)}`} className="btn btn--navy" style={{ marginTop: 20 }}>Enquire about this brand <span aria-hidden="true">→</span></a>
              </div>
              <p className="notice" style={{ marginTop: 24 }}>
                Marketed by {SITE.name} Products are manufactured by licensed third-party manufacturing partners. Manufacturing-partner particulars will be published with the confirmed product information. {SITE.shortName} does not own or operate a manufacturing facility.
              </p>
            </div>
            <div data-reveal><PrescribingPanel slug={product.slug} /></div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
