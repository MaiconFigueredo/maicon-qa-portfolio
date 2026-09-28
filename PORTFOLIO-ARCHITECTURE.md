# Portfolio Architecture

## Product goal

Create a recruiter-facing, single-page portfolio that communicates Maicon Figueredo's seniority, automation experience, testing scope, and technical judgment within the first viewport and supports deeper evaluation through concrete project case studies.

## Audience

- Brazilian and international recruiters.
- QA and engineering managers.
- Technical interviewers for QA Engineer, Senior QA, QA Automation, Software Test Engineer, and SDET roles.

## Experience strategy

The page follows a proof-first narrative:

1. **Hero:** identity, role, 7+ years, scope, remote availability, and primary CTAs.
2. **Proof strip:** concise signals for experience, platforms, English, and delivery model.
3. **About:** senior-level profile and working context.
4. **Featured Projects:** concrete automation, observability, API, performance, and web testing work.
5. **How I Test Software:** risk-led QA process and test pyramid.
6. **Tech Stack:** categorized tools without invented proficiency percentages.
7. **Experience:** chronological professional timeline.
8. **QA Toolbox:** practices, artifacts, evidence, and release-quality concerns.
9. **Education & Certifications:** verified academic background and credentials from the supplied resume.
10. **Contact:** LinkedIn and remote/worldwide positioning.

## Technology

- React 18 for component composition and accessible interactive details.
- Vite for a small, fast static build.
- TypeScript-free JavaScript to keep the portfolio simple to maintain.
- Lucide React for a consistent line-icon system.
- Plain CSS with design tokens; no UI framework or runtime styling dependency.
- GitHub Actions for GitHub Pages deployment.

## Component structure

- `App`: global page structure and active-section state.
- `Header`: sticky desktop navigation, mobile menu, and LinkedIn CTA.
- `Hero`: recruiter summary, badges, CTAs, and QA signal panel.
- `SectionHeading`: consistent section hierarchy.
- `ProjectCard`: reusable project summary with local detail action.
- `ProjectDialog`: accessible native dialog with complete case-study content.
- `TechStack`: categorized technology cards.
- `ExperienceTimeline`: dated role history.
- `TestingProcess`: ten-step senior QA workflow.
- `TestPyramid`: compact coverage/cost visualization.
- `Contact`: final conversion section.

## Content model

Portfolio facts and interface text are stored in matching locale objects in `src/i18n/en.js` and `src/i18n/ptBR.js`. `LanguageContext.jsx` exposes `useTranslation()`, persists `portfolio-language` in `localStorage`, and updates document and social metadata. This keeps language decisions out of presentation components and makes future translations predictable.

## Visual thesis

**Quality Operations Console**

The design uses a deep graphite background, restrained cyan/violet highlights, subtle grid texture, bordered surfaces, compact monospace metadata, and status/evidence motifs. The aesthetic is closer to a modern engineering product than a generic resume template.

## Responsive behavior

- Large desktop: two-column hero, asymmetric project grid, horizontal proof strip.
- Notebook: reduced gutters and compact navigation.
- Tablet: single-column hero and simplified project spans.
- Mobile: collapsible navigation, stacked CTAs, horizontally scrollable process steps with visible snap behavior, single-column cards, and wrapped technology chips.
- Global `overflow-x: clip` plus width constraints prevent accidental horizontal scrolling.

## Accessibility

- Semantic landmarks and heading hierarchy.
- Skip link and keyboard-visible focus states.
- Native `<dialog>` for project details with explicit close control.
- Buttons and links have meaningful accessible names.
- Icons are decorative unless they convey unique meaning.
- Color contrast designed for dark surfaces.
- Motion is disabled for `prefers-reduced-motion`.
- Mobile menu exposes `aria-expanded` state.

## Performance

- No hero photography or heavy media.
- One small icon package, tree-shaken by Vite.
- System fonts avoid font-loading delays.
- CSS-only ambient visuals and diagrams.
- Intersection Observer handles reveals and active navigation without scroll polling.

## Deployment

- Vite uses `/maicon-qa-portfolio/` as its asset base for the GitHub Pages project URL.
- `.github/workflows/deploy.yml` builds and deploys `dist/` on pushes to `main` or manual dispatch.
- The official GitHub Pages Actions workflow builds and publishes `dist/` from `main`.

