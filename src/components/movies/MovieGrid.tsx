
import { MovieCard } from './MovieCard';
import type { MovieWithMeta } from '@/types/database';
import { cn } from '@/utils/cn';

interface MovieGridProps {
  movies: MovieWithMeta[];
  loading?: boolean;
  onPlay: (movie: MovieWithMeta) => void;
  onRefetch?: () => void;
  emptyMessage?: string;
  className?: string;
}

export function MovieGrid({ movies, loading, onPlay, onRefetch, emptyMessage, className }: MovieGridProps) {
  if (loading) {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4', className)}>
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="rounded-full border-2 border-dashed border-[#92A3C0]/30 dark:border-[#324A5F] p-8">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#92A3C0]/40 dark:text-[#324A5F]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="16" width="48" height="32" rx="4" />
            <circle cx="32" cy="32" r="8" />
            <polygon points="29,28 29,36 37,32" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">
            {emptyMessage || 'Nenhum filme encontrado'}
          </p>
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
            Tente ajustar os filtros ou explore outras categorias.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4', className)}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onPlay={onPlay}
          onRefetch={onRefetch}
        />
      ))}
    </div>
  );
}

function MovieSkeleton() {
  return (
    <div className="rounded-xl border border-[#92A3C0]/10 dark:border-[#324A5F]/30 overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-[#92A3C0]/10 dark:bg-[#1B2A41]" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded w-3/4" />
        <div className="h-3 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded w-1/2" />
        <div className="h-2 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded w-1/3" />
      </div>
    </div>
  );
}
