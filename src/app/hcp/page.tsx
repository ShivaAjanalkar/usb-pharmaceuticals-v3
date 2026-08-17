import type { Metadata } from "next";
import { Suspense } from "react";
import HcpGate from "@/components/HcpGate";

export const metadata: Metadata = {
  title: "Healthcare professional verification",
  description:
    "Prescribing information for Schedule H, H1 and X products is restricted to registered healthcare professionals under Indian law.",
  robots: { index: false },
};

export default function HcpPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "70vh" }} />}>
      <HcpGate />
    </Suspense>
  );
}
