import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fi', 'en', 'sv'],
  defaultLocale: 'fi',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/tuote': {
      fi: '/tuote',
      en: '/product',
      sv: '/produkt',
    },
    '/miten-toimii': {
      fi: '/miten-toimii',
      en: '/how-it-works',
      sv: '/hur-det-fungerar',
    },
    '/hinnat': {
      fi: '/hinnat',
      en: '/pricing',
      sv: '/prissattning',
    },
    '/asiakkaat': {
      fi: '/asiakkaat',
      en: '/customers',
      sv: '/kunder',
    },
    '/ota-yhteytta': {
      fi: '/ota-yhteytta',
      en: '/contact',
      sv: '/kontakt',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
