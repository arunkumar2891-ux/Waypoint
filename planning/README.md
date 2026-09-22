# Arunkumar JS Personal Website

Premium engineering portfolio for Arunkumar JS.

## Positioning

Integration Architect | GenAI Developer | Forward Deployment Engineer

## Design Concept

**A living architecture diagram.**

The site combines an editorial portfolio structure inspired by the Eric Waller Webflow reference with original Three.js visualizations explaining Arun's engineering journey and project architectures.

## Source of Truth

`Master ATS Resume.md`

Professional facts must be derived from that source.

## Reference

https://eric-waller-wbs.webflow.io/

Use the reference for layout/visual inspiration only. Do not copy proprietary assets or text.

## Stack

- Next.js 16.3.5 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js / React Three Fiber / @react-three/drei
- Lucide React
- Vercel

## Quick Start

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Content Workflow

1. Update source-of-truth resume.
2. Update TypeScript content files (`content/work.ts`, `content/projects.ts`, `content/profile.ts`, `content/blog.ts`).
3. Validate claims against source.
4. Test 3D fallback/reduced motion.
5. Run validation (`typecheck`, `lint`, `build`).
6. Preview.
7. Deploy.

## Definition of Done

- responsive;
- accessible;
- SEO-ready;
- fast;
- 3D enhances rather than blocks content;
- professional/personal projects clearly separated;
- no confidential employer information;
- deployable from GitHub.
