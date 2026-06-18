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

function AppContent() {
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTables = async () => {
      try {
        // Verifica se a tabela movies existe tentando uma query
        const { error } = await supabase
          .from('movies')
          .select('id', { count: 'exact', head: true })
          .limit(1);
        
        // Se o erro é PGRST205, a tabela não existe
        if (error?.code === 'PGRST205') {
          setTablesExist(false);
        } else {
          setTablesExist(true);
        }
      } catch {
        setTablesExist(false);
      }
    };

    checkTables();
  }, []);

  if (tablesExist === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] dark:bg-[#000000]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A1B5D8]" />
          <p className="text-[#92A3C0] dark:text-[#A1B5D8]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!tablesExist) {
    return <SetupPage />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Layout Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/series" element={<SeriesPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watch-later" element={<WatchLaterPage />} />
              <Route path="/awarded" element={<AwardedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Not Found */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <SupabaseValidator>
      <AppContent />
    </SupabaseValidator>
  );
}
