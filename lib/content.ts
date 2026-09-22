import { professionalWork } from '@/content/work'
import { personalProjects } from '@/content/projects'
import { blogPosts } from '@/content/blog'
import { profile, careerTimeline, certifications, education, skillCategories } from '@/content/profile'
import type { ProfessionalWork, PersonalProject, Project, BlogPost } from '@/lib/types'

export function getAllWork(): ProfessionalWork[] {
  return professionalWork.sort((a, b) => a.order - b.order)
}

export function getFeaturedWork(): ProfessionalWork[] {
  return getAllWork().filter((w) => w.featured)
}

export function getWorkBySlug(slug: string): ProfessionalWork | undefined {
  return professionalWork.find((w) => w.slug === slug)
}

export function getAllProjects(): PersonalProject[] {
  return personalProjects.sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): PersonalProject[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): PersonalProject | undefined {
  return personalProjects.find((p) => p.slug === slug)
}

export function getAdjacentWork(slug: string): {
  prev: ProfessionalWork | null
  next: ProfessionalWork | null
} {
  const all = getAllWork()
  const idx = all.findIndex((w) => w.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getAllFeatured(): Project[] {
  return [...getFeaturedWork(), ...getFeaturedProjects()]
}

export function getProfile() {
  return profile
}

export function getCareerTimeline() {
  return careerTimeline
}

export function getCertifications() {
  return certifications
}

export function getEducation() {
  return education
}

export function getSkillCategories() {
  return skillCategories
}

/* ─── Blog ─── */

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAdjacentBlogPost(slug: string): {
  prev: BlogPost | null
  next: BlogPost | null
} {
  const all = getAllBlogPosts()
  const idx = all.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
