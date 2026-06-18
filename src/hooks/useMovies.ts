import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Movie, MovieWithMeta } from '@/types/database';
import { useAuth } from '@/contexts/useAuth';

interface UseMoviesOptions {
  genre?: string;
  classSeries?: string;
  search?: string;
  onlyFavorites?: boolean;
  onlyWatchLater?: boolean;
  onlyAwardWinners?: boolean;
}

export function useMovies(options: UseMoviesOptions = {}) {
  const { user } = useAuth();
  const [movies, setMovies] = useState<MovieWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('movies').select('*').order('created_at', { ascending: false });

      if (options.genre) query = query.eq('genre', options.genre);
      if (options.classSeries) query = query.eq('class_series', options.classSeries);
      if (options.onlyAwardWinners) query = query.eq('is_award_winner', true);
      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      const { data: moviesData, error: moviesError } = await query;
      if (moviesError) throw moviesError;

      let enriched: MovieWithMeta[] = (moviesData || []) as MovieWithMeta[];

      if (user) {
        const [favResult, wlResult, ratingsResult] = await Promise.all([
          supabase.from('favorites').select('movie_id').eq('user_id', user.id),
          supabase.from('watch_later').select('movie_id').eq('user_id', user.id),
          supabase.from('ratings').select('movie_id, rating').eq('user_id', user.id),
        ]);

        const favSet = new Set((favResult.data || []).map((f: { movie_id: string }) => f.movie_id));
        const wlSet = new Set((wlResult.data || []).map((w: { movie_id: string }) => w.movie_id));
        const ratingsMap = new Map((ratingsResult.data || []).map((r: { movie_id: string; rating: number }) => [r.movie_id, r.rating]));

        enriched = enriched.map(m => ({
          ...m,
          is_favorite: favSet.has(m.id),
          is_watch_later: wlSet.has(m.id),
          user_rating: ratingsMap.get(m.id),
        }));

        if (options.onlyFavorites) enriched = enriched.filter(m => m.is_favorite);
        if (options.onlyWatchLater) enriched = enriched.filter(m => m.is_watch_later);
      }

      setMovies(enriched);
    } catch (e) {
      setError((e as Error).message);
      setMovies([]);
      console.error('Erro ao carregar filmes:', e);
    } finally {
      setLoading(false);
    }
  }, [user, options.genre, options.classSeries, options.search, options.onlyFavorites, options.onlyWatchLater, options.onlyAwardWinners]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, refetch: fetchMovies };
}

export function useFavorites() {
  const { user } = useAuth();

  const toggleFavorite = async (movieId: string, isFavorite: boolean) => {
    if (!user) return;
    if (isFavorite) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('movie_id', movieId);
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, movie_id: movieId });
    }
  };

  return { toggleFavorite };
}

export function useWatchLater() {
  const { user } = useAuth();

  const toggleWatchLater = async (movieId: string, isWatchLater: boolean) => {
    if (!user) return;
    if (isWatchLater) {
      await supabase.from('watch_later').delete().eq('user_id', user.id).eq('movie_id', movieId);
    } else {
      await supabase.from('watch_later').insert({ user_id: user.id, movie_id: movieId });
    }
  };

  return { toggleWatchLater };
}

export function useRating() {
  const { user } = useAuth();

  const setRating = async (movieId: string, rating: number) => {
    if (!user) return;
    await supabase.from('ratings').upsert(
      { user_id: user.id, movie_id: movieId, rating, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,movie_id' }
    );
  };

  return { setRating };
}

export function useWatchHistory() {
  const { user } = useAuth();

  const recordWatch = async (movieId: string, progress = 100) => {
    if (!user) return;
    await supabase.from('watch_history').upsert(
      { user_id: user.id, movie_id: movieId, progress, watched_at: new Date().toISOString() },
      { onConflict: 'user_id,movie_id' }
    );
  };

  const fetchHistory = async (): Promise<Movie[]> => {
    if (!user) return [];
    const { data } = await supabase
      .from('watch_history')
      .select('movie_id, watched_at, movies(*)')
      .eq('user_id', user.id)
      .order('watched_at', { ascending: false })
      .limit(20);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((data || []).map((h: any) => h.movies).filter(Boolean)) as Movie[];
  };

  return { recordWatch, fetchHistory };
}
