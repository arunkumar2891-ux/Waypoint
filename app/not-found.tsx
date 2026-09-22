import { Container, ButtonLink } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[60vh]">
      <Container className="text-center">
        <p className="text-caption text-muted mb-4">404</p>
        <h1 className="text-display mb-4">Page Not Found</h1>
        <p className="text-body-lg text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonLink href="/" variant="secondary">
          <ArrowLeft size={16} />
          Back to Home
        </ButtonLink>
      </Container>
    </section>
  )
}
