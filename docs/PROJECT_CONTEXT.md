# BY DESIGN STUDIO

## Project Context and Product Requirements

### 1. Project Overview

We are building a professional portfolio website for By Design Studio, a creative video editing studio helping YouTubers and content creators bring their ideas to life through intentional storytelling and clean, engaging edits.

The website must showcase the studio's creative work, communicate its philosophy, present its services, and make it easy for potential clients to initiate a project.

This is a media-focused portfolio, not a generic business landing page.

The visual design has already been established in Google Stitch.

Your responsibility is to implement the approved design faithfully and progressively add the specified interactions.

Do not independently redesign the website or invent a different visual direction.

### 2. Project Goals

The website must:

1. Establish a distinctive visual identity for By Design Studio.
2. Showcase featured video projects prominently.
3. Present additional video work through an interactive project collection.
4. Showcase short-form video content.
5. Present YouTube thumbnail designs and intro-video work as distinct categories.
6. Communicate the studio's brand philosophy.
7. Explain why clients should consider working with the studio.
8. Present the available services and working process.
9. Provide dedicated project-detail pages.
10. Make contacting the studio straightforward.
11. Remain usable on mobile devices and slower network connections.

Prioritise the clarity of the content, the quality of the visual presentation, and the usability of the website.

### 3. Source of Truth

Before implementing any component, inspect:

- `DESIGN.md`
- The relevant screenshots in the `design/` directory.
- This document.
- `docs/INTERACTION_SPEC.md`, once available.
- `docs/MEDIA_STRATEGY.md`, once available.
- `docs/IMPLEMENTATION_PLAN.md`, once available.

The approved Google Stitch design is the visual reference.

`DESIGN.md` provides the design-system rules.

The interaction specification will define expected behaviour.

The media strategy will define how images and videos should be presented and delivered.

The implementation plan will define the order of work.

If these sources conflict, do not silently invent a compromise. Identify the conflict and request clarification before making a significant design change.

### 4. Technology

The application is being built with:

- Next.js
- React
- TypeScript
- Next.js App Router
- Tailwind CSS

Use the dependencies already installed in the project unless a new dependency is justified by a specific requirement.

Do not install animation libraries or other major dependencies without first establishing why they are needed.

Prefer reusable components and clear separation of responsibilities.

### 5. Typography and Visual Identity

The approved typography consists of:

- Playfair Display for major editorial headings.
- Open Sans for body text and interface elements.
- JetBrains Mono for section labels, project numbers, categories, and metadata.

Follow the approved colour palette and design tokens in `DESIGN.md`.

Do not introduce unrelated fonts, colours, gradients, or decorative styles.

Preserve the visual identity across the homepage, project-detail pages, contact page, and mobile layouts.

### 6. Homepage Structure

The homepage contains the following sections, in this order:

1. Two-column editorial hero (Left: Brand description & CTAs; Right: Creator photo).
2. Featured work.
3. Additional work presented through a horizontal project rail.
4. Short-form video showcase.
5. Thumbnail design gallery.
6. YouTube intro showcase.
7. About By Design Studio.
8. Why Hire Me / Creative Approach.
9. Services.
10. How I Work.
11. Ways to Work Together.
12. Final call to action.
13. Footer.

Preserve the approved order and visual composition.

Do not merge the thumbnail gallery with the YouTube intro showcase.

Do not turn every section into an identical card layout.

Do not remove sections without approval.

### 7. Hero

The hero uses a distinctive two-column editorial layout (NO video background):

- **Left Column (Brand & Narrative):**
  - Technical slate kicker in JetBrains Mono (`01 // CREATIVE POST-PRODUCTION & STORYTELLING`).
  - Primary headline in Playfair Display (e.g., "Every Frame Tells a Story." or approved thesis headline).
  - Brand overview copy in Open Sans explaining By Design Studio's focus: helping YouTubers and creators turn raw ideas into clean, engaging, intentional visual narratives.
  - Dual action buttons (0px sharp rectangular styling): Primary "Explore Work →" (smooth scroll to Featured Work) and Secondary "Let's Talk" (contact).
  - Production proof slate in JetBrains Mono.

- **Right Column (Creator):**
  - High-resolution editorial photograph of the creator (portrait or working in the editing suite/behind the camera), styled in accordance with `DESIGN.md` (sharp 0px rectangular border, 1px hairline `rgba(23, 23, 23, 0.14)`).
  - Editorial metadata annotation tag (e.g. `[LEAD EDITOR & STORYTELLER]`).

**CRITICAL REQUIREMENT:** There is **NO video** on the hero section. The hero relies entirely on high-impact static editorial photography and authoritative typography to maximize performance and establish an immediate human connection.

The hero must maintain rapid loading and zero layout shift, following `docs/PERFORMANCE_GUIDE.md`.

### 8. Featured Work

Featured projects use large editorial compositions.

Each project can contain:

- Project number.
- Category.
- Title.
- Short description.
- Poster or video preview.
- Link to the project-detail page.

