## ⚡ Checklist Rápido - Setup Supabase

Siga este checklist para colocar a aplicação 100% funcional com Supabase.

---

## 📍 PASSO 1: Criar Projeto Supabase

- [ ] Acesse https://supabase.com/dashboard
- [ ] Clique em "New Project"
- [ ] Preenchaa informações:
  - Name: `mcpfmovies` (ou seu nome)
  - Database Password: (guarde isso!)
  - Region: Selecione próxima
  - Plan: Free
- [ ] Aguarde criação (5-10 minutos)
- [ ] ✅ Projeto criado!

---

## 🗄️ PASSO 2: Executar Script SQL

- [ ] Abra o projeto Supabase
- [ ] Vá para **SQL Editor**
- [ ] Clique no **+** para nova query
- [ ] Abra o arquivo **DATABASE_SETUP.sql** do projeto
- [ ] Copie TODO o conteúdo
- [ ] Cole no editor SQL do Supabase
- [ ] Clique em **Run** (ou Ctrl+Enter)
- [ ] ✅ Aguarde sucesso (verde)

**Erros normais a ignorar:**
- "already exists" - tabela já criada
- "policy already exists" - política já criada

---

## 🪣 PASSO 3: Criar Storage Buckets

No Supabase, vá para **Storage** e crie:

### Bucket 1: avatars
- [ ] Clique em "Create a new bucket"
- [ ] Name: `avatars`
- [ ] Privacy: **Public**
- [ ] Clique em "Create bucket"

### Bucket 2: thumbnails
- [ ] Clique em "Create a new bucket"
- [ ] Name: `thumbnails`
- [ ] Privacy: **Public**
- [ ] Clique em "Create bucket"

### Bucket 3: videos
- [ ] Clique em "Create a new bucket"
- [ ] Name: `videos`
- [ ] Privacy: **Private**
- [ ] Clique em "Create bucket"

✅ 3 buckets criados!

---

## 🔐 PASSO 4: Copiar Credenciais

No Supabase:

- [ ] Vá para **Settings > API**
- [ ] Copie a URL em "Project URL" (exemplo: https://xyzabc.supabase.co)
- [ ] Copie a chave em "anon public"

---

## 📝 PASSO 5: Configurar .env.local

1. Abra o arquivo **.env.local** na raiz do projeto
2. Preencha:

```
VITE_SUPABASE_URL=COLE_A_URL_AQUI
VITE_SUPABASE_ANON_KEY=COLE_A_CHAVE_AQUI
```

Exemplo pronto:
```
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- [ ] Salve o arquivo

---

## 🔄 PASSO 6: Reiniciar Servidor

No terminal:

```bash
# Parar o servidor (Ctrl+C se estiver rodando)
# Depois:
npm run dev
```

- [ ] Servidor iniciou com sucesso

---

## 🧪 PASSO 7: Testar Aplicação

1. Abra http://localhost:5173 no navegador
2. Deve redirecionar para login
3. Clique em **"Criar conta"**
4. Preencha:
   - Email: teste@example.com
   - Senha: senha123
   - Nome: João Silva
5. Clique em **"Criar conta"**

- [ ] Conta criada com sucesso
- [ ] Redirecionou para home
- [ ] Vê filmes listados

✅ **PRONTO! Aplicação 100% funcional!**

---

## 🎯 Teste as Funcionalidades

- [ ] Vê a lista de filmes na home
- [ ] Clica em um filme e vê detalhes
- [ ] Favorita um filme
- [ ] Adiciona filme à fila "Assistir Depois"
- [ ] Avalia um filme (1-5 estrelas)
- [ ] Acessa "Meu Perfil"
- [ ] Acessa "Configurações"
- [ ] Clica em "Fazer Logout"
- [ ] Faz login novamente

✅ **Tudo funcionando!**

---

## 🆘 Se Algo Não Funcionar

### Erro: "Connection refused"
```
❌ Solução: Verifique URL e chave no .env.local
✅ Reinicie o servidor (npm run dev)
```

### Erro: "Cannot find module"
```
❌ Solução: Faltam dependências
✅ Execute: npm install
```

### Erro: "401 Unauthorized"
```
❌ Solução: Credenciais inválidas
✅ Copie novamente URL e chave do Supabase
```

### Erro ao criar conta
```
❌ Solução: Email já existe
✅ Use outro email para teste
```

### Erro na página
```
❌ Solução: Limpe cache
✅ F12 > Application > Clear all (ou Ctrl+Shift+Delete)
✅ Atualize a página (F5)
```

---

## 📊 Verificar Dados no Supabase

Depois de testar, você pode ver os dados criados:

1. Vá para Supabase
2. Clique em **Database**
3. Clique em **Tables**
4. Abra cada tabela para ver os dados:
   - **profiles** - Usuários criados
   - **movies** - Filmes de exemplo
   - **favorites** - Favoritos que você adicionou
   - **watch_later** - Filmes na fila
   - **ratings** - Avaliações que deu

---

## 🎉 Sucesso!

Se completou este checklist, você tem:

✅ Projeto Supabase criado  
✅ Banco de dados configurado  
✅ Storage buckets prontos  
✅ Autenticação funcionando  
✅ Aplicação 100% funcional  
✅ Dados sendo salvos  

---

## 📚 Documentação Extra

Para entender melhor:

- **DATABASE_SETUP.sql** - Script SQL completo
- **DATABASE_STRUCTURE.md** - Explicação das tabelas
- **SUPABASE_SETUP_GUIA.md** - Guia detalhado

---

## 🚀 Próximas Ações

1. **Adicione filmes reais**: Via aplicação ou Supabase
2. **Customize design**: Edite cores, fonts em tailwind.config.ts
3. **Adicione mais funcionalidades**: Comentários, avaliações detalhadas, etc
4. **Deploy**: Use Vercel, Netlify, ou seu host favorito

---

**Pronto para colocar em produção!** 🎬

Dúvidas? Veja os arquivos de documentação criados.
