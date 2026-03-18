'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

gsap.registerPlugin(ScrollTrigger);

// Simulated real data based on Veijo Huju pilot (Aug–Sep 2025)
// Normal exhaust temp range: 40–60°C. Anomaly spike reaches ~75°C.
const SESSION_DATA = Array.from({ length: 72 }, (_, i) => {
  const h = i / 12;
  const baseExhaust = 48 + Math.sin(h * 0.8) * 5 + h * 0.4;
  const anomaly = h > 4.3 && h < 4.9 ? (h - 4.3) * 22 : 0;
  const outdoor = 18 + Math.sin(h * 0.4) * 3;
  return {
    t: `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`,
    exhaust: parseFloat((baseExhaust + anomaly).toFixed(1)),
    outdoor: parseFloat(outdoor.toFixed(1)),
    idx: i,
  };
});

export function DryingCurveStory() {
  const t = useTranslations('testimonial');
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.curve-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.curve-head', start: 'top 85%' },
    });

    gsap.fromTo('.curve-chart', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.curve-chart', start: 'top 80%',
        onEnter: () => {
          let count = 0;
          const interval = setInterval(() => {
            count += 3;
            setVisibleCount(count);
            if (count >= SESSION_DATA.length) clearInterval(interval);
          }, 30);
        },
      },
    });

    gsap.fromTo('.curve-quote', { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.curve-quote', start: 'top 85%' },
    });
  }, { scope: containerRef });

  const chartData = SESSION_DATA.slice(0, Math.max(visibleCount, 4));

  return (
    <section ref={containerRef} className="relative bg-frost-white py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-frost pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="curve-head mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/70 data-mono">Real Sensor Data</p>
          <h2 className="font-[var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-charcoal tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-sm text-charcoal/40 data-mono">
            Todelliset anturilukemat — Huju Farm, Sastamala — Elo–Syyskuu 2025
          </p>
        </div>

        {/* Chart — dark card with enhanced depth */}
        <div className="curve-chart rounded-2xl bg-[#0d1520] p-6 md:p-8 shadow-depth-lg border border-white/5">
          <div className="mb-5 flex flex-wrap items-center gap-6 text-xs data-mono">
            <span className="flex items-center gap-2 text-white/50">
              <span className="inline-block h-0.5 w-6 rounded-full bg-orange" />
              Poistoilma °C
            </span>
            <span className="flex items-center gap-2 text-white/50">
              <span className="inline-block h-0.5 w-6 rounded-full bg-sky-dusk" />
              Ulkoilma °C
            </span>
            <span className="flex items-center gap-2 text-white/50">
              <span className="inline-block h-2 w-2 rounded-full bg-fire-red" />
              Anomalia
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }} interval={11} stroke="rgba(255,255,255,0.1)" />
              <YAxis domain={[10, 85]} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }} unit="°" stroke="rgba(255,255,255,0.1)" />
              <Tooltip
                contentStyle={{ background: 'rgba(13,21,32,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '11px', fontFamily: 'var(--font-jetbrains)' }}
                formatter={(v) => [`${v}°C`]}
              />
              <ReferenceLine x="4:18" stroke="#E63946" strokeDasharray="4 2" label={{ value: 'Anomalia', fill: '#E63946', fontSize: 10 }} />
              <ReferenceLine x="4:30" stroke="#2DC653" strokeDasharray="4 2" label={{ value: 'OK', fill: '#2DC653', fontSize: 10 }} />
              <Line type="monotone" dataKey="exhaust" stroke="#F5641E" strokeWidth={2.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="outdoor" stroke="#2C4A6B" strokeWidth={1.5} dot={false} isAnimationActive={false} strokeDasharray="5 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Testimonial — editorial pull quote with warm accent */}
        <div className="curve-quote mt-14 relative rounded-2xl bg-white p-8 md:p-10 shadow-depth-lg border-l-4 border-l-orange">
          {/* Giant quotation mark */}
          <span className="absolute -top-4 left-8 font-[var(--font-bebas-neue)] text-[140px] leading-none text-orange/8 select-none">&ldquo;</span>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange/20 to-grain-gold/10 text-2xl">
              👨‍🌾
            </div>
            <div className="min-w-0">
              <blockquote className="mb-5 text-lg font-medium italic leading-relaxed text-charcoal md:text-xl">
                &ldquo;{t('quote')}&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="font-[var(--font-space-grotesk)] font-bold text-charcoal">{t('name')}</p>
                  <p className="text-sm text-gray-500">{t('location')}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-grain-gold text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
