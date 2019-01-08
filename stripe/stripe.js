// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe.js --secret elistripelive=STRIPESECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripelive)

	const email = body.data.stripeEmail

	stripe.customers.list({ email })
		.then(list => {
			// Customer already exists...
			if (list.data) {
				// ...so create charge using existing customer.
				stripe.charges.create({
					amount: body.data.stripeAmount,
					currency: 'usd',
					customer: list.data[0].id,
					description: body.data.stripeCharge
				}, callback)
			}
			// Create new customer...
			else {
				stripe.customers.create({
					email,
					source: body.data.stripeToken,
					description: body.data.stripeCustomer
				})
				// ...and create charge using new customer data.
				.then(customer => stripe.charges.create({
					amount: body.data.stripeAmount,
					currency: 'usd',
					customer: customer.id,
					description: body.data.stripeCharge
				}, callback))
			}
		})

}
