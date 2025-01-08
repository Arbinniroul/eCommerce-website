const paypal = require('@paypal/checkout-server-sdk');

// Configure PayPal environment
let environment = new paypal.core.SandboxEnvironment(
  'AZtg5iTee8R-c7Y-WRGQ3r5BAPRlzqEi1JvXAo1WYvzjOyWlbDeMonHMHUC3_g7MYvgJOWfFIBY-vp-q', // Client ID
  'EI7NqQ2ye_yQHgD89pBmkwaMl0EUSBzSoOEHhA-jj_pEp8vQVjbgpBthaBMmAFGxVuoa8hGhO7NxNs6i'  // Client Secret
);

let client = new paypal.core.PayPalHttpClient(environment);

// Export the PayPal client
module.exports = client;
