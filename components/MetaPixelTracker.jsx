"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MAX_RETRIES = 50;

export default function MetaPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const trackPageView = () => {
      if (typeof window.fbq === "function") {
        window.fbq("track", "PageView");
      }
    };

    if (typeof window.fbq === "function") {
      trackPageView();
      return;
    }

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;

      if (typeof window.fbq === "function") {
        clearInterval(interval);
        trackPageView();
        return;
      }

      if (attempts >= MAX_RETRIES) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}