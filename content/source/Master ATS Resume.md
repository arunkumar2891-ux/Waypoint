ARUNKUMAR JS 

Integration Architect | GenAI Developer | Forward Deployment Engineer

Location: Chennai, Tamil Nadu

Phone: \+91-9677669918

Email: arunkumarjs@outlook.com

LinkedIn: https://www.linkedin.com/in/arunkumar-j-s-05164393/

GitHub: https://github.com/arunkumar2891-ux

# **PROFESSIONAL SUMMARY**

Results-driven Integration Architect and GenAI-native developer with 10+ years of experience in enterprise software engineering and 9+ years specializing in integration platform architecture, cloud solutions, and 1+ year in AI-augmented full-stack application development. Proven track record of leading large-scale initiatives at Palo Alto Networks, delivering measurable business impact including 66% infrastructure reduction, 4-10x performance improvements, and internal platforms serving 20+ users. Expert in SnapLogic iPaaS, Google Cloud Platform (GCP), and Generative AI (Gemini, Cursor AI, ChatGPT). Built and deployed production AI agents including a RAG-powered diagnostic agent on GCP Agent Studio (85-90% faster investigations) and a multi-agent pipeline review system using Google ADK with ParallelAgent orchestration (6 concurrent sub-agents, ~90% performance improvement). Pioneered AI-augmented development workflows, shipping production-grade applications from concept to deployment in days instead of months. Strong forward deployment engineer with ability to translate real-world problems into working software, debug complex distributed systems, and bridge the gap between technical solutions and end-user needs. Demonstrated ability in architectural design, cross-functional collaboration, crisis management, mentoring, and driving operational excellence in fast-paced enterprise environments.

# **CORE COMPETENCIES**

**Integration & Architecture:**

* Enterprise Integration Architecture | iPaaS (SnapLogic) | API Design & Development  
* Event-Driven Architecture | Pub/Sub Messaging | Listener/Worker Patterns  
* Microservices | RESTful APIs | Middleware Design | ETL/ELT Pipelines  
* System Design | High Availability | Scalability | Fault Tolerance  
* Solution Architecture | Technical Specifications | Architecture Governance

**Cloud & Infrastructure:**

* Google Cloud Platform (GCP): Pub/Sub, BigQuery, Vertex AI, GKE, Cloud Functions  
* Kubernetes (GKE): Deployments  
* Secrets Management: Vault (HashiCorp)   
* Monitoring & Observability: Datadog, Chronosphere, Google Cloud Observability, Custom Dashboards

**GenAI-Augmented Development:**

* AI-Powered Development: Cursor AI (Claude), ChatGPT  
* Prompt Engineering: Requirements decomposition, iterative refinement, constraint specification  
* AI Pair Programming: Architecture generation, code scaffolding, debugging assistance, RAG optimization  
* Rapid Prototyping: Concept-to-production in days using AI-augmented workflows  
* Full-Stack via AI: React 18, TypeScript, Node.js, Express.js, Vite, Tailwind CSS, shadcn/ui  
* AI-Driven Debugging: Log analysis, error pattern recognition, root cause identification via LLMs

**Forward Deployment Engineering:**

* Problem Identification: Translating real-world user pain points into technical requirements  
* Rapid Solution Delivery: End-to-end application development from ideation to deployment  
* Customer-Facing Technical Work: Bridging business needs and engineering solutions  
* Production Debugging: Distributed systems troubleshooting, Kubernetes/Helm/Ingress diagnosis  
* Deployment Pipelines: Automated Snaplogic Deployments   
* Stakeholder Engagement: Requirements gathering, iterative feedback, user adoption

**AI/ML & Generative AI:**

* Large Language Models (LLM): Google Gemini 2.5 Flash, Gemini 2.5 Pro, Gemini 3.5 Flash, Gemini 3.6 Flash, Claude Opus 4.6, Claude Opus 4.8  
* Retrieval-Augmented Generation (RAG): Corpus Design, Retrieval Optimization, Reranking (Gemini 2.5 Flash)  
* Prompt Engineering: Few-Shot Learning, Chain-of-Thought, Context Optimization, Anti-Hallucination Constraints  
* AI Agent Development: Multi-Turn Conversations, Error Analysis, Performance Analysis, GCP Agent Studio, Google ADK (ParallelAgent, SequentialAgent, LlmAgent)  
* Multi-Agent Orchestration: Google ADK (Python), ParallelAgent concurrent execution, output_key state management, sequential consolidation  
* Cloud Agent Deployment: Google Cloud Agent Engine (Vertex AI Reasoning Engine), `adk deploy`, streamQuery API, session management  
* Vertex AI: API Integration, Token Optimization, RAG Engine, Agent Studio  
* Observability: OpenTelemetry (OTEL), Cloud Trace, `--otel_to_cloud` tracing

**DevOps & CI/CD:**

* CI/CD Pipelines: Harness, GitHub Actions  
* Security Scanning: Blackduck (SCA), Checkmarx (SAST), Mythos  
* Version Control: Git, GitHub, Branching Strategies  
* Deployment: Blue-Green, Canary, Rolling Updates, Zero-Downtime

**Security & Compliance:**

* Authentication: OAuth 2.0, JWT, Session-Based, OTP, Self-Service Registration  
* Authorization: RBAC, Resource-Level Permissions, Audit Logging  
* Secrets Management: HashiCorp Vault, Automated Password and Certificate Rotation  
* Input Validation: Injection Prevention, Sanitization, Whitespace Trimming

**Leadership & Soft Skills:**

* Technical Leadership | Team Mentoring | Knowledge Sharing  
* Cross-Functional Collaboration | Stakeholder Management  
* Crisis Management | Incident Response | Root Cause Analysis  
* Technical Documentation | Architecture Reviews | Presentations

# **PROFESSIONAL EXPERIENCE**

PALO ALTO NETWORKS Staff IT Systems Engineer \- SnapLogic Center of Excellence (CoE) Jul 2024 \- Present | Bengaluru

Lead architect responsible for designing, developing, and maintaining enterprise integration solutions using the SnapLogic iPaaS platform. Oversee integration architecture standards, build internal developer tools, and drive operational excellence across the Integration CoE.

**KEY ACHIEVEMENTS & RESPONSIBILITIES:**

**Project: FW\_Flex Integration Pipeline Redesign & Standardization**

**Role:** Lead Architect & Designer 

**Technologies:** SnapLogic, Pub/Sub, Datadog, Chronosphere

