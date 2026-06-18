// ========================================
// ARQUIVO: LandingPage.tsx - Página inicial pública
// DESCRIÇÃO: Landing page para visitantes não autenticados
// Exibe informações sobre a plataforma, recursos e call-to-action para login
// ========================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, Heart, Clock, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingPage() {
  // ========== ESTADOS ==========
  const [menuOpen, setMenuOpen] = useState(false); // Controla abertura do menu mobile

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#000000]">
      {/* ========== NAVEGAÇÃO ========== */}
      {/* Barra de navegação sticky com logo, links e botão de login */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0C1821]/80 backdrop-blur-md border-b border-[#92A3C0]/10 dark:border-[#324A5F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo e nome da aplicação */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] overflow-hidden">
                <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
            </div>

            {/* ========== MENU DESKTOP ========== */}
            {/* Menu de navegação visível apenas em desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">
                Recursos
              </a>
              <a href="#" className="text-sm font-medium text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">
                Sobre
              </a>
              {/* Link para página de login */}
              <Link
                to="/login"
                className="px-6 py-2 rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] font-medium hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors"
              >
                Entrar
              </Link>
            </div>

            {/* ========== BOTÃO MENU MOBILE ========== */}
            {/* Botão hamburger para abrir menu mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#2D2B2B] dark:text-[#CCC9DC]"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* ========== MENU MOBILE ========== */}
          {/* Menu de navegação visível apenas em mobile */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              <a href="#features" className="block text-sm font-medium text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC]">
                Recursos
              </a>
              <a href="#" className="block text-sm font-medium text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC]">
                Sobre
              </a>
              <Link
                to="/login"
                className="block px-6 py-2 rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] font-medium text-center hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors"
              >
                Entrar
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 400 600" className="w-full h-full" fill="none">
            <circle cx="200" cy="300" r="250" stroke="currentColor" strokeWidth="80" />
            <circle cx="350" cy="100" r="150" stroke="currentColor" strokeWidth="40" />
            <circle cx="50" cy="500" r="100" stroke="currentColor" strokeWidth="30" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-6">
              Sua Plataforma de Conteúdo Premium
            </h1>
            <p className="text-lg sm:text-xl text-[#92A3C0] dark:text-[#A1B5D8] mb-8">
              Descubra filmes, séries e documentários incríveis. Organize seus favoritos e retome de onde parou.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="px-8 py-3 rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] font-semibold hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors inline-flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Comece Agora
              </Link>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-[#92A3C0]/30 dark:border-[#324A5F] text-[#2D2B2B] dark:text-[#CCC9DC] font-semibold hover:bg-[#92A3C0]/10 dark:hover:bg-[#324A5F]/30 transition-colors"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#A1B5D8] to-[#92A3C0] dark:from-[#1B2A41] dark:to-[#324A5F] p-1">
            <div className="bg-white dark:bg-[#0C1821] rounded-2xl p-12 flex items-center justify-center min-h-80">
              <div className="text-center">
                <Play className="h-16 w-16 text-[#92A3C0] dark:text-[#A1B5D8] mx-auto mb-4 opacity-50" />
                <p className="text-[#92A3C0] dark:text-[#A1B5D8]">Seu conteúdo te aguarda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-[#0C1821]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">
              Recursos Incríveis
            </h2>
            <p className="text-lg text-[#92A3C0] dark:text-[#A1B5D8]">
              Tudo que você precisa para uma experiência de visualização perfeita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl border border-[#92A3C0]/10 dark:border-[#324A5F] p-6 hover:border-[#92A3C0]/30 dark:hover:border-[#324A5F]/80 transition-colors">
              <div className="rounded-lg bg-[#A1B5D8]/10 dark:bg-[#1B2A41]/50 p-3 w-fit mb-4">
                <Search className="h-6 w-6 text-[#A1B5D8] dark:text-[#A1B5D8]" />
              </div>
              <h3 className="font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Busca Inteligente
              </h3>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                Encontre filmes, séries e documentários facilmente com filtros avançados
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-[#92A3C0]/10 dark:border-[#324A5F] p-6 hover:border-[#92A3C0]/30 dark:hover:border-[#324A5F]/80 transition-colors">
              <div className="rounded-lg bg-[#A1B5D8]/10 dark:bg-[#1B2A41]/50 p-3 w-fit mb-4">
                <Heart className="h-6 w-6 text-[#A1B5D8] dark:text-[#A1B5D8]" />
              </div>
              <h3 className="font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Favoritos
              </h3>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                Salve seus conteúdos favoritos para acessá-los facilmente depois
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-[#92A3C0]/10 dark:border-[#324A5F] p-6 hover:border-[#92A3C0]/30 dark:hover:border-[#324A5F]/80 transition-colors">
              <div className="rounded-lg bg-[#A1B5D8]/10 dark:bg-[#1B2A41]/50 p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-[#A1B5D8] dark:text-[#A1B5D8]" />
              </div>
              <h3 className="font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Assista Depois
              </h3>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                Adicione conteúdos à sua fila para assistir quando tiver tempo
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-[#92A3C0]/10 dark:border-[#324A5F] p-6 hover:border-[#92A3C0]/30 dark:hover:border-[#324A5F]/80 transition-colors">
              <div className="rounded-lg bg-[#A1B5D8]/10 dark:bg-[#1B2A41]/50 p-3 w-fit mb-4">
                <Star className="h-6 w-6 text-[#A1B5D8] dark:text-[#A1B5D8]" />
              </div>
              <h3 className="font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">
                Avaliações
              </h3>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                Veja as avaliações da comunidade e descubra conteúdos mais bem avaliados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#A1B5D8] to-[#92A3C0] dark:from-[#1B2A41] dark:to-[#324A5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="50" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Comece a Explorar Agora
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Acesse milhares de horas de conteúdo premium. Assine agora e desbloqueie toda a biblioteca.
          </p>
          <Link
            to="/login"
            className="inline-flex px-8 py-3 rounded-lg bg-white text-[#A1B5D8] font-semibold hover:bg-white/90 transition-colors items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Entrar Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-[#0C1821] border-t border-[#92A3C0]/10 dark:border-[#324A5F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Ajuda</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Termos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Quem somos</a></li>
                <li><a href="#" className="hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#92A3C0]/10 dark:border-[#324A5F] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] overflow-hidden">
                <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
              </div>
              <span className="font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
            </div>
            <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
              © {new Date().getFullYear()} MCPFMovies. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
