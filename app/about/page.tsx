import { Container, Section, SectionHeader, Badge } from '@/components/ui'
import { profile, careerTimeline, certifications, education, skillCategories } from '@/content/profile'
import { generatePageMetadata } from '@/lib/seo'
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'About',
  description:
    'Career, methodology, certifications, and education of Arunkumar JS — Integration Architect, GenAI Developer, and Forward Deployment Engineer.',
  path: '/about',
  type: 'profile',
})

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-caption mb-4 text-muted tracking-widest">About</p>
            <h1 className="text-display mb-6">{profile.name}</h1>
            <p className="text-body-lg text-muted mb-2">{profile.title}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
              <MapPin size={14} />
              {profile.location}
            </p>
            <p className="text-body-lg text-muted leading-relaxed">
              {profile.summary}
            </p>
          </div>
        </Container>
      </Section>

      {/* Career timeline */}
      <Section className="bg-surface-subtle border-y border-border">
        <Container>
          <SectionHeader
            label="Experience"
            title="Career Timeline"
          />
          <div className="space-y-8 max-w-3xl">
            {careerTimeline.map((pos) => (
              <div key={`${pos.company}-${pos.period}`} className="flex gap-4">
                <div className="pt-1.5">
                  <Briefcase size={16} className="text-muted" />
                </div>
                <div>
                  <p className="text-caption text-muted mb-1">{pos.period}</p>
                  <h3 className="text-base font-semibold">{pos.title}</h3>
                  <p className="text-sm text-muted">{pos.company} · {pos.location}</p>
                  <p className="text-body-sm text-muted mt-2">{pos.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Skills */}
      <Section>
        <Container>
          <SectionHeader
            label="Capabilities"
            title="Technical Skills"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <h3 className="text-sm font-semibold text-foreground mb-3">{cat.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certifications & Education */}
      <Section className="bg-surface-subtle border-y border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award size={18} className="text-muted" />
                <h2 className="text-heading-3">Certifications</h2>
              </div>
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs text-muted">Issued {cert.year}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={18} className="text-muted" />
                <h2 className="text-heading-3">Education</h2>
              </div>
              <ul className="space-y-4">
                {education.map((edu) => (
                  <li key={edu.degree}>
                    <p className="text-sm font-medium">{edu.degree}</p>
                    <p className="text-xs text-muted">
                      {edu.institution} · {edu.year}
                      {edu.location ? ` · ${edu.location}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
