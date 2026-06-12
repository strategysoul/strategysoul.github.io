import EmailCapture from '@/components/EmailCapture'
import CaseStudyLayout from '@/components/CaseStudyLayout'

export const metadata = {
  title: 'AR Office Navigator | StrategySoul',
  description: 'AR Office Navigator at Dell: using augmented reality to solve campus wayfinding challenges on a large corporate campus.',
}

export default function ARNavi() {
  return (
    <CaseStudyLayout
      tag="Innovation · Dell Technologies"
      title="The AR Office Navigator"
      date="September 15, 2025"
      backHref="/#work"
      backLabel="← Back to Work"
    >
      <p>A 50-acre campus. Thousands of employees. No good way to find anything. We had access to AR tools, a willing team, and an innovation mandate — so we built a prototype that let employees navigate the office through their phone camera.</p>
      <p>This case study is about what happens when you take a technology-first idea and try to build a real product around it: the user research that humbled us, the scoping decisions that saved us, and the honest answer to whether AR was the right solution at all.</p>

      <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px dashed var(--border)', textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
          Full case study coming soon. Get notified when it&apos;s published:
        </p>
        <EmailCapture compact />
      </div>
    </CaseStudyLayout>
  )
}
