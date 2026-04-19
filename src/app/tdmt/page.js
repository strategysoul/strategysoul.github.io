import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Test Data Management Tool | StrategySoul',
  description: 'Launching the Test Data Management Tool at Dell: how automation and change management drove efficiency across 10,000+ SKUs a month.',
}

export default function TDMT() {
  return (
    <CaseStudyLayout
      tag="Product · Dell Technologies"
      title="The Test Data Management Tool"
      date="September 15, 2025"
    >
      <p>The coffee is brewed. It&apos;s just being poured into the right cup.</p>
      <p>This case study is coming soon. Check back in a bit.</p>
      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
