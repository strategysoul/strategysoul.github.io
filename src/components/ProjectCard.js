'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ title, teaser, href, image, tag, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
    >
      <Link href={href} className={styles.inner}>
        <div className={styles.imageWrap}>
          <Image
            src={image}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={styles.overlay} aria-hidden="true" />
        </div>
        <div className={styles.body}>
          <span className={styles.tag}>{tag}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.teaser}>{teaser}</p>
          <span className={styles.cta}>Read case study →</span>
        </div>
      </Link>
    </motion.div>
  )
}
