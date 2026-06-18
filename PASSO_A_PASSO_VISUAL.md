## 🎯 Passo a Passo Visual - Interface Supabase

Este guia mostra exatamente onde clicar no Supabase.

---

## 1️⃣ CRIAR PROJETO

### Passo 1.1
```
URL: https://supabase.com/dashboard
```
- Clique no botão verde **"New Project"**

### Passo 1.2
Preencha o formulário:
```
Organization: [selecione ou crie uma]
Project Name: mcpfmovies
Database Password: SenhaForte123! [GUARDE ESTA SENHA]
Region: South America (São Paulo) [ou próximo a você]
Pricing Plan: Free
```
- Clique em **"Create new project"**

### Passo 1.3
- Aguarde 5-10 minutos
- Você verá uma barra de progresso azul
- Quando terminar, você verá um painel

✅ Projeto criado!

---

## 2️⃣ EXECUTAR SCRIPT SQL

### Passo 2.1
No painel do seu projeto:
```
Menu esquerdo > SQL Editor (ou Builder > SQL Editor)
```

### Passo 2.2
```
Clique no botão "+" (New Query)
```

### Passo 2.3
Você verá um editor em branco. Faça:
```
1. Abra o arquivo "DATABASE_SETUP.sql" do seu computador
2. Copie TODO o conteúdo (Ctrl+A depois Ctrl+C)
3. Cole no editor do Supabase (Ctrl+V)
```

### Passo 2.4
- Clique no botão azul **"Run"** (canto inferior direito)
- OU aperte **Ctrl+Enter**

### Passo 2.5
Aguarde completar. Você verá:
- ✅ Mensagens verdes = OK
- ⚠️ Mensagens amarelas = Avisos (pode ignorar)
- ❌ Mensagens vermelhas = Erros

Se receber erros como:
```
"already exists" ou "constraint already exists"
```
✅ Isso é NORMAL, ignore!

---

## 3️⃣ CRIAR STORAGE BUCKETS

### Passo 3.1
No painel:
```
Menu esquerdo > Storage (ou Builder > Storage)
```

### Passo 3.2: Criar Bucket "avatars"
```
Clique em "Create a new bucket"
```

Preencha:
```
Name: avatars
Privacy: Public (deixar a opção marcada)
```

Clique em **"Create bucket"** (botão azul)

### Passo 3.3: Criar Bucket "thumbnails"
Repita o processo:
```
Clique em "Create a new bucket"
Name: thumbnails
Privacy: Public
Clique em "Create bucket"
```

### Passo 3.4: Criar Bucket "videos"
Repita o processo:
```
Clique em "Create a new bucket"
Name: videos
Privacy: Private
Clique em "Create bucket"
```

✅ 3 buckets criados!

---

## 4️⃣ OBTER CREDENCIAIS

### Passo 4.1
No painel:
```
Menu esquerdo > Settings (ícone de engrenagem no final do menu)
```

### Passo 4.2
```
Clique na aba "API" (no topo)
```

### Passo 4.3
Você verá dois campos:

**Campo 1: Project URL**
```
Exemplo: https://xyzabc.supabase.co
Clique no botão "Copy" ao lado
Cole em algum lugar para guardar
```

**Campo 2: Project API keys**
```
Encontre "anon public"
Seu valor começa com: eyJhbGciOiJI...
Clique no botão "Copy" ao lado
Cole em algum lugar para guardar
```

✅ Credenciais copiadas!

---

## 5️⃣ CONFIGURAR .env.local

### Passo 5.1
No seu computador, abra o arquivo:
```
.env.local
(está na raiz do projeto)
```

### Passo 5.2
Você verá:
```
VITE_SUPABASE_URL=seu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anon_key_aqui
```

### Passo 5.3
Substitua pelos valores que copiou:

**ANTES:**
```
VITE_SUPABASE_URL=seu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anon_key_aqui
```

**DEPOIS (exemplo):**
```
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inx4eXphYmMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQ1Njc4OCwiZXhwIjoxODgxMjIyNzg4fQ.abc123def456ghi789
```

### Passo 5.4
Salve o arquivo: **Ctrl+S**

