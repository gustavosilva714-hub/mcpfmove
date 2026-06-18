// ========================================
// ARQUIVO: AuthContext.tsx - Contexto de autenticação
// DESCRIÇÃO: Gerencia sessão do usuário, autenticação e perfil
// Fornece dados para toda a aplicação através do React Context
// ========================================

import React, { createContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

// ========== INTERFACE DO CONTEXTO ==========
// Define quais dados e funções o contexto fornecerá
interface AuthContextValue {
  // ========== DADOS DO USUÁRIO ==========
  user: User | null; // Usuário autenticado do Supabase
  session: Session | null; // Sessão ativa
  profile: Profile | null; // Dados do perfil (turma, nome, avatar, etc)
  
  // ========== ESTADO ==========
  loading: boolean; // Indicador de carregamento durante verificação inicial
  
  // ========== FUNÇÕES DE AUTENTICAÇÃO ==========
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  
  // ========== FUNÇÕES DE PERFIL ==========
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>; // Sincroniza o perfil com o banco de dados
}

// Cria o contexto com valor inicial undefined
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ========== PROVEDOR DO CONTEXTO ==========
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ========== ESTADOS ==========
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // ========== FUNÇÕES AUXILIARES ==========
  /**
   * Busca o perfil do usuário no banco de dados
   * O perfil contém informações como nome, turma, avatar, etc
   */
  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (data) setProfile(data as Profile);
    } catch {
      // profile pode não existir ainda (usuário novo)
    }
  };

  /**
   * Sincroniza o perfil com o banco de dados
   * Usado após atualizações do perfil para refletir as mudanças imediatamente
   */
  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  // ========== EFEITOS ==========
  // Verifica a sessão do usuário ao carregar a aplicação
  useEffect(() => {
    let isMounted = true;

    // Timeout para evitar travamento na verificação de sessão
    const sessionTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn('Session check timeout, continuing without session');
        setLoading(false);
      }
    }, 5000);

    // Obtém a sessão atual do Supabase
    supabase.auth.getSession()
      .then(({ data: { session } }: { data: { session: Session | null } }) => {
        clearTimeout(sessionTimeout);
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          // Se existe uma sessão, carrega o perfil do usuário
          if (session?.user) fetchProfile(session.user.id);
          setLoading(false);
        }
      })
      .catch((err) => {
        clearTimeout(sessionTimeout);
        console.error('Failed to get session:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    // Monitora mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: string, session: Session | null) => {
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        // Quando o usuário faz login/logout, sincroniza o perfil
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(sessionTimeout);
      subscription.unsubscribe();
    };
  }, []);

  // ========== FUNÇÕES DE AUTENTICAÇÃO ==========
  /**
   * Autentica um usuário com email e senha
   * Retorna um erro se as credenciais forem inválidas
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  /**
   * Cria uma nova conta de usuário
   * 1. Registra no Supabase Auth
   * 2. Cria um perfil na tabela profiles
   */
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    // Se o cadastro foi bem-sucedido, cria um perfil com dados padrão
    if (!error && data?.user) {
      try {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          role: 'student', // Novo usuário começa como estudante
          theme: 'system', // Tema padrão é o do sistema
        });
      } catch {
        // O perfil pode já existir em alguns casos
      }
    }

    return { error };
  };

  /**
   * Desautentica o usuário atual (logout)
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  /**
   * Envia um email para recuperação de senha
   * O usuário receberá um link com código para redefinir a senha
   */
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  /**
   * Atualiza os dados do perfil do usuário
   * Sincroniza automaticamente com o estado local após atualização
   */
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') };
    try {
      // Atualiza o perfil no banco de dados com timestamp
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      // Se bem-sucedido, carrega os dados atualizados
      if (!error) await fetchProfile(user.id);
      return { error };
    } catch (e) {
      return { error: e as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
