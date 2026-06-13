'use client'
import { useEffect, useRef, useState } from 'react'
import { fireConfetti } from '@/lib/confetti'
import styles from './CuriosityHunt.module.css'

const SECRETS = ['kinetic', 'chaos', 'command']
const TOTAL = SECRETS.length
const STORE = 'curiosity-hunt'

export default function CuriosityHunt() {
  const [found, setFound] = useState(() => new Set())
  const [showCard, setShowCard] = useState(false)
  const [pulse, setPulse] = useState(false)
  const celebratedRef = useRef(false)
  const firstPersist = useRef(true)

  // hydrate from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || '{}')
      if (Array.isArray(saved.found)) setFound(new Set(saved.found.filter((k) => SECRETS.includes(k))))
      if (saved.celebrated) celebratedRef.current = true
    } catch {}
  }, [])

  useEffect(() => {
    const onFound = (e) => {
      const key = e.detail
      if (!SECRETS.includes(key)) return
      setFound((prev) => {
        if (prev.has(key)) return prev
        const next = new Set(prev)
        next.add(key)
        setPulse(true)
        window.setTimeout(() => setPulse(false), 600)
        return next
      })
    }
    window.addEventListener('hunt:found', onFound)
    return () => window.removeEventListener('hunt:found', onFound)
  }, [])

  // persist + trigger celebration on completion
  useEffect(() => {
    // skip the initial mount write so it can't clobber hydrated progress
    if (firstPersist.current) { firstPersist.current = false; return }

    const complete = found.size >= TOTAL
    try {
      localStorage.setItem(STORE, JSON.stringify({
        found: [...found],
        celebrated: celebratedRef.current || complete,
      }))
    } catch {}

    if (complete && !celebratedRef.current) {
      celebratedRef.current = true
      window.setTimeout(() => {
        setShowCard(true)
        fireConfetti(180, 200)
      }, 500)
    }
  }, [found])

  const count = found.size
  const complete = count >= TOTAL
  const reopen = () => { setShowCard(true); fireConfetti(160, 180) }

  return (
    <>
      {count > 0 && (
        <button
          className={`${styles.badge} ${pulse ? styles.pulse : ''} ${complete ? styles.done : ''}`}
          onClick={complete ? reopen : undefined}
          aria-label={complete ? 'You found every secret' : `${count} of ${TOTAL} secrets found`}
          title={complete ? 'You found everything' : 'Keep exploring — there is more'}
        >
          <span className={styles.spark}>✦</span>
          {complete ? (
            <span>you found them all</span>
          ) : (
            <span>secrets · {count}/{TOTAL}</span>
          )}
        </button>
      )}

      {showCard && (
        <div className={styles.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) setShowCard(false) }}>
          <div className={styles.card} role="dialog" aria-modal="true">
            <span className={styles.kicker}>✦ you found everything ✦</span>
            <h2 className={styles.title}>You actually went looking.</h2>
            <p className={styles.body}>
              Most people scroll, screenshot, and bounce. You poked at every corner of this
              page, flung the shapes, broke it on purpose, ran the whole thing from a
              command line.
            </p>
            <p className={styles.body}>
              That curiosity is the actual job: turning &ldquo;what if&rdquo; into something
              shipped. If you are hiring for that, you already know we should talk.
            </p>
            <p className={styles.sign}>with a smile,<br /><span>Sweta</span></p>
            <div className={styles.actions}>
              <a className={styles.primary} href="mailto:swetakumaripm@gmail.com">Say hello ↗</a>
              <button className={styles.secondary} onClick={() => setShowCard(false)}>Keep exploring</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
