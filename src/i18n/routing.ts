import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fi', 'en', 'sv', 'et', 'de'],
  defaultLocale: 'fi',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/tuote': {
      fi: '/tuote',
      en: '/product',
      sv: '/produkt',
      et: '/toode',
      de: '/produkt',
    },
    '/miten-toimii': {
      fi: '/miten-toimii',
      en: '/how-it-works',
      sv: '/hur-det-fungerar',
      et: '/kuidas-toimib',
      de: '/wie-es-funktioniert',
    },
    '/hinnat': {
      fi: '/hinnat',
      en: '/pricing',
      sv: '/prissattning',
      et: '/hinnad',
      de: '/preise',
    },
    '/asiakkaat': {
      fi: '/asiakkaat',
      en: '/customers',
      sv: '/kunder',
      et: '/kliendid',
      de: '/kunden',
    },
    '/ota-yhteytta': {
      fi: '/ota-yhteytta',
      en: '/contact',
      sv: '/kontakt',
      et: '/kontakt',
      de: '/kontakt',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
