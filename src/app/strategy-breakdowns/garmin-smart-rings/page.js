import CaseStudyLayout from '@/components/CaseStudyLayout'

export const metadata = {
  title: 'Why Garmin Said No to Smart Rings | StrategySoul',
  description: 'Everyone is chasing the smart ring trend. Garmin looked at it, understood it, and walked away. That\'s not caution. That\'s strategy.',
}

export default function GarminSmartRings() {
  return (
    <CaseStudyLayout
      tag="Strategy · Wearables"
      title="Why Garmin Said No to Smart Rings"
      date="November 2024"
      readTime="6 min read"
      backHref="/strategy-breakdowns"
      backLabel="← Back to Breakdowns"
      bottomLine="The hardest product decision isn't what to build — it's what not to build when the market is clearly telling you to. Garmin's 'no' to smart rings is a masterclass in protecting a brand by resisting the slide deck. If the technology catches up, the calculus shifts. Until then, the 'no' holds."
      nextRead={{
        tag: 'Strategy · Consumer Brands',
        title: "Nike's brand is at a crossroads",
        teaser: 'Nike spends $4 billion a year on ads. Its brand is still losing ground. Three things got it here.',
        href: '/strategy-breakdowns/nike-brand-crossroads',
      }}
    >
      <p>The smart ring market is having a moment. Samsung launched the Galaxy Ring. Oura raised at a $5.2B valuation. Every wearable brand is being asked the same question: are you building one?</p>
      <p>Garmin's answer is no. And unlike most "no" decisions in tech, this one is worth examining. Because it's not timid. It's precise.</p>

      <h2>Who Garmin Actually Sells To</h2>
      <p>Garmin's core customers are triathletes, mountaineers, ultramarathon runners, pilots, and divers. People who put their devices through conditions that would destroy most consumer electronics. These users don't want something minimal and elegant. They want accurate GPS, multi-day battery life, VO2 max tracking, altimeters, and a device that survives a fall on a trail at altitude.</p>
      <p>A ring can't do any of that. The form factor physically constrains what sensors you can fit, how long the battery lasts, and what data you can collect. For Garmin's audience, a ring isn't a companion device. It's a downgrade.</p>

      <h2>The Brand Has a Specific Promise</h2>
      <p>Garmin has spent decades being the brand that serious people trust for serious performance data. That positioning is hard to build and easy to erode. The moment you start chasing trend-driven categories, you signal to your core customers that you're no longer building for them.</p>
      <p>Saying yes to smart rings would have been a statement: "we want a piece of the wellness consumer market." That's a different brand, a different customer, and a different product roadmap. Garmin chose not to make that statement.</p>

      <h2>The Technical Constraints Are Real</h2>
      <p>This isn't just positioning. The engineering limitations of rings matter. GPS requires antennas that don't fit in a ring form factor. Optical heart rate sensors are less accurate on a finger than a wrist. Battery life on current rings is measured in days, not weeks. For a brand whose watches routinely last 40+ hours in GPS mode, shipping a ring with 3-day battery life would be a credibility problem, not a product launch.</p>
      <p>Garmin would either have to compromise on the specs (damaging trust) or wait until the underlying technology catches up. They appear to be doing the latter.</p>

      <h2>Saying No Is a Product Decision</h2>
      <p>What makes this interesting from a product strategy perspective is that Garmin's "no" isn't a failure of imagination. It's an active choice to protect what works. The hardest thing in product is not adding features or entering new categories. It's identifying which opportunities are genuinely right for your user and which ones just look good on a slide deck.</p>
      <p>Smart rings look great on a slide deck for Garmin. Projected market size, growing consumer interest, adjacent category. All the signals that usually get a product team excited. Garmin looked at those signals and asked a different question: does this serve the person who already trusts us?</p>
      <p>The answer was no. So they didn't build it.</p>

      <h2>What Would Change Their Mind</h2>
      <p>The category isn't permanently closed. If battery density improves significantly, if GPS miniaturisation reaches ring-scale, if sensors become accurate enough at the finger to meet Garmin's standards, the calculus shifts. At that point a Garmin ring wouldn't be a trend play. It would be a genuine performance product for their existing audience, something to wear during sleep or recovery when a watch feels like too much.</p>
      <p>Until then, the "no" holds. And it should.</p>
    </CaseStudyLayout>
  )
}
