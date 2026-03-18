'use client';

import { useRef, useCallback } from 'react';

export function useTiltCard(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
  }, [maxTilt]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
