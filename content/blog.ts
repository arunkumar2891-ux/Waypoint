import type { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-ai-agents-for-production-diagnostics',
    title: 'Designing AI Agents for Production Diagnostics',
    description:
      'How I built a RAG-powered diagnostic agent on GCP Agent Studio that reduced quote debugging from minutes to seconds — and what the architecture taught me about narrowing AI scope.',
    date: '2026-09-20',
    tags: ['AI Agents', 'GCP Agent Studio', 'Vertex AI RAG', 'Production Engineering'],
    readingTime: '5 min',
    relatedWork: ['quote-journey-tracker-agent'],
    sections: [
      {
        heading: 'The Debugging Tax',
        body: [
          'Every integration team has its version of the same problem: a transaction fails, and someone has to retrace its path across three or four systems before they can say what went wrong. At Palo Alto Networks, that path for quote transactions ran through SnapLogic, GCP Pub/Sub, and Chronosphere. Each investigation meant opening multiple tools, correlating a Key_Tracking_ID across event logs, and mentally stitching together a timeline. It took 3–4 minutes per case.',
          'Three minutes sounds trivial until you multiply it by the volume of quote-related inquiries the team handled daily. The time wasn\'t spent thinking — it was spent navigating.',
          { type: 'pullquote' as const, text: 'The core challenge was not the individual systems but the traversal between them. Each tool had the data; no single tool had the full picture.' },
        ],
      },
      {
        heading: 'Architecture: Narrow Scope, Clear Pipeline',
        body: [
          'I designed the agent as a linear pipeline with a specific job: accept a tracking ID, gather the relevant logs, match against known patterns, and return a structured diagnosis. No open-ended reasoning, no creative interpretation — just pattern recognition against a curated knowledge base.',
          'The pipeline runs through GCP Agent Studio with the Vertex AI RAG Engine providing the knowledge layer. I built the RAG corpus from 23 documented quote debugging scenarios — real issues the team had already resolved. Gemini 3.5 Flash handles the foundation model work, and Gemini 2.5 Flash runs reranking.',
          'The retrieval strategy uses a narrow-then-wide approach: the agent first searches by the specific Key_Tracking_ID against the scenario corpus. If that doesn\'t yield a confident match, it falls back to full-text search across the broader knowledge base. This two-stage approach keeps latency low for common cases while preserving coverage for edge cases.',
          'When the agent can\'t resolve an issue, it doesn\'t guess. It routes to JIRA for human follow-up. This failure branch was a deliberate design decision — I wanted the agent to know its own limits.',
        ],
      },
      {
        heading: 'Structured Output Over Free Text',
        body: [
          'The agent produces structured JSON rather than a natural language narrative. This was important for two reasons: engineers scanning a Slack DM need actionable information fast, and structured output enables consistent audit logging.',
          'The response includes flow classification, a processing summary, root cause analysis with a confidence signal (Success, Failed, or Inconclusive), and prescriptive next steps. It arrives as a Slack DM within 30–40 seconds of the original request.',
        ],
      },
      {
        heading: 'What I Learned',
        body: [
          'The biggest lesson was about scope. Early iterations tried to be too general — diagnosing any pipeline issue, not just quote journeys. Narrowing the domain to 23 known scenarios made the RAG retrieval reliable and the output trustworthy. When engineers trust the agent\'s answers, they actually use it.',
          { type: 'callout' as const, items: [
            { value: '85–90%', label: 'Faster diagnostics' },
            { value: '540+', label: 'Hours saved / year' },
            { value: '~$40K', label: 'Annual value' },
            { value: '23', label: 'RAG scenarios' },
          ]},
          'The anti-hallucination constraints I built in — rule scoping, ground-truth field validation, unknown sub-step handling — proved essential. An agent that occasionally invents a root cause is worse than no agent at all.',
        ],
      },
    ],
  },
  {
    slug: 'from-sequential-to-parallel-multi-agent-reviews',
    title: 'From Sequential to Parallel: Building Multi-Agent Pipeline Reviews',
    description:
      'How I redesigned a single-agent pipeline review system into a 6-agent parallel architecture using Google ADK — and why the performance gain was less interesting than the architectural insight.',
    date: '2026-09-18',
    tags: ['Google ADK', 'Multi-Agent', 'ParallelAgent', 'Code Review', 'AI Architecture'],
    readingTime: '6 min',
    relatedWork: ['multi-agent-pipeline-review', 'rag-corpus-optimization'],
    sections: [
      {
        heading: 'The Sequential Bottleneck',
        body: [
          'The first version of the SnapLogic pipeline review system was a single agent that processed all review categories in sequence: naming conventions, best practices, error handling, performance, review conditions, and security. It worked, but it was slow. With 47+ rules spread across 6 categories, each review waited for all categories to finish in order — even though no category depended on another.',
          { type: 'pullquote' as const, text: 'The categories had no dependencies between them — making them natural candidates for parallel execution. The bottleneck was architectural, not computational.' },
          'This is a pattern I\'ve seen in integration work generally: systems that process independent tasks serially because that\'s how they were first built, not because the work requires it.',
        ],
      },
      {
        heading: 'The ParallelAgent Redesign',
        body: [
          'I restructured the system using Google ADK\'s agent primitives: a Root LlmAgent that receives the pipeline, a SequentialAgent wrapper, a ParallelAgent that fans out to 6 concurrent sub-agents, and a Consolidator LlmAgent that merges the results.',
          'Each sub-agent owns a specific review domain with documented rule counts — Naming (9 rules), Best Practices (6), Error Handling (5), Performance (8), Review Conditions (26 across critical and warning tiers), and Security (1). They run simultaneously and write results to dedicated state keys.',
          'The Consolidator reads all six results and produces a unified JSON report: overall status, critical violations, warnings, a per-category breakdown, and a prioritized action plan. The structured output ensures every review follows the same format regardless of which rules fired.',
        ],
      },
      {
        heading: 'Practical Challenges',
        body: [
          'The interesting problems were practical, not theoretical. Gemini 3.5 Flash wasn\'t available in the us-west1 region where the agent was deployed. I solved this with a custom class that routes model calls to Google\'s global endpoint — a small wrapper, but it unblocked the entire deployment.',
          'The system also required 4 production tuning cycles after initial deployment. Real pipeline reviews surfaced edge cases the rule set didn\'t cover: retry rules that should only apply to connector snaps, snap labels that needed to be reported instead of snap names, error routing patterns the agent didn\'t recognize, and naming prefixes specific to our organization.',
          'Each cycle refined the agent instructions based on real feedback. This iterative refinement — shipping, observing, adjusting — proved more valuable than trying to anticipate every case upfront.',
        ],
      },
      {
        heading: 'Results and Reflection',
        body: [
          { type: 'callout' as const, items: [
            { value: '~90%', label: 'Performance gain' },
            { value: '6', label: 'Parallel sub-agents' },
            { value: '47+', label: 'Review rules' },
            { value: '4', label: 'Tuning cycles' },
          ]},
          'The ~90% performance improvement was the headline metric, but the architectural insight was more lasting: when you decompose a monolithic agent into specialized sub-agents with clear boundaries, you gain more than speed. Each sub-agent becomes independently testable, its rules independently refinable. A change to error handling rules doesn\'t risk breaking naming convention checks.',
          'I built the entire system using Cursor AI + Claude — from architecture design through deployment debugging. The AI-assisted workflow was most effective during the iterative refinement phase, where rapid changes across agent instructions, state management, and deployment configuration were the norm.',
        ],
      },
    ],
  },
  {
    slug: 'engineering-reusable-enterprise-integration-pipelines',
    title: 'Engineering Reusable Enterprise Integration Pipelines',
    description:
      'How I reduced 278 snaps to 94 across 9 SnapLogic pipelines by extracting shared patterns into reusable workers — and what pipeline architecture has in common with software design.',
    date: '2026-09-15',
    tags: ['SnapLogic', 'Enterprise Integration', 'Pipeline Architecture', 'iPaaS'],
    readingTime: '5 min',
    relatedWork: ['fw-flex-pipeline-redesign'],
    sections: [
      {
        heading: 'Accumulated Complexity',
        body: [
          'The Firewall Flex integration pipelines at Palo Alto Networks had grown organically over time. 9 pipelines, 278 total snaps, each built to handle its specific use case. The problem wasn\'t that any individual pipeline was poorly designed — it was that shared logic had been copied rather than extracted. Each pipeline had its own version of the same TMS lookup, the same CSP API call, the same Hub API error handler.',
          'Modifying one pattern meant modifying it in nine places. Onboarding a new team member meant learning nine slightly different implementations of the same thing.',
          { type: 'pullquote' as const, text: 'The maintenance burden wasn\'t from complexity — it was from duplication. The same logic existed nine times, each copy diverging slightly from the others.' },
        ],
      },
      {
        heading: 'The Reusable Worker Pattern',
        body: [
          'I designed 3 reusable common worker pipelines that encapsulated the operations shared across all 9 pipelines. Instead of each pipeline maintaining its own version of a TMS lookup or error handler, they call into the common workers.',
          'The redesign also established a naming convention (INTnnnn/COMnnnn prefixes), unified 4 different logging patterns into a single centralized framework, and standardized error handling into a 3-tier approach: immediate acknowledgment, retry with backoff, and dead-letter queue routing.',
          'The numbers were clear: 278 snaps down to 94 across all 9 pipelines — a 66% reduction. Individual pipelines saw reductions ranging from 44% (Renewals, Panorama_Delete) to 80% (FW_StatusUpdate).',
        ],
      },
      {
        heading: 'Rollout Strategy',
        body: [
          'I coordinated a phased rollout: common pipelines deployed first, validated in isolation, then worker pipelines refactored one at a time with validation at each stage. This meant the team was never more than one pipeline away from a known-good state.',
          'I also created a technical specification with snap-level implementation details, configuration matrices, and validation checklists. This document enabled parallel implementation — multiple team members could work on different pipelines simultaneously without coordination overhead.',
        ],
      },
      {
        heading: 'Why This Matters',
        body: [
          { type: 'callout' as const, items: [
            { value: '66%', label: 'Snap reduction' },
            { value: '278 → 94', label: 'Total snaps' },
            { value: '9', label: 'Pipelines standardized' },
            { value: '3', label: 'Common workers' },
          ]},
          'Pipeline architecture has the same fundamental tensions as software design: duplication versus abstraction, speed of initial delivery versus long-term maintenance, local optimization versus system-wide consistency.',
          'The reusable worker pattern is essentially the same principle as extracting a shared library in application code. The 66% reduction wasn\'t just fewer snaps — it was fewer places for bugs to hide, fewer patterns for new engineers to learn, and a template that subsequent integration work could follow.',
        ],
      },
    ],
  },
  {
    slug: 'building-ai-augmented-engineering-workflows',
    title: 'Building an AI-Augmented Engineering Workflow',
    description:
      'Practical patterns I\'ve developed for working with AI across multiple production projects — structured context, iterative prompting, and systematic debugging.',
    date: '2026-09-12',
    tags: ['Cursor AI', 'Claude', 'AI-Assisted Development', 'Developer Workflow'],
    readingTime: '5 min',
    relatedWork: ['multi-agent-pipeline-review', 'snaplogic-automations-portal'],
    relatedProjects: ['careerpilot-ai', 'pic-reel'],
    sections: [
      {
        heading: 'Context Is the Bottleneck',
        body: [
          'Across every project I\'ve built with AI assistance — the SnapLogic Automations Portal, the Multi-Agent Pipeline Review System, CareerPilot AI, Pic-Reel — one pattern consistently determined the quality of AI output: how much structured context the AI had access to.',
          'I maintain dedicated context files for each project. AGENTS.md captures architectural constraints, coding conventions, and project structure. Context.md tracks current state — what\'s been built, what\'s in progress, what decisions have been made. These files aren\'t documentation for humans; they\'re context for the AI.',
          { type: 'pullquote' as const, text: 'The AI doesn\'t need better prompts. It needs better context. Every project where I invested in structured context files produced more accurate, more consistent output.' },
        ],
      },
      {
        heading: 'Systematic Debugging with AI',
        body: [
          'Bug_Log.md maintains a structured record of encountered issues, their root causes, and resolutions. It serves a dual purpose: preventing the AI from re-introducing previously fixed bugs, and building a project-specific knowledge base that accumulates over time.',
          'Restore_Points.md tracks known-good states. When an AI-assisted change introduces a regression — which happens — having documented restore points enables rapid rollback rather than panicked debugging.',
          'The debugging workflow itself is structured: provide the exact error, the relevant system state, and the context of what was being changed. Let the AI correlate symptoms across the distributed system. This approach resolved issues ranging from missing Kubernetes Ingress templates to Harness CI trigger filter exclusions.',
        ],
      },
      {
        heading: 'Iterative Over One-Shot',
        body: [
          'Rather than asking the AI to implement a complete feature in one prompt, I break work into discovery, design, and implementation phases. The AI first explores the existing codebase, then proposes an approach, then implements incrementally.',
          'This chain-of-exploration pattern was instrumental in the Multi-Agent Pipeline Review System. Key architectural decisions — the state management pattern, the global endpoint routing — emerged through iterative exploration rather than being specified upfront.',
          'The SnapLogic Automations Portal evolved through 6 major versions, each driven by this iterative approach: from a simple form proxy to a full-stack platform with AI agents, Kubernetes deployment, and 35+ API endpoints.',
        ],
      },
      {
        heading: 'Where I\'ve Applied This',
        body: [
          { type: 'callout' as const, items: [
            { value: '100+', label: 'Portal users' },
            { value: '99.95%', label: 'Uptime achieved' },
            { value: '6', label: 'Major iterations' },
            { value: '3 weeks', label: 'Concept to prod' },
          ]},
          'The SnapLogic Automations Portal reached 100+ users with 99.95% uptime — built from concept to production in 3 weeks using AI-augmented workflows. CareerPilot AI and Pic-Reel were both developed with the same patterns. The Multi-Agent Pipeline Review System was built entirely with Cursor AI + Claude.',
          'The consistent lesson across all of these projects is that AI-assisted development isn\'t about the AI writing code for you. It\'s about maintaining a feedback loop where structured context produces focused output, real-world testing reveals gaps, and iterative refinement closes them.',
        ],
      },
    ],
  },
]
