'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Droplets, Radio, Battery, Shield, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SensorSpecs() {
  const t = useTranslations('sensor');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.spec-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const specs = [
    { icon: Thermometer, key: 'pt100' as const },
    { icon: Droplets, key: 'sht41' as const },
    { icon: Radio, key: 'nrf' as const },
    { icon: Battery, key: 'battery' as const },
    { icon: Shield, key: 'ip67' as const },
    { icon: CheckCircle2, key: 'ce' as const },
  ];

  return (
    <section ref={containerRef} className="bg-charcoal py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left — visual device placeholder */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-72 w-72">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-orange/10 animate-[float_4s_ease-in-out_infinite]" />
              <div className="absolute inset-8 rounded-full bg-orange/5 border border-orange/20" />
              {/* Device body */}
              <div className="absolute inset-16 rounded-2xl bg-charcoal border-2 border-orange/40 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-xs text-orange/60 uppercase tracking-widest mb-1">SEEMOTO</div>
                  <div className="font-[var(--font-bebas-neue)] text-2xl text-white">KV-1</div>
                  <div className="mt-2 h-2 w-2 rounded-full bg-safe-green mx-auto animate-pulse" />
                </div>
              </div>
              {/* Annotation dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-orange/60"
                  style={{
                    top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — specs list */}
          <div>
            <h2 className="mb-10 font-[var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl">
              {t('headline')}
            </h2>
            <div className="space-y-4">
              {specs.map(({ icon: Icon, key }) => (
                <div key={key} className="spec-item flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/15">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <span className="text-sm font-medium text-white/85">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
