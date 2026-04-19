'use client'
import { motion } from 'framer-motion'
import styles from './InterestsSection.module.css'

const interests = [
  { icon: '✈', label: 'Travelling' },
  { icon: '📖', label: 'Reading' },
  { icon: '✍', label: 'Poetry' },
  { icon: '🚴', label: 'Cycling' },
  { icon: '🏋', label: 'Fitness' },
  { icon: '🥋', label: 'Martial Arts' },
]

export default function InterestsSection() {
  return (
    <section className={styles.section} id="interests">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Beyond Work</span>
          <h2 className={styles.title}>Things that keep me sane<br />(and occasionally tired).</h2>
        </motion.div>

        <div className={styles.grid}>
          {interests.map((item, i) => (
            <motion.div
              key={item.label}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <span className={styles.icon} aria-hidden="true">{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
