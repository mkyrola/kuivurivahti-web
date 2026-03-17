'use client';

import { cn } from '@/lib/utils';

interface AlertBadgeProps {
  state: 'safe' | 'warning' | 'fire';
  label: string;
  className?: string;
}

export function AlertBadge({ state, label, className }: AlertBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white',
        state === 'safe' && 'bg-safe-green',
        state === 'warning' && 'bg-orange animate-[pulse-orange_2s_infinite]',
        state === 'fire' && 'bg-fire-red animate-[pulse-orange_1s_infinite]',
        className
      )}
    >
      <span className={cn(
        'h-2.5 w-2.5 rounded-full',
        state === 'safe' && 'bg-white',
        state === 'warning' && 'bg-white animate-pulse',
        state === 'fire' && 'bg-white animate-ping',
      )} />
      {label}
    </span>
  );
}
