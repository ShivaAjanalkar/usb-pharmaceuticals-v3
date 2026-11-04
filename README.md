# USB Lifescience — v3

The photographic v3 website for **USB Lifescience Pvt. Ltd.**, an Indian
pharmaceutical marketing company. Tagline: **Universal Science for Better Life**.
This rebrand applies to v3; v1 and v2 are separate sites.

Public site: [USB Lifescience](https://usblifescience.com/).
GitHub Pages serves the site at the domain root. The workflow builds without a
repository base path and uses the custom domain for canonical URLs, sitemap and
social images. The repository remains `usb-pharmaceuticals-v3`.

- Office: **+91 99168 62083** ([call](tel:+919916862083)).
- All general, business, partnership, careers and privacy enquiries:
  **[admin@usblifescience.com](mailto:admin@usblifescience.com)**.
- Office address: **#87/87, 1st floor, Pampapathi Road, Near Ashokapuram Railway
  Station, Chikkaharadanahalli 2nd Stage, Jayanagar, Mysore - 570014**.
- CIN and whether this is the statutory registered office: **pending confirmation**.

The enquiry form prepares a `mailto:` email and opens the visitor's email app.
The visitor must review and send it there. There is no backend submission or
sending confirmation, and no response time is promised. No WhatsApp contact is
published.

The catalogue contains **17 confirmed brand names only**. Product specifications
including composition, strength, dosage form, pack size, schedule and manufacturer
details remain pending confirmation; do not infer them from a brand name. Product
data lives in `src/data/products.ts`.

Logo-kit assets are in `public/assets/`. Supplied laboratory stills, video clips
and poster frames are in `public/media/`; imagery does not establish a
manufacturing claim. USB remains a pharmaceutical marketing company working with
third-party manufacturing partners. `VideoFrame` uses poster-first loading,
visibility-aware playback and a still image for reduced motion.

Next.js 16, React 19 and TypeScript; static export to GitHub Pages. Use `npm ci`
and `npm run dev` for local development, and `npm run typecheck` for type checks.
The existing Pages workflow supplies the repository base path and site URL.

Existing launch gaps still require confirmation: product particulars and artwork;
registered address and CIN; state coverage; licences and certification evidence;
legal effective date and jurisdiction; privacy retention periods and
processor details; and a confirmed pharmacovigilance reporting contact. Do not
present the admin inbox as a monitored drug-safety service. The confirmed office
address appears on the contact page, in the footer and in Organization structured
data; the contact page links to an address search in Google Maps.

SEO basics include descriptive page metadata, canonical URLs, a sitemap,
Organization and WebSite JSON-LD on the homepage, and visible structured
breadcrumbs on brand pages. The HCP confirmation and legacy-route pages use
noindex. Search Console ownership verification and sitemap submission are still
external setup steps. Product-specific content requires confirmed particulars;
structured data does not invent offers, reviews, certifications or specifications.

Asset editing details and prompts: [brand-asset-notes](docs/brand-asset-notes.md).
