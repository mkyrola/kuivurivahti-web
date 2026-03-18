'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Showstopper — CSS/SVG scroll-driven sensor reveal
 * Scrolling transitions the device from external view → X-ray cutaway
 * showing internal components. Pure CSS + SVG, no heavy assets.
 */
export function SensorReveal() {
  const t = useTranslations('sensorReveal');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2500',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Fade in device
    tl.fromTo('.reveal-device', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });

    // Phase 2: External shell fades, x-ray shows
    tl.fromTo('.reveal-shell', { opacity: 1 }, { opacity: 0.15, duration: 1.5 }, '+=0.3');
    tl.fromTo('.reveal-xray', { opacity: 0 }, { opacity: 1, duration: 1.5 }, '<');

    // Phase 3: Labels cascade in
    tl.fromTo('.reveal-label', { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out',
    }, '-=0.5');

    // Phase 4: Glow pulse at the end
    tl.fromTo('.reveal-glow', { opacity: 0 }, { opacity: 1, duration: 0.8 });

    // Phase 5: Text overlay
    tl.fromTo('.reveal-text', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out',
    }, '-=0.3');

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen bg-night-deep overflow-hidden">
      <div className="absolute inset-0 mesh-dark pointer-events-none" />

      {/* Center device container */}
      <div className="relative flex h-full items-center justify-center">
        <div className="reveal-device relative w-[320px] h-[420px] md:w-[400px] md:h-[520px]">

          {/* External shell — simplified sensor box SVG */}
          <svg className="reveal-shell absolute inset-0 w-full h-full" viewBox="0 0 400 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main body */}
            <rect x="80" y="40" width="240" height="400" rx="24" fill="#1a2030" stroke="#F5641E" strokeWidth="2" strokeOpacity="0.4" />
            {/* Top cap */}
            <rect x="100" y="20" width="200" height="40" rx="12" fill="#141c28" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
            {/* Antenna */}
            <rect x="192" y="0" width="16" height="30" rx="4" fill="#1a2030" stroke="#F5641E" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="200" cy="4" r="4" fill="#F5641E" opacity="0.6" />
            {/* SEEMOTO label */}
            <text x="200" y="100" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="14" fontFamily="var(--font-space-grotesk)" fontWeight="700" letterSpacing="3">SEEMOTO</text>
            <text x="200" y="118" textAnchor="middle" fill="#F5641E" fillOpacity="0.8" fontSize="10" fontFamily="var(--font-jetbrains)" fontWeight="700" letterSpacing="2">KUIVURIVAHTI</text>
            {/* LED status ring */}
            <circle cx="200" cy="160" r="16" fill="none" stroke="#F5641E" strokeWidth="2" opacity="0.5" />
            <circle cx="200" cy="160" r="8" fill="#F5641E" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Ventilation slots */}
            {[240, 260, 280, 300, 320].map((y) => (
              <rect key={y} x="140" y={y} width="120" height="2" rx="1" fill="white" fillOpacity="0.06" />
            ))}
            {/* Bottom mounting bracket */}
            <rect x="120" y="420" width="160" height="20" rx="6" fill="#141c28" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
            {/* Screw holes */}
            <circle cx="140" cy="430" r="4" fill="#0a1018" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            <circle cx="260" cy="430" r="4" fill="#0a1018" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>

          {/* X-ray cutaway — internal components */}
          <svg className="reveal-xray absolute inset-0 w-full h-full opacity-0" viewBox="0 0 400 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Faint outline */}
            <rect x="80" y="40" width="240" height="400" rx="24" fill="none" stroke="#F5641E" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4" />

            {/* 4G Module */}
            <rect x="130" y="70" width="80" height="50" rx="8" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" />
            <text x="170" y="100" textAnchor="middle" fill="#3B82F6" fillOpacity="0.8" fontSize="8" fontFamily="var(--font-jetbrains)">4G LTE</text>

            {/* MCU / Processor */}
            <rect x="160" y="140" width="80" height="60" rx="6" fill="#F5641E" fillOpacity="0.12" stroke="#F5641E" strokeWidth="1" strokeOpacity="0.4" />
            <text x="200" y="175" textAnchor="middle" fill="#F5641E" fillOpacity="0.9" fontSize="8" fontFamily="var(--font-jetbrains)">MCU</text>
            {/* MCU traces */}
            <line x1="160" y1="170" x2="130" y2="170" stroke="#F5641E" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="240" y1="170" x2="270" y2="170" stroke="#F5641E" strokeWidth="0.5" strokeOpacity="0.3" />

            {/* Temperature sensor 1 (exhaust) */}
            <circle cx="140" cy="260" r="18" fill="#E63946" fillOpacity="0.12" stroke="#E63946" strokeWidth="1" strokeOpacity="0.5" />
            <text x="140" y="264" textAnchor="middle" fill="#E63946" fillOpacity="0.9" fontSize="7" fontFamily="var(--font-jetbrains)">TEMP1</text>
            {/* Temperature sensor 2 (outdoor) */}
            <circle cx="260" cy="260" r="18" fill="#3DBA7E" fillOpacity="0.12" stroke="#3DBA7E" strokeWidth="1" strokeOpacity="0.5" />
            <text x="260" y="264" textAnchor="middle" fill="#3DBA7E" fillOpacity="0.9" fontSize="7" fontFamily="var(--font-jetbrains)">TEMP2</text>

            {/* Battery */}
            <rect x="130" y="320" width="140" height="60" rx="10" fill="#E8C547" fillOpacity="0.1" stroke="#E8C547" strokeWidth="1" strokeOpacity="0.4" />
            <text x="200" y="355" textAnchor="middle" fill="#E8C547" fillOpacity="0.8" fontSize="8" fontFamily="var(--font-jetbrains)">BATTERY</text>
            {/* Battery level bars */}
            <rect x="150" y="365" width="20" height="6" rx="2" fill="#E8C547" fillOpacity="0.5" />
            <rect x="175" y="365" width="20" height="6" rx="2" fill="#E8C547" fillOpacity="0.5" />
            <rect x="200" y="365" width="20" height="6" rx="2" fill="#E8C547" fillOpacity="0.5" />
            <rect x="225" y="365" width="20" height="6" rx="2" fill="#E8C547" fillOpacity="0.2" />

            {/* Connection traces */}
            <line x1="140" y1="242" x2="175" y2="200" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            <line x1="260" y1="242" x2="225" y2="200" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            <line x1="200" y1="320" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>

          {/* Component labels — positioned outside device */}
          <div className="reveal-label absolute -left-44 top-[15%] hidden md:flex items-center gap-2 opacity-0">
            <span className="data-mono text-[10px] text-sensor-blue font-bold">4G CONNECTIVITY</span>
            <div className="h-px w-10 bg-sensor-blue/30" />
          </div>
          <div className="reveal-label absolute -right-40 top-[30%] hidden md:flex items-center gap-2 opacity-0">
            <div className="h-px w-10 bg-orange/30" />
            <span className="data-mono text-[10px] text-orange font-bold">AI PROCESSOR</span>
          </div>
          <div className="reveal-label absolute -left-52 top-[50%] hidden md:flex items-center gap-2 opacity-0">
            <span className="data-mono text-[10px] text-fire-red font-bold">EXHAUST SENSOR</span>
            <div className="h-px w-10 bg-fire-red/30" />
          </div>
          <div className="reveal-label absolute -right-52 top-[50%] hidden md:flex items-center gap-2 opacity-0">
            <div className="h-px w-10 bg-aurora/30" />
            <span className="data-mono text-[10px] text-aurora font-bold">OUTDOOR SENSOR</span>
          </div>
          <div className="reveal-label absolute -left-44 top-[68%] hidden md:flex items-center gap-2 opacity-0">
            <span className="data-mono text-[10px] text-grain-gold font-bold">5-YEAR BATTERY</span>
            <div className="h-px w-10 bg-grain-gold/30" />
          </div>

          {/* Central glow */}
          <div className="reveal-glow absolute inset-0 opacity-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-orange/10 blur-3xl" />
          </div>
        </div>

        {/* Text overlays at bottom */}
        <div className="absolute bottom-16 left-0 right-0 text-center px-6">
          <p className="reveal-text data-mono text-[10px] font-bold text-orange/60 uppercase tracking-[0.3em] opacity-0">
            Inside the sensor
          </p>
          <h3 className="reveal-text mt-3 font-[var(--font-space-grotesk)] text-2xl font-bold text-white md:text-3xl tracking-tight opacity-0">
            {t('headline')}
          </h3>
          <p className="reveal-text mt-2 text-sm text-white/40 max-w-md mx-auto opacity-0">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