Follow the approved alternating media compositions and typography hierarchy.

The main work should remain the visual focus of the portfolio.

### 9. Additional Work

Additional projects are presented in a horizontal, user-controlled project rail.

The rail must support the intended desktop and mobile interactions described in the interaction specification.

Do not create an automatically moving carousel unless explicitly instructed.

Each item must remain easy to inspect and select.

### 10. Short-Form Content

Short-form projects use vertical video compositions.

Smartphone mockups should be used selectively, following the approved design.

Do not wrap every video in a phone frame.

Preserve the appropriate aspect ratio of each project.

### 11. Thumbnail Design and YouTube Intros

These are separate portfolio categories.

The thumbnail gallery showcases static thumbnail designs.

The YouTube intro showcase presents intro videos, opening sequences, or their representative stills.

Keep both sections clearly labelled and visually distinct.

Thumbnail selection and enlargement behaviour will be defined in the interaction specification.

### 12. About By Design Studio

The client has explicitly requested a single, static, brand-focused About section.

The layout uses a brand-relevant image on the left and the studio's description on the right.

Use the client's supplied brand description:

"By Design Studio is a creative video editing studio helping YouTubers and content creators bring their ideas to life through intentional storytelling and clean, engaging edits.

We believe great editing should amplify a creator's personality, not overshadow it. That's why we focus on understanding your vision and crafting videos that feel authentic, cohesive, and uniquely yours.

Whether you have a clear vision or need a creative partner to shape your ideas, we're here to bring your story to life, by design."

Preserve the intended meaning and wording unless an approved revision is supplied.

There must be no About Brand / About Videographer toggle.

Do not implement a dynamic switching interaction for this section.

### 13. Why Hire Me

This section communicates the studio's creative approach.

It uses an editorial heading, a visual comparison between raw footage and finished work where suitable assets are available, and three numbered principles:

- Story Before Effects.
- The Details Matter.
- The Vision Stays Yours.

Use the approved copy and visual reference where provided.

Do not introduce unverified business claims, client results, or statistics.

### 14. Services and Process

The Services section describes the actual services offered by the studio.

The How I Work section explains the working process.

Ways to Work Together describes the available engagement arrangements.

These sections serve different purposes and must remain distinct.

Do not invent services, pricing, turnaround guarantees, or commercial terms.

### 15. Project-Detail Pages

Individual projects must have dedicated detail pages.

The intended URL pattern is:

`/work/[slug]`

Each page should use a consistent template populated with the corresponding project data.

The page should include:

- Project title.
- Project category.
- Project description.
- Large video viewing area.
- Poster and Play button.
- Creative approach.
- Relevant supporting imagery.
- Related projects.
- Navigation back to the portfolio or toward another project.

The full video player should not be loaded merely because the visitor has opened the project-detail page.

Video activation behaviour will be defined in the media and interaction specifications.

### 16. Media Strategy

The planned media arrangement is:

- Cloudinary for images, photographs, thumbnail assets, and optimised posters.
- Cloudinary for the short hero video or previews where appropriate and within the agreed usage allowance.
- YouTube for complete portfolio videos.

Full-length video playback should use a click-to-load embedded player.

Do not embed all 15–16 YouTube players on the homepage.

Use poster images and defer the full player until the visitor chooses to watch a project.

Further details will be documented in `docs/MEDIA_STRATEGY.md`.

### 17. Responsive Requirements

Implement the approved design for desktop, tablet, and mobile.

Mobile is not simply a smaller copy of desktop.

Ensure that:

- Typography remains readable.
- Images preserve suitable aspect ratios.
- Project navigation works with touch.
- Hover interactions have appropriate mobile alternatives.
- The mobile menu is usable.
- Project-detail pages fit narrow screens.
- No section causes unwanted horizontal overflow.

### 18. Accessibility and Motion

Animations should enhance the experience without preventing access to content.

Respect reduced-motion preferences.

Use keyboard-accessible controls.

Ensure visible focus states and adequate contrast.

Do not hide essential information exclusively behind hover effects.

The website must remain usable if animations are disabled.

### 19. Implementation Discipline

Implement the website in defined phases.

Do not attempt the entire project in a single uncontrolled code-generation pass.

Before modifying a major component, understand its role and existing dependencies.

After each phase:

1. Run the relevant checks.
2. Review the changed files.
3. Test the implemented behaviour.
4. Report any unresolved issues.
5. Wait for review before proceeding to the next major phase.

Preserve the approved design.

Do not silently change the page structure or remove required interactions.

### 20. Definition of Success

The completed website should:

- Match the approved Google Stitch design closely.
- Present the studio's work clearly and professionally.
- Include dedicated project-detail pages.
- Provide the specified navigation and media interactions.
- Remain responsive and accessible.
- Avoid unnecessary media downloads.
- Preserve the brand's intended messaging.
- Be maintainable and easy to extend.

The goal is not simply to produce a website that looks impressive in a screenshot.

The goal is to reproduce the approved design as a functional, reliable, and well-structured web application.
