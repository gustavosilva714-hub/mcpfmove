import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Movie } from '@/types/database';

export interface CreateMovieInput {
  title: string;
  description?: string;
  genre?: string;
  duration?: number;
  class_series?: string;
  year?: number;
  is_award_winner?: boolean;
  award_category?: string;
  thumbnail_url?: string;
  video_url?: string;
}

export function useMovieManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMovie = async (movieData: CreateMovieInput): Promise<{ movie: Movie | null; error: Error | null }> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('movies')
        .insert([movieData])
        .select()
        .single();

      if (err) throw err;
      return { movie: data as Movie, error: null };
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      return { movie: null, error };
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async (id: string, updates: Partial<CreateMovieInput>): Promise<{ error: Error | null }> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('movies')
        .update(updates)
        .eq('id', id);

      if (err) throw err;
      return { error: null };
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id: string): Promise<{ error: Error | null }> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return { error: null };
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (
    bucket: 'avatars' | 'thumbnails' | 'videos',
    file: File,
    movieId?: string
  ): Promise<{ path: string | null; error: Error | null }> => {
    setLoading(true);
    setError(null);
    try {
      const timestamp = Date.now();
      const ext = file.name.split('.').pop();
      const filename = movieId ? `${movieId}-${timestamp}.${ext}` : `${timestamp}-${file.name}`;

      const { data, error: err } = await supabase.storage
        .from(bucket)
        .upload(filename, file, { upsert: true });

      if (err) throw err;

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

      return { path: publicUrlData.publicUrl, error: null };
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      return { path: null, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    createMovie,
    updateMovie,
    deleteMovie,
    uploadFile,
    loading,
    error,
  };
}
