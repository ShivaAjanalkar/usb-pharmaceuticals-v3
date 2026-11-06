/** Decorative orbital line work, not a chemical structure or product claim. */
export default function ScienceMotif() {
  return <svg className="science-motif" viewBox="0 0 280 220" fill="none" aria-hidden="true" focusable="false">
    <g className="science-motif__orbit">
      {[0, 60, 120].map(angle => <ellipse key={angle} cx="140" cy="110" rx="112" ry="42" transform={`rotate(${angle} 140 110)`} stroke="currentColor" strokeWidth="1" />)}
      <circle cx="252" cy="110" r="5" fill="currentColor" />
      <circle cx="84" cy="13" r="4" fill="currentColor" />
      <circle cx="84" cy="207" r="4" fill="currentColor" />
    </g>
    <circle cx="140" cy="110" r="9" fill="currentColor" />
    <circle cx="140" cy="110" r="20" stroke="currentColor" strokeWidth="1" />
  </svg>;
}
