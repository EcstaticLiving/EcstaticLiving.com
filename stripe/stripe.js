// Uses webtask.io
// To create a server, enter the following code on the CLI:
// wt create stripe.js --secret elistripelive=STRIPESECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = function (body, callback) {
  var stripe = require('stripe')(body.secrets.elistripelive)
  console.log(body.data)
  stripe.customers.create({
    email: body.data.stripeCustomer,
    source: body.data.stripeToken,
    description: body.data.stripeCustomer
  })
  .then(function(customer) {
    return stripe.charges.create({
      amount: body.data.stripeAmount,
      currency: 'usd',
      customer: customer.id,
      description: body.data.stripeCharge
    }, callback);
  })
};
