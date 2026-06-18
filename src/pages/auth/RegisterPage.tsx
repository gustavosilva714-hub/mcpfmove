import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Film } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'Nome completo é obrigatório';
    if (!email) e.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    if (!password) e.password = 'Senha é obrigatória';
    else if (password.length < 6) e.password = 'Mínimo de 6 caracteres';
    if (password !== confirmPassword) e.confirmPassword = 'Senhas não conferem';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      toast({ title: 'Erro ao criar conta', description: error.message, variant: 'error' });
    } else {
      toast({ title: 'Conta criada com sucesso!', description: 'Verifique seu e-mail para confirmar o cadastro.', variant: 'success' });
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#000000]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 bg-[#AFC7EF] dark:bg-[#0C1821] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 600" className="w-full h-full" fill="none">
            <rect x="50" y="100" width="300" height="400" rx="20" stroke="white" strokeWidth="60" />
            <rect x="150" y="50" width="100" height="500" stroke="white" strokeWidth="20" />
          </svg>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Film className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">MCPFMovies</span>
        </div>
        <div className="relative">
          <h3 className="text-white text-2xl font-light leading-relaxed mb-4">
            Faça parte da comunidade criativa da escola
          </h3>
          <ul className="space-y-2">
            {['Assista filmes produzidos pela escola', 'Crie sua lista de favoritos', 'Avalie e descubra premiados'].map(item => (
              <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-white/40 text-xs">
          © {new Date().getFullYear()} MCPFMovies
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#AFC7EF] dark:bg-[#1B2A41]">
                <Film className="h-4 w-4 text-[#2D2B2B] dark:text-[#CCC9DC]" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
            </div>
            <h2 className="text-2xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Criar conta</h2>
            <p className="text-[#92A3C0] dark:text-[#A1B5D8] mt-1 text-sm">Preencha os dados para se cadastrar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome completo"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Seu nome completo"
              error={errors.fullName}
              leftIcon={<User className="h-4 w-4" />}
              autoComplete="name"
            />
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
              autoComplete="new-password"
            />
            <Input
              label="Confirmar senha"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.confirmPassword}
              leftIcon={<Lock className="h-4 w-4" />}
              autoComplete="new-password"
            />

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Criar conta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#92A3C0] dark:text-[#A1B5D8]">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC] hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
