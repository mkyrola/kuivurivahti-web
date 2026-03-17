import { setRequestLocale } from 'next-intl/server';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { SensorSpecs } from '@/components/sections/SensorSpecs';
import { DryingCurveStory } from '@/components/sections/DryingCurveStory';
import { CTASection } from '@/components/sections/CTASection';

export default async function TuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-20">
      <FeaturesGrid />
      <SensorSpecs />
      <DryingCurveStory />
      <CTASection />
    </div>
  );
}
