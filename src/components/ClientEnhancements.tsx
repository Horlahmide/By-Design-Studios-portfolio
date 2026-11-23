"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { warmYouTubeConnection } from "@/utils/networkQuality";

/**
 * Global, render-free client enhancements (mounted once in the root layout):
 *
 * 1. Scroll reveal: ONE shared IntersectionObserver for every element marked
 *    with `data-reveal` or `data-reveal-stagger`. Each element is unobserved
 *    after its first reveal, so scrolling costs nothing afterwards.
 * 2. Video warm-up: a single delegated pointer/touch listener that pre-warms
 *    the YouTube connection when a visitor approaches any `[data-yt]` card.
 */
export default function ClientEnhancements() {
  const pathname = usePathname();

  // --- 1. Scroll reveal (re-scans on every client-side route change) ---
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed]), [data-reveal-stagger]:not([data-revealed])"
      )
    );

    const revealAll = () => {
      targets.forEach((el) => el.setAttribute("data-revealed", ""));
    };

    // Reduced motion or no observer support: show everything immediately.
    if (
      !root.classList.contains("reveal-ready") ||
      typeof IntersectionObserver === "undefined"
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      // Works for any element height (including tall 9:16 cards on phones).
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // --- 2. Delegated YouTube connection warm-up ---
  useEffect(() => {
    const handler = (event: Event) => {
      const target = event.target as Element | null;
      const card = target?.closest?.("[data-yt]");
      if (card) {
        warmYouTubeConnection(card.getAttribute("data-yt") || undefined);
      }
    };

    document.addEventListener("pointerover", handler, { passive: true });
    document.addEventListener("touchstart", handler, { passive: true });
    document.addEventListener("focusin", handler, { passive: true });
    return () => {
      document.removeEventListener("pointerover", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("focusin", handler);
    };
  }, []);

  return null;
}

