// ========================================
// ARQUIVO: useAuth.ts - Hook de autenticação
// DESCRIÇÃO: Hook customizado para acessar o contexto de autenticação
// ========================================

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Hook para acessar o contexto de autenticação em qualquer componente
 * 
 * Uso:
 * const { user, profile, signIn, signOut } = useAuth();
 * 
 * Retorna:
 * - user: User do Supabase (null se não logado)
 * - session: Sessão ativa (null se não logado)
 * - profile: Perfil do usuário (turma, avatar, etc)
 * - loading: Indica se está carregando a sessão
 * - signIn: Função para fazer login
 * - signUp: Função para criar conta
 * - signOut: Função para fazer logout
 * - resetPassword: Função para recuperar senha
 * - updateProfile: Função para atualizar perfil
 * - refreshProfile: Função para sincronizar perfil com banco de dados
 */
export function useAuth() {
  // Obtém o contexto de autenticação
  const ctx = useContext(AuthContext);
  // Se o contexto não existir, significa que o hook foi usado fora do AuthProvider
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
