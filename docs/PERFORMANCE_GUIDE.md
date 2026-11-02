# BY DESIGN STUDIO
# PERFORMANCE AND THREAT MITIGATION GUIDE

> **CRITICAL DIRECTIVE FOR ALL AGENTS & DEVELOPERS:**
> This is a high-end, media-rich portfolio website. Without strict engineering discipline, media assets and third-party scripts will destroy page speed, mobile data allowances, and Core Web Vitals (LCP, CLS, INP).
> **Every agent working on this repository must strictly adhere to the rules below.**

---

## 1. THE 7 CRITICAL PERFORMANCE THREATS

### Threat 1: YouTube Embedded Player Thrashing (The #1 Speed Killer)
* **The Danger:**
  A single standard YouTube `<iframe>` downloads ~1.2 MB of scripts, player runtimes, styles, and trackers. If the homepage or initial views load 15–16 YouTube iframes, the initial payload explodes to **>15–20 MB**, stalling the main browser thread and ruining mobile performance.
* **Mandatory Rule:**
  * **Strict Click-to-Load Architecture.**
  * **ZERO** active YouTube `<iframe>` elements may exist on initial page load.
  * Every video entry (featured work, horizontal rail, short forms, and detail pages) renders a lightweight, optimized WebP poster image with an SVG Play trigger.
  * An embedded YouTube iframe is mounted **ONLY** when the visitor explicitly clicks the Play control.
  * Use the privacy-enhanced domain (`www.youtube-nocookie.com`).

### Threat 2: Unoptimized or Oversized Images
* **The Danger:**
  High-resolution camera stills and creator portraits can easily reach 5 MB–10 MB each. Serving uncompressed JPEGs directly destroys Largest Contentful Paint (LCP) and consumes user bandwidth.
* **Mandatory Rule:**
  * Use **Next.js `<Image />`** with modern format delivery (**WebP / AVIF**).
  * Use **Cloudinary transformations** (`f_auto,q_auto,w_{width}`) for remote assets.
  * The Hero Creator photo (on the right column) must specify `priority={true}` with explicit `sizes` so the browser prioritizes it immediately without lazy-load lag, guaranteeing sub-second LCP.
  * All images below the initial fold must be lazy-loaded.

### Threat 3: Massive Video Files in Git Repository or `/public`
* **The Danger:**
  Raw `.mov` and uncompressed camera files (some exceeding 1 GB in source archives) will freeze builds, saturate Git history, and destroy bandwidth if placed in `public/`.
* **Mandatory Rule:**
  * **ZERO large source videos in `public/` or Git.**
  * The Hero section contains **NO VIDEO** (pure static editorial photography).
  * Full-length work is streamed strictly from YouTube.
  * Any optional short preview clips must be compressed (H.264/WebM under 1.5 MB) and hosted on Cloudinary, never locally in the repo.

### Threat 4: Heavy Third-Party Animation Libraries on Main Thread
* **The Danger:**
  Overusing large animation runtimes (e.g. importing full Framer Motion or GSAP plugins across every small element) bloats client bundles, delays First Input Delay / INP, and causes scroll jitter.
* **Mandatory Rule:**
  * Use **native CSS transitions** (`transform`, `opacity`) for hover states, button transitions, and modal toggles.
  * Use native browser **`IntersectionObserver`** for viewport scroll reveals.
  * Never run un-throttled scroll event listeners. Respect `prefers-reduced-motion`.

### Threat 5: Main-Thread Choking on Horizontal Project Rail
* **The Danger:**
  Attaching un-throttled JavaScript `scroll` or `mousemove` listeners to the horizontal project rail triggers layout recalculation ("layout thrashing") on every frame.
* **Mandatory Rule:**
  * Use **hardware-accelerated CSS Scroll Snapping**:
    ```css
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    ```
  * Allow the browser GPU to handle 60–120 FPS scrolling natively without JS interference.

### Threat 6: Font Layout Shifts & Jitter (CLS)
* **The Danger:**
  Using three distinct fonts (*Playfair Display*, *Open Sans*, *JetBrains Mono*) can trigger Flash of Invisible Text (FOIT), Flash of Unstyled Text (FOUT), and Cumulative Layout Shift (CLS).
* **Mandatory Rule:**
  * Fonts must strictly be loaded via `next/font/google` in `layout.tsx`.
  * `next/font` automatically self-hosts Google Fonts at build time with zero external network requests and matches fallback metrics to guarantee **0 CLS**.

### Threat 7: Unnecessary React Re-renders Across the 13 Homepage Sections
* **The Danger:**
  The homepage contains 13 sections. If state is stored globally or high up in the component tree, simple interactions (like hovering a thumbnail or opening a menu) will trigger full-page re-renders.
* **Mandatory Rule:**
  * Keep state strictly localized (e.g., thumbnail lightbox state isolated to the gallery component; mobile menu state isolated to the navbar).
  * Keep static editorial copy and showcase sections as React Server Components where interactive state is not needed.

---

## 2. PRE-DEPLOYMENT PERFORMANCE CHECKLIST

Before marking any phase complete, verify:
- [ ] No YouTube `<iframe>` exists on initial load of the homepage or `/work/[slug]`.
- [ ] Hero Creator picture loads as optimized WebP with `priority={true}`.
- [ ] No video tag exists in the Hero section.
- [ ] No media file in `/public` exceeds 500 KB.
- [ ] CSS scroll snap handles the horizontal rail smoothly without JS scroll listeners.
- [ ] Lighthouse Performance score is >= 90 on mobile throttled network.
