// ========================================
// ARQUIVO: HomePage.tsx - Página principal da aplicação
// DESCRIÇÃO: Exibe catálogo de filmes com opções de busca, filtro por gênero, turma e duração
// ========================================

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import { Header } from '@/components/layout/Header';
import { Select } from '@/components/ui/Select';
import type { MovieWithMeta } from '@/types/database';

// ========== CONSTANTES ==========
// Lista de gêneros disponíveis para filtração
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

// Lista de turmas/séries para filtração
const CLASS_SERIES = [
  { value: '', label: 'Todas as turmas' },
  { value: '5º Ano', label: '5º Ano' },
  { value: '6º Ano', label: '6º Ano' },
  { value: '7º Ano', label: '7º Ano' },
  { value: '8º Ano', label: '8º Ano' },
  { value: '9º Ano', label: '9º Ano' },
  { value: '1º Médio', label: '1º Médio' },
  { value: '2º Médio', label: '2º Médio' },
  { value: '3º Médio', label: '3º Médio' },
];

// Opções de duração para filtração
const DURATION_OPTIONS = [
  { value: '', label: 'Qualquer duração' },
  { value: 'short', label: 'Curto (até 30min)' },
  { value: 'medium', label: 'Médio (30-60min)' },
  { value: 'long', label: 'Longo (acima de 60min)' },
];

export function HomePage() {
  // ========== ESTADOS DE FILTRO ==========
  const [search, setSearch] = useState(''); // Termo de busca
  const [genre, setGenre] = useState(''); // Gênero selecionado
  const [classSeries, setClassSeries] = useState(''); // Turma/série selecionada
  const [duration, setDuration] = useState(''); // Duração selecionada
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null); // Filme sendo reproduzido

  // ========== HOOKS DE DADOS ==========
  // Busca filmes com base nos filtros
  const { movies, loading, error, refetch } = useMovies({ search, genre, classSeries });

  // Aplica filtro de duração aos filmes
  const filteredMovies = movies.filter(m => {
    if (duration === 'short') return (m.duration || 0) <= 30;
    if (duration === 'medium') return (m.duration || 0) > 30 && (m.duration || 0) <= 60;
    if (duration === 'long') return (m.duration || 0) > 60;
    return true;
  });

  // Group movies by class series
  const grouped = filteredMovies.reduce<Record<string, MovieWithMeta[]>>((acc, movie) => {
    const key = movie.class_series || 'Sem categoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(movie);
    return acc;
  }, {});

  const hasFilters = search || genre || classSeries || duration;

  return (
    <>
      {playingMovie && (
        <VideoPlayer movie={playingMovie} onClose={() => setPlayingMovie(null)} />
      )}

      <div className="space-y-8">
        <Header
          title="Início"
          subtitle="Explore os filmes produzidos pela escola"
          onSearch={setSearch}
          searchPlaceholder="Buscar por título ou descrição..."
        />

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-900/50 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-red-900 dark:text-red-400">Erro ao carregar filmes</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
              <button
                onClick={refetch}
                className="mt-2 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="w-40">
            <Select
              options={GENRES}
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="Gênero"
            />
          </div>
          <div className="w-44">
            <Select
              options={CLASS_SERIES}
              value={classSeries}
              onChange={e => setClassSeries(e.target.value)}
              placeholder="Turma"
            />
          </div>
          <div className="w-48">
            <Select
              options={DURATION_OPTIONS}
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="Duração"
            />
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch('');
                setGenre('');
                setClassSeries('');
                setDuration('');
              }}
              className="flex items-center gap-1.5 h-10 px-3 rounded-md text-sm text-[#92A3C0] dark:text-[#A1B5D8] border border-[#92A3C0]/30 dark:border-[#324A5F] hover:bg-[#92A3C0]/10 dark:hover:bg-[#324A5F]/20 transition-colors"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
              Limpar filtros
            </button>
          )}
        </div>

        {/* Content */}
        {hasFilters ? (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
                Resultados{!loading && ` (${filteredMovies.length})`}
              </h2>
            </div>
            <MovieGrid
              movies={filteredMovies}
              loading={loading}
              onPlay={setPlayingMovie}
              onRefetch={refetch}
              emptyMessage="Nenhum filme encontrado com esses filtros"
            />
          </section>
        ) : (
          <div className="space-y-10">
            {loading ? (
              <section>
                <div className="h-5 w-32 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded mb-4 animate-pulse" />
                <MovieGrid movies={[]} loading={true} onPlay={() => {}} />
              </section>
            ) : Object.keys(grouped).length > 0 ? (
              Object.entries(grouped).map(([group, groupMovies]) => (
                <section key={group}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-base font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">{group}</h2>
                    <div className="flex-1 h-px bg-[#92A3C0]/15 dark:bg-[#324A5F]/30" />
                    <span className="text-xs text-[#92A3C0] dark:text-[#A1B5D8]">{groupMovies.length} filmes</span>
                  </div>
                  <MovieGrid
                    movies={groupMovies}
                    onPlay={setPlayingMovie}
                    onRefetch={refetch}
                  />
                </section>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="rounded-full border-2 border-dashed border-[#92A3C0]/30 dark:border-[#324A5F] p-8">
                  <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#92A3C0]/40 dark:text-[#324A5F]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="8" y="16" width="48" height="32" rx="4" />
                    <circle cx="32" cy="32" r="8" />
                    <polygon points="29,28 29,36 37,32" fill="currentColor" opacity="0.4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">Nenhum filme disponível</p>
                  <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                    Os filmes serão adicionados em breve pelos administradores.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
