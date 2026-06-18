import { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

const SQL_PREVIEW = `-- ============================================================================
-- MCPFMovies Database Setup
-- Copie e cole este código completo no SQL Editor do Supabase
-- ============================================================================

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLES - PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  class_series TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
  theme TEXT CHECK (theme IN ('light', 'dark', 'system')) DEFAULT 'system',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE TABLES - MOVIES
CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  genre TEXT,
  duration INTEGER,
  class_series TEXT,
  year INTEGER,
  is_award_winner BOOLEAN DEFAULT FALSE,
  award_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

... (veja DATABASE_SETUP.sql para o arquivo completo)`;

export function SetupPage() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#000000] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-[#0F1419] rounded-lg p-8 border border-[#92A3C0]/20 dark:border-[#324A5F]/30">
          <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 dark:bg-yellow-900/20">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Configuração Inicial Necessária
              </h1>
              <p className="text-[#92A3C0] dark:text-[#A1B5D8]">
                O banco de dados do Supabase precisa ser inicializado. Siga os passos abaixo.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6 mt-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-semibold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
                  Abra o SQL Editor do Supabase
                </h3>
                <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-2 text-sm">
                  Acesse o seu projeto Supabase e vá para <strong>SQL Editor</strong> no menu lateral.
                </p>
                <a
                  href="https://app.supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                >
                  Abrir Supabase
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="h-px bg-[#92A3C0]/10 dark:bg-[#324A5F]/30" />

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-semibold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
                  Copie o SQL do arquivo DATABASE_SETUP.sql
                </h3>
                <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-2 text-sm">
                  Abra o arquivo <code className="bg-[#1B2A41] dark:bg-[#0F1419] px-2 py-1 rounded text-xs">DATABASE_SETUP.sql</code> no seu projeto e copie todo o conteúdo.
                </p>
                
                <div className="mt-4">
                  <details className="group cursor-pointer">
                    <summary className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                      <span>▶</span> Ver preview do SQL
                    </summary>
                    <pre className="mt-3 bg-[#1B2A41] dark:bg-[#0A0E14] text-[#A1B5D8] p-4 rounded-md overflow-x-auto text-xs leading-relaxed">
                      {SQL_PREVIEW}
                    </pre>
                  </details>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#92A3C0]/10 dark:bg-[#324A5F]/30" />

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-semibold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
                  Cole no SQL Editor
                </h3>
                <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-2 text-sm">
                  No Supabase, clique em "New Query", cole o SQL e execute (Ctrl+Enter ou botão RUN).
                </p>
              </div>
            </div>

            <div className="h-px bg-[#92A3C0]/10 dark:bg-[#324A5F]/30" />

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-semibold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
                  Recarregue o app
                </h3>
                <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-2 text-sm">
                  Após a execução, recarregue esta página (F5 ou Ctrl+R) para continuar.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-8 pt-6 border-t border-[#92A3C0]/20 dark:border-[#324A5F]/30">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium cursor-pointer"
            >
              {showInstructions ? '▼ Ocultar detalhes' : '▶ Ver o que será criado'}
            </button>

            {showInstructions && (
              <div className="mt-4 space-y-4 text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                <div className="bg-[#F0F4F8] dark:bg-[#1B2A41]/50 p-4 rounded">
                  <p className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">📌 Tabelas criadas:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">profiles</code> - Perfis de usuário</li>
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">movies</code> - Filmes do sistema</li>
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">movie_uploads</code> - Rastreamento de uploads</li>
                  </ul>
                  <p className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC] mt-3 mb-2">☁️ Buckets de Storage:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">avatars</code> - Fotos de perfil (5MB)</li>
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">thumbnails</code> - Capas de filmes (10MB)</li>
                    <li><code className="bg-[#1B2A41] px-1 py-0.5 rounded text-xs">videos</code> - Arquivos de vídeo (5GB)</li>
                  </ul>
                </div>
                <p className="text-xs">
                  💡 Se receber "table already exists", ignora - significa que você já executou este script.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
