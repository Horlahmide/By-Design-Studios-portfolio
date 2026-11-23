"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shortFormProjects, ShortFormProject } from "@/data/shorts";
import VideoTheaterModal, { TheaterMediaItem } from "@/components/VideoTheaterModal";

function toTheaterItem(project: ShortFormProject): TheaterMediaItem {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    runtime: project.metrics,
    editSlate: project.slateTag,
    posterUrl: project.posterUrl,
    youtubeId: project.youtubeId,
    aspectRatio: "9:16",
  };
}

export default function ShortFormShowcase() {
  const [theaterIndex, setTheaterIndex] = useState<number | null>(null);

  const activeTheaterItem =
    theaterIndex !== null && shortFormProjects[theaterIndex]
      ? toTheaterItem(shortFormProjects[theaterIndex])
      : null;

  const handlePrev = () => {
    if (theaterIndex === null) return;
    setTheaterIndex(
      (theaterIndex - 1 + shortFormProjects.length) % shortFormProjects.length
    );
  };

  const handleNext = () => {
    if (theaterIndex === null) return;
    setTheaterIndex((theaterIndex + 1) % shortFormProjects.length);
  };

  return (
    <section
      id="shorts"
      className="w-full bg-charcoal text-background py-20 lg:py-28 border-b border-border-dark overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div data-reveal className="max-w-3xl mb-14 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
            04 // SHORT-FORM VIDEO / SOCIAL CONTENT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] text-background font-normal leading-[1.12] mb-4">
            Made for the Moment.
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-[#8E8B82] max-w-[58ch] leading-relaxed">
            Short-form vertical edits (9:16) created for social platforms, high-velocity pacing, and maximum psychological retention.
          </p>
        </div>

        {/* 3 Aligned Smartphone Compositions */}
        <div data-reveal-stagger className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch justify-items-center mb-14 lg:mb-16">
          {shortFormProjects.map((project, index) => {
            return (
              <article
                key={project.id}
                data-yt={project.youtubeId}
                className="w-full max-w-[300px] sm:max-w-[330px] flex flex-col p-3.5 group transition-all duration-300 bg-white/[0.03] border border-white/15 hover:border-accent hover:bg-white/[0.05]"
              >
                {/* 9:16 Vertical Video Frame (Interactive Trigger) */}
                <button
                  type="button"
                  onClick={() => setTheaterIndex(index)}
                  aria-label={`Watch short-form video: ${project.title}`}
                  className="relative aspect-[9/16] w-full overflow-hidden bg-black mb-3.5 border border-white/10 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={project.posterUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 300px, 330px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/15 to-charcoal/45 pointer-events-none" />

                  {/* Top Handle / Category Badge */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 bg-charcoal/85 backdrop-blur-sm text-background border border-white/10 group-hover:bg-accent group-hover:border-accent transition-colors">
                    {project.handleTag}
                  </div>

                  {/* Center Play Button (Uniform Across All Cards) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center text-background bg-charcoal/80 backdrop-blur-sm border border-white/25 opacity-95 group-hover:opacity-100 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-200">
                      <span className="text-sm pl-0.5">▶</span>
                    </div>
                  </div>

                  {/* Bottom Text Over Poster */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-background">
                    <span className="font-sans text-sm sm:text-[15px] font-semibold block leading-snug mb-1">
                      {project.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/75 block">
                      {project.metrics}
                    </span>
                  </div>
                </button>

                {/* Technical Foot Slate (Single-Line Unbroken Layout) */}
                <div className="mt-auto pt-1 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82] group-hover:text-background transition-colors">
                  <span className="truncate">
                    {`${project.number} // ${project.category}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTheaterIndex(index)}
                    className="text-accent group-hover:text-background transition-colors cursor-pointer whitespace-nowrap shrink-0 font-medium"
                  >
                    [WATCH 9:16 ▶]
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Action Trigger */}
        <div className="w-full text-center pt-8 border-t border-border-dark/40">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase font-semibold tracking-[0.08em] text-accent hover:text-background transition-colors group"
          >
            <span>INQUIRE ABOUT SHORT-FORM RETAINERS</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Vertical 9:16 Dark Cinema Theater Modal */}
      <VideoTheaterModal
        item={activeTheaterItem}
        onClose={() => setTheaterIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
