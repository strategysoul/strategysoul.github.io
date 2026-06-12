import Link from 'next/link'
import styles from './NextRead.module.css'

export default function NextRead({ title, teaser, href, tag }) {
  if (!href) return null
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Read next</span>
      <Link href={href} className={styles.card}>
        <div className={styles.content}>
          {tag && <span className={styles.tag}>{tag}</span>}
          <p className={styles.title}>{title}</p>
          {teaser && <p className={styles.teaser}>{teaser}</p>}
        </div>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
