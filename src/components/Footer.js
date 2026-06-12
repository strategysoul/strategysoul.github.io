import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.cta}>Let&apos;s build something<br />worth talking about.</p>
        <a href="mailto:swetakumaripm@gmail.com" className={styles.email}>swetakumaripm@gmail.com</a>
        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} Sweta Kumari · StrategySoul</p>
          <div className={styles.links}>
            <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer" className={styles.link}>LinkedIn ↗</a>
            <a href="mailto:swetakumaripm@gmail.com" className={styles.link}>Email ↗</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
