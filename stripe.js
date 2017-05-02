module.exports = function (body, callback) {
  var stripe = require('stripe')(body.secrets.elistripe)
  stripe.customers.create({
    email: body.data.stripeEmail,
    source: body.data.stripeToken,
    description: body.data.stripeCustomer
  }).then(function(customer) {
    return stripe.charges.create({
      amount: body.data.stripeAmount,
      currency: 'usd',
      customer: customer.id,
      description: body.data.stripeCharge
    });
  })
};
