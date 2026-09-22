# Design System

## Concept

Combine the Eric Waller reference's editorial portfolio structure with original engineering visualization.

> **A living architecture diagram.**

The site should feel like an engineering portfolio, not a Three.js showcase.

## Personality

- architectural
- technical
- experimental
- confident
- human
- product-minded

Avoid:
- generic corporate resume;
- generic AI landing page;
- dashboard-heavy UI;
- gaming/cyberpunk aesthetic;
- excessive gradients.

## Typography

Recommended:
- Display: Geist / Inter Tight
- Body: Inter / Geist Sans
- Mono: Geist Mono

## Color

Start restrained:
- warm/off-white background;
- near-black foreground;
- muted gray;
- one brand accent;
- subtle neutral borders.

3D scenes inherit this palette.

## Hero

Desktop:
- large editorial headline;
- role/location;
- metrics;
- 3D architecture network;
- CTA.

Mobile:
- text first;
- compact metrics;
- reduced 3D;
- CTA.

The canvas must never obscure the headline.

## 3D Visual Language

### Geometry
Use:
- spheres/nodes;
- thin lines;
- simple planes;
- simple geometric forms.

Avoid:
- realistic models;
- heavy textures;
- photorealistic assets.

### Motion
Use:
- slow ambient movement;
- pointer parallax;
- connection pulses;
- scroll-linked transitions;
- node highlighting.

Avoid:
- rapid camera movement;
- constant spinning;
- particle storms;
- excessive bloom.

### Semantic nodes

Example:
```text
Integration
    |
 APIs ─── Cloud
    |       |
  Data ─── AI
      \   /
      Platform
```

Nodes must correspond to real capability categories.

## Project Cards

Show:
- project type;
- title;
- problem;
- impact;
- technologies;
- visual;
- case-study CTA.

Professional/personal distinction must be obvious.

## Case Study Visuals

Three.js only where architecture/workflow is genuinely being explained.

Examples:
- FW_Flex: common pipeline → workers;
- PC→CC: Datadog → dual write → BigQuery;
- Automations Portal: user → frontend → APIs → services;
- CareerPilot: discovery → qualification → AI → documents → delivery.

## Accessibility

Respect `prefers-reduced-motion`.

Disable/reduce:
- camera movement;
- auto-rotation;
- particles;
- scroll-driven 3D transitions.

Provide static fallbacks.

## Navigation

Desktop:
- Home
- Work
- Projects
- About
- Contact

Mobile:
- compact menu;
- optional sticky CTA.

## Responsive

Use Tailwind breakpoints, but configure 3D scenes separately for mobile.

## Loading UX

Show useful HTML content immediately and use a static placeholder while WebGL initializes.
