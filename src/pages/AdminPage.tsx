// ========================================
// ARQUIVO: AdminPage.tsx - Painel de administração
// DESCRIÇÃO: Gerenciamento de filmes (criar, editar, deletar)
// Acesso restrito apenas a usuários com class_series = "Administrativo"
// ========================================

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, AlertCircle, Loader, X } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import { useMovieManagement, type CreateMovieInput } from '@/hooks/useMovieManagement';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileUpload } from '@/components/ui/FileUpload';
import { useToast } from '@/components/ui/Toast';
import { Dialog } from '@/components/ui/Dialog';
import { supabase } from '@/lib/supabase';
import type { Movie } from '@/types/database';

// ========== CONSTANTES ==========
// Lista de gêneros disponíveis para filtração
const GENRES = [
  { value: 'Documentário', label: 'Documentário' },
  { value: 'Animação', label: 'Animação' },
  { value: 'Comédia', label: 'Comédia' },
  { value: 'Ficção', label: 'Ficção' },
  { value: 'Aventura', label: 'Aventura' },
  { value: 'Musical', label: 'Musical' },
  { value: 'Esporte', label: 'Esporte' },
  { value: 'Drama', label: 'Drama' },
];

// Lista de turmas/séries para as quais o conteúdo pode ser disponibilizado
const CLASS_SERIES = [
  { value: '5º Ano', label: '5º Ano' },
  { value: '6º Ano', label: '6º Ano' },
  { value: '7º Ano', label: '7º Ano' },
  { value: '8º Ano', label: '8º Ano' },
  { value: '9º Ano', label: '9º Ano' },
  { value: '1º Médio', label: '1º Médio' },
  { value: '2º Médio', label: '2º Médio' },
  { value: '3º Médio', label: '3º Médio' },
];

