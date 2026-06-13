import styles from './Marquee.module.css'

const items = [
  'Product Strategy',
  'Behavioral Design',
  'Voice AI',
  'Go-to-Market',
  'Storytelling',
  'Systems Thinking',
]

export default function Marquee() {
  const row = (hidden) => (
    <div className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={item} className={styles.item}>
          <span className={i % 2 ? styles.outline : styles.solid}>{item}</span>
          <span className={styles.star}>✳</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={styles.wrap}>
      <div className={styles.strip}>
        <div className={styles.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}
