# Segurança do Projeto

## ⚠️ CRÍTICO: Credenciais expostas no histórico Git

As credenciais do Supabase foram commitadas historicamente em `commit 3493115` e removidas em `commit 727844d`. Elas **ainda estão recuperáveis** via `git log --all`.

### Ações imediatas (pendente):

1. **Rotacionar credenciais** no painel do Supabase:
   - URL do projeto (se exposta)
   - Anon key (já exposta — trate como comprometida)

2. **Remover do histórico Git** usando BFG Repo-Cleaner:
   ```bash
   # Baixe o BFG:
   curl -L https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar -o bfg.jar
   
   # Execute (clonar repositório limpo primeiro):
   git clone --mirror <repo-url> <repo>-mirror
   cd <repo>-mirror
   java -jar ../bfg.jar --delete-files .env
   java -jar ../bfg.jar --replace-text <replacements.txt>
   
   # Force push
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   git push --force
   ```

3. **Verifique outros segredos**:
   - `npm run audit-secrets` (script opcional)
   - Revise commits anteriores para outras chaves/tokens

### Como foi corrigido no código

- ✅ Credenciais movidas para `.env.local` (via `import.meta.env`)
- ✅ `.env` no `.gitignore`
- ✅ `.env.example` com template seguro
- ✅ Validação de input em forms
- ✅ Rate limiting no login (5s cooldown)
- ✅ Mensagens de erro mascadas
- ✅ AbortController em fetches

### Política de segredos

- Nunca commite arquivos `.env*`
- Use `.env.production`, `.env.staging`, `.env.local`
- Revise PRs com `detect-secrets` ou GitGuardian
- Rotacione credenciais a cada 90 dias
