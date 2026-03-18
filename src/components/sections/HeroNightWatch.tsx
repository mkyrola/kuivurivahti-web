'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { SensorReadout } from '@/components/ui/SensorReadout';

gsap.registerPlugin(ScrollTrigger);

// Deterministic star field — 90 stars, no Math.random() to avoid SSR mismatch
const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 79.32) % 65,
  r: i % 9 === 0 ? 2.2 : i % 4 === 0 ? 1.6 : 1.0,
  op: 0.35 + (i % 12) * 0.055,
  gold: i % 17 === 0,
  twinkle: i % 5 === 0,
}));

// Deterministic firefly positions near barn area
const FIREFLIES = Array.from({ length: 16 }, (_, i) => ({
  left: 35 + (i * 17.3) % 30,
  bottom: 20 + (i * 11.7) % 20,
  delay: (i * 1.3) % 6,
  duration: 3 + (i % 4) * 1.5,
  size: 2 + (i % 3),
}));

export function HeroNightWatch() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const starsLayerRef = useRef<HTMLDivElement>(null);

  // Cursor parallax on stars
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const layer = starsLayerRef.current;
    if (!layer) return;
    const x = (e.clientX / window.innerWidth - 0.5) * -12;
    const y = (e.clientY / window.innerHeight - 0.5) * -8;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Twinkling stars
      gsap.utils.toArray<Element>('.star-t').forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.15,
          duration: 1.2 + (i % 6) * 0.35,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: (i * 0.19) % 2.5,
        });
      });

      // Exhaust shimmer
      gsap.to('#exhaust-glow', {
        opacity: 0.3,
        scale: 1.15,
        yoyo: true,
        repeat: -1,
        duration: 2.1,
        ease: 'sine.inOut',
        transformOrigin: '50% 100%',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=400%',
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to('#stars-layer', { y: '-18%', ease: 'none' }, 0);
      tl.to('#farm-layer', { y: '-6%', ease: 'none' }, 0);
      tl.to('#opening-text', { opacity: 0, y: -40, duration: 0.1 }, 0.12);
      tl.fromTo('#temp-readout', { opacity: 0, x: 40 }, { opacity: 1, x: 0 }, 0.15);
      tl.fromTo('#alert-badge', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }, 0.19);
      tl.to('#alert-badge', { scale: 1.1, yoyo: true, repeat: 3, duration: 0.04 }, 0.21);
      tl.fromTo('#phone-mockup', { opacity: 0, y: 70 }, { opacity: 1, y: 0 }, 0.26);
      tl.to(['#temp-readout', '#alert-badge'], { opacity: 0 }, 0.30);
      tl.fromTo('#farmer-text', { opacity: 0 }, { opacity: 1 }, 0.34);
      tl.to('#phone-mockup', { opacity: 0 }, 0.39);
      tl.fromTo('#resolved-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.41);
      tl.to('#farmer-text', { opacity: 0 }, 0.43);
      tl.to('#resolved-text', { opacity: 0 }, 0.53);
      tl.fromTo('#hero-headline', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.56);
      tl.fromTo('#cta-row', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.69);
      tl.fromTo('#stats-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.73);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: '#06101a' }}
      onMouseMove={handleMouseMove}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04090f] via-[#0a1828] via-60% to-[#0e1e0e]" />

      {/* Milky way band */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 120% 30% at 60% 25%, rgba(180,200,255,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Shooting star — occasional SVG animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[15%] w-[2px] h-[2px] bg-white rounded-full" style={{ animation: 'shooting-star 2.5s ease-in 0s infinite', animationDelay: '3s' }}>
          <div className="absolute top-0 left-0 w-[40px] h-[1px] bg-gradient-to-l from-white/80 to-transparent -translate-x-full" />
        </div>
        <div className="absolute top-[12%] left-[65%] w-[2px] h-[2px] bg-white rounded-full" style={{ animation: 'shooting-star 2s ease-in 0s infinite', animationDelay: '11s' }}>
          <div className="absolute top-0 left-0 w-[30px] h-[1px] bg-gradient-to-l from-white/60 to-transparent -translate-x-full" />
        </div>
      </div>

      {/* Stars layer — with cursor parallax */}
      <div id="stars-layer" ref={starsLayerRef} className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {STARS.map((s, i) => (
            <circle
              key={i}
              className={s.twinkle ? 'star-t' : undefined}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill={s.gold ? '#E8C547' : 'white'}
              opacity={s.op}
            />
          ))}
          {/* Bright feature stars */}
          <circle className="star-t" cx="22%" cy="12%" r="2.8" fill="#E8C547" opacity="0.85" />
          <circle className="star-t" cx="78%" cy="8%"  r="2.4" fill="white"   opacity="0.90" />
          <circle className="star-t" cx="47%" cy="5%"  r="2.0" fill="white"   opacity="0.80" />
          <circle cx="10%" cy="18%" r="1.5" fill="#cce0ff" opacity="0.70" />
          <circle cx="91%" cy="22%" r="1.5" fill="#cce0ff" opacity="0.65" />
        </svg>
      </div>

      {/* Firefly particles near barn */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {FIREFLIES.map((f, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${f.left}%`,
              bottom: `${f.bottom}%`,
              width: f.size,
              height: f.size,
              background: i % 3 === 0 ? '#E8C547' : '#F5641E',
              animation: `firefly ${f.duration}s ease-in-out ${f.delay}s infinite`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Farm silhouette layer */}
      <div id="farm-layer" className="absolute inset-x-0 bottom-0 pointer-events-none">
        {/* Ground fog / field */}
        <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-[#07100a] via-[#0c180c]/90 to-transparent" />

        {/* Horizon amber glow — simulates distant farm lights */}
        <div className="absolute bottom-[30%] left-0 right-0 h-24 bg-gradient-to-t from-[#F5641E]/12 to-transparent blur-2xl" />

        {/* Main dryer building SVG */}
        <svg
          viewBox="0 0 1440 480"
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <radialGradient id="win-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F5641E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F5641E" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="exhaust-halo" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#F5641E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F5641E" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ground-halo" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#F5641E" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F5641E" stopOpacity="0" />
            </radialGradient>
            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Far-right distant silo group ── */}
          <rect x="1260" y="280" width="55" height="200" fill="#070d07" rx="2" />
          <ellipse cx="1287" cy="280" rx="28" ry="8" fill="#090f09" />
          <rect x="1330" y="310" width="40" height="170" fill="#060c06" rx="2" />
          <ellipse cx="1350" cy="310" rx="20" ry="6" fill="#080e08" />

          {/* ── Far-left outbuilding ── */}
          <rect x="60" y="310" width="160" height="170" fill="#060c06" />
          <polygon points="40,310 140,270 280,310" fill="#080e08" />
          <rect x="110" y="370" width="30" height="50" fill="#040a04" />

          {/* ── Ground halo under main building ── */}
          <ellipse id="ground-halo-el" cx="720" cy="475" rx="340" ry="60" fill="url(#ground-halo)" />

          {/* ── Main dryer barn — large centre building ── */}
          {/* Body */}
          <rect x="490" y="180" width="460" height="300" fill="#080e08" />
          {/* Roof */}
          <polygon points="460,180 720,80 980,180" fill="#0b110b" />
          {/* Roof ridge detail */}
          <line x1="720" y1="80" x2="720" y2="180" stroke="#0f150f" strokeWidth="3" />

          {/* ── Exhaust chimney / drying pipe ── */}
          <rect x="700" y="20" width="26" height="72" fill="#0d130d" rx="3" />
          {/* Exhaust cap */}
          <rect x="694" y="16" width="38" height="8" fill="#111711" rx="2" />
          {/* Glowing exhaust — animated via GSAP */}
          <ellipse id="exhaust-glow" cx="713" cy="18" rx="28" ry="12" fill="url(#exhaust-halo)" opacity="0.5" />
          <ellipse cx="713" cy="18" rx="14" ry="6" fill="#F5641E" opacity="0.35" filter="url(#soft-glow)" />

          {/* ── Windows with warm glow ── */}
          {/* Main window (bright — active alert) */}
          <rect x="610" y="270" width="54" height="40" fill="#F5A623" opacity="0.9" rx="3" />
          <rect x="607" y="267" width="60" height="46" fill="url(#win-glow)" rx="4" />
          {/* Secondary window (dimmer) */}
          <rect x="720" y="270" width="54" height="40" fill="#C8831A" opacity="0.55" rx="3" />
          {/* Top vent slats */}
          <rect x="660" y="200" width="60" height="8"  fill="#0c120c" rx="1" />
          <rect x="660" y="213" width="60" height="8"  fill="#0c120c" rx="1" />
          <rect x="660" y="226" width="60" height="8"  fill="#0c120c" rx="1" />

          {/* ── Door ── */}
          <rect x="690" y="370" width="70" height="110" fill="#060c06" rx="3" />
          <rect x="695" y="375" width="28" height="50"  fill="#0a100a" rx="1" />
          <rect x="727" y="375" width="28" height="50"  fill="#0a100a" rx="1" />

          {/* ── Right-side grain intake tower ── */}
          <rect x="950" y="230" width="100" height="250" fill="#070d07" rx="2" />
          <polygon points="940,230 1000,190 1060,230" fill="#090f09" />
          <rect x="980" y="290" width="20" height="12" fill="#C8831A" opacity="0.4" rx="1" />

          {/* ── Left annex / small shed ── */}
          <rect x="360" y="310" width="130" height="170" fill="#070d07" />
          <polygon points="345,310 425,270 505,310" fill="#090f09" />
          <rect x="410" y="380" width="24" height="38" fill="#050b05" rx="1" />

          {/* ── Ground / field lines ── */}
          <line x1="0" y1="460" x2="1440" y2="460" stroke="#E8C547" strokeOpacity="0.06" strokeWidth="1" />
          <line x1="0" y1="470" x2="1440" y2="470" stroke="#E8C547" strokeOpacity="0.04" strokeWidth="1" />
          {/* Furrow lines */}
          <line x1="0" y1="450" x2="460" y2="450" stroke="#E8C547" strokeOpacity="0.04" strokeWidth="1" />
          <line x1="980" y1="450" x2="1440" y2="450" stroke="#E8C547" strokeOpacity="0.04" strokeWidth="1" />
        </svg>

        {/* Window light spill on ground */}
        <div className="absolute bottom-[14%] left-[calc(50%-30px)] h-20 w-28 rounded-full bg-amber-400/15 blur-2xl" />

        {/* Fog wisps at ground level */}
        <div className="absolute bottom-[8%] left-0 right-0 h-16 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" style={{ animation: 'fog-drift 30s ease-in-out infinite' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'fog-drift 25s ease-in-out infinite reverse', animationDelay: '-8s' }} />
        </div>
      </div>

      {/* ── CONTENT LAYERS ── */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">

          {/* Phase 1 — Opening cinematic text */}
          <div id="opening-text" className="space-y-4">
            <p className="font-[var(--font-bebas-neue)] text-[clamp(4rem,14vw,9rem)] leading-none text-grain-gold drop-shadow-[0_0_40px_rgba(232,197,71,0.3)]">
              {t('time')}
            </p>
            <div className="mx-auto h-px w-24 bg-white/20" />
            <p className="text-[clamp(1.1rem,3vw,1.75rem)] font-light tracking-wide text-white/90">
              {t('dryer')}
            </p>
            <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-white/50">
              {t('youSleep')}
            </p>
          </div>

          {/* Phase 2 — Sensor readout (right side) */}
          <div id="temp-readout" className="absolute right-6 top-[30%] space-y-3 opacity-0 md:right-14">
            <SensorReadout label={t('exhaust')} value="34.2" unit="°C" trend="up" alert />
            <SensorReadout label={t('riseRate')} value="+2.1" unit="°C/min" alert />
          </div>
          <div id="alert-badge" className="absolute right-6 top-[58%] opacity-0 md:right-14">
            <AlertBadge state="warning" label={t('anomaly')} />
          </div>

          {/* Phase 3 — Phone notification mockup — enhanced with glow */}
          <div id="phone-mockup" className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="relative w-80 rounded-3xl border border-white/15 bg-[#080f18]/95 p-6 shadow-2xl backdrop-blur-xl">
              {/* Phone screen glow */}
              <div className="absolute -inset-6 rounded-[2.5rem] bg-orange/5 blur-2xl pointer-events-none" />
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">SEEMOTO</span>
                </div>
                <span className="text-xs text-white/25">02:47</span>
              </div>
              <p className="text-base font-semibold text-orange">⚠️ {t('checkDryer')}</p>
              <p className="mt-1.5 text-xs text-white/40">{t('riseRate')}: +2.1°C/min</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-fire-red/30 bg-fire-red/10 py-2.5 text-center text-xs font-semibold text-fire-red">
                  🔴 Hälytys
                </div>
                <div className="rounded-xl border border-safe-green/30 bg-safe-green/10 py-2.5 text-center text-xs font-semibold text-safe-green">
                  ✓ Jäähdytys
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 — Farmer action text */}
          <div id="farmer-text" className="absolute inset-0 flex items-center justify-center opacity-0">
            <p className="text-[clamp(1.25rem,4vw,2.5rem)] font-light text-white/80">
              {t('buttonPresses')}
            </p>
          </div>

          {/* Phase 5 — Resolved */}
          <div id="resolved-text" className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-0">
            <div className="w-80 rounded-3xl border border-safe-green/25 bg-[#080f18]/95 p-6 backdrop-blur-xl">
              <p className="text-base font-semibold text-safe-green">✅ {t('closedRemotely')}</p>
            </div>
            <p className="text-lg text-white/40">{t('backToSleep')}</p>
          </div>

          {/* Phase 6 — Main headline */}
          <div id="hero-headline" className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 opacity-0">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange/70">SEEMOTO</p>
            <h1 className="font-[var(--font-space-grotesk)] text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] text-white">
              KUIVURI<span className="text-orange">VAHTI</span>
            </h1>
            <p className="max-w-2xl text-[clamp(0.95rem,2.2vw,1.2rem)] text-white/65">{t('tagline')}</p>
            <p className="max-w-xl text-sm text-white/35">{t('subTagline')}</p>
          </div>

          {/* Phase 7 — CTA buttons */}
          <div id="cta-row" className="absolute bottom-28 left-0 right-0 flex flex-col items-center justify-center gap-3 px-4 opacity-0 sm:flex-row sm:gap-4">
            <Link
              href="/ota-yhteytta"
              className="rounded-full bg-orange px-9 py-4 text-base font-bold text-white shadow-lg shadow-orange/25 transition-all hover:scale-[1.03] hover:brightness-110"
            >
              {t('cta1')} →
            </Link>
            <Link
              href="/miten-toimii"
              className="rounded-full border-2 border-white/25 px-9 py-4 text-base font-semibold text-white transition-all hover:border-white/55"
            >
              {t('cta2')}
            </Link>
          </div>

          {/* Stats bar */}
          <div id="stats-row" className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 opacity-0 md:gap-16">
            {[
              { val: t('stat1'), label: t('stat1Label') },
              { val: t('stat2'), label: t('stat2Label') },
              { val: t('stat3'), label: t('stat3Label') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-[var(--font-bebas-neue)] text-[clamp(1.3rem,3vw,1.9rem)] text-orange">{s.val}</p>
                <p className="text-[11px] uppercase tracking-wider text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
