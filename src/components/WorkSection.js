import ProjectCard from './ProjectCard'
import styles from './WorkSection.module.css'

const projects = [
  {
    title: 'I tested 12 transcription models so you don\'t have to',
    teaser: '12 models. 5 providers. 50 clips. Whisper won, AssemblyAI surprised everyone, and Deepgram disappointed. Here\'s the full benchmark.',
    href: '/transcription-benchmark',
    image: '/assets/img/accents.jpg',
    tag: 'AI Research · Huscribe',
    readTime: '8 min read',
  },
  {
    title: 'Test Data Management Tool at Dell',
    teaser: '12,000 SKUs tested per month, 45 minutes each. I automated it, earned CIO recognition, then figured out the harder problem: why engineers weren\'t using it.',
    href: '/tdmt',
    image: '/assets/img/award.png',
    tag: 'Product · Dell Technologies',
    readTime: 'Coming soon',
  },
  {
    title: 'Reducing plastics using behavioral nudges',
    teaser: 'India\'s plastic ban flopped. We asked why, and proposed something smarter than punishment. The founder of BVA Nudge Consulting called it impressive.',
    href: '/plastic',
    image: '/assets/img/2.jpg',
    tag: 'Behavioral Strategy · HEC Paris',
    readTime: '5 min read',
  },
  {
    title: 'Branding strategy for Salsus',
    teaser: 'A Norwegian premium broth brand wanted to crack the French market. French chefs disagreed. We found a way.',
    href: '/salsus',
    image: '/assets/img/salsus.png',
    tag: 'GTM Strategy · HEC Paris',
    readTime: '7 min read',
  },
  {
    title: 'AR Office Navigator',
    teaser: 'A giant campus, a navigation problem, and a team that wanted to experiment with AR. What could go wrong?',
    href: '/arnavi',
    image: '/assets/img/s1.png',
    tag: 'Innovation · Dell Technologies',
    readTime: 'Coming soon',
  },
]

export default function WorkSection() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}><span className={styles.num}>№ 03</span> · Selected Work</span>
          <h2 className={styles.title}>Things I&apos;ve built,<br /><em>broken</em>, and fixed.</h2>
          <span className={styles.ghostNum} aria-hidden="true">03</span>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ProjectCard key={p.href} {...p} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
