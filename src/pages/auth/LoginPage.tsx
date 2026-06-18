import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';


export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();


  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    if (!password) e.password = 'Senha é obrigatória';
    else if (password.length < 6) e.password = 'Mínimo de 6 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Erro ao fazer login', description: 'Verifique suas credenciais e tente novamente.', variant: 'error' });
    } else {
      toast({ title: 'Login realizado com sucesso!', variant: 'success' });
      navigate('/home');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#000000]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 bg-[#A1B5D8] dark:bg-[#0C1821] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 600" className="w-full h-full" fill="none">
            <circle cx="200" cy="300" r="250" stroke="white" strokeWidth="80" />
            <circle cx="350" cy="100" r="150" stroke="white" strokeWidth="40" />
            <circle cx="50" cy="500" r="100" stroke="white" strokeWidth="30" />
          </svg>
        </div>
        <div className="relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 p-2 -ml-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Voltar para a página inicial"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 overflow-hidden">
              <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">MCPFMovies</span>
          </div>
        </div>
        <div className="relative">
          <blockquote className="text-white/90 text-2xl font-light leading-relaxed mb-6">
            "O cinema é um espelho que reflete o mundo como queremos que ele seja."
          </blockquote>
          <p className="text-white/60 text-sm">Plataforma de filmes institucionais</p>
        </div>
        <div className="relative text-white/40 text-xs">
          © {new Date().getFullYear()} MCPFMovies
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] overflow-hidden">
                  <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
                </div>
                <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
              </div>
              <Link
                to="/"
                className="p-2 rounded-lg text-[#92A3C0] dark:text-[#A1B5D8] hover:bg-[#A1B5D8]/10 dark:hover:bg-[#1B2A41] transition-colors"
                title="Voltar para a página inicial"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Bem-vindo de volta</h2>
            <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-1 text-sm">Entre com sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={errors.email}
              leftIcon={<Mail className="h-4 w-4" />}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC] hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
