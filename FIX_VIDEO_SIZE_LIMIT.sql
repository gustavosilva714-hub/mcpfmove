-- ============================================================================
-- FIX: Aumentar limite de tamanho do bucket 'videos'
-- ============================================================================
-- Execute este script no Supabase SQL Editor

-- 1. Aumentar limite do bucket 'videos' para 10GB
UPDATE storage.buckets 
SET file_size_limit = 10737418240  -- 10GB em bytes
WHERE id = 'videos';

-- 2. Verificar o novo limite
SELECT id, name, file_size_limit, file_size_limit / 1024 / 1024 / 1024 as limit_in_gb
FROM storage.buckets 
WHERE id = 'videos';

-- 3. Se ainda tiver problemas, listar todas as policies
SELECT policy_name, definition 
FROM pg_policies 
WHERE tablename = 'objects' 
ORDER BY policy_name;
