import type { Metadata } from "next";
import Catalogue from "@/components/Catalogue";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Composition, strength, dosage form, pack size and therapeutic category. Nothing that Indian law reserves for healthcare professionals.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        tag="Our portfolio"
        title="Product catalogue"
        sub="Composition, strength, dosage form, pack size and therapeutic category. Nothing that Indian law reserves for healthcare professionals."
      />

      <Reveal className="shell" >
        <p
          className="notice"
          data-reveal
          style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}
        >
          <b>REGULATORY NOTICE · </b>
          This catalogue lists composition, strength, dosage form, pack size and
          therapeutic category only. Indications, efficacy claims, comparisons
          and pricing are not published. Prescription products under Schedules H,
          H1 and X are not advertised to the public, per the Drugs and Magic
          Remedies (Objectionable Advertisements) Act, 1954. Schedule
          classifications shown are pending final regulatory confirmation.
        </p>
      </Reveal>

      <Catalogue />
    </>
  );
}