* Redesigned Firewall Flex integration architecture from 20 fragmented, independently maintained pipelines into a standardized, scalable architecture with 3 reusable common pipelines and 9 simplified worker pipelines  
* Achieved 66% snap reduction across all worker pipelines (278 to 94 snaps), eliminating 164 redundant components and reducing ongoing maintenance burden by two-thirds.  
* Designed and implemented Common Pipeline Framework (COM0001-COM0003) consolidating 5 duplicate TMS lookups, 3 duplicate CSP API calls, and 9 duplicate Hub API error handlers into shared, reusable components  
* Established enterprise-wide standardized naming convention (INTnnnn/COMnnnn) and unified 4 disparate logging patterns into 1 centralized logging framework (COM0005) routed to Chronosphere  
* Created comprehensive technical specification document with snap-level implementation details, configuration matrices, and validation checklists enabling parallel team implementation  
* Designed 3-tier acknowledgment error handling logic (Immediate Ack, Retry with Backoff, Dead-Letter Queue), standardizing fault tolerance across all integration pipelines  
* Implemented centralized error routing pattern ("Route to Error Pipeline") providing consistent observability and alerting across all integration flows  
* Designed multi-environment configuration strategy supporting Development, Staging, and Production deployments with environment-specific endpoint management  
* Reduced new integration onboarding time by establishing reusable patterns and comprehensive documentation for team members  
* Coordinated a phased rollout strategy, deploying common pipelines first, followed by worker pipeline refactoring one pipeline at a time with validation at each stage

**Pipeline-Specific Snap Reductions:**

* FW\_Register: 35 to 12 snaps (66% reduction)  
* FW\_StatusUpdate: 40 to 8 snaps (80% reduction)  
* Panorama\_Provision: 30 to 8 snaps (73% reduction)  
* Renewals: 25 to 14 snaps (44% reduction)  
* Panorama\_Delete: 18 to 10 snaps (44% reduction)  
* DP\_Edit: 40 to 12 snaps (70% reduction)  
* DP\_Delete: 20 to 10 snaps (50% reduction)  
* Panorama\_Migrate: 35 to 8 snaps (77% reduction)  
* FW\_Remove: 35 to 12 snaps (66% reduction)

**Project: PC to CC Migration \- Datadog to BigQuery State Management** 

**Role:** Solution Architect

**Technologies:** SnapLogic, Google BigQuery, Datadog, Pub/Sub, SQL

·     Architected and specified phased migration from Datadog state-store lookups to Google BigQuery for the Cortex-to-Cloud (PC to CC) migration pipeline, eliminating critical 15-day data retention risk

·     Achieved 4-10x query latency improvement (from 2-5 seconds to under 500ms) by designing optimized BigQuery schema with DATE partitioning and field clustering

·     Delivered 10-80x cost reduction per query through migration from expensive Datadog API lookups to cost-efficient BigQuery DML operations

·     Designed BigQuery schema using MERGE statements ensuring idempotent operations, preventing duplicate records, and enabling replay-safe processing for critical business data

·     Implemented zero-data-loss migration strategy using dual-write mechanism: simultaneous writes to both Datadog and BigQuery with consistency validation before cutover

·     Specified changes across 5 affected pipelines: 7 snaps removed, 13 snaps added, 8 snaps modified, with detailed SQL queries and validation scripts for each change

·     Designed 4-phase rollout strategy: (1) Preparation and schema creation, (2) Dual-write with consistency monitoring, (3) Read migration with Datadog fallback, (4) Decommission legacy queries

·     Identified and designed 13 additional improvements: 3 critical P0 (dead-letter table, event sourcing, automated reconciliation), plus P1-P3 enhancements for future implementation

·     Enabled BigQuery ML and Looker Studio dashboard capabilities for advanced analytics, predictive modeling, and executive reporting

·     Eliminated data retention risk (30-day Datadog limit to unlimited BigQuery storage) for critical business transaction data

**Project: SnapLogic Automations Portal \- Full-Stack Developer Platform** 

**Role:** Full-Stack Developer, Solution Architect 

**Technologies:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Express.js, Node.js, BigQuery, Pub/Sub, Vertex AI (Gemini 2.5), Kubernetes, Helm, Vault, Datadog APM, JIRA API, Slack API

·     Designed, developed, and deployed a comprehensive internal developer portal serving 20+ team members with self-service SnapLogic pipeline operations, reducing manual ticket creation and support burden

·     Built responsive React 18 frontend with TypeScript, 48 shadcn/ui components, dynamic form system, and real-time status tracking, achieving sub-1.5 second page load times

·     Implemented an Express.js backend with 35+ REST API endpoints organized across 5 domains: Form Submissions (8 categories), Utilities, AI/ML, Analytics, and Administration

·     Integrated Google Vertex AI (Gemini 2.5 Flash) for AI-powered story creation with a 3x retry mechanism and exponential backoff, achieving under 10-second generation latency

·     Built 2 conversational AI agents powered by Gemini 2.5 Pro: Error Analysis Agent and Pipeline Performance Agent with multi-turn conversation support with 50+ pipeline metrics

·     Designed and implemented a Pipeline Performance Analysis engine with a 2-step async workflow: pipeline export parsing followed by multi-dimensional metric computation

·     Integrated 5 external services: JIRA (automated ticket creation), BigQuery (data persistence across 5 tables), Pub/Sub (async processing), Slack (real-time notifications), and Vertex AI (LLM inference)

·     Achieved 99.95% uptime (exceeding 99.9% target) with sub-300ms API response times (target: 500ms) supporting 20+ concurrent users (target: 10+)

·     Deployed to Google Kubernetes Engine (GKE) with Helm charts, HPA auto-scaling (3-10 pods based on CPU/memory), Vault secret injection, and OTel observability emission.

·     Implemented comprehensive CI/CD pipeline using Harness with Blackduck SCA, Checkmarx SAST scanning, Docker multi-stage builds, and multi-registry deployment

·     Built self-service user registration system with OTP-based authentication, session management, and role-based access control (RBAC)

·     Delivered 8 request categories for Snaplogic Pipelines: Migration, Comparison, Review, Confluence Documentation, Naming Convention, Unit Testing, New Logging, and AI Story Creator

Portal Technical Specifications:

·     Frontend: 48 components, React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui

·     Backend: 35+ endpoints, Express.js, Node.js, TypeScript

·     Database: 5 BigQuery tables (requests, ai\_interactions, pipeline\_metrics, users, audit\_log)

·     AI: 2 agents (Gemini 2.5 Flash for stories, Gemini 2.5 Pro for analysis)

·     Infrastructure: Kubernetes (3-10 pods), Helm, Vault, Datadog APM

·     Performance: \<300ms API, \<1.5s page load, 99.95% uptime

**Critical Incident Response: Licensing Pipeline Logging Loss** (Quarter-End/Year-End Critical Period) Role: Incident Responder, Solution Architect Technologies: SnapLogic, Pub/Sub, Chronosphere, Datadog

·     Responded to P1 critical incident during quarter-end/year-end processing where all Licensing SnapLogic pipelines lost observability due to legacy Datadog API decommissioning

