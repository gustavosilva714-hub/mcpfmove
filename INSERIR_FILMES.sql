-- ============================================================================
-- Script Rápido: Inserir Filmes de Exemplo
-- Copie e execute no SQL Editor do Supabase
-- ============================================================================

INSERT INTO movies (id, title, description, genre, duration, class_series, year, is_award_winner, award_category)
VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Documentário Natureza',
    'Um documentário fascinante sobre a biodiversidade brasileira e a importância da preservação ambiental.',
    'Documentário',
    45,
    '5º Ano',
    2024,
    true,
    'Melhor Documentário'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Animação Aventura',
    'Uma animação emocionante sobre amizade, coragem e descobertas em uma jornada pela floresta mágica.',
    'Animação',
    80,
    '6º Ano',
    2024,
    false,
    null
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Drama Escolar',
    'Um drama tocante sobre os desafios da adolescência, amizade e superação na vida escolar.',
    'Drama',
    120,
    '8º Ano',
    2024,
    true,
    'Melhor Roteiro'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440004',
    'Comédia Familiar',
    'Uma comédia divertida e apropriada para toda a família com situações hilariantes do dia a dia.',
    'Comédia',
    90,
    '5º Ano',
    2024,
    false,
    null
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'Ficção Científica',
    'Um filme de ficção científica que explora temas de inteligência artificial, ética e futuro.',
    'Ficção',
    110,
    '1º Médio',
    2024,
    true,
    'Melhor Filme'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'Musical Inspirador',
    'Um musical que celebra a importância da música na vida dos jovens e seu poder transformador.',
    'Musical',
    95,
    '2º Médio',
    2023,
    true,
    'Melhor Trilha Sonora'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440007',
    'Esporte e Superação',
    'Documentário inspirador sobre a trajetória de atletas que superaram desafios e alcançaram seus sonhos.',
    'Esporte',
    75,
    '7º Ano',
    2024,
    false,
    null
  ),
  (
    '550e8400-e29b-41d4-a716-446655440008',
    'Aventura nas Montanhas',
    'Uma aventura épica com a turma explorando as montanhas, descobrindo mistérios antigos.',
    'Aventura',
    100,
    '9º Ano',
    2024,
    true,
    'Melhor Cinematografia'
  )
ON CONFLICT DO NOTHING;

-- Confirmar inserção
SELECT COUNT(*) as filmes_inseridos FROM movies;
