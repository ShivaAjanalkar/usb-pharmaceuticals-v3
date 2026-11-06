"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconSearch } from "@/components/icons";
import { LETTERS, PRODUCTS } from "@/data/products";
import Reveal from "@/components/Reveal";

export default function Catalogue() {
  const [letter, setLetter] = useState("All");
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const search = query.trim().toLocaleLowerCase().replace(/[\s-]+/g, "");
    return PRODUCTS.filter((p) =>
      (letter === "All" || p.letter === letter) &&
      (!search || `${p.brand} ${p.composition}`.toLocaleLowerCase().replace(/[\s-]+/g, "").includes(search)),
    );
  }, [letter, query]);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="filters" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
          <div className="filters__field">
            <IconSearch size={18} />
            <input type="search" className="search" value={query}
              placeholder="Search brands or compositions…" aria-label="Search brands or compositions"
              onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="chips" role="group" aria-label="Filter by first letter" style={{ marginTop: 20 }}>
            {["All", ...LETTERS].map((option) => (
              <button key={option} type="button" className="chip"
                aria-pressed={letter === option} onClick={() => setLetter(option)}>
                {option}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
            <span className="data" role="status" aria-live="polite">{rows.length} of {PRODUCTS.length} brands</span>
            <button type="button" className="chip" onClick={() => { setLetter("All"); setQuery(""); }}>Reset filters</button>
          </div>
        </div>
        {rows.length ? (
          <Reveal key={`${letter}:${query}`} as="ul" className="grid grid--3 catalogue-grid" intro>
            {rows.map((product) => (
              <li key={product.slug} data-reveal>
                <Link href={`/products/${product.slug}/`} className="card card--lift brand-card"
                  style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", gap: 20 }}>
                  <span className="card__icon" aria-hidden="true" style={{ fontFamily: "var(--sans)", fontSize: 28, fontWeight: 300 }}>{product.letter}</span>
                  <h2 style={{ fontSize: "clamp(21px, 2.3vw, 28px)", fontWeight: 400, lineHeight: 1.35, margin: 0, overflowWrap: "anywhere" }}>{product.brand}</h2>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, overflowWrap: "anywhere" }}>{product.composition}</p>
                  <span style={{ marginTop: "auto", color: "var(--copper-deep)", fontSize: 14 }}>View brand <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </Reveal>
        ) : (
          <p className="card" style={{ padding: "48px 24px", textAlign: "center" }}>No brands match these filters. Reset to see all {PRODUCTS.length} brands.</p>
        )}
      </div>
    </section>
  );
}
