"use client";

import { useState } from "react";
import Image from "next/image";
import { thumbnailItems } from "@/data/thumbnails";
import ThumbnailLightbox from "./ThumbnailLightbox";

export default function ThumbnailGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const heroItem = thumbnailItems[0];
  const stackedItems = thumbnailItems.slice(1, 3);
  const additionalItems = thumbnailItems.slice(3, 6);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + thumbnailItems.length) % thumbnailItems.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % thumbnailItems.length);
  };

  const activeItem = selectedIndex !== null ? thumbnailItems[selectedIndex] : null;

  return (
    <section id="thumbnails" className="w-full bg-background py-20 lg:py-28 border-b border-border-light">
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
            A curated collection of YouTube thumbnail designs created to give videos a clear visual identity and communicate their subject at a glance.
          </p>
        </div>

        {/* Primary Asymmetric Grid (Full-width Hero + 2-Col Row on Tablet; 7/5 Split on Desktop) */}
        <div data-reveal-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 items-start">
          {/* 7-Col Large Hero Thumbnail */}
          {heroItem && (
            <div
              onClick={() => handleOpen(0)}
              className="lg:col-span-7 bg-surface-container/20 rounded-2xl border border-border-light p-4 lg:p-5 flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-border-subtle">
                <Image
                  src={heroItem.imageUrl}
                  alt={heroItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
                {heroItem.ctrBadge && (
                  <div className="absolute top-3 left-3 bg-foreground/90 backdrop-blur-sm text-background font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full font-medium">
                    {heroItem.ctrBadge}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto">
                <div>
                  <h4 className="font-display text-lg sm:text-xl text-foreground font-normal group-hover:text-accent transition-colors">
                    {heroItem.title}
                  </h4>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted block mt-0.5">
                    {heroItem.series}
                  </span>
                </div>
                <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent flex items-center gap-1 shrink-0 self-start sm:self-auto">
                  <span>VIEW DESIGN</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* 5-Col Stacked Thumbnails (2-Col Row on Tablet, Vertical Stack on Desktop) */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-6">
            {stackedItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleOpen(idx + 1)}
                className="bg-surface-container/20 rounded-2xl border border-border-light p-4 flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300 flex-1"
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-3 border border-border-subtle">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
                  {item.coverTag && (
                    <div className="absolute top-2.5 left-2.5 bg-foreground/90 backdrop-blur-sm text-background font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full">
                      {item.coverTag}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <h5 className="font-display text-base text-foreground font-normal group-hover:text-accent transition-colors">
                      {item.title}
                    </h5>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted block">
                      {item.series}
                    </span>
                  </div>
                  <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent flex items-center gap-0.5 shrink-0">
                    <span>VIEW</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplementary Curated Row (3 Columns) */}
        {additionalItems.length > 0 && (
          <div className="pt-6 border-t border-border-subtle">
            <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleOpen(idx + 3)}
                  className="bg-surface-container/20 rounded-2xl border border-border-light p-4 flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-3 border border-border-subtle">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
                    {item.coverTag && (
                      <div className="absolute top-2.5 left-2.5 bg-foreground/90 backdrop-blur-sm text-background font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full">
                        {item.coverTag}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <h5 className="font-display text-sm sm:text-base text-foreground font-normal group-hover:text-accent transition-colors">
                        {item.title}
                      </h5>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted block">
                        {item.series}
                      </span>
                    </div>
                    <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent flex items-center gap-0.5 shrink-0">
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

