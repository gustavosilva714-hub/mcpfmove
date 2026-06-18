import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#A1B5D8]/20 text-[#2D2B2B] dark:bg-[#324A5F]/40 dark:text-[#CCC9DC]',
        secondary: 'border-transparent bg-[#92A3C0]/20 text-[#2D2B2B] dark:bg-[#1B2A41] dark:text-[#CCC9DC]',
        outline: 'border-[#92A3C0] text-[#2D2B2B] dark:border-[#324A5F] dark:text-[#CCC9DC]',
        award: 'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
