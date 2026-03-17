import { setRequestLocale } from 'next-intl/server';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';
import { CompetitorTable } from '@/components/sections/CompetitorTable';

export default async function HinnatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <div className="pt-20">
        <PricingSection />
        <CompetitorTable />
        <CTASection />
      </div>
    </>
  );
}
