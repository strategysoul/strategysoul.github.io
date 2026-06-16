import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact | StrategySoul',
  description: 'Get in touch with Sweta Kumari: product strategist and MBA graduate from HEC Paris.',
}

export default function Contact() {
  return (
    <main className={styles.page}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <span className={styles.label}>Contact</span>
          <h1 className={styles.title}>Let&apos;s talk.</h1>
          <p className={styles.subtitle}>
            Whether you&apos;re hiring, collaborating, or just want to talk strategy — I&apos;m reachable.
          </p>
          <p className={styles.availability}>
            <span className={styles.dot} aria-hidden="true" />
            Open to product roles and 1–2 advisory engagements.
          </p>
        </div>
      </div>

      <div className={styles.body}>

        {/* Hiring fast-track */}
        <div className={styles.hiringBox}>
          <span className={styles.hiringLabel}>Hiring?</span>
          <p className={styles.hiringPitch}>
            I&apos;m a product manager with a software engineering background and an MBA from HEC Paris.
            I&apos;m open to full-time product roles and select advisory engagements, and I work best at
            early-to-growth-stage companies where product, GTM, and strategy overlap, where figuring out
            what to build matters as much as building it.
          </p>
          <a href="mailto:swetakumaripm@gmail.com?subject=Opportunity" className={styles.hiringCta}>
            Send me a note →
          </a>
        </div>

        <hr className={styles.divider} />

        {/* General contact */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Reach me directly</span>
          <p className={styles.sectionText}>
            Email is the fastest route. LinkedIn works too — I check it regularly.
          </p>
          <div className={styles.links}>
            <a href="mailto:swetakumaripm@gmail.com" className={styles.link}>
              <Image src="/assets/img/gmail.png" alt="" width={18} height={18} />
              swetakumaripm@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer" className={styles.link}>
              <Image src="/assets/img/Linkedin.png" alt="" width={18} height={18} />
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
