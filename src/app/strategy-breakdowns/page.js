import styles from './page.module.css'

export const metadata = {
  title: 'Strategy Breakdowns | StrategySoul',
  description: 'In-depth takes on business strategy, product decisions, and market dynamics. No buzzword soup.',
}

const breakdowns = [
  {
    tag: 'Strategy · Consumer Brands',
    title: 'Nike\'s brand is at a crossroads',
    teaser: 'Nike spends $4 billion a year on ads. Its brand is still losing ground. Three things got it here, and one self-inflicted wound made it worse.',
    href: '/strategy-breakdowns/nike-brand-crossroads',
    external: false,
  },
  {
    tag: 'Strategy · Consumer Brands',
    title: 'The Ordinary and the art of radical transparency',
    teaser: 'The Ordinary built a cult following by saying the quiet part loud: most skincare is overpriced mystique. What happens to that honesty under Estée Lauder?',
    href: '/strategy-breakdowns/the-ordinary-authenticity',
    external: false,
  },
  {
    tag: 'Strategy · Wearables',
    title: 'Why Garmin said no to smart rings',
    teaser: 'Everyone is chasing the smart ring trend. Garmin looked at it, understood it, and deliberately walked away. That\'s not caution. That\'s strategy.',
    href: '/strategy-breakdowns/garmin-smart-rings',
    external: false,
  },
]

export default function StrategyBreakdowns() {
  return (
    <div className={styles.page}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <span className={styles.label}>Strategy Breakdowns</span>
          <h1 className={styles.title}>I write about strategy the way<br />I think about it: with data and a point of view.</h1>
          <p className={styles.subtitle}>Deep dives into business strategy, product decisions, and market dynamics. No buzzword soup.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {breakdowns.map((b) => (
          <a
            key={b.href}
            href={b.href}
            className={styles.card}
            target={b.external ? '_blank' : undefined}
            rel={b.external ? 'noreferrer' : undefined}
          >
            <span className={styles.cardTag}>{b.tag}</span>
            <h2 className={styles.cardTitle}>{b.title}</h2>
            <p className={styles.cardTeaser}>{b.teaser}</p>
            <span className={styles.cardCta}>{b.external ? 'Read on LinkedIn ↗' : 'Read breakdown →'}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
