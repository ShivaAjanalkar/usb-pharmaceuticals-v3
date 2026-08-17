import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import { asset } from "@/lib/asset";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__cols">
          <div>
            <Image
              src={asset("/assets/usb-horizontal-white.png")}
              alt={SITE.name}
              width={260}
              height={58}
              style={{ width: "min(100%, 240px)", height: "auto", marginBottom: 22 }}
            />
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, maxWidth: "38ch" }}>
              A pharmaceutical marketing company. Products are manufactured by
              licensed third-party manufacturing partners.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.head}>
              <h4>{col.head}</h4>
              <div className="footer__links">
                {col.links.map((link) => (
                  <Link key={link.href + link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer__base">
          <p>
            © {new Date().getFullYear()} {SITE.name} All rights reserved.
            Information on this site is intended for business and professional
            audiences and is not medical advice. Prescription medicines are
            supplied only against a valid prescription from a registered medical
            practitioner.
          </p>
          <Link
            href="/legal/privacy/"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--copper)",
              whiteSpace: "nowrap",
            }}
          >
            Privacy · Terms · Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
