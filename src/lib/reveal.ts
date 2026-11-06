/** Animate only on entry. No hidden CSS state can strand an unvisited element. */
export function observeReveals(root: HTMLElement, intro: boolean, self: boolean): () => void {
  const candidates = self ? [root] : [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
  const targets = candidates.filter(target => !candidates.some(other => other !== target && other.contains(target)));
  const animations = new Set<Animation>();
  const seen = new Set<HTMLElement>();
  let observer: IntersectionObserver | undefined;
  const reveal = (target: HTMLElement, index: number) => {
    seen.add(target); observer?.unobserve(target);
    if (document.visibilityState !== "visible" || typeof target.animate !== "function") return;
    const animation = target.animate([
      { opacity: 0, transform: "translate3d(0, 28px, 0)" },
      { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ], { duration: 820, delay: Math.min(index * 75, 225), easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
    animations.add(animation);
    animation.onfinish = () => animations.delete(animation);
  };
  if (typeof IntersectionObserver === "function") {
    observer = new IntersectionObserver(entries => {
      let index = 0;
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (!entry.isIntersecting || seen.has(target)) continue;
        if (entry.boundingClientRect.bottom <= 0) { seen.add(target); observer?.unobserve(target); continue; }
        reveal(target, index++);
      }
    }, { threshold: 0, rootMargin: "0px 0px -7% 0px" });
  }
  let initialIndex = 0;
  for (const target of targets) {
    const rect = target.getBoundingClientRect();
    if (rect.bottom <= 0) { seen.add(target); continue; }
    if (rect.top < window.innerHeight * 0.93) {
      if (intro) reveal(target, initialIndex++); else seen.add(target);
    } else observer?.observe(target);
  }
  const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
  const onVisibility = () => { if (document.visibilityState === "hidden") cancel(); };
  document.addEventListener("visibilitychange", onVisibility);
  return () => { observer?.disconnect(); cancel(); document.removeEventListener("visibilitychange", onVisibility); };
}
