# 🎬 Guia Definitivo de URLs de Vídeos para MCPFMovies

## ✅ URLs QUE FUNCIONAM

### YouTube - RECOMENDADO ⭐
Todas essas variações funcionam:
- `https://www.youtube.com/watch?v=aqz-KE-bpKQ`
- `https://youtu.be/aqz-KE-bpKQ`
- `https://www.youtube.com/embed/aqz-KE-bpKQ`
- `https://www.youtube.com/v/aqz-KE-bpKQ`

**ID do vídeo**: 11 caracteres alfanuméricos (ex: `aqz-KE-bpKQ`)

---

## ❌ URLs QUE NÃO FUNCIONAM

### Google Drive ❌
```
https://drive.google.com/file/d/1_test_id_google_drive/view
```
**Motivo**: Google não permite reprodução direta por CORS

---

### MP4 Hospedado em Servidor Externo ❌
```
https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4
```
**Motivo**: Servidor não permite CORS (bloqueado pelo navegador)

---

## ✅ COMO ENCONTRAR ID DO YOUTUBE

### Método 1: URL em barra de endereço
```
https://www.youtube.com/watch?v=aqz-KE-bpKQ
                                    ^^^^^^^^^^^
                                    ID AQUI
```

### Método 2: Botão COMPARTILHAR do YouTube
- Clique em "Compartilhar" no YouTube
- Copie a URL curta: `https://youtu.be/aqz-KE-bpKQ`
- Use direto!

### Método 3: YouTube Shorts
Se for um Short (youtube.com/shorts/...):
- Extraia o ID de 11 caracteres
- Coloque em: `https://www.youtube.com/watch?v=<ID>`

---

## 🎯 EXEMPLO DE CADASTRO CORRETO

1. Abra YouTube e escolha um vídeo
2. Copie a URL: `https://www.youtube.com/watch?v=aqz-KE-bpKQ`
3. Cole no formulário de cadastro
4. Clique em "Criar Filme"
5. **Pronto!** Vídeo funcionará 100%

---

## 🚨 CHECKLIST ANTES DE CADASTRAR

- [ ] URL começa com `youtube.com` ou `youtu.be`?
- [ ] ID tem 11 caracteres? (ex: `aqz-KE-bpKQ`)
- [ ] Testei a URL no YouTube e vídeo abre?
- [ ] Vídeo não é privado ou restrito?

---

## 📱 URLs de Teste Que Funcionam

Copie e cole qualquer uma:

1. **Big Buck Bunny** (Recomendado - 9min)
   ```
   https://www.youtube.com/watch?v=aqz-KE-bpKQ
   ```

2. **Sintel** (Animação - 15min)
   ```
   https://www.youtube.com/watch?v=eRsGyueVLvQ
   ```

3. **Tears of Steel** (Ficção - 12min)
   ```
   https://www.youtube.com/watch?v=R6MlHxA4V4M
   ```

---

## 🐛 Se Still Receber Erro

**Erro**: "ocorreu um erro, tente novamente mais tarde"

**Causas possíveis**:
1. ID do YouTube extraído errado
2. Vídeo foi removido/privado no YouTube
3. URL não é de vídeo válido

**Solução**:
1. Teste a URL diretamente no YouTube
2. Use formato: `https://www.youtube.com/watch?v=<ID>`
3. Certifique-se que ID tem **exatamente 11 caracteres**

---

## 🔧 URLs ATUALIZADAS (v2.0)

O player agora suporta:
- ✅ Extração melhorada de ID do YouTube
- ✅ Suporte a múltiplos formatos de URL
- ✅ Proporções 16:9 automáticas
- ✅ Autoplay habilitado
- ✅ Controles de fullscreen

---

**Última atualização**: 18 de junho de 2026
**Suporte**: YouTube apenas (Google Drive e outros bloqueados por infraestrutura)
