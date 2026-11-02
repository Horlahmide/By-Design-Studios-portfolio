import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";

export default function FeaturedWork() {
  const p1 = featuredProjects[0];
  const p2 = featuredProjects[1];
  const p3 = featuredProjects[2];

  return (
    <section id="work" className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-28 border-b border-border-light">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-border-light mb-16 lg:mb-20 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
            02 // SELECTED WORK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.12] text-foreground max-w-[24ch]">
            A collection of stories, shaped in the edit.
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-text-subtle mt-3 max-w-[56ch] leading-relaxed">
            A curated selection of narrative cuts, commercial pacing, documentary assembly, and sound design crafted for ambitious creators and brands.
          </p>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted shrink-0">
          [ARCHIVE REF: 01-03]
        </div>
      </div>

      {/* Project 01: 8/4 Editorial Spread */}
      {p1 && (
        <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24 pb-16 lg:pb-24 border-b border-border-subtle">
          {/* Left Column: Media Frame */}
          <div className="lg:col-span-8 group relative aspect-[16/9] w-full overflow-hidden border border-border-light bg-surface-container">
            <Image
              src={p1.posterUrl}
              alt={p1.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            
            {/* Top-Left Edit Slate Badge */}
            <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-sm text-background px-3 py-1 border border-white/10">
              {p1.editSlate}
            </div>

            {/* Bottom-Right Play Trigger */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] bg-charcoal/90 text-background px-3.5 py-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-accent transition-all duration-200">
              <span className="text-xs">▶</span>
              <span>PREVIEW REEL</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative Slate */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted mb-2">
              {`${p1.number} // ${p1.category}`}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] text-foreground font-normal leading-tight mb-4">
              {p1.title}
            </h3>
            <p className="font-sans text-sm text-text-subtle leading-relaxed mb-6">
              {p1.synopsis}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-8 pb-4 border-b border-border-subtle">
              <span>CLIENT: {p1.client}</span>
              <span>•</span>
              <span>RUNTIME: {p1.runtime}</span>
            </div>
            <Link
              href={`/work/${p1.slug}`}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.06em] text-foreground hover:text-accent transition-colors group"
            >
              <span>VIEW PROJECT</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </article>
      )}

      {/* Project 02: Reversed 4/8 Editorial Spread */}
      {p2 && (
        <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24 pb-16 lg:pb-24 border-b border-border-subtle">
          {/* Left Column on Desktop: Editorial Slate (Order 2 on mobile, Order 1 on lg) */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted mb-2">
              {`${p2.number} // ${p2.category}`}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] text-foreground font-normal leading-tight mb-4">
              {p2.title}
            </h3>
            <p className="font-sans text-sm text-text-subtle leading-relaxed mb-6">
              {p2.synopsis}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-8 pb-4 border-b border-border-subtle">
              <span>{p2.awardOrTag ? p2.awardOrTag : `CLIENT: ${p2.client}`}</span>
              <span>•</span>
              <span>RUNTIME: {p2.runtime}</span>
            </div>
            <Link
              href={`/work/${p2.slug}`}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.06em] text-foreground hover:text-accent transition-colors group"
            >
              <span>VIEW PROJECT</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>

          {/* Right Column on Desktop: Media Frame (Order 1 on mobile, Order 2 on lg) */}
          <div className="lg:col-span-8 order-1 lg:order-2 group relative aspect-[16/9] w-full overflow-hidden border border-border-light bg-surface-container">
            <Image
              src={p2.posterUrl}
              alt={p2.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

            {/* Top-Left Edit Slate Badge */}
            <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-sm text-background px-3 py-1 border border-white/10">
              {p2.editSlate}
            </div>

            {/* Bottom-Right Play Trigger */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] bg-charcoal/90 text-background px-3.5 py-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-accent transition-all duration-200">
              <span className="text-xs">▶</span>
              <span>PREVIEW REEL</span>
            </div>
          </div>
        </article>
      )}

      {/* Project 03: Letterbox 21:9 Wide Cinema Spread */}
      {p3 && (
        <article className="w-full flex flex-col">
          {/* Cinema Wide Frame */}
          <div className="group relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-border-light bg-surface-container">
            <Image
              src={p3.posterUrl}
              alt={p3.title}
              fill
              sizes="100vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-charcoal/25 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

            {/* Bottom-Left Slate */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-sm text-background px-3 py-1 border border-white/10">
              {p3.editSlate}
            </div>

            {/* Bottom-Right Action Trigger */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] bg-accent text-background px-4 py-2 hover:bg-background hover:text-foreground transition-all duration-200">
              <span className="text-xs">▶</span>
              <span>LAUNCH SHORT FILM</span>
            </div>
          </div>

          {/* Bottom Ledger Row */}
          <div className="w-full pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                {p3.title}
              </h3>
              <p className="font-sans text-sm text-text-subtle mt-1 max-w-[64ch]">
                {p3.synopsis}
              </p>
            </div>
            <Link
              href={`/work/${p3.slug}`}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.06em] text-foreground hover:text-accent transition-colors shrink-0 group self-start sm:self-auto"
            >
              <span>VIEW PROJECT SPECS</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}
