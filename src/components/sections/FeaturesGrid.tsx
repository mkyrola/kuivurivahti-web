'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Brain, Bell, Cloud, Radio, Wrench, ShieldCheck, Tractor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Bento layout: position defines col-span/row-span classes
const FEATURES = [
  { key: 'temp', Icon: Thermometer, bento: 'md:col-span-1 md:row-span-1' },
  { key: 'ai', Icon: Brain, bento: 'md:col-span-2 md:row-span-2' },
  { key: 'alert', Icon: Bell, bento: 'md:col-span-1 md:row-span-1' },
  { key: 'weather', Icon: Cloud, bento: 'md:col-span-1 md:row-span-1' },
  { key: 'fourG', Icon: Radio, bento: 'md:col-span-1 md:row-span-1' },
  { key: 'install', Icon: Wrench, bento: 'md:col-span-2 md:row-span-1' },
  { key: 'ce', Icon: ShieldCheck, bento: 'md:col-span-1 md:row-span-1' },
  { key: 'brand', Icon: Tractor, bento: 'md:col-span-1 md:row-span-1' },
] as const;

// Neural network nodes for AI card
const NEURAL_NODES = [
  { cx: 20, cy: 25, r: 3 }, { cx: 20, cy: 50, r: 3 }, { cx: 20, cy: 75, r: 3 },
  { cx: 50, cy: 20, r: 4 }, { cx: 50, cy: 50, r: 5 }, { cx: 50, cy: 80, r: 4 },
  { cx: 80, cy: 35, r: 3 }, { cx: 80, cy: 65, r: 3 },
];
const NEURAL_LINKS = [
  [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5],
  [3, 6], [3, 7], [4, 6], [4, 7], [5, 6], [5, 7],
];

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
      { opacity: 0, y: 36, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      }
    );

    // Neural network pulse animation for AI card
    gsap.utils.toArray<SVGCircleElement>('.neural-node').forEach((node, i) => {
      gsap.to(node, {
        opacity: 0.3,
        scale: 1.3,
        yoyo: true,
        repeat: -1,
        duration: 1.5 + (i % 3) * 0.5,
        ease: 'sine.inOut',
        delay: i * 0.2,
        transformOrigin: 'center',
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-frost-white py-32 px-6 overflow-hidden">
      {/* Frost mesh */}
      <div className="absolute inset-0 mesh-frost pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="feat-head mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/70 data-mono">SEEMOTO KUIVURIVAHTI</p>
          <h2 className="font-[var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-charcoal tracking-tight">
            {t('headline')}
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[minmax(140px,auto)]">
          {FEATURES.map(({ key, Icon, bento }) => {
            const isAI = key === 'ai';
            const isInstall = key === 'install';
            return (
              <div
                key={key}
                className={`feature-card group relative rounded-2xl tilt-card ${bento}`}
              >
                {/* Gradient border wrapper */}
                <div className={`h-full rounded-2xl p-[1px] ${
                  isAI
                    ? 'bg-gradient-to-br from-orange via-grain-gold/60 to-orange/30'
                    : 'bg-gradient-to-br from-charcoal/8 via-transparent to-transparent'
                }`}>
                  <div className={`relative h-full rounded-2xl p-6 overflow-hidden transition-shadow duration-300 group-hover:shadow-depth-lg ${
                    isAI
                      ? 'bg-charcoal'
                      : 'bg-white/90 backdrop-blur-sm'
                  }`}>
                    {/* AI card: animated neural network + large glow */}
                    {isAI && (
                      <>
                        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-orange/12 blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-grain-gold/8 blur-3xl" />
                        {/* Neural network SVG */}
                        <svg className="absolute top-4 right-4 w-32 h-32 opacity-20" viewBox="0 0 100 100">
                          {NEURAL_LINKS.map(([a, b], li) => (
                            <line
                              key={li}
                              x1={NEURAL_NODES[a].cx} y1={NEURAL_NODES[a].cy}
                              x2={NEURAL_NODES[b].cx} y2={NEURAL_NODES[b].cy}
                              stroke="#F5641E" strokeWidth="0.5" opacity="0.4"
                            />
                          ))}
                          {NEURAL_NODES.map((n, ni) => (
                            <circle
                              key={ni}
                              className="neural-node"
                              cx={n.cx} cy={n.cy} r={n.r}
                              fill="#F5641E" opacity="0.7"
                            />
                          ))}
                        </svg>
                      </>
                    )}

                    <div className={`flex ${isAI ? 'flex-col gap-4' : 'items-start gap-4'}`}>
                      <div className={`shrink-0 rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${
                        isAI ? 'bg-orange/20 w-fit' : 'bg-orange/8'
                      }`}>
                        <Icon className={`h-5 w-5 ${isAI ? 'text-orange' : 'text-orange/80'}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`mb-1.5 font-[var(--font-space-grotesk)] font-bold ${
                          isAI ? 'text-lg text-white' : 'text-sm text-charcoal'
                        }`}>
                          {t(`${key}.title`)}
                        </h3>
                        <p className={`leading-relaxed ${
                          isAI ? 'text-sm text-white/60' : 'text-xs text-gray-500'
                        }`}>
                          {t(`${key}.text`)}
                        </p>
                      </div>
                    </div>

                    {/* AI badge */}
                    {isAI && (
                      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-orange/15 px-3 py-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                        <span className="data-mono text-[10px] font-bold text-orange uppercase tracking-wider">AI-powered</span>
                      </div>
                    )}

                    {/* Install card: step count badge */}
                    {isInstall && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-safe-green/10 px-3 py-1">
                        <span className="data-mono text-[10px] font-bold text-safe-green uppercase tracking-wider">&lt; 30 min</span>
                      </div>
                    )}

                    {/* Monospace tech label on hover */}
                    <div className={`absolute bottom-3 right-4 data-mono text-[9px] font-bold uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                      isAI ? 'text-orange/40' : 'text-charcoal/20'
                    }`}>
                      {key.toUpperCase()}
                    </div>
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