·     Identified root cause within 20 minutes: legacy custom logging implementation using direct REST POST calls to decommissioned Datadog API endpoint returning 404/401 errors

·     Designed and implemented architectural fix within 30 minutes: migrated logging from deprecated direct API calls to enterprise Pub/Sub pattern with Chronosphere ingestion

·     Restored full team observability within 60 minutes, achieving zero business impact and preventing potential revenue loss from unmonitored transactions during critical period

·     Documented executive-level Root Cause Analysis (RCA) covering timeline, root cause, contributing factors, resolution steps, corrective actions, and preventive recommendations

·     Initiated audit of all other pipelines for similar legacy logging patterns, identifying and remediating additional instances proactively

	**Project: Quote Journey Tracker Agent — AI-Powered Diagnostic Platform**

	**Role:** AI Agent Architect & Developer

	**Technologies:** GCP Agent Studio, Gemini 3.5 Flash, Vertex AI RAG Engine, Gemini 2.5 Flash (Reranker), SnapLogic, GCP Pub/Sub, Chronosphere, Slack API, JIRA API

	·     Designed and deployed an AI-powered diagnostic agent on GCP Agent Studio that analyzes transactional logs from Chronosphere, matches against 23 documented quote debugging scenarios via RAG, and delivers structured root cause analysis via Slack DM

	·     Achieved 85-90% response time improvement (3-4 minutes down to 30-40 seconds per investigation), saving 540+ hours/year (~$40,000+ annual productivity value) with 2,000-3,000% ROI

	·     Built Vertex AI RAG Engine with custom LLM parsing prompts (Gemini 2.5 Flash), semantic chunking (size 500, overlap 100), and built-in reranking (topK=20) for precision retrieval

	·     Engineered 5 strict anti-hallucination constraints: rule scoping, unknown sub-step handling, error suffix classification, ground-truth error field validation, and sub-step name isolation

	·     Implemented narrow-then-wide search fallback strategy: primary query by Key_Tracking_ID, fallback to full-text search across all logs when narrow search returns no results

	·     Integrated end-to-end pipeline: SnapLogic Automations Portal → GCP Pub/Sub (filtered subscription) → Chronosphere API → Agent Studio → structured JSON → Slack DM to requestor

	·     Designed structured JSON output schema with flow classification, processing summary, root cause analysis (Success/Failed/Inconclusive), and prescriptive next steps for consistent downstream processing

	·     Applied 5 formal AI evaluation frameworks (RECIPE: 4.0/5, CASE: 3.9/5, COSTS: 4.5/5, PATH: 3.9/5, AI-First: 3.9/5) validating technical fit, economics, and operational maturity

	·     Designed 5-phase evolution roadmap from reactive diagnostics to autonomous agent operations (6 epics, 22+ user stories)

	Agent Technical Specifications:

	·     Platform: GCP Agent Studio with Vertex AI RAG Engine

	·     Foundation Model: Gemini 3.5 Flash | Reranker: Gemini 2.5 Flash | Top-K: 20

	·     Knowledge Base: 23 documented issue patterns (RAG Quote Debugging v2.9.md)

	·     Integration: SnapLogic → Pub/Sub → Chronosphere → Agent Studio → Slack DM

	·     Authentication: GCP Service Account (Agent Platform User role)

	·     Error Handling: JIRA ticket updates on failure, automatic status transitions (ai-audit-done/ai-audit-failed)

	**Project: Multi-Agent Pipeline Review System (Google ADK — ParallelAgent Architecture)**

	**Role:** AI Agent Architect & Developer | Built entirely using AI-assisted development (Cursor AI + Claude)

	**Technologies:** Google ADK (Python), Gemini 3.5 Flash, Google Cloud Agent Engine (Vertex AI Reasoning Engine), SnapLogic, OpenTelemetry, Cloud Trace

	·     Designed, built, and deployed a production multi-agent system using Google ADK with a ParallelAgent orchestrating 6 concurrent sub-agents for automated SnapLogic pipeline code review — demonstrating the AI-building-AI pattern using Cursor IDE with Claude

	·     Achieved ~90% performance improvement by converting sequential single-agent architecture to ParallelAgent → SequentialAgent → Consolidator pattern with output_key state management

	·     Implemented 6 specialized parallel sub-agents providing 100% rule coverage: Naming (9 rules), Best Practices (6 rules), Error Handling (5 rules), Performance (8 rules), Review Conditions (8 critical + 18 warning), Security (1 rule)

	·     Built custom GlobalGemini class (subclassing ADK Gemini) routing model calls to Google's global endpoint, solving regional model availability limitation for gemini-3.5-flash in us-west1

	·     Designed consolidator agent that reads all 6 sub-agent results from session state and produces unified structured JSON report with overall status, critical violations, warnings, category breakdown, and prioritized action plan

	·     Deployed to Google Cloud Agent Engine using `adk deploy agent_engine` CLI with OpenTelemetry tracing (`--otel_to_cloud`) for full observability in Cloud Trace

	·     Integrated with SnapLogic pipelines via streamQuery API with session-based stateful architecture: create session → streamQuery with session_id → parse structured JSON response

	·     Iteratively refined agent instructions through 4 production tuning cycles based on real pipeline review feedback: scoped retry rules to connector snaps only, switched to snap label reporting, recognized error routing patterns, accepted COEnnnn naming prefix

	·     Used AI (Cursor + Claude) throughout: architecture design, output_key pattern discovery, GlobalGemini class implementation, deployment debugging (OneDrive file locks, model 404s, API payload format, reserved env var conflicts), and rule refinement

	Agent Architecture:

	·     Root LlmAgent → SequentialAgent → [ParallelAgent (6 sub-agents), Consolidator LlmAgent]

	·     State Management: output_key per sub-agent (naming_result, best_practices_result, errorhandling_result, performance_result, review_result, security_result)

	·     Model: Gemini 3.5 Flash via GlobalGemini (global endpoint routing)

	·     Deployment: Google Cloud Agent Engine (us-west1) with OTEL tracing

	·     Output: Structured JSON (overall_status, critical_violations, warnings, category_breakdown, action_plan)

# *Security & Compliance*

·     Identified and resolved 3 security vulnerabilities through proactive code review and security scanning integration:  
·     Form Submission Whitespace Vulnerability (SNAPLOGIC-631): Discovered missing input sanitization allowing potential injection attacks; implemented trimming and validation layer

·     Service Account Password Rotation (Mythos Scan): Addressed credential exposure risk; implemented automated 90-day rotation cycle via Vault integration

·     OAuth & URL Configuration Review (SFDC Integration): Validated callback URLs, implemented CSRF protection, and secured token refresh mechanism

·     Achieved 100% compliance with enterprise security scanning requirements across Mythos, Checkmarx SAST, and Blackduck SCA tools

