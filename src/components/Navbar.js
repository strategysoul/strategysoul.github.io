'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
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
        <li><Link href="/#strategy-breakdowns" onClick={close}>Breakdowns</Link></li>
        <li><Link href="/contact" onClick={close}>Contact</Link></li>
      </ul>
    </nav>
  )
}
