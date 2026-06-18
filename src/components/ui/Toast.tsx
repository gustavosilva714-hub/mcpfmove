import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
}

interface ToastContextValue {
  toast: (t: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'rounded-lg border p-4 shadow-lg transition-all',
              'bg-white dark:bg-[#1B2A41] border-[#92A3C0]/30 dark:border-[#324A5F]',
              t.variant === 'success' && 'border-l-4 border-l-green-500',
              t.variant === 'error' && 'border-l-4 border-l-red-500',
              t.variant === 'default' && 'border-l-4 border-l-[#A1B5D8]',
            )}
          >
            <p className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">{t.title}</p>
            {t.description && (
              <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mt-0.5">{t.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
