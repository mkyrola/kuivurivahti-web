'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEP_ICONS = [Brain, Zap, Rocket];
const STEP_ACCENTS = ['#F5641E', '#3DBA7E', '#3B82F6'];

export function AIRoadmap() {
  const t = useTranslations('roadmap');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.roadmap-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.roadmap-head', start: 'top 85%' },
    });

    gsap.fromTo('.roadmap-line', { scaleX: 0 }, {
      scaleX: 1, duration: 1.4, ease: 'power2.inOut',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    });

    gsap.fromTo('.roadmap-item', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    });
  }, { scope: containerRef });

  const items = t.raw('items') as { year: string; title: string; text: string }[];

  return (
    <section ref={containerRef} className="relative bg-night-mid py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-dark pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <div className="roadmap-head mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-aurora/60 data-mono">AI Roadmap</p>
          <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
            {t('headline')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-9 left-0 right-0 h-[2px] bg-white/5 hidden md:block">
            <div className="roadmap-line h-full bg-gradient-to-r from-orange via-aurora to-sensor-blue origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {items.map(({ year, title, text }, i) => {
              const Icon = STEP_ICONS[i] ?? Brain;
              const accent = STEP_ACCENTS[i] ?? '#F5641E';
              const isCurrent = i === 0;
              return (
                <div key={year} className="roadmap-item relative">
                  {/* Node */}
                  <div className="mb-6 flex items-center gap-4 md:flex-col md:items-center">
                    <div className="relative z-10">
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full animate-[pulse-orange_2s_ease-in-out_infinite]" />
                      )}
                      <div
                        className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: isCurrent ? accent : 'rgba(255,255,255,0.05)',
                          border: isCurrent ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          boxShadow: isCurrent ? `0 0 24px ${accent}40` : 'none',
                        }}
                      >
                        <div className="text-center">
                          <Icon className="h-5 w-5 mx-auto mb-0.5" style={{ color: isCurrent ? '#fff' : accent }} />
                          <span className="data-mono text-[11px] font-bold" style={{ color: isCurrent ? '#fff' : 'rgba(255,255,255,0.5)' }}>{year}</span>
                        </div>
                        {isCurrent && (
                          <span className="absolute -top-2 -right-2 rounded-full bg-safe-green px-2 py-0.5 text-[9px] font-bold text-white data-mono uppercase">NYT</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="glass-card rounded-xl p-5 text-center md:text-left">
                    <h3 className="mb-2 font-[var(--font-space-grotesk)] text-base font-bold text-white">{title}</h3>
                    <p className="text-xs leading-relaxed text-white/45">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
