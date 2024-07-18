const fs = require('fs');
const https = require('https');
const app = require('./app');
require("dotenv").config()

// SSL certificate paths
const options = {
  key: fs.readFileSync(process.env.QUIC_ONLINE_BACK_END_PRIVATE_KEY),
  cert: fs.readFileSync(process.env.QUIC_ONLINE_BACK_END_FULL_CHAIN_CERT)
};

// Define server URL
const serverUrl = process.env.QUIC_ONLINE_BACK_END_URL ?? "http://localhost:5000"

// Create HTTPS server
https.createServer(options, app).listen(5000, () => {
  console.log('AI server started on ' + serverUrl);
});