# 🚀 Guia Rápido - Sistema de Admin e Buckets

## ⚡ O Que Mudou?

### 1️⃣ **SQL Automático de Buckets**
Antes ❌ → Você tinha que criar 3 buckets manualmente  
Agora ✅ → Buckets criados automaticamente ao executar SQL

**Novos Buckets Criados:**
```
📁 avatars (5MB)      - Fotos de perfil
📁 thumbnails (10MB)  - Capas de filmes
📁 videos (5GB)       - Vídeos dos filmes
```

---

## 📋 Como Executar o SQL

### Passo 1: Abrir Supabase
1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: **SQL Editor** (lado esquerdo)

### Passo 2: Copiar o SQL
1. Abra o arquivo: `DATABASE_SETUP.sql`
2. Selecione **TODO** o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)

### Passo 3: Colar e Executar
1. Cole no SQL Editor (Ctrl+V)
2. Clique em **RUN** ou pressione **Ctrl+Enter**
3. Aguarde alguns segundos...

### Passo 4: Verificar Buckets
1. Vá em **Storage** (lado esquerdo)
2. Você verá 3 buckets novos ✨

---

## 👤 Como Cadastrar Filmes

### Pré-requisito:
Você precisa ser **TEACHER** ou **ADMIN**

### Como Mudar o Role:
1. Vá no Supabase **SQL Editor**
2. Execute:
```sql
UPDATE profiles 
SET role = 'teacher' 
WHERE id = 'seu-user-id-aqui';
```

### Passo 1: Acessar Admin
1. Faça login na aplicação
2. Vá em: **Sidebar > Administração > Cadastrar Filme**
3. Ou acesse: `http://localhost:5173/admin`

### Passo 2: Preencher Formulário
```
Informações Básicas:
├─ Título do Filme ⭐ (obrigatório)
├─ Descrição (opcional)
├─ Gênero (dropdown)
├─ Turma Alvo (dropdown)
├─ Duração em minutos
├─ Ano (auto-preenchido)
└─ Prêmio (checkbox + categoria)

Arquivos:
├─ Capa do Filme ⭐ (JPG, PNG, WebP - até 10MB)
└─ Vídeo do Filme (MP4, WebM - até 5GB)
```

### Passo 3: Fazer Upload
1. Clique no area de "Capa do Filme"
2. Selecione uma imagem OU arraste para a área
3. Repita para o vídeo
4. Clique em **"Criar Filme"**

### ✅ Pronto!
- Filme aparece na HomePage
- Capas e vídeos estão no Storage
- Todos podem ver e assistir

---

## 🔐 Permissões

### Quem Pode Fazer O Quê?

| Ação | Student | Teacher | Admin |
|------|---------|---------|-------|
| Ver filmes | ✅ | ✅ | ✅ |
| Favoritar | ✅ | ✅ | ✅ |
| Assistir depois | ✅ | ✅ | ✅ |
| Avaliar | ✅ | ✅ | ✅ |
| **Criar filme** | ❌ | ✅ | ✅ |
| **Editar filme** | ❌ | Seu | ✅ |
| **Deletar filme** | ❌ | ❌ | ✅ |

---

## 🐛 Troubleshooting

### ❌ "Erro ao carregar filmes"
**Solução:**
1. Verifique se SQL foi executado
2. Verifique credenciais do Supabase (.env.local)
3. Reinicie o servidor

### ❌ "Acesso negado ao criar filme"
**Solução:**
1. Verifique se você é teacher/admin
2. Execute SQL para mudar role:
```sql
UPDATE profiles SET role = 'teacher' WHERE id = 'seu-id';
```

### ❌ "Upload falhou"
**Solução:**
1. Arquivo é muito grande? (Máx: 10MB capa, 5GB vídeo)
2. Formato correto? (JPG/PNG/WebP para capa, MP4/WebM para vídeo)
3. Verifique permissões de bucket no Supabase

### ❌ "Não vejo link "Cadastrar Filme""
**Solução:**
1. Faça logout
2. Faça login novamente
3. Verifique role do usuário no Supabase

---

## 📱 URLs Importantes

| Item | URL |
|------|-----|
| Admin | `/admin` |
| Homepage | `/` |
| Perfil | `/profile` |
| Configurações | `/settings` |

---

## 📊 Estrutura de Tabelas

```
profiles ←──┐
  (tema)    │
            ├─→ movies ←─→ favorites
            │              watch_later
            │              ratings
            │              watch_history
            └─→ movie_uploads ←─→ storage.objects
```

---

## 🎬 Campos Suportados para Filmes

```javascript
{
  title: string,                    // "A Jornada do Conhecimento"
  description: string,              // Descrição longa
  genre: string,                    // "Documentário"
  class_series: string,             // "9º Ano"
  duration: number,                 // 45 (minutos)
  year: number,                     // 2024
  is_award_winner: boolean,         // true/false
  award_category: string,           // "Melhor Documentário"
  thumbnail_url: string,            // URL da capa
  video_url: string,                // URL do vídeo
  created_by: uuid                  // Preenchido automaticamente
}
```

---

## ⚙️ Configuração Final

✅ SQL executado  
✅ Buckets criados (avatars, thumbnails, videos)  
✅ RLS policies configuradas  
✅ AdminPage funcional  
✅ Sidebar com menu admin  
✅ Upload de arquivos funcionando  

🎉 **Sistema Pronto Para Usar!**

---

## 🆘 Suporte

Se tiver problemas:
1. Verifique `ADMIN_SYSTEM_DOCUMENTATION.md` (mais detalhado)
2. Verifique console do navegador (F12)
3. Verifique logs do Supabase (SQL Editor)
4. Verifique permissões no Storage (Supabase)

