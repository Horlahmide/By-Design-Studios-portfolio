<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## By Design Studio - Project Rules for Agents

1. **Two-Column Hero (NO VIDEO):**
   - The hero section uses a two-column editorial spread: **Left Column = Brand Description & Dual CTAs**; **Right Column = Creator Photograph**.
   - **STRICTLY NO VIDEO** in the hero section.
2. **Performance First (`docs/PERFORMANCE_GUIDE.md`):**
   - **Click-to-Load YouTube:** Never mount YouTube `<iframe>` elements on initial page load. Render lightweight WebP poster images and mount the iframe only on user click.
   - **No Large Videos in Git or `/public`:** Keep full videos on YouTube and preview clips on Cloudinary.
   - **Image Priority:** The hero creator photo must use Next.js `<Image priority={true} />` with explicit `sizes` to ensure 0 CLS and rapid LCP.
3. **Design System Integrity (`DESIGN.md`):**
   - High-end editorial print meets cinema dark.
   - **Level 0 Geometry (0px border radius):** Crisp right angles, 1px hairlines, no floating rounded cards, no generic drop shadows.
   - Typography: Playfair Display (headlines), Open Sans (body/UI), JetBrains Mono (technical slates/labels). Cobalt `#4263D8` reserved strictly for focal engagement.
4. **Section Structure (`docs/PROJECT_CONTEXT.md`):**
   - Follow the 13 approved homepage sections in exact sequential order.
   - The About section (Section 7) is static and brand-focused. Do NOT create an "About Brand / About Videographer" toggle.
5. **Stitch Screen Reference Scope:**
   - The single primary reference screen from Stitch project `"Cinematic Videographer Portfolio Design"` is **`Homepage Desktop`** (`design/homepage-desktop.png` / Stitch screen `3ee414b9e59a4612bd916e585a3e6581`).
   - **DO NOT reference or use the following Stitch screens** (they are inconsistent; we implement responsive mobile and detail routes ourselves):
     1. `Homepage Mobile`
     2. `Project Detail Desktop`
     3. `Project Detail Mobile`
6. **Phase-by-Phase Roadmap (`docs/PHASE_ROADMAP.md`):**
   - Implementation must proceed strictly through the 9 verifiable phases in `docs/PHASE_ROADMAP.md`. Never attempt to build the entire site in one uncontrolled pass. Verify and approve each phase before moving to the next.
