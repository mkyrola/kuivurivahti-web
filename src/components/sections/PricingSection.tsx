'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
  const t = useTranslations('pricing');
  const nav = useTranslations('nav');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.pricing-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const starterFeatures = t.raw('starter.features') as string[];
  const proFeatures = t.raw('pro.features') as string[];
  const fleetFeatures = t.raw('fleet.features') as string[];

  return (
    <section ref={containerRef} className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
          {t('headline')}
        </h2>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {/* Starter */}
          <div className="pricing-card rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{t('starter.name')}</p>
              <p className="mt-2 font-[var(--font-bebas-neue)] text-5xl text-charcoal">{t('starter.price')}</p>
              <p className="text-sm text-gray-400">{t('starter.period')}</p>
            </div>
            <ul className="mb-8 space-y-3">
              {starterFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/ota-yhteytta"
              className="block w-full rounded-full border-2 border-charcoal px-6 py-3 text-center text-sm font-semibold text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              {nav('demo')}
            </Link>
          </div>

          {/* Pro — highlighted */}
          <div className="pricing-card relative rounded-2xl bg-charcoal p-8 shadow-xl ring-2 ring-orange">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
              {t('pro.badge')}
            </span>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange/80">{t('pro.name')}</p>
              <p className="mt-2 font-[var(--font-bebas-neue)] text-4xl text-white">{t('pro.price')}</p>
            </div>
            <ul className="mb-8 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/ota-yhteytta"
              className="block w-full rounded-full bg-orange px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              {nav('demo')} →
            </Link>
          </div>

          {/* Fleet */}
          <div className="pricing-card rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{t('fleet.name')}</p>
              <p className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal">{t('fleet.price')}</p>
            </div>
            <ul className="mb-8 space-y-3">
              {fleetFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/ota-yhteytta"
              className="block w-full rounded-full border-2 border-charcoal px-6 py-3 text-center text-sm font-semibold text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              {nav('contact')}
            </Link>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3 text-center text-sm">
          <p className="rounded-xl bg-orange/10 px-6 py-3 text-orange font-medium">
            💡 {t('subsidy')}
          </p>
          <p className="text-gray-500">{t('leasing')}</p>
          <p className="font-semibold text-charcoal">{t('guarantee')}</p>
        </div>
      </div>
    </section>
  );
}
