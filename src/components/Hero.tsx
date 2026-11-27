import Image from "next/image";
import Link from "next/link";
import { ArrowOutwardIcon } from "@/components/Icons";

const STUDIO_CRAFT_PILLS = [
  "YouTube Vlogs",
  "Short-Form Reels",
  "Color & Packaging",
];

export default function Hero() {
  return (
    <section className="relative lg:min-h-[calc(100vh-80px)] flex flex-col border-b border-border-light overflow-hidden">
      {/* Spacer to account for fixed navbar height */}
      <div className="shrink-0 h-[72px] md:h-[80px]" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex-1 flex items-center py-10 md:py-14 lg:py-12">
        {/* Two-Column Main Content Grid (Activates at Tablet md+) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          {/* Left Column: Brand Thesis, Concise Narrative & Actions */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Category Kicker */}
            <div className="hero-enter hero-enter-1 font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] text-accent font-medium mb-3">
              01 // CREATIVE POST-PRODUCTION & STORYTELLING
            </div>

            {/* Primary Headline */}
            <h1 className="hero-enter hero-enter-1 font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[64px] font-normal leading-[1.06] tracking-[-0.025em] text-foreground mb-4 sm:mb-5">
              Every Frame <br />
              <span className="italic font-normal">Tells a Story.</span>
            </h1>

            {/* Concise, Personality-First Editorial Copy */}
            <p className="hero-enter hero-enter-2 font-sans text-sm sm:text-base md:text-[15px] lg:text-base text-text-subtle leading-[1.7] max-w-[46ch] mb-6 sm:mb-7">
              Creative video editing for ambitious YouTubers, creators, and
              brands. We believe great editing amplifies your
              personality—crafting visual stories that feel authentic, cohesive,
              and uniquely yours.
            </p>

            {/* Dual Editorial Pill Actions */}
            <div className="hero-enter hero-enter-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-7 sm:mb-8">
              <Link
                href="#work"
                className="font-sans text-xs uppercase font-semibold tracking-[0.06em] px-7 py-3.5 bg-foreground text-background hover:bg-accent transition-colors duration-150 rounded-full text-center inline-flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE WORK</span>
                <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/contact"
                className="font-sans text-xs uppercase font-semibold tracking-[0.06em] px-7 py-3.5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-150 rounded-full text-center"
              >
                LET&apos;S WORK TOGETHER
              </Link>
            </div>

            {/* Studio Craft & Availability Strip (Replaces Unverified Numeric Stats) */}
            <div className="hero-enter hero-enter-3 pt-5 border-t border-border-subtle flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {STUDIO_CRAFT_PILLS.map((craft) => (
                  <span
                    key={craft}
                    className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-foreground/85 bg-surface-container/45 border border-border-subtle px-3.5 py-1 rounded-full"
                  >
                    {craft}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-text-muted">
                <span
                  className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0"
                  aria-hidden="true"
                />
                <span>Accepting New Creators &amp; Brands</span>
              </div>
            </div>
          </div>

          {/* Right Column: Creator Editorial Photo */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center">
            <div className="hero-enter hero-enter-4 relative w-full max-w-[300px] md:max-w-[300px] lg:max-w-[340px] xl:max-w-[380px]">
              {/* Image Container with Soft Editorial Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl border border-border-light overflow-hidden bg-surface-container shadow-[0_16px_44px_rgba(23,23,23,0.08)]">
                <Image
                  src="/images/creator-portrait.jpeg"
                  alt="Lead Editor and Storyteller at By Design Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                  priority={true}
                  className="object-cover object-center grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </div>
              {/* Technical Metadata Annotation */}
              <div className="flex items-center justify-between gap-2 pt-2.5 px-0.5">
                <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.08em] text-text-muted whitespace-nowrap">
                  [LEAD EDITOR &amp; STORYTELLER]
                </span>
                <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.08em] text-accent whitespace-nowrap">
                  REC // 4K 24FPS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
