# Implementation Roadmap

## Phase 0 — Content & Brand Foundation

- lock source-of-truth resume;
- identify public-safe content;
- select 8–10 featured projects;
- collect screenshots;
- collect public-safe architecture diagrams;
- select portrait;
- finalize accent;
- define domain.

## Phase 1 — Scaffold

- Next.js App Router;
- TypeScript strict;
- Tailwind;
- MDX;
- linting;
- formatting;
- base layout;
- navigation;
- footer.

## Phase 2 — Reference Template Recreation

Implement:
- hero;
- intro;
- work grid;
- skills;
- achievements;
- CTA;
- footer.

## Phase 3 — Three.js Foundation

Install:
- `three`
- `@react-three/fiber`
- `@react-three/drei`

Build shared `SceneContainer` primitive with:
- lazy rendering via `isInView`;
- DPR capping;
- reduced-motion `frameloop='demand'`;
- WebGL fallback.

Implement:
1. HeroNetwork
2. SkillsConstellation
3. PortalArchitecture (first case-study visualization)

Add:
- mobile reduction;
- reduced-motion;
- WebGL fallback;
- visibility pause.

## Phase 4 — Case Studies

Prioritize:
1. Automations Portal
2. FW_Flex
3. PC→CC
4. CareerPilot
5. RAG

## Phase 5 — About

- career timeline;
- certifications;
- education;
- engineering philosophy.

Career Evolution uses semantic HTML timeline (editorial, not a 3D visualization).

## Phase 6 — SEO & Performance

- metadata;
- sitemap;
- robots;
- structured data;
- image optimization;
- Lighthouse;
- accessibility;
- WebGL testing.

## Phase 7 — Deployment

GitHub → Vercel → custom domain.

## Phase 8 — Iteration

Implemented:
- blog (4 technical articles);
- SEO metadata + OG images;
- accessibility audit;
- reduced-motion behavior.

Potential future:
- architecture playground;
- downloadable resume;
- AI portfolio assistant;
- CMS.
