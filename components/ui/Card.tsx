import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'border border-border bg-surface rounded-sm p-6',
        hover && 'transition-colors duration-150 hover:border-border-strong',
        className
      )}
    >
      {children}
    </div>
  )
}
