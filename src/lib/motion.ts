"use client";

/**
 * Whether an entrance animation is worth arming at all.
 *
 * False when the visitor has asked for reduced motion, and false when the
 * document is not currently visible — an entrance nobody is looking at is
 * pointless, and CSS animations and rAF do not advance in a background tab,
 * so arming one there risks leaving content hidden until the tab is focused.
 */
export function shouldAnimate(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return document.visibilityState === "visible";
}
