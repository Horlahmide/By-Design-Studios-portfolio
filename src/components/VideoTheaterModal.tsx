"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AdaptiveQuality,
  formatPlaybackQualityBadge,
  getAdaptiveVideoQuality,
  subscribeToNetworkChanges,
} from "@/utils/networkQuality";
import { loadYouTubeIframeApi } from "@/utils/loadYouTubeApi";

export interface TheaterMediaItem {
  id: string;
  title: string;
  category: string;
  runtime?: string;
  editSlate: string;
  posterUrl: string;
  youtubeId?: string;
  aspectRatio: "16:9" | "2.39:1" | "21:9" | "9:16";
  slug?: string;
}

interface VideoTheaterModalProps {
  item: TheaterMediaItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function VideoTheaterModal({
  item,
  onClose,
  onPrev,
  onNext,
}: VideoTheaterModalProps) {
  const [networkTarget, setNetworkTarget] = useState<AdaptiveQuality | null>(() =>
    typeof window !== "undefined" ? getAdaptiveVideoQuality() : null
  );
  const [activeResolutionState, setActiveResolutionState] = useState<{
    itemId: string;
    quality: string;
  } | null>(null);
  const [isAdapting, setIsAdapting] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const itemId = item?.id;
  const activeResolution =
    activeResolutionState && activeResolutionState.itemId === itemId
      ? activeResolutionState.quality
      : null;

  // Track dynamic network quality changes
  useEffect(() => {
    const unsubscribe = subscribeToNetworkChanges((updatedQuality) => {
      setNetworkTarget(updatedQuality);
    });
    return unsubscribe;
  }, []);

  // Keyboard navigation & modal lock
  useEffect(() => {
    if (!item) return;

    window.dispatchEvent(
      new CustomEvent("bydesign:video-play", {
        detail: { id: `theater-${item.id}` },
      })
    );

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  // Official YT.Player instance integration in modal
  useEffect(() => {
    if (!item?.youtubeId) {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
      return;
    }

    let isMounted = true;
    const container = containerRef.current;

    async function initModalPlayer() {
      setIsAdapting(true);
      setPlayerError(null);
      try {
        const YT = await loadYouTubeIframeApi();
        if (!isMounted || !containerRef.current || !item?.youtubeId) return;

        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          try {
            playerRef.current.destroy();
          } catch {}
          playerRef.current = null;
        }

        containerRef.current.innerHTML = "";
        const mountNode = document.createElement("div");
        mountNode.className = "w-full h-full";
        containerRef.current.appendChild(mountNode);

        if (!isMounted) return;

        playerRef.current = new YT.Player(mountNode, {
          host: "https://www.youtube-nocookie.com", // Strict privacy parity with youtube-nocookie.com
          videoId: item.youtubeId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            playsinline: 1,
            enablejsapi: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              setIsAdapting(false);
              const quality = event.target.getPlaybackQuality?.();
              if (quality && itemId) {
                setActiveResolutionState({ itemId, quality });
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (
                event.data === YT.PlayerState.BUFFERING ||
                event.data === YT.PlayerState.PLAYING
              ) {
                const currentQuality = event.target.getPlaybackQuality?.();
                if (currentQuality && itemId) {
                  setActiveResolutionState({ itemId, quality: currentQuality });
                  setIsAdapting(false);
                }
              }
            },
            onPlaybackQualityChange: (event) => {
              if (!isMounted) return;
              if (itemId) {
                setActiveResolutionState({ itemId, quality: event.data });
              }
              setIsAdapting(false);
            },
            onError: (event) => {
              if (!isMounted) return;
              setIsAdapting(false);
              setPlayerError(`Error code: ${event.data}`);
            },
          },
        });
      } catch (err: unknown) {
        if (isMounted) {
          setIsAdapting(false);
          const message = err instanceof Error ? err.message : "Failed to load player";
          setPlayerError(message);
        }
      }
    }

    initModalPlayer();

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [itemId, item?.youtubeId]);

  if (!item) return null;

  const isVertical = item.aspectRatio === "9:16";
  const badgeInfo = activeResolution
    ? formatPlaybackQualityBadge(activeResolution)
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Cinema Theater: ${item.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`relative bg-charcoal border border-border-dark flex flex-col overflow-hidden shadow-2xl max-h-[94dvh] ${
          isVertical ? "w-full max-w-[360px] sm:max-w-[390px]" : "w-full max-w-5xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Screening Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-border-dark bg-black/60 shrink-0 gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] bg-white/10 hover:bg-accent text-background px-2.5 sm:px-3 py-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>←</span>
              <span>{isVertical ? "BACK" : "BACK TO PORTFOLIO"}</span>
            </button>

            {!isVertical && (
              <>
                <span className="hidden sm:inline-block w-2 h-2 bg-accent shrink-0 animate-pulse" />
                <span className="hidden sm:inline font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] text-accent truncate">
                  {`THEATER // ${item.category}`}
                </span>
              </>
            )}

            {/* Closed-Loop Resolution Indicator */}
            {isAdapting ? (
              <span
                className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82] animate-pulse shrink-0 whitespace-nowrap"
                title="Measuring connection speed and requesting optimal stream"
              >
                {isVertical
                  ? "ADAPTING..."
                  : networkTarget
                  ? `• ${networkTarget.label} (ADAPTING...)`
                  : "• ADAPTING..."}
              </span>
            ) : badgeInfo ? (
              <span
                className={`hidden sm:inline font-mono text-[10px] uppercase tracking-[0.08em] shrink-0 whitespace-nowrap ${
                  badgeInfo.isHd ? "text-accent" : "text-[#8E8B82]"
                }`}
                title="Real-time stream resolution reported by YouTube ABR"
              >
                {isVertical ? badgeInfo.label : `• ${badgeInfo.label}`}
              </span>
            ) : networkTarget && !isVertical ? (
              <span
                className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82] shrink-0 whitespace-nowrap"
                title="Target quality"
              >
                {`• ${networkTarget.label}`}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-background transition-colors whitespace-nowrap"
                title="Watch on YouTube with manual 1080p selector"
              >
                WATCH ON YT ↗
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cinema theater"
              className="w-9 h-9 sm:w-10 sm:h-10 border border-border-dark flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-colors cursor-pointer text-sm shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Media Viewport Container */}
        <div
          className={`relative bg-black w-full flex items-center justify-center overflow-hidden ${
            isVertical
              ? "py-0"
              : "aspect-[16/9] max-h-[70dvh]"
          }`}
        >
          {item.youtubeId ? (
            <div
              className={
                isVertical
                  ? "relative aspect-[9/16] h-[64dvh] max-h-[620px] w-auto mx-auto"
                  : "w-full h-full relative"
              }
            >
              <div
                ref={containerRef}
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full"
              />
              {playerError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/85 text-background p-6 text-center z-20">
                  <div>
                    <p className="font-mono text-xs text-accent uppercase mb-2">Theater Playback Notice</p>
                    <p className="font-sans text-sm text-background/80 mb-4">{playerError}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-mono text-xs uppercase px-4 py-2 bg-accent text-background"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative flex flex-col items-center justify-center p-6 text-center overflow-hidden ${
                isVertical
                  ? "aspect-[9/16] h-[64dvh] max-h-[620px] w-full"
                  : "w-full h-full"
              }`}
            >
              <Image
                src={item.posterUrl}
                alt={item.title}
                fill
                sizes={isVertical ? "390px" : "(max-width: 1280px) 100vw, 1024px"}
                className="object-cover object-center opacity-25 scale-105 blur-[2px] pointer-events-none"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/85 pointer-events-none" />
              <div className="relative z-10 max-w-md border border-white/15 bg-black/80 p-5 sm:p-6 backdrop-blur-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent block mb-2">
                  {`BY DESIGN STUDIO // ${item.aspectRatio} MASTER`}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-background font-normal mb-2">
                  {item.title}
                </h3>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#8E8B82] mb-4">
                  {`${item.editSlate}${item.runtime ? ` • ${item.runtime}` : ""}`}
                </div>
                <p className="font-sans text-xs text-background/80 leading-relaxed mb-5">
                  Distraction-free cinema player ready (`youtube-nocookie.com`).
                </p>
              </div>
            </div>
          )}

          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous video"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-charcoal/85 border border-border-dark text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors cursor-pointer text-base"
            >
              ←
            </button>
          )}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next video"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-charcoal/85 border border-border-dark text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors cursor-pointer text-base"
            >
              →
            </button>
          )}
        </div>

        {/* Modal Project Metadata Footer */}
        <div className="p-4 sm:p-5 border-t border-border-dark bg-charcoal shrink-0 flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent font-medium whitespace-nowrap">
                {item.category}
              </span>
              {isVertical ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82] whitespace-nowrap">
                  {`• ${item.runtime || item.editSlate}`}
                </span>
              ) : (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82]">
                    {item.editSlate}
                  </span>
                  {item.runtime && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8B82]">
                      {`• RUNTIME: ${item.runtime}`}
                    </span>
                  )}
                </>
              )}
            </div>
            <h3
              className={`font-display text-background font-normal leading-snug ${
                isVertical ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
              }`}
            >
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {item.slug && (
              <Link
                href={`/work/${item.slug}`}
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-[0.08em] text-background hover:text-accent transition-colors font-medium border-b border-white/20 pb-0.5 whitespace-nowrap"
              >
                OPEN CASE STUDY ↗
              </Link>
            )}
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center font-sans text-xs uppercase font-semibold tracking-[0.06em] px-4 py-2.5 bg-accent text-background hover:bg-background hover:text-foreground transition-all rounded-none whitespace-nowrap shrink-0"
            >
              INQUIRE CUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
