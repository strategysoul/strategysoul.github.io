'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { fireConfetti } from '@/lib/confetti'
import styles from './CommandPalette.module.css'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const [toast, setToast] = useState(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()

  const flash = (msg) => {
    setToast(msg)
    window.clearTimeout(flash._t)
    flash._t = window.setTimeout(() => setToast(null), 3200)
  }

  const goHomeThen = (fn) => {
    if (pathname !== '/') {
      router.push('/')
      window.setTimeout(fn, 600)
    } else fn()
  }

  const toSection = (hash) => {
    goHomeThen(() => { window.location.hash = hash })
  }

  const confetti = () => fireConfetti(90)

  const commands = useMemo(() => [
    { id: 'work', label: 'Selected Work', hint: 'jump', group: 'Navigate', keys: 'projects portfolio case', run: () => toSection('#work') },
    { id: 'about', label: 'About Sweta', hint: 'jump', group: 'Navigate', keys: 'bio story', run: () => toSection('#about') },
    { id: 'journey', label: 'The Journey', hint: 'jump', group: 'Navigate', keys: 'timeline career experience', run: () => toSection('#journey') },
    { id: 'breakdowns', label: 'Strategy Breakdowns', hint: 'page', group: 'Navigate', keys: 'blog writing analysis', run: () => router.push('/strategy-breakdowns') },
    { id: 'contact', label: 'Contact', hint: 'page', group: 'Navigate', keys: 'reach hire email', run: () => router.push('/contact') },
    { id: 'chaos', label: 'Unleash chaos', hint: 'effect', group: 'Run', keys: 'scatter destroy mess', run: () => goHomeThen(() => window.dispatchEvent(new CustomEvent('chaos:unleash'))) },
    { id: 'rain', label: 'Make it rain', hint: 'effect', group: 'Run', keys: 'confetti party celebrate', run: confetti },
    { id: 'email', label: 'Email Sweta', hint: 'external', group: 'Connect', keys: 'mail contact', run: () => { window.location.href = 'mailto:swetakumaripm@gmail.com' } },
    { id: 'linkedin', label: 'LinkedIn', hint: 'external', group: 'Connect', keys: 'social network', run: () => window.open('https://www.linkedin.com/in/swetakumaripm', '_blank') },
    { id: 'whoami', label: 'whoami', hint: 'fun', group: 'Secrets', keys: 'identity', run: () => flash('Sweta Kumari — strategy-driven PM. Ex-engineer. Speaks fluent tech, finance, marketing, and human.') },
    { id: 'hire', label: 'sudo hire sweta', hint: 'fun', group: 'Secrets', keys: 'job recruit offer', run: () => { flash('Permission granted. She turns chaos into roadmaps and ideas into shipped products. Let\'s talk.'); confetti() } },
    { id: 'surprise', label: 'Surprise me', hint: 'fun', group: 'Secrets', keys: 'random', run: () => {
      const fns = [() => goHomeThen(() => window.dispatchEvent(new CustomEvent('chaos:unleash'))), confetti]
      fns[(Math.random() * fns.length) | 0]()
    } },
  ], [pathname])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands
      .map((c) => {
        const hay = (c.label + ' ' + c.keys + ' ' + c.group).toLowerCase()
        const i = hay.indexOf(q)
        return i === -1 ? null : { c, i }
      })
      .filter(Boolean)
      .sort((a, b) => a.i - b.i)
      .map((x) => x.c)
  }, [query, commands])

  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (!open && e.key === '/' ) {
        const tag = document.activeElement?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); setOpen(true) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 20)
      window.dispatchEvent(new CustomEvent('hunt:found', { detail: 'command' }))
    }
  }, [open])

  useEffect(() => { setSel(0) }, [query])

  const run = (cmd) => { if (!cmd) return; setOpen(false); cmd.run() }

  const onInputKey = (e) => {
    if (e.key === 'Escape') { setOpen(false) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % Math.max(filtered.length, 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); run(filtered[sel]) }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${sel}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  let lastGroup = null

  return (
    <>
      <button className={styles.chip} onClick={() => setOpen(true)} aria-label="Open command palette">
        <kbd>⌘</kbd><kbd>K</kbd> <span>run this site</span>
      </button>

      {toast && <div className={styles.toast} role="status">{toast}</div>}

      {open && (
        <div className={styles.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className={styles.palette} role="dialog" aria-modal="true">
            <div className={styles.inputRow}>
              <span className={styles.prompt}>›</span>
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
              />
              <kbd className={styles.esc}>esc</kbd>
            </div>

            <div className={styles.list} ref={listRef}>
              {filtered.length === 0 && <div className={styles.empty}>No matches. Try &ldquo;work&rdquo; or &ldquo;chaos&rdquo;.</div>}
              {filtered.map((c, i) => {
                const showGroup = c.group !== lastGroup
                lastGroup = c.group
                return (
                  <div key={c.id}>
                    {showGroup && <div className={styles.groupLabel}>{c.group}</div>}
                    <button
                      data-idx={i}
                      className={`${styles.item} ${i === sel ? styles.active : ''}`}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => run(c)}
                    >
                      <span className={styles.itemLabel}>{c.label}</span>
                      <span className={styles.itemHint}>{c.hint}</span>
                    </button>
                  </div>
                )
              })}
            </div>

            <div className={styles.footer}>
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
