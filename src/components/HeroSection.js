'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './HeroSection.module.css'

const ease = [0.22, 1, 0.36, 1]

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.text}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Product · Strategy · People
        </motion.p>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Sweta<br />Kumari
        </motion.h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          I sit at the intersection of tech, strategy, and product.
          I enjoy building things that actually make sense to humans.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          <Link href="/#work" className={styles.ctaPrimary}>View Work</Link>
          <a
            href="https://www.linkedin.com/in/swetakumaripm"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaSecondary}
          >
            <Image src="/assets/img/Linkedin.png" alt="LinkedIn" width={20} height={20} className={styles.socialLogo} />
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.imageWrap}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <Image
          src="/assets/img/Sweta.jpg"
          alt="Sweta Kumari"
          width={280}
          height={373}
          priority
          className={styles.photo}
        />
        <div className={styles.accentBox} aria-hidden="true" />
      </motion.div>
    </section>
  )
}
