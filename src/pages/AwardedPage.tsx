import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import type { MovieWithMeta } from '@/types/database';

const AWARD_CATEGORIES = [
  'Melhor Filme',
  'Melhor Documentário',
  'Melhor Roteiro',
  'Melhor Trilha Sonora',
  'Melhor Animação',
  'Melhor Direção',
];

export function AwardedPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null);

  const { movies, loading, refetch } = useMovies({ onlyAwardWinners: true, search });

  const filteredMovies = selectedCategory
    ? movies.filter(m => m.award_category === selectedCategory)
    : movies;

  return (
    <>
      {playingMovie && (
        <VideoPlayer movie={playingMovie} onClose={() => setPlayingMovie(null)} />
      )}
      <div className="space-y-6">
        <Header
          title="Oscar da Escola"
          subtitle="Filmes premiados pela curadoria da escola"
          onSearch={setSearch}
          searchPlaceholder="Buscar premiados..."
        />

        {/* Award description */}
        <div className="rounded-xl border border-amber-200/50 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/10 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                Oscar da Escola — Curadoria Administrativa
              </p>
              <p className="text-xs text-amber-700/70 dark:text-amber-500/70 leading-relaxed">
                Os filmes premiados são selecionados anualmente pela equipe pedagógica e administrativa da escola, reconhecendo produções que se destacam em qualidade, criatividade e impacto educacional.
              </p>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              selectedCategory === ''
                ? 'bg-[#A1B5D8] border-[#A1B5D8] text-[#2D2B2B] dark:bg-[#1B2A41] dark:border-[#1B2A41] dark:text-[#CCC9DC]'
                : 'border-[#92A3C0]/30 dark:border-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8] hover:border-[#A1B5D8] dark:hover:border-[#324A5F]'
            }`}
          >
            Todas as categorias
          </button>
          {AWARD_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                selectedCategory === cat
                  ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400'
                  : 'border-[#92A3C0]/30 dark:border-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8] hover:border-amber-300 hover:text-amber-700 dark:hover:border-amber-700 dark:hover:text-amber-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Award winners display */}
        {!loading && filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredMovies.slice(0, 3).map(movie => (
              <AwardCard key={movie.id} movie={movie} onPlay={setPlayingMovie} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-sm font-semibold text-[#92A3C0] dark:text-[#A1B5D8] uppercase tracking-wider">
            Todos os premiados
          </h2>
          <div className="flex-1 h-px bg-[#92A3C0]/15 dark:bg-[#324A5F]/30" />
        </div>

        <MovieGrid
          movies={filteredMovies}
          loading={loading}
          onPlay={setPlayingMovie}
          onRefetch={refetch}
          emptyMessage="Nenhum filme premiado encontrado"
        />
      </div>
    </>
  );
}

function AwardCard({ movie, onPlay }: { movie: MovieWithMeta; onPlay: (m: MovieWithMeta) => void }) {
  return (
    <div className="relative rounded-xl border border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-[#0C1821] overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-[#0C1821] flex items-center justify-center relative">
        {movie.thumbnail_url ? (
          <img src={movie.thumbnail_url} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 80 60" className="w-20 h-16 text-amber-200 dark:text-amber-900/50" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="10" width="70" height="40" rx="4" />
            <circle cx="40" cy="30" r="10" />
            <polygon points="37,25 37,35 47,30" fill="currentColor" opacity="0.4" />
          </svg>
        )}
        {movie.award_category && (
          <div className="absolute top-2 left-2">
            <Badge variant="award">{movie.award_category}</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-1">{movie.title}</h3>
        {movie.description && (
          <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] line-clamp-2 mb-3">{movie.description}</p>
        )}
        <button
          onClick={() => onPlay(movie)}
          className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" fill="currentColor">
            <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.15" />
            <polygon points="6,5 6,11 12,8" fill="currentColor" />
          </svg>
          Assistir filme
        </button>
      </div>
    </div>
  );
}
