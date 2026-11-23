/**
 * Network-adaptive YouTube quality helpers.
 *
 * Uses native browser Network Information API (`navigator.connection`)
 * on Android / Chromium with latency probe fallback for Safari / Firefox.
 */

export interface AdaptiveQuality {
  tier: "fast" | "moderate" | "slow";
  targetResolution: string;
  label: string;
}

interface NetworkInformationLike {
  downlink?: number;
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

const YT_EMBED_ORIGIN = "https://www.youtube-nocookie.com";
const PRECONNECT_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://i.ytimg.com",
  "https://www.google.com",
];

let hasPreconnected = false;
let probeStarted = false;
let probedLatencyMs: number | null = null;

const TIERS: Record<AdaptiveQuality["tier"], AdaptiveQuality> = {
  fast: { tier: "fast", targetResolution: "1080p", label: "1080P TARGET" },
  moderate: { tier: "moderate", targetResolution: "720p", label: "720P TARGET" },
  slow: { tier: "slow", targetResolution: "480p", label: "480P TARGET" },
};

function getConnection(): NetworkInformationLike | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
}

export function warmYouTubeConnection(youtubeId?: string): void {
  if (typeof document === "undefined") return;

  if (!hasPreconnected) {
    hasPreconnected = true;
    for (const origin of PRECONNECT_ORIGINS) {
      if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
        continue;
      }
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  }

  const connection = getConnection();
  const hasConnectionApi =
    !!connection && (typeof connection.downlink === "number" || !!connection.effectiveType);

  if (!hasConnectionApi && !probeStarted && youtubeId) {
    probeStarted = true;
    const start = performance.now();
    fetch(`https://i.ytimg.com/vi/${youtubeId}/default.jpg`, {
      mode: "no-cors",
      cache: "no-store",
    })
      .then(() => {
        probedLatencyMs = performance.now() - start;
      })
      .catch(() => {
        probedLatencyMs = null;
      });
  }
}

/**
 * Calculates a realistic target quality for the visitor's network.
 * Note: YouTube 1080p DASH requires >= 5-8 Mbps throughput.
 */
export function getAdaptiveVideoQuality(): AdaptiveQuality {
  const connection = getConnection();

  if (connection) {
    if (connection.saveData) return TIERS.slow;

    const type = connection.effectiveType;
    if (type === "slow-2g" || type === "2g" || type === "3g") return TIERS.slow;

    if (typeof connection.downlink === "number" && connection.downlink > 0) {
      // 1080p stream requires >= 8 Mbps sustained throughput
      if (connection.downlink >= 8.0) return TIERS.fast;
      // 720p stream requires >= 3.0 Mbps
      if (connection.downlink >= 3.0) return TIERS.moderate;
      return TIERS.slow;
    }

    if (type === "4g") return TIERS.moderate;
  }

  if (probedLatencyMs !== null) {
    if (probedLatencyMs < 200) return TIERS.fast;
    if (probedLatencyMs < 600) return TIERS.moderate;
    return TIERS.slow;
  }

  return TIERS.moderate;
}

/**
 * Subscribes to live network condition shifts (e.g., toggling DevTools throttling
 * or switching between Wi-Fi and Cellular).
 */
export function subscribeToNetworkChanges(
  onChange: (quality: AdaptiveQuality) => void
): () => void {
  if (typeof window === "undefined") return () => {};
  const connection = getConnection();

  if (!connection || typeof connection.addEventListener !== "function") {
    return () => {};
  }

  const handler = () => {
    onChange(getAdaptiveVideoQuality());
  };

  connection.addEventListener("change", handler);
  return () => {
    connection.removeEventListener?.("change", handler);
  };
}

/** Builds an embed URL for fallback rendering without deprecated parameters. */
export function buildYouTubeEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    playsinline: "1",
    enablejsapi: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  return `${YT_EMBED_ORIGIN}/embed/${youtubeId}?${params.toString()}`;
}

export function formatPlaybackQualityBadge(quality: string): { label: string; isHd: boolean } {
  switch (quality) {
    case "highres":
    case "hd2160":
      return { label: "4K UHD • ACTIVE", isHd: true };
    case "hd1440":
      return { label: "1440P QHD • ACTIVE", isHd: true };
    case "hd1080":
      return { label: "1080P HD • ACTIVE", isHd: true };
    case "hd720":
      return { label: "720P HD • ACTIVE", isHd: true };
    case "large":
      return { label: "480P • STREAMING", isHd: false };
    case "medium":
      return { label: "360P • STREAMING", isHd: false };
    case "small":
      return { label: "240P • STREAMING", isHd: false };
    case "tiny":
      return { label: "144P • STREAMING", isHd: false };
    case "auto":
      return { label: "AUTO ADAPTING", isHd: false };
    default:
      return { label: quality.toUpperCase(), isHd: false };
  }
}
