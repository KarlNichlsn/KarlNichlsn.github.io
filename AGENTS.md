# AGENTS.md

## Project Objective

Revamp this repository into a polished, professional personal website for Karl Nicholson.

The site should support:

- presenting my CV and professional background
- showcasing selected projects and work
- publishing essays and blog posts
- publishing travel writing
- presenting a distinctive but restrained visual identity
- preserving and improving the existing interactive vertical timeline
- including a high-quality interactive hero visual that reacts to the visitor's cursor
- including a Mercator-projection world map for travel writing

The finished site should feel professional, editorial, technically competent, personal, and memorable without looking like a generic developer portfolio, startup landing page, or over-animated product demo.

The design should communicate:

**clarity + character + restraint + maintainability**

not:

**maximum framework complexity + maximum animation + maximum number of components**

---

# Core Working Principle

The current site is the source of truth for:

- existing personal content
- CV and biographical information
- timeline entries
- project information
- useful images and assets
- external links
- existing public URLs where practical
- the custom domain and GitHub Pages deployment intent
- the intended concepts and interactions of the current site

However, the current implementation is **not authoritative**.

Preserve useful content and successful concepts, but do not preserve broken, brittle, inaccessible, outdated, or hard-coded implementations merely because they already exist.

For each existing feature:

1. determine what it was intended to accomplish
2. identify the content that must survive
3. determine how it should behave in the redesigned site
4. implement that behavior using the clearest modern architecture

The old site is a reference for **what I wanted to communicate**, not a specification of how the new site must be programmed.

---

# Preferred Architecture

Use **Astro** as the primary framework unless the repository already contains an equivalent modern static architecture and migration would create unnecessary risk.

Preferred stack:

- Astro
- TypeScript where useful
- Markdown or MDX for writing
- Astro content collections or the current recommended Astro content system
- CSS with reusable design tokens
- React only for isolated interactive components when genuinely justified
- Canvas, SVG, WebGL, or React for the cursor-reactive hero depending on which implementation is simplest and most performant
- GitHub Pages for hosting
- GitHub Actions for build and deployment

Do **not** convert the entire site to React merely because one visual element requires client-side interactivity.

Prefer Astro's island architecture so most pages ship as static HTML and JavaScript is loaded only where required.

Do not introduce a backend, database, or CMS unless explicitly requested.

The repository itself should function as the content source.

---

# Initial Audit

Before making substantial changes, inspect the entire repository.

Determine:

1. current framework or lack of framework
2. current GitHub Pages deployment method
3. current custom-domain setup
4. existing public routes and URLs
5. all pages and significant content
6. timeline data and timeline interaction logic
7. existing blog/post data
8. current travel map implementation
9. images, CV PDFs, favicons, and other assets
10. metadata, SEO tags, analytics, canonical URLs, and social preview information
11. scripts and styles
12. content or links that could be lost during migration

Before major implementation, briefly document:

- what currently exists
- what should be preserved
- what is weak, outdated, or broken
- what architectural changes are planned
- which files will be migrated, replaced, or removed

Do not discard existing personal content merely because it does not fit the first visual concept.

---

# Refactoring Permission

The agent is explicitly allowed to:

- replace existing JavaScript implementations
- replace hard-coded HTML with structured data or content
- redesign CSS substantially or from scratch
- replace the current map implementation
- replace the current timeline rendering logic
- reorganize assets
- introduce Astro components and layouts
- convert JSON data to TypeScript, Markdown, Astro content collections, or another clearer format
- remove obsolete code after confirming its content and behavior have been migrated
- improve interactions for accessibility, responsiveness, usability, maintainability, or performance

Do not reproduce broken behavior exactly.

---

# Site Structure

Aim for a clear primary navigation.

Suggested sections:

- Home
- About
- CV
- Projects
- Writing

Contact and external links may appear in the navigation, footer, home page, or About page as appropriate.

Avoid unnecessary pages.

---

# Homepage Narrative

The homepage should work as one continuous story rather than a collection of unrelated template sections.

Preferred flow:

```text
Introduction
      ↓
Interactive hero visual
      ↓
Brief current focus / positioning
      ↓
Vertical life timeline
      ↓
Selected work or writing
      ↓
Contact / footer
```

The hero and timeline should feel visually related.

If practical, allow the visual language of the hero to transition subtly into the timeline—for example through line, particle, field, or node motifs—but do not force this if it adds unnecessary implementation complexity.

---

# Homepage Introduction

The first viewport should quickly answer:

