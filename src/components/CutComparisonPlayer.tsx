"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CutComparisonData } from "@/data/approach";
import { loadYouTubeIframeApi } from "@/utils/loadYouTubeApi";
import { warmYouTubeConnection } from "@/utils/networkQuality";
import {
  ArrowOutwardIcon,
  PlayIcon,
  ReplayIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@/components/Icons";

interface CutComparisonPlayerProps {
  comparison: CutComparisonData;
}

type AudioTrack = "none" | "raw" | "graded";

function checkAutoplayEligibility(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (conn?.saveData) return false;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
    return false;
  }

  return true;
}

export default function CutComparisonPlayer({
  comparison,
}: CutComparisonPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rawContainerRef = useRef<HTMLDivElement>(null);
  const gradedContainerRef = useRef<HTMLDivElement>(null);
  const rawPlayerRef = useRef<YT.Player | null>(null);
  const gradedPlayerRef = useRef<YT.Player | null>(null);
  const rawReadyRef = useRef(false);
  const gradedReadyRef = useRef(false);
  const inViewRef = useRef(false);

  const [hasActivated, setHasActivated] = useState(false);
  const [autoplaySkipped, setAutoplaySkipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAudio, setActiveAudio] = useState<AudioTrack>("none");
  const [loadError, setLoadError] = useState<string | null>(null);

  const pauseBoth = () => {
    try {
      if (rawReadyRef.current) rawPlayerRef.current?.pauseVideo();
    } catch {}
    try {
      if (gradedReadyRef.current) gradedPlayerRef.current?.pauseVideo();
    } catch {}
  };

  const playBoth = () => {
    try {
      if (rawReadyRef.current) rawPlayerRef.current?.playVideo();
    } catch {}
    try {
      if (gradedReadyRef.current) gradedPlayerRef.current?.playVideo();
    } catch {}
  };

  // 1. Pre-warm YouTube origins when scrolling within 300px of Section 08
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const prewarmObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          warmYouTubeConnection(comparison.raw.youtubeId);
          prewarmObserver.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    prewarmObserver.observe(el);
    return () => prewarmObserver.disconnect();
  }, [comparison.raw.youtubeId]);

  // 2. Viewport gate: mount & autoplay muted on entry, pause when off-screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const visible = entry.isIntersecting;
        inViewRef.current = visible;

        if (visible) {
          if (!hasActivated) {
            if (checkAutoplayEligibility()) {
              setHasActivated(true);
            } else {
              setAutoplaySkipped(true);
            }
          } else {
            playBoth();
          }
        } else if (hasActivated) {
          pauseBoth();
        }
      },
      { threshold: 0.35 }
    );

    visibilityObserver.observe(el);
    return () => visibilityObserver.disconnect();
  }, [hasActivated]);

  // 3. Pause both comparison players if visitor starts another video on the page
  useEffect(() => {
    const handleOtherVideoPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      if (customEvent.detail?.id !== "section-08-comparison") {
        pauseBoth();
        setActiveAudio("none");
        try {
          if (rawReadyRef.current) rawPlayerRef.current?.mute();
          if (gradedReadyRef.current) gradedPlayerRef.current?.mute();
        } catch {}
      }
    };

    window.addEventListener("bydesign:video-play", handleOtherVideoPlay);
    return () => {
      window.removeEventListener("bydesign:video-play", handleOtherVideoPlay);
    };
  }, []);

  // 4. Official YT.Player lifecycle (Container Isolation Pattern for React 19 StrictMode)
  useEffect(() => {
    if (!hasActivated) return;

    let isMounted = true;
    const rawContainer = rawContainerRef.current;
    const gradedContainer = gradedContainerRef.current;

    async function initComparisonPlayers() {
      setIsLoading(true);
      setLoadError(null);
      rawReadyRef.current = false;
      gradedReadyRef.current = false;

      try {
        const YT = await loadYouTubeIframeApi();
        if (!isMounted || !rawContainerRef.current || !gradedContainerRef.current) {
          return;
        }

        const createIsolatedPlayer = (
          container: HTMLDivElement,
          videoId: string,
          side: "raw" | "graded"
        ) => {
          container.innerHTML = "";
          const mountNode = document.createElement("div");
          mountNode.className = "w-full h-full";
          container.appendChild(mountNode);

          return new YT.Player(mountNode, {
            host: "https://www.youtube-nocookie.com",
            videoId,
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: videoId,
              controls: 1,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,
              playsinline: 1,
              enablejsapi: 1,
              origin:
                typeof window !== "undefined" ? window.location.origin : "",
            },
            events: {
              onReady: (event) => {
                if (!isMounted) return;
                if (side === "raw") rawReadyRef.current = true;
                if (side === "graded") gradedReadyRef.current = true;

                try {
                  event.target.mute();
                  if (inViewRef.current) {
                    event.target.playVideo();
                  } else {
                    event.target.pauseVideo();
                  }
                } catch {}

                if (rawReadyRef.current && gradedReadyRef.current) {
                  setIsLoading(false);
                }
              },
              onError: (event) => {
                if (!isMounted) return;
                setIsLoading(false);
                setLoadError(`YouTube player error code: ${event.data}`);
              },
            },
          });
        };

        rawPlayerRef.current = createIsolatedPlayer(
          rawContainerRef.current,
          comparison.raw.youtubeId,
          "raw"
        );
        gradedPlayerRef.current = createIsolatedPlayer(
          gradedContainerRef.current,
          comparison.graded.youtubeId,
          "graded"
        );
      } catch (err: unknown) {
        if (isMounted) {
          setIsLoading(false);
          setLoadError(
            err instanceof Error
              ? err.message
              : "Could not load YouTube comparison player."
          );
        }
      }
    }

    initComparisonPlayers();

    return () => {
      isMounted = false;
      rawReadyRef.current = false;
      gradedReadyRef.current = false;

      if (rawPlayerRef.current && typeof rawPlayerRef.current.destroy === "function") {
        try {
          rawPlayerRef.current.destroy();
        } catch {}
        rawPlayerRef.current = null;
      }
      if (gradedPlayerRef.current && typeof gradedPlayerRef.current.destroy === "function") {
        try {
          gradedPlayerRef.current.destroy();
        } catch {}
        gradedPlayerRef.current = null;
      }
      if (rawContainer) rawContainer.innerHTML = "";
      if (gradedContainer) gradedContainer.innerHTML = "";
    };
  }, [hasActivated, comparison.raw.youtubeId, comparison.graded.youtubeId]);

  const handleManualActivate = () => {
    window.dispatchEvent(
      new CustomEvent("bydesign:video-play", {
        detail: { id: "section-08-comparison" },
      })
    );
    inViewRef.current = true;
    setAutoplaySkipped(false);
    setHasActivated(true);
  };

  const handleSyncRestart = () => {
    window.dispatchEvent(
      new CustomEvent("bydesign:video-play", {
        detail: { id: "section-08-comparison" },
      })
    );
    try {
      if (rawReadyRef.current) {
        rawPlayerRef.current?.seekTo(0, true);
        rawPlayerRef.current?.playVideo();
      }
    } catch {}
    try {
      if (gradedReadyRef.current) {
        gradedPlayerRef.current?.seekTo(0, true);
        gradedPlayerRef.current?.playVideo();
      }
    } catch {}
  };

  const handleToggleAudio = (side: "raw" | "graded") => {
    if (!hasActivated) {
      handleManualActivate();
      return;
    }

    window.dispatchEvent(
      new CustomEvent("bydesign:video-play", {
        detail: { id: "section-08-comparison" },
      })
    );

    const nextAudio: AudioTrack = activeAudio === side ? "none" : side;
    setActiveAudio(nextAudio);

    try {
      if (nextAudio === "raw") {
        gradedPlayerRef.current?.mute();
        rawPlayerRef.current?.unMute();
      } else if (nextAudio === "graded") {
        rawPlayerRef.current?.mute();
        gradedPlayerRef.current?.unMute();
      } else {
        rawPlayerRef.current?.mute();
        gradedPlayerRef.current?.mute();
      }
    } catch {}
  };

  const renderPanel = (
    side: "raw" | "graded",
    containerRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const data = side === "raw" ? comparison.raw : comparison.graded;
    const isGraded = side === "graded";

    return (
      <div
        className={`relative flex flex-col p-3.5 sm:p-4 bg-[#16171a] ${
          side === "raw"
            ? "border-b md:border-b-0 md:border-r border-white/10"
            : ""
        }`}
      >
        {/* Top Slate Header Strip */}
        <div className="flex items-center justify-between gap-2 pb-3">
          <span
            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full ${
              isGraded
                ? "bg-accent text-background font-medium shadow-sm"
                : "bg-white/[0.08] text-background/90 border border-white/15"
            }`}
          >
            {data.badge}
          </span>

          <a
            href={`https://www.youtube.com/watch?v=${data.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full text-[#8E8B82] hover:text-background hover:bg-white/[0.06] transition-colors whitespace-nowrap"
            title={`Watch ${data.title} directly on YouTube`}
          >
            <span>WATCH ON YT</span>
            <ArrowOutwardIcon className="w-3 h-3" />
          </a>
        </div>

        {/* 16:9 Concentric Rounded Media Viewport */}
        <div className="relative aspect-video w-full rounded-xl bg-gradient-to-br from-[#1b1c20] via-[#111214] to-black border border-white/10 overflow-hidden">
          {!hasActivated || loadError ? (
            <>
              <Image
                src={data.posterUrl}
                alt={data.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center text-transparent"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25" />

              {loadError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-charcoal/80 backdrop-blur-sm z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent mb-1.5">
                    SCREENING ROOM NOTICE
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-background/80 mb-4 max-w-[34ch] leading-relaxed">
                    Embedded stream unavailable on this network. Open directly on YouTube for full HD playback.
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${data.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-full bg-accent text-background hover:bg-background hover:text-foreground transition-colors shadow-md"
                  >
                    <span>WATCH ON YOUTUBE</span>
                    <ArrowOutwardIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleManualActivate}
                  aria-label={`Play ${data.title}`}
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-full border backdrop-blur-md transition-all duration-200 ${
                      isGraded
                        ? "bg-accent border-accent text-background ring-4 ring-accent/20 group-hover:bg-background group-hover:text-foreground group-hover:border-background"
                        : "bg-charcoal/80 border-white/25 text-background group-hover:bg-accent group-hover:border-accent"
                    }`}
                  >
                    <PlayIcon className="w-3.5 h-3.5" />
                    <span>{autoplaySkipped ? "PLAY COMPARISON" : "LOADING PREVIEW"}</span>
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="relative w-full h-full bg-black">
              <div
                ref={containerRef}
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full"
              />
            </div>
          )}
        </div>

        {/* Lower Technical Spec Line */}
        <div className="pt-3 flex items-center justify-between gap-2">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.08em] truncate ${
              isGraded ? "text-accent" : "text-[#8E8B82]"
            }`}
          >
            {data.meta}
          </span>
          {hasActivated && !loadError && (
            <button
              type="button"
              onClick={() => handleToggleAudio(side)}
              className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1 rounded-full border transition-colors cursor-pointer shrink-0 ${
                activeAudio === side
                  ? "bg-accent border-accent text-background"
                  : "border-white/15 bg-white/[0.04] text-background/85 hover:border-background hover:text-background"
              }`}
            >
              {activeAudio === side ? (
                <>
                  <VolumeUpIcon className="w-3 h-3" />
                  <span>AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="w-3 h-3" />
                  <span>UNMUTE</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={wrapperRef}
      data-reveal
      className="w-full rounded-2xl border border-white/12 mb-16 lg:mb-20 overflow-hidden bg-[#16171a] shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
    >
      {/* Paired Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {renderPanel("raw", rawContainerRef)}
        {renderPanel("graded", gradedContainerRef)}
      </div>

      {/* Shared Studio Comparison Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-charcoal/95 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              hasActivated && !loadError
                ? "bg-accent animate-pulse"
                : "bg-white/30"
            }`}
          />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#8E8B82]">
            {loadError
              ? "COMPARISON FALLBACK // OPEN ON YOUTUBE"
              : hasActivated
              ? isLoading
                ? "INITIALIZING SIDE-BY-SIDE STREAM..."
                : "LIVE SIDE-BY-SIDE // AUTO-PAUSES OFF-SCREEN"
              : autoplaySkipped
              ? "DATA-SAVER / REDUCED MOTION // CLICK TO PLAY"
              : "VIEWPORT-GATED COMPARISON // LOADS ON SCROLL"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!hasActivated ? (
            <button
              type="button"
              onClick={handleManualActivate}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-4 py-1.5 rounded-full bg-accent text-background hover:bg-background hover:text-foreground transition-colors cursor-pointer"
            >
              <PlayIcon className="w-3.5 h-3.5" />
              <span>PLAY BOTH SIDE-BY-SIDE</span>
            </button>
          ) : (
            !loadError && (
              <button
                type="button"
                onClick={handleSyncRestart}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] px-4 py-1.5 rounded-full bg-white/10 hover:bg-accent text-background transition-colors cursor-pointer"
                title="Restart both Raw and Final videos from 0:00 together"
              >
                <ReplayIcon className="w-3.5 h-3.5" />
                <span>SYNC RESTART BOTH</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
