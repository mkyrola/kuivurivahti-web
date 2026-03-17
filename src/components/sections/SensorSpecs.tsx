'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Droplets, Radio, Battery, Shield, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { icon: Thermometer, key: 'pt100' as const, value: '±0.1°C', accent: '#F5641E' },
  { icon: Droplets, key: 'sht41' as const, value: '±1% RH', accent: '#3B82F6' },
  { icon: Radio, key: 'nrf' as const, value: '4G LTE', accent: '#0A6B5C' },
  { icon: Battery, key: 'battery' as const, value: '3+ v', accent: '#2DC653' },
  { icon: Shield, key: 'ip67' as const, value: 'IP67', accent: '#E8C547' },
  { icon: CheckCircle2, key: 'ce' as const, value: 'CE ✓', accent: '#3DBA7E' },
];

export function SensorSpecs() {
  const t = useTranslations('sensor');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.sensor-head', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.sensor-head', start: 'top 85%' },
    });

    gsap.fromTo('.device-visual', { opacity: 0, scale: 0.85 }, {
      opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.device-visual', start: 'top 80%' },
    });

    gsap.fromTo('.spec-item', { opacity: 0, x: -24 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    });

    gsap.fromTo('.spec-value', { opacity: 0, scale: 0.5 }, {
      opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-night-deep py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-dark pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="sensor-head mb-16 text-center lg:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange/60 data-mono">Hardware Specs</p>
          <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
            {t('headline')}
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left — Device Visual */}
          <div className="device-visual relative flex items-center justify-center lg:sticky lg:top-32">
            <div className="relative h-80 w-80">
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-full bg-orange/8 blur-3xl" />

              {/* Orbiting ring */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(245,100,30,0.12)" strokeWidth="1" strokeDasharray="8 12" />
              </svg>

              {/* Inner ring */}
              <div className="absolute inset-10 rounded-full border border-white/5" />

              {/* Device body */}
              <div className="absolute inset-16 rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#0d1520] border border-white/10 flex items-center justify-center shadow-depth-lg overflow-hidden">
                {/* Internal circuit lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                  <line x1="20" y1="0" x2="20" y2="100" stroke="#F5641E" strokeWidth="0.3" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#3B82F6" strokeWidth="0.3" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="#F5641E" strokeWidth="0.3" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#3B82F6" strokeWidth="0.3" />
                  <line x1="0" y1="70" x2="100" y2="70" stroke="#F5641E" strokeWidth="0.3" />
                  <circle cx="20" cy="30" r="2" fill="#F5641E" opacity="0.4" />
                  <circle cx="50" cy="70" r="2" fill="#3B82F6" opacity="0.4" />
                  <circle cx="80" cy="30" r="2" fill="#F5641E" opacity="0.4" />
                </svg>

                <div className="relative text-center z-10">
                  <div className="text-[10px] text-orange/50 uppercase tracking-[0.4em] mb-1 data-mono">SEEMOTO</div>
                  <div className="font-[var(--font-bebas-neue)] text-3xl text-white tracking-wider">KV-1</div>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-safe-green animate-pulse" />
                    <span className="data-mono text-[9px] text-safe-green/80 uppercase">Online</span>
                  </div>
                </div>
              </div>

              {/* Annotation dots with labels */}
              {SPECS.map(({ value, accent }, i) => {
                const deg = i * 60;
                const radius = 46;
                const top = 50 - radius * Math.cos((deg * Math.PI) / 180);
                const left = 50 + radius * Math.sin((deg * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="absolute flex items-center gap-1"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="h-2 w-2 rounded-full ring-2 ring-offset-1"
                      style={{ background: accent, borderColor: accent, boxShadow: `0 0 8px ${accent}40` }}
                    />
                    <span className="data-mono text-[9px] font-bold text-white/60 whitespace-nowrap hidden lg:inline">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Specs list */}
          <div className="space-y-3">
            {SPECS.map(({ icon: Icon, key, value, accent }) => (
              <div
                key={key}
                className="spec-item group glass-card rounded-xl px-5 py-4 flex items-center gap-4 hover-lift cursor-default"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${accent}18` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-white/85">{t(key)}</span>
                </div>
                <span
                  className="spec-value data-mono text-sm font-bold shrink-0"
                  style={{ color: accent }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
