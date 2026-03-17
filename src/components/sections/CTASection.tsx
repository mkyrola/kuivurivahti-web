'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const t = useTranslations('cta');
  const contact = useTranslations('contact');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cta-content > *', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    });
    gsap.fromTo('.cta-orb', { scale: 0.6, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
    });
  }, { scope: containerRef });

  const badges = t.raw('badges') as string[];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-night-deep py-36 px-6"
    >
      {/* Gradient orb — large ambient light */}
      <div className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange/15 via-grain-gold/8 to-transparent blur-3xl pointer-events-none" />
      {/* Secondary teal orb */}
      <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-aurora/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="cta-content space-y-8">
          {/* Badge */}
          <div>
            <span className="data-mono text-[10px] font-bold uppercase tracking-[0.4em] text-orange/60">SEEMOTO KUIVURIVAHTI</span>
          </div>

          {/* Headline — oversized */}
          <div>
            <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05]">
              {t('headline')}
            </h2>
          </div>

          {/* Sub content */}
          <div className="space-y-2">
            <p className="text-xl font-medium text-white/80 md:text-2xl">{t('subHeadline')}</p>
            <p className="text-sm text-white/40">{t('delivery')}</p>
            <p className="text-sm font-semibold text-orange">{t('guarantee')}</p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/ota-yhteytta"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange to-grain-gold/80 px-10 py-4 text-base font-bold text-white transition-all hover:brightness-110 hover-glow-orange"
            >
              {t('button1')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#"
              className="rounded-xl border border-white/15 px-10 py-4 text-base font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white"
            >
              {t('button2')}
            </a>
          </div>

          {/* Contact info — monospace */}
          <div className="flex flex-wrap items-center justify-center gap-6 data-mono text-xs text-white/35">
            <a href="tel:+358451259000" className="flex items-center gap-2 hover:text-orange transition-colors link-slide-underline">
              <Phone className="h-3.5 w-3.5" /> {contact('phoneNumber')}
            </a>
            <a href="mailto:kuivurivahti@seemoto.com" className="flex items-center gap-2 hover:text-orange transition-colors link-slide-underline">
              <Mail className="h-3.5 w-3.5" /> kuivurivahti@seemoto.com
            </a>
          </div>

          {/* Badges — glassmorphism pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {badges.map((b) => (
              <span key={b} className="rounded-full bg-white/5 border border-white/8 px-4 py-1.5 text-[10px] font-medium text-white/40 data-mono">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
