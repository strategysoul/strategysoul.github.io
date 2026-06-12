import styles from './page.module.css'

export const metadata = {
  title: 'Contact | StrategySoul',
  description: 'Get in touch with Sweta Kumari: product manager building voice AI, MBA from HEC Paris.',
}

export default function Contact() {
  return (
    <main className={styles.page}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <span className={styles.label}>Contact</span>
          <h1 className={styles.title}>Have questions? I have answers.</h1>
          <p className={styles.subtitle}>A role, a product problem, or a strong opinion about transcription models. All welcome.</p>
        </div>
      </div>

      <div className={styles.body}>
        <a href="mailto:swetakumaripm@gmail.com" className={styles.card}>
          <span className={styles.cardText}>
            <span className={styles.cardLabel}>Email</span>
            <span className={styles.cardValue}>swetakumaripm@gmail.com</span>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">→</span>
        </a>
        <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer" className={styles.card}>
          <span className={styles.cardText}>
            <span className={styles.cardLabel}>LinkedIn</span>
            <span className={styles.cardValue}>swetakumaripm</span>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  )
}
