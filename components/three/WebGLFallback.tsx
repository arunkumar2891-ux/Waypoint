import { cn } from '@/lib/utils'

interface WebGLFallbackProps {
  className?: string
  sceneName?: string
}

export function WebGLFallback({ className, sceneName }: WebGLFallbackProps) {
  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center bg-surface-subtle rounded-sm border border-border',
        className
      )}
      role="img"
      aria-label={sceneName ? `${sceneName} visualization` : 'Architecture visualization'}
    >
      <div className="text-center px-6">
        <div className="grid grid-cols-3 gap-2 mx-auto w-fit mb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-foreground/10 border border-border"
            />
          ))}
        </div>
        <p className="text-sm text-muted">Architecture visualization</p>
        <p className="text-xs text-muted-foreground mt-1">
          Interactive 3D not available in this browser
        </p>
      </div>
    </div>
  )
}
