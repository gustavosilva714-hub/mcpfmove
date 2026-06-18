import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Select } from '@/components/ui/Select';
import { AlertCircle } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import type { MovieWithMeta } from '@/types/database';

const GENRES = [
  { value: '', label: 'Todos os gêneros' },
  { value: 'Documentário', label: 'Documentário' },
  { value: 'Animação', label: 'Animação' },
  { value: 'Comédia', label: 'Comédia' },
  { value: 'Ficção', label: 'Ficção' },
  { value: 'Aventura', label: 'Aventura' },
  { value: 'Musical', label: 'Musical' },
  { value: 'Esporte', label: 'Esporte' },
  { value: 'Drama', label: 'Drama' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'popular', label: 'Mais Assistidos' },
  { value: 'rated', label: 'Mais Avaliados' },
  { value: 'alphabetic', label: 'Ordem Alfabética' },
];

const CONTENT_TYPE_OPTIONS = [
  { value: '', label: 'Todos os tipos' },
  { value: 'movie', label: 'Filmes' },
  { value: 'series', label: 'Séries' },
  { value: 'documentary', label: 'Documentários' },
];

// Mapa de IDs de gênero para nomes legíveis
const GENRE_MAP: Record<string, string> = {
  'acao': 'Ação',
  'aventura': 'Aventura',
  'comedia': 'Comédia',
  'drama': 'Drama',
  'ficcao': 'Ficção',
  'terror': 'Terror',
  'romance': 'Romance',
  'documentario': 'Documentário',
  'musical': 'Musical',
  'esporte': 'Esporte',
  'suspense': 'Suspense',
  'animacao': 'Animação',
};

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  
  // Pegar gênero da URL
  const genreIdParam = searchParams.get('genre') || '';
  const genreNameParam = searchParams.get('name') || '';
  
  // Converter ID do gênero para nome real se necessário
  const selectedGenreName = genreNameParam || (genreIdParam ? GENRE_MAP[genreIdParam] : '');

  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState(selectedGenreName);
  const [sortBy, setSortBy] = useState('recent');
  const [contentType, setContentType] = useState('');
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null);

  const { movies, loading, error, refetch } = useMovies({ search, genre: genre || '' });

  let filteredMovies = [...movies];

  // Filtrar por tipo de conteúdo se selecionado
  if (contentType) {
    // Aqui você pode adicionar lógica para filtrar por tipo
    // Por enquanto, exibe todos os conteúdos
  }

  // Aplicar ordenação
  if (sortBy === 'popular') {
    filteredMovies.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
  } else if (sortBy === 'rated') {
    filteredMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'alphabetic') {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  }

  const pageTitle = selectedGenreName ? `${selectedGenreName}` : 'Catálogo Completo';
  const pageSubtitle = selectedGenreName 
    ? `Explore conteúdos de ${selectedGenreName}`
    : 'Explore todos os filmes, séries e documentários disponíveis';

  return (
    <div>
      {playingMovie && (
        <VideoPlayer
          movie={playingMovie}
          onClose={() => setPlayingMovie(null)}
          onRefetch={refetch}
        />
      )}

      <Header
        title={pageTitle}
        subtitle={pageSubtitle}
        onSearch={setSearch}
        searchPlaceholder="Buscar conteúdo..."
      />

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <Select
          label="Gênero"
          value={genre}
          onChange={setGenre}
          options={GENRES}
          className="flex-1"
        />
        <Select
          label="Tipo"
          value={contentType}
          onChange={setContentType}
          options={CONTENT_TYPE_OPTIONS}
          className="flex-1"
        />
        <Select
          label="Ordenar por"
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
          className="flex-1"
        />
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 text-red-700 dark:text-red-400 mb-6">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <MovieGrid
        movies={filteredMovies}
        loading={loading}
        onPlay={setPlayingMovie}
        onRefetch={refetch}
        emptyMessage={`Nenhum conteúdo encontrado${selectedGenreName ? ` de ${selectedGenreName}` : ''} com os critérios selecionados. Tente ajustar os filtros.`}
      />
    </div>
  );
}
