"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type MotionPreference = { enabled: boolean; reduced: boolean; ready: boolean; toggle: () => void };
const MotionContext = createContext<MotionPreference>({ enabled: false, reduced: false, ready: false, toggle: () => {} });
const STORAGE_KEY = "usb-motion-paused";
export function useMotion() { return useContext(MotionContext); }

/** Motion starts after hydration; server-rendered content is always visible. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    try { setPaused(sessionStorage.getItem(STORAGE_KEY) === "true"); } catch { /* Storage is optional. */ }
    setReady(true);
    preference.addEventListener?.("change", update);
    return () => preference.removeEventListener?.("change", update);
  }, []);
  const enabled = ready && !paused && !reduced;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "playing" : "paused";
    return () => { delete document.documentElement.dataset.motion; };
  }, [enabled]);
  const toggle = useCallback(() => setPaused(previous => {
    const next = !previous;
    try { sessionStorage.setItem(STORAGE_KEY, String(next)); } catch { /* Keep the current-page preference. */ }
    return next;
  }), []);
  const preference = useMemo(() => ({ enabled, reduced, ready, toggle }), [enabled, reduced, ready, toggle]);
  return <MotionContext.Provider value={preference}>{children}<MotionTools /></MotionContext.Provider>;
}

function MotionTools() {
  const { enabled, reduced, ready, toggle } = useMotion();
  const progress = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`;
      setShowTop(window.scrollY > 640);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : undefined;
    observer?.observe(document.body);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <>
    <div className="reading-progress" aria-hidden="true"><div ref={progress} /></div>
    {ready && <div className="motion-tools" role="group" aria-label="Motion and page controls">
      <button type="button" onClick={toggle} disabled={reduced} aria-pressed={!enabled}
        title={reduced ? "Your device has reduced motion enabled" : undefined}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {enabled ? <path d="M4 3h3v10H4zm5 0h3v10H9z" /> : <path d="m5 3 8 5-8 5z" />}
        </svg>
        {reduced ? "Reduced motion" : enabled ? "Pause motion" : "Resume motion"}
      </button>
      {showTop && <button type="button" className="motion-tools__top" aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: enabled ? "smooth" : "auto" })}>
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 16V4m-5 5 5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>}
    </div>}
  </>;
}
