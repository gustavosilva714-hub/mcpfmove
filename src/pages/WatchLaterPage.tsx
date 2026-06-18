import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import { Header } from '@/components/layout/Header';
import type { MovieWithMeta } from '@/types/database';
import { useAuth } from '@/contexts/useAuth';
import { Link } from 'react-router-dom';

export function WatchLaterPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null);

  const { movies, loading, refetch } = useMovies({ onlyWatchLater: true, search });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="rounded-full border-2 border-dashed border-[#92A3C0]/30 dark:border-[#324A5F] p-8">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#92A3C0]/40 dark:text-[#324A5F]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="32" cy="32" r="20" />
            <path d="M32 22v10l6 6" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] text-lg">
            Faça login para ver sua fila
          </p>
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
            Entre na sua conta para acessar seus filmes agendados.
          </p>
        </div>
        <Link
          to="/login"
          className="rounded-lg px-5 py-2.5 bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] text-sm font-medium hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors"
        >
          Fazer login
        </Link>
      </div>
    );
  }

  return (
    <>
      {playingMovie && (
        <VideoPlayer movie={playingMovie} onClose={() => setPlayingMovie(null)} />
      )}
      <div className="space-y-6">
        <Header
          title="Assistir Mais Tarde"
          subtitle={loading ? '' : `${movies.length} ${movies.length === 1 ? 'filme' : 'filmes'} na fila`}
          onSearch={setSearch}
          searchPlaceholder="Buscar na fila..."
        />
        <MovieGrid
          movies={movies}
          loading={loading}
          onPlay={setPlayingMovie}
          onRefetch={refetch}
          emptyMessage="Sua fila está vazia. Adicione filmes para assistir depois."
        />
      </div>
    </>
  );
}
