import Link from "next/link";
import { contactConfig } from "@/data/contact";

const FOOTER_NAV_LINKS = [
  { href: "/#work", label: "Selected Works" },
  { href: "/#shorts", label: "Short-Form Content" },
  { href: "/#thumbnails", label: "Thumbnail Packaging" },
  { href: "/#about", label: "Studio Profile" },
  { href: "/#services", label: "Post Services" },
  { href: "/#process", label: "Working Process" },
  { href: "/contact", label: "Project Inquiries" },
];

const FOOTER_TECH_SPECS = [
  "FRAME RATE: 24.00 FPS",
  "COLOR: ACEScc",
  "ASPECT: 2.39:1 / 16:9",
];

function formatChannelHandle(handle: string): string {
  const normalized = handle.replace(/^\[|\]$/g, "");
  return `[${normalized}]`;
}

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container/30 border-t border-border-light">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-14 sm:py-16 lg:py-20">
        {/* Top Ledger Columns (Clean Stack on Mobile, Balanced 12-Col on Tablet & Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 lg:pb-14 border-b border-border-subtle">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col">
            <span className="font-display text-2xl lg:text-3xl tracking-tight text-foreground font-semibold mb-3">
              BY DESIGN STUDIO
            </span>
            <p className="font-sans text-sm text-text-subtle max-w-[46ch] leading-relaxed mb-5">
              Creative video editing studio for YouTubers and content creators.
              Specializing in intentional storytelling, clean edits, and
              authentic, personality-driven content.
            </p>
            <span className="font-mono text-[10px] sm:text-[11px] text-text-muted uppercase tracking-widest leading-relaxed">
              POST SPEC // 4K PRORES 4444 • ACES COLOR PIPELINE
            </span>
          </div>

          {/* Directory Navigation Column (Compact 2-Col Grid on Mobile) */}
          <div className="md:col-span-5 lg:col-span-3 flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4 font-medium">
              NAVIGATION
            </span>
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2.5"
            >
              {FOOTER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Transmissions & Channels Column */}
          <div className="md:col-span-7 lg:col-span-4 flex flex-col min-w-0">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4 font-medium">
              TRANSMISSIONS
            </span>
            <div className="flex flex-col gap-3">
              {contactConfig.socialChannels.map((channel) => {
                const isExternal = channel.url.startsWith("http");

                return (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 border-b border-border-subtle pb-2.5 text-foreground hover:text-accent transition-colors"
                  >
                    <span className="font-sans text-xs uppercase font-medium tracking-[0.06em] shrink-0">
                      {channel.label}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-text-muted group-hover:text-accent transition-colors break-all sm:break-normal sm:text-right">
                      {formatChannelHandle(channel.handle)}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Slate Ledger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-text-muted uppercase tracking-[0.08em] text-center sm:text-left">
          <span className="whitespace-nowrap">
            © 2026 BY DESIGN STUDIO. ALL RIGHTS RESERVED.
          </span>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5">
            {FOOTER_TECH_SPECS.map((spec, index) => (
              <span
                key={spec}
                className="inline-flex items-center gap-3 whitespace-nowrap"
              >
                {index > 0 && <span aria-hidden="true">•</span>}
                <span>{spec}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
