import Link from 'next/link'
import styles from './CaseStudyLayout.module.css'

export default function CaseStudyLayout({ tag, title, date, children }) {
  return (
    <main className={styles.page}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <Link href="/#work" className={styles.back}>← Back to Work</Link>
          {tag && <span className={styles.tag}>{tag}</span>}
          <h1 className={styles.title}>{title}</h1>
          {date && <p className={styles.meta}>{date} · StrategySoul</p>}
        </div>
      </div>

      <div className={styles.body}>
        {children}
      </div>
    </main>
  )
}
