/**
 * The icon system.
 *
 * Every mark is drawn on a 48 grid from 90° and 45° lines and true circles —
 * the same vocabulary as the octagonal monogram. Strokes are 1.5, joins are
 * mitred and caps are butt, because nothing in this identity has a rounded
 * corner. Colour comes from `currentColor`, so an icon inherits whatever
 * context it sits in.
 *
 * These replace photography rather than decorate it: the company has no
 * facility to photograph and no product to shoot, so the graphic system
 * carries the page.
 */

import type { Category, DosageForm } from "@/data/products";

type IconProps = { size?: number; className?: string };

const svgProps = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "butt" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
  className,
});

/** The 48-grid octagon, inset 4. */
const OCT = "M16 4H32L44 16V32L32 44H16L4 32V16Z";

// ── therapeutic segment marks ──────────────────────────────────────────────

/** Ovulation-modulating — a follicle: octagon, ring, nucleus. */
function IconOvulation({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d={OCT} />
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Prolactin-modulating — a peak brought back down to baseline. */
function IconProlactin({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M4 32h8l5-18 5 18h4" />
      <path d="M30 32h14" />
      <path d="M37 17v11" />
      <path d="M33 24l4 4 4-4" />
    </svg>
  );
}

/** Combined hormonal preparations — two octagons in combination. */
function IconCombined({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M11 10H21L28 17V27L21 34H11L4 27V17Z" />
      <path d="M27 14H37L44 21V31L37 38H27L20 31V21Z" />
    </svg>
  );
}

/** Progestogens — a single octagon, bisected. */
function IconProgestogen({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d={OCT} />
      <path d="M4 24h40" />
      <circle cx="24" cy="15" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Oestrogen preparations — three fused cells, a steroid skeleton abstracted. */
function IconOestrogen({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M8 17H14L18 21V27L14 31H8L4 27V21Z" />
      <path d="M21 17H27L31 21V27L27 31H21L17 27V21Z" />
      <path d="M34 17H40L44 21V27L40 31H34L30 27V21Z" />
    </svg>
  );
}

/** Antifibrinolytics & antispasmodics — a lattice, held. */
function IconLattice({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M14 8H34L40 14V34L34 40H14L8 34V14Z" />
      <path d="M8 24h32" />
      <path d="M24 8v32" />
      <path d="M12 36L36 12" />
    </svg>
  );
}

/** Nutraceuticals — a node cluster. */
function IconNutraceutical({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <circle cx="24" cy="24" r="4" />
      <circle cx="24" cy="8" r="2.5" />
      <circle cx="40" cy="24" r="2.5" />
      <circle cx="24" cy="40" r="2.5" />
      <circle cx="8" cy="24" r="2.5" />
      <path d="M24 10.5v9.5" />
      <path d="M28 24h9.5" />
      <path d="M24 28v9.5" />
      <path d="M10.5 24H20" />
    </svg>
  );
}

/** Combination kits — two plates issued together. */
function IconKit({ size = 48, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)}>
      <path d="M12 6H30L36 12V20L30 26H12L6 20V12Z" />
      <path d="M18 22H36L42 28V36L36 42H18L12 36V28Z" />
      <path d="M27 28v8" />
      <path d="M23 32h8" />
    </svg>
  );
}

const SEGMENT_ICONS: Record<Category, (p: IconProps) => React.ReactElement> = {
  "Ovulation-modulating agents": IconOvulation,
  "Prolactin-modulating agents": IconProlactin,
  "Combined hormonal preparations": IconCombined,
  Progestogens: IconProgestogen,
  "Oestrogen preparations": IconOestrogen,
  "Antifibrinolytics & antispasmodics": IconLattice,
  Nutraceuticals: IconNutraceutical,
  "Combination kits": IconKit,
};

export function SegmentIcon({
  category,
  size = 48,
  className,
}: { category: Category } & IconProps) {
  const Mark = SEGMENT_ICONS[category];
  return <Mark size={size} className={className} />;
}

// ── interface marks ────────────────────────────────────────────────────────

export function IconSearch({ size = 16, className }: IconProps) {
  return (
    <svg {...svgProps(size, className)} viewBox="0 0 24 24" strokeWidth={1.8}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

/** Two rules that cross into an X when the panel is open. */
export function IconMenu({ open, size = 16 }: { open: boolean } & IconProps) {
  return (
    <svg
      {...svgProps(size, "icon-menu")}
      viewBox="0 0 24 24"
      strokeWidth={2}
      data-open={open}
    >
      <path className="icon-menu__top" d="M3 8h18" />
      <path className="icon-menu__bottom" d="M3 16h18" />
    </svg>
  );
}

// ── pack diagram ───────────────────────────────────────────────────────────

/** Blisters read best in fives, or in sevens when the course runs in weeks. */
function columnsFor(units: number): number {
  if (units <= 5) return units;
  return units % 7 === 0 ? 7 : 5;
}

/**
 * A blister card drawn from the product's own pack data — the number of wells
 * is the number of units, and the well shape follows the dosage form. It is a
 * diagram, not a photograph, and is captioned as one.
 */
export function PackDiagram({
  units,
  form,
  className,
}: {
  units: number;
  form: DosageForm;
  className?: string;
}) {
  const CELL = 22;
  const PAD = 15;
  const isKit = form === "Combi-kit";
  const cols = isKit ? 5 : columnsFor(units);
  const rows = isKit ? 1 : Math.ceil(units / cols);
  const width = cols * CELL + PAD * 2;
  const height = rows * CELL + PAD * 2;
  const chamfer = 10;

  const card = [
    `M${chamfer} 0`,
    `H${width - chamfer}`,
    `L${width} ${chamfer}`,
    `V${height - chamfer}`,
    `L${width - chamfer} ${height}`,
    `H${chamfer}`,
    `L0 ${height - chamfer}`,
    `V${chamfer}`,
    "Z",
  ].join(" ");

  const wells = Array.from({ length: units }, (_, i) => {
    const col = isKit ? i : i % cols;
    const row = isKit ? 0 : Math.floor(i / cols);
    const cx = PAD + col * CELL + CELL / 2;
    const cy = PAD + row * CELL + CELL / 2;

    // The kit's first well holds the larger tablet, so it is drawn larger.
    if (isKit && i === 0) return <circle key={i} cx={cx} cy={cy} r={8.5} />;
    if (form === "Softgel capsule")
      return <ellipse key={i} cx={cx} cy={cy} rx={5} ry={7.5} />;
    return <circle key={i} cx={cx} cy={cy} r={6.5} />;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      strokeLinejoin="miter"
      strokeLinecap="butt"
      role="img"
      aria-label={`Pack diagram: ${units} ${
        form === "Softgel capsule" ? "capsules" : "tablets"
      } per pack`}
    >
      <path d={card} stroke="var(--ink)" strokeWidth={1.5} />
      <g stroke="var(--gold-deep)" strokeWidth={1.5}>
        {wells}
      </g>
      {isKit && (
        <path
          d={`M${PAD + CELL} ${PAD - 4}V${height - PAD + 4}`}
          stroke="var(--ink)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      )}
    </svg>
  );
}
