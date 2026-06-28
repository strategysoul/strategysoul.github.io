'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './MapSection.module.css'

// chronological career stops, mapped onto real cities
const STOPS = [
  { city: 'Bhubaneswar', country: 'India', cc: 'in', lat: 20.30, lon: 85.82, glyph: '✶', role: 'B.Tech', org: 'Undergraduate', period: '2015 – 2019', desc: 'Where it started. Four years of engineering, and the first taste of building things that actually run.' },
  { city: 'Bengaluru', country: 'India', cc: 'in', lat: 12.97, lon: 77.59, glyph: '</>', role: 'Software Engineer', org: 'Dell Technologies', period: 'Jul 2019 – Mar 2022', desc: 'Built UI, APIs, and managed databases. Streamlined workflows and bridged engineering and product.' },
  { city: 'Hyderabad', country: 'India', cc: 'in', lat: 17.39, lon: 78.49, glyph: '⚙', role: 'Product Owner', org: 'Dell Technologies', period: 'Apr 2022 – Jul 2023', desc: 'Led automation that saved thousands of engineering hours. Recognised by the CIO. The classic "now I\'m responsible for everything" era.' },
  { city: 'Paris', country: 'France', cc: 'fr', lat: 48.86, lon: 2.35, glyph: '✦', role: 'MBA', org: 'HEC Paris · #12 FT Global', period: 'Sep 2023 – May 2025', desc: 'Specialised in Strategic Marketing. Learned to say "synergies" with a straight face. Also, actually learnt some French.' },
  { city: 'Paris', country: 'France', cc: 'fr', lat: 48.86, lon: 2.35, glyph: '◆', role: 'PM Intern', org: 'Ayolab · B2B SaaS', period: 'Jun – Sep 2024', desc: 'Improved product-market fit, piloted new features, and sharpened the UX at an early-stage startup.' },
  { city: 'Dubai', country: 'UAE', cc: 'ae', lat: 25.20, lon: 55.27, glyph: '✳', role: 'Product Manager', org: 'Humai', period: '2025 – Present', desc: 'Building a voice AI tool for sales reps. Roadmaps, user research, stakeholder wrangling, and explaining priorities to developers who have their own.' },
]

// unique cities in order of first appearance (Paris hosts two stops)
const CITIES = []
const cityFirstIdx = {}
STOPS.forEach((s, i) => {
  if (!(s.city in cityFirstIdx)) {
    cityFirstIdx[s.city] = i
    CITIES.push({ city: s.city, country: s.country, cc: s.cc, lat: s.lat, lon: s.lon })
  }
})

// stop indices grouped by country, in order
const COUNTRY_STOPS = STOPS.reduce((m, s, i) => { (m[s.cc] = m[s.cc] || []).push(i); return m }, {})
const COUNTRY_IDS = ['in', 'fr', 'ae']

// approximate geographic bounds of each highlighted country path, used to
// place cities linearly inside the country's rendered bounding box
const GEO = {
  in: { lonMin: 68.1, lonMax: 97.4, latMin: 6.8, latMax: 35.5 },
  fr: { lonMin: -5.2, lonMax: 9.6, latMin: 41.3, latMax: 51.1 },
  ae: { lonMin: 51.0, lonMax: 56.4, latMin: 22.6, latMax: 26.1 },
}

const WORLD_VB = [0, 0, 1010, 666]
const ASPECT = 1010 / 666

function fitViewBox(box) {
  const PAD = 0.35
  let w = box.w * (1 + PAD * 2)
  let h = box.h * (1 + PAD * 2)
  if (w / h < ASPECT) w = h * ASPECT
  else h = w / ASPECT
  const cx = box.x + box.w / 2
  const cy = box.y + box.h / 2
  return [cx - w / 2, cy - h / 2, w, h]
}

