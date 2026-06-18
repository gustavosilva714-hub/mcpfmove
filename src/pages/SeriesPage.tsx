import { useState } from 'react';
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
  { value: 'popular', label: 'Mais Assistidas' },
  { value: 'rated', label: 'Mais Avaliadas' },
  { value: 'alphabetic', label: 'Ordem Alfabética' },
];

export function SeriesPage() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null);

  const { movies, loading, error, refetch } = useMovies({ search, genre });

  let filteredMovies = movies.filter(m => {
    // Aqui você pode adicionar lógica para filtrar apenas séries
    // Por enquanto, exibe todos os conteúdos
    return true;
  });

  // Aplicar ordenação
  if (sortBy === 'popular') {
    filteredMovies = [...filteredMovies].sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
  } else if (sortBy === 'rated') {
    filteredMovies = [...filteredMovies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'alphabetic') {
    filteredMovies = [...filteredMovies].sort((a, b) => a.title.localeCompare(b.title));
  }

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
        title="Séries"
        subtitle="Explore o catálogo completo de séries disponíveis"
        onSearch={setSearch}
        searchPlaceholder="Buscar séries..."
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
        emptyMessage="Nenhuma série encontrada com os critérios selecionados"
      />
    </div>
  );
}
