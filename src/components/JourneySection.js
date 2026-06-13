'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fireConfetti } from '@/lib/confetti'
import styles from './JourneySection.module.css'

const stops = [
  { period: 'Jul 2019 – Mar 2022', role: 'Software Engineer', org: 'Dell Technologies', place: 'India', glyph: '</>', desc: 'Built UI, APIs, and managed databases. Streamlined workflows and bridged engineering and product.' },
  { period: 'Apr 2022 – Jul 2023', role: 'Product Owner', org: 'Dell Technologies', place: 'India', glyph: '⚙', desc: 'Led automation that saved thousands of engineering hours. Recognised by the CIO. The classic "now I\'m responsible for everything" era.' },
  { period: 'Sep 2023 – May 2025', role: 'MBA', org: 'HEC Paris · #12 FT Global', place: 'Paris', glyph: '✦', desc: 'Specialised in Strategic Marketing. Learned to say "synergies" with a straight face. Also, actually learnt some French.' },
  { period: 'Jun – Sep 2024', role: 'PM Intern', org: 'Ayolab · B2B SaaS', place: 'Paris', glyph: '◆', desc: 'Improved product–market fit, piloted new features, and sharpened the UX at an early-stage startup.' },
  { period: '2025 – Present', role: 'Product Manager', org: 'Humai', place: 'Now', glyph: '✳', desc: 'Building a voice AI tool for sales reps. Roadmaps, user research, stakeholder wrangling, and explaining priorities to developers who have their own.' },
]

// world layout constants (CSS px)
const PW = 230, GAP = 80, RISE = 52, ARC = 96, LEAP_FRAMES = 34

