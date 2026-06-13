'use client'
import { useEffect, useRef } from 'react'
import styles from './ArtPlayground.module.css'

const PALETTE = ['#C4622D', '#E0834A', '#FAF8F4', '#C4622D']
const TYPES = ['ring', 'dot', 'star', 'square', 'ring', 'star']

export default function ArtPlayground() {
  const canvasRef = useRef(null)
  const hintRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const hero = canvas?.parentElement
    if (!canvas || !hero || !fine || reduced) return

    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, dpr = 1
    const rand = (a, b) => a + Math.random() * (b - a)
    const pick = (a) => a[(Math.random() * a.length) | 0]

    // Play zone: right-of-centre band, away from the text and the face
    const zone = () => ({ x0: W * 0.5, y0: H * 0.08, x1: W * 0.99, y1: H * 0.95 })

    const bodies = []
    const seed = () => {
      const z = zone()
      bodies.length = 0
      const n = 11
      for (let i = 0; i < n; i++) {
        const r = rand(13, 30)
        bodies.push({
          x: rand(z.x0 + r, z.x1 - r),
          y: rand(z.y0 + r, z.y1 - r),
          r,
          vx: rand(-0.4, 0.4),
          vy: rand(-0.4, 0.4),
          rot: rand(0, Math.PI * 2),
          spin: rand(-0.02, 0.02),
          type: pick(TYPES),
          color: pick(PALETTE),
        })
      }
    }

    const resize = () => {
      const prevW = W, prevH = H
      W = hero.clientWidth
      H = hero.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!bodies.length) seed()
      else if (prevW && prevH) {
        const sx = W / prevW, sy = H / prevH
        bodies.forEach((b) => { b.x *= sx; b.y *= sy })
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(hero)

    // ---- interaction ----
    let drag = null, px = 0, py = 0, interacted = false
    const local = (e) => {
      const rect = hero.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onDown = (e) => {
      const p = local(e)
      let hit = null
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i]
        const d = Math.hypot(p.x - b.x, p.y - b.y)
        if (d <= b.r + 8) { hit = b; break }
      }
      if (!hit) return
      e.preventDefault()
      drag = hit; px = p.x; py = p.y
      document.body.style.userSelect = 'none'
      window.getSelection()?.removeAllRanges()
      if (!interacted) {
        interacted = true
        if (hintRef.current) hintRef.current.style.opacity = '0'
      }
    }
    const onMove = (e) => {
      if (!drag) return
      const p = local(e)
      drag.vx = (p.x - px) * 0.55
      drag.vy = (p.y - py) * 0.55
      drag.x = p.x; drag.y = p.y
      px = p.x; py = p.y
    }
    const onUp = () => {
      if (!drag) return
      const cap = 22
      drag.vx = Math.max(-cap, Math.min(cap, drag.vx))
      drag.vy = Math.max(-cap, Math.min(cap, drag.vy))
      drag = null
      document.body.style.userSelect = ''
      window.dispatchEvent(new CustomEvent('hunt:found', { detail: 'kinetic' }))
    }
    window.addEventListener('pointerdown', onDown, { passive: false })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })

    // ---- physics (zero gravity, gentle perpetual drift) ----
    const REST = 0.86
    const step = () => {
      const z = zone()
      for (const b of bodies) {
        if (b === drag) { b.rot += b.spin; continue }
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.992
        b.vy *= 0.992
        b.rot += b.spin
        // keep the mobile alive: nudge anything that stalls
        const sp = Math.hypot(b.vx, b.vy)
        if (sp < 0.12) { b.vx += rand(-0.18, 0.18); b.vy += rand(-0.18, 0.18) }
        // walls
        if (b.x - b.r < z.x0) { b.x = z.x0 + b.r; b.vx = Math.abs(b.vx) * REST }
        if (b.x + b.r > z.x1) { b.x = z.x1 - b.r; b.vx = -Math.abs(b.vx) * REST }
        if (b.y - b.r < z.y0) { b.y = z.y0 + b.r; b.vy = Math.abs(b.vy) * REST }
        if (b.y + b.r > z.y1) { b.y = z.y1 - b.r; b.vy = -Math.abs(b.vy) * REST }
      }
      // collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j]
          const dx = b.x - a.x, dy = b.y - a.y
          let d = Math.hypot(dx, dy)
          const min = a.r + b.r
          if (d > 0 && d < min) {
            const nx = dx / d, ny = dy / d
            const overlap = (min - d) / 2
            if (a !== drag) { a.x -= nx * overlap; a.y -= ny * overlap }
            if (b !== drag) { b.x += nx * overlap; b.y += ny * overlap }
            const rvx = b.vx - a.vx, rvy = b.vy - a.vy
            const vn = rvx * nx + rvy * ny
            if (vn < 0) {
              const imp = -(1 + REST) * vn / 2
              if (a !== drag) { a.vx -= imp * nx; a.vy -= imp * ny }
              if (b !== drag) { b.vx += imp * nx; b.vy += imp * ny }
            }
          }
        }
      }
    }

    const drawBody = (b) => {
      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(b.rot)
      ctx.strokeStyle = b.color
      ctx.fillStyle = b.color
      ctx.lineWidth = 1.8
      ctx.globalAlpha = 0.95
      const s = b.r
      switch (b.type) {
        case 'dot':
          ctx.beginPath(); ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2); ctx.fill(); break
        case 'square':
          ctx.strokeRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24); break
        case 'star':
          ctx.font = `${s * 2.1}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('✳', 0, 0); break
        case 'ring':
        default:
          ctx.beginPath(); ctx.arc(0, 0, s * 0.78, 0, Math.PI * 2); ctx.stroke(); break
      }
      ctx.restore()
    }

    const drawLinks = () => {
      ctx.lineWidth = 1
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j]
          const d = Math.hypot(b.x - a.x, b.y - a.y)
          if (d < 160) {
            ctx.globalAlpha = (1 - d / 160) * 0.28
            ctx.strokeStyle = '#C4622D'
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    let raf
    const frame = () => {
      step()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawLinks()
      for (const b of bodies) drawBody(b)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.style.userSelect = ''
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span ref={hintRef} className={styles.hint} aria-hidden="true">↯ grab the shapes</span>
    </>
  )
}
