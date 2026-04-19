import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.cta}>Let&apos;s build something worth talking about.</p>
      <div className={styles.links}>
        <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="LinkedIn">
          <Image src="/assets/img/Linkedin.png" alt="LinkedIn" width={32} height={32} />
        </a>
        <a href="mailto:swetakumaripm@gmail.com" className={styles.iconLink} aria-label="Email">
          <Image src="/assets/img/gmail.png" alt="Email" width={32} height={32} />
        </a>
      </div>
      <p className={styles.copy}>&copy; {new Date().getFullYear()} Sweta Kumari · StrategySoul</p>
    </footer>
  )
}
