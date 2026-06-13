'use client'
import { motion } from 'framer-motion'
import styles from './AboutSection.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <motion.div
          className={styles.label}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.num}>№ 01</span> · About Me
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.pull}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <blockquote className={styles.quote}>
              I build products, analyse businesses, and handle ambiguity. Not because someone told me to, but because{' '}
              <em
                className={styles.chaosTrigger}
                role="button"
                tabIndex={0}
                title="go on, click it"
                onClick={() => window.dispatchEvent(new CustomEvent('chaos:unleash'))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.dispatchEvent(new CustomEvent('chaos:unleash'))
                  }
                }}
              >chaos</em>{' '}
              genuinely excites me.
            </blockquote>
          </motion.div>

          <motion.div
            className={styles.body}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p>Hi, I&apos;m Sweta. A strategy-driven product professional with ~5 years of experience (which is corporate for <em>&ldquo;she&apos;s been doing interesting things for a while.&rdquo;)</em></p>
            <p>I started as a Software Engineer at Dell, where I went from writing APIs and managing databases to owning a global product. I was good at it. Comfortable, even. Which is exactly why I left. Comfortable is a great place to rest, not to grow.</p>
            <p>So I moved to France to pursue an MBA at HEC Paris (because apparently that&apos;s the solution to everything). I specialised in Strategic Marketing, interned as a PM at a B2B SaaS startup, and learned that I could equally enjoy a SWOT analysis and a late espresso in Paris.</p>
            <p>Now I can speak most tech, finance, and marketing jargon, but more importantly, I understand people. And if you&apos;ve ever tried to sell readymade broth to French chefs, you&apos;ll know that&apos;s the harder skill.</p>
            <p>Currently at Humai, building a voice AI tool for sales reps. Early-stage startup, so PM is shorthand for product discovery, GTM, and deciding what &ldquo;done&rdquo; looks like before anyone&apos;s quite agreed on what we&apos;re building. Chaotic, fast, and exactly the kind of problem I like.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
