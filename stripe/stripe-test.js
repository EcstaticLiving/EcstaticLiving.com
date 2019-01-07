// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe-test.js --secret elistripetest=STRIPETESTSECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

  var stripe = require('stripe')(body.secrets.elistripelive)

  console.log(body.data)

  let existingCustomers = await stripe.customers.list({ email : body.data.stripeCustomer })

  console.log(existingCustomers)

  // Customer already exists
  if (existingCustomers.data.length) {
    console.log(existingCustomers.data[0])
  }
  // Create new customer
  else {
    stripe.customers.create({
      email: body.data.stripeCustomer,
      source: body.data.stripeToken,
      description: body.data.stripeCustomer
    })
    .then(customer => stripe.charges.create({
      amount: body.data.stripeAmount,
      currency: 'usd',
      customer: customer.id,
      description: body.data.stripeCharge
    }, callback))
  }
}
