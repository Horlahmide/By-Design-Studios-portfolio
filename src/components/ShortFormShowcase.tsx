"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shortFormProjects, ShortFormProject } from "@/data/shorts";
import { ArrowOutwardIcon, PlayIcon } from "@/components/Icons";
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

        {/* 3 Descending Staircase Smartphone Compositions */}
        <div data-reveal-stagger className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start justify-items-center mb-16 lg:mb-20">
          {shortFormProjects.map((project, index) => {
            const isHero = Boolean(project.isHero);
            const staircaseOffsets = [
              "md:mt-0",
              "md:mt-8 lg:mt-10",
              "md:mt-16 lg:mt-20",
            ];
            const offsetClass = staircaseOffsets[index] ?? "md:mt-0";

            return (
              <article
                key={project.id}
                data-yt={project.youtubeId}
                className={`w-full max-w-[310px] sm:max-w-[330px] flex flex-col p-3.5 group transition-all duration-300 rounded-2xl ${offsetClass} ${
                  isHero
                    ? "bg-white/[0.045] border border-accent/60 shadow-[0_20px_50px_rgba(66,99,216,0.18)] hover:border-accent"
                    : "bg-white/[0.03] border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:border-white/35 hover:bg-white/[0.05]"
                }`}
              >
                {/* 9:16 Vertical Video Frame (Interactive Trigger) */}
                <button
                  type="button"
                  onClick={() => setTheaterIndex(index)}
                  aria-label={`Watch short-form video: ${project.title}`}
                  className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black mb-3.5 border border-white/10 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Image
                    src={project.posterUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 300px, 350px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/15 to-charcoal/40 pointer-events-none" />

                  {/* Top Handle / Category Pill Badge */}
                  <div
                    className={`absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1 rounded-full backdrop-blur-md transition-colors ${
                      isHero
                        ? "bg-accent text-background font-medium shadow-md"
                        : "bg-charcoal/85 text-background border border-white/15 group-hover:bg-accent group-hover:border-accent"
                    }`}
                  >
                    {isHero ? "FEATURED SHORT" : project.handleTag}
                  </div>

                  {/* Center Circular Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`rounded-full flex items-center justify-center text-background transition-all duration-200 ${
                        isHero
                          ? "w-14 h-14 bg-accent ring-4 ring-accent/25 shadow-lg group-hover:scale-110"
                          : "w-12 h-12 bg-charcoal/75 backdrop-blur-md border border-white/25 opacity-90 group-hover:opacity-100 group-hover:bg-accent group-hover:border-accent group-hover:scale-110"
                      }`}
                    >
                      <PlayIcon className={isHero ? "w-6 h-6 translate-x-0.5" : "w-5 h-5 translate-x-0.5"} />
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

                {/* Clean Technical Foot Slate */}
                <div className="mt-auto px-1 pt-0.5 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82] group-hover:text-background transition-colors">
                  <span className="truncate">
                    {`${project.number} // ${project.category}`}
                  </span>
                  <span
                    className={`whitespace-nowrap shrink-0 font-medium ${
                      isHero ? "text-accent" : "text-white/60"
                    }`}
                  >
                    {isHero ? "4K MASTER" : "9:16 VERTICAL"}
                  </span>
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
            <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
