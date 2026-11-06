"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/MotionProvider";
import VideoFrame from "@/components/VideoFrame";
import { asset } from "@/lib/asset";
import { SITE } from "@/data/site";

const SLIDES = [
  { title: "Quality in focus", image: "/media/lifescience-lab-01.webp", alt: `Analysts at work in the ${SITE.shortName} quality-control laboratory` },
  { title: "Science at work", image: "/media/lab-analysis-poster.jpg", video: "/media/lab-analysis.mp4", alt: `Analytical work in the ${SITE.shortName} laboratory` },
  { title: "Dedicated to life", image: "/media/lifescience-lab-02.webp", alt: `Sample preparation in the ${SITE.shortName} laboratory` },
];

export default function LabShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const { enabled } = useMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const playing = enabled && !paused && !hovered && !focused && visible && inView;
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update(); document.addEventListener("visibilitychange", update);
    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting)) : undefined;
    if (root.current) observer?.observe(root.current);
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % SLIDES.length), 7000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  const select = (index: number) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    setActive(next); setAnnouncement(`Slide ${next + 1} of ${SLIDES.length}: ${SLIDES[next].title}`);
  };
  return <div ref={root} className="lab-showcase" role="region" aria-roledescription="carousel" aria-label="Inside the USB Lifescience laboratory"
    data-playing={playing} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="lab-showcase__frames" id="laboratory-slides">
      {SLIDES.map((slide, index) => <div key={slide.image} className="lab-showcase__slide" data-active={index === active}
        aria-hidden={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${SLIDES.length}: ${slide.title}`}>
        {slide.video && index === active
          ? <VideoFrame src={slide.video} poster={slide.image} className="lab-showcase__video" playing={playing} />
          : <Image src={asset(slide.image)} alt={slide.alt} width={1536} height={1024} priority={index === 0} sizes="(max-width: 720px) 100vw, 50vw" />}
      </div>)}
    </div>
    <div className="lab-showcase__top"><span className="media__badge">USB laboratory</span>
      <button type="button" className="lab-showcase__pause" onClick={() => { if (paused) { setHovered(false); setFocused(false); } setPaused(value => !value); }} disabled={!enabled}
        aria-label={paused ? "Play laboratory slideshow" : "Pause laboratory slideshow"} aria-pressed={paused} aria-controls="laboratory-slides">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused || !enabled ? <path d="m5 3 8 5-8 5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}</svg>
      </button>
    </div>
    <div className="lab-showcase__bottom">
      <div><span className="lab-showcase__index">0{active + 1} / 0{SLIDES.length}</span><p>{SLIDES[active].title}</p></div>
      <div className="lab-showcase__controls" role="group" aria-label="Choose a laboratory slide">
        <button type="button" onClick={() => select(active - 1)} aria-label="Previous laboratory slide">←</button>
        {SLIDES.map((slide, index) => <button key={slide.title} type="button" className="lab-showcase__dot"
          onClick={() => select(index)} aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={active === index ? "true" : undefined} />)}
        <button type="button" onClick={() => select(active + 1)} aria-label="Next laboratory slide">→</button>
      </div>
    </div>
    <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
  </div>;
}
