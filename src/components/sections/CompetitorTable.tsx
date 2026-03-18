'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type CellValue = true | false | 'partial' | 'onlyAntti' | string;

const ROWS: { key: string; seemoto: CellValue; wiljami: CellValue; cauco: CellValue; antti: CellValue }[] = [
  { key: 'remote',         seemoto: true,        wiljami: true,     cauco: true,      antti: 'onlyAntti' },
  { key: 'exhaustHumidity',seemoto: true,        wiljami: false,    cauco: false,     antti: false },
  { key: 'aiFireAlert',    seemoto: true,        wiljami: false,    cauco: false,     antti: false },
  { key: 'allBrands',      seemoto: true,        wiljami: true,     cauco: 'partial', antti: 'onlyAntti' },
  { key: 'selfInstall',    seemoto: 'under30min',wiljami: 'partial',cauco: true,      antti: false },
  { key: 'fourGBattery',   seemoto: true,        wiljami: 'partial',cauco: 'partial', antti: false },
];

const PRICES = { seemoto: '€799', wiljami: '~€900', cauco: '€1 800', antti: '€3 000+' };

function Cell({ value, t, isSEEMOTO = false }: { value: CellValue; t: (k: string) => string; isSEEMOTO?: boolean }) {
  if (value === true) return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${isSEEMOTO ? 'bg-safe-green/20 text-safe-green' : 'text-safe-green/70'}`}>
      <Check className="h-3.5 w-3.5 mr-1" />{t('yes')}
    </span>
  );
  if (value === false) return (
    <span className="inline-flex items-center justify-center text-white/15">
      <X className="h-4 w-4" />
    </span>
  );
  if (value === 'partial') return (
    <span className="inline-flex items-center text-harvest-amber/70 text-xs font-medium">
      <Minus className="h-3.5 w-3.5 mr-1" />{t('partial')}
    </span>
  );
  if (value === 'onlyAntti') return <span className="text-xs text-white/25">{t('onlyAntti')}</span>;
  if (value === 'under30min') return (
    <span className={`text-xs font-semibold ${isSEEMOTO ? 'text-safe-green' : 'text-white/50'}`}>{t('under30min')}</span>
  );
  return <span className="text-xs text-white/40">{value}</span>;
}

export function CompetitorTable() {
  const t = useTranslations('competitor');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.comp-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.comp-head', start: 'top 85%' },
    });
    gsap.fromTo('.comp-row', { opacity: 0, y: 12 }, {
      opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-frost-white py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-frost pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <div className="comp-head mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/70 data-mono">Comparison</p>
          <h2 className="font-[var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-charcoal tracking-tight">
            {t('headline')}
          </h2>
        </div>

        {/* Mobile scroll hint */}
        <div className="mb-3 flex items-center justify-end gap-2 sm:hidden">
          <span className="text-[10px] text-charcoal/30 data-mono">Vieritä →</span>
          <div className="h-px w-8 bg-gradient-to-r from-orange/30 to-transparent" />
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-depth-lg border border-charcoal/5">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-charcoal/8">
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-charcoal/40 data-mono">{t('feature')}</th>
                <th className="px-4 py-5 text-center bg-gradient-to-b from-orange/8 to-orange/3 border-x border-orange/15 relative">
                  <div className="font-[var(--font-space-grotesk)] text-sm font-bold text-charcoal">SEEMOTO</div>
                  <div className="data-mono text-[10px] font-bold text-orange tracking-wider">KUIVURIVAHTI</div>
                  {/* Top glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange via-grain-gold to-orange rounded-t" />
                </th>
                <th className="px-4 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-charcoal/25 data-mono">Wiljami</th>
                <th className="px-4 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-charcoal/25 data-mono">Cauco CL</th>
                <th className="px-4 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-charcoal/25 data-mono hidden sm:table-cell">Antti Optima</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {ROWS.map(({ key, seemoto, wiljami, cauco, antti }) => (
                <tr key={key} className="comp-row hover:bg-orange/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal/70 text-sm">{t(key)}</td>
                  <td className="px-4 py-4 text-center bg-orange/[0.03] border-x border-orange/10">
                    <Cell value={seemoto} t={t} isSEEMOTO />
                  </td>
                  <td className="px-4 py-4 text-center opacity-60"><Cell value={wiljami} t={t} /></td>
                  <td className="px-4 py-4 text-center opacity-60"><Cell value={cauco} t={t} /></td>
                  <td className="px-4 py-4 text-center opacity-60 hidden sm:table-cell"><Cell value={antti} t={t} /></td>
                </tr>
              ))}
              {/* Price row */}
              <tr className="comp-row border-t-2 border-charcoal/10">
                <td className="px-6 py-5 font-bold text-charcoal">{t('price')}</td>
                <td className="px-4 py-5 text-center bg-orange/[0.05] border-x border-orange/15 relative">
                  <span className="data-mono text-3xl font-bold text-orange">{PRICES.seemoto}</span>
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-safe-green/10 px-2.5 py-0.5 text-[9px] font-bold text-safe-green data-mono uppercase tracking-wider">
                      <Check className="h-2.5 w-2.5" /> Best Value
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 text-center data-mono text-charcoal/25 text-lg">{PRICES.wiljami}</td>
                <td className="px-4 py-5 text-center data-mono text-charcoal/25 text-lg">{PRICES.cauco}</td>
                <td className="px-4 py-5 text-center data-mono text-charcoal/25 text-lg hidden sm:table-cell">{PRICES.antti}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-center text-xs text-charcoal/25 data-mono">* Hintatiedot verkkosivuilta, maaliskuu 2026</p>
      </div>
    </section>
  );
}
