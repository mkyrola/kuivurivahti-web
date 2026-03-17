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
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${isSEEMOTO ? 'bg-safe-green/20 text-safe-green' : 'text-safe-green'}`}>
      <Check className="h-3.5 w-3.5 mr-1" />{t('yes')}
    </span>
  );
  if (value === false) return (
    <span className="inline-flex items-center justify-center text-gray-300">
      <X className="h-4 w-4" />
    </span>
  );
  if (value === 'partial') return (
    <span className="inline-flex items-center text-harvest-amber text-xs font-medium">
      <Minus className="h-3.5 w-3.5 mr-1" />{t('partial')}
    </span>
  );
  if (value === 'onlyAntti') return <span className="text-xs text-gray-400">{t('onlyAntti')}</span>;
  if (value === 'under30min') return (
    <span className={`text-xs font-semibold ${isSEEMOTO ? 'text-safe-green' : 'text-charcoal'}`}>{t('under30min')}</span>
  );
  return <span className="text-xs text-gray-500">{value}</span>;
}

export function CompetitorTable() {
  const t = useTranslations('competitor');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.comp-row',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl">
          {t('headline')}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">{t('feature')}</th>
                <th className="px-4 py-4 text-center bg-charcoal/5 border-x border-orange/20">
                  <div className="font-[var(--font-space-grotesk)] text-sm font-bold text-charcoal">SEEMOTO</div>
                  <div className="text-xs font-bold text-orange">KUIVURIVAHTI</div>
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400">Wiljami</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400">Cauco CL</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400">Antti Optima</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map(({ key, seemoto, wiljami, cauco, antti }) => (
                <tr key={key} className="comp-row hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal">{t(key)}</td>
                  <td className="px-4 py-4 text-center bg-charcoal/5 border-x border-orange/10">
                    <Cell value={seemoto} t={t} isSEEMOTO />
                  </td>
                  <td className="px-4 py-4 text-center"><Cell value={wiljami} t={t} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={cauco} t={t} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={antti} t={t} /></td>
                </tr>
              ))}
              {/* Price row */}
              <tr className="comp-row bg-gray-50 font-semibold">
                <td className="px-6 py-4 text-charcoal">{t('price')}</td>
                <td className="px-4 py-4 text-center bg-charcoal/5 border-x border-orange/20">
                  <span className="font-[var(--font-bebas-neue)] text-xl text-orange">{PRICES.seemoto}</span>
                </td>
                <td className="px-4 py-4 text-center text-gray-500">{PRICES.wiljami}</td>
                <td className="px-4 py-4 text-center text-gray-500">{PRICES.cauco}</td>
                <td className="px-4 py-4 text-center text-gray-500">{PRICES.antti}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">* Hintatiedot verkkosivuilta, maaliskuu 2026</p>
      </div>
    </section>
  );
}
