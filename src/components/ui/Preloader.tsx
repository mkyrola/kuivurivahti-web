'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 800);
    const timer2 = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#04090f] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <p className="font-[var(--font-space-grotesk)] text-xl font-bold tracking-[0.15em] text-white/80 md:text-2xl">
          SEEMOTO <span className="text-[var(--orange)]">KUIVURIVAHTI</span>
        </p>
        {/* Animated temperature line */}
        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--orange)] to-[var(--grain-gold)]"
            style={{
              animation: 'preloader-line 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes preloader-line {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
