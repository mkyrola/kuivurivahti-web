'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Brain, Bell, Cloud, Radio, Wrench, ShieldCheck, Tractor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURE_ICONS = [Thermometer, Brain, Bell, Cloud, Radio, Wrench, ShieldCheck, Tractor];

export function FeaturesGrid() {
  const t = useTranslations('features');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const features = [
    { key: 'temp' as const },
    { key: 'ai' as const },
    { key: 'alert' as const },
    { key: 'weather' as const },
    { key: 'fourG' as const },
    { key: 'install' as const },
    { key: 'ce' as const },
    { key: 'brand' as const },
  ];

  return (
    <section ref={containerRef} className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
          {t('headline')}
        </h2>
        <p className="mb-16 text-center text-lg text-gray-500">SEEMOTO KUIVURIVAHTI</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ key }, i) => {
            const Icon = FEATURE_ICONS[i];
            const isAI = key === 'ai';
            return (
              <div
                key={key}
                className={`feature-card rounded-2xl p-6 transition-shadow hover:shadow-lg ${
                  isAI
                    ? 'bg-charcoal text-white ring-2 ring-orange'
                    : 'bg-gray-100/60 text-charcoal'
                }`}
              >
                <div className={`mb-4 inline-flex rounded-xl p-2.5 ${isAI ? 'bg-orange/20' : 'bg-orange/10'}`}>
                  <Icon className={`h-5 w-5 ${isAI ? 'text-orange' : 'text-orange'}`} />
                </div>
                <h3 className={`mb-2 font-[var(--font-space-grotesk)] text-base font-bold ${isAI ? 'text-white' : 'text-charcoal'}`}>
                  {t(`${key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed ${isAI ? 'text-white/70' : 'text-gray-500'}`}>
                  {t(`${key}.text`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
