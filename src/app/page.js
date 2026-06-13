import HeroSection from '@/components/HeroSection'
import Marquee from '@/components/Marquee'
import ChaosMode from '@/components/ChaosMode'
import AboutSection from '@/components/AboutSection'
import JourneySection from '@/components/JourneySection'
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
      <JourneySection />
      <WorkSection />
      <InterestsSection />
    </main>
  )
}
