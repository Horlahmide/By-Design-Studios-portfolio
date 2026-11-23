import Link from "next/link";
import { contactConfig } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container/30 border-t border-border-light">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-20">
        {/* Top Ledger Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 border-b border-border-subtle">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-display text-2xl lg:text-3xl tracking-tight text-foreground font-semibold mb-3">
              BY DESIGN STUDIO
            </span>
            <p className="font-sans text-sm text-text-subtle max-w-[44ch] leading-relaxed mb-5">
              Creative video editing studio for YouTubers and content creators. Specializing in intentional storytelling, clean edits, and authentic, personality-driven content.
            </p>
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] text-text-muted uppercase tracking-widest">
                POST SPEC // 4K PRORES 4444 • ACES COLOR PIPELINE
              </span>
            </div>
          </div>

          {/* Directory Navigation Column */}
          <div className="md:col-span-3 flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3.5 font-medium">
              NAVIGATION
            </span>
            <div className="flex flex-col gap-2">
              <Link
                href="/#work"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Selected Works
              </Link>
              <Link
                href="/#shorts"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Short-Form Content
              </Link>
              <Link
                href="/#thumbnails"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Thumbnail Packaging
              </Link>
              <Link
                href="/#about"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Studio Profile
              </Link>
              <Link
                href="/#services"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Post Services
              </Link>
              <Link
                href="/#process"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Working Process
              </Link>
              <Link
                href="/contact"
                className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors"
              >
                Project Inquiries
              </Link>
            </div>
          </div>

          {/* Transmissions & Channels Column */}
          <div className="md:col-span-4 flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3.5 font-medium">
              TRANSMISSIONS
            </span>
            <div className="flex flex-col gap-2.5">
              {contactConfig.socialChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target={channel.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    channel.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="font-sans text-xs uppercase font-medium tracking-[0.06em] text-foreground hover:text-accent transition-colors flex items-center justify-between border-b border-border-subtle pb-1.5"
                >
                  <span>{channel.label}</span>
                  <span className="font-mono text-[10px] text-text-muted">
                    [{channel.handle}]
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Slate Ledger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-text-muted uppercase tracking-[0.08em]">
          <span>© 2026 BY DESIGN STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-3">
            <span>FRAME RATE: 24.00 FPS</span>
            <span>•</span>
            <span>COLOR: ACEScc</span>
            <span>•</span>
            <span>ASPECT: 2.39:1 / 16:9</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

