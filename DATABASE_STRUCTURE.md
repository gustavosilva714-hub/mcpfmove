## 📊 Estrutura do Banco de Dados - MCPFMovies

Este documento explica a estrutura completa do banco de dados criado.

---

## 🗂️ Tabelas

### 1. **profiles** - Perfis dos Usuários
Armazena informações dos usuários autenticados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID do usuário (referencia auth.users) |
| full_name | TEXT | Nome completo do usuário |
| avatar_url | TEXT | URL do avatar no bucket 'avatars' |
| class_series | TEXT | Série/Turma do usuário |
| role | TEXT | Perfil: 'student', 'teacher', 'admin' |
| theme | TEXT | Tema: 'light', 'dark', 'system' |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

**Índices**: Nenhum (PK suficiente)

---

### 2. **movies** - Filmes
Armazena informações de todos os filmes da plataforma.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do filme |
| title | TEXT | Título do filme |
| description | TEXT | Descrição/Sinopse |
| thumbnail_url | TEXT | URL da thumbnail no bucket 'thumbnails' |
| video_url | TEXT | URL do vídeo no bucket 'videos' |
| genre | TEXT | Gênero (Documentário, Animação, etc) |
| duration | INTEGER | Duração em minutos |
| class_series | TEXT | Série recomendada |
| year | INTEGER | Ano de produção |
| is_award_winner | BOOLEAN | Se é premiado |
| award_category | TEXT | Categoria do prêmio |
| created_at | TIMESTAMP | Data de criação |
| created_by | UUID | ID do usuário que criou |

**Índices**:
- genre
- class_series
- is_award_winner

---

### 3. **favorites** - Favoritos
Relação N-para-N entre usuários e filmes favoritos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| user_id | UUID | ID do usuário |
| movie_id | UUID | ID do filme |
| created_at | TIMESTAMP | Data em que foi favoritado |

**Constraints**:
- UNIQUE(user_id, movie_id) - Não permite duplicatas

**Índices**:
- user_id
- movie_id

---

### 4. **watch_later** - Assistir Depois
Relação N-para-N para filmes a assistir depois.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| user_id | UUID | ID do usuário |
| movie_id | UUID | ID do filme |
| created_at | TIMESTAMP | Data em que foi adicionado |

**Constraints**:
- UNIQUE(user_id, movie_id) - Não permite duplicatas

**Índices**:
- user_id
- movie_id

---

### 5. **ratings** - Avaliações
Avaliações que usuários fazem dos filmes (1-5 estrelas).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| user_id | UUID | ID do usuário |
| movie_id | UUID | ID do filme |
| rating | INTEGER | Nota de 1 a 5 |
| created_at | TIMESTAMP | Data da avaliação |
| updated_at | TIMESTAMP | Data da última atualização |

**Constraints**:
- rating >= 1 AND rating <= 5
- UNIQUE(user_id, movie_id) - Um usuário pode avaliar um filme apenas uma vez

**Índices**:
- user_id
- movie_id

---

### 6. **watch_history** - Histórico de Visualização
Rastreia o progresso de visualização de cada filme por usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| user_id | UUID | ID do usuário |
| movie_id | UUID | ID do filme |
| progress | INTEGER | Progresso em % (0-100) |
| watched_at | TIMESTAMP | Último acesso |

**Constraints**:
- progress >= 0 AND progress <= 100

**Índices**:
- user_id
- movie_id

---

## 🔐 Row Level Security (RLS)

RLS está ativado em TODAS as tabelas. Isso significa que os usuários só podem ver/modificar seus próprios dados.

### Políticas por Tabela:

#### **profiles**
- Usuários podem ver seu próprio perfil
- Usuários podem atualizar seu próprio perfil
- Qualquer um pode ver perfis públicos

#### **movies**
- Qualquer um pode ver filmes
- Apenas teachers e admins podem criar filmes
- Apenas o criador pode atualizar seu filme
- Apenas admins podem deletar filmes

#### **favorites, watch_later, watch_history**
- Usuários veem apenas seus próprios registros
- Usuários podem inserir apenas seus próprios registros
- Usuários podem deletar apenas seus próprios registros

