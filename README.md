# Personal Site (Typewriter Aesthetic)

A minimal, typewriter-inspired personal website ready for GitHub Pages.

## Features
- Off‑white “typewriter” theme with dark/night mode (sun/moon toggle).
- Sticky header with hamburger menu on mobile.
- Sections: **About**, **Travel & Thoughts**, **Contact**.
- **About**: CV / LinkedIn / GitHub buttons, plus a scrollable, chronological experience timeline (edit `experiences.json`).
- **Travel & Thoughts**: Mercator world map that you can click to add pins linked to posts (stored in your browser). Blog cards loaded from `posts.json`, sortable, searchable, and filterable by tags.
- **Contact**: Buttons for LinkedIn and Email.
- No build step. Pure HTML/CSS/JS.

## Quick Start (GitHub Pages)
1. Create a new repo on GitHub (e.g., `yourname.github.io`).
2. Download the ZIP from this assistant and extract it.
3. Replace placeholder content:
   - Put your **CV** PDF at `assets/CV.pdf` (or change the link in `index.html`).
   - Swap `assets/world-map-mercator.jpg` with your own map image (any Mercator projection image).
   - Update the social links in `script.js` (`LINKS` object) and the email in the contact section.
   - Edit `experiences.json` and `posts.json` to your content.
4. Commit & push everything to the repo root.
5. In your repo settings, enable **Pages** (if not using the `yourname.github.io` naming).
6. Your site will be live at `https://yourname.github.io/` (or the Pages URL).

## Editing Content
- **Timeline:** Update `experiences.json` entries. Fields: `title`, `org`, `start`, `end`, `desc`.
- **Posts:** Update `posts.json` entries. Fields: `title`, `date` (YYYY-MM-DD), `excerpt`, `tags`, `url`.
- **Map Pins:** Click on the map to add a label and optional URL. Pins persist in **localStorage** (per browser). To share pins with others, hardcode them in JS or pre-render them from a file.

## Customize
- Tweak fonts and colors in `styles.css` (CSS variables at the top).
- Adjust copy and structure in `index.html`.
- Add a favicon by dropping `favicon.ico` in the root and adding it to the `<head>`.

## License
Do whatever you want with it. Have fun!
