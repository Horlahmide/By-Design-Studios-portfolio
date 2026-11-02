# BY DESIGN STUDIO

# INTERACTION AND BEHAVIOUR SPECIFICATION

## 1. PURPOSE

This document defines how the By Design Studio portfolio should behave after implementation.

The approved visual design is provided by Google Stitch and documented in `DESIGN.md` and `PROJECT_CONTEXT.md`.

This document specifies interaction states, triggers, transitions, and expected results.

The objective is to reproduce the intended user experience without introducing unnecessary animations, unexpected behaviour, or visual changes.

Implement the specified behaviour while preserving the approved design.

Do not invent interactions simply to make the website appear more animated.

---

## 2. GLOBAL INTERACTION PRINCIPLES

Follow these principles throughout the application:

1. Visitors must remain in control of navigation and scrolling.
2. No animation should prevent normal interaction.
3. Hover interactions must have appropriate mobile alternatives.
4. Essential information must not be available exclusively through hover.
5. All buttons and interactive elements must have clear purposes.
6. Only one portfolio video preview should play at a time.
7. Full-length videos must not automatically load across the homepage.
8. The website must remain usable when animations are disabled.
9. Layout changes must not cause unnecessary content movement.
10. Loading, unavailable-media, and error states must be handled gracefully.
11. Respect the visual rules in `DESIGN.md`.
12. Do not alter the approved section order or redesign components while implementing interactions.

---

# 3. NAVIGATION

## 3.1 Homepage navbar states

The homepage navbar has two visual states.

### State A: At the top of the homepage

When the visitor is at the top of the homepage:

- The navbar sits cleanly against the warm editorial ivory canvas (`#F5F1E9`).
- The navigation text and logo are rendered in ink black (`#171717`).
- No heavy shadow is applied, preserving the flat, high-end editorial broadsheet aesthetic.

### State B: After scrolling

When the visitor scrolls away from the initial hero area:

- The navbar background transitions to solid surface ivory (`#F5F1E9`) or high-contrast container with a sharp 1px hairline bottom border (`rgba(23, 23, 23, 0.14)`).
- Maintain crisp legibility and stable dimensions.
- Use a smooth background transition without layout shifts.

The transition must not cause the page content to jump.

The navbar returns to its unbordered initial state when the visitor returns to the top of the page.

Use an appropriate scroll-state mechanism (passive scroll listener with `requestAnimationFrame` or `IntersectionObserver`).

## 3.2 Interior-page navbar

Project-detail and contact pages do not have the same full-screen homepage hero.

Their navbar must use a readable background from the beginning.

Do not apply the homepage's initially transparent state to every route indiscriminately.

## 3.3 Navigation links

The primary navigation should connect to the corresponding sections or pages.

- WORK: opens the work archive or navigates to the homepage portfolio section, depending on the approved design.
- ABOUT: navigates to the About section.
- SERVICES: navigates to the Services section.
- CONTACT: opens the contact experience.
- START A PROJECT: opens the contact or inquiry page.

Use the correct navigation behaviour for each context.

If a navigation link points to a homepage section from an interior page, it should navigate to the homepage and then reach the intended section.

Account for the fixed navbar so that section headings are not hidden behind it.

---

# 4. MOBILE NAVIGATION

On mobile, the navigation uses a menu trigger.

When the visitor opens the menu:

- Display the approved mobile-menu layout.
- Show the primary navigation links.
- Keep the Start a Project action visible.
- Prevent unwanted horizontal overflow.
- Provide a clear way to close the menu.

When the visitor selects a navigation link, navigate to the appropriate destination and close the menu.

The menu should also close when the visitor activates its close control or presses Escape.

Use accessible button semantics and keyboard navigation.

Do not rely exclusively on animation to communicate whether the menu is open or closed.

---

# 5. HERO SECTION (TWO-COLUMN EDITORIAL SPREAD)

## 5.1 Initial state

When the homepage loads, the hero displays a side-by-side two-column editorial spread on desktop:

- **Left Column (Brand & Narrative):**
  - Section kicker / production slate in JetBrains Mono (`01 // CREATIVE POST-PRODUCTION & STORYTELLING`).
  - Primary headline in Playfair Display (e.g., "Every Frame Tells a Story." or approved thesis headline).
  - Brand overview copy in Open Sans explaining what By Design Studio does for creators and YouTubers.
  - Dual action buttons: Solid "Explore Work →" (scrolls to Featured Work) and transparent framed "Let's Talk" (contact).
  - Production proof slate in JetBrains Mono.