export default function JourneySection() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | playing
  const [idx, setIdx] = useState(0)
  const [showList, setShowList] = useState(false)
  const statusRef = useRef('idle')

  useEffect(() => { statusRef.current = status }, [status])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setShowList(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    let W = 0, H = 0, dpr = 1
    const platforms = stops.map((s, i) => ({
      x0: 70 + i * (PW + GAP),
      w: PW,
      topY: 0, // set on resize (depends on H)
      i, ...s,
    }))
    const worldEnd = platforms[platforms.length - 1].x0 + PW + 220

    const resize = () => {
      W = wrap.clientWidth
      H = wrap.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const base = H - 66
      platforms.forEach((p) => { p.topY = base - p.i * RISE })
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // avatar: rests on platform[cur]; a "leap" arcs it to the next platform
    const cx = (p) => p.x0 + p.w / 2
    const av = { x: cx(platforms[0]), y: 0, r: 13 }
    let cur = 0
    let leap = null // { from, to, t }
    let bob = 0

    const move = (dir) => {
      if (statusRef.current === 'idle') { setStatus('playing'); statusRef.current = 'playing' }
      if (leap) return
      const target = cur + dir
      if (target >= 0 && target < platforms.length) leap = { from: platforms[cur], to: platforms[target], t: 0 }
    }

    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
      else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); move(1) }
    }
    const onPointer = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      move((e.clientX - rect.left) < rect.width * 0.4 ? -1 : 1)
    }
    canvas.addEventListener('keydown', onKey)
    canvas.addEventListener('pointerdown', onPointer)

    let camX = 0
    let raf, last = performance.now()
    const drawRound = (x, y, w, h, r) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 16.67, 2.2)
      last = now

      bob += 0.06 * dt
      if (leap) {
        leap.t += dt / LEAP_FRAMES
        if (leap.t >= 1) {
          leap.t = 1
          cur = leap.to.i
          av.x = cx(leap.to)
          av.y = leap.to.topY - av.r
          leap = null
          setIdx(cur)
          if (cur === platforms.length - 1) fireConfetti(150, 190)
        } else {
          const t = leap.t
          const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
          av.x = leap.from.x0 + leap.from.w / 2 + (cx(leap.to) - cx(leap.from)) * ease
          const baseY = (leap.from.topY + (leap.to.topY - leap.from.topY) * t) - av.r
          av.y = baseY - ARC * 4 * t * (1 - t)
        }
      } else {
        av.x = cx(platforms[cur])
        av.y = platforms[cur].topY - av.r - Math.sin(bob) * 2.5
      }

      // camera
      const targetCam = Math.max(0, Math.min(av.x - W * 0.32, Math.max(0, worldEnd - W)))
      camX += (targetCam - camX) * Math.min(1, 0.12 * dt)

      // ---- draw ----
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(-camX, 0)

      platforms.forEach((p) => {
        const cx = p.x0 + p.w / 2
        // pillar under platform
        ctx.fillStyle = 'rgba(28,22,14,0.06)'
        ctx.fillRect(p.x0 + 6, p.topY + 14, p.w - 12, H)
        // platform slab
        ctx.fillStyle = p.i <= cur ? '#C4622D' : '#1C160E'
        drawRound(p.x0, p.topY, p.w, 14, 4); ctx.fill()

        // token glyph above
        ctx.fillStyle = p.i <= cur ? '#C4622D' : 'rgba(28,22,14,0.35)'
        ctx.font = '600 22px Georgia, serif'
        ctx.textAlign = 'center'
        ctx.fillText(p.glyph, cx, p.topY - 82)

        // role label
        ctx.fillStyle = '#1C160E'
        ctx.font = '600 19px Georgia, serif'
        ctx.fillText(p.role, cx, p.topY - 56)
        ctx.fillStyle = '#C4622D'
        ctx.font = '11px Georgia, serif'
        ctx.fillText(p.period.toUpperCase(), cx, p.topY - 40)

        // flag on the final platform
        if (p.i === platforms.length - 1) {
          ctx.strokeStyle = '#1C160E'; ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(p.x0 + p.w - 22, p.topY); ctx.lineTo(p.x0 + p.w - 22, p.topY - 30); ctx.stroke()
          ctx.fillStyle = '#C4622D'
          ctx.beginPath(); ctx.moveTo(p.x0 + p.w - 22, p.topY - 30); ctx.lineTo(p.x0 + p.w, p.topY - 24); ctx.lineTo(p.x0 + p.w - 22, p.topY - 18); ctx.closePath(); ctx.fill()
        }
      })

      // avatar
      ctx.fillStyle = '#C4622D'
      ctx.beginPath(); ctx.arc(av.x, av.y, av.r, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#FAF8F4'
      ctx.beginPath(); ctx.arc(av.x + 4, av.y - 3, 2.4, 0, Math.PI * 2); ctx.fill()

      ctx.restore()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const cur = stops[idx]
  const atEnd = idx === stops.length - 1

  return (
    <section className={styles.section} id="journey">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className={styles.label}><span className={styles.num}>№ 02</span> · The Journey</span>
          <h2 className={styles.title}>Play it. From code<br />to strategy, via <em>Paris</em>.</h2>
          <span className={styles.ghostNum} aria-hidden="true">02</span>
        </motion.div>

        {!showList && (
          <div className={styles.game} data-status={status}>
            <div className={styles.stageWrap} ref={wrapRef}>
              <canvas ref={canvasRef} className={styles.canvas} tabIndex={0} aria-label="Playable career timeline. Use left and right arrows, or tap the sides, to move between roles." />
              {status === 'idle' && (
                <button
                  className={styles.startOverlay}
                  onClick={() => { setStatus('playing'); canvasRef.current?.focus() }}
                >
                  <span className={styles.playIcon}>▶</span>
                  <span className={styles.startText}>Play her career</span>
                  <span className={styles.startHint}>← → arrows, or tap the sides</span>
                </button>
              )}
              {status === 'playing' && atEnd && (
                <div className={styles.doneBadge}>✦ You reached <em>Now</em>.</div>
              )}
            </div>

            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span className={styles.panelStep}>Stop {idx + 1} / {stops.length}</span>
                <span className={styles.panelPlace}>{cur.place}</span>
              </div>
              <h3 className={styles.panelRole}>{cur.role}</h3>
              <p className={styles.panelOrg}>{cur.org} · {cur.period}</p>
              <p className={styles.panelDesc}>{cur.desc}</p>
              {atEnd ? (
                <p className={styles.panelHint}>That&apos;s the whole run. Hop back with ← anytime. Curious what&apos;s next? Let&apos;s talk.</p>
              ) : (
                <p className={styles.panelHint}>↳ use ← → arrows, or tap the sides of the stage, to move</p>
              )}
              <button className={styles.readToggle} onClick={() => setShowList(true)}>Prefer to read? View the timeline →</button>
            </div>
          </div>
        )}

        {showList && (
          <div className={styles.list}>
            {stops.map((s, i) => (
              <div key={i} className={styles.listItem}>
                <span className={styles.listGlyph} aria-hidden="true">{s.glyph}</span>
                <div>
                  <p className={styles.period}>{s.period} · {s.place}</p>
                  <h3 className={styles.role}>{s.role}</h3>
                  <p className={styles.org}>{s.org}</p>
                  <p className={styles.desc}>{s.desc}</p>
                </div>
              </div>
            ))}
            <button className={styles.readToggle} onClick={() => setShowList(false)}>← Back to play mode</button>
          </div>
        )}
      </div>
    </section>
  )
}
