'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ArtPlayground from './ArtPlayground'
import styles from './HeroSection.module.css'

const ease = [0.22, 1, 0.36, 1]

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <ArtPlayground />
      <div className={styles.text}>
        <motion.p
          className={styles.availability}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className={styles.dot} aria-hidden="true" />
          Open to product roles &amp; select advisory work
        </motion.p>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Sweta
          <span className={styles.nameOutline}>Kumari</span>
        </motion.h1>

        <motion.p
          className={styles.positioning}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          Product Manager building <em className={styles.positioningAccent}>0-to-1 voice AI</em>.
          Engineer turned strategist, shipping things that make sense to humans.
        </motion.p>

        <motion.ul
          className={styles.cred}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <li className={styles.credItem}>ex-Dell</li>
          <li className={styles.credItem}>MBA, HEC Paris</li>
          <li className={styles.credItem}>PM @ Humai</li>
        </motion.ul>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <Link href="/#work" className={styles.ctaPrimary}>View Work</Link>
          <Link href="/contact" className={styles.ctaSecondary}>Get in touch ↗</Link>
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
        <div className={styles.ring} aria-hidden="true" />
        <span className={styles.star} aria-hidden="true">✳</span>
        <div className={styles.dotGrid} aria-hidden="true" />
      </motion.div>
    </section>
  )
}
