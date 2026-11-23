import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-surface-container/30 py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main Editorial Spread */}
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Creator & Suite Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square w-full max-w-[460px] mx-auto lg:mx-0 overflow-hidden bg-surface-container border border-border-light p-2.5">
              <div className="relative w-full h-full overflow-hidden bg-black">
                <Image
                  src="/images/creator-portrait.jpeg"
                  alt="Lead Editor at By Design Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-out"
                />
              </div>
            </div>

            {/* Post-Production Slate Tag */}
            <div className="absolute -bottom-3 -right-3 hidden sm:block bg-foreground text-background p-4 border border-border-light font-mono text-[11px] uppercase tracking-[0.08em] shadow-xl">
              <span className="text-background block font-medium">CREATIVE POST-PRODUCTION</span>
              <span className="text-accent block mt-0.5">HIGH-RETENTION EDITORIAL</span>
            </div>
          </div>

          {/* Right Column: Brand Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
              07 // ABOUT BY DESIGN STUDIO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-foreground mb-6">
              The story behind the cut.
            </h2>

            {/* Approved Client Brand Description */}
            <p className="font-sans text-base sm:text-lg text-foreground font-semibold leading-relaxed mb-4 max-w-[56ch]">
              By Design Studio is a creative video editing studio helping YouTubers and content creators bring their ideas to life through intentional storytelling and clean, engaging edits.
            </p>

            <p className="font-sans text-sm sm:text-[15px] text-text-subtle leading-relaxed mb-4 max-w-[56ch]">
              We believe great editing should amplify a creator&apos;s personality, not overshadow it. That&apos;s why we focus on understanding your vision and crafting videos that feel authentic, cohesive, and uniquely yours.
            </p>

            <p className="font-sans text-sm sm:text-[15px] text-text-subtle leading-relaxed mb-8 max-w-[56ch]">
              Whether you have a clear vision or need a creative partner to shape your ideas, we&apos;re here to bring your story to life, by design.
            </p>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#services"
                className="inline-flex items-center gap-1.5 font-sans text-xs uppercase font-semibold tracking-[0.06em] px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors duration-150 rounded-none group"
              >
                <span>EXPLORE SERVICES</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-sans text-xs uppercase font-semibold tracking-[0.06em] px-6 py-3 border border-border-light text-foreground hover:bg-foreground hover:text-background transition-all duration-150 rounded-none"
              >
                LET&apos;S TALK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
