import { setRequestLocale } from 'next-intl/server';
import { DryingCurveStory } from '@/components/sections/DryingCurveStory';
import { CTASection } from '@/components/sections/CTASection';

export default async function AsiakkaatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-20">
      <DryingCurveStory />
      <CTASection />
    </div>
  );
}
