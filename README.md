# Qpicanha Onboarding - QR Code Connection

Página lightweight para compartilhar com clientes para conectar WhatsApp via QR Code da instância Qpicanha.

## Setup Local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`

## Deploy no Railway

### 1. Cria um repo no GitHub

```bash
git init
git add .
git commit -m "Initial commit: Qpicanha onboarding"
git remote add origin https://github.com/seu-usuario/qpicanha-onboard.git
git push -u origin main
```

### 2. Conecta ao Railway

1. Vai a [railway.app](https://railway.app)
2. Clica "New Project" → "Deploy from GitHub repo"
3. Seleciona `qpicanha-onboard`
4. Railway detecta Next.js automaticamente
5. Clica "Deploy"

### 3. Configura as variáveis de ambiente

Na dashboard do Railway:
- Variables → Add
  - `EVOLUTION_API_URL`: `https://evolution.maigre.io`
  - `EVOLUTION_API_KEY`: (cola a tua chave Evolution API)

### 4. Obtém o link público

Railway gera um link automático como `https://qpicanha-{random}.railway.app`

Podes customizar o domínio nas settings do Railway.

## Como usar

Envia o link ao cliente:
```
https://qpicanha-{random}.railway.app
```

Cliente:
1. Abre o link
2. Vê o QR code
3. Aponta câmara do WhatsApp
4. Conecta!

## Variáveis de Ambiente

- `EVOLUTION_API_URL`: URL da Evolution API
- `EVOLUTION_API_KEY`: Chave da API Evolution

## Estrutura

```
.
├── app/
│   ├── layout.tsx       # Layout raiz
│   ├── page.tsx         # Página de QR
│   ├── globals.css      # Estilos globais
│   └── api/
│       └── qr/route.ts  # API que retorna QR code
├── package.json
├── tsconfig.json
├── next.config.ts
└── .env.example
```
