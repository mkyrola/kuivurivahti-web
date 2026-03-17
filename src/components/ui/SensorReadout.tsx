'use client';

import { cn } from '@/lib/utils';

interface SensorReadoutProps {
  label: string;
  value: string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  alert?: boolean;
  className?: string;
}

export function SensorReadout({ label, value, unit, trend, alert, className }: SensorReadoutProps) {
  return (
    <div className={cn(
      'rounded-xl border border-white/10 bg-sky-night/80 backdrop-blur-sm px-4 py-3',
      alert && 'border-orange/50',
      className
    )}>
      <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className={cn(
          'font-[var(--font-bebas-neue)] text-3xl',
          alert ? 'text-orange' : 'text-white'
        )}>
          {value}
        </span>
        <span className="text-sm text-white/60">{unit}</span>
        {trend && (
          <span className={cn(
            'ml-2 text-sm',
            trend === 'up' && 'text-fire-red',
            trend === 'down' && 'text-safe-green',
            trend === 'stable' && 'text-white/40',
          )}>
            {trend === 'up' ? '↑↑↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
    </div>
  );
}
