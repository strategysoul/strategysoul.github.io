'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './StrategySection.module.css'

export default function StrategySection() {
  return (
    <section className={styles.section} id="strategy-breakdowns">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Strategy Breakdowns</span>
          <h2 className={styles.title}>
            I write about strategy the way I think about it: with curiosity, data, and the occasional coffee reference.
          </h2>
          <p className={styles.desc}>
            Deep dives into business strategy, product decisions, and market dynamics. No buzzword soup.
          </p>
          <Link href="/strategy-breakdowns" className={styles.cta}>
            Read the breakdowns →
          </Link>
        </motion.div>

        <motion.div
          className={styles.decoration}
          aria-hidden="true"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className={styles.bigText}>Strategy</span>
        </motion.div>
      </div>
    </section>
  )
}
