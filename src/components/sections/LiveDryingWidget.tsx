'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { MapPin, Zap, Snowflake, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FINNISH_CITIES } from '@/lib/weather';
import type { GrainType } from '@/lib/emc';
import type { DryingWindow } from '@/lib/weather';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const RATING_CONFIG = {
  best:  { color: 'bg-safe-green',   dot: 'bg-safe-green',  stars: 3, label: 'best'  as const },
  good:  { color: 'bg-orange/80',    dot: 'bg-orange',      stars: 2, label: 'good'  as const },
  poor:  { color: 'bg-gray-400',     dot: 'bg-gray-400',    stars: 1, label: 'poor'  as const },
  avoid: { color: 'bg-fire-red/80',  dot: 'bg-fire-red',    stars: 0, label: 'avoid' as const },
};

function formatHour(iso: string) {
  return new Date(iso).toLocaleString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function LiveDryingWidget() {
  const t = useTranslations('weather');
  const [selectedCity, setSelectedCity] = useState(FINNISH_CITIES[0]);
  const [grain, setGrain] = useState<GrainType>('ohra');

  const { data, isLoading } = useSWR<{ windows: DryingWindow[] }>(
    `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&grain=${grain}`,
    fetcher,
    { refreshInterval: 900000, revalidateOnFocus: false }
  );

  const windows = data?.windows ?? [];
  // Group by day, show best 8 hours
  const bestWindows = windows.filter((w) => w.rating === 'best' || w.rating === 'good').slice(0, 8);

  return (
    <section className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl">
          {t('headline')}
        </h2>
        <p className="mb-10 text-center text-base text-gray-500">
          {t('poweredBy')}
        </p>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const city = FINNISH_CITIES.find((c) => c.name === e.target.value);
                if (city) setSelectedCity(city);
              }}
              className="rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-orange/50"
            >
              {FINNISH_CITIES.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">🌾</span>
            <select
              value={grain}
              onChange={(e) => setGrain(e.target.value as GrainType)}
              className="rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-orange/50"
            >
              {(Object.keys(t.raw('grains')) as GrainType[]).map((g) => (
                <option key={g} value={g}>{t(`grains.${g}`)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Windows table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-charcoal px-6 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              {t('windowsTitle')}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
            </div>
          ) : bestWindows.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              {t('ratings.avoid')}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {bestWindows.map((w) => {
                const cfg = RATING_CONFIG[w.rating];
                return (
                  <div key={w.time} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${cfg.dot}`} />
                      <span className="text-sm font-medium text-charcoal">{formatHour(w.time)}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>EMC {w.emc.toFixed(1)}%</span>
                      <span>RH {w.rh}%</span>
                      <span className="hidden sm:inline">{w.temp.toFixed(1)}°C</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((s) => (
                        <Star
                          key={s}
                          className={cn('h-4 w-4', s < cfg.stars ? 'fill-orange text-orange' : 'fill-gray-200 text-gray-200')}
                        />
                      ))}
                    </div>
                    <span className={`hidden rounded-full px-3 py-1 text-xs font-semibold text-white sm:block ${cfg.color}`}>
                      {t(`ratings.${cfg.label}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer alerts */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-safe-green" />
              {t('lightningClear')}
            </span>
            <span className="flex items-center gap-1.5">
              <Snowflake className="h-3.5 w-3.5 text-sky-dusk" />
              {t('frostWarning', { date: 'Pe 21.3.', time: '04:00' })}
            </span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">{t('poweredBy')}</p>
      </div>
    </section>
  );
}
