# Waypoint

Personal portfolio for Arunkumar JS — Integration Architect, GenAI Developer, Forward Deployment Engineer.

## Stack

- Next.js 16.3.5 (App Router, static generation)
- TypeScript (strict)
- Tailwind CSS v4
- Three.js / React Three Fiber / @react-three/drei
- Framer Motion
- Lucide React

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, metrics, featured work, skills, projects, timeline, about, CTA |
| `/about` | Career timeline, skills, certifications, education |
| `/work` | Professional work index (7 projects) |
| `/work/[slug]` | Case study detail with architecture visualizations |
| `/projects` | Personal projects index (5 projects) |
| `/projects/[slug]` | Project detail with architecture visualizations |
| `/blog` | Technical writing index (4 articles) |
| `/blog/[slug]` | Blog article |
| `/contact` | Contact and social links |

## Architecture

- **Content-as-code**: TypeScript content files in `content/` — no CMS or database
- **Three.js storytelling**: 7 interactive visualizations explaining architecture and workflows
- **Server Components**: Homepage and all index/detail pages are server-rendered
- **Client islands**: Navigation, animations (Framer Motion), and Three.js scenes
- **Accessibility**: Semantic HTML, keyboard navigation, `aria-hidden` on decorative 3D, `prefers-reduced-motion` respected
- **SEO**: Programmatic OG images, sitemap, robots.txt, JSON-LD structured data, per-page metadata

## Content Source

`content/source/Master ATS Resume.md` is the factual source of truth. All professional claims must be traceable to this document.

See `planning/` for detailed PRD, architecture, and design system documentation.
