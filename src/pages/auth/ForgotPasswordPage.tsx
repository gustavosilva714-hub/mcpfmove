import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Film, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('E-mail é obrigatório'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('E-mail inválido'); return; }
    setError('');
    setLoading(true);
    const { error: err } = await resetPassword(email);
    if (err) {
      toast({ title: 'Erro ao enviar e-mail', description: err.message, variant: 'error' });
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8F9FC] dark:bg-[#000000]">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A1B5D8] dark:bg-[#1B2A41]">
            <Film className="h-4 w-4 text-[#2D2B2B] dark:text-[#CCC9DC]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#2D2B2B] dark:text-[#CCC9DC]">MCPFMovies</span>
        </div>

        <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F] bg-white dark:bg-[#0C1821] p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC] mb-2">E-mail enviado!</h2>
              <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mb-6">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2D2B2B] dark:text-[#CCC9DC] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#2D2B2B] dark:text-[#CCC9DC]">Recuperar senha</h2>
                <p className="text-sm text-[#92A3C0] dark:text-[#A1B5D8] mt-1">
                  Informe seu e-mail para receber o link de recuperação
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  error={error}
                  leftIcon={<Mail className="h-4 w-4" />}
                  autoComplete="email"
                />
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                  Enviar link de recuperação
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
        </div>
      </div>
    </div>
  );
}