·     Implemented GDPR-compliant data handling, SOC 2 measures, and automated credential management across all deployed services

# *Leadership & Mentoring*

·     Mentored 5+ team members on BigQuery optimization, Kubernetes deployment, AI/LLM integration, and SnapLogic development patterns

·     Created 3,348 lines of technical documentation including design specifications, architecture decision records, and operational runbooks

·     Conducted workshops and training sessions for 30+ team members on BigQuery MERGE patterns, Kubernetes deployment, Gemini API integration, and error handling best practices

·     Led cross-functional initiatives coordinating with 5+ teams (Frontend, Backend, DevOps, Security, AI/ML) to deliver complex multi-team projects on schedule

·     Established and evangelized standardized design patterns for error handling (3-tier acknowledgment), logging (unified framework), API design (RESTful patterns), and data architecture (partitioning/clustering)

·     Provided executive-level status updates, quarterly business impact reports, and transparent stakeholder communication throughout all initiatives

# *Operational Excellence*

·     Maintained zero critical production incidents across all personally-owned services and pipelines

·     Achieved 99.9%+ uptime for all deployed services with comprehensive monitoring, alerting, and automated recovery

·     Established naming conventions, code review standards, and deployment checklists adopted organization-wide

·     Designed dead-letter queue patterns, retry mechanisms, and circuit breaker implementations for resilient message processing

# **GENAI-AUGMENTED DEVELOPMENT METHODOLOGY & PROJECTS**

Pioneered AI-augmented development workflows using Cursor AI (Claude Opus), ChatGPT, and GitHub Copilot to ship production-grade applications at 10x speed. Demonstrated expertise in prompt engineering, iterative problem decomposition, AI-driven debugging, and translating real-world requirements into working software through conversational AI development.

**AI Development Methodology: How I Build with GenAI**

IDEATION & REQUIREMENTS DECOMPOSITION:

·     Identify real-world problems from personal experience or peer requests

·     Decompose complex requirements into atomic, AI-implementable tasks

·     Provide clear architectural constraints and technology preferences upfront

·     Use natural language specifications that guide AI toward optimal solutions

Example (SnapLogic Portal): Started with "I need an internal portal for pipeline operations" and iteratively decomposed into: form system, authentication, JIRA integration, BigQuery persistence, Pub/Sub events, AI agents — each specified as clear, bounded prompts.

ITERATIVE PROMPT ENGINEERING:

·     Employ progressive disclosure: start with high-level architecture, drill into specifics

·     Provide context through file references 

Agents.md (AI Coding Agent Instructions), 

Context.md (Project Context), 

Bug\_Log.md (Record resolved bugs here for future reference), 

Restore\_Points.md (Known-good states you can return to, in case of rollback)

Actual Codebase,

Error logs, and system state

·     Use corrective feedback loops when AI output doesn't match intent

·     Leverage "chain of exploration" prompting: let AI explore codebase first, then act

Example (RAG Optimization): When AI pipeline review returned inconsistent results, I analyzed the failure patterns (missing rules, duplicates, inconsistent output), diagnosed the root causes (PDF chunking, no output format, no deduplication instructions), and engineered a structured RAG corpus with atomic rule blocks, JSON path detection specs, and deterministic output schemas — achieving consistent, reproducible AI reviews.

DEBUGGING & ISSUE IDENTIFICATION:

·     Provide exact error messages, stack traces, and system context to AI

·     Use AI to correlate symptoms across distributed systems (Kubernetes, Harness CI/CD, Kong gateway)

·     Identify configuration mismatches through systematic elimination

·     Cross-reference deployment artifacts (Helm values, ingress templates, CI triggers)

Example (Kubernetes Routing): Diagnosed a "no Route matched" error on deployed service. Through systematic AI-assisted investigation: read serve.js, deployment.yaml, service.yaml → identified missing ingress.yaml template → created Kong-compatible Ingress with strip-path annotation → identified Harness CI trigger filter excluding deployment/\* changes → implemented workaround.

RECTIFICATION & ITERATION:

·     Apply fixes through AI with full context of the system state

·     Validate corrections against known-good states

·     Iteratively refine until the system works end-to-end

·     Document learnings for future reference

