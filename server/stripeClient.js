const https = require('https');
const tls = require('tls');
const fs = require('fs');
const path = require('path');

// On macOS, Node's CA list is missing the legacy root that api.stripe.com's
// chain cross-signs through. Pass a custom agent with the extended CA list.
// The cert file may not be present on Linux/Vercel (where it isn't needed).
const certPath = path.join(__dirname, 'certs/aaa-certificate-services-root.pem');
const ca = fs.existsSync(certPath)
  ? [...tls.rootCertificates, fs.readFileSync(certPath, 'utf8')]
  : tls.rootCertificates;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ ca }),
});

module.exports = stripe;
