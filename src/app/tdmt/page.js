import EmailCapture from '@/components/EmailCapture'
import CaseStudyLayout from '@/components/CaseStudyLayout'

export const metadata = {
  title: 'Test Data Management Tool | StrategySoul',
  description: 'Launching the Test Data Management Tool at Dell: how automation and change management drove efficiency across 10,000+ SKUs a month.',
}

export default function TDMT() {
  return (
    <CaseStudyLayout
      tag="Product · Dell Technologies"
      title="The Test Data Management Tool"
      date="September 15, 2025"
      backHref="/#work"
      backLabel="← Back to Work"
    >
      <p>12,000 SKUs tested per month, 45 minutes each. I automated it, cut that to under 2 minutes, earned CIO recognition — and then discovered the harder problem: building the tool was the easy part. Getting engineers to actually use it was the real product challenge.</p>
      <p>This case study covers the full arc: the technical build, the adoption problem, the change management strategies that worked, and the ones that didn&apos;t. It&apos;s also the one that taught me the difference between shipping a product and shipping a product that gets used.</p>

      <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px dashed var(--border)', textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
          Full case study coming soon. Get notified when it&apos;s published:
        </p>
        <EmailCapture compact />
      </div>
    </CaseStudyLayout>
  )
}
