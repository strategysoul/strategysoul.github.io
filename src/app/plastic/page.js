import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Reducing Plastics with Behavioral Nudges | StrategySoul',
  description: 'How behavioral nudges can reduce plastic usage: a case study on why bans fail and what actually changes human behavior.',
}

export default function Plastic() {
  return (
    <CaseStudyLayout
      tag="Behavioral Strategy · HEC Paris"
      title="Why India's Plastic Ban Flopped (and What We Could Do Instead)"
      date="September 16, 2025"
    >
      <p>India has a plastic problem. In 2021, the average Indian used somewhere between <strong>750 and 2143 plastic bags a year</strong>. Compare that to France, where people use just <strong>77 bags per person</strong>. That&apos;s not a gap, that&apos;s a canyon. And if the OECD is right, India&apos;s plastic use could <strong>quadruple by 2050</strong>, reaching around 160 million tons by 2060. Basically, enough plastic to wrap the planet like cling film.</p>
      <img src="/assets/img/stat_plastic.png" alt="Plastic usage statistics" />
      <p>So, in 2022, the Indian government introduced a nationwide ban on single-use plastic. With penalties of up to €1000 and even possible jail time. Sounds strict enough to scare people straight, right?<br />Well… not really.</p>

      <h2>Why the Ban Failed</h2>
      <p>Because humans are talented at ignoring rules when they&apos;re inconvenient. The ban stumbled on three fronts:</p>
      <ul>
        <li><strong>No cheap alternatives.</strong> Plastic is dirt cheap; eco-friendly options weren&apos;t.</li>
        <li><strong>No motivation.</strong> The &quot;why should I care today?&quot; problem.</li>
        <li><strong>Enforcement? Forget it.</strong> Policing a billion people&apos;s grocery bags is… ambitious.</li>
      </ul>
      <p>The result? Plastic smuggling. Yes, actual smuggling of plastic bags. Police officers were inspecting kirana shops like they were raiding a drug cartel, except the contraband was shopping bags that cost a few rupees.</p>

      <h2>Bans and Human Nature</h2>
      <p>India isn&apos;t alone. Humans have a long, messy history with bans:</p>
      <ul>
        <li><strong>Prohibition (US, 1920s):</strong> Alcohol was banned. People drank more.</li>
        <li><strong>Delhi&apos;s firecracker ban:</strong> Logic said &quot;less pollution.&quot; Reality said &quot;worst AQI yet.&quot;</li>
        <li><strong>Kenya&apos;s plastic ban (2016):</strong> Same outcome — smuggling, continued usage.</li>
      </ul>
      <p>The pattern is clear: bans make people creative, not compliant.</p>

      <h2>Why We Break Bans</h2>
      <p>We dug into behavioral science to explain this rebellion, and found three psychological culprits:</p>
      <img src="/assets/img/psych.png" alt="Psychological factors driving ban-breaking" />
      <ul>
        <li><strong>Present Bias:</strong> The bag makes my life easier today. The environmental cost shows up decades later. Guess which one wins.</li>
        <li><strong>Cognitive Dissonance:</strong> &quot;I know plastic is bad, but my one bag won&apos;t matter. Anyway, the corporations should fix this, not me.&quot;</li>
        <li><strong>Normative Social Influence:</strong> If everyone else at the shop is taking plastic bags, do you really want to be the lone warrior saying no?</li>
      </ul>

      <h2>Our Big Idea: The Green Card</h2>
      <p>Instead of punishing people, what if we rewarded them? Introducing <strong>Green Card</strong>.</p>
      <ul>
        <li>Say no to plastic, scan your Green Card.</li>
        <li>Earn points.</li>
        <li>Use points to boost your <strong>credit score</strong>.</li>
      </ul>
      <img src="/assets/img/greencard.png" alt="Green Card concept illustration" />
      <p>In a country where loans power almost everything (education, homes, cars), linking eco-friendly choices to creditworthiness could actually change behavior. Suddenly, skipping a plastic bag isn&apos;t about &quot;saving the planet someday,&quot; it&apos;s about &quot;getting your home loan approved today.&quot;</p>
      <p>And technically, it&apos;s feasible. India&apos;s UPI scan-and-pay system already tracks billions of micro-transactions. Adding a loyalty-style card on top? Not exactly rocket science.</p>

      <h2>Other Nudges</h2>
      <ul>
        <li><strong>Posters at checkout:</strong> &quot;Only 1% of shoppers ask for plastic. Be the 99%.&quot;</li>
        <li><strong>Opt-in bags:</strong> No more free handouts; you have to ask (and pay).</li>
        <li><strong>Plastic returns:</strong> Bring bags back, earn discounts or points.</li>
      </ul>

      <h2>Did It Happen?</h2>
      <img src="/assets/img/2.jpg" alt="Pitch to Eric Singler" />
      <p>Not yet. But we pitched it to <strong>Eric Singler (Founder, BVA Nudge Consulting)</strong>, and he loved it:</p>
      <blockquote>
        &quot;While everyone is pitching an app to track behavior, it&apos;s impressive to see the old school behavioral solution that makes you a better citizen.&quot;
      </blockquote>
      <p>Encouraging words. But the real challenge is convincing banks and the government to link credit scores to bag usage. Bureaucracy moves slower than glaciers, and unfortunately, plastic doesn&apos;t.</p>

      <h2>Final Thought</h2>
      <p>India&apos;s plastic consumption is skyrocketing. A ban alone won&apos;t solve it. History and psychology say so. But if avoiding plastic helps you get that home loan or tip your credit score in the right direction? That might just work.</p>
      <p>Because honestly, nobody wants to live in a country topping the charts for <strong>160 million tons of plastic waste</strong>.</p>

      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
