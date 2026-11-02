"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { railProjects } from "@/data/projects";

export default function ProjectRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  return (
    <section id="additional-work" className="w-full bg-surface-container/30 border-b border-border-light py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header with Step Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-4">
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
              className="w-10 h-10 border border-border-light rounded-none flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next projects"
              className="w-10 h-10 border border-border-light rounded-none flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* Hardware-Accelerated Snapping Rail */}
        <div
          ref={railRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {railProjects.map((project) => (
            <article
              key={project.id}
              className="w-[85vw] sm:w-[360px] lg:w-[420px] shrink-0 snap-start flex flex-col bg-background border border-border-light p-5 group hover:border-foreground/40 transition-colors"
            >
              {/* Media Aspect Preview Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden mb-4 bg-surface-container border border-border-subtle">
                <Image
                  src={project.posterUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 360px, 420px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

                {/* Edit Slate Tag */}
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-sm text-background px-2.5 py-0.5">
                  {project.editSlate}
                </div>
              </div>

              {/* Category & Title */}
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1">
                {`${project.number} // ${project.category}`}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-foreground font-normal mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-text-subtle leading-relaxed mb-6 line-clamp-2">
                {project.synopsis}
              </p>

              {/* Bottom Ledger Action */}
              <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-text-muted">
                  RUNTIME: {project.runtime}
                </span>
                <Link
                  href={`/work/${project.slug}`}
                  className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-foreground group-hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>PLAY PREVIEW</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
