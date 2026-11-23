"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu with Escape (INTERACTION_SPEC §4)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border-light py-4"
          : "bg-background py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <Link
          href="/"
          className="group flex items-center gap-2 tracking-tight transition-opacity hover:opacity-85"
        >
          <span className="font-display text-xl md:text-2xl font-semibold tracking-[-0.03em] text-foreground">
            BY DESIGN
          </span>
          <span className="font-mono text-[10px] md:text-[11px] font-medium tracking-[0.12em] px-2.5 py-0.5 rounded-full border border-border-light text-foreground uppercase">
            STUDIO
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent transition-colors"
          >
            WORK
          </Link>
          <Link
            href="/#about"
            className="font-mono text-xs uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent transition-colors"
          >
            ABOUT
          </Link>
          <Link
            href="/#services"
            className="font-mono text-xs uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent transition-colors"
          >
            SERVICES
          </Link>
          <Link
            href="/contact"
            className="font-mono text-xs uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="font-sans text-xs uppercase font-semibold tracking-[0.06em] px-5 py-2.5 bg-foreground text-background hover:bg-accent transition-colors duration-150 rounded-full flex items-center gap-1.5"
          >
            <span>START A PROJECT</span>
            <span className="text-sm leading-none">↗</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 border border-border-light rounded-xl gap-1 p-2"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-5 h-[1.5px] bg-foreground transition-transform duration-150 ${
              mobileMenuOpen ? "rotate-45 translate-y-[5.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-foreground transition-opacity duration-150 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-foreground transition-transform duration-150 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border-light px-6 py-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-5">
            <Link
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent"
            >
              01 // WORK
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent"
            >
              02 // ABOUT
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent"
            >
              03 // SERVICES
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.08em] font-medium text-foreground hover:text-accent"
            >
              04 // CONTACT
            </Link>
          </nav>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center font-sans text-xs uppercase font-semibold tracking-[0.06em] py-3 bg-foreground text-background hover:bg-accent transition-colors rounded-full"
          >
            START A PROJECT ↗
          </Link>
        </div>
      )}
    </header>
  );
}
