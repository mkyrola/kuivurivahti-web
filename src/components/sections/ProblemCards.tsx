'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Flame, TrendingDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Moon, Flame, TrendingDown];
const BG_COLORS = ['bg-sky-dusk/20', 'bg-fire-red/10', 'bg-harvest-amber/10'];
const ICON_COLORS = ['text-sky-dusk', 'text-fire-red', 'text-harvest-amber'];
const BORDER_COLORS = ['border-sky-dusk/30', 'border-fire-red/30', 'border-harvest-amber/30'];

export function ProblemCards() {
  const t = useTranslations('problem');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.problem-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
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
    <section ref={containerRef} className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
          {t('headline')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map(({ titleKey, textKey }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={titleKey}
                className={`problem-card rounded-2xl border ${BORDER_COLORS[i]} ${BG_COLORS[i]} p-8`}
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${BG_COLORS[i]}`}>
                  <Icon className={`h-7 w-7 ${ICON_COLORS[i]}`} />
                </div>
                <h3 className="mb-3 font-[var(--font-space-grotesk)] text-xl font-bold text-charcoal">
                  {t(titleKey)}
                </h3>
                <p className="text-base leading-relaxed text-gray-500">{t(textKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
