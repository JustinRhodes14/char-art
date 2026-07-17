# Park LoFi Studio - Backend Server

Express server that handles payment processing (Stripe) for the Park LoFi Studio storefront.

---

## How it works

```
Browser (React)
  │
  │  POST /api/create-checkout-session  { id, quantity }
  ▼
Express server
  │
  │  looks up price/name/stock from server/data/products.js
  │  stripe.checkout.sessions.create(...)
  ▼
Stripe Checkout (hosted page)
  │  - collects card + shipping address
  │
  │  on success → redirects browser to /success?session_id=...
  │  simultaneously →
  ▼
POST /api/webhook  (Stripe → your server)
  │
  │  checkout.session.completed event
  │  → verifies payment status, logs order details
  ▼
Order confirmed (logged to console)
```

Shipping labels are **not** created automatically. Not every order needs one, so labels are generated manually, per order, using a shipping app installed from the [Stripe App Marketplace](https://apps.stripe.com) directly in the Stripe Dashboard.

---

## Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Create your `.env` file

```bash
cp .env.example .env
```

Then fill in each value - see [Environment variables](#environment-variables) below.

### 3. Run in development

Start the Express server (port 3001) and the React app (port 3000) in separate terminals:

```bash
# Terminal 1 - backend
cd server
npm run dev        # uses nodemon, restarts on file changes

# Terminal 2 - frontend
cd ..
npm start
```

The React dev server proxies all `/api` requests to `http://localhost:3001`, so no CORS issues during development.

### 4. Forward Stripe webhooks locally

Stripe can't reach `localhost` directly. Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to tunnel webhook events:

```bash
stripe listen --forward-to localhost:3001/api/webhook
```

Copy the **webhook signing secret** it prints (`whsec_...`) into your `.env` as `STRIPE_WEBHOOK_SECRET`.

---

## Environment variables

| Variable | Where to get it | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) | Use `sk_test_...` for dev, `sk_live_...` for prod |
| `STRIPE_WEBHOOK_SECRET` | Output of `stripe listen` (dev) or Stripe Dashboard → Webhooks (prod) | Verifies webhook payloads are genuinely from Stripe |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Your email provider | Sends contact form submissions |
| `ARTIST_EMAIL` | - | Where contact form submissions are forwarded |
| `CLIENT_URL` | - | React app origin - `http://localhost:3000` in dev, your domain in prod |
| `ALLOWED_ORIGINS` | - | Optional comma-separated CORS allowlist, falls back to `CLIENT_URL` |
| `PORT` | - | Port for the Express server (default `3001`) |

---

## API endpoints

### `POST /api/create-checkout-session`

Creates a Stripe Checkout session from the current cart and returns the hosted checkout URL.

**Request body:**
```json
{
  "items": [
    { "id": 1, "quantity": 1 }
  ]
}
```

Only `id` and `quantity` are read from the client. Price, name, and stock status are always re-derived from `server/data/products.js` server-side, so a tampered request body can't change what gets charged.

**Response:**
```json
{ "url": "https://checkout.stripe.com/pay/cs_test_..." }
```

The frontend redirects the browser to this URL. Stripe collects the shipping address and card details on its hosted page, then redirects back to `/success?session_id=...` on completion or `/cart` on cancellation.

---

### `POST /api/webhook`

Receives signed events from Stripe. **Do not call this directly** - it is only for Stripe's servers.

Handled events:

| Event | Action |
|---|---|
| `checkout.session.completed` | Verifies payment status, logs order details (id, customer email, amount) |

The raw request body must reach this handler unparsed (required for Stripe signature verification). This is why it's registered before Express's `json()` middleware in `app.js`.

De-dupes by `session.id` in-memory so Stripe's automatic retries don't trigger duplicate processing - this guard doesn't survive a process restart or work across multiple instances.

---

## Shipping labels

There's no shipping-carrier API integration in this server, and none is planned. Labels are generated manually, per order, using a shipping app installed from the [Stripe App Marketplace](https://apps.stripe.com) directly in the Stripe Dashboard - configure your ship-from address inside that app, not here.

---

## Project structure

```
server/
├── app.js                 Builds and exports the Express app (no app.listen())
├── index.js                Local dev entrypoint - loads .env, calls app.listen()
├── api/
│   └── index.js            Vercel serverless entrypoint - exports the app directly
├── package.json
├── .env.example             Template for required environment variables
├── data/
│   └── products.js          Authoritative product catalogue (price, name, stock)
└── routes/
    ├── checkout.js          POST /api/create-checkout-session
    ├── webhook.js           POST /api/webhook
    └── contact.js           POST /api/contact
```

---

## Going to production

1. Swap test keys for live keys in your production environment (`sk_live_...`)
2. Register your production webhook URL in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks) (e.g. `https://yoursite.com/api/webhook`) and copy the new signing secret
3. Set `CLIENT_URL` to your production frontend domain
4. Install a shipping-label app from the [Stripe App Marketplace](https://apps.stripe.com) and configure your ship-from address there
