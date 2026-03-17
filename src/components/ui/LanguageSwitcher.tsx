'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LOCALES = [
  { code: 'fi', flag: '🇫🇮', name: 'Suomi' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
  { code: 'et', flag: '🇪🇪', name: 'Eesti' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
] as const;

export function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-1">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => router.replace(pathname, { locale: l.code })}
          className={cn(
            'rounded-md px-2 py-1 text-xs transition-colors',
            locale === l.code
              ? 'bg-orange text-white'
              : scrolled
                ? 'text-white/60 hover:text-white'
                : 'text-white/60 hover:text-white'
          )}
          title={l.name}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}
