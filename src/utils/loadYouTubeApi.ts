/**
 * Singleton script loader for the official YouTube IFrame Player API.
 * Ensures https://www.youtube.com/iframe_api is injected once and resolves
 * a typed promise when window.YT.Player is ready.
 */

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

let apiPromise: Promise<typeof window.YT> | null = null;

export function loadYouTubeIframeApi(): Promise<typeof window.YT> {
  // 1. Guard against Server-Side Rendering (SSR)
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("YouTube IFrame API cannot be initialized in an SSR environment")
    );
  }

  // 2. Return immediately if YT.Player is already initialized and available
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  // 3. Return existing active promise if already pending
  if (apiPromise) {
    return apiPromise;
  }

  apiPromise = new Promise((resolve, reject) => {
    let pollIntervalId: number | undefined;

    // Global fail-safe timeout (covers fresh injection and existing script polling)
    const timeoutId = window.setTimeout(() => {
      if (pollIntervalId !== undefined) window.clearInterval(pollIntervalId);
      apiPromise = null;
      const scriptToRemove = document.querySelector<HTMLScriptElement>(
        'script[src*="youtube.com/iframe_api"]'
      );
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
      reject(new Error("Timeout (10s) waiting for YouTube IFrame API to initialize"));
    }, 10000);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      if (pollIntervalId !== undefined) window.clearInterval(pollIntervalId);
    };

    const onReadySuccess = () => {
      cleanup();
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        apiPromise = null;
        reject(
          new Error("YouTube API ready callback fired, but window.YT.Player is undefined")
        );
      }
    };

    // Chain onto any pre-existing callback safely
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") {
        try {
          previousReady();
        } catch (err) {
          console.warn("Previous onYouTubeIframeAPIReady handler threw an error:", err);
        }
      }
      onReadySuccess();
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="youtube.com/iframe_api"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = (error) => {
        cleanup();
        apiPromise = null;
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        reject(new Error(`Failed to load YouTube IFrame API script: ${error}`));
      };
      document.head.appendChild(script);
    } else {
      // Script tag exists; poll in case window.YT initialized without triggering our callback hook
      pollIntervalId = window.setInterval(() => {
        if (window.YT && window.YT.Player) {
          onReadySuccess();
        }
      }, 50);
    }
  });

  return apiPromise;
}

