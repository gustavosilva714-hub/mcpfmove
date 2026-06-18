// Script para atualizar role para admin
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xlrvtcoczskvexgqllsv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscnZ0Y29jenNrdmV4Z3FsbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MzEzNzAsImV4cCI6MjA5NzMwNzM3MH0.oAzJoe56ourjN6XsLwDQq2isxlkYMXEL_UP-5FXDY9s';

const EMAIL = 'pessoa12@gmail.com';

async function atualizarRole() {
  try {
    console.log('🔧 Buscando usuário: ' + EMAIL);
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Buscar usuário por email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError.message);
      console.log('');
      console.log('💡 Alternativa: Atualizar pelo Supabase Dashboard:');
      console.log('   1. Acesse: https://supabase.com/dashboard');
      console.log('   2. Seu projeto → Authentication → Users');
      console.log('   3. Procure por: ' + EMAIL);
      console.log('   4. Não faça nada, ele já tem role de teacher');
      return;
    }
    
    const user = users?.find(u => u.email === EMAIL);
    
    if (!user) {
      console.error('❌ Usuário não encontrado!');
      return;
    }
    
    console.log('✅ Usuário encontrado: ' + user.id);
    
    // Atualizar role para 'teacher'
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'teacher' })
      .eq('id', user.id);
    
    if (updateError) {
      console.error('❌ Erro ao atualizar role:', updateError.message);
      return;
    }
    
    console.log('✅ Role atualizado para "teacher" (acesso admin)');
    console.log('');
    console.log('🎉 PRONTO! Agora:');
    console.log('1. Vá para http://localhost:5178/login');
    console.log('2. Faça logout (clique "Sair")');
    console.log('3. Login com:');
    console.log('   Email: ' + EMAIL);
    console.log('   Senha: 1234567890');
    console.log('4. Acesse: http://localhost:5178/admin');
    console.log('5. Comece a cadastrar filmes! 🎬');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

atualizarRole();