- who I am
- what I do
- what areas I am interested in
- what kind of work or ideas are worth exploring on the site

Avoid a generic SaaS hero.

Do not fill the hero with:

- technology badges
- marketing pills
- oversized CTA clusters
- generic feature cards
- unnecessary social proof
- decorative UI chrome

The introduction should feel personal and editorial.

---

# Interactive Hero Requirement

Create one signature visual element on the homepage that reacts to cursor or pointer movement.

The effect may resemble:

- a soft cloud
- a fluid field
- a wave
- an atmospheric mesh
- a distorted gradient field
- a particle field
- an organic surface
- another subtle natural or mathematical form

The visitor's pointer should influence the visual in a noticeable but restrained way.

Examples:

- a surface bends toward or away from the pointer
- waves propagate gently from pointer movement
- particles subtly displace around the pointer
- an organic cloud deforms locally
- a field shifts according to pointer position

The effect should feel integrated with the site rather than attached as a technology demo.

---

## Hero Technology Choice

Use the simplest technology that can deliver a polished result.

Consider, in order:

1. CSS + pointer tracking
2. SVG
3. Canvas 2D
4. a small isolated React component
5. WebGL / Three.js

Do not use React, WebGL, or Three.js merely because they are technically impressive.

If React is genuinely the cleanest implementation, use it as an isolated Astro island, for example:

```astro
<InteractiveHero client:load />
```

Do not make unrelated page content depend on React.

---

## Hero Design Requirements

The hero should be:

- atmospheric
- calm
- responsive
- visually distinctive
- professional
- subordinate to the site's content and typography

Avoid:

- cursor followers
- neon glows
- excessive particle counts
- constant aggressive movement
- large parallax effects
- animations that compete with the name or introduction
- interactions that resemble a game or product demo

The visual should continue to look good even when the pointer is not moving.

---

## Hero Performance

The interactive visual must:

- remain smooth on normal laptops
- degrade gracefully on weaker devices
- avoid blocking page interaction
- not interfere with selecting text
- not obscure navigation or content
- avoid unnecessary layout shifts
- avoid wasteful high-resolution rendering
- pause or reduce animation when not visible where appropriate

On high-DPI screens, cap rendering resolution if needed for performance.

---

## Hero Mobile Behaviour

Do not assume a mouse exists.

On touch devices:

- provide a visually pleasing passive animation or static composition
- optionally respond to touch if useful
- do not depend on hover
- preserve performance and battery life

---

## Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is requested:

- provide a static or substantially reduced hero
- disable unnecessary scroll entrance animations
- do not remove content or interaction functionality

---

# Homepage Vertical Timeline

The homepage should scroll naturally from the hero into an **interactive vertical life timeline**.

This timeline is an important existing feature and should be preserved conceptually while being improved technically and visually.

The timeline should feel like an interactive biography rather than a résumé simply placed vertically.

---

## Timeline Layout

On larger screens, create a central vertical chronological line.

Events should be arranged according to two conceptual categories:

- **Academic and professional pursuits on the left**
- **Other pursuits, interests, travel, activities, and personal milestones on the right**

Conceptually:

```text
Academic / Professional        Other pursuits

        Event ●────┐
                   │
                   │────● Event
                   │
        Event ●────│
                   │
                   │────● Event
                   │
        Event ●────│
```

The final design should be more refined than this schematic.

---

# Timeline Data Model

Do not determine left/right placement from hard-coded IDs.

The current timeline content may be migrated from existing JSON or other data, but the new schema should explicitly describe category.

Prefer Markdown entries validated as an Astro content collection:

```text
src/content/timeline/
  example-event.md
```

Each event should support useful fields such as:

```yaml
---
title: Example event
start: "2025"
side: academic
category: professional
showOnMobile: true
summary: Short description
href: /projects/example/
tags:
  - Research
---
```

Initial `side` values should be:

```text
academic
other
```

The `category` field is the visible editorial label and may use values such as:

```text
academic
professional
sporting
outreach
engineering
community
```

The `side` field determines timeline placement. The `category` field must not be used to infer placement.

---

# Timeline Migration Rules

Preserve useful existing timeline entries and links.

Do not preserve logic such as:

```js
if (
  experience.id === "example-a" ||
  experience.id === "example-b"
) {
  side = "left";
}
```

Replace brittle inference with explicit metadata.

Existing timeline content is migration source data, not a requirement to keep the old rendering code.

---

# Timeline Interaction

Timeline entries should appear as distinct interactive nodes, bubbles, or editorial markers connected to the central line.

