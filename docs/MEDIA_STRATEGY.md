# BY DESIGN STUDIO

# MEDIA DELIVERY AND PERFORMANCE STRATEGY

## 1. PURPOSE

This document defines how images, videos, thumbnails, posters, and embedded media should be stored, delivered, and displayed throughout the By Design Studio portfolio.

The website contains approximately 15–16 full-length portfolio videos, alongside thumbnail designs, photographs, short-form work, and a cinematic hero.

The objective is to present this media beautifully without unnecessarily slowing down the website or wasting visitors' mobile data.

The implementation must prioritise:

- Fast initial page rendering.
- Optimised image delivery.
- Poster-first video presentation.
- Click-to-load full-length videos.
- Conditional loading of optional previews.
- Graceful handling of unavailable media.
- Minimal unnecessary network requests.
- A consistent visual experience across desktop and mobile.

Do not load every portfolio video when a visitor opens the homepage.

Do not make successful video playback a requirement for viewing the website.

---

## 2. MEDIA PROVIDERS

The approved media-delivery arrangement is as follows.

### Cloudinary

Use Cloudinary for:

- Hero poster images.
- Brand and behind-the-scenes photographs.
- Portfolio poster images.
- Thumbnail-design images.
- Supporting project imagery.
- Short hero-loop videos, where appropriate.
- Optional short video previews, where appropriate and within the available usage allowance.

Use Cloudinary's image transformation capabilities to request appropriately sized and optimised images.

Prefer automatic format and quality selection where suitable.

The delivered image dimensions should reflect the component's actual display requirements.

Do not serve the same unnecessarily large image to every viewport.

### YouTube

Use YouTube for complete portfolio videos.

The website will contain approximately 15–16 full-length video projects.

Store the appropriate YouTube video ID with each project.

Use YouTube's embedded player to display the complete video inside the portfolio website.

Do not redirect visitors to YouTube merely to watch a project unless they explicitly choose an external YouTube link.

Do not load all the embedded players on the homepage.

### Important constraint

Cloudinary and YouTube are separate media providers.

Do not assume that uploading a video to YouTube automatically creates an optimised Cloudinary asset.

Each media source must be configured and delivered through the appropriate provider.

Before implementation, confirm that the chosen Cloudinary account's usage allowance is sufficient for the intended image and optional video-preview workload.

Do not introduce a paid media service or enable a paid upgrade without approval.

---

## 3. MEDIA CATEGORIES

Organise media according to its intended purpose.

### A. Hero media

The hero consists of:

- A high-resolution editorial photograph of the creator (positioned in the right column).
- Sharp 0px rectangular framing with a 1px hairline border (`rgba(23, 23, 23, 0.14)`).
- Associated technical metadata slates (e.g., `[LEAD EDITOR & STORYTELLER]`).

**CRITICAL MANDATE:** There is **NO video** in the hero section.

The creator photo is an essential visual asset that establishes immediate human connection and creative authority.

### B. Featured-project posters

Each featured project has an optimised poster image representing the associated video.

The poster should appear before the full-length video player is loaded.

These posters provide the primary visual representation of projects on the homepage.

### C. Optional video previews

Where appropriate, a project may have a short preview clip.

These previews are distinct from full-length videos.

If preview clips are implemented, use small, appropriately encoded files delivered through an approved media source.

Do not use the complete video as an automatically playing preview.

Video previews are an enhancement and should not block the first implementation of the portfolio.

### D. Full-length videos

Full-length projects are hosted on YouTube.

A project-detail page initially displays a poster and Play button.

The embedded YouTube player loads only when the visitor activates Play.

### E. Thumbnail-design images

Thumbnail designs are delivered through Cloudinary as optimised images.

The gallery must display usable image previews without loading unnecessary full-resolution files.

When a visitor opens a thumbnail for closer inspection, display the appropriate larger image.

### F. Supporting photographs

Use Cloudinary for the studio's photographs, behind-the-scenes images, and supporting project imagery.

Deliver appropriately sized versions for the relevant screen dimensions.

---

## 4. HERO CREATOR MEDIA STRATEGY

The hero section uses a static two-column editorial layout: Left column contains the brand overview, headline, and CTAs; Right column contains the creator photograph.

**Under no circumstances will a video background or video player be integrated into the hero section.**

### Initial rendering and LCP optimization

Deliver the creator image immediately with high priority:

- Use Next.js `<Image />` with `priority={true}`.
- Provide explicit `sizes` (e.g. `(max-width: 768px) 100vw, 50vw`) to eliminate layout shifts (0 CLS).
- Target an optimized WebP/AVIF file size under 150 KB.
- Keep the image container stable with an explicit aspect ratio (4:5 or 3:4 portrait).

### Asset preparation

- High-resolution editorial portrait or working photograph (e.g., in the editing suite or behind the camera).
- Lighting and color grading matching the warm editorial print aesthetic (`#F5F1E9` ivory canvas and black-and-white or subtly graded tones).
- Sharp rectangular bounds (0px border radius, 1px solid hairline).

### Fallback behaviour

