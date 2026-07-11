const { Shippo } = require('shippo');

// TLS fix for api.goshippo.com is applied globally in app.js at startup.
const shippo = new Shippo({ apiKeyHeader: process.env.SHIPPO_API_KEY });

// Your studio's ship-from address — set these in .env
const FROM_ADDRESS = {
  name: process.env.SHOP_NAME || 'Park LoFi Studio',
  street1: process.env.SHOP_STREET,
  city: process.env.SHOP_CITY,
  state: process.env.SHOP_STATE,
  zip: process.env.SHOP_ZIP,
  country: 'US',
  email: process.env.SHOP_EMAIL,
  phone: process.env.SHOP_PHONE,
};

async function createShippingLabel({
  toName,
  toStreet1,
  toStreet2,
  toCity,
  toState,
  toZip,
  toCountry,
  toEmail,
  totalWeightOz,
}) {
  // Stickers, keychains, and postcards fit in a small padded flat envelope
  const parcel = {
    length: '9',
    width: '6',
    height: '0.5',
    distanceUnit: 'in',
    weight: String(Math.ceil(totalWeightOz)),
    massUnit: 'oz',
  };

  const shipment = await shippo.shipments.create({
    addressFrom: FROM_ADDRESS,
    addressTo: {
      name: toName,
      street1: toStreet1,
      street2: toStreet2,
      city: toCity,
      state: toState,
      zip: toZip,
      country: toCountry,
      email: toEmail,
    },
    parcels: [parcel],
    async: false,
  });

  if (!shipment.rates || shipment.rates.length === 0) {
    throw new Error('No shipping rates returned from Shippo');
  }

  // Pick the cheapest available rate
  const cheapestRate = [...shipment.rates].sort(
    (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
  )[0];

  const transaction = await shippo.transactions.create({
    rate: cheapestRate.objectId,
    labelFileType: 'PDF',
    async: false,
  });

  if (transaction.status !== 'SUCCESS') {
    throw new Error(`Label creation failed: ${JSON.stringify(transaction.messages)}`);
  }

  return {
    labelUrl: transaction.labelUrl,
    trackingNumber: transaction.trackingNumber,
    carrier: cheapestRate.provider,
    service: cheapestRate.servicelevel.name,
    cost: cheapestRate.amount,
  };
}

module.exports = { createShippingLabel };
