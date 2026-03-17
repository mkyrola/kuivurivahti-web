'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Flame, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARD_CONFIG = [
  {
    Icon: Flame,
    accent: '#E63946',
    glow: 'rgba(230, 57, 70, 0.15)',
    stat: '€15 000+',
    from: { x: -80, y: 0, rotate: -3 },
  },
  {
    Icon: TrendingDown,
    accent: '#E8C547',
    glow: 'rgba(232, 197, 71, 0.12)',
    stat: '12–18%',
    from: { x: 0, y: 60, rotate: 0 },
  },
  {
    Icon: Moon,
    accent: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.12)',
    stat: '02:47',
    from: { x: 80, y: 0, rotate: 3 },
  },
] as const;

export function ProblemCards() {
  const t = useTranslations('problem');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.problem-headline',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.problem-headline', start: 'top 85%' },
      }
    );

    gsap.utils.toArray<HTMLElement>('.problem-card').forEach((card, i) => {
      const cfg = CARD_CONFIG[i];
      gsap.fromTo(
        card,
        { opacity: 0, x: cfg.from.x ?? 0, y: cfg.from.y ?? 0, rotate: cfg.from.rotate },
        {
          opacity: 1, x: 0, y: 0, rotate: 0,
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.12,
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      );
    });
  }, { scope: containerRef });

  const cards = [
    { titleKey: 'card1Title', textKey: 'card1Text' },
    { titleKey: 'card2Title', textKey: 'card2Text' },
    { titleKey: 'card3Title', textKey: 'card3Text' },
  ] as const;

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-night-mid py-28 px-6">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 mesh-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04090f] via-transparent to-[#04090f] opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="problem-headline mb-6 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
          {t('headline')}
        </h2>
        <div className="mx-auto mb-16 h-px w-20 bg-gradient-to-r from-transparent via-orange to-transparent" />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map(({ titleKey, textKey }, i) => {
            const { Icon, accent, glow, stat } = CARD_CONFIG[i];
            return (
              <div
                key={titleKey}
                className="problem-card group relative rounded-2xl p-[1px] hover-lift"
                style={{
                  background: `linear-gradient(135deg, ${accent}40, transparent 60%)`,
                }}
              >
                <div className="relative rounded-2xl bg-[#0a1420] p-8 h-full overflow-hidden">
                  {/* Glow orb behind icon */}
                  <div
                    className="absolute -top-8 -left-8 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: glow, opacity: 0.4 }}
                  />

                  {/* Stat number */}
                  <div className="stat-value mb-5">
                    <span
                      className="data-mono text-4xl font-bold md:text-5xl"
                      style={{ color: accent }}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="mb-4 inline-flex rounded-xl p-3"
                    style={{ background: `${accent}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>

                  <h3 className="mb-3 font-[var(--font-space-grotesk)] text-lg font-bold text-white">
                    {t(titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {t(textKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