The existing clickable concept should remain.

A meaningful event may link to:

- a project page
- a relevant blog post
- a travel destination
- the CV
- a dedicated detail page
- another internal page

Prefer semantic `<a>` links whenever navigation is the actual behavior.

Avoid JavaScript-only navigation when ordinary links work.

---

## Timeline Hover and Focus Behaviour

On pointer-capable devices, nodes may respond subtly to hover.

Appropriate effects include:

- slight expansion
- border or surface change
- revealing a short description
- subtle emphasis of the connection to the central line
- minor local movement

Avoid:

- bouncing
- glowing
- exaggerated scaling
- large transforms
- constant motion

The interaction should communicate:

> this point contains something worth exploring

rather than:

> this is an animated button

---

# Timeline Scrolling Behaviour

The timeline should reveal itself naturally as the visitor scrolls.

Appropriate effects include:

- the central line progressively appearing
- nodes entering gently near the viewport
- the active chronological region becoming slightly emphasized
- connecting lines becoming visible as the visitor progresses

Do not:

- hijack scrolling
- require animation to understand chronology
- hide content behind animation
- lock the viewport to individual events

Reduced-motion users should receive the complete timeline without entrance animation.

---

# Timeline Responsive Behaviour

Desktop:

```text
Academic              Timeline              Other
    ●────────────────────│
                         │──────────────●
    ●────────────────────│
                         │
```

Mobile should not squeeze this into two tiny columns.

Collapse to a single readable timeline while preserving category labels.

Example:

```text
│
●  Academic
│  Event title
│  Description
│
●  Other
│  Event title
│  Description
```

Use a restrained category label, marker, typography treatment, or alignment difference so the distinction remains understandable.

---

# Timeline Improvement Goals

Improve the current feature where useful.

Potential improvements include:

- clearer chronology
- explicit academic/other classification
- better spacing
- improved typography
- better mobile behavior
- semantic links
- keyboard accessibility
- clearer indication of clickable entries
- content-driven URLs
- useful images where appropriate
- subtle scroll progression
- reduced-motion support
- better handling of events close together in time

Do not preserve arbitrary bubble sizes, exact positions, animation timings, or old CSS if better alternatives exist.

---

# About Page

Use the About page for a more narrative biography.

It may include:

- professional background
- academic background
- research or technical interests
- current focus
- selected personal interests where appropriate

Do not invent personal facts.

---

# CV Page

Present CV information as readable semantic HTML rather than relying solely on a PDF.

Where relevant include:

- experience
- education
- research
- publications
- selected projects
- awards
- relevant skills

If a PDF CV exists, preserve it and provide a clear download link.

Do not invent:

- qualifications
- employment
- dates
- achievements
- publications
- awards
- project outcomes

---

# Projects

Present a curated set of meaningful projects.

Prefer a smaller number of well-described projects over a large grid of shallow cards.

A project may include:

- title
- short description
- my role
- technologies where relevant
- outcome or purpose
- links to code, demo, paper, or write-up

Avoid excessive technology badges.

---

# Writing

The Writing section should support at minimum:

```text
Writing
├── Essays / Articles
└── Travel
```

Writing should be repository-based using Markdown or MDX.

Do not introduce a database for ordinary publishing.

---

# Blog Content Architecture

Use Astro content collections or the current recommended Astro content approach.

Prefer a structure such as:

```text
src/
  content/
    writing/
      essays/
      travel/
```

or another clean equivalent.

Publishing a post should require approximately:

1. create a Markdown or MDX file
2. add frontmatter
3. write the article
4. commit
5. push
6. GitHub Actions rebuilds and deploys

Blog layouts should support:

- semantic headings
- responsive typography
- images
- links
- lists
- code blocks
- blockquotes
- captions
- accessible footnotes where used

Use MDX only when interactive embedded components provide real value.

---

# Blog Metadata

Each article should support at minimum:

- title
- publication date
- description or excerpt
- slug or derived route
- content type

Optional:

- tags
- updated date
- cover image
- reading time

---

# Travel Writing

Travel writing should be a first-class content type.

A travel article should carry geographic metadata in its frontmatter.

Example:

```yaml
---
title: "Three Weeks in Kyoto"
description: "Notes from Kyoto and the surrounding region."
date: 2026-04-12
type: travel

location:
  id: kyoto
  name: Kyoto
  country: Japan
  latitude: 35.0116
  longitude: 135.7681

tags:
  - Japan
  - Travel

cover: /images/writing/kyoto/cover.webp
---
```