- **Right Column (Creator Frame):**
  - Editorial photograph of the creator (high-resolution portrait or behind-the-scenes editing suite photo).
  - Strict 0px rectangular border with a 1px hairline (`rgba(23, 23, 23, 0.14)`).
  - Associated technical annotation slate (e.g. `[LEAD EDITOR & STORYTELLER]`).

**CRITICAL MANDATE:** There is **NO video** in the hero section.

## 5.2 Entrance animation

On initial page load, use a restrained, high-end editorial sequence:

1. The navigation and top status slate render immediately.
2. The left-hand technical kicker and Playfair Display headline reveal with subtle upward drift.
3. The brand narrative copy and action buttons settle into position.
4. The right-hand creator portrait reveals with smooth contrast stabilization.

The transitions should feel deliberate and architectural.

Do not use exaggerated zooming, bounce effects, or bouncy SaaS card animations.

Do not make visitors wait for the animation to finish before interacting with the page.

## 5.3 Hero scrolling

As the visitor scrolls away from the hero:

- The hero content flows naturally upward into the Featured Work section.
- Avoid pinning the hero or hijacking scroll wheels.
- The scrolling experience must remain natural, silky, and user-controlled.

## 5.4 Responsive behavior and media fallback

- **Desktop (≥ 1024px):** 12-column grid layout (Left: Brand copy & CTAs; Right: Creator photo).
- **Tablet (768px – 1023px):** Side-by-side with adjusted font sizes and spacing.
- **Mobile (< 768px):** Stacks vertically into an editorial single column (Brand headline & copy on top, Creator photo anchored cleanly beneath, with full-width action buttons).
- If the image takes time to load or fails, the container maintains its exact aspect ratio using background `--color-surface-container` and displays a subtle monospaced label (`[BY DESIGN STUDIO // EDITORIAL]`), causing zero layout shift (0 CLS).

---

# 6. FEATURED WORK

## 6.1 Initial presentation

Featured projects must display their poster images or appropriate static media states when first rendered.

Each project should contain the relevant information already specified in the approved design:

- Project number.
- Project category.
- Project title.
- Short description.
- Project-selection action.

Do not load the full-length YouTube player for each project on the homepage.

## 6.2 Scroll entrance

When a featured project enters the viewport:

- Its media may fade or reveal into view.
- The title and metadata may enter with a small vertical movement.
- The overall project composition should remain stable.

Use subtle transitions.

Avoid animating every word or element independently.

Avoid large movements that distract from the actual work.

## 6.3 Hover preview

On desktop, hovering over an eligible project may activate a short, muted preview if one is available.

During the preview:

- Preserve the project's title and category.
- Display a subtle play or view-project indicator where appropriate.
- Keep the media's aspect ratio.
- Avoid excessive scaling.
- Do not allow the preview to move the entire project layout.

Only one preview should play at a time.

When the pointer leaves, the preview should pause or return to its poster state.

When the project leaves the relevant viewport area, its preview should stop.

If a preview is unavailable, keep the poster visible and allow the project to remain selectable.

## 6.4 Project selection

Selecting a project opens its dedicated project-detail page.

Clicking a project card must not immediately load the full-length YouTube player.

The project card and full-video Play control serve different purposes.

---

# 7. ADDITIONAL WORK HORIZONTAL RAIL

## 7.1 General behaviour

The additional-work section uses a horizontally navigable collection of project cards.

Movement must be controlled by the visitor.

Supported interactions include:

- Native horizontal scrolling.
- Touch swiping.
- Mouse or pointer dragging where implemented.
- Previous and next controls.

Do not automatically move the rail.

Do not create an endless animation that continuously moves projects across the screen.

## 7.2 Scroll snapping

When the visitor scrolls horizontally, use suitable scroll snapping so project cards settle into a deliberate position.

The snapping behaviour must remain comfortable rather than feeling restrictive.

Visitors must be able to scroll vertically through the page without the rail capturing every wheel movement.

## 7.3 Navigation controls

If previous and next controls are present:

- Previous moves toward earlier projects.
- Next moves toward later projects.
- Controls behave consistently with the card order.
- Unavailable navigation states are communicated appropriately.

Keep the controls visually consistent with the approved design.

## 7.4 Hover behaviour

Hovering over an individual card must not move the entire rail.

If a short preview is available, the selected card may play a muted preview.

Only one preview should play at a time.

On mobile, the rail must support touch interaction without depending on hover.

Each project remains selectable and leads to its detail page.

---

# 8. SHORT-FORM VIDEO SHOWCASE

## 8.1 Presentation

Preserve the approved vertical-video composition and selective smartphone mockups.

Do not wrap every project in a phone frame.

Do not stretch vertical content to fill a horizontal container.

## 8.2 Desktop interaction

Where a preview is available:

