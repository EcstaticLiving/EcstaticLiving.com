// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe.js --secret elistripelive=STRIPESECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripelive)

	const amount = body.data.stripeAmount
	const currency = 'usd'
	const description = body.data.stripeCharge
	const email = body.data.stripeEmail.toLowerCase()
	const event = body.data.stripeProduct
	const quantity = body.data.stripeQuantity
	const qbCustomer = body.data.stripeQbCustomer
	
	const chargeCreate = ({ customer }) => stripe.charges.create({
		amount,
		currency,
		customer,
		description,
		metadata: {
			qbCustomer,
			event,
			quantity,
			rate: ((amount/quantity)/100).toFixed(2)
		},
		statement_descriptor: 'ECST LVNG ' + event
	}, callback)

	stripe.customers.list({ email })
		.then(customerList => {

			// Customer already exists...
			if (customerList.data.length > 0) {
				// ...so create charge using existing customer.
				chargeCreate({ customer: customerList.data[0].id })
			}
			// Create new customer...
			else {
				stripe.customers.create({
					email,
					source: body.data.stripeToken,
					description: body.data.stripeCustomer
				})
				// ...and create charge using new customer data.
				.then(customer => chargeCreate({ customer: customer.id }))
			}
		})

}
