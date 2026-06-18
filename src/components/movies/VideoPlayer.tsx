import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { MovieWithMeta } from '@/types/database';
import { useWatchHistory, useRating } from '@/hooks/useMovies';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';

interface VideoPlayerProps {
  movie: MovieWithMeta;
  onClose: () => void;
}

export function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [userRating, setUserRating] = useState(movie.user_rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { recordWatch } = useWatchHistory();
  const { setRating } = useRating();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      setVideoError(null); // Reset error when closing
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    if (pct > 90 && user) recordWatch(movie.id, 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const t = parseFloat(e.target.value);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.volume = v;
    setVolume(v);
    setMuted(v === 0);
  };

  const handleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!fullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setFullscreen(!fullscreen);
  };

  const skip = (secs: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + secs, duration));
  };

  const showCtrl = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleRating = async (r: number) => {
    setUserRating(r);
    if (user) await setRating(movie.id, r);
  };

  // Detectar e extrair YouTube video ID - MELHORADO
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    try {
      // Tentar URL normal
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        // youtube.com?v=ID
        if (urlObj.searchParams.has('v')) {
          return urlObj.searchParams.get('v');
        }
        // youtu.be/ID
        if (urlObj.pathname.includes('/')) {
          return urlObj.pathname.split('/')[1];
        }
      }
    } catch (e) {
      // Se não for URL válida, tentar regex
      const regexPatterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
        /([a-zA-Z0-9_-]{11})/ // ID de 11 caracteres
      ];
      
      for (const pattern of regexPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  };

  const isYouTubeUrl = (url: string): boolean => {
    if (!url) return false;
    return /youtube|youtu\.be|youtube-nocookie/.test(url);
  };

  const getGoogleDriveFileId = (url: string): string | null => {
    try {
      // Extrair file ID de diferentes formatos de URL do Google Drive
      const fileIdMatch = url.match(/(?:\/d\/|id=)([a-zA-Z0-9-_]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return fileIdMatch[1];
      }
    } catch (err) {
      return null;
    }
    return null;
  };

  const isGoogleDriveUrl = (url: string): boolean => {
    return /drive\.google\.com/.test(url);
  };

  const isMegaEmbedUrl = (url: string): boolean => {
    if (!url) return false;
    return /mega\.(?:nz|co\.nz)\/embed/.test(url);
  };

  const isMegaFileUrl = (url: string): boolean => {
    if (!url) return false;
    return /mega\.(?:nz|co\.nz)\/file/.test(url) && !isMegaEmbedUrl(url);
  };

  const isMegaUrl = (url: string): boolean => {
    if (!url) return false;
    return /mega\.(?:nz|co\.nz)/.test(url);
  };

  const hasVideo = !!movie.video_url;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className={cn(
        'absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300',
        showControls ? 'opacity-100' : 'opacity-0'
      )}>
        <div>
          <h2 className="text-white font-semibold text-lg">{movie.title}</h2>
          {movie.class_series && (
            <p className="text-white/60 text-sm">{movie.class_series}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Video Area */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center"
        onMouseMove={showCtrl}
        onClick={togglePlay}
      >
        {hasVideo ? (
          isYouTubeUrl(movie.video_url!) ? (
            // YouTube iframe - com proporções corretas 16:9
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  key={`youtube-${getYouTubeVideoId(movie.video_url!)}`}
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(movie.video_url!)}?autoplay=1`}
                  title={movie.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  style={{ border: 'none' }}
                  onLoad={() => console.log('✅ YouTube iframe loaded')}
                  onError={() => setVideoError('Falha ao carregar YouTube. Tente recarregar.')}
                />
              </div>
            </div>
          ) : isMegaEmbedUrl(movie.video_url!) ? (
            // MEGA embed iframe - suporte direto
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  key={`mega-${movie.video_url}`}
                  src={movie.video_url}
                  title={movie.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  style={{ border: 'none' }}
                  onLoad={() => console.log('✅ MEGA iframe loaded')}
                  onError={() => setVideoError('Falha ao carregar MEGA. Link pode estar expirado.')}
                  allowFullScreen
                />
              </div>
            </div>
          ) : isGoogleDriveUrl(movie.video_url!) ? (
            // Google Drive embed preview
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  key={`gdrive-${getGoogleDriveFileId(movie.video_url!)}`}
                  src={`https://drive.google.com/file/d/${getGoogleDriveFileId(movie.video_url!)}/preview`}
                  title={movie.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  style={{ border: 'none' }}
                  onLoad={() => console.log('✅ Google Drive iframe loaded')}
                  onError={() => setVideoError('Falha ao carregar Google Drive. Arquivo pode estar privado.')}
                />
              </div>
            </div>
          ) : isMegaUrl(movie.video_url!) ? (
            // Mega file - renderizar como video tag com tentativa de download
            <>
              {videoError ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center px-8 h-full">
                  <div className="rounded-full bg-red-500/10 p-8 border border-red-500/20">
                    <svg viewBox="0 0 80 80" className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="40" cy="40" r="30" />
                      <path d="M40 25v30M25 40h30" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="max-w-md">
                    <p className="text-white text-lg font-medium">Erro ao carregar vídeo do Mega</p>
                    <p className="text-white/60 text-sm mt-2">{videoError}</p>
                    <p className="text-white/40 text-xs mt-3">Dica: Verifique se o arquivo está compartilhado publicamente</p>
                    <button
                      onClick={() => setVideoError(null)}
                      className="mt-4 px-4 py-2 bg-[#AFC7EF] hover:bg-[#A1B5D8] text-[#2D2B2B] rounded-md transition-colors text-sm font-medium"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={movie.video_url}
                  className="max-h-full max-w-full w-full"
                  crossOrigin="anonymous"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => { setPlaying(false); if (user) recordWatch(movie.id, 100); }}
                  onError={() => setVideoError('Mega: Arquivo pode estar privado ou link expirou. Tente compartilhar novamente.')}
                />
              )}
            </>
          ) : (
            // Regular video player (MP4, WebM, etc)
            <>
              {videoError && (
                <div className="flex flex-col items-center justify-center gap-4 text-center px-8 h-full">
                  <div className="rounded-full bg-red-500/10 p-8 border border-red-500/20">
                    <svg viewBox="0 0 80 80" className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="40" cy="40" r="30" />
                      <path d="M40 25v30M25 40h30" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="max-w-md">
                    <p className="text-white text-lg font-medium">Erro ao carregar vídeo</p>
                    <p className="text-white/60 text-sm mt-2">{videoError}</p>
                    
                    {/* Mostrar dicas de formatos suportados */}
                    <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-md text-left">
                      <p className="text-white/40 text-xs font-medium mb-2">✓ Formatos Suportados:</p>
                      <ul className="text-white/50 text-xs space-y-1">
                        <li>• YouTube (Links youtube.com ou youtu.be)</li>
                        <li>• Google Drive (Links drive.google.com)</li>
                        <li>• MEGA (Links mega.nz/embed/...)</li>
                        <li>• MP4/WebM hospedado localmente</li>
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => setVideoError(null)}
                      className="mt-4 px-4 py-2 bg-[#AFC7EF] hover:bg-[#A1B5D8] text-[#2D2B2B] rounded-md transition-colors text-sm font-medium"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              )}
              {!videoError && (
                <video
                  ref={videoRef}
                  src={movie.video_url!}
                  className="max-h-full max-w-full w-full"
                  crossOrigin="anonymous"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => { setPlaying(false); if (user) recordWatch(movie.id, 100); }}
                  onError={(e) => {
                    const video = e.currentTarget;
                    let errorMsg = 'Erro desconhecido ao carregar vídeo';
                    
                    if (video.error) {
                      switch (video.error.code) {
                        case 1: errorMsg = 'Carregamento foi abortado'; break;
                        case 2: errorMsg = 'Erro de rede - Servidor pode não permitir acesso (CORS)'; break;
                        case 3: errorMsg = 'Erro ao decodificar vídeo'; break;
                        case 4: errorMsg = 'Formato não suportado. Formatos aceitos: MP4, WebM'; break;
                      }
                    }
                    setVideoError(errorMsg);
                  }}
                />
              )}
            </>
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 text-center px-8">
            <div className="rounded-full bg-white/5 p-8 border border-white/10">
              <svg viewBox="0 0 80 80" className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="10" y="20" width="60" height="40" rx="4" />
                <circle cx="40" cy="40" r="10" />
                <polygon points="37,35 37,45 47,40" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
            <div>
              <p className="text-white/60 text-lg font-medium">Vídeo não disponível</p>
              <p className="text-white/40 text-sm mt-1">O arquivo de vídeo ainda não foi adicionado a este filme.</p>
            </div>
          </div>
        )}

        {/* Play/Pause indicator */}
        {!playing && hasVideo && !isMegaEmbedUrl(movie.video_url!) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-black/40 p-5">
              <Play className="h-10 w-10 text-white fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {hasVideo && !videoError && !isMegaEmbedUrl(movie.video_url!) && (
        <div className={cn(
          'absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}>
          {/* Progress */}
          <div className="mb-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 accent-[#AFC7EF] cursor-pointer"
              onClick={e => e.stopPropagation()}
            />
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={e => { e.stopPropagation(); skip(-10); }} className="text-white/70 hover:text-white transition-colors p-1">
                <SkipBack className="h-5 w-5" />
              </button>
              <button onClick={e => { e.stopPropagation(); togglePlay(); }} className="text-white hover:text-white/80 transition-colors p-1">
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button onClick={e => { e.stopPropagation(); skip(10); }} className="text-white/70 hover:text-white transition-colors p-1">
                <SkipForward className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 ml-2" onClick={e => e.stopPropagation()}>
                <button onClick={handleMute} className="text-white/70 hover:text-white transition-colors">
                  {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-20 h-1 accent-[#AFC7EF] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  {[1, 2, 3, 4, 5].map(r => (
                    <button
                      key={r}
                      onMouseEnter={() => setHoverRating(r)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRating(r)}
                      className="transition-colors"
                    >
                      <Star
                        className={cn(
                          'h-4 w-4',
                          r <= (hoverRating || userRating) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}
              <button onClick={e => { e.stopPropagation(); handleFullscreen(); }} className="text-white/70 hover:text-white transition-colors p-1">
                {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie info panel (when no video) */}
      {!hasVideo && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-2xl">
            {movie.description && (
              <p className="text-white/60 text-sm mb-3">{movie.description}</p>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Sua avaliação:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button
                      key={r}
                      onMouseEnter={() => setHoverRating(r)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRating(r)}
                      className="transition-colors"
                    >
                      <Star
                        className={cn(
                          'h-5 w-5',
                          r <= (hoverRating || userRating) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
