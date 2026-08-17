import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { LEGAL_DOCS, getLegalDoc } from "@/data/legal";

type Params = { params: Promise<{ doc: string }> };

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { doc } = await params;
  const found = getLegalDoc(doc);
  if (!found) return { title: "Not found" };
  return { title: found.title, description: found.intro };
}

export default async function LegalPage({ params }: Params) {
  const { doc } = await params;
  const found = getLegalDoc(doc);
  if (!found) notFound();

  return (
    <>
      <PageHero tag={found.kicker} title={found.title} sub={found.intro} />

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="shell">
          <div
            className="grid"
            style={{ gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)", gap: "clamp(28px, 4vw, 64px)", alignItems: "start" }}
            data-legal-grid
          >
            <div data-reveal>
              <div className="card" style={{ position: "sticky", top: 110 }}>
                <p className="eyebrow" style={{ marginBottom: 20 }}>
                  Documents
                </p>
                <div style={{ display: "grid", marginBottom: 28 }}>
                  {LEGAL_DOCS.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/legal/${d.slug}/`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        padding: "13px 0",
                        borderTop: "1px solid var(--line)",
                        textDecoration: "none",
                        fontSize: 15.5,
                        color: d.slug === found.slug ? "var(--copper)" : "var(--body)",
                      }}
                    >
                      {d.title}
                      {d.slug === found.slug && <span aria-hidden>●</span>}
                    </Link>
                  ))}
                </div>

                <p className="eyebrow" style={{ marginBottom: 16 }}>
                  On this page
                </p>
                <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                  {found.clauses.map(([n, heading]) => (
                    <li key={n} style={{ display: "grid", gridTemplateColumns: "30px minmax(0, 1fr)", gap: 8 }}>
                      <span className="data" style={{ color: "var(--copper-deep)", fontSize: 11 }}>
                        {n}
                      </span>
                      <a href={`#clause-${n}`} style={{ color: "var(--body)", textDecoration: "none", fontSize: 14.5, lineHeight: 1.45 }}>
                        {heading}
                      </a>
                    </li>
                  ))}
                </ol>

                <p className="data dim" style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid var(--line)", fontSize: 11, lineHeight: 1.85 }}>
                  Version 0.1 · draft
                  <br />
                  Effective [DATE — TBC]
                  <br />
                  Owner [LEGAL CONTACT — TBC]
                </p>
              </div>
            </div>

            <div>
              {found.clauses.map(([n, heading, body]) => (
                <article
                  key={n}
                  id={`clause-${n}`}
                  data-reveal
                  style={{
                    paddingBottom: "clamp(26px, 3vw, 40px)",
                    marginBottom: "clamp(26px, 3vw, 40px)",
                    borderBottom: "1px solid var(--line)",
                    scrollMarginTop: 120,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 14 }}>
                    <span className="data" style={{ color: "var(--copper-deep)", flex: "none" }}>
                      {n}
                    </span>
                    <h2 className="display display--s" style={{ margin: 0, textTransform: "none", letterSpacing: "-0.03em" }}>
                      {heading}
                    </h2>
                  </div>
                  <p style={{ margin: 0, maxWidth: "70ch", fontSize: 17, lineHeight: 1.72 }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
