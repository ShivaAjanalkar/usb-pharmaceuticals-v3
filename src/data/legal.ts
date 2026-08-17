export type LegalDoc = {
  slug: "privacy" | "terms" | "disclaimer";
  kicker: string;
  title: string;
  intro: string;
  clauses: [string, string, string][];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    kicker: "Legal · 01",
    title: "Privacy Policy",
    intro:
      "This policy describes what USB Pharmaceuticals Pvt. Ltd. collects through this website, why, and what you can ask us to do about it. It is written to be read, not to be survived.",
    clauses: [
      ["01", "What we collect", "Only what you send us. If you submit the enquiry form we receive your name, organisation, email, phone number, enquiry type and message. Our host records standard server logs — IP address, browser, pages requested, timestamps — for security and diagnostics."],
      ["02", "What we do not collect", "We do not collect health information, prescription data, or payment details through this site. We do not run advertising trackers or sell data to third parties. We do not attempt to identify individual visitors from analytics."],
      ["03", "Why we hold it", "To answer your enquiry, to route it to the correct function, to keep a record of business correspondence, and to meet statutory record-keeping obligations that apply to a pharmaceutical company in India."],
      ["04", "How long we keep it", "Enquiry correspondence is retained for [RETENTION PERIOD — TBC] from last contact, then deleted. Server logs are retained for [LOG RETENTION — TBC]."],
      ["05", "Who else sees it", "Our email and hosting providers, as processors under contract. Named in the developer handover as [PROCESSOR LIST — TBC]. We do not transfer enquiry data outside India except as required by those providers, and we will name any such transfer here."],
      ["06", "Adverse event reports", "If you contact us about a suspected adverse event or a product quality complaint, we are required to record and report it. That record is kept as long as pharmacovigilance and drug-safety obligations require, which is longer than ordinary correspondence."],
      ["07", "Your rights", "You may ask what we hold about you, ask us to correct it, or ask us to delete it where no legal obligation requires us to keep it. Write to [PRIVACY CONTACT EMAIL — TBC]. We respond within 30 days."],
      ["08", "Cookies", "This site sets no advertising or analytics cookies at present. If that changes, a consent notice will appear before any non-essential cookie is set, and this clause will be updated with the date."],
      ["09", "Changes", "Material changes are dated at the top of this page. The version in force is the one published here."],
    ],
  },
  {
    slug: "terms",
    kicker: "Legal · 02",
    title: "Terms & Conditions",
    intro:
      "These terms govern your use of this website. They do not govern the supply of goods — supply is governed by the separate written agreement between USB Pharmaceuticals Pvt. Ltd. and its distributor or partner.",
    clauses: [
      ["01", "Who this site is for", "This is a corporate information site for business and professional audiences: manufacturing partners, distributors and stockists, healthcare professionals, and job applicants. It is not a pharmacy, not a shop, and not a patient information service."],
      ["02", "No sale, no offer", "Nothing on this site is an offer to sell a medicine to a member of the public. Product listings describe composition and presentation for trade and professional reference. No prices are published. No orders are accepted through this site."],
      ["03", "Prescription medicines", "Products classified under Schedules H, H1 and X of the Drugs and Cosmetics Rules, 1945 are supplied only against the prescription of a registered medical practitioner. Information beyond composition and presentation is restricted to verified healthcare professionals."],
      ["04", "Accuracy", "We take care that information here is correct at the time of publication. Product particulars, pack presentations and partner arrangements change. The approved pack insert and label supplied with the product prevail over anything published here."],
      ["05", "Manufacturing", "USB Pharmaceuticals Pvt. Ltd. is a pharmaceutical marketing company. It does not own or operate a manufacturing facility. All products are manufactured by third-party manufacturing partners holding valid manufacturing licences under the Drugs and Cosmetics Act, 1940."],
      ["06", "Intellectual property", "The USB name, the octagonal monogram, wordmark, artwork and site content are the property of USB Pharmaceuticals Pvt. Ltd. They may not be reproduced or used to imply endorsement without written permission."],
      ["07", "External links", "Where we link to a regulator, partner or third party, we do not control that site and are not responsible for its content."],
      ["08", "Limitation", "To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this site. Nothing here limits liability that cannot lawfully be limited, including for death or personal injury caused by negligence."],
      ["09", "Governing law", "These terms are governed by the laws of India. Courts at [JURISDICTION CITY — TBC] have exclusive jurisdiction."],
    ],
  },
  {
    slug: "disclaimer",
    kicker: "Legal · 03",
    title: "Medical Disclaimer",
    intro:
      "Read this before treating anything on this site as clinical guidance. It is not, and it is not written to be.",
    clauses: [
      ["01", "Not medical advice", "Content on this site is corporate and product-reference information. It is not medical advice, not a diagnosis, and not a recommendation to use, start, stop or change any medicine. It does not replace consultation with a registered medical practitioner."],
      ["02", "Do not self-medicate", "Prescription medicines must be taken only as directed by a registered medical practitioner and dispensed by a registered pharmacist. Self-medication with a prescription product is unsafe, whatever a website appears to describe."],
      ["03", "No indications published", "The public catalogue deliberately omits indications, dosing, efficacy and comparative statements. That omission is a legal requirement under the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954, not an oversight — and it should not be read as suggesting a product is suitable for any particular condition."],
      ["04", "Healthcare professional sections", "Where a section of this site is restricted to healthcare professionals, its content is intended solely for those qualified to interpret it. Proceeding past that confirmation as a member of the public is not a use we can support."],
      ["05", "Pack insert prevails", "The approved package insert and label supplied with the product are the authoritative source for its particulars. Where this site and the pack insert differ, the pack insert prevails."],
      ["06", "Adverse events", "Report a suspected adverse reaction to your prescriber or pharmacist, and to us at [PHARMACOVIGILANCE EMAIL — TBC]. Reports may also be made to the National Coordination Centre, Pharmacovigilance Programme of India."],
      ["07", "Emergencies", "This site is not monitored continuously and must not be used to report a medical emergency. In an emergency, contact a hospital or emergency service immediately."],
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
