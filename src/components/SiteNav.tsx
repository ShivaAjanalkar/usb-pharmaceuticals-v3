"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { asset } from "@/lib/asset";

function isCurrent(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Arrow({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="nav" data-scrolled={scrolled}>
        <div className="shell nav__inner">
          <Link href="/" className="nav__brand" aria-label={`${SITE.name} — home`}>
            <Image
              src={asset("/assets/lifescience-emblem-copper.svg")}
              alt=""
              width={48}
              height={49}
              className="nav__emblem"
              priority
            />
            <Image
              src={asset("/assets/lifescience-wordmark-navy.svg")}
              alt={SITE.name}
              width={160}
              height={34}
              className="nav__wordmark"
              priority
            />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <Link href="/contact/" className="btn btn--navy" style={{ padding: "13px 22px" }}>
              Contact <Arrow />
            </Link>
            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.7" />
                ) : (
                  <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

        <nav className="drawer" id="drawer" aria-label="Mobile navigation" data-open={open} aria-hidden={!open} inert={!open}>
          {NAV.map((item, i) => {
            const current = isCurrent(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {item.label}
                <span>{String(i + 1).padStart(2, "0")}</span>
              </Link>
            );
          })}
        </nav>
    </>
  );
}
