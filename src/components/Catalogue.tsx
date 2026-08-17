"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconSearch, SegmentIcon } from "@/components/icons";
import { CATEGORIES, FORMS, LETTERS, PRODUCTS } from "@/data/products";

const ALL = "All";

export default function Catalogue() {
  const [category, setCategory] = useState<string>(ALL);
  const [form, setForm] = useState<string>(ALL);
  const [letter, setLetter] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === ALL || p.category === category) &&
        (form === ALL || p.form === form) &&
        (letter === ALL || p.letter === letter) &&
        (!q ||
          p.brand.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.form.toLowerCase().includes(q)),
    );
  }, [category, form, letter, query]);

  const reset = () => {
    setCategory(ALL);
    setForm(ALL);
    setLetter(ALL);
    setQuery("");
  };

  const row = (
    label: string,
    value: string,
    options: readonly string[],
    onSelect: (v: string) => void,
  ) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 12,
        paddingTop: 20,
        marginTop: 20,
        borderTop: "1px solid var(--line)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <div className="chips">
        {[ALL, ...options].map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={value === option}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="filters" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
          <div className="filters__field">
            <IconSearch size={16} />
            <input
              type="search"
              className="search"
              value={query}
              placeholder="Search brand, composition, category…"
              aria-label="Search the catalogue"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {row("Category", category, CATEGORIES, setCategory)}
          {row("Dosage form", form, FORMS, setForm)}
          {row("A–Z", letter, LETTERS, setLetter)}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid var(--line)",
              marginTop: 20,
              paddingTop: 18,
            }}
          >
            <span className="data" role="status" aria-live="polite">
              {String(rows.length).padStart(2, "0")} of{" "}
              {String(PRODUCTS.length).padStart(2, "0")} records
            </span>
            <button
              type="button"
              className="chip"
              onClick={reset}
              style={{ borderColor: "var(--line)", color: "var(--copper-deep)" }}
            >
              Reset filters
            </button>
          </div>
        </div>

        <div className="ptable-wrap ptable">
          <table>
            <caption
              style={{
                captionSide: "top",
                textAlign: "left",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--muted)",
                padding: "18px 20px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              Permitted fields only — no indications, efficacy claims or pricing
            </caption>
            <thead>
              <tr>
                <th style={{ width: 70 }}>#</th>
                <th>Brand</th>
                <th>Composition</th>
                <th>Form</th>
                <th>Pack</th>
                <th>Category</th>
                <th>Schedule</th>
                <th style={{ textAlign: "right" }}>Record</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--copper-deep)" }}>
                        <SegmentIcon category={p.category} size={20} />
                        {p.letter}
                      </span>
                    </td>
                    <td style={{ color: "var(--ink)" }}>{p.brand}</td>
                    <td style={{ minWidth: 260 }}>{p.composition}</td>
                    <td>{p.form}</td>
                    <td>{p.pack}</td>
                    <td>{p.category}</td>
                    <td>
                      <span className="tagpill" data-otc={p.schedule === "Non-scheduled"}>
                        {p.schedule}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link href={`/products/${p.slug}/`}>
                        {p.id} <span>→</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: "64px 20px", textAlign: "center" }}>
                    No records match these filters. Reset to see all {PRODUCTS.length}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pcards">
          {rows.map((p) => (
            <Link className="pcard" key={p.id} href={`/products/${p.slug}/`}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink)", fontSize: 18, fontWeight: 500 }}>
                  <SegmentIcon category={p.category} size={22} className="segment-icon" />
                  {p.brand}
                </span>
                <span className="data" style={{ color: "var(--copper-deep)" }}>
                  {p.id}
                </span>
              </div>
              <p className="data" style={{ margin: 0 }}>
                {p.composition}
              </p>
              <dl style={{ margin: 0, display: "grid", gap: 8, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                {([["Form", p.form], ["Pack", p.pack], ["Category", p.category], ["Schedule", p.schedule]] as const).map(
                  ([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <dt className="data dim" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        {k}
                      </dt>
                      <dd className="data" style={{ margin: 0, textAlign: "right" }}>
                        {v}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
