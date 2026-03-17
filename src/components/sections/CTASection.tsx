'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const t = useTranslations('cta');
  const contact = useTranslations('contact');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.cta-content > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  const badges = t.raw('badges') as string[];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-charcoal py-32 px-6"
    >
      {/* Background grain-field gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-night via-charcoal to-[#0f1e10] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,100,30,0.12)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="cta-content space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange">SEEMOTO</p>
            <h2 className="mt-2 font-[var(--font-space-grotesk)] text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t('headline')}
            </h2>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-semibold text-white/90">{t('subHeadline')}</p>
            <p className="text-base text-white/60">{t('delivery')}</p>
            <p className="text-base font-medium text-orange">{t('guarantee')}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/ota-yhteytta"
              className="rounded-full bg-orange px-10 py-4 text-lg font-semibold text-white transition-all hover:scale-[1.03] hover:brightness-110 shadow-lg shadow-orange/30"
            >
              {t('button1')}
            </Link>
            <a
              href="#"
              className="rounded-full border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
            >
              {t('button2')}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <a href="tel:+358451259000" className="flex items-center gap-2 hover:text-orange transition-colors">
              <Phone className="h-4 w-4" /> {contact('phoneNumber')}
            </a>
            <a href="mailto:kuivurivahti@seemoto.com" className="flex items-center gap-2 hover:text-orange transition-colors">
              <Mail className="h-4 w-4" /> kuivurivahti@seemoto.com
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {badges.map((b) => (
              <span key={b} className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/60">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
