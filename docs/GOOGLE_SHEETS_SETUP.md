# Guardar as mensagens do formulário numa planilha (grátis)

O formulário de contato do site (seção "Vamos conversar") já leva o visitante direto
para o WhatsApp da Kairus. Este guia liga esse mesmo formulário a uma planilha do
Google, gratuita, para você ter um histórico de todo mundo que preencheu o formulário
— mesmo que a pessoa feche o WhatsApp sem mandar a mensagem.

Leva uns 5 minutos, só precisa de uma conta Google.

## Passo 1 — Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha em branco.
2. Renomeie para algo como **"Kairus — Contatos do site"**.
3. Na primeira linha, crie os cabeçalhos (opcional, mas ajuda a visualizar):
   `Data | Nome | WhatsApp | Mensagem`

## Passo 2 — Criar o script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague todo o código de exemplo que aparecer e cole este:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nome || '',
    data.whatsapp || '',
    data.mensagem || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Clique no ícone de salvar (disquete) e dê um nome ao projeto, por exemplo
   **"Kairus Contact Form"**.

## Passo 3 — Publicar como Web App

1. No canto superior direito, clique em **Implantar → Nova implantação**.
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" e escolha **App da Web**.
3. Configure:
   - **Executar como:** Eu (seu e-mail)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar**.
5. O Google vai pedir para autorizar o script — clique em **Autorizar acesso**,
   escolha sua conta e depois em **Avançado → Acessar [nome do projeto] (não seguro)**
   (esse aviso aparece porque é um script seu, é normal, pode confiar).
6. Copie a **URL do app da Web** que aparece no final (algo como
   `https://script.google.com/macros/s/AKfycb.../exec`).

## Passo 4 — Conectar ao site

1. Abra o arquivo [`script.js`](../script.js) do site.
2. Encontre a linha:
   ```javascript
   const SHEET_ENDPOINT = '';
   ```
3. Cole a URL copiada entre as aspas:
   ```javascript
   const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Salve, faça commit e publique (`git add`, `git commit`, `git push`).

Pronto — a partir daí, toda vez que alguém enviar o formulário do site, uma nova
linha é adicionada automaticamente na sua planilha **e** a pessoa é direcionada
para o WhatsApp da Kairus com a mensagem já preenchida.

## Se algo der errado

- Se `SHEET_ENDPOINT` ficar vazio, o site continua funcionando normalmente e
  manda direto pro WhatsApp — só não grava na planilha.
- Se quiser trocar de conta Google ou recriar o script, é só repetir os passos
  2 e 3 e colar a nova URL no lugar da antiga.
- Toda vez que você editar o código do Apps Script, precisa criar uma
  **nova implantação** (ou editar a implantação existente em
  Implantar → Gerenciar implantações) para as mudanças valerem.
