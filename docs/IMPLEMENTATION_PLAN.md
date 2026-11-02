# BY DESIGN STUDIO

# IMPLEMENTATION PLAN

## 1. PURPOSE

This document defines the order in which the By Design Studio portfolio will be implemented, tested, and refined.

The project starts from a newly created Next.js application.

The visual design has already been developed in Google Stitch. The design system, product requirements, interaction behaviour, and media strategy are documented in:

- `DESIGN.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/INTERACTION_SPEC.md`
- `docs/MEDIA_STRATEGY.md`

These documents collectively define the approved design and expected behaviour.

The implementation must reproduce the approved experience rather than invent a new one.

The target is to deliver a polished, functional portfolio within approximately four to five days.

Prioritise working features, faithful visual implementation, and reliable behaviour over unnecessary complexity.

---

## 2. DEVELOPMENT PRINCIPLES

Follow these principles throughout implementation.

### 2.1 Work incrementally

Implement the website in small, verifiable stages.

Do not attempt to build the entire application in one uncontrolled code-generation pass.

### 2.2 Preserve the approved design

Use Google Stitch screenshots and `DESIGN.md` as visual references.

Do not independently redesign approved sections.

Do not alter the client's final decisions without permission.

### 2.3 Inspect before modifying

Before editing a file, inspect its current contents and understand its role.

Do not assume that a file is empty or that its configuration matches a familiar template.

Avoid unnecessary modifications to project configuration.

### 2.4 Keep the implementation maintainable

Use reusable React components and shared project data.

Avoid duplicating entire pages when they share the same structure.

Do not introduce abstractions that make a small portfolio unnecessarily complicated.

### 2.5 Test after each phase

After completing a phase:

1. Run the relevant checks.
2. Inspect the changes.
3. Test the affected functionality.
4. Report any unresolved issues.
5. Wait for approval before proceeding to the next major phase.

### 2.6 Protect existing working code

Use Git to track meaningful changes.

Do not overwrite unrelated work or perform destructive operations without approval.

Do not automatically commit changes unless explicitly instructed.

---

# 3. PHASE 0: PROJECT INSPECTION AND READINESS

### Objective

Understand the existing project before writing application code.

### Tasks

Inspect:

- `package.json`
- Next.js configuration.
- TypeScript configuration.
- Tailwind configuration, if applicable.
- `src/app/layout.tsx`
- `src/app/globals.css`
- Existing homepage.
- Root `DESIGN.md`.
- All supplied project documentation.
- Existing public assets.
- Git status.

Verify that the development server works.

Identify the installed versions of Next.js, React, TypeScript, and Tailwind CSS.

Do not upgrade dependencies merely because newer versions exist.

Confirm that the three required fonts and the approved design tokens are available or identify what still needs to be configured.

Review the supplied Stitch screenshots and map each screenshot to its corresponding page or section.

### Output

Provide a concise assessment of:

- Existing project structure.
- Current application status.
- Configuration issues, if any.
- Available assets.
- Missing design references.
- Proposed implementation order.

Do not build the entire website during this phase.

### Acceptance criteria

- The application starts successfully.
- The relevant configuration is understood.
- The project documentation has been reviewed.
- The approved design references have been identified.
- Any blockers are reported before implementation begins.

---

# 4. PHASE 1: DESIGN FOUNDATION AND STATIC STRUCTURE

### Objective

Establish the visual foundation and reproduce the approved design before implementing complex interactions.

### Tasks

Verify or configure:

- Playfair Display.
- Open Sans.
- JetBrains Mono.
- Approved colour variables.
- Global typography.
- Base spacing conventions.
- Button styling.
- Responsive container behaviour.

Use the existing design tokens wherever possible.

Do not create a second, conflicting set of typography or colour variables.

### Homepage structure

Implement the homepage sections in the approved order:

1. Two-column editorial hero (Left: Brand copy & CTAs; Right: Creator photo; strictly NO video).
2. Featured Work.
3. Additional Work horizontal rail.
4. Short-Form showcase.
5. Thumbnail gallery.
6. YouTube intro showcase.
7. About By Design Studio.
8. Why Hire Me.
9. Services.
10. How I Work.
11. Ways to Work Together.
12. Final CTA.
13. Footer.

All sections and components must strictly comply with `docs/PERFORMANCE_GUIDE.md`.

Create reusable components for sections where doing so improves maintainability.

The exact component structure should follow the existing project and approved design rather than an unnecessarily rigid folder template.

### Initial layout

At this stage, prioritise:

- Correct section order.
- Typography.
- Colours.
- Spacing.
- Media proportions.
- Alignment.
- Desktop layout.
- Mobile layout.
- Navigation structure.

Use suitable temporary media references if the final assets have not yet been supplied.

