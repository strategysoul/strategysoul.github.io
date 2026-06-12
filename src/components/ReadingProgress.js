'use client'
import { useScroll, useSpring, motion } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--accent)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
      }}
    />
  )
}
