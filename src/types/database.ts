export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          thumbnail_url: string | null;
          video_url: string | null;
          genre: string | null;
          duration: number | null;
          class_series: string | null;
          year: number | null;
          is_award_winner: boolean;
          award_category: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          thumbnail_url?: string | null;
          video_url?: string | null;
          genre?: string | null;
          duration?: number | null;
          class_series?: string | null;
          year?: number | null;
          is_award_winner?: boolean;
          award_category?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          video_url?: string | null;
          genre?: string | null;
          duration?: number | null;
          class_series?: string | null;
          year?: number | null;
          is_award_winner?: boolean;
          award_category?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          movie_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          movie_id?: string;
          created_at?: string;
        };
      };
      watch_later: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          movie_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          movie_id?: string;
          created_at?: string;
        };
      };
      ratings: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          movie_id: string;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          movie_id?: string;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      watch_history: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          progress: number;
          watched_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          movie_id: string;
          progress?: number;
          watched_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          movie_id?: string;
          progress?: number;
          watched_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          class_series: string | null;
          role: 'student' | 'teacher' | 'admin';
          theme: 'light' | 'dark' | 'system';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          class_series?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          theme?: 'light' | 'dark' | 'system';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          class_series?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          theme?: 'light' | 'dark' | 'system';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Movie = Database['public']['Tables']['movies']['Row'];
export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type WatchLater = Database['public']['Tables']['watch_later']['Row'];
export type Rating = Database['public']['Tables']['ratings']['Row'];
export type WatchHistory = Database['public']['Tables']['watch_history']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface MovieWithMeta extends Movie {
  is_favorite?: boolean;
  is_watch_later?: boolean;
  user_rating?: number;
  avg_rating?: number;
  ratings_count?: number;
}
