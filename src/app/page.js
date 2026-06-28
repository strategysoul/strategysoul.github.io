import HeroSection from '@/components/HeroSection'
import Marquee from '@/components/Marquee'
import ChaosMode from '@/components/ChaosMode'
import AboutSection from '@/components/AboutSection'
import MapSection from '@/components/MapSection'
import WorkSection from '@/components/WorkSection'
import InterestsSection from '@/components/InterestsSection'

export const metadata = {
  title: 'Sweta Kumari | StrategySoul',
  description: 'Strategy-driven product professional at the intersection of tech, strategy, and product.',
}

export default function Home() {
  return (
    <main>
      <ChaosMode />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <MapSection />
      <WorkSection />
      <InterestsSection />
    </main>
  )
}
