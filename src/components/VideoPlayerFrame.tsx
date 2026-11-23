"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  AdaptiveQuality,
  formatPlaybackQualityBadge,
  getAdaptiveVideoQuality,
  subscribeToNetworkChanges,
} from "@/utils/networkQuality";
import { loadYouTubeIframeApi } from "@/utils/loadYouTubeApi";

interface VideoPlayerFrameProps {
  id: string;
  title: string;
  posterUrl: string;
  youtubeId?: string;
  editSlate: string;
  runtime?: string;
  category?: string;
  slug?: string;
  aspectClassName?: string;
  slatePosition?: "top-left" | "bottom-left";
  triggerLabel?: string;
  triggerVariant?: "dark" | "accent";
  sizes?: string;
  onOpenTheater?: () => void;
}

export default function VideoPlayerFrame({
  id,
  title,
  posterUrl,
  youtubeId,
  editSlate,
  runtime,
  category,
  aspectClassName = "aspect-[16/9]",
  slatePosition = "top-left",
  triggerLabel = "PREVIEW REEL",
  triggerVariant = "dark",
  sizes = "(max-width: 1024px) 100vw, 66vw",
  onOpenTheater,
}: VideoPlayerFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [networkTarget, setNetworkTarget] = useState<AdaptiveQuality | null>(() =>
    typeof window !== "undefined" ? getAdaptiveVideoQuality() : null
  );
  const [activeResolution, setActiveResolution] = useState<string | null>(null);
  const [isAdapting, setIsAdapting] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

  // Subscribe to network condition changes dynamically
  useEffect(() => {
    const unsubscribe = subscribeToNetworkChanges((updatedQuality) => {
      setNetworkTarget(updatedQuality);
    });
    return unsubscribe;
  }, []);

  // Coordinate single active video playback across the page
  useEffect(() => {
    const handleOtherVideoPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== id) {
        setIsPlaying(false);
        setActiveResolution(null);
        setIsAdapting(false);
      }
    };

    window.addEventListener("bydesign:video-play", handleOtherVideoPlay);
    return () => {
      window.removeEventListener("bydesign:video-play", handleOtherVideoPlay);
    };
  }, [id]);

  // Official YT.Player lifecycle management
  useEffect(() => {
    if (!isPlaying || !youtubeId) {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {
          // swallow detached DOM errors
        }
        playerRef.current = null;
      }
      return;
    }

    let isMounted = true;
    const container = containerRef.current;

    async function initPlayer() {
      try {
        const YT = await loadYouTubeIframeApi();
        if (!isMounted || !containerRef.current) return;

        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          try {
            playerRef.current.destroy();
          } catch {}
          playerRef.current = null;
        }

        // Container Isolation Pattern: clear children and mount into dummy node
        containerRef.current.innerHTML = "";
        const mountNode = document.createElement("div");
        mountNode.className = "w-full h-full";
        containerRef.current.appendChild(mountNode);

        if (!isMounted) return;

        playerRef.current = new YT.Player(mountNode, {
          host: "https://www.youtube-nocookie.com", // Strict privacy parity with youtube-nocookie.com
          videoId: youtubeId,
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
              if (quality) {
                setActiveResolution(quality);
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (
                event.data === YT.PlayerState.BUFFERING ||
                event.data === YT.PlayerState.PLAYING
              ) {
                const currentQuality = event.target.getPlaybackQuality?.();
                if (currentQuality) {
                  setActiveResolution(currentQuality);
                  setIsAdapting(false);
                }
              }
            },
            onPlaybackQualityChange: (event) => {
              if (!isMounted) return;
              setActiveResolution(event.data);
              setIsAdapting(false);
            },
            onError: (event) => {
              if (!isMounted) return;
              setIsAdapting(false);
              setPlayerError(`Player error code: ${event.data}`);
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

    initPlayer();

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
  }, [isPlaying, youtubeId]);

  const handleStartPlayback = () => {
    window.dispatchEvent(
      new CustomEvent("bydesign:video-play", { detail: { id } })
    );
    setIsAdapting(true);
    setPlayerError(null);
    setIsPlaying(true);
  };

  const handleStopPlayback = () => {
    setIsPlaying(false);
    setActiveResolution(null);
    setIsAdapting(false);
  };

  const handleSwitchToTheater = () => {
    setIsPlaying(false);
    setActiveResolution(null);
    setIsAdapting(false);
    if (onOpenTheater) onOpenTheater();
  };

  const badgeInfo = activeResolution
    ? formatPlaybackQualityBadge(activeResolution)
    : null;

  return (
    <div
      data-yt={youtubeId}
      className={`group relative ${aspectClassName} w-full overflow-hidden border border-border-light bg-charcoal select-none`}
    >
      {!isPlaying ? (
        <>
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-300 pointer-events-none" />

          <div
            className={`absolute ${
              slatePosition === "bottom-left"
                ? "bottom-4 sm:bottom-6 left-4 sm:left-6"
                : "top-4 left-4"
            } font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] bg-charcoal/85 backdrop-blur-sm text-background px-3 py-1 border border-white/10 pointer-events-none z-10`}
          >
            {editSlate}
          </div>

          <button
            type="button"
            onClick={handleStartPlayback}
            aria-label={`Play ${title} in-place`}
            className="absolute inset-0 w-full h-full cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="sr-only">{`Play ${title}`}</span>
          </button>

          <div
            className={`absolute ${
              slatePosition === "bottom-left"
                ? "bottom-4 sm:bottom-6 right-4 sm:right-6"
                : "bottom-4 right-4"
            } flex items-center gap-2 z-20`}
          >
            {onOpenTheater && (
              <button
                type="button"
                onClick={onOpenTheater}
                aria-label={`Open ${title} in cinema theater modal`}
                className="hidden sm:inline-flex items-center justify-center min-h-[38px] px-3 font-mono text-[10px] uppercase tracking-[0.08em] bg-charcoal/85 text-background/90 border border-white/15 hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                title="Watch in Cinema Theater Mode"
              >
                <span>THEATER ⤢</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleStartPlayback}
              className={`inline-flex items-center gap-2 min-h-[40px] font-mono text-xs uppercase tracking-[0.06em] cursor-pointer transition-all duration-200 ${
                triggerVariant === "accent"
                  ? "bg-accent text-background px-4 py-2 hover:bg-background hover:text-foreground"
                  : "bg-charcoal/90 text-background px-3.5 py-2 opacity-95 group-hover:opacity-100 group-hover:bg-accent"
              }`}
            >
              <span className="text-xs">▶</span>
              <span>{triggerLabel}</span>
            </button>
          </div>
        </>
      ) : (
        <div className="relative w-full h-full bg-charcoal text-background flex flex-col justify-between">
          {/* Top Screening Control Strip */}
          <div className="relative z-30 flex items-center justify-between px-3 sm:px-4 py-2 bg-black/85 border-b border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 bg-accent shrink-0 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-background truncate">
                {`NOW SCREENING // ${title}`}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Closed-Loop Resolution Badge */}
              {isAdapting ? (
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border border-white/10 bg-white/5 text-[#8E8B82] animate-pulse"
                  title="Measuring connection speed and requesting optimal stream"
                >
                  {networkTarget ? `${networkTarget.label} (ADAPTING...)` : "ADAPTING..."}
                </span>
              ) : badgeInfo ? (
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border ${
                    badgeInfo.isHd
                      ? "text-accent border-accent/40 bg-accent/10"
                      : "text-white/75 border-white/15 bg-white/5"
                  }`}
                  title="Real-time stream resolution emitted by YouTube ABR player"
                >
                  {badgeInfo.label}
                </span>
              ) : networkTarget ? (
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent/80"
                  title="Target resolution requested based on current network bandwidth"
                >
                  {networkTarget.label}
                </span>
              ) : null}

              {/* YouTube Native Fallback Watch Link */}
              {youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 bg-white/10 hover:bg-white/20 text-background transition-colors"
                  title="Open directly in YouTube for manual 1080p lock"
                >
                  WATCH ON YT ↗
                </a>
              )}

              {onOpenTheater && (
                <button
                  type="button"
                  onClick={handleSwitchToTheater}
                  className="font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 bg-white/10 hover:bg-accent text-background transition-colors cursor-pointer"
                >
                  THEATER ⤢
                </button>
              )}

              <button
                type="button"
                onClick={handleStopPlayback}
                aria-label="Close video player"
                className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-2.5 py-1 bg-white/10 hover:bg-background hover:text-foreground text-background transition-colors cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>
          </div>

          {/* Video Mount Container or Technical Slate */}
          {youtubeId ? (
            <div className="relative flex-1 w-full h-full bg-black overflow-hidden">
              <div ref={containerRef} className="w-full h-full" />
              {playerError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/85 text-background p-6 text-center z-20">
                  <div>
                    <p className="font-mono text-xs text-accent uppercase mb-2">
                      Screening Playback Notice
                    </p>
                    <p className="font-sans text-sm text-background/80 mb-4">{playerError}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${youtubeId}`}
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
            <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center overflow-hidden">
              <Image
                src={posterUrl}
                alt={title}
                fill
                sizes={sizes}
                className="object-cover object-center opacity-20 scale-105 blur-[2px] pointer-events-none"
              />
              <div className="absolute inset-0 bg-charcoal/80 pointer-events-none" />
              <div className="relative z-20 max-w-md mx-auto border border-white/15 bg-black/75 p-4 sm:p-6 backdrop-blur-md">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent mb-2">
                  {`SCREENING ROOM // ${category || "EDITORIAL CUT"}`}
                </div>
                <h4 className="font-display text-xl sm:text-2xl text-background font-normal mb-2">
                  {title}
                </h4>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8E8B82] mb-4">
                  {`${editSlate}${runtime ? ` • RUNTIME: ${runtime}` : ""}`}
                </p>
                <p className="font-sans text-xs text-background/80 leading-relaxed mb-5">
                  Distraction-free cinema screening. Master YouTube stream will render here once final video link is ingested.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