The exact schema may evolve, but location metadata should live with the article whenever practical.

---

# Travel Map

The Writing or Travel landing page should include a **Mercator-projection map of the world**.

This map should be a meaningful navigation interface for travel writing, not merely decorative geography.

The current map implementation should be treated as a prototype only.

Its mechanics may be replaced completely.

---

# Replace the Existing Map Implementation

Do not preserve an approach based on:

- manually clicking a background map to place coordinates
- browser `localStorage` as published content storage
- manually positioned CSS percentages
- maintaining map pins separately from travel posts
- a public editing interface for pins
- a static image when proper geographic projection is practical

Implement the travel map cleanly from structured content.

Preferred architecture:

```text
Travel Markdown/MDX
        │
        │ frontmatter contains
        │ latitude + longitude
        ▼
Astro content collection
        │
        ▼
destination aggregation
        │
        ▼
Mercator projection
        │
        ▼
SVG world map
        │
        ▼
interactive pins
```

---

# Geographic Accuracy

Use real geographic geometry from a reputable dataset or package.

Reasonable options include:

- D3 geographic projection utilities
- TopoJSON
- Natural Earth-derived geometry
- another lightweight, reputable geographic source

The projection must be a real Mercator projection.

For every destination:

```text
longitude + latitude
        ↓
Mercator projection
        ↓
SVG x/y coordinate
```

Do not estimate pin positions manually.

Do not use arbitrary percentage coordinates.

---

# Map Rendering

For a fixed world overview with clickable pins, prefer a lightweight SVG implementation over a full slippy-map system.

Use a heavier mapping framework only if it provides clear value.

The visual treatment should match the site's editorial design system.

Preferred qualities:

- clean
- low visual noise
- restrained country boundaries
- subtle land/ocean differentiation
- typography consistent with the rest of the site
- clear but unobtrusive markers

Avoid making the travel section look like an embedded Google Maps product.

---

# Travel Pins

Each travel destination should be represented by an interactive pin or marker.

A pin should support information such as:

```ts
{
  id: "kyoto",
  name: "Kyoto",
  country: "Japan",
  latitude: 35.0116,
  longitude: 135.7681,
  posts: ["three-weeks-in-kyoto"]
}
```

The final destination collection should ideally be derived automatically from travel article metadata rather than maintained manually.

---

# Automatic Pin Generation

Preferred authoring workflow:

```text
Write travel article
       ↓
Add location coordinates to frontmatter
       ↓
Astro content collection validates article
       ↓
Travel index extracts locations
       ↓
World map receives destination
       ↓
Build and deploy
```

Adding a new correctly configured travel post should automatically create or update its map destination.

Do not require editing the map component itself.

---

# Multiple Posts From One Destination

Use a stable destination identifier.

For example:

```yaml
location:
  id: kyoto
  name: Kyoto
  country: Japan
  latitude: 35.0116
  longitude: 135.7681
```

Posts using the same `location.id` should be grouped together.

Do not use fuzzy geographic matching unless there is a compelling reason.

If there is one article for a destination, clicking the pin may navigate directly to it.

If there are multiple articles, clicking should navigate to a destination page or show an accessible preview/list leading to those articles.

---

# Travel Pin Interaction

Desktop:

Hovering or focusing a pin may reveal a compact preview such as:

```text
Kyoto, Japan
2 posts

Three Weeks in Kyoto
Autumn in Kansai
```

Mobile:

Do not depend on hover.

A tap may:

- reveal destination information and a clear link
- navigate directly when there is only one obvious article
- open a small accessible destination panel

All pins must be keyboard accessible.

Use visible focus states.

Provide meaningful accessible labels such as:

```text
Kyoto, Japan — 2 travel posts
```

---

# Map Accessibility

The map must never be the only way to access travel writing.

Near or below the map, provide an ordinary semantic destination/post list.

A keyboard-only or screen-reader visitor must be able to browse all travel posts without interacting with SVG geography.

For SVG maps:

- give the map an accessible label
- mark decorative country geometry appropriately
- ensure interactive pins are keyboard accessible
- provide visible focus states
- use meaningful accessible names

---

# Map Progressive Enhancement

The textual travel index is the canonical navigation.

The map is an enhanced geographic interface.

Expected behavior:

```text
JavaScript works
    ↓
interactive map + textual list

JavaScript fails
    ↓
textual travel list still works
```

A map failure should not prevent access to posts.

If map rendering fails:

- preserve the Travel heading
- preserve the introduction
- preserve the destination/post list
- hide or replace the failed visualization gracefully

