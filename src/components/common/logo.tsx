
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  textClassName?: string;
  iconSize?: number; // This prop might become less relevant with direct SVG
}

export function Logo({ className, textClassName, iconSize = 7, ...props }: LogoProps) {
  // The iconSize prop was used for lucide icons, less direct for complex SVGs
  // We'll use a fixed viewBox and let Tailwind size the overall SVG container
  const svgContainerSizeClass = `w-${iconSize*4} h-${iconSize*4}`; // e.g., w-28 h-28 if iconSize is 7

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <div className={cn("flex items-center", svgContainerSizeClass)} style={{ width: '28px', height: '28px' }}> {/* Fixed size for better control */}
        <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
          {/* Chart Bars (Primary Color) */}
          <rect x="5" y="15" width="8" height="10" rx="1" className="fill-primary" />
          <rect x="15" y="10" width="8" height="15" rx="1" className="fill-primary" />
          <rect x="25" y="5" width="8" height="20" rx="1" className="fill-primary" />
          {/* Megaphone Shape (Accent Color) */}
          <path d="M35 12 C35 10, 37 9, 39 9 L48 9 C50 9, 52 10, 52 12 L52 18 C52 20, 50 21, 48 21 L39 21 C37 21, 35 20, 35 18 Z M48 9 L55 5 L55 25 L48 21" className="fill-accent" stroke="hsl(var(--card))" strokeWidth="1" />
        </svg>
      </div>
      <span className={cn('text-xl font-semibold tracking-tight', textClassName || 'text-foreground')}>
        MarketMaestro
      </span>
    </div>
  );
}

    