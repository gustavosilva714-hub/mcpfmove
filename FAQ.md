## ❓ FAQ - Perguntas Frequentes

Respostas rápidas para as dúvidas mais comuns.

---

## 🟦 Supabase

### P: Preciso pagar pelo Supabase?
**R:** Não! O plano Free é gratuito e adequado para desenvolvimento/pequenos projetos.

### P: Quanto tempo leva para criar um projeto?
**R:** 5-10 minutos. Você verá uma barra de progresso azul durante este tempo.

### P: Posso usar em produção?
**R:** Sim! Recomenda-se ir para plano pago se tiver muitos usuários (Supabase oferece créditos iniciais).

### P: Preciso de backup?
**R:** Sim! Supabase faz backups automáticos. Configure em Settings > Database.

### P: Posso restaurar dados?
**R:** Sim! Supabase oferece opção de restauração. Veja em Settings > Backups.

---

## 🗄️ Banco de Dados

### P: Quantos filmes posso adicionar?
**R:** Ilimitado no plano Free! Supabase oferece 500MB de storage.

### P: Os dados são realmente privados?
**R:** Sim! Row Level Security garante que cada usuário veja apenas seus dados.

### P: Posso fazer consultas SQL diretos?
**R:** Sim! Use o SQL Editor do Supabase > Query > Query Editor.

### P: Como deletar dados acidentalmente adicionados?
**R:** Via Supabase:
1. Database > Tables > [tabela]
2. Clique na linha
3. Clique no menu (⋯) > Delete row

### P: Quanto tempo as queries levam?
**R:** Milissegundos! Os índices garantem performance.

---

## 🔐 Segurança

### P: O .env.local é seguro?
**R:** Sim! Está no .gitignore, não será enviado para GitHub.

### P: Qualquer um pode acessar com a chave anon?
**R:** Row Level Security protege! Cada usuário vê apenas seus dados.

### P: Posso resetar as credenciais?
**R:** Sim! Supabase > Settings > API > Regenerate key.

### P: Preciso de HTTPS?
**R:** Supabase usa HTTPS automaticamente.

---

## 🪣 Storage

### P: Qual o tamanho máximo de arquivo?
**R:** Supabase Free = 1GB total de storage.

### P: Como faço upload de um vídeo?
**R:** Via aplicação:
1. Editar filme
2. Selecionar arquivo de vídeo
3. Fazer upload automático para bucket 'videos'

### P: Posso usar URLs externas?
**R:** Sim! Se o vídeo estiver em outro lugar, cole a URL.

### P: Como deletar um arquivo do storage?
**R:** Via Supabase > Storage > [bucket] > arquivo > Delete

---

## 🧑 Usuários e Autenticação

### P: Como criar múltiplas contas?
**R:** Clique em "Criar conta" na aplicação para cada usuário.

### P: Posso alterar o email de um usuário?
**R:** Sim! Na sua conta > Configurações > Dados Pessoais.

### P: Posso fazer reset de senha?
**R:** Sim! Clique em "Esqueceu a senha?" na tela de login.

### P: Como aumentar o role de student para teacher?
**R:** Via Supabase:
1. Database > Tables > profiles
2. Clique no usuário
3. Altere `role` para `teacher` ou `admin`

### P: Posso autenticar via Google/Facebook?
**R:** Sim! Supabase suporta. Vá para Settings > Authentication > Providers.

---

## 🎬 Filmes

### P: Como adicionar um novo filme?
**R:** Duas formas:
1. **Via App**: Se for teacher, vá para Settings > Adicionar Filme
2. **Via Supabase**: Database > Tables > movies > Insert

### P: Qual é o formato recomendado para vídeo?
**R:** MP4 (H.264) - mais compatível com navegadores.

### P: Qual resolução recomenda para thumbnails?
**R:** 1280×720px ou 16:9 aspect ratio.

### P: Posso autoincrementar filmes?
**R:** Sim! Veja DATABASE_STRUCTURE.md > Consultas SQL.

---

## 🌐 Aplicação

### P: Por que o servidor é local?
**R:** npm run dev roda em localhost:5173 por padrão.

### P: Posso acessar de outro computador?
**R:** Sim! Use o IP da máquina:
```
npm run dev -- --host
```
Depois acesse: http://[seu-ip]:5173

### P: Qual navegador usar?
**R:** Qualquer um moderno (Chrome, Firefox, Safari, Edge).

### P: Funciona no celular?
**R:** Sim! Acesse pelo navegador do celular (responsivo).

