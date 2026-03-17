import { setRequestLocale } from 'next-intl/server';
import { SensorSpecs } from '@/components/sections/SensorSpecs';
import { LiveDryingWidget } from '@/components/sections/LiveDryingWidget';
import { AIRoadmap } from '@/components/sections/AIRoadmap';
import { CTASection } from '@/components/sections/CTASection';

export default async function MitenToimiiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-20">
      <SensorSpecs />
      <LiveDryingWidget />
      <AIRoadmap />
      <CTASection />
    </div>
  );
}
