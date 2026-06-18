import { useState } from 'react';
import { useAuth } from '@/contexts/useAuth';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabase';
import { Lock, Trash2, Eye, EyeOff } from 'lucide-react';

export function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'Senhas não conferem', variant: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'Senha deve ter ao menos 6 caracteres', variant: 'error' });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: 'Erro ao alterar senha', description: error.message, variant: 'error' });
    } else {
      toast({ title: 'Senha alterada com sucesso!', variant: 'success' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setChangingPassword(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Header title="Configurações" subtitle="Gerencie as preferências da sua conta" />

      {/* Change Password */}
      {user && (
        <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-6">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="h-4 w-4 text-[#92A3C0] dark:text-[#A1B5D8]" />
            <h3 className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC]">Alterar Senha</h3>
          </div>
          <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mb-4">
            Para sua segurança, use uma senha forte e única
          </p>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Nova senha"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••"
              rightIcon={
                <button type="button" onClick={() => setShowPasswords(!showPasswords)}>
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              autoComplete="new-password"
            />
            <Input
              label="Confirmar nova senha"
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <div className="flex justify-end">
              <Button type="submit" variant="primary" loading={changingPassword}>
                Alterar senha
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Notifications */}
      <div className="rounded-xl border border-[#92A3C0]/20 dark:border-[#324A5F]/50 bg-white dark:bg-[#0C1821] p-6">
        <h3 className="text-sm font-semibold text-[#2D2B2B] dark:text-[#CCC9DC] mb-4">Sobre o sistema</h3>
        <dl className="space-y-3 text-sm">
          {[
            { label: 'Versão', value: '1.0.0' },
            { label: 'Plataforma', value: 'MCPFMovies Web' },
            { label: 'Contato', value: 'suporte@mcpf.edu.br' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#92A3C0]/10 dark:border-[#324A5F]/20 last:border-0">
              <dt className="text-[#92A3C0] dark:text-[#A1B5D8]">{item.label}</dt>
              <dd className="font-medium text-[#2D2B2B] dark:text-[#CCC9DC]">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Danger zone */}
      {user && (
        <div className="rounded-xl border border-red-200/50 dark:border-red-900/30 bg-white dark:bg-[#0C1821] p-6">
          <div className="flex items-center gap-2 mb-1">
            <Trash2 className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Zona de Perigo</h3>
          </div>
          <p className="text-xs text-[#92A3C0] dark:text-[#A1B5D8] mb-4">
            Ações irreversíveis relacionadas à sua conta
          </p>
          {!deletingAccount ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeletingAccount(true)}
            >
              Excluir minha conta
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[#2D2B2B] dark:text-[#CCC9DC]">
                Digite <strong>EXCLUIR</strong> para confirmar a exclusão da sua conta:
              </p>
              <Input
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder="EXCLUIR"
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deleteConfirm !== 'EXCLUIR'}
                  onClick={async () => {
                    toast({ title: 'Funcionalidade restrita', description: 'Entre em contato com a administração.', variant: 'error' });
                    setDeletingAccount(false);
                    setDeleteConfirm('');
                  }}
                >
                  Confirmar exclusão
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setDeletingAccount(false); setDeleteConfirm(''); }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
