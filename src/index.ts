'use strict';
/**
 * [EN]    Adds a new ArchiveTimeStamp (renotarization) to an existing XML/XAdES signature.
 *         nodeId/nodeName target a specific signature.
 *         Dev  : npx ts-node src/index.ts
 *         Prod : npm run build && npm start
 *         POST http://localhost:8101/api/xml/renotarize/form
 *
 * [PT-BR] Adiciona um novo ArchiveTimeStamp (renotarização) a uma assinatura XML/XAdES
 *         existente. nodeId/nodeName miram uma assinatura específica.
 */
import 'dotenv/config';
import express, { Request, Response } from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/xml/renotarize/form', upload.array('document'), async (req: Request, res: Response) => {
  const documents = (req.files as Express.Multer.File[]) ?? [];
  const b = req.body as Record<string, string>;

  const auth = b.authorization || process.env.SOLIDSIGN_API_AUTHORIZATION || '';
  const base = (b.baseUrl || process.env.SOLIDSIGN_API_BASE_URL || '').replace(/\/$/, '');

  const form = new FormData();
  documents.forEach((d, i) => form.append(`document[${i}]`, d.buffer, { filename: d.originalname }));
  if (b.hashAlgorithm) form.append('hashAlgorithm', b.hashAlgorithm);
  if (b.canonicalizationMethod) form.append('canonicalizationMethod', b.canonicalizationMethod);
  if (b.nodeId) form.append('nodeId', b.nodeId);
  if (b.nodeName) form.append('nodeName', b.nodeName);

  try {
    const resp = await axios.post(`${base}/solidsign/dsig/extending/xml/add-archivetimestamp`, form, {
      headers: { Authorization: auth, ...form.getHeaders() },
      timeout: 120000,
      validateStatus: () => true,
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error(`Unexpected error during XML renotarize: ${(err as Error).message}`);
    res.status(500).json({ error: 'Processing failed. Check logs.' });
  }
});

const PORT = Number(process.env.PORT ?? 8101);
app.listen(PORT, () => console.info(`SolidSign XML renotarize (TS) running on port ${PORT}`));