If the image fails to load:
- The container must preserve its exact rectangular space using the background color `--color-surface-container`.
- Display a clean technical monospaced label (`[BY DESIGN STUDIO // EDITORIAL]`).
- Do not display an unsightly broken image icon.

---

## 5. IMAGE OPTIMISATION

### Cloudinary delivery

Use Cloudinary transformations to request appropriate image dimensions and formats.

Where suitable, use automatic format and quality selection.

Do not upload a large image and then display it at every size without considering the actual rendering requirements.

### Responsive images

The hero poster, featured projects, About image, thumbnail gallery, and supporting photographs should use dimensions suitable for their intended display areas.

Use Next.js Image where appropriate for responsive sizing and lazy loading, with Cloudinary delivery URLs configured correctly.

Do not force the same image dimensions onto every component.

### Loading priority

The hero poster is important to the initial visual experience and should be prioritised appropriately.

Images below the initial viewport should generally be lazy-loaded.

Do not lazy-load every image indiscriminately if doing so delays the main visible content.

### Image failures

Provide an appropriate fallback for missing images.

Do not allow a missing thumbnail or photograph to break the surrounding layout.

Fallback content must preserve the structure of the component.

---

## 6. PORTFOLIO POSTER STRATEGY

Every portfolio video must have an associated poster image.

The poster should represent the actual project and should be visually appropriate for the project's presentation.

Prefer frames containing clear subjects, strong compositions, and recognisable moments.

### Homepage

Project cards display posters initially.

Do not create an embedded YouTube player for every project card.

The poster should remain visible until the visitor initiates an interaction that requires additional media.

### Featured projects

Use larger poster images corresponding to the larger editorial compositions.

Maintain the appropriate aspect ratio.

Do not crop important subjects simply to satisfy an arbitrary fixed container.

### Horizontal rail

Display compact poster previews.

Load images according to their display requirements and proximity to the viewport.

Do not create network activity for every video preview merely because the rail contains many items.

### Short-form projects

Use vertical posters for vertical videos.

Do not stretch a vertical poster into a wide horizontal image.

The preview must preserve the composition and the intended smartphone-frame presentation.

---

## 7. OPTIONAL HOVER-PREVIEW STRATEGY

Hover previews are optional enhancements.

The first priority is a functional portfolio with reliable poster images and working project-detail pages.

If hover previews are implemented, follow these rules.

### Desktop

When the visitor hovers over an eligible project:

1. Display the existing poster.
2. Make the preview eligible to load.
3. Load and play the short preview when appropriate.
4. Keep the title and project category visible.
5. Stop playback when the visitor leaves the project or it becomes inactive.

Only one preview should play at a time.

When a new preview starts, pause the previous preview.

### Mobile

Do not rely on hover.

Use the poster and an explicit interaction.

If the visitor selects a project, take them to the project's detail page.

Do not automatically play every preview as the visitor scrolls through the page.

### Failure behaviour

If a preview fails, retain the poster.

Do not show a broken player.

The project must remain selectable.

### Performance constraint

Do not preload all the preview clips.

Only load a preview when the interaction and loading policy justify it.

Do not implement hover previews if doing so compromises the initial performance of the portfolio.

---

## 8. FULL-LENGTH VIDEO STRATEGY

Full-length videos must use YouTube's embedded player.

The intended viewing experience consists of two separate states.

### State A: Poster

When the visitor opens a project-detail page, display:

- The project poster.
- The project title.
- The relevant project information.
- A prominent Play button.

Do not load the complete YouTube player automatically when the page opens.

### State B: Video player

When the visitor activates Play:

1. Replace the poster with the embedded YouTube player.
2. Load the selected video's embed.
3. Keep the player within the designated viewing area.
4. Preserve the appropriate aspect ratio.
5. Allow the visitor to control playback.

The player must play the full video inside the project-detail page.

Do not send the visitor to YouTube automatically.

### Click-to-load requirement

Use a lightweight poster-based placeholder before the visitor activates Play.

Do not render 15–16 active YouTube players across the homepage.

Do not make project browsing require loading third-party video-player resources.

If the embed fails, provide an understandable fallback rather than leaving an empty rectangle.

### Video ID management

Store the correct YouTube video ID with the corresponding project data.

Do not scatter video IDs across unrelated components.

Do not guess or fabricate video IDs.

Verify that the selected videos are accessible and permitted to be embedded.

Respect the owner's intended video visibility and privacy settings.

---

## 9. PROJECT DATA AND MEDIA REFERENCES

Keep project information in a shared data source.

A project may contain fields such as:

- Slug.
- Title.
- Category.
- Description.
- Poster URL.
- YouTube video ID.
- Optional preview URL.
- Supporting images.
- Related project references.

Do not hardcode the same project information in the homepage, project rail, and project-detail page separately.

The same project data should populate the relevant components consistently.

For example, when a visitor selects a project in the homepage gallery, its poster and title should correspond to the same project displayed on the detail page.

If a project's full video or supporting information is unavailable, keep the other available content usable.

---

