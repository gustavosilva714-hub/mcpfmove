import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#92A3C0] dark:text-[#A1B5D8]">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-[#92A3C0]/50 bg-white px-3 py-2 text-sm',
              'text-[#2D2B2B] placeholder:text-[#92A3C0]',
              'focus:outline-none focus:ring-2 focus:ring-[#A1B5D8] focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-[#324A5F] dark:bg-[#0C1821] dark:text-[#CCC9DC] dark:placeholder:text-[#324A5F]',
              'dark:focus:ring-[#324A5F]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-400',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92A3C0] dark:text-[#A1B5D8]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8]">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
