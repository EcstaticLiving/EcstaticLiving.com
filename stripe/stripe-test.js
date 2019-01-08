// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe-test.js --secret elistripetest=STRIPETESTSECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// wt create stripe-test.js --secret elistripetest=rk_test_PdsZhAN5dhZmudrHiosmRaDh --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripetest)

	console.log(body.data)
  const email = body.data.stripeEmail
  
  const createCharge = ({ amount, currency, customer, description }) => stripe.charges.create({ amount, currency, customer, description }, callback)

  // STEP 1: find out if customer already exists
	// stripe.customers.list({ email })
	// 	.then(list => {

	// 		// #1 Customer already exists...
	// 		if (list.data) {

  //       // STEP 2: find out if event already exists as product
  //       // stripe.products.list({ name })

	// 			// ...so create charge using existing customer.
	// 			createCharge({ amount: body.data.stripeAmount , currency: 'usd', customer: list.data[0].id , description: body.data.stripeCharge })

  //     }
	// 		// #1 Create new customer...
	// 		else {
	// 			stripe.customers.create({
	// 				email,
	// 				source: body.data.stripeToken,
	// 				description: body.data.stripeCustomer
	// 			})
	// 			// ...and create charge using new customer data.
  //       .then(customer => {
  //         createCharge({ amount: body.data.stripeAmount , currency: 'usd', customer: customer.id , description: body.data.stripeCharge })
  //       })
  //     }

	// 	})

}
