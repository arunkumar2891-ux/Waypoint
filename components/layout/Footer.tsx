import Link from 'next/link'
import { Container } from '@/components/ui'
import { ExternalLink, GitFork, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arunkumar-j-s-05164393/',
    icon: ExternalLink,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/arunkumar2891-ux',
    icon: GitFork,
  },
  {
    label: 'Email',
    href: 'mailto:arunkumarjs@outlook.com',
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-background py-12 mt-auto"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Arunkumar JS
            </p>
            <p className="text-sm text-muted mt-1">
              Integration Architect · GenAI Developer · Forward Deployment Engineer
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Arunkumar JS. Built with Next.js, Three.js, and TypeScript.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors duration-150"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
