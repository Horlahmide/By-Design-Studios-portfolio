import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col border-b border-border-light overflow-hidden">
      {/* Spacer to account for fixed navbar height */}
      <div className="shrink-0 h-[72px] md:h-[80px]" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex-1 flex items-center py-8 lg:py-12">
        {/* Two-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* Left Column: Brand Thesis, Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Category Kicker */}
            <div className="hero-enter hero-enter-1 font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] text-accent font-medium mb-2.5">
              01 // CREATIVE POST-PRODUCTION & STORYTELLING
            </div>

            {/* Primary Headline */}
            <h1 className="hero-enter hero-enter-1 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[56px] font-normal leading-[1.08] tracking-[-0.025em] text-foreground mb-3.5 sm:mb-4">
              Every Frame <br />
              <span className="italic font-normal">Tells a Story.</span>
            </h1>

            {/* Narrative Body Copy */}
            <p className="hero-enter hero-enter-2 font-sans text-xs sm:text-sm md:text-[15px] text-text-subtle leading-[1.65] max-w-[54ch] mb-5 sm:mb-6">
              By Design Studio partners with ambitious YouTubers and creators to
              transform raw footage into intentional, high-retention visual stories.
              We believe great editing amplifies a creator&apos;s personality rather than
              overshadowing it—crafting videos that feel authentic, cohesive, and uniquely yours.
            </p>

            {/* Dual Rectangular Actions */}
            <div className="hero-enter hero-enter-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5 sm:mb-6">
              <Link
                href="#work"
                className="font-sans text-xs uppercase font-semibold tracking-[0.06em] px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors duration-150 rounded-none text-center flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE WORK</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>

              <Link
                href="/contact"
                className="font-sans text-xs uppercase font-semibold tracking-[0.06em] px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-150 rounded-none text-center"
              >
                LET&apos;S WORK TOGETHER
              </Link>
            </div>

            {/* Production Proof Strip */}
            <div className="hero-enter hero-enter-3 pt-3.5 border-t border-border-subtle grid grid-cols-3 gap-4">
              <div>
                <div className="font-mono text-base sm:text-lg md:text-xl font-semibold text-foreground tracking-tight">
                  45M+
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-text-muted mt-0.5">
                  Views Generated
                </div>
              </div>
              <div>
                <div className="font-mono text-base sm:text-lg md:text-xl font-semibold text-foreground tracking-tight">
                  120+
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-text-muted mt-0.5">
                  Delivered Cuts
                </div>
              </div>
              <div>
                <div className="font-mono text-base sm:text-lg md:text-xl font-semibold text-foreground tracking-tight">
                  100%
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-text-muted mt-0.5">
                  On-Vision Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Creator Editorial Photo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="hero-enter hero-enter-4 relative w-full max-w-[310px] sm:max-w-[340px] xl:max-w-[380px]">
              {/* Image Container with 1px Hairline Frame */}
              <div className="relative aspect-[4/5] w-full border border-border-light overflow-hidden bg-surface-container">
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
              <div className="flex items-center justify-between pt-2 px-0.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  [LEAD EDITOR & STORYTELLER]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
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
