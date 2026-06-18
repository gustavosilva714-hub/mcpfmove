import React, { useState } from 'react';
import { Heart, Clock, Play, Star, Trophy } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useFavorites, useWatchLater } from '@/hooks/useMovies';
import type { MovieWithMeta } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/useAuth';
import { useToast } from '@/components/ui/Toast';

interface MovieCardProps {
  movie: MovieWithMeta;
  onPlay: (movie: MovieWithMeta) => void;
  onRefetch?: () => void;
  className?: string;
}

export function MovieCard({ movie, onPlay, onRefetch, className }: MovieCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { toggleFavorite } = useFavorites();
  const { toggleWatchLater } = useWatchLater();
  const [isFav, setIsFav] = useState(movie.is_favorite ?? false);
  const [isWL, setIsWL] = useState(movie.is_watch_later ?? false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [loadingWL, setLoadingWL] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: 'Faça login para adicionar favoritos', variant: 'error' });
      return;
    }
    setLoadingFav(true);
    const prev = isFav;
    setIsFav(!prev);
    await toggleFavorite(movie.id, prev);
    toast({
      title: prev ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      variant: prev ? 'default' : 'success',
    });
    setLoadingFav(false);
    onRefetch?.();
  };

  const handleWatchLater = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: 'Faça login para adicionar à fila', variant: 'error' });
      return;
    }
    setLoadingWL(true);
    const prev = isWL;
    setIsWL(!prev);
    await toggleWatchLater(movie.id, prev);
    toast({
      title: prev ? 'Removido de Assistir Mais Tarde' : 'Adicionado a Assistir Mais Tarde',
      variant: prev ? 'default' : 'success',
    });
    setLoadingWL(false);
    onRefetch?.();
  };

  const formatDuration = (mins: number | null) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-200',
        'bg-white dark:bg-[#0C1821]',
        'border-[#92A3C0]/20 dark:border-[#324A5F]/50',
        'hover:shadow-xl hover:shadow-[#92A3C0]/10 dark:hover:shadow-[#1B2A41]/50',
        'hover:-translate-y-0.5',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[2/3] bg-gradient-to-br from-[#A1B5D8]/30 to-[#AFC7EF]/20 dark:from-[#1B2A41] dark:to-[#0C1821] overflow-hidden flex-shrink-0">
        {movie.thumbnail_url && !imgError ? (
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FilmPlaceholder />
          </div>
        )}

        {/* Award badge */}
        {movie.is_award_winner && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 backdrop-blur-sm">
              <Trophy className="h-3 w-3 text-white" />
              <span className="text-[10px] font-semibold text-white">Premiado</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center">
          <button
            onClick={() => onPlay(movie)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 rounded-full bg-[#AFC7EF] dark:bg-[#1B2A41] px-4 py-2 text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] shadow-lg hover:bg-[#A1B5D8] dark:hover:bg-[#324A5F]"
          >
            <Play className="h-4 w-4 fill-current" />
            Assistir
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          {movie.description && (
            <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] line-clamp-2 mt-1 leading-relaxed">
              {movie.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genre && (
            <Badge variant="default" className="text-[10px] px-1.5 py-0">{movie.genre}</Badge>
          )}
          {movie.class_series && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{movie.class_series}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#92A3C0] dark:text-[#A1B5D8]">
            {movie.duration && (
              <span>{formatDuration(movie.duration)}</span>
            )}
            {movie.user_rating && (
              <>
                <span className="mx-1">·</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{movie.user_rating}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleWatchLater}
              disabled={loadingWL}
              title="Assistir mais tarde"
              className={cn(
                'rounded-md p-1.5 transition-colors',
                isWL
                  ? 'text-[#A1B5D8] dark:text-[#AFC7EF]'
                  : 'text-[#92A3C0]/50 hover:text-[#A1B5D8] dark:text-[#324A5F] dark:hover:text-[#AFC7EF]'
              )}
            >
              <Clock className={cn('h-4 w-4', isWL && 'fill-current')} />
            </button>
            <button
              onClick={handleFavorite}
              disabled={loadingFav}
              title="Favoritar"
              className={cn(
                'rounded-md p-1.5 transition-colors',
                isFav
                  ? 'text-rose-500 dark:text-rose-400'
                  : 'text-[#92A3C0]/50 hover:text-rose-500 dark:text-[#324A5F] dark:hover:text-rose-400'
              )}
            >
              <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilmPlaceholder() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-16 h-16 text-[#92A3C0]/30 dark:text-[#324A5F]/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="10" y="20" width="60" height="40" rx="4" />
      <rect x="10" y="28" width="8" height="6" fill="currentColor" opacity="0.5" />
      <rect x="10" y="46" width="8" height="6" fill="currentColor" opacity="0.5" />
      <rect x="62" y="28" width="8" height="6" fill="currentColor" opacity="0.5" />
      <rect x="62" y="46" width="8" height="6" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="40" r="10" />
      <polygon points="37,35 37,45 47,40" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
