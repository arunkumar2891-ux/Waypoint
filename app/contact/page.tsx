import { Container, Section } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { profile } from '@/content/profile'
import { Mail, ExternalLink, GitFork, ArrowUpRight } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Arunkumar JS — Integration Architect, GenAI Developer, and Forward Deployment Engineer.',
  path: '/contact',
})

const contactLinks = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'arunkumar-j-s',
    href: profile.linkedin,
    icon: ExternalLink,
  },
  {
    label: 'GitHub',
    value: 'arunkumar2891-ux',
    href: profile.github,
    icon: GitFork,
  },
]

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-caption mb-4 text-muted tracking-widest">Contact</p>
          <h1 className="text-display mb-6">Get in Touch</h1>
          <p className="text-body-lg text-muted mb-12">
            Looking for an Integration Architect, GenAI Developer, or Forward
            Deployment Engineer? I&apos;m open to discussing opportunities.
          </p>

          <div className="space-y-6">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-4 p-4 border border-border rounded-sm hover:border-border-strong transition-colors"
              >
                <link.icon size={20} className="text-muted" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {link.label}
                  </p>
                  <p className="text-sm text-muted">{link.value}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
