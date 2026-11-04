import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import Catalogue from "@/components/Catalogue";
import PageHero from "@/components/PageHero";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Our brands",
  description: `Explore the ${PRODUCTS.length} supported brands in the ${SITE.shortName} portfolio. Product particulars will be published once confirmed.`,
  alternates: { canonical: siteUrl("/products/") },
};
export default function ProductsPage() {
  return <><PageHero tag="Our portfolio" title="Our brands" sub={`${PRODUCTS.length} supported brands. Explore the portfolio or contact us for product information.`} />
    <div className="shell"><p className="notice" style={{ marginBottom: 36 }}>Composition, dosage forms and pack details are being confirmed. Indications, efficacy claims and pricing are not published here.</p></div>
    <Catalogue /></>;
}
