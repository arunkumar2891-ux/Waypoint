'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useCallback, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/lib/types'

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  /* Close on Escape and return focus to toggle */
  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  /* Focus first link when mobile menu opens */
  useEffect(() => {
    if (!mobileOpen) return
    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>('a')
    firstLink?.focus()
  }, [mobileOpen])

  return (
    <header className="nav-header">
      <nav aria-label="Primary navigation">
        <Container className="nav-bar">
          {/* Brand → home */}
          <Link href="/" className="nav-brand" aria-label="Waypoint — Home">
            Waypoint
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn('nav-link', active && 'nav-link--active')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            className="nav-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Container>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-nav" ref={mobileNavRef} className="nav-mobile">
            <Container>
              <ul className="nav-mobile-list">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className={cn('nav-mobile-link', active && 'nav-mobile-link--active')}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Container>
          </div>
        )}
      </nav>
    </header>
  )
}
