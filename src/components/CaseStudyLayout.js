import Link from 'next/link'
import ReadingProgress from './ReadingProgress'
import NextRead from './NextRead'
import EmailCapture from './EmailCapture'
import ShareButtons from './ShareButtons'
import styles from './CaseStudyLayout.module.css'

export default function CaseStudyLayout({
  tag, title, date, readTime, children,
  bottomLine, nextRead,
  backHref = '/#work', backLabel = '← Back to Work',
}) {
  return (
    <main className={styles.page}>
      <ReadingProgress />

      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <Link href={backHref} className={styles.back}>{backLabel}</Link>
          {tag && <span className={styles.tag}>{tag}</span>}
          <h1 className={styles.title}>{title}</h1>
          {(date || readTime) && (
            <p className={styles.meta}>
              {date && <span>{date} · StrategySoul</span>}
              {readTime && <span className={styles.readTime}>{readTime}</span>}
            </p>
          )}
        </div>
      </div>

      <div className={styles.body}>
        {children}

        {bottomLine && (
          <div className={styles.bottomLine}>
            <span className={styles.bottomLineLabel}>The bottom line</span>
            <p>{bottomLine}</p>
          </div>
        )}

        <ShareButtons />

        {nextRead && <NextRead {...nextRead} />}

        <EmailCapture />

        <Link href={backHref} className={styles.returnLink}>{backLabel}</Link>
      </div>
    </main>
  )
}
