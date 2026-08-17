"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * A contained, muted, looping video of USB's own laboratory.
 *
 * Three deliberate choices:
 *
 * 1. **The poster renders first and always.** The `<video>` only gets a source
 *    once the frame is near the viewport, so a page with several clips does
 *    not pull megabytes before anything is on screen — and if the video never
 *    loads, a real still frame stands in rather than a grey box.
 * 2. **It plays only while visible**, so the browser is never decoding three
 *    clips at once, and pauses when the tab is hidden.
 * 3. **Reduced motion gets the poster only.** No fetch, no autoplay; the still
 *    carries the same information.
 *
 * Deliberately not IntersectionObserver. IO reports nothing at all in a hidden
 * document and only fires on threshold crossings, so a frame scrolled past in
 * one jump never loads — the same blind spot that stranded scroll-reveals on
 * the earlier builds. A rAF-throttled scroll check cannot miss.
 *
 * `muted` and `playsInline` are both required for autoplay to be permitted at
 * all under iOS and Chrome's autoplay policies.
 */
export default function VideoFrame({
  src,
  poster,
  caption,
  badge,
  className = "media--wide",
}: {
  src: string;
  poster: string;
  caption?: string;
  badge?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const near = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 200 && r.bottom > -200;
    };

    const check = () => {
      frame = 0;
      // Fetch as soon as the frame is near — a clip the reader is about to
      // reach is worth having ready even if the tab is momentarily hidden.
      const inRange = near();
      if (inRange) setLoad(true);

      // Playback, unlike loading, waits for the tab to actually be on screen.
      const video = videoRef.current;
      if (!video || !video.getAttribute("src")) return;
      if (inRange && document.visibilityState === "visible") {
        video.play().catch(() => {
          /* autoplay refused — the poster stands in */
        });
      } else if (!video.paused) {
        video.pause();
      }
    };

    const schedule = () => {
      if (frame) return;
      // rAF is suspended in a hidden document, so aligning to a paint that
      // will never come would strand the check. There is nothing to align to
      // when hidden anyway — run it straight away.
      if (document.visibilityState === "hidden") {
        check();
        return;
      }
      frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  // Once a source is attached, start it without waiting for the next scroll.
  useEffect(() => {
    if (!load) return;
    videoRef.current?.play().catch(() => {});
  }, [load]);

  return (
    <div ref={ref} className={`media ${className}`.trim()}>
      <video
        ref={videoRef}
        poster={asset(poster)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={caption ?? "USB Pharmaceuticals laboratory"}
        {...(load ? { src: asset(src) } : {})}
      />
      {badge && <span className="media__badge">{badge}</span>}
      {caption && <span className="media__caption">{caption}</span>}
    </div>
  );
}
