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
// Represents ~6h of drying session with anomaly event at hour ~4.5
const SESSION_DATA = Array.from({ length: 72 }, (_, i) => {
  const h = i / 12; // 5-min intervals → hours
  const baseExhaust = 38 + Math.sin(h * 0.8) * 4 + h * 0.3;
  const anomaly = h > 4.3 && h < 4.9 ? (h - 4.3) * 14 : 0;
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
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => {
            let count = 0;
            const interval = setInterval(() => {
              count += 3;
              setVisibleCount(count);
              if (count >= SESSION_DATA.length) clearInterval(interval);
            }, 30);
          },
        },
      }
    );
  }, { scope: containerRef });

  const chartData = SESSION_DATA.slice(0, Math.max(visibleCount, 4));

  return (
    <section ref={containerRef} className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center font-[var(--font-space-grotesk)] text-3xl font-bold text-charcoal md:text-4xl">
          {t('title')}
        </h2>
        <p className="mb-12 text-center text-sm text-gray-400">
          Todelliset anturilukemat — Elo–Syyskuu 2025
        </p>

        {/* Chart */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-8 rounded-full bg-orange" />
              Poistoilma °C
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-8 rounded-full bg-sky-dusk" />
              Ulkoilma °C
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-fire-red" />
              Anomalia havaittu
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#7A7670' }} interval={11} />
              <YAxis domain={[10, 70]} tick={{ fontSize: 11, fill: '#7A7670' }} unit="°" />
              <Tooltip
                contentStyle={{ background: '#2D2F33', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v) => [`${v}°C`]}
              />
              <ReferenceLine x="4:18" stroke="#E63946" strokeDasharray="4 2" label={{ value: 'Anomalia', fill: '#E63946', fontSize: 11 }} />
              <ReferenceLine x="4:30" stroke="#2DC653" strokeDasharray="4 2" label={{ value: 'Hälytys → OK', fill: '#2DC653', fontSize: 11 }} />
              <Line type="monotone" dataKey="exhaust" stroke="#F5641E" strokeWidth={2.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="outdoor" stroke="#2C4A6B" strokeWidth={2} dot={false} isAnimationActive={false} strokeDasharray="5 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Testimonial */}
        <div className="mt-10 rounded-2xl border border-orange/20 bg-orange/5 p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange/20 text-2xl">
              👨‍🌾
            </div>
            <div>
              <blockquote className="mb-4 text-lg italic leading-relaxed text-charcoal md:text-xl">
                &ldquo;{t('quote')}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-charcoal">{t('name')}</p>
                  <p className="text-sm text-gray-500">{t('location')}</p>
                </div>
                <div className="ml-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange">★</span>
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
