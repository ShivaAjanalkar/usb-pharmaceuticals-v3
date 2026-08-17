"use client";

import { useState } from "react";

export type AccordionItem = { q: string; a: string };

/**
 * FAQ accordion. The panel animates via `grid-template-rows: 0fr → 1fr`, so it
 * sizes to its own content without measuring anything in JavaScript.
 *
 * Panels stay in the DOM and are hidden with `inert` rather than unmounted, so
 * the answers remain in the page source for search engines and for anyone
 * reading with JavaScript off.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;
        return (
          <div className="acc__item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="acc__n">{String(i + 1).padStart(2, "0")}.</span>
                <span className="acc__q">{item.q}</span>
                <span className="acc__sign" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </button>
            </h3>
            <div className="acc__panel" id={id} data-open={isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
