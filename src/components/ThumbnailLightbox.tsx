"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ThumbnailItem } from "@/data/thumbnails";

interface ThumbnailLightboxProps {
  item: ThumbnailItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ThumbnailLightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: ThumbnailLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-3 sm:p-6 md:p-10 overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative max-w-5xl w-full max-h-[92dvh] bg-[#151619] rounded-2xl border border-white/12 flex flex-col overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Back to Portfolio & Close Controls */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-charcoal/90 shrink-0 gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] bg-white/10 hover:bg-accent text-background px-4 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <span>←</span>
              <span>BACK TO PORTFOLIO</span>
            </button>
            <span className="hidden md:inline font-mono text-xs uppercase tracking-[0.1em] text-accent truncate">
              {"// PACKAGING INSPECTOR"}
            </span>
            {item.ctrBadge && (
              <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.08em] bg-accent/20 border border-accent/40 text-background px-2.5 py-0.5 rounded-full shrink-0">
                {item.ctrBadge}
              </span>
            )}
          </div>

          {/* 44x44px Touch-Friendly Close Control */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close thumbnail viewer"
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-colors cursor-pointer text-xs shrink-0"
          >
            ✕
          </button>
        </div>

        {/* High-Resolution Media Viewport */}
        <div className="relative aspect-[16/9] max-h-[68dvh] w-full bg-black">
          <Image
            src={item.fullResUrl}
            alt={item.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain object-center"
            priority={true}
          />

          {/* Step Previous Button */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous thumbnail"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/85 backdrop-blur-md border border-white/20 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors cursor-pointer text-sm"
          >
            ←
          </button>

          {/* Step Next Button */}
          <button
            type="button"
            onClick={onNext}
            aria-label="Next thumbnail"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/85 backdrop-blur-md border border-white/20 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors cursor-pointer text-sm"
          >
            →
          </button>
        </div>

        {/* Footer Metadata & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 border-t border-white/10 bg-charcoal/90 gap-3 shrink-0">
          <div>
            <h4 className="font-display text-lg sm:text-xl text-background font-normal">
              {item.title}
            </h4>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8E8B82] block mt-0.5">
              {item.series}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82]">
              [ARROWS TO STEP • ESC TO CLOSE]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.08em] border border-white/20 hover:border-background hover:bg-background hover:text-foreground text-background px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              CLOSE VIEWER ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
