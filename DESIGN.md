---
name: By Design Studio - Editorial Portfolio
colors:
  background: "#f5f1e9"
  foreground: "#171717"
  charcoal: "#111214"
  surface-container: "#e6e2da"
  text-primary: "#171717"
  text-muted: "#66645f"
  text-subtle: "#444748"
  accent: "#4263d8"
  accent-hover: "#3154c9"
  border-light: "rgba(23, 23, 23, 0.14)"
  border-subtle: "rgba(23, 23, 23, 0.08)"
  border-dark: "rgba(245, 241, 233, 0.18)"
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: "600"
    lineHeight: 88px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: "600"
    lineHeight: 50px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: "500"
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: "500"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: "400"
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: "400"
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: "400"
    lineHeight: 34px
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Open Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Open Sans
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  label-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
    letterSpacing: 0.06em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "400"
    lineHeight: 16px
    letterSpacing: 0.08em
  action-ui:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.02em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
  space-2xl: 5rem
---

## Brand & Style

This design system embodies the tension between high-end editorial print and widescreen cinema. Engineered for master visual storytellers, directors, and cinematographers, the system strips away conventional SaaS chrome and digital clutter to present film works as gallery-grade artifacts.

The design philosophy relies on:

- **Cinematic Juxtaposition:** Dual-canvas storytelling shifting between warm editorial ivory and immersive charcoal film viewports.
- **Typographic Scale Dramaticism:** Deliberate friction between the literary authority of high-contrast serif headlines, functional neutral body typography, and raw monospaced camera slate annotations.
- **Editorial Discipline:** Razor-sharp hairline grids, stark structural borders, generous negative space, and complete avoidance of soft decorative shadows, plastic blurs, or generic SaaS card components.

## Colors

The palette operates across two deliberate surface contexts: Editorial Canvas (warm paper) and Dark Cinema (projection room).

### Editorial Canvas (Default)

- **Primary Background:** `#F5F1E9` (Warm editorial ivory) creates a tactile, luminous foundation reminiscent of heavy uncoated stock.
- **Primary Text:** `#171717` (Ink black) provides high-contrast legibility and commanding hierarchy.
- **Secondary / Supporting Text:** `#66645F` (Muted charcoal) for synopsis details, credits, and runtimes.
- **Hairline Borders:** `rgba(23, 23, 23, 0.12)` for razor-thin editorial divisions.

### Cinematic Dark Surface (Reels & Projection)

- **Dark Surface Background:** `#111214` (Near-black charcoal) creates deep contrast, eliminating screen glare around video embeds.
- **Dark Canvas Text:** `#F5F1E9` for primary headlines, with `#8E8B82` for secondary metadata.
- **Dark Hairline Borders:** `rgba(245, 241, 233, 0.14)` framing cinematic viewports and timelines.

### Interactive Accent

- **Cobalt Accent:** `#4263D8` is reserved strictly for focal engagement: active navigation states, playback progress scrubbers, focused form fields, and directional link indicators. Never apply as decorative wash or heavy surface fill.

## Typography

Typography establishes an intentional cadence between editorial literature and technical filmmaking production.

- **Playfair Display (Display & Headlines):** Used for production titles, dramatic thesis statements, and screen chapter marks. Features generous vertical leading with slight negative tracking on large scales to emulate classic broadsheet and film title typography.
- **Open Sans (Body & Operational UI):** Provides neutral, utilitarian readability across project narratives, director's statements, button labels, and contact forms.
- **JetBrains Mono (Technical Metadata & Sequence Stamps):** Formatted in uppercase with expanded tracking. Applied to reel sequences (`01 / BRAND FILM`), focal length/aspect ratio tags (`35MM // 2.39:1`), camera specifications, timecodes, and production roles.

## Layout & Spacing

The layout is grounded in a 12-column architectural grid with deliberate asymmetric offsets that reflect bespoke print spreads rather than automated modular dashboards.

### Grid Architecture

- **Desktop (≥ 1024px):** 12-column fluid grid, `4rem` outer margin, `2rem` gutters. Maximum layout width for pure text content is capped at `68ch` to safeguard reading rhythm. Cinema media viewports can break out to full bleed or edge-to-edge container margins.
- **Tablet (768px – 1023px):** 8-column grid with `2.5rem` outer margins and `1.5rem` gutters.
- **Mobile (< 768px):** 4-column grid with `1.25rem` outer margins and `1rem` gutters. Multi-column metadata panels collapse into sequenced stacked rows separated by hairlines.

