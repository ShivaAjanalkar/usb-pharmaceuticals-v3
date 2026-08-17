/**
 * Product catalogue.
 *
 * Source: "Brand Portfolio" workbook (internal). Only the fields Indian law
 * permits on a public page are modelled here — composition, strength, dosage
 * form, pack size and therapeutic category. Deliberately absent, and not to be
 * added to this file: indications, dosing, efficacy claims, comparative
 * statements and MRP. Prescribing information belongs behind the HCP gate.
 *
 * Therapeutic categories are named pharmacologically rather than by indication.
 * That is not a stylistic choice: Section 3 of the Drugs and Magic Remedies
 * (Objectionable Advertisements) Act, 1954 restricts public advertisement
 * referring to conception and miscarriage, so the public catalogue describes
 * what a molecule is, never what it is for.
 */

export type Product = {
  id: string;
  slug: string;
  brand: string;
  /** Alternate brand names reserved for the same combination. */
  alternates: string[];
  composition: string;
  form: DosageForm;
  pack: string;
  category: Category;
  /** Units in one pack — drives the pack diagram. A kit counts every tablet. */
  units: number;
  /** Drugs and Cosmetics Rules, 1945 schedule. Pending final confirmation. */
  schedule: string;
  letter: string;
};

export const CATEGORIES = [
  "Ovulation-modulating agents",
  "Prolactin-modulating agents",
  "Combined hormonal preparations",
  "Progestogens",
  "Oestrogen preparations",
  "Antifibrinolytics & antispasmodics",
  "Nutraceuticals",
  "Combination kits",
] as const;

export const FORMS = ["Tablet", "Softgel capsule", "Combi-kit"] as const;

export type Category = (typeof CATEGORIES)[number];
export type DosageForm = (typeof FORMS)[number];

export const PRODUCTS: Product[] = [
  {
    id: "USB-P-001",
    slug: "letrofit",
    units: 5,
    brand: "Letrofit",
    alternates: ["Letrogest", "Letrozova"],
    composition: "Letrozole IP 2.5 mg",
    form: "Tablet",
    pack: "1 × 5 tablets",
    category: "Ovulation-modulating agents",
    schedule: "H",
    letter: "L",
  },
  {
    id: "USB-P-002",
    slug: "prolactra-d",
    units: 4,
    brand: "Prolactra-D",
    alternates: ["Lactovia-D2", "Prolactis"],
    composition: "Cabergoline IP 0.5 mg",
    form: "Tablet",
    pack: "1 × 4 tablets",
    category: "Prolactin-modulating agents",
    schedule: "H",
    letter: "P",
  },
  {
    id: "USB-P-003",
    slug: "drospira",
    units: 21,
    brand: "Drospira",
    alternates: ["Spironex", "Drosentra"],
    composition: "Drospirenone IP 3 mg + Ethinylestradiol IP 0.03 mg",
    form: "Tablet",
    pack: "1 × 21 tablets",
    category: "Combined hormonal preparations",
    schedule: "H",
    letter: "D",
  },
  {
    id: "USB-P-004",
    slug: "ce-35",
    units: 21,
    brand: "CE-35",
    alternates: ["Androgest", "Cyprozen-35"],
    composition: "Cyproterone acetate IP 2 mg + Ethinylestradiol IP 0.035 mg",
    form: "Tablet",
    pack: "1 × 21 tablets",
    category: "Combined hormonal preparations",
    schedule: "H",
    letter: "C",
  },
  {
    id: "USB-P-005",
    slug: "megalo-d",
    units: 15,
    brand: "Megalo-D",
    alternates: ["Follfile-D", "MLP-D"],
    composition:
      "L-Methylfolate 5 mg + Pyridoxal-5-Phosphate + Mecobalamin 1500 mcg + DHA",
    form: "Softgel capsule",
    pack: "1 × 15 capsules",
    category: "Nutraceuticals",
    schedule: "Non-scheduled",
    letter: "M",
  },
  {
    id: "USB-P-006",
    slug: "pregnill-kit",
    units: 5,
    brand: "Pregnill-Kit",
    alternates: ["Pregfree", "Preventa"],
    composition:
      "Mifepristone IP 200 mg × 1 + Misoprostol IP 200 mcg × 4",
    form: "Combi-kit",
    pack: "1 + 4 × 1 tablets",
    category: "Combination kits",
    schedule: "H",
    letter: "P",
  },
  {
    id: "USB-P-007",
    slug: "endora",
    units: 10,
    brand: "Endora",
    alternates: ["Norexa", "Gestiva"],
    composition: "Norethisterone acetate IP 5 mg",
    form: "Tablet",
    pack: "1 × 10 tablets",
    category: "Progestogens",
    schedule: "H",
    letter: "E",
  },
  {
    id: "USB-P-008",
    slug: "megastron",
    units: 10,
    brand: "Megastron",
    alternates: ["ProGest", "Mpro-10"],
    composition: "Medroxyprogesterone acetate IP 10 mg",
    form: "Tablet",
    pack: "1 × 10 tablets",
    category: "Progestogens",
    schedule: "H",
    letter: "M",
  },
  {
    id: "USB-P-009",
    slug: "desogest",
    units: 21,
    brand: "Desogest",
    alternates: ["Desentra", "Femtop"],
    composition: "Desogestrel IP 0.15 mg + Ethinylestradiol IP 0.02 mg",
    form: "Tablet",
    pack: "1 × 21 tablets",
    category: "Combined hormonal preparations",
    schedule: "H",
    letter: "D",
  },
  {
    id: "USB-P-010",
    slug: "tramexa",
    units: 10,
    brand: "Tramexa",
    alternates: ["HemoStop", "Tramef", "Hemofix"],
    composition: "Tranexamic acid IP 500 mg + Mefenamic acid IP 250 mg",
    form: "Tablet",
    pack: "1 × 10 tablets",
    category: "Antifibrinolytics & antispasmodics",
    schedule: "H",
    letter: "T",
  },
  {
    id: "USB-P-011",
    slug: "sapasmora",
    units: 10,
    brand: "Sapasmora",
    alternates: ["Sapsmex", "Drotamef"],
    composition: "Drotaverine hydrochloride 80 mg + Mefenamic acid IP 250 mg",
    form: "Tablet",
    pack: "1 × 10 tablets",
    category: "Antifibrinolytics & antispasmodics",
    schedule: "H",
    letter: "S",
  },
  {
    id: "USB-P-012",
    slug: "estraval",
    units: 28,
    brand: "Estraval",
    alternates: ["Valestra", "Estragen"],
    composition: "Estradiol valerate IP 2 mg",
    form: "Tablet",
    pack: "1 × 28 tablets",
    category: "Oestrogen preparations",
    schedule: "H",
    letter: "E",
  },
];

export const LETTERS = Array.from(new Set(PRODUCTS.map((p) => p.letter))).sort();

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Count of products in each therapeutic category, in catalogue order. */
export const SEGMENTS = CATEGORIES.map((name) => ({
  name,
  count: PRODUCTS.filter((p) => p.category === name).length,
}));
