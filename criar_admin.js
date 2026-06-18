// Script para criar usuário admin no Supabase
// Execute com: node criar_admin.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xlrvtcoczskvexgqllsv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscnZ0Y29jenNrdmV4Z3FsbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MzEzNzAsImV4cCI6MjA5NzMwNzM3MH0.oAzJoe56ourjN6XsLwDQq2isxlkYMXEL_UP-5FXDY9s';

// Credenciais do novo admin
const EMAIL = 'pessoa12@gmail.com';
const PASSWORD = '1234567890';

async function criarAdmin() {
  try {
    console.log('🔧 Criando usuário admin...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Criar novo usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: EMAIL,
      password: PASSWORD,
    });
    
    if (authError) {
      console.error('❌ Erro ao criar usuário:', authError.message);
      return;
    }
    
    const userId = authData.user?.id;
    console.log('✅ Usuário criado:', userId);
    
    // Aguardar um pouco para o perfil ser criado automaticamente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualizar role para 'teacher' (que tem acesso a admin)
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'teacher' })
      .eq('id', userId);
    
    if (updateError) {
      console.error('❌ Erro ao atualizar role:', updateError.message);
      return;
    }
    
    console.log('✅ Role atualizado para "teacher" (admin)');
    console.log('');
    console.log('🎉 SUCESSO! Usuário criado:');
    console.log('   Email: ' + EMAIL);
    console.log('   Senha: ' + PASSWORD);
    console.log('');
    console.log('📝 Próximos passos:');
    console.log('1. Faça logout (clique "Sair")');
    console.log('2. Faça login com: ' + EMAIL);
    console.log('3. Acesse: http://localhost:5178/admin');
    console.log('4. Comece a cadastrar filmes! 🎬');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

criarAdmin();
