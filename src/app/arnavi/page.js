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
    >
      <p>Dell&apos;s campus is genuinely huge. Big enough that finding a specific conference room or a colleague&apos;s desk was a small daily tax on everyone&apos;s time, and new joiners felt it most.</p>
      <p>Our team decided this was the perfect excuse to experiment with augmented reality. The idea behind the AR Office Navigator: point your phone down a corridor and get directions overlaid on what the camera sees, instead of squinting at a static floor map and rotating it in your head.</p>
      <p>It was an innovation project, which is corporate for tight timelines, scrappy prototyping, and learning on the fly. What worked, what absolutely did not, and what a side project like this teaches you about scoping is all part of the full story.</p>
      <p><strong>The full write-up is in progress.</strong> Curious in the meantime? <a href="mailto:swetakumaripm@gmail.com">Ask me about it</a>.</p>
      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
