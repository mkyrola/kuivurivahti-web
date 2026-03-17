'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/tuote' as const, label: t('product') },
    { href: '/miten-toimii' as const, label: t('howItWorks') },
    { href: '/hinnat' as const, label: t('pricing') },
    { href: '/ota-yhteytta' as const, label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className={cn(
            'font-[var(--font-space-grotesk)] text-xl font-bold tracking-tight',
            scrolled ? 'text-white' : 'text-white'
          )}>
            SEEMOTO <span className="text-orange">KUIVURIVAHTI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-orange',
                scrolled ? 'text-white/80' : 'text-white/80'
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher scrolled={scrolled} />
          <Link
            href="/ota-yhteytta"
            className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110"
          >
            {t('demo')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-charcoal/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-medium text-white/90 hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher scrolled={true} />
            <Link
              href="/ota-yhteytta"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-orange px-8 py-3 text-lg font-semibold text-white"
            >
              {t('demo')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
