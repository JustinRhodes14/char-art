// Vercel invokes this module's export directly as the request handler.
// An Express app is itself a (req, res) function, so no adapter is needed —
// Vercel passes the raw request through, which is what Stripe's webhook
// signature verification (express.raw() in app.js) depends on.
module.exports = require('../app');
