"use client";

import { useEffect, useRef, useState } from "react";
import { shouldAnimate } from "@/lib/motion";

/**
 * A stat that counts up once, when it is first scrolled to.
 *
 * The final value is what renders on the server and what appears if the count
 * never runs — the animation is decoration on top of a number that is already
 * correct and already on screen.
 */
export default function Counter({
  value,
  pad = 2,
  suffix = "",
}: {
  value: number;
  pad?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate() || value === 0) return;

    let started = false;
    let raf = 0;

    const run = () => {
      started = true;
      const from = performance.now();
      const ms = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - from) / ms);
        // ease-out cubic, so it decelerates into the final number
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setShown(0);
      raf = requestAnimationFrame(tick);
    };

    const check = () => {
      if (started) return;
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight * 0.9 && bottom > 0) {
        run();
        window.removeEventListener("scroll", check);
      }
    };

    check();
    if (!started) window.addEventListener("scroll", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {String(shown).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
