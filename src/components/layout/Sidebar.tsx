import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Heart, Clock, Trophy, User, Settings, Menu, X, LogOut, Plus, Tv, Layers, Grid3x3 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuth } from '@/contexts/useAuth';

const navItems = [
  { to: '/home', label: 'Início', icon: Home, end: true },
  { to: '/series', label: 'Séries', icon: Tv },
  { to: '/genres', label: 'Gêneros', icon: Layers },
  { to: '/catalog', label: 'Catálogo', icon: Grid3x3 },
  { to: '/favorites', label: 'Favoritos', icon: Heart },
  { to: '/watch-later', label: 'Assistir Mais Tarde', icon: Clock },
  { to: '/awarded', label: 'Premiados', icon: Trophy },
  { to: '/profile', label: 'Meu Perfil', icon: User },
  { to: '/settings', label: 'Configurações', icon: Settings },
];

const adminNavItems = [
  { to: '/admin', label: 'Cadastrar Filme', icon: Plus },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setMobileOpen(false);
  };

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden rounded-lg p-2 bg-white dark:bg-[#0C1821] border border-[#92A3C0]/20 dark:border-[#324A5F] shadow-sm text-[#2D2B2B] dark:text-[#CCC9DC] hover:bg-[#92A3C0]/10"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col',
          'bg-white dark:bg-[#0C1821]',
          'border-r border-[#92A3C0]/20 dark:border-[#324A5F]/50',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:z-30',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#92A3C0]/10 dark:border-[#324A5F]/30">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] overflow-hidden">
              <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-base tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">
              MCPFMovies
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-md p-1 text-[#92A3C0] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-0.5">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#A1B5D8]/20 text-[#2D2B2B] dark:bg-[#1B2A41] dark:text-[#CCC9DC]'
                        : 'text-[#92A3C0] hover:bg-[#92A3C0]/10 hover:text-[#2D2B2B] dark:text-[#A1B5D8] dark:hover:bg-[#1B2A41]/50 dark:hover:text-[#CCC9DC]'
                    )
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Admin Section - Only visible for admins */}
          {profile?.class_series === 'Administrativo' && (
            <>
              <div className="my-4 pt-4 border-t border-[#92A3C0]/10 dark:border-[#324A5F]/30">
                <p className="px-3 text-xs font-semibold text-[#92A3C0] dark:text-[#A1B5D8] uppercase tracking-wider">
                  Gerenciar
                </p>
              </div>
              <ul className="space-y-0.5">
                {adminNavItems.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-[#A1B5D8]/20 text-[#2D2B2B] dark:bg-[#1B2A41] dark:text-[#CCC9DC]'
                            : 'text-[#92A3C0] hover:bg-[#92A3C0]/10 hover:text-[#2D2B2B] dark:text-[#A1B5D8] dark:hover:bg-[#1B2A41]/50 dark:hover:text-[#CCC9DC]'
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-[#92A3C0]/10 dark:border-[#324A5F]/30 p-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#A1B5D8] dark:bg-[#1B2A41] text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] truncate">
                  {profile?.full_name || user.email}
                </p>
                <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] truncate">
                  {profile?.role || 'Estudante'}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                title="Sair"
                className="rounded-md p-1.5 text-[#92A3C0] hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setMobileOpen(false); }}
              className="w-full rounded-lg px-3 py-2 text-sm font-medium text-center bg-[#A1B5D8]/20 text-[#2D2B2B] dark:bg-[#1B2A41] dark:text-[#CCC9DC] hover:bg-[#A1B5D8]/30 dark:hover:bg-[#324A5F] transition-colors"
            >
              Fazer Login
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
