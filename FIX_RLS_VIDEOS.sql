-- ============================================================================
-- FIX: Remover restrição de role para upload de vídeos
-- ============================================================================
-- Execute este script no Supabase SQL Editor para corrigir RLS policies

-- 1. Remover a política antiga que restringia a teachers/admins
DROP POLICY IF EXISTS "Teachers and admins can upload videos" ON storage.objects;

-- 2. Criar nova política que permite todos os usuários autenticados
CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
  );

-- 3. Criar policy para UPDATE (caso o usuário queira sobrescrever)
CREATE POLICY "Authenticated users can update videos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
  );

-- 4. Criar policy para DELETE (caso o usuário queira deletar)
CREATE POLICY "Authenticated users can delete videos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
  );

-- ============================================================================
-- Verificação: Listar todas as policies do bucket 'videos'
-- ============================================================================
SELECT policy_name, definition FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage'
AND definition LIKE '%videos%'
ORDER BY policy_name;
