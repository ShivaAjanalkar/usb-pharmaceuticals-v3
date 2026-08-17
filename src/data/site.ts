export const SITE = {
  name: "USB Pharmaceuticals Pvt. Ltd.",
  shortName: "USB Pharmaceuticals",
  tagline: "Universal Science for Better Life",
  description:
    "USB Pharmaceuticals Pvt. Ltd. is an Indian pharmaceutical marketing company. We select, market and supply finished formulations manufactured for us by qualified third-party manufacturing partners.",
  /** Placeholders remain visible until the real values are supplied. */
  domain: "[DOMAIN-TBC]",
  phone: "+91 [PHONE — 10 DIGITS]",
  whatsapp: "https://wa.me/91",
  cin: "[CIN — 21 CHAR]",
  address: [
    "USB Pharmaceuticals Pvt. Ltd.",
    "[ADDRESS LINE 1]",
    "[ADDRESS LINE 2]",
    "[CITY] — [PIN]",
    "[STATE], India",
  ],
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/products/", label: "Products" },
  { href: "/services/", label: "Services" },
  { href: "/quality/", label: "Quality" },
  { href: "/careers/", label: "Careers" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Footer sorted by who the reader is, not by department. */
export const FOOTER_COLUMNS = [
  {
    head: "Partners",
    links: [
      { href: "/services/", label: "Services" },
      { href: "/quality/", label: "Quality" },
      { href: "/contact/", label: "Partnership enquiry" },
    ],
  },
  {
    head: "Healthcare professionals",
    links: [
      { href: "/products/", label: "Product catalogue" },
      { href: "/hcp/", label: "HCP verification" },
      { href: "/legal/disclaimer/", label: "Medical disclaimer" },
    ],
  },
  {
    head: "Distributors",
    links: [
      { href: "/products/", label: "Catalogue" },
      { href: "/contact/", label: "Appointment enquiry" },
      { href: "/legal/terms/", label: "Terms & conditions" },
    ],
  },
  {
    head: "Job seekers",
    links: [
      { href: "/careers/", label: "Careers" },
      { href: "/about/", label: "About USB" },
    ],
  },
] as const;

export const ATTRIBUTION =
  "Manufactured by third-party manufacturing partners licensed under the Drugs and Cosmetics Act, 1940. USB Pharmaceuticals Pvt. Ltd. is a marketing company and does not own or operate a manufacturing facility.";
