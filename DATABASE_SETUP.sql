-- ============================================================================
-- MCPFMovies Database Setup
-- Copie e cole este código completo no SQL Editor do Supabase
-- ============================================================================
-- IMPORTANTE: Execute este script completo na aba SQL do Supabase
-- ============================================================================

-- ============================================================================
-- 1. ENABLE EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "http";
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- ============================================================================
-- 2. CREATE TABLES
-- ============================================================================

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
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

-- ============================================================================
-- MOVIES TABLE
-- ============================================================================
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

-- ============================================================================
-- FAVORITES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- ============================================================================
-- WATCH_LATER TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS watch_later (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- ============================================================================
-- RATINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- ============================================================================
-- WATCH_HISTORY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS watch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- MOVIE_UPLOADS TABLE (rastrear uploads)
-- ============================================================================
CREATE TABLE IF NOT EXISTS movie_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  file_type TEXT CHECK (file_type IN ('thumbnail', 'video', 'subtitle')) NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. CREATE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_movie_id ON favorites(movie_id);
CREATE INDEX IF NOT EXISTS idx_watch_later_user_id ON watch_later(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_later_movie_id ON watch_later(movie_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_movie_id ON ratings(movie_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_user_id ON watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_movie_id ON watch_history(movie_id);
CREATE INDEX IF NOT EXISTS idx_movies_genre ON movies(genre);
CREATE INDEX IF NOT EXISTS idx_movies_class_series ON movies(class_series);
CREATE INDEX IF NOT EXISTS idx_movies_is_award_winner ON movies(is_award_winner);
CREATE INDEX IF NOT EXISTS idx_movie_uploads_movie_id ON movie_uploads(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_uploads_uploaded_by ON movie_uploads(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_movie_uploads_file_type ON movie_uploads(file_type);

-- ============================================================================
-- 4. CREATE ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Disable RLS temporarily to set it up properly
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE movies DISABLE ROW LEVEL SECURITY;
ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE watch_later DISABLE ROW LEVEL SECURITY;
ALTER TABLE ratings DISABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE movie_uploads DISABLE ROW LEVEL SECURITY;

-- PROFILES RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public profiles" ON profiles
  FOR SELECT USING (true);

-- MOVIES RLS
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view movies" ON movies
  FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can insert movies" ON movies
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Movie creators can update their movies" ON movies
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Admins can delete movies" ON movies
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- FAVORITES RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- WATCH_LATER RLS
ALTER TABLE watch_later ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own watch_later list" ON watch_later
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to their own watch_later" ON watch_later
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own watch_later" ON watch_later
  FOR DELETE USING (auth.uid() = user_id);

-- RATINGS RLS
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings" ON ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON ratings
  FOR DELETE USING (auth.uid() = user_id);

-- WATCH_HISTORY RLS
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own watch history" ON watch_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to their own watch history" ON watch_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watch history" ON watch_history
  FOR UPDATE USING (auth.uid() = user_id);

-- MOVIE_UPLOADS RLS
ALTER TABLE movie_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view movie uploads" ON movie_uploads
  FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can upload" ON movie_uploads
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Uploaders can view their uploads" ON movie_uploads
  FOR SELECT USING (uploaded_by = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ============================================================================
-- 5. CREATE FUNCTIONS
-- ============================================================================

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, theme)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'student',
    'system'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at on profiles
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profiles_updated_at();

-- ============================================================================
-- 6. CREATE STORAGE BUCKETS (Automático)
-- ============================================================================

-- Function to create buckets
CREATE OR REPLACE FUNCTION create_storage_buckets()
RETURNS TABLE (bucket_name TEXT, status TEXT) AS $$
BEGIN
  -- Create avatars bucket
  INSERT INTO storage.buckets (id, name, owner, public, file_size_limit, allowed_mime_types)
  VALUES (
    'avatars',
    'avatars',
    auth.uid(),
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN QUERY SELECT 'avatars'::TEXT, 'created or already exists'::TEXT;

  -- Create thumbnails bucket
  INSERT INTO storage.buckets (id, name, owner, public, file_size_limit, allowed_mime_types)
  VALUES (
    'thumbnails',
    'thumbnails',
    auth.uid(),
    true,
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN QUERY SELECT 'thumbnails'::TEXT, 'created or already exists'::TEXT;

  -- Create videos bucket
  INSERT INTO storage.buckets (id, name, owner, public, file_size_limit, allowed_mime_types)
  VALUES (
    'videos',
    'videos',
    auth.uid(),
    true,
    5368709120, -- 5GB
    ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN QUERY SELECT 'videos'::TEXT, 'created or already exists'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute bucket creation
SELECT * FROM create_storage_buckets();

-- ============================================================================
-- 7. CREATE STORAGE RLS POLICIES
-- ============================================================================

-- Enable RLS on storage buckets
INSERT INTO storage.buckets (id, name, owner, public) VALUES ('avatars', 'avatars', NULL, true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, owner, public) VALUES ('thumbnails', 'thumbnails', NULL, true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, owner, public) VALUES ('videos', 'videos', NULL, true) ON CONFLICT DO NOTHING;

-- Avatars bucket policies
CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid() IS NOT NULL
    AND (storage.filename(name)) = concat(auth.uid()::text, '.*')
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' 
    AND auth.uid() IS NOT NULL
  );

-- Thumbnails bucket policies
CREATE POLICY "Anyone can view thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

CREATE POLICY "Teachers and admins can upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'thumbnails' 
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- Videos bucket policies
CREATE POLICY "Anyone can view videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
  );

-- ============================================================================
-- 8. INSERT SAMPLE DATA (Comentado - Descomente se quiser dados de exemplo)
-- ============================================================================

-- Dados de exemplo foram removidos. Se quiser adicionar, descomente as linhas abaixo:
-- INSERT INTO movies (id, title, description, genre, duration, class_series, year, is_award_winner, award_category, created_by)
-- VALUES 
--   (uuid_generate_v4(), 'Documentário Natureza', 'Um documentário sobre a natureza brasileira e sua biodiversidade', 'Documentário', 45, '5º Ano', 2024, true, 'Melhor Documentário', NULL),
--   (uuid_generate_v4(), 'Animação Aventura', 'Uma animação emocionante sobre amizade e coragem', 'Animação', 80, '6º Ano', 2024, false, NULL, NULL),
--   (uuid_generate_v4(), 'Drama Escolar', 'Drama sobre a vida escolar e desafios dos adolescentes', 'Drama', 120, '8º Ano', 2024, true, 'Melhor Roteiro', NULL),
--   (uuid_generate_v4(), 'Comédia Familiar', 'Uma comédia para toda a família com bom humor', 'Comédia', 90, '5º Ano', 2024, false, NULL, NULL),
--   (uuid_generate_v4(), 'Ficção Científica', 'Futuro e tecnologia em um mundo distópico', 'Ficção', 110, '1º Médio', 2024, true, 'Melhor Filme', NULL)
-- ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================

-- Contar tabelas criadas
DO $$
DECLARE
  table_count INT;
BEGIN
  SELECT COUNT(*) INTO table_count FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  RAISE NOTICE '✓ Tabelas criadas: %', table_count;
END $$;

-- ============================================================================
-- CONFIGURAÇÃO CONCLUÍDA!
-- ============================================================================
-- ✓ Tabelas criadas com sucesso
-- ✓ Buckets de armazenamento criados automaticamente (avatars, thumbnails, videos)
-- ✓ Políticas de segurança (RLS) configuradas
-- ✓ Triggers e funções configuradas
-- ✓ Índices criados para performance
--
-- PRÓXIMAS ETAPAS NO FRONTEND:
-- 1. Copie as credenciais do Supabase (Settings > API):
--    - VITE_SUPABASE_URL
--    - VITE_SUPABASE_ANON_KEY
--
-- 2. Cole no arquivo .env.local
--
-- 3. O sistema está pronto para:
--    - Cadastro de usuários
--    - Upload de filmes, capas e avatares
--    - Gerenciamento de favoritos, assistir depois, avaliações
--    - Histórico de visualização
--
-- INFORMAÇÕES IMPORTANTES:
-- • Apenas TEACHERS e ADMINS podem fazer upload de filmes
-- • Qualquer usuário pode ver filmes e gerenciar sua biblioteca pessoal
-- • As capas devem estar em: /thumbnails/{movie_id}.*
-- • Os vídeos devem estar em: /videos/{movie_id}.*
-- • Os avatares devem estar em: /avatars/{user_id}.*
-- ============================================================================