- Hovering over a project may begin muted playback.
- The selected project receives subtle visual emphasis.
- The title and category remain readable.
- The preview stops when the pointer leaves or the project becomes inactive.

Do not allow several short-form previews to play simultaneously.

## 8.3 Mobile interaction

Do not rely on hover.

Visitors should be able to select a project using a clear touch interaction.

Selection should open the relevant project-detail page.

Full-length playback should be initiated through the Play control on that page.

---

# 9. THUMBNAIL GALLERY

## 9.1 Initial state

Display the thumbnail gallery using the approved editorial grid.

Every thumbnail must have an appropriate image, even before the visitor interacts with it.

The section label must clearly communicate that the gallery contains thumbnail designs.

## 9.2 Thumbnail selection

When a visitor selects a thumbnail:

- Open an enlarged image-viewing state.
- Display the selected image clearly.
- Keep the image within the available viewport.
- Provide an obvious close control.
- Prevent the image from overflowing the screen.

Where suitable, previous and next controls can allow visitors to inspect neighbouring thumbnails.

Do not require every thumbnail to have a separate project-detail page.

## 9.3 Closing the image viewer

The visitor should be able to close the enlarged state using:

- A visible close control.
- Escape on a keyboard.
- An appropriate click outside the image, where the interaction has been designed to support it.

Return the visitor to the gallery without losing their browsing position.

The enlarged image must be accessible to keyboard users and must have appropriate alternative text.

---

# 10. YOUTUBE INTRO SHOWCASE

The YouTube intro gallery remains separate from the thumbnail-design gallery.

Each intro project must be identifiable as video-intro work.

Selecting a project opens its project-detail page.

Do not treat intro-video thumbnails as though they were static thumbnail designs.

Preserve the approved layout and use the same project-navigation behaviour as the rest of the portfolio.

---

# 11. ABOUT BY DESIGN STUDIO

## 11.1 Final approved behaviour

The client has requested a static, brand-focused About section.

The section uses:

- A brand-relevant image on the left.
- The brand description on the right.

The section describes By Design Studio, its creative philosophy, and its approach to helping YouTubers and content creators.

## 11.2 Explicit prohibition

Do not implement the previously proposed About Brand / About Videographer toggle.

There must be:

- No About Brand button.
- No About Videographer button.
- No switching between two biographies.
- No dynamic replacement of the left-hand image.
- No state-dependent About content.

This is a final client decision and supersedes the earlier interaction proposal.

## 11.3 Scrolling

The section should enter the viewport naturally.

Any reveal animation must be subtle and must not interfere with the image, text, or reading experience.

The layout must remain stable during scrolling.

---

# 12. WHY HIRE ME SECTION

The Why Hire Me section contains the creative-philosophy statement and the approved numbered principles.

When the section enters the viewport:

- The main heading may reveal subtly.
- The raw-versus-final visual comparison remains visible.
- The numbered principles may receive restrained entrance transitions.

Do not force the visitor to scroll through individual pinned stages.

Do not hide important explanatory text until a particular animation occurs.

The section should remain fully readable without motion.

Do not replace its existing editorial layout with generic cards.

---

# 13. SERVICES SECTION

Maintain the existing service-row layout.

Each row represents a distinct service.

When a service row has a hover interaction:

- Show a restrained visual response.
- Keep its title and description visible.
- Do not change the row's basic dimensions unexpectedly.
- Do not duplicate section headings inside service rows.

Any arrow or CTA should lead to the intended next action.

The section should not depend on hover for access to important service descriptions.

---

# 14. HOW I WORK SECTION

Maintain the approved process structure and step order.

The steps may reveal as the visitor scrolls.

The currently visible step may receive subtle visual emphasis.

However:

- Do not hide inactive steps completely.
- Do not force-scroll between steps.
- Do not pin the entire process section unnecessarily.
- Do not change the number or order of the steps without approval.

All process information must remain accessible without animation.

---

# 15. WAYS TO WORK TOGETHER

Preserve the approved engagement-options layout.

Each option must remain understandable without interaction.

If cards include links, each link must have a clear destination.

Do not invent prices, package details, or commercial conditions.

The section must not introduce additional behaviours that weren't included in the approved design.

---

# 16. FINAL CALL TO ACTION AND FOOTER

## 16.1 Final CTA

The final CTA should remain a clear, visually prominent route to initiating a project.

The Start a Project button opens the appropriate inquiry experience.

The CTA may reveal through a subtle entrance animation.

The visitor must still be able to activate it if motion is disabled.

## 16.2 Footer

Social links navigate to their respective external destinations.

Internal navigation links lead to the appropriate sections or pages.

Use real supplied destinations.

Do not invent social accounts or contact details.

Keep the footer visually stable and consistent with the approved design.

