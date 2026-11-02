# BY DESIGN STUDIO
# PHASE-BY-PHASE IMPLEMENTATION ROADMAP

> [!IMPORTANT]
> **CRITICAL ARCHITECTURAL DIRECTIVE (STITCH DESIGN VS. HERO OVERRIDE):**
> 1. **Baseline Source of Truth:** We are building this portfolio with direct respect to the **Google Stitch `Homepage Desktop` design** (`projects/14997207708030666386`, screen `3ee414b9e59a4612bd916e585a3e6581` and [`design/homepage-desktop.png`](file:///c:/Users/SAMUEL%20AYOOLA/OneDrive/Desktop/Charity%20Portfolio/portfolio/design/homepage-desktop.png)).
> 2. **THE HERO SECTION IS EXPLICITLY CHANGED:** The Google Stitch design contains an old, full-bleed cinematic video background hero. **WE HAVE OVERRIDDEN THIS ENTIRELY.**
>    * The new hero is a **Two-Column Editorial Spread**:
>      * **Left Column:** Brand description, Playfair Display headline (*"Every Frame Tells a Story"*), brand overview copy, dual rectangular action triggers (*"Explore Work →"* and *"Let's Talk"*), and technical production slate.
>      * **Right Column:** High-resolution editorial portrait of the creator framed in 0px right angles with a 1px hairline border.
>      * **STRICTLY NO VIDEO** in the Hero section.
> 3. **From Section 2 (Featured Work) through to Section 13 (Footer):** Everything faithfully follows the Google Stitch `Homepage Desktop` visual composition and design tokens.
> 4. **Incremental Discipline:** Build strictly phase-by-phase. No building everything at once. Each phase must be verified and approved before proceeding to the next.
> 5. **Future Asset Ingestion:** More videos and thumbnails will be provided by the owner. All media sections must be driven by a centralized data layer (`src/data/projects.ts` and `src/data/thumbnails.ts`) so adding future videos and thumbnails requires zero changes to layout or styling code.

---

## THE 9 VERIFIABLE IMPLEMENTATION PHASES

```
[Phase 1] ──► [Phase 2] ──► [Phase 3] ──► [Phase 4] ──► [Phase 5] ──► [Phase 6] ──► [Phase 7] ──► [Phase 8] ──► [Phase 9]
  Design         Data &       Specialty      Studio        Services,     In-Place      Dynamic       Contact      Final Polish &
 Tokens &       Featured      Galleries     Narrative       Process       Player &     Detail        Path &      Asset Plug-In
Two-Column       Work &       (Shorts &    (About & Why   & Conversion    Theater      Routes       Feedback     (When owner
   Hero           Rail       Thumbnails)     Hire Me)       (Bottom)       Modal     (/work/[slug])                sends rest)
```

---

### **PHASE 1: Design Tokens, Layout Shell & The Two-Column Hero**
* **Scope:**
  * **Global Design Foundation:** Verify and configure tokens in `src/app/globals.css` (Warm Ivory `#F5F1E9`, Ink Black `#171717`, Hairline `rgba(23, 23, 23, 0.14)`, Cobalt `#4263D8`, 0px border radius, and Google fonts: *Playfair Display*, *Open Sans*, *JetBrains Mono*).
  * **Header / Navigation Bar:** Sticky editorial navbar with studio mark (`BY DESIGN STUDIO`), primary navigation links (`WORK`, `ABOUT`, `SERVICES`, `CONTACT`), and rectangular `START A PROJECT →` CTA. Clean ivory backing with a smooth 1px hairline border on scroll.
  * **Section 1 — Two-Column Editorial Hero:**
    * **Left Column:** Technical slate kicker (`01 // CREATIVE POST-PRODUCTION & STORYTELLING`), headline in Playfair Display (*"Every Frame Tells a Story"*), brand overview copy explaining what By Design Studio does for creators, dual 0px sharp rectangular CTAs (*"Explore Work →"* and *"Let's Talk"*), and production proof counters.
    * **Right Column:** High-resolution editorial portrait of the creator with 1px hairline framing (`rgba(23, 23, 23, 0.14)`), technical metadata annotation tag (`[LEAD EDITOR & STORYTELLER]`), loaded with Next.js `<Image priority={true} />`.
    * **Strict Mandate:** **NO VIDEO** in the hero section.
* **Milestone 1 Verification:** Run dev server, inspect visual alignment, typography scales, contrast, and mobile stacking.

---

### **PHASE 2: Scalable Data Layer & Primary Video Showcase**
* **Scope:**
  * **Centralized Data Layer (`src/data/projects.ts`):** Structured TypeScript array for all projects (`slug`, `title`, `category`, `runtime`, `posterUrl`, `youtubeId`, `isFeatured`). Built specifically so new client videos can be added effortlessly later.
  * **Section 2 — Featured Work:** Large alternating 7/5 column editorial spreads directly matching Stitch `Homepage Desktop` (`design/featured-work.png`). Camera slates, category tags, project titles, and click-to-load posters.
  * **Section 3 — Additional Work (Horizontal Project Rail):** User-controlled, hardware-accelerated CSS scroll-snapping rail (`scroll-snap-type: x mandatory`). No runaway auto-scroll.
* **Milestone 2 Verification:** Verify alternating editorial compositions, test horizontal scroll on touch and trackpad, confirm zero YouTube iframes are mounted on initial load.

---

### **PHASE 3: Specialty Creator Formats (Shorts, Thumbnails & Intros)**
* **Scope:**
  * **Section 4 — Short-Form Video Showcase:** 9:16 vertical poster compositions with selective phone framing.
  * **Section 5 — Thumbnail Design Gallery:** Distinct 16:9 thumbnail design grid. Built with an in-page **Lightbox Modal** so clicking a thumbnail opens an enlarged high-res view with keyboard Escape and close controls. Populated with our 3 current designs + 3 curated placeholders awaiting final client drops.
  * **Section 6 — YouTube Intro Showcase:** Dedicated intro animation showcase, kept strictly distinct from static thumbnails.
* **Milestone 3 Verification:** Test lightbox open/close states, verify separate visual identity between intros and thumbnails, inspect responsive grid collapse.

---

### **PHASE 4: Studio Narrative & Creative Authority**
* **Scope:**
  * **Section 7 — About By Design Studio:** Single, static brand-focused layout matching Stitch `design/about-section.png` (brand-relevant image on left, studio philosophy and statement on right). **Explicitly NO toggle buttons**.
  * **Section 8 — Why Hire Me / Creative Approach:** Editorial raw footage vs. finished color grade comparison + the 3 numbered principles (*01. Story Before Effects*, *02. The Details Matter*, *03. The Vision Stays Yours*).
* **Milestone 4 Verification:** Check typography line-lengths (`max-w-[68ch]`), contrast, and layout stability.

---

### **PHASE 5: Services, Working Process, Engagement & Footer**
* **Scope:**
  * **Section 9 — Services:** Tabular editorial ledger rows (Editing, Color Grading, Sound Design, Packaging) with 1px hairline dividers.
  * **Section 10 — How I Work:** Clear, stepped production pipeline (Ingest → Assembly → Polish → Delivery).
  * **Section 11 — Ways to Work Together:** Structured engagement cards (Retainer, Project-by-Project, Consultation).
  * **Section 12 — Final Call to Action:** High-contrast conversion banner (`START A PROJECT →`).
  * **Section 13 — Footer:** Complete site directory, social links, legal notices, camera slate timecode stamp.
* **Milestone 5 Verification:** Verify the entire homepage from top to bottom on Desktop, Tablet, and Mobile.

---

### **PHASE 6: In-Place Video Playback & Theater Modal (No YouTube Redirects)**
* **Scope:**
  * **In-Place Poster Swap:** Clicking "Play" swaps the lightweight poster for an embedded `youtube-nocookie.com` player directly within the page.
  * **Homepage Theater Modal:** Clicking "Watch" on any card opens a distraction-free dark cinema modal (`#111214`) on the homepage.
  * **YouTube Clean Branding Parameters:** `rel=0`, `modestbranding=1`, `iv_load_policy=3` to prevent external clutter and competitor suggestions.
  * **Rule:** The visitor is **NEVER redirected to YouTube**.
* **Milestone 6 Verification:** Test video playback directly inside the site frame on desktop and mobile.

---

### **PHASE 7: Dedicated Dynamic Project Detail Pages (`/work/[slug]`)**
* **Scope:**
  * Reusable App Router route at `src/app/work/[slug]/page.tsx`.
  * Pre-rendered via `generateStaticParams()` from `src/data/projects.ts`.
  * Displays project title, category, runtime, large letterboxed video frame with click-to-load player, creative approach, and next project navigation.
* **Milestone 7 Verification:** Test navigation from homepage cards to detail pages and verify 404 handling.

---

### **PHASE 8: Contact Path & Inquiry Experience**
* **Scope:**
  * Dedicated contact / project inquiry experience.
  * Input fields styled in 0px sharp rectangular aesthetic with cobalt focus rings.
  * Accessible form validation and clean submission feedback.
* **Milestone 8 Verification:** Test form validation, tab keyboard navigation, and mobile input usability.

---

### **PHASE 9: Final Asset Ingestion, Polish & Performance Verification**
* **Scope:**
  * **Plug in Incoming Assets:** When the owner delivers the remaining YouTube links, videos, and thumbnails, we simply append them into `src/data/projects.ts` and `src/data/thumbnails.ts` without touching component code.
  * **Performance Audit:** Verify Lighthouse score (target: >= 90 performance, 0 CLS layout shift).
  * **Build Validation:** Run `npm run build` to ensure static generation and TypeScript checks pass cleanly.
