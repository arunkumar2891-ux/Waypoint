// Content model types — derived from ARCHITECTURE.md and PRD.md

export type ProjectType = 'professional' | 'personal'

export interface ProfessionalWork {
  slug: string
  title: string
  type: 'professional'
  role: string
  timeline?: string
  employer: string
  summary: string
  context?: string
  challenge?: string
  architecture?: string
  implementation?: string | string[]
  impact: string[]
  technicalHighlights?: string[]
  lessons?: string[]
  technologies: string[]
  metrics?: Metric[]
  links?: ProjectLink[]
  featured: boolean
  category: string[]
  confidential?: boolean
  visualizationType?: VisualizationType
  order: number
  /** Documented evaluation framework scores — no overall ranking */
  evaluation?: EvaluationScore[]
  /** Documented roadmap/evolution plan */
  roadmap?: RoadmapEntry
  /** Documented development approach (e.g. AI-assisted development) */
  developmentApproach?: string
}

export interface PersonalProject {
  slug: string
  title: string
  type: 'personal'
  status: 'active' | 'shipped' | 'in-progress' | 'archived'
  summary: string
  problem?: string
  solution?: string
  architecture?: string
  technologies: string[]
  features?: string[]
  metrics?: Metric[]
  links?: ProjectLink[]
  featured: boolean
  category: string[]
  visualizationType?: VisualizationType
  order: number
}

export type Project = ProfessionalWork | PersonalProject

export interface Metric {
  label: string
  value: string
  description?: string
}

export interface ProjectLink {
  label: string
  url: string
  type: 'live' | 'github' | 'case-study' | 'documentation'
}

export type VisualizationType =
  | 'hero-network'
  | 'career-evolution'
  | 'skills-constellation'
  | 'pipeline-architecture'
  | 'migration-flow'
  | 'service-graph'
  | 'workflow'
  | null

export interface Profile {
  name: string
  title: string
  roles: string[]
  location: string
  summary: string
  email: string
  linkedin: string
  github: string
}

export interface CareerPosition {
  company: string
  title: string
  location: string
  period: string
  description: string
  current: boolean
}

export interface Certification {
  name: string
  issuer?: string
  year: string
}

export interface Education {
  degree: string
  institution: string
  year: string
  location?: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface SceneProps {
  reducedMotion?: boolean
  mobile?: boolean
  className?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface EvaluationScore {
  framework: string
  score: string
}

export interface RoadmapEntry {
  summary: string
  phases?: number
  epics?: number
  stories?: string
}

/* ─── Blog ─── */

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
  /** Related work/project slugs for cross-linking */
  relatedWork?: string[]
  relatedProjects?: string[]
  /** Structured body sections */
  sections: BlogSection[]
}

export interface BlogSection {
  heading: string
  body: BlogBlock[]
}

/** A block is either a plain paragraph string or a rich element. */
export type BlogBlock =
  | string
  | { type: 'pullquote'; text: string }
  | { type: 'callout'; items: { value: string; label: string }[] }
