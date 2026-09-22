# Arunkumar JS Personal Website — PRD

## 1. Product Vision

Build a premium personal portfolio positioning Arunkumar JS as an **Integration Architect, GenAI Developer, and Forward Deployment Engineer**.

The site should feel like a high-end engineering/product portfolio rather than a traditional resume. It must communicate:
- enterprise architecture depth;
- end-to-end production engineering;
- GenAI-native development;
- measurable impact;
- forward-deployment/problem-solving ability;
- real personal products.

**Source of truth:** `Master ATS Resume.md`. Do not invent employers, dates, projects, metrics, technologies, users, clients, or outcomes.

## 2. Reference Design

Reference: https://eric-waller-wbs.webflow.io/

Use its information architecture and visual rhythm as inspiration:
- large hero;
- strong typography;
- concise positioning;
- work/project showcase;
- capabilities;
- achievements;
- CTA;
- footer;
- detailed project/work pages.

Do not copy proprietary assets, text, imagery, or branding.

## 3. Design Concept

Combine the reference's editorial portfolio structure with an original engineering visual language:

> **A living architecture diagram.**

Three.js is a storytelling layer, not decoration. The visual narrative should reinforce:

`Enterprise Integration → Architecture → Cloud/Platform → GenAI → Autonomous Systems → Products`

## 4. Target Audience

1. Hiring managers for Staff/Principal Architect, GenAI Engineer, Forward Deployed Engineer and AI Platform roles.
2. Founders/CTOs at early-stage companies.
3. Technical recruiters.
4. Engineering leaders evaluating architecture and production delivery.

## 5. Primary User Questions

Within 30–60 seconds:
- Who is Arun?
- What does he specialize in?
- What has he built?
- What measurable impact has he delivered?
- What is professional vs personal?
- Can I inspect technical depth?
- How do I contact him?

## 6. Site Map

`/` — Home  
`/work` — Professional work  
`/work/:slug` — Professional case study  
`/projects` — Personal projects  
`/projects/:slug` — Personal project  
`/about` — Career, methodology, certifications, education  
`/blog` — Technical writing (4 articles)  
`/blog/:slug` — Blog article  
`/contact` — Contact/social links

## 7. Homepage

### Hero
- Arunkumar JS
- Integration Architect · GenAI Developer · Forward Deployment Engineer
- location
- concise positioning
- credibility metrics
- CTA
- interactive Three.js architecture network

### Credibility metrics
Only verified resume metrics, such as:
- 10+ years experience
- 66% snap reduction
- 4–10x query latency improvement
- 100+ users
- 99.95% uptime

### Featured professional work
1. SnapLogic Automations Portal
2. FW_Flex Pipeline Redesign
3. PC → CC BigQuery Migration
4. RAG Corpus Optimization
5. Critical Incident Response

### Featured personal work
1. CareerPilot AI
2. Cric-Scorer
3. Pic-Reel / FrameFlow
4. IPL 2026 Prediction Game
5. PlanItX

## 8. Three.js Requirements

### HeroNetwork
Interactive low-poly/network visualization with conceptual nodes:
- Integration
- APIs
- Cloud
- Data
- AI
- Platform

Behavior:
- subtle pointer/parallax response;
- slow ambient movement;
- gentle connection pulses;
- hover highlighting;
- no aggressive camera motion.

Critical text remains HTML outside WebGL.

### CareerEvolution
Career Evolution uses a semantic HTML timeline section with editorial content, not a 3D visualization.

### SkillsConstellation
Visual relationship map for:
- Integration
- Cloud
- Data
- GenAI
- Full Stack
- DevOps

### Case-study visualizations
Focused scenes for specific projects:
- Quote Journey Tracker diagnostic pipeline (DiagnosticPipeline);
- Multi-Agent Pipeline Review orchestration (AgentOrchestration);
- Automations Portal service graph (PortalArchitecture);
- CareerPilot AI workflow (CareerPilotWorkflow);
- Pic-Reel media pipeline (MediaPipeline).

### Performance/fallback
Three.js must:
- lazy-load;
- use lightweight geometry;
- avoid large textures;
- avoid expensive post-processing;
- pause/reduce rendering when offscreen;
- respect `prefers-reduced-motion`;
- provide static fallback;
- degrade gracefully when WebGL is unavailable;
- never block core content.

Targets:
- Lighthouse Performance >= 90;
- LCP < 2.5s;
- CLS < 0.1;
- INP < 200ms.

## 9. Functional Requirements

- responsive;
- accessible navigation;
- keyboard navigation;
- reduced-motion support;
- semantic HTML;
- SEO metadata;
- Open Graph;
- sitemap;
- robots.txt;
- optimized images;
- project filtering;
- GitHub/LinkedIn/live-product links;
- no backend required for MVP;
- typed local content files (TypeScript).

## 10. Accessibility

WCAG 2.2 AA-oriented:
- visible focus;
- sufficient contrast;
- alt text;
- semantic headings;
- canvas is never the sole information source;
- reduced motion;
- usable without WebGL.

## 11. Content Rules

Use exact documented:
- employer names;
- dates;
- project names;
- metrics;
- technologies.

Do not invent:
- clients;
- testimonials;
- revenue;
- open-source contributions;
- confidential information.

Ambiguous content should be marked `VERIFY`.

## 12. Success Criteria

- relevant project reachable within two clicks;
- hiring manager understands positioning, impact, GenAI depth and product-building ability quickly;
- technical visitor can inspect detailed case studies;
- site deploys from GitHub through CI/CD.

## 13. MVP — Implemented

- Home (hero, metrics, featured work, skills, projects, timeline, about, CTA)
- Work index + 7 case study detail pages
- Projects index + 5 project detail pages
- About (career timeline, skills, certifications, education)
- Blog (4 technical articles with rich formatting)
- Contact
- SEO (metadata, OG images, sitemap, robots, structured data)
- responsive design
- accessibility (semantic HTML, keyboard navigation, focus states, ARIA)
- Three.js hero network
- Career Evolution semantic timeline (editorial HTML)
- 7 technical visualizations (PortalArchitecture, DiagnosticPipeline, AgentOrchestration, SkillsConstellation, CareerPilotWorkflow, MediaPipeline, HeroNetwork)
- reduced-motion support throughout
- no backend/database/auth
