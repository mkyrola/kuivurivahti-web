import { setRequestLocale } from 'next-intl/server';
import { HeroNightWatch } from '@/components/sections/HeroNightWatch';
import { ProblemCards } from '@/components/sections/ProblemCards';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { SensorSpecs } from '@/components/sections/SensorSpecs';
import { LiveDryingWidget } from '@/components/sections/LiveDryingWidget';
import { DryingCurveStory } from '@/components/sections/DryingCurveStory';
import { CompetitorTable } from '@/components/sections/CompetitorTable';
import { PricingSection } from '@/components/sections/PricingSection';
import { AIRoadmap } from '@/components/sections/AIRoadmap';
import { CTASection } from '@/components/sections/CTASection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SensorReveal } from '@/components/sections/SensorReveal';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroNightWatch />
      <ProblemCards />
      <div id="tuote">
        <FeaturesGrid />
        <SensorSpecs />
        <SensorReveal />
      </div>
      <div id="hinnat">
        <CompetitorTable />
        <PricingSection />
      </div>
      <div id="miten-toimii">
        <DryingCurveStory />
        <LiveDryingWidget />
      </div>
      <AIRoadmap />
      <AboutSection />
      <CTASection />
    </>
  );
}
