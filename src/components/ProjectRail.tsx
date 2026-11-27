"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { railProjects, Project } from "@/data/projects";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowOutwardIcon,
  PlayIcon,
} from "@/components/Icons";
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

export default function ProjectRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [theaterIndex, setTheaterIndex] = useState<number | null>(null);

  const checkScroll = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    checkScroll();
    rail.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      rail.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!railRef.current) return;
    const scrollAmount = railRef.current.clientWidth > 640 ? 420 : 320;
    railRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const activeTheaterItem =
    theaterIndex !== null && railProjects[theaterIndex]
      ? toTheaterItem(railProjects[theaterIndex])
      : null;

  const handlePrev = () => {
    if (theaterIndex === null) return;
    setTheaterIndex(
      (theaterIndex - 1 + railProjects.length) % railProjects.length
    );
  };

  const handleNext = () => {
    if (theaterIndex === null) return;
    setTheaterIndex((theaterIndex + 1) % railProjects.length);
  };

  return (
    <section
      id="additional-work"
      className="w-full bg-surface-container/30 border-b border-border-light py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header with Step Navigation Controls */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
              03 // MORE WORK / PROJECT ARCHIVE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal">
              More Stories. More Perspectives.
            </h2>
            <p className="font-sans text-sm text-text-subtle mt-1.5 max-w-[56ch]">
              Explore additional post-production projects across different visual styles, pacing structures, and soundscapes.
            </p>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous projects"
              className="w-11 h-11 border border-border-light rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowBackIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next projects"
              className="w-11 h-11 border border-border-light rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowForwardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hardware-Accelerated Snapping Rail */}
        <div
          ref={railRef}
          data-reveal-stagger
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {railProjects.map((project, index) => (
            <article
              key={project.id}
              data-yt={project.youtubeId}
              className="w-[85vw] sm:w-[360px] lg:w-[420px] shrink-0 snap-start flex flex-col bg-background rounded-2xl border border-border-light p-5 group hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.07)] transition-all duration-300"
            >
              {/* Media Aspect Preview Frame (Launches Theater Modal so touch swiping stays smooth) */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-surface-container border border-border-subtle">
                <Image
                  src={project.posterUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 360px, 420px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

                {/* Edit Slate Tag */}
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.08em] bg-charcoal/80 backdrop-blur-md text-background px-3 py-1 rounded-full border border-white/10 pointer-events-none z-10">
                  {project.editSlate}
                </div>

                {/* Touch-Accessible Play Trigger Overlay */}
                <button
                  type="button"
                  onClick={() => setTheaterIndex(index)}
                  aria-label={`Watch ${project.title} in theater`}
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="w-12 h-12 rounded-full bg-charcoal/85 backdrop-blur-md border border-white/25 text-background flex items-center justify-center opacity-95 md:opacity-85 group-hover:opacity-100 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-200 shadow-md">
                    <PlayIcon className="w-5 h-5 translate-x-0.5" />
                  </span>
                </button>
              </div>

              {/* Category & Title (Links to /work/[slug] Detail Page) */}
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1">
                {`${project.number} // ${project.category}`}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-foreground font-normal mb-2 group-hover:text-accent transition-colors">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-text-subtle leading-relaxed mb-6 line-clamp-2">
                {project.synopsis}
              </p>

              {/* Bottom Ledger Action */}
              <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-text-muted">
                  RUNTIME: {project.runtime}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 font-sans text-[11px] uppercase font-semibold tracking-[0.08em] leading-none text-foreground hover:text-accent transition-colors group"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span
                    className="h-3 w-px bg-border-light shrink-0"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setTheaterIndex(index)}
                    className="inline-flex items-center gap-1 font-sans text-[11px] uppercase font-medium tracking-[0.08em] leading-none text-text-muted hover:text-accent transition-colors cursor-pointer"
                  >
                    <PlayIcon className="w-3.5 h-3.5" />
                    <span>THEATER</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

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