#### **ratings**
- Qualquer um pode ver avaliações
- Usuários podem avaliar (1 avaliação por filme)
- Usuários podem atualizar sua própria avaliação
- Usuários podem deletar sua própria avaliação

---

## 🪣 Storage Buckets

3 buckets foram criados para armazenar arquivos:

### 1. **avatars** (Public)
Armazena imagens de perfil dos usuários.
- Caminho sugerido: `/avatars/{user_id}.jpg`

### 2. **thumbnails** (Public)
Armazena capas/thumbnails dos filmes.
- Caminho sugerido: `/thumbnails/{movie_id}.jpg`

### 3. **videos** (Private)
Armazena os vídeos dos filmes.
- Caminho sugerido: `/videos/{movie_id}.mp4`
- Privado = mais controle sobre acesso

---

## 🔗 Relacionamentos

```
auth.users (1) ──── (N) profiles
                     │
                     └──> (N) favorites ──── (N) movies
                     │
                     └──> (N) watch_later ── (N) movies
                     │
                     └──> (N) ratings ────── (N) movies
                     │
                     └──> (N) watch_history ─ (N) movies

movies (1) ──── (N) favorites
movies (1) ──── (N) watch_later
movies (1) ──── (N) ratings
movies (1) ──── (N) watch_history
```

---

## 📊 Consultas SQL Úteis

### Filmes mais avaliados
```sql
SELECT 
  m.title, 
  AVG(r.rating) as avg_rating,
  COUNT(r.id) as total_ratings
FROM movies m
LEFT JOIN ratings r ON m.id = r.movie_id
GROUP BY m.id
ORDER BY avg_rating DESC;
```

### Filmes favoritos de um usuário
```sql
SELECT m.*
FROM movies m
WHERE m.id IN (
  SELECT movie_id FROM favorites 
  WHERE user_id = 'USER_ID_HERE'
);
```

### Histórico de um usuário
```sql
SELECT m.title, w.progress, w.watched_at
FROM watch_history w
JOIN movies m ON w.movie_id = m.id
WHERE w.user_id = 'USER_ID_HERE'
ORDER BY w.watched_at DESC;
```

### Filmes por série
```sql
SELECT * FROM movies
WHERE class_series = '5º Ano'
ORDER BY created_at DESC;
```

---

## ⚙️ Triggers e Functions

### 1. **handle_new_user()**
Função que cria um perfil automaticamente quando um novo usuário se registra.

### 2. **on_auth_user_created**
Trigger que executa `handle_new_user()` quando um novo usuário é criado.

### 3. **update_profiles_updated_at()**
Função que atualiza o timestamp `updated_at` toda vez que um perfil é modificado.

### 4. **update_profiles_updated_at** (trigger)
Trigger que executa a função acima.

---

## 🚀 Performance

Índices foram criados nas colunas mais consultadas:
- Filtros por usuário (user_id)
- Filtros por filme (movie_id)
- Filtros por gênero, série, premiados

**Resultado**: Queries rápidas e eficientes mesmo com muitos dados.

---

## 🔄 Dados de Exemplo

O script insere automaticamente 5 filmes de exemplo:
1. Documentário Natureza (5º Ano)
2. Animação Aventura (6º Ano)
3. Drama Escolar (8º Ano)
4. Comédia Familiar (5º Ano)
5. Ficção Científica (1º Médio)

Você pode adicionar mais via interface do Supabase ou pela aplicação.

---

## 📝 Notas Importantes

- ✅ Todas as datas usam timezone UTC
- ✅ UUIDs são gerados automaticamente pelo banco de dados
- ✅ Foreign keys com ON DELETE CASCADE para limpeza automática
- ✅ Constraints validam dados no nível do banco de dados
- ✅ RLS garante segurança dos dados

---

## 🆘 Troubleshooting

### Por que não consigo inserir dados?
- Verifique se está autenticado
- Verifique suas RLS policies
- Verifique se sua role permite a ação

### Por que a consulta é lenta?
- Verifique se há índice na coluna
- Use EXPLAIN ANALYZE para ver o plano de execução

### Como resetar tudo?
- Vá para Supabase > Settings > Danger Zone > Delete Database
- Execute o script SQL novamente

---

Estrutura pronta para produção! 🚀
