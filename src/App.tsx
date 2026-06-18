// ========================================
// ARQUIVO: App.tsx - Arquivo principal da aplicação
// DESCRIÇÃO: Configuração de rotas, provedores de contexto e lógica inicial
// ========================================

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { SupabaseValidator } from '@/components/SupabaseValidator';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { WatchLaterPage } from '@/pages/WatchLaterPage';
import { AwardedPage } from '@/pages/AwardedPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AdminPage } from '@/pages/AdminPage';
import { SetupPage } from '@/pages/SetupPage';
import { LandingPage } from '@/pages/LandingPage';
import { SeriesPage } from '@/pages/SeriesPage';
import { GenresPage } from '@/pages/GenresPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { supabase } from '@/lib/supabase';

// Componente com o conteúdo da aplicação (dentro do SupabaseValidator)
function AppContent() {
  // Estado para rastrear se as tabelas do banco de dados existem
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);

  // Hook para verificar a existência das tabelas no banco de dados
  useEffect(() => {
    const checkTables = async () => {
      try {
        // Tenta fazer uma query na tabela movies para verificar se ela existe
        const { error } = await supabase
          .from('movies')
          .select('id', { count: 'exact', head: true })
          .limit(1);
        
        // Se o erro é PGRST205, significa que a tabela não existe
        if (error?.code === 'PGRST205') {
          setTablesExist(false);
        } else {
          // A tabela existe
          setTablesExist(true);
        }
      } catch {
        // Em caso de erro, assume que a tabela não existe
        setTablesExist(false);
      }
    };

    checkTables();
  }, []);

  // Tela de carregamento enquanto verifica as tabelas
  if (tablesExist === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] dark:bg-[#000000]">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner de carregamento */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A1B5D8]" />
          <p className="text-[#92A3C0] dark:text-[#A1B5D8]">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se as tabelas não existem, mostra a página de configuração
  if (!tablesExist) {
    return <SetupPage />;
  }

  // Retorna o aplicativo com todas as rotas quando as tabelas existem
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* ========== ROTAS PÚBLICAS (sem autenticação) ========== */}
            {/* Página inicial da aplicação - landing page */}
            <Route path="/" element={<LandingPage />} />
            {/* Redireciona /landing para / */}
            <Route path="/landing" element={<Navigate to="/" replace />} />
            
            {/* ========== ROTAS DE AUTENTICAÇÃO ========== */}
            {/* Página de login */}
            <Route path="/login" element={<LoginPage />} />
            {/* Página de registro/cadastro */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Página para recuperar senha esquecida */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Página para redefinir senha com código enviado por email */}
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* ========== ROTAS PROTEGIDAS (requerem autenticação) ========== */}
            {/* ProtectedRoute verifica se o usuário está autenticado */}
            {/* Layout envolve todas as páginas protegidas com sidebar e header */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Página inicial autenticada - homepage */}
              <Route path="/home" element={<HomePage />} />
              {/* Página de séries - catálogo de séries */}
              <Route path="/series" element={<SeriesPage />} />
              {/* Página de gêneros - browse por categoria */}
              <Route path="/genres" element={<GenresPage />} />
              {/* Página de catálogo geral - filtra por gênero selecionado */}
              <Route path="/catalog" element={<CatalogPage />} />
              {/* Página de favoritos - filmes salvos pelo usuário */}
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* Página de assistir depois - fila de espera */}
              <Route path="/watch-later" element={<WatchLaterPage />} />
              {/* Página de filmes premiados */}
              <Route path="/awarded" element={<AwardedPage />} />
              {/* Página do perfil do usuário */}
              <Route path="/profile" element={<ProfilePage />} />
              {/* Página de configurações */}
              <Route path="/settings" element={<SettingsPage />} />
              {/* Página de administração - apenas para admins */}
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* ========== ROTAS DE ERRO ========== */}
            {/* Página 404 - página não encontrada */}
            <Route path="/404" element={<NotFoundPage />} />
            {/* Redireciona qualquer rota não reconhecida para 404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Componente raiz que envolve tudo com o validador do Supabase
export default function App() {
  return (
    <SupabaseValidator>
      <AppContent />
    </SupabaseValidator>
  );
}
