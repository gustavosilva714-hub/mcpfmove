import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4 bg-[#F8F9FC] dark:bg-[#000000]">
      <div className="space-y-2">
        <div className="flex justify-center">
          <svg viewBox="0 0 120 80" className="w-32 h-20 text-[#92A3C0]/30 dark:text-[#324A5F]/50" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="10" y="15" width="100" height="50" rx="4" />
            <circle cx="60" cy="40" r="14" />
            <polygon points="55,33 55,47 68,40" fill="currentColor" opacity="0.4" />
            <line x1="10" y1="25" x2="110" y2="25" />
            <rect x="10" y="15" width="10" height="10" fill="currentColor" opacity="0.3" />
            <rect x="23" y="15" width="10" height="10" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-[#92A3C0] dark:text-[#324A5F]">404</h1>
        <h2 className="text-xl font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">
          Página não encontrada
        </h2>
        <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] max-w-sm">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-lg px-5 py-2.5 bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] text-sm font-medium hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
