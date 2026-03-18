'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anchorLinks = [
    { href: '#tuote', label: t('product') },
    { href: '#miten-toimii', label: t('howItWorks') },
    { href: '#hinnat', label: t('pricing') },
  ];

  const scrollTo = (hash: string) => {
    setMobileOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/' + hash;
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#0d1520]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-[var(--font-space-grotesk)] text-lg font-bold tracking-tight text-white">
            SEEMOTO <span className="text-orange transition-colors group-hover:text-grain-gold">KUIVURIVAHTI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {anchorLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="link-slide-underline text-[13px] font-medium text-white/65 transition-colors hover:text-white cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/ota-yhteytta"
            className="link-slide-underline text-[13px] font-medium text-white/65 transition-colors hover:text-white"
          >
            {t('contact')}
          </Link>
          <LanguageSwitcher scrolled={scrolled} />
          <Link
            href="/ota-yhteytta"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange to-grain-gold/80 px-5 py-2 text-[13px] font-bold text-white transition-all hover:brightness-110 hover-glow-orange"
          >
            {t('demo')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-[#0d1520]/98 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col items-center gap-7 pt-14">
            {anchorLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-lg font-medium text-white/80 hover:text-orange transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/ota-yhteytta"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-white/80 hover:text-orange transition-colors"
            >
              {t('contact')}
            </Link>
            <LanguageSwitcher scrolled={true} />
            <Link
              href="/ota-yhteytta"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange to-grain-gold/80 px-8 py-3 text-base font-bold text-white"
            >
              {t('demo')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
