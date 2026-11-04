"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyCatalogueLink() {
  const router = useRouter();
  useEffect(() => { router.replace("/products/"); }, [router]);
  return <p className="lead">Our brand catalogue has been updated. <Link href="/products/">Browse the current portfolio →</Link></p>;
}
