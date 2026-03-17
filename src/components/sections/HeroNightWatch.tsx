'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { SensorReadout } from '@/components/ui/SensorReadout';

gsap.registerPlugin(ScrollTrigger);

export function HeroNightWatch() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=400%',
          scrub: 1.5,
          pin: true,
        },
      });

      // Stars drift
      tl.to('#stars-layer', { y: '-20%', ease: 'none' }, 0);
      tl.to('#farm-layer', { y: '-8%', ease: 'none' }, 0);

      // Phase 1: Opening text fades
      tl.to('#opening-text', { opacity: 0, y: -30 }, 0.12);

      // Phase 2: Sensor readout appears
      tl.fromTo('#temp-readout', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.15);
      tl.fromTo('#alert-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, 0.18);
      tl.to('#alert-badge', { scale: 1.08, yoyo: true, repeat: 3 }, 0.2);

      // Phase 3: Phone slides up
      tl.fromTo('#phone-mockup', { opacity: 0, y: 80 }, { opacity: 1, y: 0 }, 0.25);
      tl.to('#temp-readout', { opacity: 0 }, 0.28);
      tl.to('#alert-badge', { opacity: 0 }, 0.28);

      // Phase 4: Farmer text
      tl.fromTo('#farmer-text', { opacity: 0 }, { opacity: 1 }, 0.33);
      tl.to('#phone-mockup', { opacity: 0 }, 0.38);

      // Phase 5: Resolved
      tl.fromTo('#resolved-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.40);
      tl.to('#farmer-text', { opacity: 0 }, 0.42);
      tl.to('#resolved-text', { opacity: 0 }, 0.52);

      // Phase 6: Main headline
      tl.fromTo('#hero-headline', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.55);

      // Phase 7: CTA + stats
      tl.fromTo('#cta-row', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.68);
      tl.fromTo('#stats-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.72);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-sky-night">
      {/* Stars Layer */}
      <div id="stars-layer" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-sky-night to-sky-night">
          {/* CSS stars */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(1px 1px at 10% 20%, white, transparent),
              radial-gradient(1.5px 1.5px at 30% 15%, white, transparent),
              radial-gradient(1px 1px at 50% 30%, rgba(255,255,255,0.8), transparent),
              radial-gradient(2px 2px at 70% 10%, white, transparent),
              radial-gradient(1px 1px at 85% 25%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 15% 40%, white, transparent),
              radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 90% 35%, white, transparent),
              radial-gradient(2px 2px at 40% 8%, rgba(232,197,71,0.8), transparent),
              radial-gradient(1px 1px at 25% 50%, white, transparent)`
          }} />
        </div>
      </div>

      {/* Farm Layer */}
      <div id="farm-layer" className="absolute inset-0">
        {/* Gradient ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#1a1f14] via-[#1a1f14]/80 to-transparent" />
        {/* Dryer glow */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-32 h-48 bg-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-16 h-32 bg-orange/30 rounded-sm" />
        {/* Field silhouette lines */}
        <div className="absolute bottom-[15%] left-0 right-0 h-px bg-grain-gold/20" />
        <div className="absolute bottom-[18%] left-0 right-0 h-px bg-grain-gold/10" />
      </div>

      {/* Content Layers */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center">

          {/* Phase 1: Opening */}
          <div id="opening-text" className="space-y-4">
            <p className="font-[var(--font-bebas-neue)] text-6xl text-grain-gold md:text-8xl">{t('time')}</p>
            <p className="text-xl text-white/80 md:text-2xl">{t('dryer')}</p>
            <p className="text-xl text-white/60 md:text-2xl">{t('youSleep')}</p>
          </div>

          {/* Phase 2: Sensor alert */}
          <div id="temp-readout" className="absolute bottom-24 right-8 opacity-0 md:right-16">
            <SensorReadout label={t('exhaust')} value="34.2" unit="°C" trend="up" alert />
            <div className="mt-2">
              <SensorReadout label={t('riseRate')} value="+2.1" unit="°C/min" alert />
            </div>
          </div>
          <div id="alert-badge" className="absolute bottom-8 right-8 opacity-0 md:right-16">
            <AlertBadge state="warning" label={t('anomaly')} />
          </div>

          {/* Phase 3: Phone mockup */}
          <div id="phone-mockup" className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="w-72 rounded-3xl border-2 border-white/20 bg-sky-night/90 p-6 backdrop-blur-lg shadow-2xl">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange animate-pulse" />
                <span className="text-xs text-white/60 uppercase tracking-wider">SEEMOTO</span>
              </div>
              <p className="text-sm text-orange font-medium">⚠️ {t('checkDryer')}</p>
              <div className="mt-4 h-px bg-white/10" />
              <p className="mt-3 text-xs text-white/40">02:47</p>
            </div>
          </div>

          {/* Phase 4: Farmer text */}
          <div id="farmer-text" className="absolute inset-0 flex items-center justify-center opacity-0">
            <p className="text-2xl text-white/80 md:text-3xl">{t('buttonPresses')}</p>
          </div>

          {/* Phase 5: Resolved */}
          <div id="resolved-text" className="absolute inset-0 flex flex-col items-center justify-center opacity-0 gap-4">
            <div className="w-72 rounded-3xl border-2 border-safe-green/30 bg-sky-night/90 p-6 backdrop-blur-lg">
              <p className="text-sm text-safe-green font-medium">✅ {t('closedRemotely')}</p>
            </div>
            <p className="text-lg text-white/50">{t('backToSleep')}</p>
          </div>

          {/* Phase 6: Main headline */}
          <div id="hero-headline" className="absolute inset-0 flex flex-col items-center justify-center opacity-0 gap-6">
            <h1 className="font-[var(--font-space-grotesk)] text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              SEEMOTO <span className="text-orange">KUIVURIVAHTI</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/70 md:text-xl">{t('tagline')}</p>
            <p className="max-w-xl text-sm text-white/50">{t('subTagline')}</p>
          </div>

          {/* Phase 7: CTA */}
          <div id="cta-row" className="absolute bottom-32 left-0 right-0 flex justify-center gap-4 opacity-0">
            <Link
              href="/ota-yhteytta"
              className="rounded-full bg-orange px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110"
            >
              {t('cta1')} →
            </Link>
            <Link
              href="/miten-toimii"
              className="rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
            >
              {t('cta2')}
            </Link>
          </div>

          {/* Stats */}
          <div id="stats-row" className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 opacity-0 md:gap-16">
            {[
              { val: t('stat1'), label: t('stat1Label') },
              { val: t('stat2'), label: t('stat2Label') },
              { val: t('stat3'), label: t('stat3Label') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-[var(--font-bebas-neue)] text-2xl text-orange md:text-3xl">{s.val}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
