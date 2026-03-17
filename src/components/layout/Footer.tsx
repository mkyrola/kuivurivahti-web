'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const contact = useTranslations('contact');

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-[var(--font-space-grotesk)] text-xl font-bold text-white">
              SEEMOTO <span className="text-orange">KUIVURIVAHTI</span>
            </span>
            <div className="mt-4 border-l-4 border-orange pl-4">
              <p className="text-sm italic text-white/70">{t('tagline')}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{nav('product')}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/tuote" className="hover:text-orange transition-colors">{nav('product')}</Link>
              <Link href="/miten-toimii" className="hover:text-orange transition-colors">{nav('howItWorks')}</Link>
              <Link href="/hinnat" className="hover:text-orange transition-colors">{nav('pricing')}</Link>
              <Link href="/ota-yhteytta" className="hover:text-orange transition-colors">{nav('contact')}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{nav('contact')}</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+358451259000" className="flex items-center gap-2 hover:text-orange transition-colors">
                <Phone size={14} /> {contact('phoneNumber')}
              </a>
              <a href="mailto:kuivurivahti@seemoto.com" className="flex items-center gap-2 hover:text-orange transition-colors">
                <Mail size={14} /> kuivurivahti@seemoto.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Tampere, Finland
              </span>
            </div>
          </div>

          {/* Language + Badges */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{nav('language')}</h3>
            <LanguageSwitcher scrolled={true} />
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">Valmistettu Suomessa</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">CE</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">Business Finland</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/50">{t('company')}</p>
          <div className="flex gap-6 text-xs text-white/50">
            <a href="/privacy" className="hover:text-orange transition-colors">{t('privacy')}</a>
            <a href="/terms" className="hover:text-orange transition-colors">{t('terms')}</a>
            <a href="/cookies" className="hover:text-orange transition-colors">{t('cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
