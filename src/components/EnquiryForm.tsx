"use client";

import { Arrow } from "@/components/SiteNav";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";

const TYPES = ["General", "Business", "Partnership", "Careers"] as const;
type EnquiryType = (typeof TYPES)[number];

const INBOX: Record<EnquiryType, string> = {
  General: "info",
  Business: "business",
  Partnership: "partners",
  Careers: "careers",
};

/**
 * The site is statically hosted and has no server to receive a POST. Rather
 * than fake a submission, the form composes the enquiry and hands it to the
 * visitor's mail client, addressed to the inbox that owns the enquiry type.
 */
export default function EnquiryForm() {
  const [type, setType] = useState<EnquiryType>("General");
  const [handed, setHanded] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const to = `${INBOX[type]}@${SITE.domain}`;
    const subject = `${type} enquiry — ${data.get("name") || "website"}`;
    const body = [
      `Enquiry type: ${type}`,
      `Name: ${data.get("name")}`,
      `Organisation: ${data.get("organisation") || "—"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setHanded(to);
  }

  return (
    <div className="card" style={{ padding: "clamp(26px, 3vw, 44px)" }}>
      <p className="eyebrow" style={{ marginBottom: 20 }}>
        Enquiry form
      </p>
      <h2 className="display display--s" style={{ margin: "0 0 28px" }}>
        Send us something specific
      </h2>

      {handed ? (
        <div
          style={{
            borderRadius: "var(--card)",
            border: "1px solid var(--line)",
            padding: "clamp(24px, 3vw, 34px)",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            Handed to your mail client
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 16.5, lineHeight: 1.65 }}>
            Your enquiry has been composed and addressed to{" "}
            <span className="data" style={{ color: "var(--copper-deep)" }}>
              {handed}
            </span>
            . Send it from your mail client and a named person replies within two
            working days — not an autoresponder.
          </p>
          <button type="button" className="chip" onClick={() => setHanded(null)}>
            Write another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 20 }}>
          <div className="field">
            <label htmlFor="enquiry-type">Enquiry type</label>
            <div className="chips" id="enquiry-type">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="chip"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid--2" style={{ gap: 20 }}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input className="control" id="name" name="name" type="text" required placeholder="Full name" />
            </div>
            <div className="field">
              <label htmlFor="organisation">Organisation</label>
              <input className="control" id="organisation" name="organisation" type="text" placeholder="Company or institution" />
            </div>
          </div>

          <div className="grid grid--2" style={{ gap: 20 }}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input className="control" id="email" name="email" type="email" required placeholder="name@company.com" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input className="control" id="phone" name="phone" type="tel" placeholder="+91" style={{ fontFamily: "var(--mono)", fontSize: 15 }} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea className="control" id="message" name="message" rows={5} required placeholder="What do you need from us, and by when?" />
            <span className="data dim" style={{ fontSize: 11 }}>
              Plain detail is more useful than a formal letter
            </span>
          </div>

          <label style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.6 }}>
            <input
              type="checkbox"
              required
              style={{ marginTop: 4, width: 17, height: 17, accentColor: "var(--copper)", flex: "none" }}
            />
            <span>
              I understand this form is not for reporting a medical emergency or
              seeking medical advice.
            </span>
          </label>

          <button type="submit" className="btn btn--copper" style={{ justifySelf: "start" }}>
            Send enquiry <Arrow />
          </button>
        </form>
      )}
    </div>
  );
}
