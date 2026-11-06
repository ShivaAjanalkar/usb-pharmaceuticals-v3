"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useMotion } from "@/components/MotionProvider";
import { observeReveals } from "@/lib/reveal";

export default function Reveal({ children, as: Tag = "div", className = "", self = false, intro = false }: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  self?: boolean;
  intro?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { enabled } = useMotion();
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return observeReveals(ref.current, intro, self);
  }, [enabled, intro, self]);
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
