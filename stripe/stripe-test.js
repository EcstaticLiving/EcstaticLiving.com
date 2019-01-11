// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe-test.js --secret elistripetest=STRIPETESTSECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.1.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripetest)

  const amount = body.data.stripeAmount
  const currency = 'usd'
  const description = body.data.stripeCharge
	const email = body.data.stripeEmail
	const event = body.data.stripeProduct
	const quantity = body.data.stripeQuantity
	const customerQuickBooks = body.data.customerQuickBooks
	
  const chargeCreate = ({ customer }) => stripe.charges.create({
		amount,
		currency,
		customer,
		description,
		metadata: {
			customerQuickBooks,
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

  /* NEW VERSION - NOT WORKING
  const chargeCreate = ({ customer }) => stripe.charges.create({ amount, currency, customer, description }, callback)
  const orderCreate = ({ productId }) => stripe.orders.create({
    currency: 'usd',
    items: [{
      amount,
      currency,
      description,
      // in Stripe, `parent` is the ID of the product SKU
      parent: productId,
      quantity: 1,
      type: 'sku'
    }]
  })

	// STEP 1: find out if customer already exists
	stripe.customers.list({ email })
		.then(customerList => {

			console.log('************')
			console.log('CUSTOMER LIST')
			console.log('************')
			console.log(customerList)

			// #1 Customer already exists...
			if (customerList.data) {

				// STEP 2: find out if event already exists as product
				stripe.products.list({ active: true })
					.then(productList => {

						console.log('************')
						console.log('PRODUCT LIST')
						console.log('************')
						console.log(productList)

						const productSkus = productList.data && productList.data.filter(product => product.name.toUpperCase() === event.toUpperCase())
							? productList.data.filter(product => product.name.toUpperCase() === event.toUpperCase())[0].skus
							: null

						console.log('************')
						console.log('SKU LIST')
						console.log('************')
						console.log(productSkus)

						const productId = productSkus.data
							? productSkus.data[0].id
							: null
            
            console.log('************')
            console.log('PRODUCT ID')
            console.log('************')
            console.log(productId)
  
						
						// #2 Product already exists
						if (productId) {
              orderCreate({ productId })
                .then(order => console.log(order))
						}
						// #2 Product doesn’t yet exist
						else {

						}
					
					})

				// ...so create charge using existing customer.
				// chargeCreate({ customer: customerList.data[0].id })

			}
			// #1 Create new customer...
			else {
				stripe.customers.create({
					email,
					source: body.data.stripeToken,
					description: body.data.stripeCustomer
				})
				// ...and create charge using new customer data.
				.then(customer => {
					chargeCreate({ customer: customer.id })
				})
			}

		})
  */
}
