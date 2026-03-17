'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
  const t = useTranslations('pricing');
  const nav = useTranslations('nav');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.pricing-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.pricing-head', start: 'top 85%' },
    });
    gsap.fromTo('.pricing-card', { opacity: 0, y: 40, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
    });
  }, { scope: containerRef });

  const starterFeatures = t.raw('starter.features') as string[];
  const proFeatures = t.raw('pro.features') as string[];
  const fleetFeatures = t.raw('fleet.features') as string[];

  return (
    <section ref={containerRef} className="relative bg-parchment py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-warm pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="pricing-head mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/60 data-mono">Pricing</p>
          <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl tracking-tight">
            {t('headline')}
          </h2>
        </div>

        <div className="mb-14 grid gap-6 md:grid-cols-3 items-start">
          {/* Starter */}
          <div className="pricing-card rounded-2xl p-[1px] bg-gradient-to-br from-charcoal/10 to-transparent hover-lift">
            <div className="h-full rounded-2xl bg-white p-8">
              <div className="mb-6">
                <p className="data-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('starter.name')}</p>
                <p className="mt-3 data-mono text-5xl font-bold text-charcoal">{t('starter.price')}</p>
                <p className="mt-1 text-sm text-gray-400">{t('starter.period')}</p>
              </div>
              <div className="mb-8 h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />
              <ul className="mb-8 space-y-3">
                {starterFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/ota-yhteytta"
                className="block w-full rounded-xl border-2 border-charcoal/80 px-6 py-3 text-center text-sm font-bold text-charcoal transition-all hover:bg-charcoal hover:text-white"
              >
                {nav('demo')}
              </Link>
            </div>
          </div>

          {/* Pro — hero card */}
          <div className="pricing-card relative rounded-2xl p-[1.5px] bg-gradient-to-br from-orange via-grain-gold to-orange/40 hover-lift md:-mt-4">
            <div className="relative h-full rounded-2xl bg-[#0d1520] p-8 overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange/10 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-grain-gold/8 blur-3xl" />

              <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-orange to-grain-gold px-5 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> {t('pro.badge')}
              </span>

              <div className="relative mb-6 mt-4">
                <p className="data-mono text-[10px] font-bold uppercase tracking-widest text-orange/70">{t('pro.name')}</p>
                <p className="mt-3 data-mono text-5xl font-bold text-white">{t('pro.price')}</p>
              </div>
              <div className="mb-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <ul className="relative mb-8 space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/ota-yhteytta"
                className="relative block w-full rounded-xl bg-gradient-to-r from-orange to-grain-gold/80 px-6 py-3.5 text-center text-sm font-bold text-white transition-all hover:brightness-110 hover-glow-orange"
              >
                {nav('demo')} →
              </Link>
            </div>
          </div>

          {/* Fleet */}
          <div className="pricing-card rounded-2xl p-[1px] bg-gradient-to-br from-charcoal/10 to-transparent hover-lift">
            <div className="h-full rounded-2xl bg-white p-8">
              <div className="mb-6">
                <p className="data-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('fleet.name')}</p>
                <p className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal">{t('fleet.price')}</p>
              </div>
              <div className="mb-8 h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />
              <ul className="mb-8 space-y-3">
                {fleetFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/ota-yhteytta"
                className="block w-full rounded-xl border-2 border-charcoal/80 px-6 py-3 text-center text-sm font-bold text-charcoal transition-all hover:bg-charcoal hover:text-white"
              >
                {nav('contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3 text-center text-sm max-w-xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-orange/10 via-grain-gold/10 to-orange/10 px-6 py-3">
            <p className="text-orange font-medium">💡 {t('subsidy')}</p>
          </div>
          <p className="text-gray-500">{t('leasing')}</p>
          <p className="font-[var(--font-space-grotesk)] font-bold text-charcoal">{t('guarantee')}</p>
        </div>
      </div>
    </section>
  );
}
