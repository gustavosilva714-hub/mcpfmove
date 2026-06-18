# ⚡ QUICK START - MCPFMovies com Cadastro de Vídeos por URL

## 🎯 Objetivo
Plataforma para **ADMIN cadastrar filmes com nome, capa e URL do vídeo** → Salva no **Supabase** → Usuários veem na **HomePage** → Clicam e **reproduzem o vídeo** com player completo.

---

## 🚀 3 PASSOS RÁPIDOS

### 1️⃣ CONFIRME: Você é ADMIN?
```
Login como: seu email (com role = 'teacher' ou 'admin')
```

**Se não for admin, atualize no Supabase:**
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'seu-user-id';
```

---

### 2️⃣ ACESSE: Página de Admin
```
http://localhost:5178/admin
```

Verá formulário com campos:
- ✅ **Título** (obrigatório)
- ✅ **Gênero** (select)
- ✅ **Turma Alvo** (select)
- ✅ **Duração** (minutos)
- ✅ **Ano** (2024)
- ✅ **Capa** (upload JPG/PNG)
- ✅ **URL DO VÍDEO** ⭐ (obrigatório)
- ✅ **Descrição** (opcional)
- ✅ **É Premiado?** (checkbox)

---

### 3️⃣ CADASTRE um filme:
```
Título:     "Aula sobre Programação"
Gênero:     "Educacional"  (ou outro)
Turma:      "5º Ano"
Duração:    45
Capa:       [Escolha imagem JPG/PNG]
URL Vídeo:  https://www.w3schools.com/html/mov_bbb.mp4
            (OU seu próprio URL em .mp4)
```

**Clique:** "Criar Filme" ➜ **Sucesso!** ✅

---

## ✨ O que acontece:

1. **Admin clica "Criar Filme"**
   - Capa é enviada para Supabase Storage ☁️
   - URL do vídeo é salva no banco de dados 💾

2. **Filme aparece em "Gerenciar Filmes"** (seção admin)
   - Mostra lista de todos os filmes
   - Pode deletar com ❌

3. **Usuário acessa a HomePage** (`http://localhost:5178`)
   - Filme novo aparece automaticamente 🎬
   - Agrupado por turma (5º Ano, 6º Ano, etc)

4. **Usuário clica no filme**
   - Abre **VideoPlayer completo** 🎥
   - Mostra a capa como thumbnail
   - Clica ▶️ e **vídeo toca!**

5. **Player com controles:**
   - ▶️ Play/Pause
   - 🔊 Volume
   - ⏩ Pular 10s
   - 📺 Fullscreen
   - ⭐ Avaliar com estrelas

---

## 📌 IMPORTANTE

### URLs de teste (se não tiver próprio):
```
Opção 1 (Recomendado):
https://www.w3schools.com/html/mov_bbb.mp4

Opção 2:
https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4

Opção 3 (Seu próprio servidor):
https://seu-servidor.com/videos/filme.mp4
```

### Segurança:
- ✅ Apenas **admin** pode cadastrar
- ✅ Apenas **admin** pode deletar
- ✅ **Qualquer um** pode assistir
- ✅ URL pode ser **qualquer servidor** (não precisa ser Supabase)

---

## 🎬 EXEMPLO DE USO REAL

**Video URL da Internet:**
```
https://media.w3org.org/media/video/video-intro.mp4
```

**Vídeo do seu servidor:**
```
https://seu-dominio.com/videos/aula-2024.mp4
```

**Vídeo de CDN (YouTube, Vimeo):**
```
Atualmente suporta URLs diretas em .mp4
Para YouTube, use conversores para pegar URL .mp4
```

---

## ✅ CHECKLIST

- [ ] Servidor rodando: `npm run dev` (porta 5178)
- [ ] Login como **admin**
- [ ] Acesso a `/admin`
- [ ] Preenchi **Título** (obrigatório)
- [ ] Preenchi **Gênero** (obrigatório)
- [ ] Preenchi **Turma** (obrigatório)
- [ ] Escolhi **Capa** (obrigatório) JPG/PNG
- [ ] Inseri **URL do Vídeo** (obrigatório) .mp4
- [ ] Cliquei **"Criar Filme"** ✅
- [ ] Apareceu no "Gerenciar Filmes"
- [ ] Voltei para **"Início"**
- [ ] Filme aparece na HomePage
- [ ] Cliquei no filme
- [ ] Abrui VideoPlayer
- [ ] ▶️ Vídeo toca!

---

## 🆘 SE NÃO FUNCIONAR

### Erro: "Acesso Negado"
→ Você não é admin. Atualize no Supabase:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'seu@email.com';
```

### Erro: "Capa obrigatória"
→ Selecione imagem JPG ou PNG (menos de 10MB)

### Erro: "URL do vídeo obrigatória"
→ Insira URL completa: `https://...../video.mp4`

### Vídeo não toca
→ Verifique:
1. URL está acessível (abra em aba nova)
2. Formato é .mp4 ou .webm
3. Verifique console do browser (F12)

### Filme não aparece em HomePage
→ Recarregue a página (F5)

---

## 🎯 ESTRUTURA

```
Frontend                  Supabase
├─ AdminPage             ├─ movies table
│  ├─ Formulário         │  ├─ id
│  ├─ Upload capa        │  ├─ title
│  └─ Input URL vídeo    │  ├─ thumbnail_url (Storage)
│                         │  └─ video_url ⭐ (URL DIRETA)
├─ HomePage              │
│  └─ Lista filmes       ├─ Storage (thumbnails)
│                         └─ Storage (avatars)
└─ VideoPlayer
   └─ Toca vídeo.url
```

---

## 🔄 ZERO LOCALHOST

✅ **Sem localStorage**
✅ **Sem dados pré-carregados**
✅ **Tema sempre escuro**
✅ **Tudo no Supabase**

---

## 🎬 Pronto! Teste agora!

```
1. npm run dev
2. http://localhost:5178/admin
3. Cadastre um filme
4. http://localhost:5178
5. Clique no filme
6. ▶️ Aproveite!
```

**Sucesso!** 🚀
