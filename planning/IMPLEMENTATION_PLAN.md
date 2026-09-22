# Implementation Plan

## Step 1 — Bootstrap

Create:
- Next.js App Router
- TypeScript strict
- Tailwind
- ESLint
- formatting

## Step 2 — Content

Create:
- `content/profile.ts`
- `content/work.ts`
- `content/projects.ts`
- `content/blog.ts`
- typed content models in `lib/types.ts`.

## Step 3 — Global Shell

Build:
- Navbar
- Footer
- Container
- Typography
- Buttons
- Labels
- Section headers

## Step 4 — Hero

Build:
- identity;
- role;
- location;
- positioning;
- metrics;
- CTA;
- portrait/visual;
- HeroNetwork.

Text must render independently from WebGL.

## Step 5 — Three.js Core

```bash
npm install three @react-three/fiber @react-three/drei
```

Create:
```text
components/three/
├── HeroNetwork.tsx
├── SkillsConstellation.tsx
├── PortalArchitecture.tsx
├── DiagnosticPipeline.tsx
├── AgentOrchestration.tsx
├── CareerPilotWorkflow.tsx
├── MediaPipeline.tsx
├── WebGLFallback.tsx
└── primitives/
    └── SceneContainer.tsx
```

SceneContainer provides shared Canvas configuration, lazy rendering, and reduced-motion support. Each scene is self-contained.

## Step 6 — Work Section

Reference-inspired cards:
- project type;
- title;
- impact;
- technologies;
- visual;
- case-study link.

## Step 7 — Architecture Visualizations

First:
- FW_Flex
- CareerPilot

Then:
- PC→CC
- Automations Portal
- RAG

## Step 8 — Skills

Use semantic HTML skill groups plus optional SkillsConstellation.

## Step 9 — Career Timeline

Use semantic HTML timeline. Career Evolution is an editorial/semantic section, not a 3D visualization.

## Step 10 — Case Studies

Template:
```text
Hero
Context
Challenge
Role
Architecture
Implementation
Impact
Technical Highlights
Lessons
Links
Next Project
```

## Step 11 — Personal Projects

Emphasize:
- problem;
- product;
- AI-assisted methodology;
- technical complexity;
- value;
- live demo/GitHub.

## Step 12 — Performance Hardening

Test:
- WebGL unavailable;
- low-end mobile;
- slow network;
- reduced motion;
- Safari;
- Chrome.

Measure:
- Lighthouse;
- bundle size;
- LCP;
- INP;
- CLS;
- memory;
- frame rate.

Target 60fps on modern desktop for interactive scenes, with deliberately reduced mobile configuration.

## Step 13 — SEO / Accessibility

Implement:
- metadata;
- structured data;
- sitemap;
- robots;
- semantic headings;
- keyboard controls;
- focus states;
- alt text;
- reduced-motion.

## Step 14 — Deployment

GitHub → Vercel.

Verify:
- all routes;
- external links;
- OG previews;
- sitemap;
- robots;
- WebGL fallback;
- mobile.

## Priority

### P0 — Implemented
- Home
- Work
- Projects
- Case studies
- About
- Blog (4 articles)
- Contact
- responsive
- SEO (metadata, OG images, sitemap, structured data)
- accessibility (semantic HTML, keyboard nav, ARIA, focus states)
- 3D hero
- career evolution (semantic HTML timeline)
- 7 technical visualizations
- reduced-motion support

### P1
- downloadable resume
- richer galleries

### P2
- AI portfolio assistant
- architecture playground
- CMS
