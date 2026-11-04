/**
 * Supported brand names confirmed by USB Lifescience on 4 November 2026.
 *
 * A brand is not a unique pharmaceutical combination. Composition, dosage
 * form, pack size and schedule have not been supplied for this updated list;
 * do not infer them from a name or copy them from an older proposed variant.
 * The previous working specifications remain available in Git history.
 */
export type Product = {
  id: string;
  slug: string;
  brand: string;
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
  ["ce-35", "CE-35"],
  ["desentra", "Desentra"],
  ["drospira-20", "Drospira-20"],
  ["drospira-30", "Drospira-30"],
  ["endora-5", "Endora-5"],
  ["endora-cr-10", "Endora-CR 10"],
  ["estraval-e2", "Estraval E2"],
  ["estraval-gel", "Estraval -Gel"],
  ["letrofit-2-5-mg", "Letrofit 2.5 MG"],
  ["letrofit-5-mg", "Letrofit-5 MG"],
  ["megastron-10", "Megastron-10"],
  ["pregnill-kit", "Pregnill-kit"],
  ["prolactra", "Prolactra"],
  ["prolactra-d", "Prolactra - D"],
  ["spasmora-m", "Spasmora-M"],
  ["tramexa-mf", "Tramexa-MF"],
  ["megalo-d", "Megalo-D"],
] as const;

export const PRODUCTS: Product[] = SUPPORTED_BRANDS.map(([slug, brand], index) => ({
  id: `USB-B-${String(index + 1).padStart(3, "0")}`,
  slug,
  brand,
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
