// Uses webtask.io
// To create a server, navigate to the /stripe folder and enter the following code on the CLI:
// wt create stripe.js --secret elistripelive=STRIPETESTSECRET --parse-body --meta 'wt-node-dependencies'='{"stripe":"6.20.0"}'
// Then add the resulting URL to the Stripe url in the index.js file.
module.exports = (body, callback) => {

	var stripe = require('stripe')(body.secrets.elistripelive)

	const {
		chargeAmount,
		chargeDescription,
		customerDescription,
		customerEmail,
		event,
		party,
		participantFirstName,
		participantLastName,
		partnerFirstName,
		partnerLastName,
		quantity,
		token
	} = body.data
	
	const chargeCreate = ({ customer }) => stripe.charges.create({
		amount: chargeAmount,
		currency: 'usd',
		customer,
		description: chargeDescription,
		metadata: {
			...participantFirstName && { 'Participant First Name': participantFirstName },
			...participantLastName && { 'Participant Last Name': participantLastName },
			...partnerFirstName && { 'Partner First Name': partnerFirstName },
			...partnerLastName && { 'Partner Last Name': partnerLastName },
			...event && { Event: event },
			...party && { Party: party },
			...quantity && { Quantity: quantity },
			...(chargeAmount && quantity) && { Rate: ((chargeAmount/quantity)/100).toFixed(2) }
		},
		statement_descriptor: 'ECST LVNG ' + event
	}, callback)

	stripe.customers.list({ email: customerEmail })
		.then(customerList => {

			// Customer already exists...
			if (customerList.data.length > 0) {
				// ...so create charge using existing customer.
				chargeCreate({ customer: customerList.data[0].id })
			}
			// Create new customer...
			else {
				stripe.customers.create({
					email: customerEmail.toLowerCase(),
					source: token,
					description: customerDescription
				})
				// ...and create charge using new customer data.
				.then(customer => chargeCreate({ customer: customer.id }))
			}
		})

}
