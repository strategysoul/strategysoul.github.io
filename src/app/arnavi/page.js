import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'AR Office Navigator | StrategySoul',
  description: 'AR Office Navigator at Dell: using augmented reality to solve campus wayfinding challenges on a large corporate campus.',
}

export default function ARNavi() {
  return (
    <CaseStudyLayout
      tag="Innovation · Dell Technologies"
      title="The AR Office Navigator"
      date="September 15, 2025"
    >
      <p>The coffee is brewed. It&apos;s just being poured into the right cup.</p>
      <p>This case study is coming soon. Check back in a bit.</p>
      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
