import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Header } from '@/components/layout/Header';
import { useToast } from '@/components/ui/Toast';
import { useWatchHistory } from '@/hooks/useMovies';
import { Camera, User, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '@/types/database';


const CLASS_OPTIONS = [
  { value: '', label: 'Selecione a turma' },
  { value: '5º Ano', label: '5º Ano' },
  { value: '6º Ano', label: '6º Ano' },
  { value: '7º Ano', label: '7º Ano' },
  { value: '8º Ano', label: '8º Ano' },
  { value: '9º Ano', label: '9º Ano' },
  { value: '1º Médio', label: '1º Médio' },
  { value: '2º Médio', label: '2º Médio' },
  { value: '3º Médio', label: '3º Médio' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Administrativo', label: 'Administrativo' },
];

export function ProfilePage() {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const { fetchHistory } = useWatchHistory();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [classSeries, setClassSeries] = useState(profile?.class_series || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setClassSeries(profile.class_series || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      setLoadingHistory(true);
      fetchHistory().then(h => {
        setWatchHistory(h);
        setLoadingHistory(false);
      });
    }
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `avatars/${user.id}.${ext}`;
      const { error: upError } = await supabase.storage.from('media').upload(path, file, { upsert: true });
      if (upError) throw upError;
      const { data } = supabase.storage.from('media').getPublicUrl(path);
      const url = data.publicUrl;
      setAvatarUrl(url);
      await updateProfile({ avatar_url: url });
      await refreshProfile();
      toast({ title: 'Foto atualizada!', variant: 'success' });
    } catch (e) {
      toast({ title: 'Erro ao enviar foto', description: (e as Error).message, variant: 'error' });
    }
    setUploadingAvatar(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await updateProfile({ full_name: fullName, class_series: classSeries });
    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'error' });
    } else {
      await refreshProfile();
      toast({ title: 'Perfil atualizado!', variant: 'success' });
    }
    setSaving(false);
  };

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="rounded-full border-2 border-dashed border-[#92A3C0]/30 dark:border-[#324A5F] p-8">
          <User className="h-12 w-12 text-[#92A3C0]/40 dark:text-[#324A5F]" />
        </div>
        <div>
          <p className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] text-lg">Perfil não disponível</p>
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
            Faça login para acessar seu perfil.
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
    <div className="space-y-6 max-w-2xl">
      <Header title="Meu Perfil" subtitle="Gerencie suas informações pessoais" />

      {/* Avatar section */}
      <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-[#A1B5D8] dark:bg-[#1B2A41] flex items-center justify-center overflow-hidden text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : initials}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 rounded-full p-1.5 bg-[#A1B5D8] dark:bg-[#324A5F] text-[#2D2B2B] dark:text-[#CCC9DC] shadow-sm hover:bg-[#92A3C0] dark:hover:bg-[#1B2A41] transition-colors"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div>
            <p className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
              {profile?.full_name || 'Usuário'}
            </p>
            <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">{user.email}</p>
            <p className="text-xs text-[#92A3C0]/70 dark:text-[#A1B5D8]/70 mt-0.5 capitalize">
              {profile?.role || 'Estudante'}
              {profile?.class_series && ` · ${profile.class_series}`}
            </p>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-6">
        <h3 className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Informações Pessoais</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nome completo"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Seu nome completo"
          />
          <div>
            <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] mb-1.5">
              Turma / Função
            </label>
            <Select
              options={CLASS_OPTIONS}
              value={classSeries}
              onChange={e => setClassSeries(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] mb-1.5">
              E-mail
            </label>
            <input
              value={user.email || ''}
              disabled
              className="flex h-10 w-full rounded-md border border-[#92A3C0]/50 bg-[#F8F9FC] px-3 py-2 text-sm text-[#92A3C0] dark:border-[#324A5F] dark:bg-[#1B2A41]/30 dark:text-[#A1B5D8] cursor-not-allowed"
            />
            <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
              O e-mail não pode ser alterado por aqui.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={saving}>
              Salvar alterações
            </Button>
          </div>
        </form>
      </div>

      {/* Admin Section - Only visible for admins */}
      {profile?.class_series === 'Administrativo' && (
        <div className="rounded-xl border border-[#A1B5D8]/30 dark:border-[#1B2A41] bg-gradient-to-r from-[#A1B5D8]/10 to-[#92A3C0]/10 dark:from-[#1B2A41]/30 dark:to-[#0C1821] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] p-3 mt-0.5">
                <Film className="h-5 w-5 text-[#2D2B2B] dark:text-[#CCC9DC]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">Painel de Administração</h3>
                <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                  Gerencie o catálogo de filmes e séries da plataforma.
                </p>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="primary" size="sm">
                Cadastrar Filmes
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Watch History */}
      <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-6">
        <h3 className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Histórico de Visualizações</h3>
        {loadingHistory ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="h-12 w-20 rounded bg-[#92A3C0]/10 dark:bg-[#1B2A41]" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded w-1/2" />
                  <div className="h-2 bg-[#92A3C0]/10 dark:bg-[#1B2A41] rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : watchHistory.length > 0 ? (
          <ul className="space-y-3">
            {watchHistory.map(movie => (
              <li key={movie.id} className="flex items-center gap-3">
                <div className="h-12 w-20 rounded bg-gradient-to-br from-[#A1B5D8]/20 to-[#AFC7EF]/10 dark:from-[#1B2A41] dark:to-[#0C1821] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {movie.thumbnail_url ? (
                    <img src={movie.thumbnail_url} alt={movie.title} className="h-full w-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 40 30" className="h-6 w-8 text-[#92A3C0]/30" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="36" height="26" rx="2" />
                      <circle cx="20" cy="15" r="5" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] truncate">{movie.title}</p>
                  {movie.class_series && (
                    <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8]">{movie.class_series}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
            Nenhum filme assistido ainda.
          </p>
        )}
      </div>

      {/* Account stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Filmes Assistidos', value: watchHistory.length.toString() },
          { label: 'Turma', value: profile?.class_series || '—' },
          { label: 'Perfil', value: profile?.role === 'admin' ? 'Admin' : profile?.role === 'teacher' ? 'Professor' : 'Aluno' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-4 text-center"
          >
            <p className="text-lg font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">{stat.value}</p>
            <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
