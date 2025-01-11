const paypal = require('@paypal/checkout-server-sdk');

// Configure PayPal environment
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let environment = new paypal.core.SandboxEnvironment(
  clientId, // Client ID
  clientSecret  // Client Secret
);

let client = new paypal.core.PayPalHttpClient(environment);

// Export the PayPal client
module.exports = client;
