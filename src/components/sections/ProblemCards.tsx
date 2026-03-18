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
    Icon: Moon,
    accent: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.15)',
    stat: '02:47',
    from: { x: -100, y: 20, rotate: -4 },
    offset: 'md:mt-0',
    gradient: 'from-[#1a2540] to-[#0a1420]',
    pulseColor: 'rgba(59, 130, 246, 0.06)',
  },
  {
    Icon: Flame,
    accent: '#E63946',
    glow: 'rgba(230, 57, 70, 0.18)',
    stat: '60–80',
    from: { x: 0, y: 80, rotate: 0 },
    offset: 'md:-mt-6',
    gradient: 'from-[#1f1418] to-[#0a1420]',
    pulseColor: 'rgba(230, 57, 70, 0.06)',
  },
  {
    Icon: TrendingDown,
    accent: '#E8C547',
    glow: 'rgba(232, 197, 71, 0.15)',
    stat: '€300–500',
    from: { x: 100, y: 20, rotate: 4 },
    offset: 'md:mt-8',
    gradient: 'from-[#1a1c14] to-[#0a1420]',
    pulseColor: 'rgba(232, 197, 71, 0.06)',
  },
] as const;

// Deterministic ember positions for fire card
const EMBERS = Array.from({ length: 8 }, (_, i) => ({
  left: 15 + (i * 23.7) % 70,
  delay: (i * 0.7) % 3,
  duration: 2 + (i % 3) * 0.8,
  size: 2 + (i % 2),
}));

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
        { opacity: 0, x: cfg.from.x, y: cfg.from.y, rotate: cfg.from.rotate },
        {
          opacity: 1, x: 0, y: 0, rotate: 0,
          duration: 1.0,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: card, start: 'top 90%' },
          delay: i * 0.15,
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2.5)',
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
    <section ref={containerRef} className="relative overflow-hidden bg-night-mid py-32 px-6">
      {/* Unique gradient mesh for this section */}
      <div className="absolute inset-0 mesh-problem" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04090f] via-transparent to-[#04090f] opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="problem-headline mb-6 text-center font-[var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-tight leading-[1.1]">
          {t('headline')}
        </h2>
        <div className="mx-auto mb-20 h-px w-24 bg-gradient-to-r from-transparent via-orange to-transparent" />

        {/* Staggered asymmetric grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8 items-start">
          {cards.map(({ titleKey, textKey }, i) => {
            const { Icon, accent, glow, stat, offset, gradient, pulseColor } = CARD_CONFIG[i];
            const isFireCard = i === 1;
            const isGoldCard = i === 2;
            return (
              <div
                key={titleKey}
                className={`problem-card group relative rounded-2xl p-[1px] hover-lift tilt-card ${offset}`}
                style={{
                  background: `linear-gradient(135deg, ${accent}50, transparent 50%)`,
                }}
              >
                <div className={`relative rounded-2xl bg-gradient-to-br ${gradient} p-8 h-full overflow-hidden`}>
                  {/* Background pulse */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${pulseColor}, transparent 70%)`,
                    }}
                  />

                  {/* Glow orb behind icon */}
                  <div
                    className="absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl transition-all duration-700 group-hover:opacity-90 group-hover:scale-110"
                    style={{ background: glow, opacity: 0.5 }}
                  />

                  {/* Ember particles for fire card */}
                  {isFireCard && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {EMBERS.map((e, ei) => (
                        <div
                          key={ei}
                          className="absolute bottom-0 rounded-full bg-fire-red"
                          style={{
                            left: `${e.left}%`,
                            width: e.size,
                            height: e.size,
                            animation: `ember-float ${e.duration}s ease-out ${e.delay}s infinite`,
                            filter: 'blur(0.5px)',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Golden shimmer border for money card */}
                  {isGoldCard && (
                    <div className="absolute inset-0 rounded-2xl border border-grain-gold/10 pointer-events-none" />
                  )}

                  {/* Stat number */}
                  <div className="stat-value relative mb-6">
                    <span
                      className="data-mono text-5xl font-bold md:text-6xl"
                      style={{ color: accent }}
                    >
                      {stat}
                    </span>
                    {isFireCard && (
                      <span className="data-mono text-lg font-bold text-fire-red/50 ml-1">%</span>
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className="relative mb-4 inline-flex rounded-xl p-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${accent}18` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>

                  <h3 className="relative mb-3 font-[var(--font-space-grotesk)] text-xl font-bold text-white">
                    {t(titleKey)}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-white/50">
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