export function AdminPage() {
  // ========== CONTEXTOS E HOOKS ==========
  const { profile } = useAuth();
  const { toast } = useToast();
  const { createMovie, uploadFile, loading, error, deleteMovie } = useMovieManagement();
  
  // ========== ESTADOS - FILMES ==========
  const [movies, setMovies] = useState<Movie[]>([]); // Lista de filmes cadastrados
  const [loadingMovies, setLoadingMovies] = useState(false); // Carregando lista de filmes
  const [deletingId, setDeletingId] = useState<string | null>(null); // ID do filme sendo deletado
  
  // ========== ESTADOS - EDIÇÃO ==========
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null); // Filme sendo editado
  const [editThumbnailUrl, setEditThumbnailUrl] = useState(''); // URL da capa durante edição
  const [editUploadProgress, setEditUploadProgress] = useState(false); // Progresso de upload em edição
  const [updatingCover, setUpdatingCover] = useState(false); // Atualizando capa

  // ========== ESTADOS - CRIAÇÃO ==========
  // Formulário para criar novo filme
  const [formData, setFormData] = useState<CreateMovieInput>({
    title: '',
    description: '',
    genre: '',
    duration: undefined,
    class_series: '',
    year: new Date().getFullYear(),
    is_award_winner: false,
    award_category: '',
  });

  // ========== ESTADOS - UPLOAD ==========
  const [uploadedFiles, setUploadedFiles] = useState<{
    thumbnail?: string; // URL da thumbnail após upload
  }>({});

  const [uploadProgress, setUploadProgress] = useState<{
    thumbnail?: boolean; // Indicador de progresso de upload
  }>({});;

  // ========== EFEITOS ==========
  // Carrega a lista de filmes quando a página abre
  useEffect(() => {
    loadMovies();
  }, []);

  // ========== FUNÇÕES ==========
  /**
   * Carrega todos os filmes da base de dados e os ordena por data de criação
   */
  const loadMovies = async () => {
    setLoadingMovies(true);
    try {
      const { data, error: err } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setMovies(data || []);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoadingMovies(false);
    }
  };
        });
        return;
      }

      toast({
        title: 'Filme deletado com sucesso!',
        variant: 'success',
      });

      // Recarregar lista
      await loadMovies();
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setEditThumbnailUrl(movie.thumbnail_url || '');
  };

  const handleEditFileUpload = async (file: File) => {
    setEditUploadProgress(true);
    try {
      const { path, error: err } = await uploadFile('thumbnails', file);
      if (err) {
        toast({
          title: 'Erro ao enviar capa',
          description: err.message,
          variant: 'error',
        });
        return;
      }
      setEditThumbnailUrl(path);
      toast({
        title: 'Capa enviada!',
        variant: 'success',
      });
    } finally {
      setEditUploadProgress(false);
    }
  };

  const handleSaveCover = async () => {
    if (!editingMovie || !editThumbnailUrl.trim()) {
      toast({
        title: 'Erro',
        description: 'URL da capa é obrigatória',
        variant: 'error',
      });
      return;
    }

    setUpdatingCover(true);
    try {
      const { error: err } = await supabase
        .from('movies')
        .update({ thumbnail_url: editThumbnailUrl })
        .eq('id', editingMovie.id);

      if (err) throw err;

      toast({
        title: 'Capa atualizada com sucesso!',
        variant: 'success',
      });

      // Recarregar lista
      await loadMovies();
      setEditingMovie(null);
      setEditThumbnailUrl('');
    } catch (err: any) {
      toast({
        title: 'Erro ao atualizar capa',
        description: err.message,
        variant: 'error',
      });
    } finally {
      setUpdatingCover(false);
    }
  };

  const handleFileUpload = async (type: 'thumbnail', file: File) => {
    setUploadProgress((prev) => ({ ...prev, [type]: true }));
    try {
      const { path, error: err } = await uploadFile('thumbnails', file);
      if (err) {
        toast({
          title: `Erro ao enviar capa`,
          description: err.message,
          variant: 'error',
        });
        return;
      }
      setUploadedFiles((prev) => ({ ...prev, [type]: path }));
      setFormData((prev) => ({
        ...prev,
        thumbnail_url: path,
      }));
      toast({
        title: `Capa enviada!`,
        variant: 'success',
      });
    } finally {
      setUploadProgress((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ title: 'Erro', description: 'Título é obrigatório', variant: 'error' });
      return;
    }

    if (!formData.video_url?.trim()) {
      toast({ title: 'Erro', description: 'URL do vídeo é obrigatória', variant: 'error' });
      return;
    }

    // Se não fizer upload de capa, usar uma padrão
    const thumbnailUrl = uploadedFiles.thumbnail || 'https://via.placeholder.com/400x600/1B2A41/A1B5D8?text=Sem+Capa';

    const { movie, error: err } = await createMovie({
      ...formData,
      thumbnail_url: thumbnailUrl,
    });
    if (err) {
      toast({ title: 'Erro ao criar filme', description: err.message, variant: 'error' });
      return;
    }

    toast({
      title: 'Filme criado com sucesso!',
      description: `${formData.title} foi adicionado à plataforma`,
      variant: 'success',
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      genre: '',
      duration: undefined,
      class_series: '',
      year: new Date().getFullYear(),
      is_award_winner: false,
      award_category: '',
    });
    setUploadedFiles({});
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Plus className="h-6 w-6 text-[#A1B5D8]" />
        <h1 className="text-3xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Cadastrar Novo Filme</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0F1419] rounded-lg border border-[#92A3C0]/20 dark:border-[#324A5F]/30 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-900/50 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Informações Básicas */}
        <section className="space-y-4 pb-6 border-b border-[#92A3C0]/10 dark:border-[#324A5F]/20">
          <h2 className="text-lg font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">Informações Básicas</h2>

          <Input
            label="Título do Filme"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: A Jornada do Conhecimento"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Gênero"
              options={GENRES}
              value={formData.genre || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, genre: e.target.value }))}
            />
            <Select
              label="Turma Alvo"
              options={CLASS_SERIES}
              value={formData.class_series || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, class_series: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duração (minutos)"
              type="number"
              value={formData.duration || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value ? parseInt(e.target.value) : undefined }))}
              placeholder="Ex: 45"
            />
            <Input
              label="Ano"
              type="number"
              value={formData.year || new Date().getFullYear()}
              onChange={(e) => setFormData((prev) => ({ ...prev, year: parseInt(e.target.value) }))}
            />
          </div>

          <div className="w-full">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_award_winner || false}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_award_winner: e.target.checked }))}
                className="rounded border border-[#92A3C0]/30 dark:border-[#324A5F]"
              />
              <span className="text-sm text-[#2D2B2B] dark:text-[#CCC9DC]">Este filme é premiado</span>
            </label>
          </div>

          {formData.is_award_winner && (
            <Input
              label="Categoria do Prêmio"
              value={formData.award_category || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, award_category: e.target.value }))}
              placeholder="Ex: Melhor Documentário"
            />
          )}

          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Descrição do filme (opcional)"
            className="w-full px-4 py-3 rounded-lg border border-[#92A3C0]/20 dark:border-[#324A5F]/30 bg-[#F8F9FC] dark:bg-[#0F1419] text-[#2D2B2B] dark:text-[#CCC9DC] placeholder-[#92A3C0] dark:placeholder-[#666F80] focus:outline-none focus:ring-2 focus:ring-[#A1B5D8] focus:border-transparent text-sm"
            rows={4}
          />
        </section>

        {/* Upload de Arquivos */}
        <section className="space-y-4 pb-6 border-b border-[#92A3C0]/10 dark:border-[#324A5F]/20">
          <h2 className="text-lg font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">Arquivos e Vídeo</h2>

          <FileUpload
            label="Capa do Filme"
            accept="image/jpeg,image/png,image/webp"
            maxSize={10 * 1024 * 1024} // 10MB
            onFileSelect={(file) => handleFileUpload('thumbnail', file)}
            loading={uploadProgress.thumbnail}
            success={!!uploadedFiles.thumbnail}
            helperText="Formatos: JPG, PNG, WebP. Máximo 10MB"
          />

          <Input
            label="URL do Vídeo"
            type="url"
            value={formData.video_url || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, video_url: e.target.value }))}
            placeholder="https://drive.google.com/file/d/... ou https://youtube.com/watch?v=..."
            helperText="Insira a URL do vídeo (Google Drive, YouTube ou MP4)"
          />
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={loading}>
            {loading ? 'Criando...' : 'Criar Filme'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                genre: '',
                duration: undefined,
                class_series: '',
                year: new Date().getFullYear(),
                is_award_winner: false,
                award_category: '',
              });
              setUploadedFiles({});
            }}
          >
            Limpar
          </Button>
        </div>
      </form>

      {/* Arquivo Carregado */}
      {Object.keys(uploadedFiles).length > 0 && (
        <section className="bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900/50 p-6">
          <h3 className="font-semibold text-green-900 dark:text-green-400 mb-4">Arquivos Carregados</h3>
          <div className="space-y-2">
            {uploadedFiles.thumbnail && <p className="text-sm text-green-700 dark:text-green-300">✓ Capa carregada</p>}
          </div>
        </section>
      )}

      {/* Filmes Existentes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit2 className="h-6 w-6 text-[#A1B5D8]" />
            <h2 className="text-2xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Gerenciar Filmes</h2>
          </div>
          <Button
            onClick={loadMovies}
            disabled={loadingMovies}
            variant="secondary"
            className="text-xs"
          >
            {loadingMovies ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </div>

        {loadingMovies ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-6 w-6 text-[#A1B5D8] animate-spin" />
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-8 text-[#92A3C0] dark:text-[#A1B5D8]">
            <p>Nenhum filme cadastrado ainda</p>
          </div>
        ) : (
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between p-4 rounded-lg border border-[#92A3C0]/20 dark:border-[#324A5F]/30 bg-white dark:bg-[#0F1419] hover:bg-[#92A3C0]/5 dark:hover:bg-[#1B2A41]/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC] truncate">
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#92A3C0] dark:text-[#A1B5D8]">
                    {movie.genre && <span>{movie.genre}</span>}
                    {movie.class_series && <span>•</span>}
                    {movie.class_series && <span>{movie.class_series}</span>}
                    {movie.duration && <span>•</span>}
                    {movie.duration && <span>{movie.duration}min</span>}
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => handleEditMovie(movie)}
                    className="p-2 text-[#A1B5D8] hover:bg-[#A1B5D8]/10 dark:hover:bg-[#1B2A41]/50 rounded-md transition-colors"
                    title="Editar capa"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    disabled={deletingId === movie.id}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50"
                    title="Deletar filme"
                  >
                    {deletingId === movie.id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Editar Capa */}
      <Dialog open={!!editingMovie} onClose={() => setEditingMovie(null)}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
              Editar Capa - {editingMovie?.title}
            </h3>
            <button
              onClick={() => setEditingMovie(null)}
              className="p-1 text-[#92A3C0] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Preview da capa atual */}
            {editThumbnailUrl && (
              <div className="rounded-lg overflow-hidden border border-[#92A3C0]/20 dark:border-[#324A5F]/30">
                <img
                  src={editThumbnailUrl}
                  alt="Preview da capa"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Upload de nova capa */}
            <FileUpload
              label="Fazer Upload de Nova Capa"
              accept="image/jpeg,image/png,image/webp"
              maxSize={10 * 1024 * 1024}
              onFileSelect={handleEditFileUpload}
              loading={editUploadProgress}
              success={false}
              helperText="Formatos: JPG, PNG, WebP. Máximo 10MB"
            />

            {/* Ou URL da capa */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Ou Cole a URL da Capa
              </label>
              <input
                type="url"
                value={editThumbnailUrl}
                onChange={(e) => setEditThumbnailUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg border border-[#92A3C0]/20 dark:border-[#324A5F]/30 bg-white dark:bg-[#0F1419] text-[#2D2B2B] dark:text-[#CCC9DC] placeholder-[#92A3C0] dark:placeholder-[#666F80] focus:outline-none focus:ring-2 focus:ring-[#A1B5D8] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#92A3C0]/10 dark:border-[#324A5F]/20">
            <Button
              onClick={handleSaveCover}
              variant="primary"
              loading={updatingCover}
              className="flex-1"
            >
              {updatingCover ? 'Salvando...' : 'Salvar Capa'}
            </Button>
            <Button
              onClick={() => setEditingMovie(null)}
              variant="secondary"
              disabled={updatingCover}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
