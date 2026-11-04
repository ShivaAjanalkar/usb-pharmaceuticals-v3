"use client";

import { Arrow } from "@/components/SiteNav";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";

const TYPES = ["General", "Business", "Partnership", "Careers"] as const;
type EnquiryType = (typeof TYPES)[number];

/**
 * The static site prepares a mailto link for the shared admin inbox.
 * The visitor must send the enquiry from their own email app.
 */
export default function EnquiryForm() {
  const [type, setType] = useState<EnquiryType>("General");
  const [prepared, setPrepared] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <div className="card" style={{ padding: "clamp(26px, 3vw, 44px)" }}>
      <p className="eyebrow" style={{ marginBottom: 20 }}>
        Enquiry form
      </p>
      <h2 className="display display--s" style={{ margin: "0 0 18px" }}>
        Prepare your enquiry
      </h2>
      <p style={{ margin: "0 0 28px", fontSize: 16.5, lineHeight: 1.65 }}>
        This form opens your email app with an enquiry addressed to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Review and send it
        there. Filling out this form does not send an enquiry.
      </p>

      {prepared && (
        <div
          style={{
            borderRadius: "var(--card)",
            border: "1px solid var(--line)",
            padding: "clamp(24px, 3vw, 34px)",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            Enquiry prepared
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 16.5, lineHeight: 1.65 }}>
            If your email app opened, review and send the enquiry there. This
            website has not sent it. If nothing opened, email{" "}
            <a href={`mailto:${SITE.email}`} className="data" style={{ color: "var(--copper-deep)" }}>
              {SITE.email}
            </a>
            {" "}directly. You can return to the form to copy your details.
          </p>
          <button type="button" className="chip" onClick={() => setPrepared(false)}>
            Return to form
          </button>
        </div>
      )}
      <form onSubmit={onSubmit} style={{ display: prepared ? "none" : "grid", gap: 20 }}>
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
          Open email app <Arrow />
        </button>
      </form>
    </div>
  );
}
