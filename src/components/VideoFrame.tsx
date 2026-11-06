"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { SITE } from "@/data/site";
import { useMotion } from "@/components/MotionProvider";

/** Poster first. Fetch near the viewport; decode only on screen and while motion is enabled. */
export default function VideoFrame({ src, poster, caption, badge, className = "media--wide", playing = true }: {
  src: string; poster: string; caption?: string; badge?: string; className?: string; playing?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled } = useMotion();
  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video) return;
    if (!enabled || !playing || failed) { video.pause(); return; }
    let frame = 0;
    const check = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const visible = document.visibilityState === "visible";
      if (visible && rect.top < window.innerHeight + 200 && rect.bottom > -200) setLoad(true);
      if (load && visible && rect.top < window.innerHeight && rect.bottom > 0) video.play().catch(() => {});
      else video.pause();
    };
    const schedule = () => {
      if (document.visibilityState === "hidden") { if (frame) cancelAnimationFrame(frame); frame = 0; check(); }
      else if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.pause();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [enabled, playing, load, failed]);
  return <div ref={ref} className={`media ${className}`.trim()} style={{ backgroundImage: `url("${asset(poster)}")`, backgroundSize: "cover", backgroundPosition: "center" }}>
    <video ref={videoRef} poster={asset(poster)} muted loop playsInline preload="none"
      aria-label={caption ?? `${SITE.shortName} laboratory`} style={{ opacity: failed ? 0 : 1 }}
      onError={() => setFailed(true)} {...(load ? { src: asset(src) } : {})} />
    {badge && <span className="media__badge">{badge}</span>}
    {caption && <span className="media__caption">{caption}</span>}
  </div>;
}
