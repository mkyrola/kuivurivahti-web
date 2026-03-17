'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Brain, Bell, Cloud, Radio, Wrench, ShieldCheck, Tractor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { key: 'temp', Icon: Thermometer, span: '' },
  { key: 'ai', Icon: Brain, span: 'md:col-span-2' },
  { key: 'alert', Icon: Bell, span: '' },
  { key: 'weather', Icon: Cloud, span: '' },
  { key: 'fourG', Icon: Radio, span: '' },
  { key: 'install', Icon: Wrench, span: '' },
  { key: 'ce', Icon: ShieldCheck, span: '' },
  { key: 'brand', Icon: Tractor, span: '' },
] as const;

export function FeaturesGrid() {
  const t = useTranslations('features');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.feat-head',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.feat-head', start: 'top 85%' } }
    );
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-parchment py-28 px-6 overflow-hidden">
      {/* Subtle warm mesh */}
      <div className="absolute inset-0 mesh-warm pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="feat-head mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/70 data-mono">SEEMOTO KUIVURIVAHTI</p>
          <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl tracking-tight">
            {t('headline')}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map(({ key, Icon, span }) => {
            const isAI = key === 'ai';
            return (
              <div
                key={key}
                className={`feature-card group relative rounded-2xl hover-lift ${span} ${
                  isAI ? 'row-span-1' : ''
                }`}
              >
                {/* Gradient border wrapper */}
                <div className={`h-full rounded-2xl p-[1px] ${
                  isAI
                    ? 'bg-gradient-to-br from-orange via-grain-gold/60 to-orange/30'
                    : 'bg-gradient-to-br from-charcoal/10 to-transparent'
                }`}>
                  <div className={`relative h-full rounded-2xl p-6 overflow-hidden ${
                    isAI
                      ? 'bg-charcoal'
                      : 'bg-white'
                  }`}>
                    {/* AI card: animated neural glow */}
                    {isAI && (
                      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange/15 blur-3xl" />
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 rounded-xl p-2.5 ${
                        isAI ? 'bg-orange/20' : 'bg-orange/8'
                      }`}>
                        <Icon className={`h-5 w-5 ${isAI ? 'text-orange' : 'text-orange/80'}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`mb-1.5 font-[var(--font-space-grotesk)] text-sm font-bold ${
                          isAI ? 'text-white' : 'text-charcoal'
                        }`}>
                          {t(`${key}.title`)}
                        </h3>
                        <p className={`text-xs leading-relaxed ${
                          isAI ? 'text-white/60' : 'text-gray-500'
                        }`}>
                          {t(`${key}.text`)}
                        </p>
                      </div>
                    </div>

                    {/* AI badge */}
                    {isAI && (
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange/15 px-3 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                        <span className="data-mono text-[10px] font-bold text-orange uppercase tracking-wider">AI-powered</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