## 10. RESOURCE LOADING AND NETWORK EFFICIENCY

The website should avoid unnecessary media downloads.

### Initial page load

Prioritise:

- HTML and essential application resources.
- Styles required to display the page.
- The primary font configuration.
- The hero poster.
- Images required for the initial viewport.

Do not immediately load every full-length video player.

Do not load every optional preview.

### During scrolling

Images below the viewport should load as needed.

Optional video previews should remain deferred until appropriate.

Do not let entering a portfolio section automatically create active players for every project.

### On project interaction

Load the media required for the selected interaction.

For example, activating Play on a project-detail page loads the corresponding embedded video.

Do not load unrelated projects' full-length videos.

### Connection constraints

The website must remain useful on slow or unstable connections.

Avoid making essential content depend on a successful media download.

Use appropriate loading states and preserve the existing layout while media loads.

---

## 11. ASSET ORGANISATION

Keep source assets organised and identifiable.

Use meaningful filenames.

For example:

- `hero-poster.webp`
- `hero-loop.mp4`
- `about-studio.webp`
- `project-brand-film-poster.webp`
- `project-travel-story-poster.webp`
- `thumbnail-design-01.webp`

These are naming examples.

Use a consistent naming scheme across the actual project assets.

Do not place large source videos inside the application's repository merely to make them easy to reference.

Use the approved remote media URLs for Cloudinary and YouTube assets.

Keep any private credentials or administrative API secrets out of client-side code.

Public delivery URLs and video IDs may be referenced by the frontend when appropriate.

---

## 12. RESPONSIVE MEDIA PRESENTATION

The media presentation must adapt to screen size.

### Desktop

Large project images should take advantage of the available width.

Maintain a deliberate editorial composition.

### Tablet

Adjust image sizes and text relationships so that content does not become cramped.

### Mobile

Use appropriately sized image variants.

Preserve vertical and horizontal media aspect ratios.

Do not allow large images to cause horizontal overflow.

The video player must fit the content width without losing its aspect ratio.

Smartphone mockups must remain appropriately sized for touch screens.

Do not download unnecessarily large desktop-specific media when a smaller version is appropriate.

---

## 13. FAILURE STATES

Design and implement meaningful fallbacks.

### Hero video unavailable

Display the poster.

### Project poster unavailable

Display an appropriate fallback without breaking the layout.

### Hover preview unavailable

Keep the poster and allow project navigation.

### YouTube embed unavailable

Display a clear fallback and, where appropriate, provide an explicit external link to the intended video.

### Supporting image unavailable

Keep the rest of the project information visible.

Do not make the entire page fail because one asset is unavailable.

---

## 14. USAGE AND COST CONSTRAINTS

The project initially aims to use existing free allowances where practical.

Before finalising the media implementation:

- Check the current Cloudinary account's actual usage allowance.
- Confirm that the required image and optional preview workload fits within that allowance.
- Avoid unnecessary transformations and duplicate assets.
- Do not enable a paid plan or incur additional charges without approval.
- Keep the hosting and video-delivery arrangements documented.

Do not promise unlimited free bandwidth.

Do not assume a free allowance is sufficient without checking the actual usage requirements.

If a proposed media feature would exceed the available allowance, report the issue and recommend an alternative before implementation.

---

## 15. PERFORMANCE VALIDATION

Do not assume that the site is fast merely because media is hosted on Cloudinary or YouTube.

Test the actual application.

The review must examine:

- Initial page loading.
- Hero poster visibility.
- Background-video loading behaviour.
- Number of video sources requested on initial load.
- Number of active YouTube players.
- Image sizes and loading priority.
- Layout movement during loading.
- Horizontal rail behaviour.
- Project-detail video activation.
- Mobile layout and data usage.
- Media failure states.

Use browser developer tools to inspect network requests.

Where practical, test under throttled mobile-network conditions.

Use performance measurements to identify bottlenecks instead of guessing.

The site should remain visually complete and navigable even when videos are not played.

---

## 16. ACCEPTANCE CRITERIA

The media strategy is implemented correctly when:

1. The hero displays the two-column layout with the creator photo in the right column and brand copy in the left column.
2. The hero contains NO video and achieves instant LCP with optimized WebP/AVIF delivery.
3. Cloudinary delivers appropriately sized images.
4. Portfolio cards do not create unnecessary YouTube players.
5. Full-length videos load only after the visitor activates Play.
6. Each project references the correct video.
7. The horizontal rail does not automatically load all previews.
8. Only one optional preview plays at a time.
9. Mobile visitors can explore the portfolio without hover interactions.
10. Missing media does not break the layout.
11. The implementation does not introduce unexpected paid-media usage.
12. Network testing confirms that unnecessary media downloads have been avoided.

## FINAL INSTRUCTION

Implement the media presentation according to this document and the approved visual design.

Prioritise the poster-first experience and click-to-load full videos.

Do not introduce additional media providers or complex streaming infrastructure without justification and approval.

The objective is to make the portfolio visually compelling while respecting the visitor's bandwidth, device, and connection conditions.
