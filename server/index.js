// Local dev entrypoint only, Vercel invokes the app directly via api/index.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
