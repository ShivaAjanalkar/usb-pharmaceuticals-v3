import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import Catalogue from "@/components/Catalogue";
import PageHero from "@/components/PageHero";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Pharmaceutical Brand Portfolio",
  description: `Explore ${PRODUCTS.length} pharmaceutical brands and their compositions in the ${SITE.shortName} portfolio. Search by brand name or ingredient.`,
  alternates: { canonical: siteUrl("/products/") },
};
export default function ProductsPage() {
  return <><PageHero tag="Our portfolio" title="Our brands" sub={`${PRODUCTS.length} supported brands. Explore their compositions or contact us for further product information.`} />
    <div className="shell">
      <Breadcrumbs items={[{name: "Home", path: "/"}, {name: "Our brands", path: "/products/"}]} />
      <p className="notice" style={{ marginBottom: 36 }}>Brand names and compositions are listed below. Dosage forms and pack details will follow once confirmed. Indications, efficacy claims and pricing are not published here.</p>
    </div>
    <Catalogue /></>;
}
