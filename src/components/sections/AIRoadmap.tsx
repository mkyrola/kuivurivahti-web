'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AIRoadmap() {
  const t = useTranslations('roadmap');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.roadmap-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
    gsap.fromTo(
      '.roadmap-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const items = t.raw('items') as { year: string; title: string; text: string }[];

  return (
    <section ref={containerRef} className="bg-charcoal py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl">
          {t('headline')}
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-white/10 hidden md:block">
            <div className="roadmap-line h-full bg-orange origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {items.map(({ year, title, text }, i) => (
              <div key={year} className="roadmap-item relative">
                {/* Dot */}
                <div className="mb-6 flex items-center gap-4 md:flex-col md:items-start">
                  <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-[var(--font-bebas-neue)] text-xl ${
                    i === 0 ? 'bg-orange text-white' : 'bg-white/10 text-white/60 border border-white/20'
                  }`}>
                    {year}
                    {i === 0 && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-safe-green px-2 py-0.5 text-xs font-bold text-white">NYT</span>
                    )}
                  </div>
                </div>
                <h3 className="mb-2 font-[var(--font-space-grotesk)] text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
