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
      <FeaturesGrid />
      <SensorSpecs />
      <LiveDryingWidget />
      <DryingCurveStory />
      <CompetitorTable />
      <PricingSection />
      <AIRoadmap />
      <CTASection />
    </>
  );
}
