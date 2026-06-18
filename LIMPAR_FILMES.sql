-- ============================================================================
-- LIMPAR TODOS OS FILMES E DADOS RELACIONADOS
-- Execute este script no SQL Editor do Supabase
-- ============================================================================

-- 1. Deletar dados relacionados primeiro (por causa das foreign keys)
DELETE FROM watch_history WHERE movie_id IN (SELECT id FROM movies);
DELETE FROM ratings WHERE movie_id IN (SELECT id FROM movies);
DELETE FROM watch_later WHERE movie_id IN (SELECT id FROM movies);
DELETE FROM favorites WHERE movie_id IN (SELECT id FROM movies);
DELETE FROM movie_uploads WHERE movie_id IN (SELECT id FROM movies);

-- 2. Deletar todos os filmes
DELETE FROM movies;

-- 3. Confirmar que a tabela está vazia
SELECT COUNT(*) as total_filmes FROM movies;

-- ============================================================================
-- Pronto! Agora você pode cadastrar seus próprios filmes via admin
-- ============================================================================
