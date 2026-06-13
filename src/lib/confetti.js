const COLORS = ['#C4622D', '#E0834A', '#FAF8F4']
const GLYPHS = ['✳', '●', '◆', '■', '▲']

// Full-width celebratory rain of little Bauhaus shapes.
export function fireConfetti(count = 90, frames = 150) {
  if (typeof window === 'undefined') return
  const c = document.createElement('canvas')
  Object.assign(c.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '3000',
  })
  document.body.appendChild(c)
  const ctx = c.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = window.innerWidth * dpr
  c.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const P = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.6,
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 5,
    g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
    col: COLORS[(Math.random() * COLORS.length) | 0],
    s: 10 + Math.random() * 16,
    rot: Math.random() * 6,
    spin: (Math.random() - 0.5) * 0.3,
  }))

  let f = 0
  const tick = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    P.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rot += p.spin
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.fillStyle = p.col; ctx.font = `${p.s}px serif`; ctx.textAlign = 'center'
      ctx.fillText(p.g, 0, 0); ctx.restore()
    })
    if (++f < frames) requestAnimationFrame(tick)
    else c.remove()
  }
  tick()
}
