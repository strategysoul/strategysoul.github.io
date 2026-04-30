'use client'
import { motion } from 'framer-motion'
import styles from './InterestsSection.module.css'

const interests = [
  { icon: '✍', label: 'Poetry', desc: 'Writing precisely is a skill. Useful in PRDs, even more useful in pitch decks.' },
  { icon: '📖', label: 'Reading', desc: 'Fuels most of my strategic thinking. Also responsible for the commute money I don\'t have.' },
  { icon: '🥋', label: 'Martial Arts', desc: 'Systems thinking in real time. Also useful when roadmaps get derailed.' },
  { icon: '✈', label: 'Travelling', desc: 'The fastest way to understand that your assumptions about people are wrong.' },
  { icon: '🚴', label: 'Cycling', desc: 'Long rides. Good for problems that don\'t have obvious answers yet.' },
  { icon: '🏋', label: 'Fitness', desc: 'Discipline that shows up everywhere else, whether you want it to or not.' },
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
              <p className={styles.itemDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