Do not expose raw technical errors to normal visitors.

---

# Map Performance

Keep the map lightweight.

Prefer:

- simplified world geometry
- SVG paths
- build-time processing where practical
- minimal client-side JavaScript

Avoid:

- large map-tile downloads
- unnecessary zoom engines
- complex GIS libraries for a simple fixed world overview
- expensive client-side processing when it can happen at build time

---

# Travel Data Validation

Validate travel metadata at build time where practical.

Required location fields should include:

- `location.id`
- `location.name`
- `location.country`
- `location.latitude`
- `location.longitude`

Latitude must be between:

```text
-90 and 90
```

Longitude must be between:

```text
-180 and 180
```

Malformed travel content should fail clearly during development/build rather than silently producing broken pins.

---

# Travel URLs

Use stable, understandable URLs.

Possible structure:

```text
/writing/
/writing/example-essay/

/writing/travel/
/writing/travel/kyoto/
/writing/travel/kyoto/three-weeks-in-kyoto/
```

A flatter route structure is acceptable if it is simpler.

Once published, treat article URLs as stable.

---

# Relationship Between Timeline and Writing

Timeline nodes may link to deeper content.

Examples:

```text
2025
Moved to Japan
      ↓
/writing/travel/kyoto/

2024
Research project
      ↓
/projects/research-project/

2023
Cycling trip
      ↓
/writing/travel/cycling-europe/
```

The timeline should represent the chronological story.

Projects, CV pages, essays, and travel writing should provide deeper detail.

Do not duplicate full article/project content inside timeline entries.

---

# Content Model

Aim for one authoritative source for each piece of content.

An illustrative structure:

```text
src/
├── components/
│   ├── hero/
│   │   └── InteractiveHero.*
│   │
│   ├── timeline/
│   │   ├── Timeline.astro
│   │   └── TimelineItem.astro
│   │
│   └── travel/
│       ├── WorldMap.astro
│       └── MapPin.astro
│
├── content/
│   ├── timeline/
│   ├── writing/
│   │   ├── essays/
│   │   └── travel/
│   └── projects/
│
├── layouts/
│   ├── BaseLayout.astro
│   └── ArticleLayout.astro
│
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── cv.astro
│   ├── projects.astro
│   └── writing/
│
└── styles/
```

This structure is illustrative rather than mandatory.

Prefer the structure that gives the clearest repository.

---

# Visual Direction

The site should feel closer to:

- an editorial publication
- a thoughtful professional profile
- a research or technical portfolio
- a well-designed personal journal

than to:

- a startup landing page
- a template marketplace demo
- a dashboard
- a gaming interface
- a neon cyberpunk portfolio
- an aggressively animated agency site

Prioritize:

- excellent typography
- strong information hierarchy
- generous spacing
- restrained color
- coherent composition
- polished responsive behavior
- readable long-form content
- subtle interaction
- high-quality motion where motion actually helps

Avoid:

- excessive gradients
- glassmorphism everywhere
- glowing borders
- unnecessary rounded cards
- large collections of pills
- excessive shadows
- animated text for its own sake
- constant movement
- huge technology-logo sections
- repetitive generic cards

---

# Selected Visual Direction

The approved visual direction combines the structure of **The Scientific Review** with the warmer character of **The Cartographic Field Journal**.

Treat the following as the visual source of truth unless Karl explicitly changes it.

## Design Character

- contemporary scientific and editorial publication
- warm, personal and quietly authoritative
- generous composition with precise rules and restrained interaction
- minimal card chrome; organise content through typography, spacing and hairlines
- hero and timeline should share a continuous line or contour language
- use the terracotta convergence mark in `public/favicon-options/convergence-terracotta.svg` as the site favicon

## Typography

- headings and display text: **Bitter**, using its restrained slab-serif forms for a subtle typewritten character without becoming monospaced or distressed
- body, navigation and metadata: **Public Sans**
- use only these two families unless a specialised code face is genuinely needed in article content
- long-form writing should remain comfortably narrow with generous line height

## Day Palette

```text
Page background:     #F1EADF
Main surface:        #F8F3E9
Subtle surface:      #E8DED2
Primary text:        #201C18
Secondary text:      #62594F
Terracotta accent:   #8F4937
Strong accent:       #7C3E30
Borders and rules:   #CFC2B3
Hero/timeline lines: #A78270
Text on accent:      #FFF8EF
```

## Night Palette

Night mode should resemble dark paper and warm ink rather than a generic pure-black developer theme.

