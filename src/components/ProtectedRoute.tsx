// ========================================
// ARQUIVO: ProtectedRoute.tsx - Componente de rota protegida
// DESCRIÇÃO: Wrapper que garante que apenas usuários autenticados podem acessar uma rota
// Se não estiver logado, redireciona para /login
// ========================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';

// ========== INTERFACE ==========
interface ProtectedRouteProps {
  children: React.ReactNode; // Componente a ser renderizado se autenticado
}

/**
 * Componente que protege rotas da aplicação
 * Verifica se o usuário está autenticado antes de renderizar o componente
 * Se não estiver autenticado, redireciona para a página de login
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // ========== CONTEXTO ==========
  const { user, loading } = useAuth();

  // ========== LÓGICA ==========
  // Enquanto está carregando a sessão, mostra um loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Spinner de carregamento */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Se não tem usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se tem usuário, renderiza o componente protegido
  return <>{children}</>;
}
