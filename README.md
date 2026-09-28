# Maicon Figueredo - Senior QA Engineer Portfolio

A recruiter-focused QA engineering portfolio built with React and Vite. The site presents verified experience across Web, Mobile, API, Performance, automation, CI/CD, observability and test strategy.

## Highlights

- Responsive single-page experience with anchor navigation.
- Featured QA project case studies with local detail dialogs.
- Senior QA process and test pyramid visualizations.
- Categorized technology stack without invented skill percentages.
- Accessible keyboard states, native dialog, skip link and reduced-motion support.
- SEO metadata, Open Graph metadata and a custom favicon.
- Downloadable original resume supplied by Maicon.
- GitHub Pages deployment workflow.
- Instant English / Brazilian Portuguese language switch without page reload.
- Language preference persisted under `portfolio-language` in `localStorage`.
- Dynamic title, description and social metadata for each language.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

The static production output is written to `dist/`.

## Automatic GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` deploys on pushes to `main` and can also be started manually using the official GitHub Pages actions.

In the GitHub repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push the project to the `main` branch.
4. Follow the workflow under the **Actions** tab.

The Vite build uses `/maicon-qa-portfolio/` as its base path.

Published URL: `https://maiconfigueredo.github.io/maicon-qa-portfolio/`

## Content updates

- Update English content in `src/i18n/en.js`.
- Update Brazilian Portuguese content in `src/i18n/ptBR.js` using the same object structure.
- Language state, persistence and dynamic SEO metadata live in `src/i18n/LanguageContext.jsx`.
- Update layout and presentation components in `src/App.jsx`.
- Update the visual system in `src/styles.css`.
- Keep `CONTENT-SOURCE.md` aligned with every factual change.
- Update the centralized LinkedIn and resume paths in `src/config/profile.js`.
- Keep the verified resume files under `public/resume/`.

## Documentation

- `REFERENCE-ANALYSIS.md` - reference portfolio review and selected ideas.
- `PORTFOLIO-ARCHITECTURE.md` - product, design and technical architecture.
- `CONTENT-SOURCE.md` - traceability for every portfolio claim.

## Verification targets

The layout is designed for and should be checked at:

- 1920 × 1080
- 1366 × 768
- 768px wide
- 390px wide

