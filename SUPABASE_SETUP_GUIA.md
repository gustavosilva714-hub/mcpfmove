## 🚀 Guia Completo - Configuração MCPFMovies com Supabase

Este documento é um passo a passo para configurar o Supabase completamente para o projeto MCPFMovies.

---

## ✅ Arquivos Criados

1. **DATABASE_SETUP.sql** - Script SQL completo com todas as tabelas
2. **.env.local** - Variáveis de ambiente

---

## 📋 PASSO 1: Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Escolha uma organização (crie se necessário)
4. Configure:
   - **Project Name**: `mcpfmovies` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e GUARDE!
   - **Region**: Selecione a região mais próxima
   - **Pricing Plan**: Free (adequado para desenvolvimento)
5. Aguarde o projeto ser criado (leva alguns minutos)

---

## 🗄️ PASSO 2: Executar o Script SQL

1. No painel do Supabase, acesse **SQL Editor**
2. Clique no ícone **+** para criar uma nova query
3. Copie TODO o conteúdo do arquivo **DATABASE_SETUP.sql**
4. Cole no editor SQL do Supabase
5. Clique em **Run** (ou Ctrl+Enter)
6. ✅ Aguarde completar - você verá "Success" em verde

**Importante**: Se aparecer algum erro, é normal! Alguns comandos podem dar erro se as tabelas já existirem. Ignore esses erros e continue.

---

## 📦 PASSO 3: Criar Storage Buckets

1. No painel do Supabase, acesse **Storage**
2. Crie 3 buckets clicando em **Create a new bucket**:

### Bucket 1: avatars
- **Name**: `avatars`
- **Privacy**: Public
- Clique em **Create bucket**

### Bucket 2: thumbnails
- **Name**: `thumbnails`
- **Privacy**: Public
- Clique em **Create bucket**

### Bucket 3: videos
- **Name**: `videos`
- **Privacy**: Private (mais seguro)
- Clique em **Create bucket**

---

## 🔐 PASSO 4: Obter Credenciais do Supabase

1. No painel do Supabase, acesse **Settings > API**
2. Você verá:
   - **Project URL** (copie esta URL)
   - **anon public** (copie esta chave)
3. Estas são suas credenciais!

---

## 📝 PASSO 5: Configurar .env.local

Abra o arquivo **.env.local** criado na raiz do projeto e preencha com suas credenciais:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Exemplo de como ficar:**
```
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InxyeXphYmMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQ1Njc4OCwiZXhwIjoxODgxMjIyNzg4fQ.abcdefghijklmnopqrstuvwxyz
```

⚠️ **NÃO compartilhe essas credenciais! Adicione .env.local ao .gitignore**

---

## 🧪 PASSO 6: Testar a Conexão

1. Salve o arquivo **.env.local**
2. Reinicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
3. Abra a aplicação no navegador
4. Clique em **"Criar conta"** e crie uma conta de teste
5. ✅ Se conseguir fazer login, tudo está funcionando!

---

## 📋 Tabelas Criadas

| Tabela | Descrição |
|--------|-----------|
| **profiles** | Dados dos usuários (nome, avatar, turma, role) |
| **movies** | Filmes da plataforma |
| **favorites** | Filmes favoritos dos usuários |
| **watch_later** | Filmes para assistir depois |
| **ratings** | Avaliações dos filmes (1-5 estrelas) |
| **watch_history** | Histórico de visualização |

---

## 🔒 Segurança Implementada

✅ Row Level Security (RLS) configurado
✅ Políticas de acesso baseadas em roles
✅ Constraints e validações no banco de dados
✅ Índices para performance

---

## 🐛 Troubleshooting

### Erro: "Connection refused"
- Verifique se o URL e a chave estão corretos no .env.local
- Reinicie o servidor

### Erro: "useToast must be used within ToastProvider"
- Este erro foi corrigido! Atualize o App.tsx

### Erro: "Authentication required"
- Faça login novamente
- Limpe o cache do navegador

### Erro ao criar usuário
- Verifique se a coluna `full_name` está mapeada corretamente
- Verifique os dados enviados no RegisterPage.tsx

---

## 📚 Dados de Exemplo

O script já cria 5 filmes de exemplo! Você pode:

1. Acessar a aplicação
2. Ver os filmes na página inicial
3. Favoritar, adicionar à fila, avaliar

Para adicionar mais filmes manualmente:
1. Acesse Supabase > Database > Movies table
2. Clique em **Insert** > **Insert row**
3. Preencha os dados do filme

---

## ✨ Tudo Pronto!

Se você seguiu todos os passos:
- ✅ Banco de dados configurado
- ✅ Storage buckets criados
- ✅ Autenticação funcionando
- ✅ RLS configurado para segurança
- ✅ Aplicação 100% funcional

**Próximo passo**: Personalize os filmes, adicione mais conteúdo e compartilhe com seus alunos! 🎬

---

## 💡 Dicas Adicionais

### Adicionar mais usuários
Crie contas normalmente via "Criar conta" na aplicação.

### Alterar role de usuário
1. Vá para Supabase > Database > Profiles table
2. Edite a coluna `role` para `teacher` ou `admin` conforme necessário

### Alterar RLS policies
Se precisar de políticas diferentes, edite as políticas no SQL Editor do Supabase.

### Fazer backup
Supabase oferece backups automáticos no plano free. Configure backups periódicos em Settings > Database.

---

## 🆘 Precisa de Ajuda?

Se algo não funcionar:
1. Verifique se copiou TODO o SQL (não deixe nada para trás)
2. Verifique as credenciais no .env.local
3. Reinicie o servidor
4. Abra o DevTools (F12) e veja os erros

Boa sorte! 🚀