Example (TypeScript Errors): Identified tsconfig.app.json referencing vitest/globals types in app code. AI explained the root cause (test globals don't belong in app tsconfig), provided the fix (empty types array), and validated via linting — all within one iteration.

**Project: SnapLogic Automations Portal** (Official \- AI-Piar Programming) Role: GenAI Developer & Architect | Built entirely using Cursor AI Technologies: React 18, TypeScript, Vite 7, Tailwind, shadcn/ui (48 components), Express.js, Node.js, BigQuery, Pub/Sub, Vertex AI (Gemini 2.5 Flash \+ Pro), Kubernetes, Helm, Vault, Datadog APM, JIRA API, Slack, SnapLogic Runtime API

·     Built comprehensive full-stack portal from scratch using AI pair programming (Cursor AI), evolving through 6+ major iterations driven by natural language prompts and iterative refinement

·     Developed 5,480-line monolithic Express.js backend with 35+ REST API endpoints integrating 7 external systems (BigQuery, JIRA, Pub/Sub, Vertex AI, SnapLogic, Slack, Datadog)

·     Evolved architecture from simple form-proxy (v1) → OTP auth via Slack (v2) → session-based auth with BigQuery (v3) → self-service registration (v4) → AI agents with Gemini tool-calling (v5) → production K8s deployment across 5 environments (v6)

·     Implemented AI Agent Chat with Gemini 2.5 Pro tool-calling loop: agent iteratively queries BigQuery (weekly summaries, top failures, error clusters) until it answers

·     Built Pipeline Performance Analysis engine: 2-step async (Datadog discovery → SnapLogic Runtime API → 50+ KPI computation → BigQuery storage → pattern analysis with error clustering)

·     Implemented JIRA ticket lifecycle automation: creation, transitions, comments, epic linking, 60-second polling loop syncing to BigQuery with Slack notifications

·     Deployed to Kubernetes across 5 environments (dev/sit/qa/stg/prd) via Harness CI \+ Spinnaker CD, Kong ingress, Vault Agent sidecar, Datadog APM

·     Used AI to diagnose production issues: missing K8s Ingress template, Harness CI trigger filter (deployment/.\* exclusion), Kong gateway routing, Vault secret injection

·     Achieved 100+ users, 35+ API endpoints, 2 AI agents with tool-calling, 99.95% uptime — all developed through AI-augmented workflows

AI Development Metrics:

·     Time from concept to production: 3 weeks (vs estimated 3-4 months traditional)

·     Backend complexity: 5,480 lines, single monolithic server, 7 integrations

·     Iterations to stable architecture: 6 major versions

·     Deployment environments: 5 (dev/sit/qa/stg/prd) with full CI/CD

**Project: RAG Corpus Optimization for AI Pipeline Reviews** (Official \- AI-Engineered) Role: GenAI Engineer (RAG & Prompt Engineering Specialist) Technologies: Vertex AI, Gemini 2.5 Pro, RAG, Prompt Engineering, SnapLogic

·     Identified inconsistency problems in AI-powered pipeline reviews (missing rules, duplicates, different output each run) and diagnosed root causes through systematic analysis of RAG architecture

·     Engineered optimized RAG corpus (v1.8 → v3.0) with: atomic self-contained rule blocks, unique rule IDs, JSON path detection specs, deduplication protocols, deterministic output schema

·     Designed 7-step optimization framework: PDF→Markdown conversion, atomic rules, system behavior instructions, strict JSON output format, unique IDs, detection specs, master checklist

·     Implemented 58→20 cluster deduplication for Error Report RAG, analyzing semantic similarity across cluster names and consolidating near-duplicates

·     Reduced AI review inconsistency from \~40% variance to \<5% through structured RAG design and deterministic system instructions

**Project: Pic-Reel / FrameFlow Hyperlapse Tool (Personal \- AI-Built)**   
Role: Solo GenAI Developer | Concept-to-Production Technologies: React 19, TanStack Start (SSR/Nitro), TypeScript 5.8 (strict), Vite 7.3, Tailwind CSS v4, FFmpeg.wasm 0.12.15, dnd-kit (sortable), react-dropzone, react-hook-form \+ Zod, Render.com

·     Identified real-world photographer problem: no free browser-based tool exists to create hyperlapses/timelapses from photo sequences without uploading to a server

·     Built complete web application from scratch using Cursor AI \+ Lovable.dev: photo upload → drag-and-drop reordering → configurable video settings → client-side MP4 encoding → download

·     Implemented 100% client-side video encoding using FFmpeg compiled to WebAssembly — photos never leave the user's browser (privacy-first architecture)

·     Designed multi-source WASM loading with CDN fallback: local split binary (4 chunks assembled in-browser) → unpkg CDN → jsdelivr CDN — ensuring reliability across network conditions

·     Built configurable video settings: FPS (24/30/48/60/120), resolution (1080p/2K/4K), codec (H.264 libx264/H.265 libx265), CRF-based quality presets, per-photo duration (0.02s-5s)

·     Implemented multi-step progress indicator with real-time percentage during render pipeline (uploading → preparing → rendering → encoding → finalizing)

·     Deployed as SSR app (TanStack Start \+ Nitro with render\_com preset) on Render.com with self-ping keep-alive mechanism every 5 minutes to prevent cold starts on free tier

·     Built singleton FFmpeg instance pattern (lazy-loaded, cached globally) with proper memory management (virtual FS cleanup, Object URL revocation on unmount)

Technical Highlights:

·     68 source files (30+ shadcn/ui primitives \+ 6 domain components)

·     React 19 \+ TanStack Start (file-based routing, SSR shell for SEO)

·     FFmpeg concat demuxer with force\_original\_aspect\_ratio \+ black padding for resolution scaling

·     Phase state machine via discriminated union types (idle | rendering | done)

·     Supports up to 500 images per session

·     Zero backend video processing costs — all computation in user's browser

**Project: CareerPilot AI \- Autonomous Job Search Platform (Personal \- GenAI-Native)**

**Role:** GenAI Developer & Forward Deployment Engineer | Concept → Production (Render.com \+ Supabase)

**Timeline:** Aug 2026 – Present

**URL:** https://careerpilot-ai-6i93.onrender.com

**Technologies:** React 18, TypeScript 5.5, Vite 5, React Router 7, Tailwind CSS 3, shadcn/ui (Radix), Zustand 5, TanStack Query 5, Recharts, Framer Motion 12, Supabase (PostgreSQL \+ Auth \+ Storage \+ Edge Functions/Deno \+ RLS \+ pg\_cron \+ pg\_net), Google Gemini 3.6 Flash, Groq (fallback), Apify (LinkedIn scraper), Google OAuth2 (Drive \+ Docs \+ Gmail send), Resend (email), LaTeX→PDF (moderncv via ytotech), Render.com

**Live metrics:**

\[CareerPilot\] Jobs Roles: 5

\[CareerPilot\] Jobs discovered: 63

\[CareerPilot\] Job-tailored resumes: 44

\[CareerPilot\] Pipeline runs completed: 96

\[CareerPilot\] AI tokens used (month): 817,157

\[CareerPilot\] Last synced: Sep 21, 2026, 4:44 PM

·     Recognized scattered job-seeking activities during active recruitment periods, engineering an operational command center across 14 dedicated paths consolidating opportunity discovery, AI customization, application delivery, interview readiness, and Copilot assistance

·     Architected and launched an end-to-end AI recruitment system incorporating LinkedIn web scraping via Apify, Gemini ATS resume customization, tailored cover letter creation, visual process management, drag-and-drop tracking boards, automated email submissions, AI interview prep, and conversational AI Copilot

·     Formulated a dual-tier resume generation protocol enforcing an 8-part structure driven by single constant definitions, enforced by a validation layer guaranteeing layout sequencing, length allocations, line-level source grounding, and exclusion of AI artifacts by constraining modifications to existing bullet points

·     Constructed a stateful graph execution framework featuring 28 modular node categories, topological resolution, idempotent execution queues, multi-role fan-out execution batches, and cron-based background task continuation every 60 seconds

·     Engineered fully autonomous 18-step daily execution flow: Scheduled Trigger (7 AM) → Google Docs synchronization → LinkedIn query formulation → Apify execution → polling/parsing/deduplication → job persistence → Match Score qualification → Gemini ATS enhancement → LaTeX rendering → PDF conversion → Cloud Storage upload → Resend notification dispatch

·     Integrated Match Score qualification filtering before execution fan-out, evaluating postings against master credentials to terminate processing below configured thresholds (default 80), eliminating unnecessary LLM invocations and document compilations while maintaining digest visibility

·     Delivered automated email submission workflows extracting point-of-contact details from scrapers or AI job description parsing, utilizing Gemini to compose targeted application messaging citing relevant experience, attaching compiled PDFs, and delivering via Gmail API with pre-send validation and duplicate prevention

·     Built resilient AI routing architecture utilizing Gemini 3.6 Flash as primary provider with Groq fallback, incorporating categorized error retries, self-correction on grounding failures, token tracking, and unified mode handling through a single serverless Edge Function

·     Implemented AI interview preparation generating role-specific discussion items, technical/behavioral questions, candidate inquiries, and company context; developed Application Package Wizard executing scoring, tailoring, and document creation in 4 steps for external opportunities

·     Executed production engineering enhancements including self-healing graph state reconciliation to resolve topology drift via incremental updates, OAuth token re-authentication handling, data synchronization across storage layers, bounded API polling thresholds, and isolated corpus management

Technical Highlights:

·     12 Supabase Edge Functions (Deno): workflow-run, workflow-step, workflow-scheduler, workflow-cancel, workflow-retry-failed, ai-chat, resume-actions, auto-apply, careerpilot-doc-sync, google-oauth-start, google-oauth-callback, google-access-token

·     28 database migration scripts; dedicated telemetry table tracking token usage; Row Level Security across tables; pg\_cron/pg\_net scheduling; partial unique constraints preventing duplicate executions

·     Structured prompt engineering: Corpus loading with automated resume selection paired with context-aware prompt assembly; verified by automated output validation with fallback recovery mechanisms

·     Automated dispatch engine: Dual extraction paths for contact details, RFC-822 compliant Gmail delivery with PDF attachments, comprehensive application audit logging, and automated candidate status transitions

·     LaTeX compilation pipeline using moderncv templates, Google Drive API integration with automated credential renewal, initial account setup provisioning, and real-time visual process monitoring tools

·     Flexible authentication supporting password, OAuth, and magic links; accessible frontend with error boundaries, motion toggles, and keyboard controls; telemetry dashboards for provider comparison; typed integration services

**Project: Cric-Scorer — Cricket Tournament & Live Scoring Platform (Personal \- AI-Built)** Role: Solo GenAI Developer | Complex Domain Logic via AI-Augmented Development Technologies: React 18.3, TypeScript, Vite 5.4, Tailwind CSS 3.4, Lucide React, Supabase (PostgreSQL \+ RLS \+ Migrations \+ Triggers), Bolt.new

·     Built full-featured cricket tournament management and live ball-by-ball scoring application with complex domain logic engine using Bolt.new for scaffolding and AI-augmented development

·     Implemented stateful scoring engine (scoringEngine.ts): ball-by-ball scoring, undo/redo, state rebuild, automatic strike rotation, extras handling (wides, no-balls, byes, leg-byes), 10 wicket types, over completion, innings transitions

·     Built career statistics engine (statsEngine.ts): batting average, strike rate, highest score, 50s/100s, bowling average, economy, best figures, 3W/5W hauls, fielding stats, NRR-based points table

·     Implemented MVP point system (mvpEngine.ts): configurable per-run, per-wicket, milestone bonuses, economy bonuses, fielding points, award points — with detailed per-player breakdowns

·     Designed comprehensive database schema: 14 tables (teams, players, team\_players, tournaments, tournament\_teams, matches, match\_innings, deliveries, player\_match\_batting/bowling/fielding, match\_awards, mvp\_points, match\_playing\_xi, settings) with foreign keys, triggers, and RLS

·     Built Playing XI management with conflict prevention (same player on both teams, player in two live matches), captain/keeper assignment, and squad management

·     Implemented custom hash-based router (router.ts) with pattern matching (:id params) — no react-router dependency

Technical Highlights:

·     3 domain engines: Scoring, Statistics, MVP (complex deterministic algorithms)

·     14-table Supabase schema with migrations, triggers, and RLS policies

·     6 pre-seeded teams (Tamil Nadu-based), 32 players, 3 tournaments

·     Match completion with automatic result determination (win by runs/wickets, tie)

·     Timeline view with ball-by-ball visual display and inline edit capability

·     Global/tournament leaderboards for batting, bowling, fielding, and MVP

·     Responsive: desktop sidebar \+ mobile bottom nav

**Project: IPL 2026 Prediction Game (Personal \- AI-Built)**  
Role: Solo GenAI Developer | Requirements from friends → Full production app Technologies: React 18, TypeScript, Vite 5 (SWC), Tailwind CSS, shadcn/ui (Radix), Framer Motion, TanStack Query v5, React Router v6, Recharts, Node.js (ES Modules), Express.js, Supabase (PostgreSQL), CricAPI, node-cron, JWT (jsonwebtoken), express-rate-limit, Render.com

·     Received requirement from friends group: "Build us an app for IPL match predictions" — translated vague social need into fully automated prediction platform for 30+ users

·     Built complete full-stack application using AI pair programming (Cursor AI \+ Lovable.dev) with no hand-written implementation syntax ("vibecoded")

·     Implemented pari-mutuel scoring engine (calculateMatchResult.js, 248 lines): losers' points pooled and redistributed among winners with weighted user multipliers (1x/2x/5x) and playoff escalation (20→50→100 points)

·     Built fully automated tournament lifecycle with zero manual admin: cron-based match detection via CricAPI (matchChecker.js, 617 lines), automatic cutoff enforcement (15 min before start), auto-result detection by parsing CricAPI status field, and scoring pipeline

·     Implemented intelligent match management: auto-postpone on delayed matches (+25 min with re-check every 10 min), double-header day logic, no-result handling for rain/abandonment (previous leaderboard carried forward)

·     Built OTP authentication with JWT (15-min expiry), 3-tier rate limiting (general 25/min, OTP 5/15min, admin 20/15min), server-side cutoff enforcement, and admin-table gated console

·     Designed 9-table Supabase schema with 3 RPC stored procedures (get\_bids\_today, insert\_unbid\_predictions, get\_todaymatches) for complex aggregation

·     Delivered features: live countdown timers, "Last 5" form guide (W/L/NR streaks), multi-group leaderboards (G1/G2), active user highlighting, admin console with manual overrides

Technical Highlights:

·     80+ custom source files (7 core components \+ 49 UI primitives \+ 4 backend modules)

·     Express server (607 lines) with 12 JWT-protected API endpoints

·     9 Supabase tables \+ 3 RPC stored procedures

·     2 autonomous cron jobs (match checker every 10 min \+ result detector every 30 min)

·     29 registered players across multiple groups, active throughout IPL 2026 season

·     Centralized API layer (api.ts) with Bearer token injection

**Project: PlanItX \- Indian Wedding & Event Planning Platform (Personal \- AI-Built)**   
Role: Solo GenAI Developer | Requirements from friends → Premium SaaS product Technologies: React 18.3, TypeScript 5.5, Vite 5.3, Tailwind CSS 3.4, Zustand 4.5, Framer Motion 11.3, Recharts 2.12, Zod 3.23, Lucide React, Supabase (PostgreSQL \+ Auth \+ Row Level Security), 12-table schema

·     Received requirement from friends: "We need an app to plan Indian weddings" — translated into full-featured premium SaaS product (branded as "PlanIT X \- A Product of Candid Carnival")

·     Built comprehensive event planning platform from scratch using AI-augmented development with 56 source files, 13 pages, 12 custom hooks, and 12 database tables

·     Implemented India-first features: budget tracking in Lakhs/INR with donut charts, guest management with dress/gift tracking (saree types, dhotis, return gifts), wedding-day schedule (Haldi, Baraat, Pheras, Reception, Vidaai)

·     Built vendor marketplace with category browsing (halls, caterers, photographers, makeup, decor, DJ, mehendi), ratings, featured listings, booking/payment tracker with status workflow (pending→booked→advance paid→fully paid), and WhatsApp contact integration

·     Implemented task timeline with family responsibility delegation across bride's and groom's families, priority-based assignments, and pre-built 12-month planning templates

·     Designed fintech-inspired premium UI: dark charcoal (\#1A1A1A) \+ deep crimson (\#C41E3A) \+ warm white (\#FAFAF8) palette, mobile-first (448px primary), Playfair Display headings, Framer Motion animations

·     Implemented comprehensive security: Row Level Security (RLS) on all 12 tables with auto-triggers, multi-method auth (email/magic link/phone lookup), single-device session policy, Zod form validation on all inputs

·     Supports dual event types: Hindu/Muslim/Sikh/Christian weddings AND baby showers (Seemandham) with dynamic labels and cultural elements via eventLabels.ts

·     Built structured error logging to Supabase (error\_logs table) with user context, browser info, and stack traces

·     Implemented offline-capable sample data loading (loadSampleData()) for demo mode without Supabase

Technical Highlights:

·     56 source files across pages, components, hooks, and lib modules

·     12 Supabase PostgreSQL tables with RLS policies, auto-triggers, and 16 pre-seeded vendors

·     12 custom React hooks (useAuth, useBudget, useGuests, useChecklist, useTasks, useSchedule, useVendorBookings, useWedding, useFamilyMembers, etc.)

·     Hall comparison tool with cost breakdown (rent, GST, generator, rooms, decor)

·     Responsive: mobile bottom-nav (BottomNav) \+ desktop sidebar (breakpoint: lg)

·     Route guards: ProtectedRoute (auth) \+ WeddingGuard (wedding exists)

·     Bulk fetchAllData pattern in Zustand store for initial hydration

# **FORWARD DEPLOYMENT ENGINEERING**

Demonstrated ability to operate as a Forward Deployment Engineer: identifying real-world problems, rapidly translating requirements into production solutions, debugging complex distributed systems in production, and ensuring end-user adoption. Bridges the gap between technical architecture and customer/user needs.

### **Forward Deployment Skills Demonstrated**

PROBLEM IDENTIFICATION & REQUIREMENTS ENGINEERING:

·     Built CareerPilot AI (Personal) — identified fragmented job-search workflow while actively applying → shipped unified GenAI command center (dogfooded daily)

·     Built autonomous AI job search platform (CareerPilot AI) — identified fragmented workflow → built unified command center

·     Identified photographer workflow gap → built Pic-Reel (free hyperlapse tool)

·     Received friend group requirement → built IPL 2026 prediction game

·     Identified cricket scoring gap → built Cric-Scorer (live ball-by-ball tournament platform)

·     Received social need → built PlanItX event planning app

·     Identified team inefficiency → built SnapLogic Automations Portal

·     Identified RAG inconsistency → engineered optimized corpus (v1.8→v3.0)

·     Identified legacy logging risk → prevented critical incident

PRODUCTION DEBUGGING & DEPLOYMENT:

·     Debugged CareerPilot production drift (jobs vs resumes vs Google Drive) with repair\_sync and OAuth token refresh/reconnect flows on live Render \+ Supabase deployment

·     Diagnosed Kong gateway "no Route matched" error in Kubernetes cluster by tracing request path from DNS → Ingress → Service → Pod, identifying missing Ingress template

·     Identified Harness CI trigger filter (deployment/.\* exclusion) preventing build on infrastructure-only changes through systematic analysis of webhook delivery \+ payload conditions

·     Debugged OAuth token caching with force-refresh on 401 retry logic for SnapLogic API calls

·     Resolved TypeScript compilation errors by understanding module resolution (vitest/globals type definitions scope)

·     Investigated SAP S/4HANA OData integration errors by analyzing stack traces, identifying syntax errors in key predicates and query filters

DEPLOYMENT & INFRASTRUCTURE:

·     Deployed applications to Google Kubernetes Engine (GKE) with Helm charts, HPA, Vault secrets, Datadog APM

·     Designed and created Kubernetes Ingress templates for Kong gateway with strip-path routing

·     Configured Harness CI/CD pipelines with Blackduck SCA, Checkmarx SAST, multi-registry Docker builds

·     Managed multi-environment deployments (Dev/Stage/Prod) with environment-specific configurations

·     Implemented health check endpoints, liveness/readiness probes, and monitoring dashboards

CUSTOMER/USER ENGAGEMENT:

·     Gathered requirements from 100+ internal users for Portal features

·     Iterated on UI/UX based on user feedback (structured path builder, category colors, help popovers)

·     Conducted user onboarding and training for self-service platform

·     Managed stakeholder expectations through regular communication and transparent status updates

·     Achieved high user satisfaction through iterative, feedback-driven development

# **EARLIER EXPERIENCE**

INFOSYS Senior Consultant Apr 2024 \- Jul 2024 | India

·     Continued enterprise SnapLogic and integration delivery for manufacturing and telecom clients during senior consulting tenure

·     Supported pipeline governance, automated error handling, and agile delivery in high-availability integration landscapes

INFOSYS Consultant Mar 2023 \- Mar 2024 | India

·     Delivered SnapLogic integration solutions across GCP, Azure, Oracle, SAP, and Salesforce ecosystems for enterprise clients

·     Built scalable, secure integrations with API management, pipeline governance, and automated error handling

INFOSYS Consultant Aug 2022 \- Mar 2023 | India

·     Designed CI/CD deployment flow with rollback and smoke-testing reduction for NTT Ltd using SnapLogic and GitHub

·     Improved deployment reliability and reduced manual validation effort across integration release cycles

INFOSYS Senior Associate Consultant Feb 2021 \- Sep 2022 | India

·     Developed and deployed high-priority Dell Boomi B2B interfaces for ICHOR Systems with automated reprocessing and monitoring tools

·     Redesigned interfaces and improved stability across the Boomi landscape for Visteon Corporation by co-developing a common error/logging framework

·     Led integration delivery as Business Analyst and Scrum Master, driving requirement finalization and deployment excellence

TATA CONSULTANCY SERVICES (TCS) Systems Engineer Jun 2016 \- Feb 2021 | India

·     Built integration solutions across manufacturing, telecom, and enterprise domains using Dell Boomi and SnapLogic platforms

·     Developed B2B interfaces, persistent integration designs, and monitoring frameworks involving Kafka, GitHub, and Azure Functions

·     Demonstrated cross-functional leadership in requirement analysis, agile delivery, and production support in high-availability environments

# **TECHNICAL SKILLS**

Integration Platforms:

·     SnapLogic iPaaS (5+ years): Pipeline Design, Listener/Worker Patterns, Triggered Tasks, Common Pipeline Framework, Ultra Tasks, Error Handling, Snap Development

·     Dell Boomi: B2B Interfaces, Professional Developer certified, Common Error/Logging Frameworks, Automated Reprocessing

·     Salesforce (SFDC): Integration, OAuth Configuration, API Integration

·     API & Middleware: Postman, SOAPUI, Azure APIM, Kafka

Databases & Data:

·     Google BigQuery: Schema Design, MERGE/DML, Partitioning, Clustering, ML

·     Oracle SCM | Oracle OM | MySQL | PostgreSQL | MongoDB

·     SQL Optimization | Query Performance Tuning

·     Data Modeling: Star Schema, Snowflake, Normalization, Denormalization

·     ETL/ELT Pipeline Design | Data Quality | Data Governance

Cloud Platforms:

·     Google Cloud Platform (GCP): Pub/Sub, BigQuery, Vertex AI, GKE, Cloud Functions, Cloud Storage, IAM

·     Microsoft Azure: Azure Functions, Azure APIM, Azure Application Insights

·     Pub/Sub: Event Streaming, Message Queuing, Dead-Letter Topics

DevOps & Infrastructure:

·     Kubernetes: Deployments, Services, HPA, ConfigMaps, Secrets, Helm

·     Docker: Multi-Stage Builds, Docker Compose, Registry Management

·     CI/CD: Harness Pipelines, GitHub Actions, Automated Testing, Security Gates

·     Vault (HashiCorp): Secret Injection, Dynamic Credentials, Rotation

·     Monitoring: Datadog APM, Chronosphere, Azure Application Insights, JMeter, Custom Metrics, Alerting

·     IaC: Terraform, Helm Charts

·     Version Control: Git, GitHub

AI/ML & LLM:

·     Google Gemini 2.5 Flash (Fast Inference, Story Generation)

·     Google Gemini 2.5 Pro (Multi-Turn Agents, Complex Analysis)

·     Google Gemini 3.5 Flash (Foundation Model for AI Agents, Pipeline Review, Quote Analysis)

·     Google ADK (Agent Development Kit): ParallelAgent, SequentialAgent, LlmAgent, output_key state management

·     GCP Agent Studio: Agent Design, RAG Grounding, Reranking, Structured Output

·     Google Cloud Agent Engine (Vertex AI Reasoning Engine): Deployment, streamQuery API, Session Management

·     RAG Architecture: Corpus Design, Embedding, Retrieval, Ranking, Gemini 2.5 Flash Reranker

·     Prompt Engineering: System Prompts, Few-Shot, Chain-of-Thought, Anti-Hallucination Constraints

·     AI Agent Development: Conversation Management, Tool Use, Error Recovery, Multi-Agent Orchestration

·     OpenTelemetry (OTEL): Cloud Trace integration, `--otel_to_cloud` deployment tracing

·     Token Optimization | Context Window Management | Retry Strategies

Security:

·     OAuth 2.0 | OpenID Connect | JWT | SAML

·     RBAC | ABAC | Session Management | MFA/OTP

·     Vault Integration | Secret Rotation | Certificate Management

·     SAST (Checkmarx) | SCA (Blackduck) | Security Scanning (Mythos)

·     Input Validation | OWASP Top 10 | Secure Coding Practices

·     SOC 2 | GDPR | Compliance Frameworks

Tools & Platforms:

·     JIRA | Confluence | Slack | Git | GitHub

·     Postman | SOAPUI | Swagger/OpenAPI | VS Code | IntelliJ

·     Datadog | Chronosphere | Azure Application Insights | Looker Studio

·     Microsoft Office | G Suite

·     Harness | Docker Hub | GCR (Google Container Registry)

# **CERTIFICATIONS & TRAINING**

Certifications:

·     SnapLogic Certified Enterprise Automation Professional — Issued Mar 2024

·     SnapLogic Partner Integrator Library — Issued Feb 2024

·     Dell Boomi Professional Developer — Issued 2021

·     Dell Boomi Associate Developer — Issued 2020

Professional Development:

·     Google Cloud Platform Architecture and Services

·     BigQuery Optimization and Advanced Analytics

·     Kubernetes Administration and Deployment

·     AI/LLM Integration and Prompt Engineering

·     Generative AI with Google Vertex AI

·     SnapLogic Enterprise Automation and Partner Integrator Library

·     Dell Boomi Professional Developer training and B2B integration patterns

# **EDUCATION**

B.Tech – Information Technology

SASTRA University

2016 | Thanjavur

# **KEY PROJECTS & METRICS SUMMARY**

| Project | Impact | Scale |
| :---- | :---- | :---- |
| FW\_Flex Pipeline Redesign | 66% snap reduction (278 to 94\) | 9 pipelines, 3 common |
| PC to CC BigQuery Migration | 4-10x latency, 10-80x cost savings | 5 pipelines, 0 data loss |
| Automations Portal (AI-Built) | 99.95% uptime, \<300ms response | 100+ users, 35+ APIs |
| Quote Journey Tracker Agent | 85-90% faster (3-4 min→30-40 sec) | 540+ hrs/year saved, ~$40K value, 2000-3000% ROI |
| Multi-Agent Pipeline Review (ADK) | ~90% perf improvement, 100% rule coverage | 6 parallel sub-agents, structured JSON, built with Cursor AI |
| RAG Corpus Optimization | 40% → \<5% AI review inconsistency | 58→20 clusters, v3.0 |
| Critical Incident Response | \<2hr resolution, $0 business impact | Quarter-end period |
| CareerPilot AI (Personal) | Autonomous GenAI job search platform | Gemini 3.6 \+ Groq, RAG, 18-node pipeline |
| Cric-Scorer (Personal) | Cricket tournament & live scoring | 3 domain engines, 14 tables |
| Pic-Reel Hyperlapse (Personal) | Free tool for photographers | Concept→prod in 1 week |
| IPL 2026 Prediction (Personal) | Friends group prediction game | Full app in 2 weeks |
| PlanItX Events (Personal) | Collaborative event planning | Full app via AI |
| Security Vulnerability Fixes | 3 issues fixed, 0 prod incidents | 100% compliance |
| Technical Documentation | 3,348 lines, 3 specifications | 30+ team members trained |

# **ADDITIONAL INFORMATION**

Professional Interests:

·     Enterprise Integration Architecture and iPaaS Platforms

·     Cloud-Native Application Development

·     Generative AI and LLM-Powered Developer Tools

·     Platform Engineering and Developer Experience (DevEx)

·     Distributed Systems and Event-Driven Architecture

Open Source & Community:

·   Wrote a blog post documenting the step-by-step process for setting up JWT authentication for Snaplogic Public APIs without any IDPs, using only keys and Snaplogic.

Languages:

·     English (Professional)

# 