✅ Configurado!

---

## 6️⃣ REINICIAR SERVIDOR

### Passo 6.1
No terminal do VS Code:

Se o servidor está rodando (você vê "Local: http://localhost:5173"):
```
Aperte Ctrl+C para parar
```

### Passo 6.2
Execute novamente:
```
npm run dev
```

Você deve ver:
```
VITE v7.3.2  ready in XXX ms

➜  Local:   http://localhost:5173/
```

✅ Servidor reiniciado!

---

## 7️⃣ TESTAR APLICAÇÃO

### Passo 7.1
Abra no navegador:
```
http://localhost:5173
```

Você deve ver a página de **LOGIN**

### Passo 7.2
Clique em **"Criar conta"** (parte inferior)

### Passo 7.3
Preencha:
```
Nome Completo: João Silva
E-mail: joao@example.com (ou seu email)
Senha: Senha123!
```

### Passo 7.4
Clique em **"Criar conta"** (botão azul)

### Passo 7.5
Aguarde 2-3 segundos...

Se tudo funcionou:
✅ Você verá a página principal com filmes!

---

## 8️⃣ VERIFICAR DADOS NO SUPABASE

### Passo 8.1
Volte para o Supabase em outra aba

### Passo 8.2
Acesse:
```
Menu esquerdo > Database (ou Builder > Database)
Clique em "Tables"
```

### Passo 8.3
Você verá as tabelas criadas:
- profiles
- movies
- favorites
- watch_later
- ratings
- watch_history

### Passo 8.4
Clique em **"profiles"**

Você verá seus dados:
```
id: [UUID]
full_name: João Silva
email: joao@example.com
role: student
theme: system
```

✅ Dados no banco de dados!

### Passo 8.5
Clique em **"movies"**

Você verá 5 filmes de exemplo prontos:
```
1. Documentário Natureza
2. Animação Aventura
3. Drama Escolar
4. Comédia Familiar
5. Ficção Científica
```

✅ Tudo funcionando!

---

## 9️⃣ TESTAR FUNCIONALIDADES

De volta na aplicação (http://localhost:5173):

- [ ] Página HOME - Ver lista de filmes
- [ ] Clicar em um filme - Ver detalhes
- [ ] Botão ❤️ - Favoritar filme
- [ ] Botão 📅 - Adicionar à fila "Assistir Depois"
- [ ] Botão ⭐ - Avaliar filme (1-5 estrelas)
- [ ] Menu lateral - Clique em "Favoritos"
- [ ] Clique em "Assistir Mais Tarde"
- [ ] Clique em "Premiados"
- [ ] Clique em "Meu Perfil"
- [ ] Clique em "Configurações"
- [ ] Clique em "Fazer Login" (logout)
- [ ] Faça login novamente

✅ Todas as funcionalidades trabalhando!

---

## 🎯 Checklist Final

- [ ] Projeto Supabase criado
- [ ] Script SQL executado com sucesso
- [ ] 3 buckets criados (avatars, thumbnails, videos)
- [ ] Credenciais copiadas
- [ ] .env.local preenchido
- [ ] Servidor reiniciado
- [ ] Conta criada com sucesso
- [ ] Filmes aparecem na home
- [ ] Todas as funcionalidades testadas
- [ ] Dados aparecem no Supabase

✅ **100% PRONTO!**

---

## 🚨 SE ALGO DER ERRO

### Erro ao executar SQL
```
❌ Verifique se copiou TODO o arquivo
✅ Deleta o texto do editor e copia novamente
```

### Erro ao fazer login
```
❌ Verifique se as credenciais estão corretas no .env.local
✅ Copia novamente URL e chave do Supabase
```

### Não vê os filmes
```
❌ Verifique se a tabela "movies" tem dados
✅ No Supabase, clique em "movies" na tabela
✅ Se estiver vazia, execute o SQL novamente
```

### Erro "Cannot find module"
```
❌ Faltam dependências
✅ Execute: npm install
```

---

**Qualquer dúvida, veja os outros arquivos de documentação!** 📚

Boa sorte! 🚀
