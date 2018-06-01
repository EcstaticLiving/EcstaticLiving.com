// Uses webtask.io
// To create a server, enter the following code on the CLI:
// wt create stripe-test.js --secret elistripetest=STRIPETESTSECRET --parse-body
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = function (body, callback) {
  var stripe = require('stripe')(body.secrets.elistripetest)
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
