'use client'
import { motion } from 'framer-motion'
import styles from './JourneySection.module.css'

const stops = [
  {
    period: 'Jul 2019 – Mar 2022',
    role: 'Software Engineer',
    org: 'Dell Technologies',
    desc: 'Built UI, APIs, and managed databases. Streamlined workflows and bridged gaps between engineering and product.',
  },
  {
    period: 'Apr 2022 – Jul 2023',
    role: 'Product Owner',
    org: 'Dell Technologies',
    desc: 'Led automation initiatives that saved thousands of engineering hours. Recognised by the CIO. The classic "now I\'m responsible for everything" era.',
  },
  {
    period: 'Sep 2023 – May 2025',
    role: 'MBA',
    org: 'HEC Paris · #12 FT Global',
    desc: 'Specialised in Strategic Marketing. Learned how to say "synergies" with a straight face. Also, actually learnt some French.',
  },
  {
    period: 'Jun – Sep 2024',
    role: 'PM Intern',
    org: 'Ayolab · B2B SaaS',
    desc: 'Improved product–market fit, piloted new features, and enhanced user experience at an early-stage startup.',
  },
  {
    period: '2025 – Present',
    role: 'Product Manager',
    org: 'Humai',
    desc: 'Building a voice AI tool for sales reps. Doing all things PM: roadmaps, user research, stakeholder wrangling, and the timeless art of explaining priorities to developers who have different ones.',
  },
]

export default function JourneySection() {
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
          <span className={styles.label}>The Journey</span>
          <h2 className={styles.title}>From code to strategy,<br />via Paris.</h2>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />
          {stops.map((stop, i) => (
            <motion.div
              key={i}
              className={styles.stop}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <div className={styles.dot} aria-hidden="true" />
              <p className={styles.period}>{stop.period}</p>
              <h3 className={styles.role}>{stop.role}</h3>
              <p className={styles.org}>{stop.org}</p>
              <p className={styles.desc}>{stop.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
