import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import https from 'https';
import fs from 'fs';
import ngrok from 'ngrok';
import { streamsSync } from '@moralisweb3/parse-server';

import * as dotenv from 'dotenv';
dotenv.config();

export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(
  streamsSync(parseServer, {
    apiKey: config.MORALIS_API_KEY,
    webhookUrl: '/streams',
  }),
);

app.use(`/server`, parseServer.app);

// Load SSL certificates
const privateKey = fs.readFileSync(process.env.QUIC_ONLINE_BACK_END_PRIVATE_KEY??'', 'utf8');
const certificate = fs.readFileSync(process.env.QUIC_ONLINE_BACK_END_CERT??'', 'utf8');
const ca = fs.readFileSync(process.env.QUIC_ONLINE_BACK_END_CHAIN_CERT??'', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.PORT, async () => {
  if (config.USE_STREAMS) {
    const url = await ngrok.connect(config.PORT);
    // eslint-disable-next-line no-console
    console.log(
      `Moralis Server is running on port ${config.PORT} and stream webhook url ${url}${config.STREAMS_WEBHOOK_URL}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config.PORT} with HTTPS.`);
  }
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpsServer);
