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

const RATING_COLORS: Record<string, { border: string; dot: string; text: string; stars: number }> = {
  best:  { border: 'border-l-safe-green',  dot: 'bg-safe-green',  text: 'text-safe-green',  stars: 3 },
  good:  { border: 'border-l-orange',      dot: 'bg-orange',      text: 'text-orange',      stars: 2 },
  poor:  { border: 'border-l-gray-500',    dot: 'bg-gray-500',    text: 'text-gray-500',    stars: 1 },
  avoid: { border: 'border-l-fire-red',    dot: 'bg-fire-red',    text: 'text-fire-red',    stars: 0 },
};

function formatHour(iso: string) {
  return new Date(iso).toLocaleString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function LiveDryingWidget() {
  const t = useTranslations('weather');
  const [selectedCity, setSelectedCity] = useState(FINNISH_CITIES[0]);
  const grain: GrainType = 'ohra';

  const { data, isLoading } = useSWR<{ windows: DryingWindow[] }>(
    `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&grain=${grain}`,
    fetcher,
    { refreshInterval: 900000, revalidateOnFocus: false }
  );

  const windows = data?.windows ?? [];
  const bestWindows = windows.filter((w) => w.rating === 'best' || w.rating === 'good').slice(0, 8);

  return (
    <section className="relative bg-[#050c14] py-32 px-6 overflow-hidden">
      {/* Ambient gradient mesh */}
      <div className="absolute inset-0 mesh-dark pointer-events-none" />
      {/* Radar sweep overlay */}
      <div className="radar-sweep" />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,100,30,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,100,30,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header with LIVE badge */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-safe-green animate-pulse" />
            <span className="data-mono text-[10px] font-bold text-safe-green uppercase tracking-wider">Live Data</span>
          </div>
          <h2 className="text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl tracking-tight">
            {t('headline')}
          </h2>
          <p className="text-sm text-white/40">{t('poweredBy')}</p>
        </div>

        {/* Controls bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl glass-card px-5 py-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange/70" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const city = FINNISH_CITIES.find((c) => c.name === e.target.value);
                if (city) setSelectedCity(city);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-orange/40"
            >
              {FINNISH_CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-[#0a1420] text-white">{c.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Windows list */}
        <div className="rounded-xl glass-card overflow-hidden">
          <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="data-mono text-[10px] font-bold text-orange uppercase tracking-widest">
              {t('windowsTitle')}
            </span>
            <span className="data-mono text-[10px] text-white/30">{selectedCity.name} — {selectedCity.lat.toFixed(1)}°N</span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
            </div>
          ) : bestWindows.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-sm">
              {t('ratings.avoid')}
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {bestWindows.map((w, idx) => {
                const cfg = RATING_COLORS[w.rating] ?? RATING_COLORS.poor;
                return (
                  <div
                    key={w.time}
                    className={`flex items-center justify-between px-6 py-3.5 border-l-2 ${cfg.border} hover:bg-white/[0.02] transition-colors`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
                      <span className="text-sm font-medium text-white/80 truncate">{formatHour(w.time)}</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-5 data-mono text-xs text-white/40">
                      <span>{w.temp.toFixed(1)}<span className="data-unit">°C</span></span>
                      <span>{w.rh}<span className="data-unit">%RH</span></span>
                      <span>EMC {w.emc.toFixed(1)}<span className="data-unit">%</span></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map((s) => (
                          <Star
                            key={s}
                            className={cn('h-3.5 w-3.5', s < cfg.stars ? `fill-current ${cfg.text}` : 'fill-white/10 text-white/10')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer alerts */}
          <div className="border-t border-white/5 px-6 py-3 flex flex-wrap gap-5 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-safe-green/70" />
              {t('lightningClear')}
            </span>
            <span className="flex items-center gap-1.5">
              <Snowflake className="h-3 w-3 text-sensor-blue/70" />
              {t('frostWarning', { date: 'Pe 21.3.', time: '04:00' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
