import ProjectCard from './ProjectCard'
import styles from './WorkSection.module.css'

const projects = [
  {
    title: 'Reducing plastics using behavioral nudges',
    teaser: 'India\'s plastic ban flopped. We asked why,and proposed something smarter than punishment.',
    href: '/plastic',
    image: '/assets/img/2.jpg',
    tag: 'Behavioral Strategy · HEC Paris',
  },
  {
    title: 'Branding strategy for Salsus',
    teaser: 'A Norwegian premium broth brand wanted to crack the French market. French chefs disagreed. We found a way.',
    href: '/salsus',
    image: '/assets/img/salsus.png',
    tag: 'GTM Strategy · HEC Paris',
  },
  {
    title: 'Test Data Management Tool at Dell',
    teaser: 'When testing 12,000 SKUs a month takes 45 minutes each, automation isn\'t a nice-to-have. People adoption, however, is.',
    href: '/tdmt',
    image: '/assets/img/award.png',
    tag: 'Product · Dell Technologies',
  },
  {
    title: 'AR Office Navigator',
    teaser: 'A giant campus, a navigation problem, and a team that wanted to experiment with AR. What could go wrong?',
    href: '/arnavi',
    image: '/assets/img/s1.png',
    tag: 'Innovation · Dell Technologies',
  },
]

export default function WorkSection() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Selected Work</span>
          <h2 className={styles.title}>Things I&apos;ve built,<br />broken, and fixed.</h2>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ProjectCard key={p.href} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