### Spatial Rhythm

- Employ extreme negative space (`space-2xl` and above) between curated film entries to let visual assets breathe.
- Component-level spacing relies strictly on `space-xs` through `space-md` to maintain compact, razor-sharp alignment between technical slates and project descriptions.

## Elevation & Depth

This design system strictly rejects volumetric skeuomorphism, ambient dropshadows, blurred elevation stacks, and floating cards.

Visual depth is achieved exclusively through:

- **Pure Planar Juxtaposition:** Direct contrast between full-bleed `#F5F1E9` and deep `#111214` sections creates spatial immersion akin to entering a dark cinema theater.
- **1px Architectural Hairlines:** Borders are drawn with hairline precision (`1px solid rgba(23, 23, 23, 0.12)` on light surfaces; `1px solid rgba(245, 241, 233, 0.14)` on dark surfaces). They delineate technical fields, separate project rows, and anchor film viewports without lifting them off the surface.
- **Layered Still & Moving Imagery:** Depth is generated through cinematic letterboxing (2.39:1, 16:9, and 4:3 viewports) bordered by clean hairline trims. Focus states invoke micro-contrast changes or sharp cobalt cursor tracks rather than shadow enlargement.

## Shapes

The shape system is strictly architectural and uncompromising: **Level 0 (Sharp, 0px)**.

Every visual element—film thumbnails, framing containers, action triggers, technical badges, input surfaces, and audio toggles—features crisp 90-degree right angles. This preserves the visual rigor of contact sheets, production slates, and editorial magazine spreads, rejecting the playful consumer feel of rounded corners.

## Components

### Project Showcase Panels (Anti-Card)

- **Structure:** Never wrap project showcases in rounded floating containers. Projects are rendered as full-width or staggered 7/5 column editorial spreads bounded by hairline borders.
- **Meta Slate:** Every showcase begins with a JetBrains Mono metadata header (`01 // COMMERCIAL`, `RUN TIME 02:14`, `ARRI ALEXA MINI LF`).
- **Media Frame:** Letterboxed viewport with a 1px border. Hovering initiates silent ambient looping previews with a disciplined custom cobalt play indicator (`#4263D8`).

### Buttons & Action Links

- **Primary Action:** Solid `#171717` fill with `#F5F1E9` typography on light canvas; `#F5F1E9` fill with `#111214` typography on dark canvas. Completely rectangular (0px radius). Padding: `0.75rem 1.75rem`. Hover state transitions to `#4263D8` with sharp instantaneous ease (150ms).
- **Secondary / Text Action:** Underlined editorial link. A 1px underline positioned with generous text-underline-offset (4px). On hover, underline color shifts to cobalt `#4263D8` accompanied by an inline arrow marker (`→`).

### Chips & Production Badges

- Constructed with `label-mono-sm` in JetBrains Mono.
- Transparent background bordered by a 1px hairline. Padding: `0.25rem 0.5rem`.
- Used strictly for technical annotations: aspect ratios (`2.39:1`), roles (`DIRECTOR & DP`), and awards (`VIMEO STAFF PICK`).

### Interactive Lists & Filmography Index

- Dense, structured tabular format.
- Each row is separated by a 1px hairline border. Columns align: Project Year (Mono) | Project Title (Playfair) | Client/Agency (Open Sans) | Category (Mono) | Direct Action (`[WATCH]`).
- Row hover triggers an instantaneous dark surface inversion or reveals a docked floating preview thumbnail anchored to the cursor.

### Input Fields

- Flat, rectangular fields with transparent background and a 1px bottom border (editorial ledger style) or complete 1px perimeter hairline.
- Typography: Open Sans `body-md` for user entry; JetBrains Mono `label-mono-sm` for pinned field labels.
- Focus state activates an intense `#4263D8` 1px border outline with zero drop shadow or glow.

### Custom Video Player Controls

- Integrated directly into the film framing canvas.
- Ultra-thin 2px scrub bar using `#F5F1E9` with active cobalt `#4263D8` elapsed indicator.
- Minimalist playback status and timecode tracking displayed exclusively in JetBrains Mono.
