"use client";

import { useState } from "react";
import Image from "next/image";
import { thumbnailItems, type ThumbnailItem } from "@/data/thumbnails";
import { ArrowOutwardIcon } from "@/components/Icons";
import ThumbnailLightbox from "./ThumbnailLightbox";

interface ThumbnailCardProps {
  item: ThumbnailItem;
  size: "large" | "compact";
  sizes: string;
  onSelect: () => void;
}

function ThumbnailCard({ item, size, sizes, onSelect }: ThumbnailCardProps) {
  const isLarge = size === "large";
  const badgeText = item.ctrBadge || item.coverTag;

  return (
    <div
      onClick={onSelect}
      className={`bg-surface-container/20 rounded-2xl border border-border-light ${
        isLarge ? "p-4 lg:p-5" : "p-4"
      } flex flex-col group cursor-pointer hover:border-foreground/30 hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)] transition-all duration-300`}
    >
      <div
        className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${
          isLarge ? "mb-4" : "mb-3"
        } border border-border-subtle`}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes={sizes}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
        {badgeText && (
          <div
            className={`absolute ${
              isLarge
                ? "top-3 left-3 text-[10px] sm:text-[11px] px-3 py-1 font-medium"
                : "top-2.5 left-2.5 text-[10px] px-2.5 py-0.5"
            } bg-foreground/90 backdrop-blur-sm text-background font-mono uppercase tracking-[0.08em] rounded-full`}
          >
            {badgeText}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3 mt-auto">
        <div className="min-w-0">
          <h4
            className={`font-display ${
              isLarge ? "text-lg sm:text-xl" : "text-sm sm:text-base"
            } text-foreground font-normal group-hover:text-accent transition-colors`}
          >
            {item.title}
          </h4>
          <span
            className={`font-mono ${
              isLarge ? "text-[11px]" : "text-[10px]"
            } uppercase tracking-[0.08em] text-text-muted block mt-0.5`}
          >
            {item.series}
          </span>
        </div>
        <span className="font-sans text-xs uppercase font-semibold tracking-[0.06em] text-accent inline-flex items-center gap-1 shrink-0 whitespace-nowrap pt-0.5">
          <span>{isLarge ? "VIEW DESIGN" : "VIEW"}</span>
          <ArrowOutwardIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
}

export default function ThumbnailGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Balanced 2 — 3 — 2 magazine rhythm for the 7 thumbnails
  const topPair = thumbnailItems.slice(0, 2);
  const middleTrio = thumbnailItems.slice(2, 5);
  const closingItems = thumbnailItems.slice(5);

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

        {/* Row 1: Top Featured Pair (2 Equal Showcase Cards) */}
        <div
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8"
        >
          {topPair.map((item, idx) => (
            <ThumbnailCard
              key={item.id}
              item={item}
              size="large"
              sizes="(max-width: 768px) 100vw, 50vw"
              onSelect={() => handleOpen(idx)}
            />
          ))}
        </div>

        {/* Row 2: Middle Curated Trio (3 Equal Cards) */}
        {middleTrio.length > 0 && (
          <div
            data-reveal-stagger
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 lg:mb-8 pt-6 lg:pt-8 border-t border-border-subtle"
          >
            {middleTrio.map((item, idx) => (
              <ThumbnailCard
                key={item.id}
                item={item}
                size="compact"
                sizes="(max-width: 768px) 100vw, 33vw"
                onSelect={() => handleOpen(idx + 2)}
              />
            ))}
          </div>
        )}

        {/* Row 3: Closing Feature Pair (2 Equal Showcase Cards) */}
        {closingItems.length > 0 && (
          <div
            data-reveal-stagger
            className={`grid grid-cols-1 ${
              closingItems.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
            } gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-border-subtle`}
          >
            {closingItems.map((item, idx) => (
              <ThumbnailCard
                key={item.id}
                item={item}
                size={closingItems.length === 2 ? "large" : "compact"}
                sizes="(max-width: 768px) 100vw, 50vw"
                onSelect={() => handleOpen(idx + 5)}
              />
            ))}
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
