import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export function Header({ title, subtitle, onSearch, searchPlaceholder, className }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');


  const handleSearch = (q: string) => {
    setQuery(q);
    onSearch?.(q);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
    setSearchOpen(false);
  };

  return (
    <header className={cn('flex items-center justify-between gap-4 mb-6 lg:mb-8', className)}>
      <div className="min-w-0">
        <h1 className="text-xl lg:text-2xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-0.5">{subtitle}</p>
        )}
      </div>

      {onSearch && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {searchOpen ? (
            <div className="flex items-center gap-2 rounded-lg border border-[#92A3C0]/40 dark:border-[#324A5F] bg-white dark:bg-[#0C1821] px-3 py-1.5">
              <Search className="h-4 w-4 text-[#92A3C0] dark:text-[#A1B5D8] flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder={searchPlaceholder || 'Buscar filmes...'}
                className="w-48 lg:w-64 text-sm bg-transparent outline-none text-[#2D2B2B] dark:text-[#CCC9DC] placeholder:text-[#92A3C0] dark:placeholder:text-[#324A5F]"
              />
              <button onClick={clearSearch} className="text-[#92A3C0] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC]">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 border border-[#92A3C0]/30 dark:border-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8] hover:bg-[#92A3C0]/10 dark:hover:bg-[#324A5F]/30 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