Do not invent actual project information.

### Important About-section rule

Implement the About section as a single, static brand-focused composition.

The left side contains a brand-relevant visual.

The right side contains the description and philosophy of By Design Studio.

Do not implement the previously proposed About Brand / About Videographer toggle.

The client's latest decision supersedes the earlier proposal.

### Acceptance criteria

- The page structure matches the approved Stitch design.
- Typography and colours are consistent.
- All required homepage sections are present.
- No major layout overflows occur on desktop or mobile.
- The About section follows the final approved design.
- The application still builds successfully.

---

# 5. PHASE 2: PROJECT DATA AND PORTFOLIO PRESENTATION

### Objective

Establish a consistent data source for the approximately 15–16 portfolio videos and implement their visual presentation.

### Project data

Create a shared project-data structure.

Each project should support the information relevant to its type, including:

- Unique slug.
- Title.
- Category.
- Description.
- Poster image.
- YouTube video ID, where applicable.
- Optional preview-video URL.
- Optional supporting images.
- Related project references, where needed.

Use accurate information supplied by the client.

Do not fabricate titles, video IDs, client names, credits, or project results.

### Featured Work

Populate the featured-project compositions using the actual available projects.

Maintain the approved alternating editorial arrangements.

### Additional Work rail

Implement the horizontal project rail with user-controlled navigation.

It should support the interactions described in `INTERACTION_SPEC.md`.

Do not implement continuous automatic scrolling.

### Short-form showcase

Display vertical content using appropriate aspect ratios.

Use smartphone mockups selectively, following the approved design.

### Thumbnail gallery

Implement the thumbnail grid using the actual supplied thumbnail assets.

Keep the thumbnail gallery separate from the YouTube intro showcase.

### YouTube intro showcase

Display this category using its own approved composition.

### Acceptance criteria

- Project information comes from a shared data source.
- Project cards display the correct titles, categories, and images.
- Horizontal navigation works.
- Thumbnail and intro content remain distinct.
- Mobile layouts remain usable.
- Missing media does not break the layout.

---

# 6. PHASE 3: PROJECT-DETAIL ROUTES

### Objective

Implement the individual project pages that visitors open when selecting portfolio work.

### Routes

Use the Next.js App Router.

The primary project-detail route pattern is:

`/work/[slug]`

The Work archive should also have a consistent route or the agreed homepage navigation behaviour.

The contact experience should use the approved route or destination.

### Project-detail template

Create one reusable project-detail template.

The page should display:

1. Project title.
2. Project category.
3. Project description.
4. Video poster.
5. Play button.
6. Creative approach.
7. Relevant project information.
8. Supporting visual material.
9. Related projects.
10. Navigation back to the portfolio.

Optional fields should be displayed only when the corresponding information exists.

### Static generation

Because the portfolio's project collection is known in advance, evaluate static generation using `generateStaticParams()` for the known project slugs.

Do not add a database or CMS merely to generate these pages.

The project data can remain in a local TypeScript data source for this version.

### Project navigation

When a visitor selects a project card, open the correct detail route.

Selecting a related project must open that project's own page.

Unknown slugs should produce an appropriate not-found state.

### Acceptance criteria

- Every published project has a valid detail route.
- Every route displays the appropriate project information.
- The same project data is used across the homepage and detail page.
- Related-project links work.
- Missing projects are handled correctly.
- The video player is not automatically loaded during initial page rendering.

---

# 7. PHASE 4: MEDIA DELIVERY AND VIDEO PLAYBACK

### Objective

Implement the approved media strategy without unnecessary downloads or excessive third-party player loading.

### Cloudinary

Use Cloudinary for:

- Optimised photographs.
- Hero poster.
- Portfolio posters.
- Thumbnail designs.
- Supporting imagery.
- Optional short video assets where appropriate.

Use responsive sizing and suitable image transformations.

Verify that the current Cloudinary account can accommodate the expected usage.

Do not introduce paid usage without approval.

### Hero Creator media delivery

Implement the two-column hero with the creator editorial photograph in the right column.

- **STRICTLY NO VIDEO** in the hero section.
- Use Next.js `<Image />` with `priority={true}` and explicit `sizes` to eliminate layout shift (0 CLS).
- Optimize creator image via Cloudinary or local WebP under 150 KB.
- Ensure the container maintains an architectural 4:5 or 3:4 aspect ratio with 1px hairline border.

### YouTube embeds

Use YouTube for full-length portfolio videos.

Display a poster and Play button on project-detail pages.

When Play is activated, replace the poster with the relevant embedded YouTube player.

Do not load 15–16 players automatically on the homepage.

Use the correct video ID from the project data.

Where suitable, use YouTube's privacy-enhanced embed domain.

### Preview behaviour

