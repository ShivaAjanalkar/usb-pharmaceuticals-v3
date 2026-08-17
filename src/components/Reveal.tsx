"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { shouldAnimate } from "@/lib/motion";

/**
 * Scroll entrance for a block and, optionally, its `[data-reveal]` children.
 *
 * Two rules carried over from the light build, both about never losing content:
 *
 * 1. The block renders visible. JavaScript *arms* the hidden state, and only
 *    for blocks currently below the fold — so no-JS, reduced-motion and
 *    background-tab loads all show everything.
 * 2. Not IntersectionObserver. IO notifies on threshold crossings, so a jump
 *    that carries a block from below the fold to above it in one frame — an
 *    anchor, a restored scroll position, a fast flick — produces no callback
 *    and would strand it invisible. A scroll check cannot miss.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  self = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate the wrapper itself rather than its `[data-reveal]` children. */
  self?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Index children so CSS can stagger them.
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      child.style.setProperty("--i", String(i));
    });
    el.querySelectorAll<HTMLElement>(".split > span").forEach((word, i) => {
      word.style.setProperty("--i", String(i));
    });

    const inRange = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.88;

    if (!shouldAnimate() || inRange()) return;

    el.dataset.armed = "true";

    let frame = 0;
    let done = false;

    const show = () => {
      done = true;
      el.dataset.shown = "true";
      detach();
    };
    const check = () => {
      frame = 0;
      if (!done && inRange()) show();
    };
    const schedule = () => {
      if (done || frame) return;
      frame = requestAnimationFrame(check);
    };
    // A queued entrance must never become a stuck one.
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && !done) show();
    };
    function detach() {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibility);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      detach();
    };
  }, []);

  return (
    <Tag ref={ref} className={self ? `reveal ${className}`.trim() : className}>
      {children}
    </Tag>
  );
}
