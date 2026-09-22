import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  /** Render the title as h1 instead of the default h2 */
  as?: 'h1' | 'h2'
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  as: Tag = 'h2',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-3xl', className)}>
      {label && (
        <p className="text-caption mb-4 text-muted tracking-widest">{label}</p>
      )}
      <Tag className="text-heading-1 text-foreground">{title}</Tag>
      {description && (
        <p className="text-body-lg mt-4 text-muted">{description}</p>
      )}
    </div>
  )
}
