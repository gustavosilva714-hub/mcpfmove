## 🎬 MCPFMovies - Início Rápido Supabase

Guia super rápido em 5 minutos! ⚡

---

## 1️⃣ Criar Projeto (2 min)

```
1. Acesse https://supabase.com/dashboard
2. Clique "New Project"
3. Preencha:
   - Project Name: mcpfmovies
   - Password: SenhaForte123! (guarde!)
   - Region: Brazil (ou próximo)
   - Plan: Free
4. Aguarde 5-10 min
```

---

## 2️⃣ Banco de Dados (1 min)

```
1. Vá para: SQL Editor
2. Clique: + (New Query)
3. Copie tudo de: DATABASE_SETUP.sql
4. Cole no editor
5. Clique: Run (ou Ctrl+Enter)
6. Aguarde sucesso (verde)
```

---

## 3️⃣ Storage Buckets (1 min)

```
Vá para: Storage

Crie 3 buckets:
✅ avatars (Public)
✅ thumbnails (Public)
✅ videos (Private)

Para cada:
- Clique "Create a new bucket"
- Digite o name
- Selecione privacy
- Clique "Create bucket"
```

---

## 4️⃣ Credenciais (1 min)

```
1. Vá para: Settings > API
2. Copie: Project URL
   Exemplo: https://xyzabc.supabase.co

3. Copie: anon public (chave)
   Exemplo: eyJhbGciOiJIUzI1NiI...
```

---

## 5️⃣ Configurar Projeto (1 min)

```
1. Abra: .env.local (raiz do projeto)
2. Substitua:
   VITE_SUPABASE_URL=[URL que copiou]
   VITE_SUPABASE_ANON_KEY=[chave que copiou]
3. Salve: Ctrl+S
4. Terminal: npm run dev
```

---

## ✅ Testar (1 min)

```
1. Abra: http://localhost:5173
2. Clique: "Criar conta"
3. Preencha dados
4. Veja: Filmes aparecem!
```

---

## 🎉 PRONTO!

Sua aplicação está 100% funcional com Supabase!

---

## 📚 Documentação Completa

Se precisa de mais detalhes, veja:
- **QUICK_CHECKLIST.md** - Checklist completo
- **SUPABASE_SETUP_GUIA.md** - Guia detalhado
- **PASSO_A_PASSO_VISUAL.md** - Onde clicar
- **DATABASE_STRUCTURE.md** - Estrutura técnica

---

**Dúvidas rápidas?**

❌ Erro "Connection refused"
✅ Verifique URL e chave no .env.local

❌ Erro "Cannot find movies"
✅ Execute novamente o SQL

❌ Erro ao fazer login
✅ Verifique credenciais

---

🚀 **Boa sorte!**