### P: Posso fazer PWA (app instalável)?
**R:** Sim! Adicione manifest.json e service worker.

---

## 🚀 Deploy

### P: Como colocar em produção?
**R:** Vários serviços suportam:
```
Vercel:  vercel --prod
Netlify: netlify deploy --prod
Heroku:  git push heroku main
```

### P: Qual é mais fácil?
**R:** Vercel é mais simples para React/Vite.

### P: Preciso de certificado SSL?
**R:** Não! Vercel/Netlify automaticamente oferecem HTTPS.

### P: Quanto custa deploy?
**R:** Vercel e Netlify têm plano free adequado.

---

## ⚡ Performance

### P: Por que está lento?
**R:** Verifique:
1. Conexão de internet
2. Supabase > Monitoring > Network
3. Servidor local (npm run dev)

### P: Posso cache os dados?
**R:** Sim! Use React Query ou SWR.

### P: Posso comprimir os vídeos?
**R:** Sim! Use FFmpeg antes de upload.

---

## 🐛 Erros Comuns

### P: "Cannot find module '@supabase/supabase-js'"
**R:** Rode: `npm install`

### P: "useToast must be used within ToastProvider"
**R:** Verifique se ToastProvider está em App.tsx. Já foi corrigido!

### P: "Connection refused"
**R:** Verifique .env.local com URL e chave corretas.

### P: "CORS error"
**R:** Supabase > Settings > API > CORS > Adicione seu domínio.

### P: "Row not found"
**R:** Verifique se o ID existe no banco de dados.

---

## 💾 Backup e Restauração

### P: Como fazer backup?
**R:** Supabase faz automaticamente! Veja em Settings > Backups.

### P: Como restaurar?
**R:** Settings > Backups > Clique em restore point.

### P: Posso exportar todos os dados?
**R:** Sim! Use SQL export no SQL Editor.

---

## 📞 Suporte Supabase

### P: Onde encontro ajuda?
**R:** 
- Docs: supabase.com/docs
- Discord: discord.supabase.io
- Email: support@supabase.io

### P: Preciso reportar um bug?
**R:** GitHub: github.com/supabase/supabase/issues

---

## 💡 Dicas Úteis

### Tip 1: Use Query Inspector
```
Supabase > SQL Editor > Query > Debugger
Para ver exatamente o que está acontecendo
```

### Tip 2: Monitore em tempo real
```
Supabase > Monitoring
Para ver requisições, erros, performance
```

### Tip 3: Use Realtime
```
Dados atualizam em tempo real em múltiplos clientes
Já configurado!
```

### Tip 4: Defina RLS policies
```
Row Level Security já está tudo configurado!
Você só precisa confiar.
```

### Tip 5: Optimize indexes
```
Se queries ficam lentas, adicione índices.
Veja DATABASE_STRUCTURE.md
```

---

## 📚 Recursos Extras

### Documentação
- Supabase: https://supabase.com/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs

### Ferramentas
- Postman: Para testar APIs
- DBeaver: Para gerenciar BD
- VS Code: Editor recomendado

### Community
- Discord Supabase
- Stack Overflow
- GitHub Discussions

---

## 🎓 Aprendizado

### Como aprender mais sobre Supabase?
1. Leia DATABASE_STRUCTURE.md
2. Pratique no SQL Editor
3. Veja os dados em Monitoring
4. Experimente com diferentes queries

### Como aprender React?
1. Leia src/components
2. Veja hooks em src/hooks
3. Estude React Router em src/App.tsx
4. Practice editando componentes

---

## ✅ Checklist de Troubleshooting

Antes de abrir issue, verifique:

- [ ] Copiou TODA a SQL (não deixou nada)
- [ ] Credenciais estão corretas em .env.local
- [ ] Reiniciou o servidor após alterar .env.local
- [ ] Buckets foram criados
- [ ] Database foi executado sem erros críticos
- [ ] Limpou cache do navegador (Ctrl+Shift+Delete)
- [ ] F12 > Console para ver erros específicos

Se ainda tiver problema:
1. Verifique os guias de documentação
2. Veja logs em Supabase > Monitoring
3. Teste SQL diretamente no SQL Editor

---

## 🎉 Conseguiu?

Se conseguiu completar tudo:
- ✅ Deixa uma ⭐ no GitHub!
- ✅ Compartilha com amigos!
- ✅ Me marca se usar em algo legal!

---

**Última atualização**: 2026-06-17  
**Versão**: 1.0

Dúvida não listada? Veja os outros documentos! 📚
