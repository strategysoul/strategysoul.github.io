'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ChaosMode.module.css'

const SCATTER_SELECTOR = [
  'main h1', 'main h2', 'main h3',
  'main p', 'main blockquote', 'main img', 'main a',
  'main [aria-hidden="true"]',
].join(', ')

export default function ChaosMode() {
  const [active, setActive] = useState(false)
  const activeRef = useRef(false)
  const savedRef = useRef([])

  const scatter = () => {
    if (activeRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll(SCATTER_SELECTOR)
    const rand = (n) => (Math.random() - 0.5) * 2 * n
    savedRef.current = []
    els.forEach((el) => {
      savedRef.current.push([el, el.style.transform, el.style.transition, el.style.transitionDelay])
      if (!reduced) {
        el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        el.style.transitionDelay = `${Math.random() * 0.4}s`
      }
      el.style.transform = `translate(${rand(38)}px, ${rand(30)}px) rotate(${rand(10)}deg)`
    })
    document.body.classList.add('chaos-active')
    document.title = '✳ chaos, currently'
    activeRef.current = true
    setActive(true)
    window.dispatchEvent(new CustomEvent('hunt:found', { detail: 'chaos' }))
  }

  const restore = () => {
    if (!activeRef.current) return
    savedRef.current.forEach(([el, transform]) => {
      el.style.transform = transform
    })
    window.setTimeout(() => {
      savedRef.current.forEach(([el, , transition, delay]) => {
        el.style.transition = transition
        el.style.transitionDelay = delay
      })
      savedRef.current = []
    }, 1300)
    document.body.classList.remove('chaos-active')
    document.title = 'Sweta Kumari | StrategySoul'
    activeRef.current = false
    setActive(false)
  }

  useEffect(() => {
    const onUnleash = () => scatter()
    const onKey = (e) => {
      if (e.key === 'Escape') restore()
    }
    window.addEventListener('chaos:unleash', onUnleash)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('chaos:unleash', onUnleash)
      window.removeEventListener('keydown', onKey)
      restore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!active) return null

  // portal to body: the chaos tilt transform on <main> would otherwise
  // re-anchor position:fixed to <main> and strand the button at page bottom
  return createPortal(
    <button className={styles.restore} onClick={restore}>
      Okay, restore order <span aria-hidden="true">↺</span>
    </button>,
    document.body
  )
}
