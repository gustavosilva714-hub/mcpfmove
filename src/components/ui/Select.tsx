import React from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ className, label, options, placeholder, ...props }: SelectProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-md border border-[#92A3C0]/50 bg-white px-3 py-2 pr-8 text-sm',
            'text-[#2D2B2B]',
            'focus:outline-none focus:ring-2 focus:ring-[#A1B5D8] focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-[#324A5F] dark:bg-[#0C1821] dark:text-[#CCC9DC]',
            'dark:focus:ring-[#324A5F]',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#92A3C0] dark:text-[#A1B5D8] pointer-events-none" />
      </div>
    </div>
  );
}
