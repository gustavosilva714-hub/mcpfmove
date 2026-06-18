import React, { createContext, useContext } from 'react';

interface ThemeContextValue {
  theme: 'dark';
  resolvedTheme: 'dark';
  setTheme: (theme: 'dark') => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Tema sempre escuro
  const value: ThemeContextValue = {
    theme: 'dark',
    resolvedTheme: 'dark',
    setTheme: () => {}, // Não faz nada
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
