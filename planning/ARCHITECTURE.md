# Architecture

## 1. Recommended Architecture

```text
Browser
  |
  v
Next.js App Router
  |
  +-- Server/static HTML
  |    +-- SEO
  |    +-- Content
  |    +-- Case studies
  |
  +-- Client islands
       +-- Framer Motion
       +-- React Three Fiber
       +-- Interactive filters
  |
  v
Vercel
```

No database/backend is required for MVP.

## 2. Repository

```text
waypoint/
├── app/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── work/[slug]/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   └── globals.css
├── components/
│   ├── layout/           Navbar, Footer
│   ├── hero/             HeroSection, CTASection
│   ├── metrics/          MetricsSection
│   ├── work/             WorkSection, CaseStudyPage
│   ├── projects/         ProjectsSection, ProjectVisualization
│   ├── skills/           SkillsSection
│   ├── timeline/         TimelineSection
│   ├── about/            AboutSection
│   ├── three/
│   │   ├── HeroNetwork.tsx
│   │   ├── SkillsConstellation.tsx
│   │   ├── PortalArchitecture.tsx
│   │   ├── DiagnosticPipeline.tsx
│   │   ├── AgentOrchestration.tsx
│   │   ├── CareerPilotWorkflow.tsx
│   │   ├── MediaPipeline.tsx
│   │   ├── WebGLFallback.tsx
│   │   └── primitives/  SceneContainer
│   └── ui/               Container, Section, Button, Card, Badge
├── content/
│   ├── work.ts
│   ├── projects.ts
│   ├── profile.ts
│   ├── blog.ts
│   └── source/           Master ATS Resume
├── lib/
│   ├── content.ts
│   ├── types.ts
│   ├── hooks.ts
│   ├── seo.ts
│   └── utils.ts
├── public/
└── planning/
```

## 3. Content Model

```ts
interface Project {
  slug: string;
  title: string;
  type: "professional" | "personal";
  role: string;
  timeline?: string;
  summary: string;
  technologies: string[];
  impact?: string[];
  featured: boolean;
  category: string[];
  liveUrl?: string;
  githubUrl?: string;
  confidential?: boolean;
}
```

Long-form case studies use TypeScript content files (`content/work.ts`).

## 4. Rendering Strategy

Default:
- static generation;
- server-rendered metadata;
- optimized images;
- minimal client components.

Client components:
- navigation;
- filters;
- motion;
- 3D;
- interactive galleries.

## 5. Three.js Architecture

```text
Page
 |
 +-- Server-rendered content
 |
 +-- Suspense
       |
       +-- Client 3D Scene
              |
              +-- Canvas
              +-- Camera
              +-- Lights
              +-- Lightweight geometry
              +-- Interaction
```

Use dynamic loading for browser-only 3D where appropriate.

Example scene contract:

```ts
interface SceneProps {
  reducedMotion?: boolean;
  mobile?: boolean;
}
```

### Device profiles

Desktop:
- full node count;
- subtle ambient motion;
- pointer interaction.

Mobile:
- fewer nodes;
- reduced motion;
- no expensive effects.

Reduced motion:
- static geometry/minimal transitions;
- no camera movement;
- no animated particles.

## 6. Shared 3D Primitives

Each scene component is self-contained. The shared `SceneContainer` primitive provides:
- lazy rendering via `isInView` guard;
- DPR capping at `[1, 1.5]`;
- `frameloop='demand'` for reduced-motion;
- WebGL fallback;
- consistent Canvas configuration.

Individual scenes (HeroNetwork, PortalArchitecture, DiagnosticPipeline, etc.) build their own geometry, materials, and interactions directly using Three.js/R3F primitives.

## 7. Scene Strategy

### HeroNetwork
Engineering capability network on homepage hero.

### SkillsConstellation
Technology domain relationship map on homepage capabilities section.

### PortalArchitecture
Automations Portal service/integration graph (homepage featured work + case study).

### DiagnosticPipeline
Quote Journey Tracker diagnostic flow (case study).

### AgentOrchestration
Multi-Agent Pipeline Review orchestration flow (case study).

### CareerPilotWorkflow
CareerPilot AI autonomous workflow (project detail).

### MediaPipeline
Pic-Reel / FrameFlow media processing pipeline (project detail).

The Career Evolution section uses semantic HTML with a timeline component rather than a 3D visualization.

## 8. Performance

Use:
- lazy loading;
- low-poly geometry;
- instancing where repeated;
- compressed images;
- minimal shader complexity;
- visibility detection;
- mobile object-count reduction.

Avoid:
- physics engines;
- heavy post-processing;
- volumetric lighting;
- huge 3D models;
- continuous high-frequency animation.

## 9. Deployment

GitHub → Vercel.

Preview deployments for PRs; production from `main`.

## 10. Future

- architecture playground;
- AI portfolio assistant;
- CMS;
- downloadable resume.

Blog, SEO/metadata, accessibility, and reduced-motion support are implemented.