---

# 17. PROJECT-DETAIL PAGE

## 17.1 Navigation

When a visitor selects a project, navigate to its corresponding detail URL.

Example:

`/work/the-art-of-storytelling`

The URL must identify the selected project.

## 17.2 Initial project-detail state

On initial entry, display:

- Project title.
- Project category.
- Project description.
- Poster image.
- Clearly visible Play button.
- Supporting project information.
- Related-work navigation where appropriate.

Do not automatically create a fully loaded YouTube embed merely because the page has opened.

## 17.3 Play interaction

When the visitor activates the Play button:

1. Replace the poster with the YouTube embedded player.
2. Load the player for the selected project.
3. Allow the visitor to start playback.
4. Keep the player within the designed viewing area.

Do not navigate away from the portfolio merely to display the video.

The embedded player should play the full video within the project-detail page.

## 17.4 Project metadata

Display only the information available for the selected project.

Do not invent client names, production credits, results, or descriptions.

If information is unavailable, omit the optional field or use approved placeholder content during development.

## 17.5 Related projects

Selecting a related project navigates to that project's own detail route.

Provide a clear way back to the Work page.

Avoid broken links or references to nonexistent projects.

## 17.6 Invalid projects

If a visitor opens a project slug that does not exist, display a proper not-found state.

Do not display an empty project page.

---

# 18. CONTACT EXPERIENCE

The Start a Project and relevant contact links should lead to the approved contact experience.

Form fields must remain usable with a keyboard and touch input.

Required fields should be validated before submission.

Invalid input should produce clear feedback.

The visitor must receive visible confirmation after a successful submission.

Do not display a success message unless the submission has actually succeeded.

The form must not invent a delivery or response-time promise that the client has not approved.

The implementation must use the actual contact or form-delivery mechanism selected for the project.

---

# 19. RESPONSIVE INTERACTION RULES

Implement all major interactions for desktop, tablet, and mobile.

Desktop hover behaviour must not be the only way to access a feature.

Horizontal rails must support touch.

The mobile menu must be operable without a mouse.

Project-detail players must fit the screen.

Images and videos must preserve suitable aspect ratios.

The interface must not introduce unwanted horizontal overflow at narrow widths.

Controls must remain large enough to operate comfortably with touch.

---

# 20. MOTION AND SCROLL RULES

Use CSS transitions for simple interactions.

Use Intersection Observer or an equivalent mechanism for viewport-triggered reveals where appropriate.

Use GSAP ScrollTrigger selectively for more involved scroll-linked motion.

Do not introduce a complex animation library for every interaction.

All animations must:

- Be restrained.
- Preserve legibility.
- Avoid layout jumps.
- Avoid blocking navigation.
- Respect reduced-motion preferences.
- Have a sensible non-animated state.

Do not use animation as a substitute for clear layout or interaction design.

---

# 21. FAILURE AND FALLBACK STATES

The interface must remain usable when media or animations fail.

If a background video is unavailable, preserve the poster.

If a preview cannot load, retain the project image and its navigation.

If the visitor does not activate Play, do not load the full embedded player unnecessarily.

If a thumbnail image is unavailable, use an appropriate fallback rather than displaying a broken image icon.

If an interaction fails, retain the underlying content and provide a clear way to continue browsing.

Do not make any core section depend entirely on successful video playback.

---

# 22. ACCESSIBILITY

All interactive controls must be keyboard-accessible.

Use semantic buttons and links.

Ensure visible focus states.

Provide appropriate accessible names for controls.

Provide alternative text for meaningful images.

Maintain sufficient contrast.

Respect `prefers-reduced-motion`.

Do not convey essential information only through colour, animation, or hover.

The website must remain understandable and usable with motion disabled.

---

# 23. ACCEPTANCE CRITERIA

Before declaring the interaction work complete, verify that:

- The homepage navbar is transparent at the top and gains a background after scrolling.
- Interior pages have a readable navbar from initial load.
- Hero scrolling works without trapping the visitor.
- The hero has a complete poster fallback.
- Featured projects respond correctly to selection.
- The horizontal project rail is user-controlled.
- Only one video preview plays at a time.
- Short-form interactions work on mobile.
- Thumbnail selection opens and closes the enlarged view.
- The About section remains static and brand-focused.
- The numbered creative principles remain accessible without animation.
- Project cards navigate to the correct project-detail pages.
- Project-detail pages initially show the poster and Play button.
- Full YouTube players load when requested.
- Related-project navigation works.
- Contact interactions provide appropriate feedback.
- The website remains usable with reduced motion enabled.
- No essential content depends on hover or autoplay.

Test the actual implemented behaviour rather than relying only on the presence of event handlers or animation code.