```text
Page background:     #1B1815
Main surface:        #25211D
Subtle surface:      #2E2924
Primary text:        #F1E9DD
Secondary text:      #B9AC9D
Terracotta accent:   #D98F73
Strong accent:       #E7A083
Borders and rules:   #50463D
Hero/timeline lines: #8B6254
Text on accent:      #1B1815
```

## Theme Behaviour

- theme changes must be controlled by an explicit button only
- do **not** read or follow the operating system colour-scheme preference
- first visits start in day mode
- remember only a visitor's explicit button selection in local storage
- prevent a flash of the incorrect theme during navigation or reload
- the toggle should use a compact animated sun-to-moon transition inspired by the selected 21st.dev animated theme toggle
- implement the interaction with an accessible native button, SVG and CSS when practical; do not introduce React or Framer Motion solely for this control
- give the button a clear changing accessible name such as `Switch to night mode` and `Switch to day mode`

## Navigation

- use a thin publication-style masthead
- place the Karl Nicholson wordmark on the left and primary sections on the right
- use rules, typography and an understated active state instead of floating navigation chrome
- place the theme button alongside the primary navigation controls
- retain the visible primary links through tablet and normal laptop widths; use the compact menu only when the links no longer fit comfortably
- when the compact menu is used, render its opaque panel directly below the masthead with accessible touch targets and no overlap with the header content

## Hero

- use 47 individually indexed, fine organic vertical contours in terracotta and muted graphite tones across the full width of the landing composition
- use smooth curved geometry throughout the convergence; do not join the contours with visibly straight or angular segments
- place the name and introduction above the field as foreground content; use a transparent, steeply fading background-colour wash for legibility rather than a conventional card
- begin the name and introduction nearer the top of the landing page instead of vertically centring them
- bring the separate vertical contours together toward the bottom of the landing and resolve them into one central spine
- carry that central spine directly into the timeline without an intervening current-focus section, timeline introduction or horizontal rule
- pointer movement should deform the field locally and gently
- the composition must remain attractive when static and on touch devices
- the visual should be subordinate to the introduction and should conceptually resolve into the timeline spine
- show the understated note `This site is best viewed on desktop` on mobile only
- do not use neon effects, cursor followers, large gradients or technology-demo styling

## Timeline

- retain a precise central chronological hairline on larger screens
- events with `side: academic` appear on the left; events with `side: other` appear on the right
- render the card's visible category from its Markdown `category` field, independent of placement
- begin the first timeline event immediately after the hero so its central line is visually continuous with the converged hero field
- use editorial event notes, dates and fine connectors rather than rounded cards
- use terracotta for meaningful emphasis and interactive states
- collapse to one clear line on mobile while retaining visible category labels
- give every timeline event an explicit `showOnMobile` boolean so the mobile timeline can present a deliberately curated subset without deleting desktop content

## Articles and Supporting Pages

- prefer publication-like page openings, decks, rules, captions and readable text measures
- group the Writing landing page under the labels **Musings** and **Gach áit eile**, without a separate visible page header
- travel writing may use coordinates and cartographic line details sparingly
- avoid excessive cards, pills, rounded containers, shadows and decorative UI chrome
- all pages must use the same day/night design tokens so the visual identity remains coherent

---

# Design System

Establish reusable design tokens before implementing many pages.

At minimum define:

- page background
- surface colors
- primary text
- secondary text
- accent color
- border color
- typography families
- heading scale
- body scale
- spacing scale
- content widths
- reading width
- border radii
- transition durations
- shadows if used

Prefer CSS custom properties.

