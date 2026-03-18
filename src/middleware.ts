import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

/* ─── Launch: 31.3.2026 12:00 EEST (UTC+3) = 09:00 UTC ─── */
const LAUNCH_TS = new Date('2026-03-31T09:00:00Z').getTime();
const BYPASS_COOKIE = 'kv_preview';
const COMING_SOON_PATH = '/coming-soon';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Always pass through: coming-soon itself, static assets, API, internals */
  if (
    pathname.startsWith(COMING_SOON_PATH) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  /* Gate inactive after launch date */
  if (Date.now() >= LAUNCH_TS) {
    return intlMiddleware(request);
  }

  /* Bypass cookie present → show site */
  const bypassCookie = request.cookies.get(BYPASS_COOKIE);
  if (bypassCookie?.value === '1') {
    return intlMiddleware(request);
  }

  /* Rewrite to coming-soon */
  const url = request.nextUrl.clone();
  url.pathname = COMING_SOON_PATH;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
