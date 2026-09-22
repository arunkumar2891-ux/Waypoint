import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'muted'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-foreground/5 text-foreground border-transparent',
    outline: 'bg-transparent text-muted border-border',
    muted: 'bg-surface-subtle text-muted border-transparent',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