Example:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-accent: ...;
  --color-border: ...;

  --font-display: ...;
  --font-body: ...;

  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;
  --space-xl: ...;

  --content-width: ...;
  --reading-width: ...;
}
```

Do not scatter arbitrary values through components when design tokens would be clearer.

---

# Typography

Typography should carry much of the visual identity.

Use a small number of typefaces.

Prefer:

- one strong display or heading face
- one highly readable body face

or one excellent variable family if appropriate.

Long-form writing should have a comfortable reading width.

Pay particular attention to:

- line height
- paragraph spacing
- heading rhythm
- link styling
- code styling
- lists
- blockquotes
- captions

---

# Animation

Animation should support hierarchy and interaction.

Appropriate examples:

- interactive hero response
- subtle timeline progression
- navigation state changes
- hover responses
- modest image reveals
- restrained entrance transitions

Avoid:

- scroll hijacking
- loading screens
- large staggered animations on every section
- excessive parallax
- persistent cursor followers
- animation that delays access to content

Prefer native CSS animation when sufficient.

Do not add Framer Motion unless React components already justify it.

---

# UI/UX Pro Max

If UI/UX Pro Max is available, use it during major design decisions.

Use it as a design knowledge source for:

- typography
- palette
- spacing
- layout
- accessibility
- portfolio patterns
- editorial layouts
- long-form reading
- responsive behavior

Do not apply recommendations blindly.

Maintain one coherent visual identity.

---

# 21st.dev

If 21st.dev or equivalent component tooling is available, use it selectively for:

- component inspiration
- interaction patterns
- layout references
- examples of polished UI

Do not allow a component library to dictate the architecture.

If a useful component is React/Tailwind-based but the concept is simple, adapt the design to Astro and normal CSS instead of introducing major dependencies only to copy it.

---

# Accessibility

Treat accessibility as a core requirement.

Check:

- semantic HTML
- heading hierarchy
- keyboard navigation
- visible focus states
- sufficient contrast
- link clarity
- alt text
- form labels if forms exist
- reduced-motion support
- landmark elements
- meaningful page titles
- touch targets

Interactive visuals must not interfere with keyboard or screen-reader usage.

Decorative Canvas or SVG elements should be hidden from assistive technology where appropriate.

---

# SEO and Metadata

Preserve existing useful metadata and improve it where needed.

Each page should have:

- appropriate `<title>`
- meta description
- canonical URL where applicable
- Open Graph metadata
- social preview information

Blog posts should generate metadata from frontmatter.

Where practical add:

- sitemap
- RSS feed for writing
- structured metadata where useful

Do not overengineer SEO.

---

# Existing URLs

Preserve important existing public URLs where practical.

If routes must change, add redirects where GitHub Pages/static architecture allows it, or preserve equivalent paths through Astro routing.

Do not break external links to existing published content unnecessarily.

---

# GitHub Pages

The final site must remain deployable on GitHub Pages.

Determine whether the site is:

- a user/organization Pages site
- or a project site under a repository subpath

Configure Astro's `site` and `base` correctly.

Do not assume deployment is rooted at `/` without checking.

Use GitHub Actions to:

1. install dependencies
2. build the Astro project
3. upload the production artifact
4. deploy it to GitHub Pages

Ensure the deploy artifact contains the generated root `index.html`.

---

# Custom Domain

Preserve the existing custom domain configuration.

If a `CNAME` file exists, ensure it remains available in the final build, typically via `public/CNAME` or the correct Astro/GitHub Pages equivalent.

Do not remove or replace the custom domain without explicit instruction.

---

# Repository Hygiene

Keep the repository understandable.

Before adding a dependency, ask:

- can this be implemented clearly with the platform already present?
- is the dependency useful beyond one trivial effect?
- is its complexity justified?

Avoid multiple dependencies that solve the same problem.

Remove obsolete code after successful migration, but only after confirming its content and required behavior have been preserved.

Do not commit:

- secrets
- API keys
- unnecessary generated files
- local development artifacts
- temporary screenshots unless deliberately retained for documentation

---

# Content Preservation

Preserve:

- biographical information
- education
- work history
- project descriptions
- publications
- external links
- contact information
- CV download
- useful images
- existing article URLs where practical
- useful timeline content

Small changes to interface copy are allowed for clarity.

Do not substantially rewrite personal or professional claims without explicit instruction.

Never invent:

- qualifications
- employment
- research claims
- achievements
- publications
- clients
- awards
- project outcomes

---

# Responsive Design

Design deliberately for at least:

- small mobile
- large mobile
- tablet
- normal laptop
- large desktop

Do not merely shrink desktop layouts.

Check:

- navigation
- typography
- hero composition
- interactive hero
- timeline
- CV sections
- project layouts
- blog typography
- map
- map interactions
- images
- footer

No horizontal scrolling should occur at normal viewport widths.

---

# Browser Testing

After implementation, run the site locally and inspect it in a real browser.

Use Playwright or equivalent browser automation if available.

Test representative widths such as:

```text
375px
768px
1280px
1440px
```

Inspect at minimum:

- home page
- interactive hero
- timeline
- About
- CV
- Projects
- Writing index
- Travel map
- one essay
- one travel article

Check for:

- horizontal overflow
- clipped text
- broken images
- broken links
- console errors
- hydration errors
- animation glitches
- poor focus behavior
- incorrect routes
- poor spacing
- inaccessible interactions
- mobile layout problems

Do not consider the redesign complete merely because the production build succeeds.

---

# Visual QA

Take screenshots during development if browser tooling allows it.

Evaluate pages as compositions, not just as collections of components.

Check:

- whether the eye knows where to look first
- whether sections feel distinct
- whether whitespace is balanced
- whether typography feels intentional
- whether repeated UI becomes monotonous
- whether the hero dominates too much
- whether the timeline feels narrative rather than résumé-like
- whether the map feels editorial rather than dashboard-like
- whether the site still looks good without motion
- whether the overall design feels personal rather than templated

Iterate when the result feels generic.

---

# Build Validation

Before finishing, ensure the production build succeeds:

```bash
npm run build
```

Also verify the development command, likely:

```bash
npm run dev
```

If linting or type checking is configured, run those too.

Resolve all errors and meaningful warnings.

---

# Migration Strategy

If converting the existing static site to Astro:

1. inventory current content, routes, and assets
2. identify working concepts and broken implementations
3. create the Astro structure
4. reproduce or preserve important routes
5. move shared layout into reusable components
6. establish design tokens
7. migrate personal and CV content
8. migrate timeline data into an explicit structured schema
9. rebuild the timeline
10. create writing content collections
11. migrate useful post content
12. rebuild the travel map using real geographic data
13. create the interactive hero
14. configure GitHub Pages deployment
15. preserve the custom domain
16. run responsive and accessibility QA
17. remove superseded code only after migration has been verified

Prefer incremental migration over deleting the current site and rebuilding blindly.

---

# Recommended Implementation Order

Work in logical phases.

## Phase 1 — Audit and architecture

- inspect the existing site
- inventory content
- identify URLs
- identify assets
- understand current timeline and map logic
- establish the Astro target structure

## Phase 2 — Foundation

- install/configure Astro
- establish layouts
- establish design tokens
- migrate shared navigation/footer
- configure GitHub Pages
- preserve custom domain
- ensure build succeeds

## Phase 3 — Content migration

- migrate personal content
- migrate CV content
- migrate projects
- migrate timeline data
- migrate existing posts

## Phase 4 — Homepage and hero

- implement homepage composition
- implement interactive hero
- ensure reduced-motion and mobile fallbacks
- test performance

## Phase 5 — Timeline

- implement the central vertical timeline
- academic/professional left
- other pursuits right
- clickable nodes
- mobile single-column layout
- accessibility
- restrained scroll interaction

## Phase 6 — Writing

- implement essay/blog content
- article layouts
- Writing index
- metadata
- RSS/sitemap if appropriate

## Phase 7 — Travel

- implement travel content schema
- implement real Mercator world map
- generate pins from article metadata
- group destinations
- add textual fallback
- test pointer, keyboard, and touch behavior

## Phase 8 — QA

- build
- browser test
- mobile test
- keyboard test
- reduced-motion test
- link test
- GitHub Pages validation
- custom domain validation

---

# Definition of Done

The redesign is complete when:

- the site builds successfully
- GitHub Pages deployment is configured correctly
- the existing custom domain remains supported
- important existing content has been preserved
- important existing URLs remain functional where practical
- the homepage has a polished cursor-reactive hero
- the hero works without requiring the entire site to be React
- the homepage includes the vertical chronological timeline
- academic/professional pursuits appear conceptually on the left on larger screens
- other pursuits appear conceptually on the right
- timeline nodes remain clickable and interactive
- timeline data uses explicit categories rather than hard-coded IDs
- the timeline becomes readable single-column content on mobile
- the Writing section supports Markdown/MDX publishing
- the Travel section includes a real Mercator-projection world map
- map pins use real latitude/longitude
- pins are generated from travel article metadata
- multiple posts for one destination are grouped sensibly
- map interaction works with pointer, keyboard, and touch
- travel writing remains accessible through ordinary text navigation
- published content does not rely on `localStorage`
- neither the timeline nor map requires a backend
- reduced motion is supported
- pages are responsive
- there are no significant browser console errors
- navigation works
- long-form writing is comfortable to read
- the design feels cohesive, editorial, personal, and professional
- the implementation remains maintainable

---

# Final Decision Rule

When choosing between preserving old code and improving the site, use this priority order:

1. preserve factual personal content
2. preserve useful public URLs
3. preserve successful concepts and interactions
4. improve usability and accessibility
5. improve design quality
6. improve maintainability
7. simplify implementation
8. remove obsolete code

Do not optimize for visual similarity to the old site.

Optimize for a significantly better version of the same underlying personal identity and content.
