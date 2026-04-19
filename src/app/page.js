import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import JourneySection from '@/components/JourneySection'
import WorkSection from '@/components/WorkSection'
import StrategySection from '@/components/StrategySection'
import InterestsSection from '@/components/InterestsSection'

export const metadata = {
  title: 'Sweta Kumari | StrategySoul',
  description: 'Strategy-driven product professional at the intersection of tech, strategy, and product.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <WorkSection />
      <StrategySection />
      <InterestsSection />
    </>
  )
}