Optional previews should be loaded only when the interaction warrants it.

Only one preview may play at a time.

Stop or pause previews when they become inactive.

If implementing previews adds excessive complexity or threatens the deadline, complete the poster and project-detail experience first and defer previews until the core functionality is stable.

### Failure states

Preserve posters when video playback fails.

Ensure that the visitor can still navigate the project and view its description.

Do not display an empty media container or broken-player icon.

### Acceptance criteria

- Hero displays two-column layout (Left: copy/CTAs; Right: creator photo) with instant LCP and NO video.
- Posters display before full-video playback.
- Full YouTube embeds load strictly on-demand.
- Project video IDs are correct.
- Network inspection confirms that zero YouTube iframes are mounted on initial page load.
- The website remains navigable when media is unavailable.

---

# 8. PHASE 5: NAVIGATION AND INTERACTIONS

### Objective

Implement the approved interactive behaviour after the static layout and core content are stable.

Follow `INTERACTION_SPEC.md`.

### Navbar

At the top of the homepage, the navbar is transparent.

After the visitor scrolls away from the hero, its background appears smoothly.

Interior pages use a readable navbar from their initial state.

### Mobile menu

Implement opening and closing, navigation links, keyboard access, and appropriate focus behaviour.

### Project rail

Implement touch-friendly horizontal scrolling and desktop navigation controls.

Ensure hover states do not move the entire rail.

### Thumbnail lightbox

Selecting a thumbnail opens an enlarged view.

Provide a close control and appropriate keyboard interaction.

### About section

Keep the static brand-focused layout.

Do not add the rejected toggle.

### Project navigation

Connect cards, detail pages, related projects, and navigation links.

### Contact interaction

Implement the approved contact or inquiry experience.

Do not claim that a form has been submitted unless the chosen submission mechanism actually succeeds.

If the project has no configured form-delivery service, report this limitation and propose a practical contact mechanism before integrating a paid service.

### Acceptance criteria

Every primary navigation link and interaction works as specified, and mobile visitors have usable alternatives to desktop hover behaviour.

---

# 9. PHASE 6: MOTION AND SCROLL EXPERIENCE

### Objective

Introduce the cinematic motion that enhances the approved visual design.

Do this after the main structure, media presentation, and interactions are stable.

### Priority 1: Hero

Implement the headline entrance and restrained scroll-linked hero transition.

### Priority 2: Navigation

Implement the navbar's background transition.

### Priority 3: Project reveals

Add subtle reveals for featured projects and relevant media.

### Priority 4: Supporting sections

Add restrained transitions to the About, Why Hire Me, process, and final CTA sections where the approved design supports them.

### Technology

Use CSS transitions for simple effects.

Use Intersection Observer or an equivalent approach for simple viewport-triggered reveals.

Use GSAP ScrollTrigger if it offers a clear advantage for the hero's more complex scroll-linked behaviour.

Do not add an animation library for every interaction.

### Motion constraints

- Never force the visitor to scroll automatically.
- Do not pin sections unnecessarily.
- Avoid dramatic parallax.
- Avoid excessive zooms or rotations.
- Respect reduced-motion preferences.
- Prevent animation-induced layout shifts.
- Ensure all content remains accessible without animation.

### Acceptance criteria

The motion feels consistent, improves the visual hierarchy, and does not interfere with reading, navigation, or performance.

---

# 10. PHASE 7: CONTACT, POLISH, AND CONTENT COMPLETION

### Objective

Ensure that the actual client's content is integrated and that the primary conversion path works.

### Tasks

- Replace temporary text with approved copy.
- Verify the About description.
- Confirm actual service offerings.
- Add the correct social links and contact details.
- Complete the final CTA.
- Verify the thumbnail and intro galleries.
- Check project descriptions and video IDs.
- Remove unused placeholder content.
- Ensure every visible CTA has an appropriate destination.

Do not invent testimonials, statistics, client results, or commercial promises.

### Acceptance criteria

The portfolio contains the actual approved content or clearly identified temporary placeholders awaiting the client's material.

No visible primary CTA should be knowingly broken.

---

# 11. PHASE 8: TESTING AND PERFORMANCE REVIEW

### Objective

Verify that the application behaves correctly and is ready to deploy.

### Visual testing

Compare the live application with the supplied Stitch references.

Inspect:

- Hero composition.
- Navbar placement.
- Typography.
- Section spacing.
- Featured-project arrangements.
- Short-form section.
- Thumbnail gallery.
- About section.
- Why Hire Me section.
- Footer.
- Project-detail page.
- Contact experience.

### Responsive testing

Test at desktop, tablet, and mobile viewport sizes.

Check for:

- Horizontal overflow.
- Text wrapping problems.
- Incorrect media proportions.
- Inaccessible buttons.
- Broken navigation.
- Missing content.
- Layout shifts.

