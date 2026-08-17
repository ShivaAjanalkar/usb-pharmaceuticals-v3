"use client";

import Link from "next/link";
import { Arrow } from "@/components/SiteNav";
import { useHcpVerified } from "@/lib/hcp";

const HCP_FIELDS = [
  "Indications",
  "Dosage and administration",
  "Contraindications",
  "Warnings and precautions",
  "Adverse reactions",
  "Drug interactions",
  "Use in special populations",
  "Pack insert (PDF)",
];

export default function PrescribingPanel({ slug }: { slug: string }) {
  const verified = useHcpVerified();

  return (
    <div
      className="card"
      style={{ position: "sticky", top: 110, boxShadow: "inset 0 0 0 1px var(--line)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: verified ? "var(--copper)" : "var(--mist)",
            color: verified ? "var(--ink)" : "var(--copper)",
            flex: "none",
            fontFamily: "var(--mono)",
            fontSize: 14,
          }}
        >
          {verified ? "✓" : "!"}
        </span>
        <span className="eyebrow" style={{ margin: 0 }}>
          {verified ? "Access granted" : "Restricted section"}
        </span>
      </div>

      <h2 className="display display--s" style={{ margin: "0 0 16px" }}>
        Prescribing information
      </h2>

      {verified ? (
        <>
          <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.65 }}>
            Verified as a healthcare professional. The following fields become
            available once the medical content is written and signed off.
          </p>
          <dl style={{ margin: 0 }}>
            {HCP_FIELDS.map((field) => (
              <div
                key={field}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "13px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <dt style={{ color: "var(--ink)", fontSize: 15.5 }}>{field}</dt>
                <dd className="data dim" style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Pending
                </dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <>
          <p style={{ margin: "0 0 26px", fontSize: 16, lineHeight: 1.65 }}>
            Indications, dosage, contraindications, warnings and interactions are
            available to registered healthcare professionals only. This is a legal
            restriction under the Drugs and Magic Remedies (Objectionable
            Advertisements) Act, 1954 — not a marketing gate.
          </p>
          <Link
            className="btn btn--copper"
            href={{ pathname: "/hcp/", query: { return: `/products/${slug}/` } }}
          >
            Confirm professional status <Arrow />
          </Link>
        </>
      )}
    </div>
  );
}
