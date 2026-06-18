import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import { Header } from '@/components/layout/Header';
import type { MovieWithMeta } from '@/types/database';
import { useAuth } from '@/contexts/useAuth';
import { Link } from 'react-router-dom';

export function FavoritesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [playingMovie, setPlayingMovie] = useState<MovieWithMeta | null>(null);

  const { movies, loading, refetch } = useMovies({ onlyFavorites: true, search });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="rounded-full border-2 border-dashed border-[#92A3C0]/30 dark:border-[#324A5F] p-8">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#92A3C0]/40 dark:text-[#324A5F]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M32 12c-8 0-16 6-16 16 0 12 16 24 16 24s16-12 16-24c0-10-8-16-16-16z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] text-lg">
            Faça login para ver seus favoritos
          </p>
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
            Entre na sua conta para acessar sua lista de favoritos.
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
          title="Favoritos"
          subtitle={loading ? '' : `${movies.length} ${movies.length === 1 ? 'filme' : 'filmes'} na sua lista`}
          onSearch={setSearch}
          searchPlaceholder="Buscar nos favoritos..."
        />
        <MovieGrid
          movies={movies}
          loading={loading}
          onPlay={setPlayingMovie}
          onRefetch={refetch}
          emptyMessage="Você ainda não adicionou filmes aos favoritos"
        />
      </div>
    </>
  );
}
