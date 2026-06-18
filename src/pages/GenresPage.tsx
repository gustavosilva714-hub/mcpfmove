import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { 
  Zap, 
  Compass, 
  Laugh, 
  Brain, 
  Rocket, 
  Ghost, 
  Heart, 
  BookOpen, 
  Music,
  Trophy,
  Flame,
  Eye 
} from 'lucide-react';

const GENRES = [
  { id: 'acao', name: 'Ação', value: 'Ação', icon: Zap, color: 'from-red-500 to-orange-500' },
  { id: 'aventura', name: 'Aventura', value: 'Aventura', icon: Compass, color: 'from-amber-500 to-yellow-500' },
  { id: 'comedia', name: 'Comédia', value: 'Comédia', icon: Laugh, color: 'from-green-500 to-emerald-500' },
  { id: 'drama', name: 'Drama', value: 'Drama', icon: Brain, color: 'from-blue-500 to-indigo-500' },
  { id: 'ficcao', name: 'Ficção Científica', value: 'Ficção', icon: Rocket, color: 'from-purple-500 to-pink-500' },
  { id: 'terror', name: 'Terror', value: 'Terror', icon: Ghost, color: 'from-gray-600 to-slate-700' },
  { id: 'romance', name: 'Romance', value: 'Romance', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'documentario', name: 'Documentário', value: 'Documentário', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
  { id: 'musical', name: 'Musical', value: 'Musical', icon: Music, color: 'from-orange-400 to-red-400' },
  { id: 'esporte', name: 'Esporte', value: 'Esporte', icon: Trophy, color: 'from-green-600 to-lime-500' },
  { id: 'suspense', name: 'Suspense', value: 'Drama', icon: Eye, color: 'from-red-600 to-orange-600' },
  { id: 'animacao', name: 'Animação', value: 'Animação', icon: Flame, color: 'from-yellow-400 to-orange-400' },
];

export function GenresPage() {
  const navigate = useNavigate();

  const handleGenreClick = (genre: typeof GENRES[0]) => {
    // Navega para a página de catálogo com filtro de gênero
    // Passa tanto o ID quanto o nome do gênero
    navigate(`/catalog?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <div>
      <Header
        title="Gêneros"
        subtitle="Explore o catálogo por categoria"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {GENRES.map(genre => {
          const Icon = genre.icon;
          return (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre)}
              className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A1B5D8] dark:focus:ring-[#1B2A41]"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-80 dark:opacity-60 group-hover:opacity-100 transition-opacity`} />

              {/* Overlay Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <circle cx="20" cy="20" r="30" stroke="white" strokeWidth="10" />
                  <circle cx="80" cy="80" r="25" stroke="white" strokeWidth="8" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {genre.name}
                </h3>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                  Explorar →
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-16 rounded-2xl border border-[#92A3C0]/10 dark:border-[#324A5F] bg-white dark:bg-[#0C1821] p-8 text-center">
        <h3 className="text-lg font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
          Não sabe por onde começar?
        </h3>
        <p className="text-[#92A3C0] dark:text-[#A1B5D8]">
          Escolha um gênero acima e descubra conteúdos alinhados aos seus interesses
        </p>
      </div>
    </div>
  );
}
