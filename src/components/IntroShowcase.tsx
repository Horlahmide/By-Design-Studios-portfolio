"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { introItems, IntroItem } from "@/data/intros";
import { ArrowOutwardIcon, PlayIcon } from "@/components/Icons";
import VideoTheaterModal, { TheaterMediaItem } from "@/components/VideoTheaterModal";

function toTheaterItem(item: IntroItem): TheaterMediaItem {
  return {
    id: item.id,
    title: item.title,
    category: item.badge,
    runtime: item.runtime,
    editSlate: item.specTag,
    posterUrl: item.posterUrl,
    youtubeId: item.youtubeId,
    aspectRatio: "16:9",
  };
}

export default function IntroShowcase() {
  const [theaterIndex, setTheaterIndex] = useState<number | null>(null);

  const activeTheaterItem =
    theaterIndex !== null && introItems[theaterIndex]
      ? toTheaterItem(introItems[theaterIndex])
      : null;

  const handlePrev = () => {
    if (theaterIndex === null) return;
    setTheaterIndex((theaterIndex - 1 + introItems.length) % introItems.length);
  };

  const handleNext = () => {
    if (theaterIndex === null) return;
    setTheaterIndex((theaterIndex + 1) % introItems.length);
  };

  return (
    <section
      id="intros"
      className="w-full bg-background py-20 lg:py-28 border-b border-border-light"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-14 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
              06 // YOUTUBE INTROS / OPENING SEQUENCES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal">
              The Opening Frame.
            </h2>
            <p className="font-sans text-sm text-text-subtle mt-1.5 max-w-[56ch]">
              Video introductions, animated idents, and custom title sequences created to establish an immediate, recognizable visual hook for creators.
            </p>
          </div>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent hover:text-foreground transition-colors shrink-0 group"
          >
            <span>INQUIRE ABOUT MOTION OPENERS</span>
            <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3-Column Motion Openers Grid */}
        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {introItems.map((item, index) => (
            <article
              key={item.id}
              data-yt={item.youtubeId}
              className="rounded-2xl border border-border-light p-4 bg-surface-container/20 flex flex-col group hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300"
            >
              {/* 16:9 Video Opener Interactive Frame */}
              <button
                type="button"
                onClick={() => setTheaterIndex(index)}
                aria-label={`Play YouTube intro: ${item.title}`}
                className="relative aspect-video w-full rounded-xl bg-charcoal overflow-hidden mb-3 border border-border-subtle text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image
                  src={item.posterUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

                {/* Bottom-Left Slate Badge */}
                <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-md text-background px-3 py-1 rounded-full border border-white/10">
                  {item.badge}
                </div>

                {/* Touch-Accessible Circular Play Trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-95 md:opacity-85 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 rounded-full bg-charcoal/85 backdrop-blur-md border border-white/25 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 text-background flex items-center justify-center shadow-lg transition-all duration-200">
                    <PlayIcon className="w-5 h-5 translate-x-0.5" />
                  </div>
                </div>
              </button>

              {/* Lower Spec & Timecode Line */}
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted mt-auto pt-1">
                <span>{item.specTag}</span>
                <button
                  type="button"
                  onClick={() => setTheaterIndex(index)}
                  className="inline-flex items-center gap-1 text-accent hover:text-foreground transition-colors cursor-pointer"
                >
                  <PlayIcon className="w-3.5 h-3.5" />
                  <span>PLAY OPENER</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Widescreen 16:9 Dark Cinema Theater Modal */}
      <VideoTheaterModal
        item={activeTheaterItem}
        onClose={() => setTheaterIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
