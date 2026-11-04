const COMPANY_NAME = "USB Lifescience Pvt. Ltd.";

export const SITE = {
  name: COMPANY_NAME,
  shortName: "USB Lifescience",
  tagline: "Universal Science for Better Life",
  description:
    `${COMPANY_NAME} is an Indian pharmaceutical marketing company. We select, market and supply finished formulations manufactured for us by qualified third-party manufacturing partners.`,
  /** Confirmed email domain; hosting remains on the current GitHub Pages URL. */
  domain: "usblifescience.com",
  email: "admin@usblifescience.com",
  phone: "+91 99168 62083",
  phoneHref: "tel:+919916862083",
  /** Unconfirmed company details remain explicit. */
  cin: "Pending confirmation",
  address: [
    COMPANY_NAME,
    "Registered office address pending confirmation.",
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
  `Manufactured by third-party manufacturing partners licensed under the Drugs and Cosmetics Act, 1940. ${SITE.name} is a marketing company and does not own or operate a manufacturing facility.`;
