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
  // close it if a scroll still sneaks through (e.g. iOS rubber-banding).
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onScroll = () => setOpen(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('scroll', onScroll)
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
