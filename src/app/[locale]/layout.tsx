import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Space_Grotesk, Inter, Bebas_Neue, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: ['viljankuivuri', 'etävalvonta', 'kuivurivahti', 'seemoto', 'tekoäly', 'palovaroitus'],
    openGraph: {
      title: 'SEEMOTO KUIVURIVAHTI',
      description: messages.meta.description,
      images: ['/images/og-image.png'],
      locale: locale === 'fi' ? 'fi_FI' : locale === 'sv' ? 'sv_SE' : locale === 'de' ? 'de_DE' : locale === 'et' ? 'et_EE' : 'en_GB',
    },
    alternates: {
      canonical: 'https://kuivurivahti.fi',
      languages: {
        fi: 'https://kuivurivahti.fi',
        en: 'https://kuivurivahti.fi/en',
        sv: 'https://kuivurivahti.fi/sv',
        et: 'https://kuivurivahti.fi/et',
        de: 'https://kuivurivahti.fi/de',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}>
      <body className="noise-overlay bg-off-white text-charcoal antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <ScrollProgress />
            <Navigation />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
