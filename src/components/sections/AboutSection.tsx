'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Rocket, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INFO_ITEMS = [
  { key: 'founded' as const, valueKey: 'foundedValue' as const, Icon: MapPin, accent: '#F5641E' },
  { key: 'backed' as const, valueKey: 'backedValue' as const, Icon: Rocket, accent: '#3DBA7E' },
  { key: 'team' as const, valueKey: 'teamValue' as const, Icon: Users, accent: '#3B82F6' },
];

export function AboutSection() {
  const t = useTranslations('about');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.about-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-head', start: 'top 85%' },
    });
    gsap.fromTo('.about-card', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-night-mid py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-dark pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        <div className="about-head mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/60 data-mono">SEEMOTO</p>
          <h2 className="font-[var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-tight">
            {t('headline')}
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/50">
            {t('text')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {INFO_ITEMS.map(({ key, valueKey, Icon, accent }) => (
            <div key={key} className="about-card rounded-2xl glass-card p-6 text-center hover-lift">
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `${accent}20` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 data-mono">{t(key)}</p>
              <p className="mt-1 font-[var(--font-space-grotesk)] text-lg font-bold text-white">{t(valueKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
