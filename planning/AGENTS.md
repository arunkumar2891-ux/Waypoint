# AGENTS.md — Personal Website Coding Instructions

## Mission

Build Arunkumar JS's personal website as a premium engineering portfolio.

Credibility is critical. Never fabricate professional history, metrics, dates, employers, users, clients or capabilities.

## Source of Truth

Primary:
- `Master ATS Resume.md`

Planning:
- `PRD.md`
- `ARCHITECTURE.md`
- `CONTENT_MODEL.md`
- `DESIGN_SYSTEM.md`
- `ROADMAP.md`
- `IMPLEMENTATION_PLAN.md`

If sources conflict, flag the conflict rather than guessing.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- Three.js
- React Three Fiber
- @react-three/drei
- Lucide React
- Vercel

Optional:
- GSAP only if Framer Motion + IntersectionObserver cannot provide required scroll choreography.

## Engineering Principles

1. Prefer static/server-rendered content.
2. Separate content from presentation.
3. Use strict TypeScript.
4. Minimize client-side JavaScript.
5. Keep components small.
6. Use Three.js only where it improves storytelling.
7. Never make 3D required for comprehension.
8. Do not add dependencies without justification.
9. Optimize accessibility/performance before visual effects.
10. Preserve published URLs.

## Three.js Rules

Use React Three Fiber.

Every scene must:
- be isolated as a component;
- lazy-load where appropriate;
- have a static fallback;
- respect reduced motion;
- reduce/pause rendering when offscreen;
- avoid heavy textures/post-processing;
- have bounded object/geometry counts;
- support a reduced mobile configuration.

Never put critical text inside WebGL.

Recommended:
```text
components/three/
├── HeroNetwork.tsx
├── CareerEvolution.tsx
├── SkillsConstellation.tsx
├── PipelineArchitecture.tsx
├── MigrationFlow.tsx
└── WebGLFallback.tsx
```

Shared primitives:
- Node
- Connection
- Label
- Pulse
- CameraRig
- SceneContainer

## Content Rules

```ts
type ProjectType = "professional" | "personal";
```

Never imply:
- personal ownership of employer code;
- employer endorsement;
- confidential information;
- unapproved customer information.

## UI Rules

- mobile-first;
- editorial;
- strong typography;
- generous whitespace;
- restrained motion;
- no generic AI landing-page aesthetic;
- no excessive neon/cyberpunk styling;
- 3D should feel like technical visualization.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Then test:
- mobile/desktop;
- keyboard navigation;
- reduced motion;
- WebGL fallback;
- Lighthouse;
- external links;
- source-of-truth claims.

## Git

Use:
- `feat:`
- `fix:`
- `content:`
- `design:`
- `3d:`
- `refactor:`
- `docs:`
- `chore:`
