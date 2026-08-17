"use client";

import { useEffect, useState } from "react";

const KEY = "usb.hcp.verified";

/**
 * Professional status is a self-declaration held for the browser session
 * only — never persisted, never used to identify a visitor.
 */
export function setHcpVerified(value: boolean) {
  try {
    if (value) sessionStorage.setItem(KEY, "1");
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage disabled — the gate simply re-asks */
  }
  window.dispatchEvent(new Event("usb:hcp"));
}

export function useHcpVerified(): boolean | null {
  // null until the client has read sessionStorage, so the server render and
  // the first client render agree.
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        setVerified(sessionStorage.getItem(KEY) === "1");
      } catch {
        setVerified(false);
      }
    };
    read();
    window.addEventListener("usb:hcp", read);
    return () => window.removeEventListener("usb:hcp", read);
  }, []);

  return verified;
}
