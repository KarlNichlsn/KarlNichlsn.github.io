# Karl Nicholson — personal site

This repository contains the Astro source for [karlnicholson.net](https://karlnicholson.net).

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated site is written to `dist/`.

## Publishing writing

Essays live in `src/content/writing/essays/` and travel writing lives in
`src/content/writing/travel/`. Each Markdown file is validated by the schemas in
`src/content.config.ts`. Travel posts require a stable destination ID, name, country,
latitude and longitude so the future map can derive its pins directly from content.

## Deployment and custom domain

`.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages whenever
`main` is updated. GitHub Pages must use **GitHub Actions** as its deployment source.

The custom domain remains `karlnicholson.net`. The repository-root `CNAME` is retained
for migration history, while `public/CNAME` is copied into the generated deployment
artifact by Astro. `astro.config.mjs` therefore uses `https://karlnicholson.net` as its
`site` and intentionally has no repository `base` path.

## Migration status

The legacy root HTML, JSON, JavaScript and CSS files remain in the repository during
the migration. Astro does not use them. They can be removed after the migrated site,
content and legacy redirects have been reviewed and accepted.
