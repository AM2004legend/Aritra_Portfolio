import { useEffect, useState } from "react";

/* Tiny client-side router: two pages ("/" and "/certificates"), no dependency. */

const EVENT = "app:navigate";

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(EVENT));
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    window.addEventListener(EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(EVENT, update);
    };
  }, []);
  return path;
}

export const isCertificatesPath = (p: string) => p.replace(/\/+$/, "") === "/certificates";
