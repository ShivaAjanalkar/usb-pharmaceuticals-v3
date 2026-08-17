# USB Pharmaceuticals — v3, the photographic edition

The **third** independent website for USB Pharmaceuticals Pvt. Ltd., hosted
separately from v1 and v2. Same company, same product data, a third visual
register — and the first of the three built around real photography and video
of USB's own laboratory.

| | v1 — light | v2 — dark | **v3 — this site** |
|---|---|---|---|
| Ground | Paper `#FCFCFA` | Near-black `#111111` | Warm off-white `#F4F4F2` |
| Geometry | 45° chamfers, no round corners | Pills + one asymmetric corner | Very soft — 160px pills, 32px cards |
| Display type | Instrument Sans 600, tight | Boldonse, −6% tracking | Montserrat **200**, +2% tracking |
| Imagery | Drawn graphic system only | Drawn graphic system only | **Laboratory photography and video** |
| Register | Meticulous, quiet | Editorial, bold | Calm, clinical, warm |

## Provenance

Structure derived from the **Loguna** Webflow template (a healthcare-practice
layout), studied at `https://loguna.webflow.io/`. No markup, CSS, JavaScript or
assets from the template are used — it is rebuilt from scratch in Next.js. The
palette is USB's own: deep navy `#022D3D` in place of the template's forest
green, copper `#CDA665` in place of its olive.

Sections **not** carried over, because a regulated pharmaceutical company
cannot honestly fill them:

| Template section | Why not |
|---|---|
| "30+ years · 50K+ patients · 98% satisfaction" | Fabricated metrics. Replaced with four true numbers, including `00` certifications held |
| Named patient testimonials | Invented people. Replaced with the FAQ partners actually ask |
| "Meet the founder" | Founder content was removed from all three sites |
| Pricing plans | Publishing pharmaceutical pricing to the public is not permitted in India |
| Patient-facing service menu | USB is a B2B marketing company, not a clinic. Replaced with its five real capabilities |

## Media

Photography and video in `public/media/` are USB's own, supplied by the
company. Two stills of the laboratory and three clips of analytical work.

Two things worth knowing about how they are handled:

- **Nothing claims USB manufactures.** USB operates a **quality-control
  laboratory**; it does not own a manufacturing plant. Those are different
  facts and the site keeps them apart — every product record still carries
  "USB does not own or operate a manufacturing facility", and the laboratory
  imagery is captioned as the laboratory, never as a production site.
- **Source clips are 848×478**, so they are always placed in contained,
  rounded frames and never stretched full-bleed, where they would go soft.

`VideoFrame` handles playback:

1. A **poster frame renders first and always**; the `<video>` only receives a
   source when the frame is near the viewport, so the page does not pull
   megabytes up front — and if a clip never loads, a real still stands in.
2. It **plays only while on screen and the tab is visible**, so the browser is
   never decoding three clips at once.
3. **Reduced motion gets the poster only** — no fetch, no autoplay.

It deliberately does **not** use `IntersectionObserver`: IO reports nothing at
all in a hidden document and only fires on threshold crossings, so a frame
scrolled past in one jump never loads. It also does not blindly trust
`requestAnimationFrame`, which is suspended in a hidden document — when the
page is hidden the check runs synchronously instead. Both of these were caught
in testing, not in theory.

## Stack

Next.js 16 (App Router, React 19), TypeScript, hand-authored CSS, static export
to GitHub Pages. No runtime dependencies beyond React.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Unchanged from the other two

The skin changed; the constraints did not. Product data lives in
`src/data/products.ts`, whose `Product` type has no field for an indication, a
dose or a price. Therapeutic categories are named pharmacologically rather than
by indication (s.3, Drugs and Magic Remedies Act, 1954). Prescribing
information sits behind a non-dismissable HCP gate. No certification badges are
rendered anywhere. Undecided values render as visible `[BRACKETED]` slots. And
product particulars stay in monospace — a composition string is data, so it
looks like data in this skin too.
