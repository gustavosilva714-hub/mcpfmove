import { ReactNode } from 'react';

export function SupabaseValidator({ children }: { children: ReactNode }) {
  // Validação agora é feita no App.tsx (AppContent component)
  // Este componente apenas passa os children através
  return <>{children}</>;
}
