# Park LoFi Studio — Backend Server

Express server that handles payment processing (Stripe) and shipping label generation (Shippo) for the Park LoFi Studio storefront.

---

## How it works

```
Browser (React)
  │
  │  POST /api/create-checkout-session  { items }
  ▼
Express server
  │
  │  stripe.checkout.sessions.create(...)
  ▼
Stripe Checkout (hosted page)
  │  — collects card + shipping address
  │
  │  on success → redirects browser to /success?session_id=...
  │  simultaneously →
  ▼
POST /api/webhook  (Stripe → your server)
  │
  │  checkout.session.completed event
  │  → reconstruct parcel weight from session metadata
  │  → shippo.shipment.create(from, to, parcel)
  │  → purchase cheapest valid rate
  ▼
Shippo returns PDF label URL + tracking number
  (logged to console — wire up email/storage as needed)
```

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

Then fill in each value — see [Environment variables](#environment-variables) below.

### 3. Run in development

Start the Express server (port 3001) and the React app (port 3000) in separate terminals:

```bash
# Terminal 1 — backend
cd server
npm run dev        # uses nodemon, restarts on file changes

# Terminal 2 — frontend
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
| `SHIPPO_API_KEY` | [Shippo Dashboard → API](https://goshippo.com/user/apikeys) | Use test token for dev (`shippo_test_...`) |
| `SHOP_NAME` | — | Printed on outgoing shipping labels as the sender name |
| `SHOP_STREET` | — | Your studio's street address (ship-from) |
| `SHOP_CITY` | — | Ship-from city |
| `SHOP_STATE` | — | Ship-from state abbreviation (e.g. `CA`) |
| `SHOP_ZIP` | — | Ship-from ZIP code |
| `SHOP_EMAIL` | — | Your contact email, included on Shippo shipments |
| `CLIENT_URL` | — | React app origin — `http://localhost:3000` in dev, your domain in prod |
| `PORT` | — | Port for the Express server (default `3001`) |

---

## API endpoints

### `POST /api/create-checkout-session`

Creates a Stripe Checkout session from the current cart and returns the hosted checkout URL.

**Request body:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Sunset Dreams",
      "price": 250,
      "quantity": 1,
      "image": "/assets/artwork/sunset-dreams.jpg",
      "weight_oz": 8
    }
  ]
}
```

**Response:**
```json
{ "url": "https://checkout.stripe.com/pay/cs_test_..." }
```

The frontend redirects the browser to this URL. Stripe collects the shipping address and card details on its hosted page, then redirects back to `/success?session_id=...` on completion or `/cart` on cancellation.

---

### `POST /api/webhook`

Receives signed events from Stripe. **Do not call this directly** — it is only for Stripe's servers.

Handled events:

| Event | Action |
|---|---|
| `checkout.session.completed` | Verifies payment status, then calls Shippo to generate a shipping label |

The raw request body must reach this handler unparsed (required for Stripe signature verification). This is why it is registered before Express's `json()` middleware in `index.js`.

---

## Shipping labels (Shippo)

Labels are created automatically after a confirmed payment. The parcel dimensions are set for a **padded flat envelope** (9" × 6" × 0.5") which covers stickers, keychains, and postcards. The server picks the **cheapest valid rate** across all carriers Shippo returns.

The label URL and tracking number are currently logged to the server console:

```
Shipping label created: {
  orderId: 'cs_test_...',
  carrier: 'USPS',
  service: 'Ground Advantage',
  cost: '$4.23',
  tracking: '9400111899223397234',
  labelUrl: 'https://shippo-delivery.s3.amazonaws.com/...'
}
```

**To extend this** — after the `console.log` in `routes/webhook.js` — you could:
- Email the label URL to yourself using Nodemailer or Resend
- Save the label + tracking to a database alongside the order
- Trigger a confirmation email to the customer with their tracking number

---

## Project structure

```
server/
├── index.js              Entry point — mounts routes, configures middleware
├── package.json
├── .env.example          Template for required environment variables
├── routes/
│   ├── checkout.js       POST /api/create-checkout-session
│   └── webhook.js        POST /api/webhook
└── services/
    └── shipping.js       Shippo shipment creation and label purchase
```

---

## Going to production

1. Swap test keys for live keys in your production environment (`sk_live_...`, `shippo_live_...`)
2. Register your production webhook URL in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks) (e.g. `https://yoursite.com/api/webhook`) and copy the new signing secret
3. Set `CLIENT_URL` to your production frontend domain
4. Make sure `SHOP_*` address fields are your real ship-from address — Shippo uses this for rate calculation and printed labels
