"use client";

import { useState } from "react";
import Link from "next/link";
import { featuredProjects, Project } from "@/data/projects";
import { ArrowOutwardIcon, PlayIcon } from "@/components/Icons";
import VideoPlayerFrame from "@/components/VideoPlayerFrame";
import VideoTheaterModal, { TheaterMediaItem } from "@/components/VideoTheaterModal";

function toTheaterItem(project: Project): TheaterMediaItem {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    runtime: project.runtime,
    editSlate: project.editSlate,
    posterUrl: project.posterUrl,
    youtubeId: project.youtubeId,
    aspectRatio: project.aspectRatio,
    slug: project.slug,
  };
}

export default function FeaturedWork() {
  const [theaterIndex, setTheaterIndex] = useState<number | null>(null);

  const activeTheaterItem =
    theaterIndex !== null && featuredProjects[theaterIndex]
      ? toTheaterItem(featuredProjects[theaterIndex])
      : null;

  const handlePrev = () => {
    if (theaterIndex === null) return;
    setTheaterIndex(
      (theaterIndex - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  const handleNext = () => {
    if (theaterIndex === null) return;
    setTheaterIndex((theaterIndex + 1) % featuredProjects.length);
  };

  const totalCount = String(featuredProjects.length).padStart(2, "0");

  return (
    <section
      id="work"
      className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-28 border-b border-border-light"
    >
      {/* Editorial Section Header */}
      <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-border-light mb-16 lg:mb-20 gap-4">
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
          {`[ARCHIVE REF: 01-${totalCount}]`}
        </div>
      </div>

      {/* Dynamic Alternating Editorial Spreads (Supports 3, 6, 9+ Featured Projects) */}
      {featuredProjects.map((project, index) => {
        const layoutType = index % 3;
        const isLast = index === featuredProjects.length - 1;
        const spacingClass = isLast
          ? ""
          : "mb-16 lg:mb-24 pb-16 lg:pb-24 border-b border-border-subtle";

        // Spread Pattern A: 8/4 Editorial Spread
        if (layoutType === 0) {
          return (
            <article
              key={project.id}
              data-reveal
              className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${spacingClass}`}
            >
              {/* Left Column: In-Place Click-to-Load Media Frame */}
              <div className="lg:col-span-8">
                <VideoPlayerFrame
                  id={project.id}
                  title={project.title}
                  posterUrl={project.posterUrl}
                  youtubeId={project.youtubeId}
                  editSlate={project.editSlate}
                  runtime={project.runtime}
                  category={project.category}
                  slug={project.slug}
                  aspectClassName="aspect-[16/9]"
                  slatePosition="top-left"
                  triggerLabel="PREVIEW REEL"
                  triggerVariant="dark"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  onOpenTheater={() => setTheaterIndex(index)}
                />
              </div>

              {/* Right Column: Editorial Narrative Slate */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted mb-2">
                  {`${project.number} // ${project.category}`}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] text-foreground font-normal leading-tight mb-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="font-sans text-sm text-text-subtle leading-relaxed mb-6">
                  {project.synopsis}
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-8 pb-4 border-b border-border-subtle">
                  <span>
                    {project.awardOrTag
                      ? project.awardOrTag
                      : `CLIENT: ${project.client}`}
                  </span>
                  <span>•</span>
                  <span>RUNTIME: {project.runtime}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-semibold tracking-[0.08em] leading-none text-foreground hover:text-accent transition-colors group"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span
                    className="h-3.5 w-px bg-border-light shrink-0"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setTheaterIndex(index)}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-medium tracking-[0.08em] leading-none text-text-muted hover:text-accent transition-colors cursor-pointer"
                  >
                    <PlayIcon className="w-3.5 h-3.5" />
                    <span>WATCH IN THEATER</span>
                  </button>
                </div>
              </div>
            </article>
          );
        }

        // Spread Pattern B: Reversed 4/8 Editorial Spread
        if (layoutType === 1) {
          return (
            <article
              key={project.id}
              data-reveal
              className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${spacingClass}`}
            >
              {/* Left Column on Desktop: Editorial Slate */}
              <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted mb-2">
                  {`${project.number} // ${project.category}`}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] text-foreground font-normal leading-tight mb-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="font-sans text-sm text-text-subtle leading-relaxed mb-6">
                  {project.synopsis}
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-8 pb-4 border-b border-border-subtle">
                  <span>
                    {project.awardOrTag
                      ? project.awardOrTag
                      : `CLIENT: ${project.client}`}
                  </span>
                  <span>•</span>
                  <span>RUNTIME: {project.runtime}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-semibold tracking-[0.08em] leading-none text-foreground hover:text-accent transition-colors group"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span
                    className="h-3.5 w-px bg-border-light shrink-0"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setTheaterIndex(index)}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-medium tracking-[0.08em] leading-none text-text-muted hover:text-accent transition-colors cursor-pointer"
                  >
                    <PlayIcon className="w-3.5 h-3.5" />
                    <span>WATCH IN THEATER</span>
                  </button>
                </div>
              </div>

              {/* Right Column on Desktop: In-Place Click-to-Load Media Frame */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <VideoPlayerFrame
                  id={project.id}
                  title={project.title}
                  posterUrl={project.posterUrl}
                  youtubeId={project.youtubeId}
                  editSlate={project.editSlate}
                  runtime={project.runtime}
                  category={project.category}
                  slug={project.slug}
                  aspectClassName="aspect-[16/9]"
                  slatePosition="top-left"
                  triggerLabel="PREVIEW REEL"
                  triggerVariant="dark"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  onOpenTheater={() => setTheaterIndex(index)}
                />
              </div>
            </article>
          );
        }

        // Spread Pattern C: Letterbox 21:9 Wide Cinema Spread
        return (
          <article
            key={project.id}
            data-reveal
            className={`w-full flex flex-col ${spacingClass}`}
          >
            {/* Cinema Wide In-Place Frame */}
            <VideoPlayerFrame
              id={project.id}
              title={project.title}
              posterUrl={project.posterUrl}
              youtubeId={project.youtubeId}
              editSlate={project.editSlate}
              runtime={project.runtime}
              category={project.category}
              slug={project.slug}
              aspectClassName="aspect-[16/9] sm:aspect-[21/9]"
              slatePosition="bottom-left"
              triggerLabel="LAUNCH SHORT FILM"
              triggerVariant="accent"
              sizes="100vw"
              onOpenTheater={() => setTheaterIndex(index)}
            />

            {/* Bottom Ledger Row */}
            <div className="w-full pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="font-sans text-sm text-text-subtle mt-1 max-w-[64ch]">
                  {project.synopsis}
                </p>
              </div>
              <div className="flex items-center gap-4 self-start sm:self-auto shrink-0">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-semibold tracking-[0.08em] leading-none text-foreground hover:text-accent transition-colors group"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span
                  className="h-3.5 w-px bg-border-light shrink-0"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setTheaterIndex(index)}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase font-medium tracking-[0.08em] leading-none text-text-muted hover:text-accent transition-colors cursor-pointer"
                >
                  <PlayIcon className="w-3.5 h-3.5" />
                  <span>WATCH IN THEATER</span>
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {/* Distraction-Free Dark Cinema Theater Modal */}
      <VideoTheaterModal
        item={activeTheaterItem}
        onClose={() => setTheaterIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
