# 🇧🇷 SolidSign API - Exemplo de Integração: Renotarizar XML (ArchiveTimeStamp) (TypeScript)

Adiciona um novo ArchiveTimeStamp a uma assinatura XML/XAdES existente. `nodeId`/`nodeName` miram uma assinatura específica.

## Requisitos

- Express / Node.js / TypeScript (`npm install`)
- Um token JWT válido (`POST /solidsign/auth/token`)
- Front-end de referência (opcional): [`exemplo-react-xml-renotarize`](https://github.com/SolidTechSolutions/exemplo-react-xml-renotarize)

## Como rodar

```bash
npm install
npx ts-node src/index.ts   # dev
# ou
npm run build && npm start # prod
```

O serviço sobe em `http://localhost:8101`.

## Como funciona

`POST /api/xml/renotarize/form` — recebe um formulário (`multipart/form-data`) e repassa pra SolidSign API real, devolvendo a resposta como está.

## Variáveis do formulário

| Campo | Significado | Obrigatório |
|---|---|---|
| `document[i]` | XML(s) assinado(s) a renotarizar | Sim |
| `hashAlgorithm` | Algoritmo de hash | Não |
| `canonicalizationMethod` | Algoritmo de canonicalização (C14N) | Não |
| `nodeId` / `nodeName` | Nó XML alvo | Não |
| `authorization` | Token JWT (Bearer) — sobrescreve o configurado | Não |
| `baseUrl` | URL base da SolidSign API — sobrescreve o configurado | Não |

---

# 🇬🇧 SolidSign API - Integration Example: XML Renotarization (ArchiveTimeStamp) (TypeScript)

Adds a new ArchiveTimeStamp to an existing XML/XAdES signature. `nodeId`/`nodeName` target a specific signature.

## Requirements

- Express / Node.js / TypeScript (`npm install`)
- A valid JWT token (`POST /solidsign/auth/token`)
- Reference front-end (optional): [`exemplo-react-xml-renotarize`](https://github.com/SolidTechSolutions/exemplo-react-xml-renotarize)

## Running

```bash
npm install
npx ts-node src/index.ts   # dev
# or
npm run build && npm start # prod
```

The service starts on `http://localhost:8101`.

## How it works

`POST /api/xml/renotarize/form` — accepts a form (`multipart/form-data`) and forwards it to the real SolidSign API, returning the response as-is.

## Form fields

| Field | Meaning | Required |
|---|---|---|
| `document[i]` | Signed XML(s) to renotarize | Yes |
| `hashAlgorithm` | Hash algorithm | No |
| `canonicalizationMethod` | Canonicalization algorithm (C14N) | No |
| `nodeId` / `nodeName` | Target XML node | No |
| `authorization` | JWT (Bearer) token — overrides the configured one | No |
| `baseUrl` | SolidSign API base URL — overrides the configured one | No |