### Functional testing

Test the primary visitor journeys:

1. Open the homepage and browse the hero.
2. Scroll into Featured Work.
3. Navigate the additional-work rail.
4. Open a project-detail page.
5. Activate Play and watch the embedded video.
6. Return to the portfolio.
7. Inspect an enlarged thumbnail.
8. Navigate to the contact experience.
9. Use the mobile menu.
10. Repeat representative interactions with reduced motion enabled.

### Performance testing

Inspect network requests in browser developer tools.

Verify that the initial homepage does not load all full-length video players.

Test the hero with video playback unavailable.

Use throttled mobile-network conditions where practical.

Check image delivery, media loading, layout movement, and browser console errors.

Run the applicable project checks, including linting and a production build.

Resolve blocking errors before deployment.

### Acceptance criteria

The primary user journeys work, the website remains usable with constrained media loading, and no unresolved blocking errors remain.

---

# 12. PHASE 9: DEPLOYMENT

### Objective

Publish a working version of the portfolio.

### Tasks

- Confirm required environment variables.
- Verify production build success.
- Confirm media URLs are available in production.
- Test all critical routes.
- Verify the contact destination.
- Deploy the application to the approved hosting service.
- Test the deployed website rather than relying exclusively on localhost.

Use an appropriate deployment service, such as Vercel, unless the project requires another platform.

Do not expose private service credentials in client-side code.

### Acceptance criteria

The deployed homepage, project-detail routes, media interactions, and contact experience work correctly.

The client can access the portfolio through its deployed URL.

---

# 13. FOUR-TO-FIVE-DAY DELIVERY PRIORITIES

The following is a planning guide, not permission to skip acceptance criteria.

## Day 1: Foundation and static design

- Inspect and verify the project.
- Configure the design system.
- Build the homepage structure.
- Match the approved desktop and mobile layouts.

## Day 2: Project data and detail pages

- Create the shared project data.
- Populate the portfolio.
- Implement the project-detail template.
- Connect project cards and routes.

## Day 3: Media and interactions

- Implement Cloudinary image delivery.
- Implement poster-first video presentation.
- Add click-to-load YouTube embeds.
- Implement the navbar, mobile menu, thumbnail lightbox, and horizontal rail.

## Day 4: Motion and testing

- Refine hero scroll behaviour.
- Add the most important section animations.
- Test media fallbacks and responsive behaviour.
- Fix high-priority issues.
- Deploy a working version.

## Day 5: Buffer and final review

If the additional day is available, use it for client feedback, content corrections, production fixes, and final polish.

Do not schedule major new features for the buffer day.

### Delivery priorities

**Priority A: Required for delivery**

- Faithful visual design.
- Responsive homepage.
- Working navigation.
- All major portfolio sections.
- Project-detail routes.
- Correct project content.
- YouTube click-to-load playback.
- Thumbnail gallery interaction.
- About section as approved.
- Contact path.
- Production deployment.

**Priority B: Important enhancements**

- Hero scroll-linked animation.
- Project-reveal animations.
- Optional hover previews.
- Refined rail controls.
- Additional related-project interactions.

**Priority C: Defer if necessary**

- Custom cursor.
- Elaborate page transitions.
- Complex pinned scrolling.
- Decorative animation sequences.
- Any feature that substantially increases implementation complexity without improving the core portfolio experience.

Complete Priority A before spending significant time on Priority C.

---

# 14. CHANGE CONTROL

The approved design and interaction specification are the baseline.

If the agent discovers a conflict, missing asset, or technical limitation:

1. Identify the issue.
2. Explain its impact.
3. Suggest the smallest practical solution.
4. Wait for approval when the decision affects scope, cost, or the approved design.

Do not independently redesign sections to solve implementation difficulties.

Do not install unnecessary dependencies.

Do not discard approved work simply because a different implementation seems more convenient.

---

# 15. FINAL DEFINITION OF DONE

The portfolio is ready for delivery when:

- The approved visual design has been reproduced.
- All required homepage sections are present.
- Project cards navigate correctly.
- Project-detail pages display the correct content.
- Full-length videos play using click-to-load YouTube embeds.
- The two-column hero renders cleanly (Left: copy/CTAs; Right: creator photo) with instant performance and NO video.
- The horizontal rail is usable on desktop and mobile.
- Thumbnail enlargement works.
- The About section follows the client's final design decision.
- The primary navigation and contact path work.
- The design is responsive.
- Motion respects accessibility preferences.
- Media loading has been tested.
- No critical errors remain.
- The production build succeeds.
- The deployed website has been tested.

**The objective is to deliver a complete, reliable portfolio that matches the approved design. Advanced animation is valuable, but it must never take priority over the core experience.**
