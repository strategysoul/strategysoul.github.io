'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 1)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Lock background scroll while the full-screen mobile menu is open, and
  // close it the instant any scroll/swipe intent is detected (touchmove and
  // wheel fire before the page actually moves, so the menu disappears
  // before it can visually desync from a position: fixed glitch).
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    const onIntent = () => setOpen(false)
    window.addEventListener('touchmove', onIntent, { passive: true })
    window.addEventListener('wheel', onIntent, { passive: true })
    window.addEventListener('scroll', onIntent, { passive: true })
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      window.removeEventListener('touchmove', onIntent)
      window.removeEventListener('wheel', onIntent)
      window.removeEventListener('scroll', onIntent)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${!scrolled && isHome ? styles.dark : ''}`}>
      <Link href="/" className={styles.logo} onClick={close}>StrategySoul</Link>

      <button
        className={`${styles.hamburger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        <li><Link href="/#about" onClick={close}>About</Link></li>
        <li><Link href="/#work" onClick={close}>Work</Link></li>
        <li><Link href="/strategy-breakdowns" onClick={close}>Breakdowns</Link></li>
        <li><Link href="/contact" onClick={close}>Contact</Link></li>
      </ul>
    </nav>
  )
}
