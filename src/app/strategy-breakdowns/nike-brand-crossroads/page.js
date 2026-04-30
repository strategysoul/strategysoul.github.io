import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Nike\'s Brand Is at a Crossroads | StrategySoul',
  description: 'Nike spends $4 billion a year on ads. Its brand is still losing ground. Here\'s what went wrong and what needs to change.',
}

export default function NikeBrandCrossroads() {
  return (
    <CaseStudyLayout
      tag="Strategy · Consumer Brands"
      title="Nike's Brand Is at a Crossroads"
      date="April 2025"
    >
      <p>Nike spends roughly $4 billion a year on advertising and promotions. It has one of the most recognised logos in history. And it is losing momentum. Not dramatically, not overnight, but steadily and in ways that are hard to reverse once they take hold.</p>
      <p>Three things got it here.</p>

      <h2>The Innovation Problem</h2>
      <p>Nike built its identity on product breakthroughs. Air Max. Free. Flyknit. Each of those was a genuine leap, something that changed how a shoe felt or performed. In recent years, the product pipeline has leaned heavily on remixing what already worked. More Air colourways. More retro reissues. More of the same.</p>
      <p>That works for a while. Heritage sells. But it works right up until competitors start shipping genuinely new things, and then "more of the familiar" starts to look like a lack of ideas rather than a celebration of legacy. On Running, Hoka, New Balance — none of them were supposed to be serious threats to Nike's position. They became serious threats precisely because Nike left the performance innovation lane unguarded.</p>

      <h2>The Ethics Problem</h2>
      <p>Modern consumers, particularly the younger ones Nike needs most, are not purely price-and-performance buyers. They pay attention to supply chains. They notice greenwashing. They share what they find. Nike has faced persistent scrutiny over labour practices and a gap between its sustainability messaging and its operational reality.</p>
      <p>This matters not because every customer is an activist but because brand trust is cumulative. Every credibility gap that goes unaddressed makes the next one land harder.</p>

      <h2>The Self-Inflicted Wound</h2>
      <p>In December 2023, Nike announced it would cut 2% of its workforce to save $2 billion. Within that restructuring, it eliminated roughly 20% of its sustainability team — the people responsible for meeting the company's own 2030 environmental commitments. The people writing the targets and the people being cut were functionally the same group.</p>
      <p>You cannot publicly commit to sustainability goals and then defund the team building toward them. That is not a cost-cutting decision. It is a signal about what the company actually prioritises when it has to choose. Investors noticed. Consumers noticed. The press noticed.</p>

      <h2>What Needs to Happen</h2>
      <p>CEO John Donahoe promised "big ideas." That phrase has to materialise into products that feel genuinely new and into operational decisions that match the brand's stated values. Bill Ackman's purchase of 3 million shares suggests some investors see undervalued potential here. That confidence is only justified if the product pipeline and the brand integrity recover together.</p>
      <p>Nike's legacy is real. The Swoosh still carries enormous weight. But legacy is not a strategy. It is a runway, and runways have ends.</p>
      <p>The question is whether Nike uses what it has left to build something worth the next fifty years, or whether it manages the decline of the last fifty.</p>

      <Link href="/strategy-breakdowns" className={styles.returnLink}>← Back to Breakdowns</Link>
    </CaseStudyLayout>
  )
}
