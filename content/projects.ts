import type { PersonalProject } from '@/lib/types'

export const personalProjects: PersonalProject[] = [
  {
    slug: 'careerpilot-ai',
    title: 'CareerPilot AI',
    type: 'personal',
    status: 'active',
    summary:
      'Autonomous AI job search platform with 18-step daily execution flow — from LinkedIn scraping to AI resume customization to automated email delivery.',
    problem:
      'Scattered job-seeking activities during active recruitment periods — no unified workflow for discovery, customization, application, and tracking.',
    solution:
      'End-to-end AI recruitment command center consolidating opportunity discovery, Gemini ATS resume customization, cover letter creation, automated email submissions, interview prep, and AI Copilot across 14 dedicated paths.',
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Zustand',
      'Supabase',
      'Google Gemini 3.6 Flash',
      'Groq',
      'Apify',
      'LaTeX',
      'Render.com',
    ],
    features: [
      '18-step autonomous daily execution flow',
      'LinkedIn web scraping via Apify',
      'Gemini ATS resume customization',
      'Automated email submissions via Gmail API',
      'AI interview preparation',
      'Conversational AI Copilot',
      '28-node stateful graph execution framework',
    ],
    metrics: [
      { label: 'Pipeline Runs', value: '96' },
      { label: 'Jobs Discovered', value: '63' },
      { label: 'Tailored Resumes', value: '44' },
    ],
    links: [
      { label: 'Live App', url: 'https://careerpilot-ai-6i93.onrender.com', type: 'live' },
    ],
    featured: true,
    category: ['Autonomous GenAI', 'Product Engineering'],
    visualizationType: 'workflow',
    order: 1,
  },
  {
    slug: 'cric-scorer',
    title: 'Cric-Scorer',
    type: 'personal',
    status: 'shipped',
    summary:
      'Full-featured cricket tournament management and live ball-by-ball scoring application with complex domain logic engine.',
    problem:
      'No accessible cricket scoring platform for local tournament management with ball-by-ball tracking, career statistics, and MVP calculations.',
    solution:
      'Domain-heavy scoring engine with 3 specialized engines (Scoring, Statistics, MVP), 14-table database schema, and real-time ball-by-ball tracking.',
    technologies: [
      'React 18.3',
      'TypeScript',
      'Vite 5.4',
      'Tailwind CSS 3.4',
      'Lucide React',
      'Supabase',
    ],
    features: [
      'Ball-by-ball scoring with undo/redo',
      '3 domain engines: Scoring, Statistics, MVP',
      '14-table Supabase schema with RLS',
      'Career statistics tracking',
      'Tournament leaderboards',
    ],
    metrics: [
      { label: 'Domain Engines', value: '3' },
      { label: 'Database Tables', value: '14' },
      { label: 'Pre-seeded Players', value: '32' },
    ],
    featured: true,
    category: ['Full-Stack Engineering'],
    order: 2,
  },
  {
    slug: 'pic-reel',
    title: 'Pic-Reel / FrameFlow',
    type: 'personal',
    status: 'shipped',
    summary:
      'Browser-based hyperlapse/timelapse creation tool — 100% client-side video encoding using FFmpeg WebAssembly. Photos never leave the browser.',
    problem:
      'No free browser-based tool exists for photographers to create hyperlapses/timelapses from photo sequences without server uploads.',
    solution:
      'Client-side MP4 encoding via FFmpeg WASM with configurable settings (FPS, resolution, codec, quality), drag-and-drop reordering, and multi-source WASM loading with CDN fallback.',
    technologies: [
      'React 19',
      'TypeScript',
      'TanStack Start',
      'Vite',
      'Tailwind CSS',
      'FFmpeg.wasm',
      'Render.com',
    ],
    features: [
      '100% client-side video encoding (privacy-first)',
      'Configurable FPS, resolution, codec, quality',
      'Drag-and-drop photo reordering',
      'Multi-source WASM loading with CDN fallback',
      'Supports up to 500 images per session',
    ],
    metrics: [
      { label: 'Source Files', value: '68' },
      { label: 'Concept to Production', value: '1 week' },
    ],
    featured: true,
    category: ['Browser Compute', 'Multimedia'],
    order: 3,
  },
  {
    slug: 'ipl-2026-prediction',
    title: 'IPL 2026 Prediction Game',
    type: 'personal',
    status: 'shipped',
    summary:
      'Fully automated prediction platform for 30+ users with pari-mutuel scoring, automated tournament lifecycle, and zero manual admin.',
    problem:
      'Friends group wanted match predictions during IPL season — no simple platform existed for group predictions with automated scoring.',
    solution:
      'Full-stack app with pari-mutuel scoring engine, cron-based match detection via CricAPI, automatic cutoff enforcement, and OTP authentication.',
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Express.js',
      'Node.js',
      'Supabase',
      'CricAPI',
      'Render.com',
    ],
    features: [
      'Pari-mutuel scoring with weighted multipliers',
      'Fully automated tournament lifecycle',
      'Cron-based match detection via CricAPI',
      'OTP authentication with JWT',
      '29 registered players across multiple groups',
    ],
    metrics: [
      { label: 'Registered Players', value: '29' },
      { label: 'Source Files', value: '80+' },
    ],
    featured: true,
    category: ['Full-Stack Automation'],
    order: 4,
  },
  {
    slug: 'planitx',
    title: 'PlanItX',
    type: 'personal',
    status: 'shipped',
    summary:
      'Premium Indian wedding and event planning platform with budget tracking, vendor marketplace, guest management, and cultural customization.',
    problem:
      'Friends needed a comprehensive planning tool for Indian weddings — existing solutions lacked cultural specificity and India-first features.',
    solution:
      'Full-featured SaaS product with budget tracking in Lakhs/INR, vendor marketplace, guest management with cultural specifics, and multi-event support.',
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Zustand',
      'Framer Motion',
      'Zod',
      'Supabase',
    ],
    features: [
      'Budget tracking in Lakhs/INR',
      'Vendor marketplace with booking/payment workflow',
      'Guest management with dress/gift tracking',
      'Multi-event type support (Hindu, Muslim, Sikh, Christian, Baby Shower)',
      '12 custom React hooks',
    ],
    metrics: [
      { label: 'Source Files', value: '56' },
      { label: 'Database Tables', value: '12' },
      { label: 'Custom Hooks', value: '12' },
    ],
    featured: true,
    category: ['SaaS', 'Product Engineering'],
    order: 5,
  },
]
