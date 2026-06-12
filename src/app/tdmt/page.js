import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Test Data Management Tool | StrategySoul',
  description: 'Launching the Test Data Management Tool at Dell: how automation and change management drove efficiency across 12,000 SKUs a month.',
}

export default function TDMT() {
  return (
    <CaseStudyLayout
      tag="Product · Dell Technologies"
      title="The Test Data Management Tool"
    >
      <p>Dell tests around 12,000 SKUs every month before they reach customers. When I joined the team, setting up the test data for each one took an engineer roughly 45 minutes of manual work. Multiply that out and you get a quiet, expensive problem that everyone had simply learned to live with.</p>
      <p>I started as the engineer automating it and ended up owning the product globally. The Test Data Management Tool automated test data creation and management, saved thousands of engineering hours, and earned recognition from Dell&apos;s CIO.</p>
      <p>But the part worth writing about is what happened after launch: the tool worked, and engineers still weren&apos;t using it. Automation turned out to be the easy half. Understanding why people resist a tool that objectively saves them time, and fixing that, was the real product work. It&apos;s also a big part of why I moved from engineering into product management.</p>
      <p><strong>The full case study is in progress.</strong> It will cover the before and after, the adoption problem, and what I&apos;d do differently today. Want the story sooner? <a href="mailto:swetakumaripm@gmail.com">Ask me directly</a>. I tell it better over coffee anyway.</p>
      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
