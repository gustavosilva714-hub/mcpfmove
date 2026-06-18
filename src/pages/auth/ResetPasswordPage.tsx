import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

type Step = 'email' | 'code' | 'password' | 'success';

export function ResetPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateCode = () => {
    const e: Record<string, string> = {};
    if (!code) e.code = 'Código é obrigatório';
    else if (code.length < 6) e.code = 'Código deve ter no mínimo 6 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!password) e.password = 'Senha é obrigatória';
    else if (password.length < 6) e.password = 'Mínimo de 6 caracteres';
    if (password !== confirmPassword) e.confirmPassword = 'Senhas não conferem';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      
      if (error) {
        toast({ title: 'Erro ao enviar código', description: error.message, variant: 'error' });
      } else {
        toast({ title: 'Código enviado!', description: 'Verifique seu e-mail para o código de recuperação', variant: 'success' });
        setStep('code');
        setErrors({});
      }
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCode()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'recovery',
      });

      if (error) {
        toast({ title: 'Código inválido', description: 'Verifique o código e tente novamente', variant: 'error' });
      } else {
        toast({ title: 'Código verificado!', variant: 'success' });
        setStep('password');
        setErrors({});
      }
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast({ title: 'Erro ao redefinir senha', description: error.message, variant: 'error' });
      } else {
        toast({ title: 'Senha redefinida com sucesso!', variant: 'success' });
        setStep('success');
        setErrors({});
      }
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8F9FC] dark:bg-[#000000]">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] overflow-hidden">
              <img src="/pipoca.ico" alt="MCPFMovies" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
          </div>
          <Link
            to="/login"
            className="p-2 rounded-lg text-[#92A3C0] dark:text-[#A1B5D8] hover:bg-[#A1B5D8]/10 dark:hover:bg-[#1B2A41] transition-colors"
            title="Voltar para o login"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F] bg-white dark:bg-[#0C1821] p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${step === 'email' || step === 'code' || step === 'password' || step === 'success' ? 'bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC]' : 'bg-[#92A3C0]/30 dark:bg-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8]'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 rounded ${step === 'code' || step === 'password' || step === 'success' ? 'bg-[#A1B5D8] dark:bg-[#1B2A41]' : 'bg-[#92A3C0]/30 dark:bg-[#324A5F]'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${step === 'code' || step === 'password' || step === 'success' ? 'bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC]' : 'bg-[#92A3C0]/30 dark:bg-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8]'}`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 rounded ${step === 'password' || step === 'success' ? 'bg-[#A1B5D8] dark:bg-[#1B2A41]' : 'bg-[#92A3C0]/30 dark:bg-[#324A5F]'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${step === 'password' || step === 'success' ? 'bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC]' : 'bg-[#92A3C0]/30 dark:bg-[#324A5F] text-[#92A3C0] dark:text-[#A1B5D8]'}`}>
              3
            </div>
          </div>

          {/* Step 1: Email */}
          {step === 'email' && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Recuperar senha</h2>
                <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                  Informe seu e-mail para receber um código de verificação
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-4">
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
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                  Enviar Código
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Voltar ao login
                </Link>
              </div>
            </>
          )}

          {/* Step 2: Code */}
          {step === 'code' && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Verificar código</h2>
                <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                  Digite o código que foi enviado para {email}
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <Input
                  label="Código de verificação"
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="000000"
                  error={errors.code}
                  maxLength={6}
                  autoComplete="off"
                />
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                  Verificar Código
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setStep('email');
                    setCode('');
                    setErrors({});
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Voltar
                </button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Nova senha</h2>
                <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                  Escolha uma nova senha segura para sua conta
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <Input
                  label="Nova senha"
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
                  Redefinir Senha
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setStep('code');
                    setPassword('');
                    setConfirmPassword('');
                    setErrors({});
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-[#92A3C0] dark:text-[#A1B5D8] hover:text-[#2D2B2B] dark:hover:text-[#CCC9DC] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Voltar
                </button>
              </div>
            </>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">Sucesso!</h2>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mb-6">
                Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
              </p>
              <Link
                to="/login"
                className="inline-flex px-6 py-2 rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41] text-[#2D2B2B] dark:text-[#CCC9DC] font-medium hover:bg-[#92A3C0] dark:hover:bg-[#324A5F] transition-colors"
              >
                Voltar ao Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
