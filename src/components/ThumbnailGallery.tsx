"use client";

import { useState } from "react";
import Image from "next/image";
import { thumbnailItems } from "@/data/thumbnails";
import ThumbnailLightbox from "./ThumbnailLightbox";

const FEATURED_COUNT = 2;

export default function ThumbnailGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const featuredItems = thumbnailItems.slice(0, FEATURED_COUNT);
  const gridItems = thumbnailItems.slice(FEATURED_COUNT);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + thumbnailItems.length) % thumbnailItems.length
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % thumbnailItems.length);
  };

  const activeItem =
    selectedIndex !== null ? thumbnailItems[selectedIndex] : null;

  return (
    <section
      id="thumbnails"
      className="w-full bg-background py-20 lg:py-28 border-b border-border-light"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div data-reveal className="max-w-3xl mb-12 lg:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent font-medium block mb-2">
            05 // THUMBNAIL DESIGN / YOUTUBE PACKAGING
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] text-foreground font-normal leading-[1.12] mb-3">
            Thumbnails that tell the story before the click.
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-text-subtle max-w-[56ch] leading-relaxed">
            A curated collection of YouTube thumbnail designs created to give
            videos a clear visual identity and communicate their subject at a
            glance.
          </p>
        </div>

        {/* Primary Featured Row (2 Equal-Height Showcase Cards) */}
        <div
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8"
        >
          {featuredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpen(idx)}
              className="bg-surface-container/20 rounded-2xl border border-border-light p-4 lg:p-5 flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-border-subtle">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
                {item.ctrBadge && (
                  <div className="absolute top-3 left-3 bg-foreground/90 backdrop-blur-sm text-background font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full font-medium">
                    {item.ctrBadge}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto">
                <div className="min-w-0">
                  <h4 className="font-display text-lg sm:text-xl text-foreground font-normal group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted block mt-0.5">
                    {item.series}
                  </span>
                </div>
                <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent flex items-center gap-1 shrink-0 self-start sm:self-auto whitespace-nowrap">
                  <span>VIEW DESIGN</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Archive Grid (2-Col Tablet / 3-Col Desktop — Scales Cleanly) */}
        {gridItems.length > 0 && (
          <div className="pt-8 border-t border-border-subtle">
            <div
              data-reveal-stagger
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {gridItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleOpen(idx + FEATURED_COUNT)}
                  className="bg-surface-container/20 rounded-2xl border border-border-light p-4 flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-3 border border-border-subtle">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
                    {item.coverTag && (
                      <div className="absolute top-2.5 left-2.5 bg-foreground/90 backdrop-blur-sm text-background font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full">
                        {item.coverTag}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3 mt-auto">
                    <div className="min-w-0">
                      <h5 className="font-display text-sm sm:text-base text-foreground font-normal group-hover:text-accent transition-colors">
                        {item.title}
                      </h5>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted block mt-0.5">
                        {item.series}
                      </span>
                    </div>
                    <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent flex items-center gap-0.5 shrink-0 whitespace-nowrap pt-0.5">
                      <span>VIEW</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accessible In-Page Lightbox Modal */}
      <ThumbnailLightbox
        item={activeItem}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
