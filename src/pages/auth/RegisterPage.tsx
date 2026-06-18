// ========================================
// ARQUIVO: RegisterPage.tsx - Página de registro
// DESCRIÇÃO: Permite que novos usuários criem uma conta
// ========================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export function RegisterPage() {
  // ========== ESTADOS ==========
  const [fullName, setFullName] = useState(''); // Nome completo do novo usuário
  const [email, setEmail] = useState(''); // Email do novo usuário
  const [password, setPassword] = useState(''); // Senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirmação de senha
  const [showPassword, setShowPassword] = useState(false); // Controla visibilidade da senha
  const [loading, setLoading] = useState(false); // Indicador de carregamento durante registro
  const [errors, setErrors] = useState<Record<string, string>>({}); // Erros de validação

  // ========== CONTEXTOS E HOOKS ==========
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ========== FUNÇÕES ==========
  /**
   * Valida todos os campos do formulário de registro
   * Retorna true se todos os campos são válidos
   */
  const validate = () => {
    const e: Record<string, string> = {};
    // Valida nome completo: obrigatório
    if (!fullName.trim()) e.fullName = 'Nome completo é obrigatório';
    // Valida email: obrigatório e formato válido
    if (!email) e.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    // Valida senha: obrigatória e mínimo de 6 caracteres
    if (!password) e.password = 'Senha é obrigatória';
    else if (password.length < 6) e.password = 'Mínimo de 6 caracteres';
    // Valida confirmação de senha: deve ser igual à senha
    if (password !== confirmPassword) e.confirmPassword = 'Senhas não conferem';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /**
   * Manipula o envio do formulário de registro
   * 1. Valida os campos
   * 2. Chama a função signUp do contexto
   * 3. Se sucesso, navega para o login
   * 4. Se erro, mostra mensagem de erro
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      toast({ title: 'Erro ao criar conta', description: error.message, variant: 'error' });
    } else {
      toast({ title: 'Conta criada com sucesso!', description: 'Verifique seu e-mail para confirmar o cadastro.', variant: 'success' });
      // Navega para login após sucesso no registro
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FC] dark:bg-[#000000]">
      {/* ========== PAINEL ESQUERDO (DESKTOP) ========== */}
      {/* Painel de design com logo e mensagem (visível apenas em desktop) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 bg-[#AFC7EF] dark:bg-[#0C1821] relative overflow-hidden">
        {/* Fundo decorativo com SVG */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 600" className="w-full h-full" fill="none">
            <rect x="50" y="100" width="300" height="400" rx="20" stroke="white" strokeWidth="60" />
            <rect x="150" y="50" width="100" height="500" stroke="white" strokeWidth="20" />
          </svg>
        </div>
        {/* Conteúdo do painel esquerdo */}
        <div className="relative">
          {/* Botão de voltar para a landing page */}
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
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#AFC7EF] dark:bg-[#1B2A41] overflow-hidden">
                  <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
                </div>
                <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
              </div>
              <Link
                to="/"
                className="p-2 rounded-lg text-[#92A3C0] dark:text-[#A1B5D8] hover:bg-[#AFC7EF]/10 dark:hover:bg-[#1B2A41] transition-colors"
                title="Voltar para a página inicial"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
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
