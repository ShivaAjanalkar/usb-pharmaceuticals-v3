"use client";

import { Arrow } from "@/components/SiteNav";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { setHcpVerified } from "@/lib/hcp";
import { asset } from "@/lib/asset";
import { SITE } from "@/data/site";

/** Only same-origin, in-site paths are accepted as a return destination. */
function safeReturn(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/products/";
  return raw;
}

export default function HcpGate() {
  const router = useRouter();
  const params = useSearchParams();
  const back = safeReturn(params.get("return"));

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(120px, 16vh, 180px) var(--gutter) clamp(60px, 8vw, 110px)",
        background: "var(--black)",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 760,
          borderRadius: "var(--card-lg)",
          boxShadow: "inset 0 0 0 1px var(--line)",
          padding: "clamp(28px, 4vw, 56px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(26px, 3vw, 38px)" }}>
          <Image
            src={asset("/assets/lifescience-emblem-copper.svg")}
            alt=""
            width={48}
            height={48}
            style={{ height: 48, width: "auto" }}
          />
          <span className="eyebrow" style={{ margin: 0 }}>
            Healthcare professional verification
          </span>
        </div>

        <h1 className="display display--m" style={{ margin: "0 0 22px", maxWidth: "22ch" }}>
          Are you a registered healthcare professional?
        </h1>

        <p style={{ margin: "0 0 18px", fontSize: 17, lineHeight: 1.65, maxWidth: "62ch" }}>
          The section you requested contains prescribing information for products
          classified under Schedules H, H1 and X of the Drugs and Cosmetics
          Rules, 1945. Indian law restricts this content to registered medical
          practitioners, pharmacists and other qualified healthcare professionals.
        </p>

        <p className="notice" style={{ margin: "0 0 clamp(28px, 3vw, 40px)", fontSize: 12 }}>
          This confirmation cannot be dismissed by clicking outside it. Choose one
          of the two options below.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
          <button
            type="button"
            className="btn btn--copper"
            onClick={() => {
              setHcpVerified(true);
              router.push(back);
            }}
          >
            Yes — I am a healthcare professional <Arrow />
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setHcpVerified(false);
              router.push("/products/");
            }}
          >
            No — take me back <Arrow />
          </button>
        </div>

        <p
          className="data dim"
          style={{ margin: 0, fontSize: 11, lineHeight: 1.85, borderTop: "1px solid var(--line)", paddingTop: 22, maxWidth: "76ch" }}
        >
          Confirming professional status is a self-declaration and is recorded for
          this session only. {SITE.name} does not use this page
          to promote prescription medicines to the public. If you are a patient or
          caregiver, speak to your prescriber or pharmacist.
        </p>
      </div>
    </section>
  );
}
