/**
 * Brand names and compositions supplied by USB Lifescience on 6 November 2026.
 *
 * Publish the supplied composition text without inferring dosage forms, pack
 * sizes, schedules or manufacturer particulars. The quantity of DHA in
 * Megalo-D has not been specified. Existing brand URLs and IDs remain stable.
 */
export type Product = {
  id: string;
  slug: string;
  brand: string;
  composition: string;
  letter: string;
};

// Types retained for the existing graphic library; no category is assigned to
// a supported brand until its particulars are confirmed.
export type Category =
  | "Ovulation-modulating agents"
  | "Prolactin-modulating agents"
  | "Combined hormonal preparations"
  | "Progestogens"
  | "Oestrogen preparations"
  | "Antifibrinolytics & antispasmodics"
  | "Nutraceuticals"
  | "Combination kits";
export type DosageForm = "Tablet" | "Softgel capsule" | "Combi-kit";

const SUPPORTED_BRANDS = [
  ["ce-35", "CE-35", "Cyproterone Acetate 2 mg + Ethinyl Estradiol 0.035 mg"],
  ["desentra", "Desentra", "Desogestrel 0.15 mg + Ethinyl Estradiol 0.02 mg"],
  ["drospira-20", "Drospira-20", "Drospirenone 3 mg + Ethinyl Estradiol 0.02 mg"],
  ["drospira-30", "Drospira-30", "Drospirenone 3 mg + Ethinyl Estradiol 0.03 mg"],
  ["endora-5", "Endora-5", "Norethisterone Acetate 5 mg"],
  ["endora-cr-10", "Endora-CR 10", "Norethisterone Acetate CR 10 mg"],
  ["estraval-e2", "Estraval E2", "Estradiol Valerate 2 mg"],
  ["estraval-gel", "Estraval-Gel", "Estradiol 0.06% w/w"],
  ["letrofit-2-5-mg", "Letrofit 2.5 MG", "Letrozole 2.5 mg"],
  ["letrofit-5-mg", "Letrofit-5 MG", "Letrozole 5 mg"],
  ["megastron-10", "Megastron-10", "Medroxyprogesterone Acetate 10 mg"],
  ["pregnill-kit", "Pregnill-Kit", "Mifepristone 200 mg + Misoprostol 200 mcg"],
  ["prolactra", "Prolactra", "Cabergoline 0.25 mg"],
  ["prolactra-d", "Prolactra-D", "Cabergoline 0.5 mg"],
  ["spasmora-m", "Spasmora-M", "Drotaverine 80 mg + Mefenamic Acid 250 mg"],
  ["tramexa-mf", "Tramexa-MF", "Tranexamic Acid 500 mg + Mefenamic Acid 250 mg"],
  ["megalo-d", "Megalo-D", "L-Methylfolate 5 mg + Pyridoxal-5-Phosphate 10 mg + Methylcobalamin 1500 mcg + DHA"],
] as const;

export const PRODUCTS: Product[] = SUPPORTED_BRANDS.map(([slug, brand, composition], index) => ({
  id: `USB-B-${String(index + 1).padStart(3, "0")}`,
  slug,
  brand,
  composition,
  letter: brand[0].toUpperCase(),
}));

export const LETTERS = [...new Set(PRODUCTS.map((p) => p.letter))].sort();

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Old links still lead visitors to the current catalogue. */
export const LEGACY_SLUGS = [
  "letrofit", "drospira", "endora", "megastron", "desogest",
  "tramexa", "sapasmora", "estraval",
] as const;