const stats = [
  { n: '5', label: 'cities' },
  { n: '3', label: 'countries' },
  { n: '2', label: 'continents' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function MapSection() {
  const baseRef = useRef(null)
  const [boxes, setBoxes] = useState(null) // { in:{x,y,w,h}, fr:..., ae:... }
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('idle') // idle | touring | done
  const [showList, setShowList] = useState(false)
  const [view, setView] = useState('world') // world | in | fr | ae
  const [vb, setVb] = useState(WORLD_VB)
  const [svgText, setSvgText] = useState(null)
  const phaseRef = useRef('idle')
  const vbRef = useRef(vb)
  const tweenRef = useRef(0)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { vbRef.current = vb }, [vb])

  // reduced motion: skip the tour, present the readable timeline
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowList(true)
      setPhase('done')
    }
  }, [])

  const goCountry = (cc, stop) => {
    setPhase('done')
    setView(cc)
    setIdx(stop != null ? stop : COUNTRY_STOPS[cc][0])
  }
  const goWorld = () => setView('world')

  // fetch the world map markup once and cache it
  useEffect(() => {
    let cancelled = false
    fetch('/world-map.svg')
      .then((r) => r.text())
      .then((txt) => { if (!cancelled) setSvgText(txt) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // (re)inject + measure whenever the map is visible. The map div unmounts when
  // the timeline list is shown, so this re-runs and rebuilds it on the way back.
  useEffect(() => {
    if (showList || !svgText) return
    const host = baseRef.current
    if (!host || host.querySelector('svg')) return
    host.innerHTML = svgText
    const svg = host.querySelector('svg')
    if (!svg) return
    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('viewBox', vbRef.current.join(' '))
    svg.classList.add(styles.worldSvg)

    const b = {}
    COUNTRY_IDS.forEach((id) => {
      const el = svg.getElementById(id)
      if (!el) return
      el.classList.add(styles.hi)
      el.style.cursor = 'pointer'
      el.addEventListener('click', () => { setPhase('done'); setView(id); setIdx(COUNTRY_STOPS[id][0]) })
      const r = el.getBBox()
      b[id] = { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    if (Object.keys(b).length === 3) setBoxes(b)
  }, [showList, svgText])

  // city -> {x,y} in the 1010x666 map space
  const cityPos = useMemo(() => {
    if (!boxes) return null
    const out = {}
    CITIES.forEach((c) => {
      const box = boxes[c.cc]
      const g = GEO[c.cc]
      if (!box || !g) return
      out[c.city] = {
        x: box.x + ((c.lon - g.lonMin) / (g.lonMax - g.lonMin)) * box.w,
        y: box.y + ((g.latMax - c.lat) / (g.latMax - g.latMin)) * box.h,
      }
    })
    return out
  }, [boxes])

  const route = useMemo(() => {
    if (!cityPos) return null
    const p = CITIES.map((c) => cityPos[c.city]).filter(Boolean)
    if (p.length < 2) return null
    let d = `M ${p[0].x} ${p[0].y}`
    for (let i = 1; i < p.length; i++) {
      const a = p[i - 1], b = p[i]
      const bow = Math.min(Math.hypot(b.x - a.x, b.y - a.y) * 0.22, 70)
      d += ` Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - bow} ${b.x} ${b.y}`
    }
    return d
  }, [cityPos])

  // tween the shared viewBox whenever the view changes
  useEffect(() => {
    if (!boxes) return
    const target = view === 'world' ? WORLD_VB : fitViewBox(boxes[view])
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVb(target); return }
    const start = vbRef.current.slice()
    const t0 = performance.now()
    const DUR = 620
    cancelAnimationFrame(tweenRef.current)
    const step = (now) => {
      const p = Math.min(1, (now - t0) / DUR)
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      setVb(target.map((tv, i) => start[i] + (tv - start[i]) * e))
      if (p < 1) tweenRef.current = requestAnimationFrame(step)
    }
    tweenRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(tweenRef.current)
  }, [view, boxes])

  // mirror the viewBox onto the injected base map
  useEffect(() => {
    const svg = baseRef.current && baseRef.current.querySelector('svg')
    if (svg) svg.setAttribute('viewBox', vb.join(' '))
  }, [vb])

  // auto-tour: advance one stop at a time while touring (world view only)
  useEffect(() => {
    if (phase !== 'touring') return
    if (idx >= STOPS.length - 1) { setPhase('done'); return }
    const t = setTimeout(() => setIdx((i) => i + 1), 1300)
    return () => clearTimeout(t)
  }, [phase, idx])

  const startTour = () => {
    if (phaseRef.current === 'idle') { setIdx(0); setPhase('touring') }
  }
  // navigate the whole journey; when zoomed in, follow the active stop across
  // borders so Next/Prev zoom out of one country and into the next
  const navigate = (i) => {
    const ni = Math.max(0, Math.min(STOPS.length - 1, i))
    setPhase('done')
    setIdx(ni)
    if (view !== 'world') setView(STOPS[ni].cc)
  }
  const select = navigate
  const stepBy = (d) => navigate(idx + d)
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1) }
  }

  const cur = STOPS[idx]
  const active = cityPos ? cityPos[cur.city] : null
  const k = vb[2] / 1010 // counter-scale factor: keep dots/labels constant on screen

  return (
    <section className={styles.section} id="map">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className={styles.label}><span className={styles.num}>№ 02</span> · The Journey</span>
          <span className={styles.ghostNum} aria-hidden="true">02</span>
        </motion.div>

        {!showList && (
          <>
            <motion.div
              className={styles.game}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              onViewportEnter={startTour}
            >
              <div className={styles.mapPane} tabIndex={0} onKeyDown={onKey} aria-label="Career map. Use left and right arrow keys to move between stops, or click a country to zoom in.">
                <div className={styles.mapWrap}>
                  <div ref={baseRef} className={styles.base} />

                  {route && active && (
                    <svg className={styles.overlay} viewBox={vb.join(' ')} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <motion.path
                        d={route}
                        className={styles.route}
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      />

                      {CITIES.map((c) => {
                        const p = cityPos[c.city]
                        if (!p) return null
                        const on = c.city === cur.city
                        return (
                          <g
                            key={c.city}
                            className={`${styles.pin} ${on ? styles.pinActive : ''}`}
                            transform={`translate(${p.x} ${p.y})`}
                            role="button"
                            tabIndex={0}
                            aria-label={`${c.city}, ${c.country}`}
                            onClick={() => (view === 'world' ? goCountry(c.cc, cityFirstIdx[c.city]) : select(cityFirstIdx[c.city]))}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); view === 'world' ? goCountry(c.cc, cityFirstIdx[c.city]) : select(cityFirstIdx[c.city]) } }}
                          >
                            <circle className={styles.pinDot} r={4.5 * k} />
                            {view === 'world' && (
                              <text className={styles.pinLabel} vectorEffect="non-scaling-stroke" style={{ fontSize: 15 * k }} x="0" y={-13 * k} textAnchor="middle">{c.city}</text>
                            )}
                          </g>
                        )
                      })}

                      {/* on-map annotations for the zoomed country */}
                      {view !== 'world' && CITIES.filter((c) => c.cc === view).map((c) => {
                        const p = cityPos[c.city]
                        if (!p) return null
                        const here = COUNTRY_STOPS[view].map((i) => STOPS[i]).filter((s) => s.city === c.city)
                        return (
                          <g key={`anno-${c.city}`} transform={`translate(${p.x} ${p.y})`} style={{ pointerEvents: 'none' }}>
                            <text className={styles.annoCity} vectorEffect="non-scaling-stroke" style={{ fontSize: 16 * k }} y={-11 * k} textAnchor="middle">{c.city}</text>
                            {here.map((s, j) => (
                              <text key={j} className={styles.annoLine} vectorEffect="non-scaling-stroke" style={{ fontSize: 11.5 * k }} y={(13 + j * 14) * k} textAnchor="middle">{s.role} · {s.org}</text>
                            ))}
                          </g>
                        )
                      })}

                      {/* pulse + traveller ride to the active city */}
                      <motion.circle
                        className={styles.pulse}
                        r={13 * k}
                        initial={{ cx: active.x, cy: active.y }}
                        animate={{ cx: active.x, cy: active.y }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      />
                      <motion.circle
                        className={styles.traveller}
                        r={7 * k}
                        vectorEffect="non-scaling-stroke"
                        initial={{ cx: active.x, cy: active.y }}
                        animate={{ cx: active.x, cy: active.y }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      />
                    </svg>
                  )}

                  {view !== 'world' && (
                    <button className={styles.backBtn} onClick={goWorld}>← World</button>
                  )}
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelTop}>
                  <span className={styles.panelStep}>Stop {idx + 1} / {STOPS.length}</span>
                  <span className={styles.panelPlace}>{cur.city}, {cur.country}</span>
                </div>
                <h3 className={styles.panelRole}>{cur.role}</h3>
                <p className={styles.panelOrg}>{cur.org} · {cur.period}</p>
                <p className={styles.panelDesc}>{cur.desc}</p>

                <p className={styles.hint}>{view === 'world' ? '↳ click a country to zoom in' : '↳ exploring ' + cur.country}</p>

                <div className={styles.controls}>
                  <button className={styles.navBtn} onClick={() => stepBy(-1)} disabled={idx === 0} aria-label="Previous stop">←</button>
                  <span className={styles.dots} aria-hidden="true">
                    {STOPS.map((s, i) => (
                      <button key={i} className={`${styles.dot} ${i === idx ? styles.dotOn : ''}`} onClick={() => navigate(i)} tabIndex={-1} />
                    ))}
                  </span>
                  <button className={styles.navBtn} onClick={() => stepBy(1)} disabled={idx === STOPS.length - 1} aria-label="Next stop">→</button>
                </div>

                <button className={styles.readToggle} onClick={() => { setView('world'); setShowList(true) }}>Prefer to read? View the timeline →</button>
              </div>
            </motion.div>

            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNum}>{s.n}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {showList && (
          <div className={styles.list}>
            {STOPS.map((s, i) => (
              <div key={i} className={styles.listItem}>
                <span className={styles.listGlyph} aria-hidden="true">{s.glyph}</span>
                <div>
                  <p className={styles.period}>{s.period} · {s.city}, {s.country}</p>
                  <h3 className={styles.role}>{s.role}</h3>
                  <p className={styles.org}>{s.org}</p>
                  <p className={styles.desc}>{s.desc}</p>
                </div>
              </div>
            ))}
            <button className={styles.readToggle} onClick={() => setShowList(false)}>← Back to the map</button>
          </div>
        )}

        <motion.p
          className={styles.closer}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          A new country, a new language, a new region: I&apos;ve started over and found my feet each time.
        </motion.p>
      </div>
    </section>
  )
}
