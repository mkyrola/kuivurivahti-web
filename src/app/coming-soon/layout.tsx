import type { ReactNode } from 'react';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: 'SEEMOTO KUIVURIVAHTI — Tulossa pian',
  description: 'Julkistus 31.3.2026',
};

export default function ComingSoonLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
