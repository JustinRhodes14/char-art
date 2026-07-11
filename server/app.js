// api.goshippo.com serves a cert chain through a legacy root not in Node's
// bundled CA list. Fix: extend undici's trust store at startup.
// api.stripe.com has the same issue but is fixed via NODE_EXTRA_CA_CERTS in
// package.json scripts, which is read before any user code runs (unlike dotenv).
const fs = require('fs');
const path = require('path');
const tls = require('tls');
const { Agent, setGlobalDispatcher } = require('undici');

// The legacy root is needed on macOS (Node's CA list is missing it) but
// Vercel's Linux environment already trusts it. Load conditionally so a
// missing cert file doesn't crash the server in either environment.
const certPath = path.join(__dirname, 'certs/aaa-certificate-services-root.pem');
const ca = fs.existsSync(certPath)
  ? [...tls.rootCertificates, fs.readFileSync(certPath, 'utf8')]
  : tls.rootCertificates;
setGlobalDispatcher(new Agent({ connect: { ca } }));

const express = require('express');
const cors = require('cors');

const checkoutRoutes = require('./routes/checkout');
const webhookRoutes = require('./routes/webhook');
const contactRoutes = require('./routes/contact');

const app = express();

// Comma-separated list of origins allowed to call this API (e.g. your GitHub
// Pages custom domain, plus its www variant if you use one). Falls back to
// CLIENT_URL — the single origin used for Stripe redirect/image URLs — so a
// single-origin setup needs no extra config.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

// Webhook must receive the raw body for signature verification — register before json middleware
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked — received:', origin, '| allowed:', allowedOrigins);
      callback(null, false);
    }
  },
}));
app.use(express.json());

app.use('/api', checkoutRoutes);
app.use('/api', contactRoutes);

module.exports = app;
