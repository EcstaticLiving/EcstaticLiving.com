// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe-test.js --secret elistripetest=STRIPETESTSECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.20.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripetest)

	const {
		chargeAmount,
		chargeDescription,
		customerDescription,
		customerEmail,
		event,
		party,
		phone,
		participantFirstName,
		participantLastName,
		partnerFirstName,
		partnerLastName,
		quantity,
		priceFullTotal,
		priceDiscountTotal,
		priceBaseTotal,
		costBaseTotal,
		priceDepositTotal,
		priceBalanceDate,
		lodging,
		source
	} = body.data
	
	const createCharge = ({ customer }) => stripe.charges.create({
		amount: chargeAmount,
		currency: 'usd',
		customer,
		description: chargeDescription,
		metadata: {
			...event && { Event: event },
			...party && { Party: party },
			...phone && { Phone: phone },
			...participantFirstName && { 'Participant First Name': participantFirstName },
			...participantLastName && { 'Participant Last Name': participantLastName },
			...partnerFirstName && { 'Partner First Name': partnerFirstName },
			...partnerLastName && { 'Partner Last Name': partnerLastName },
			...quantity && { Quantity: quantity },
			...priceFullTotal && { 'Full Price (total)': priceFullTotal },
			...priceDiscountTotal && { 'Discount (total)': priceDiscountTotal },
			...priceBaseTotal && { 'Base Price (total)': priceBaseTotal },
			...costBaseTotal && { 'Base Cost (total)': costBaseTotal },
			...priceDepositTotal && { 'Deposit (total)': priceDepositTotal },
			...priceBalanceDate && { 'Balance Due Date': priceBalanceDate },
			...lodging && { 'Lodging Option': lodging }
		},
		source,
		statement_descriptor: 'ECST LVNG ' + event
	}, callback)

	stripe.customers.list({ email: customerEmail })
		.then(customerList => {

			// Customer already exists...
			if (customerList.data.length > 0) {
				const customerId = customerList.data[0].id
				// ...update existing customer with new source...
				stripe.customers.createSource(customerId, {
					source
				})
					.then(res => {
						// ...make new source default payment source...
						stripe.customers.update(customerId, {
							default_source: source
						})
							// ...then create charge using existing customer.
							.then(res => createCharge({ customer: customerId }))
							.catch(err => console.error(err))
					})
					.catch(err => console.error(err))
			}
			// Create new customer...
			else {
				stripe.customers.create({
					email: customerEmail.toLowerCase(),
					source: source,
					description: customerDescription
				})
				// ...and create charge using new customer data.
				.then(customer => createCharge({ customer: customer.id }))
				.catch(err => console.error(err))
			}
		})

}
