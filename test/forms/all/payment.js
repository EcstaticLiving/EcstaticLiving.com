// CONSTANTS

// Webflow url
const formUrl = 'https://webflow\.com/api/v1/form/564aac835a5735b1375b5cdf'

// Form submission
const formSubmission = async ({ data, url }) => await $.ajax({
	type: 'POST',
	url,
	crossDomain: true,
	data,
	dataType: 'json',
	timeout: 15000
})

// Stripe url
const stripeUrl = containsUrl('ecstaticliving.com')
	? 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe'
	: 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe-test'

// Stripe charge description
const chargeDescription = eventTitle + ' ' + eventDates + ', ' + eventVenue + ', ' + getText(eventSelect).substring(0, getText(eventSelect).length - 16) + ', ' + isChecked(eventDepositDeposit) ? 'DEPOSIT' : 'FULL'

// Stripe data
const stripeData = {
	'chargeAmount': finalAmount() * 100,
	'chargeDescription': chargeDescription,
	'customerDescription': getValue(eventFirstName) + ' ' + getValue(eventLastName) + ' <' + getValue(eventEmail) + '>',
	'customerEmail': getValue(eventEmail),
	'event': eventCode,
	'party': partyName(),
	'phone': getValue(eventMobile),
	'participantFirstName': getValue(eventFirstName),
	'participantLastName': getValue(eventLastName),
	'partnerFirstName': getValue(eventPartnerFirstName),
	'partnerLastName': getValue(eventPartnerLastName),
	'quantity': paymentQty(),
	'rate': (finalAmount()/paymentQty()).toFixed(2),
	'priceFull': finalAmount(),
	'priceDiscount': getDiscount(),
	'priceBase': !isNaN(eventBasePrice) ? (eventBasePrice * paymentQty()).toFixed(2) : 0,
	'costBase': !isNaN(eventBaseCost) ? (eventBaseCost * paymentQty()).toFixed(2) : 0,
	'priceDeposit': isChecked(eventDepositDeposit) ? finalAmount() : 0,
	'priceBalanceDate': eventDepositDate,
	'lodging': eventOptions[$(eventSelect).index() - 1],
	'source': result.source.id
}

// Stripe Elements
const elements = containsUrl('ecstaticliving.com')
	? Stripe('pk_live_0rULIvKhv6aSLqI49Ae5rflI').elements()
	: Stripe('pk_test_QO6tO6bHny3y10LjH96f4n3p').elements()

// Stripe Card
const card = elements.create('card', {
	hidePostalCode: true,
	style: {
		base: {
			fontFamily: 'Lato',
			fontWeight: 300,
			color: '#333',
			fontSize: '16px',
			lineHeight: '24px',
			'::placeholder': {
				color: '#666',
			}
		},
		invalid: {
			color: '#b00000',
			':focus': {
				color: '#b00000'
			}
		}
	}
})

// Payment validation called on form submission, or when `Billing Card` field is changed
const paymentValidation = result => {
	// If payment validates, check hidden field to enable `formValidation()` to pass
	if (result.complete) {
		checkElement(billingCard)
	}
	// ...otherwise, uncheck hidden field and deactivate pay now button via `formValidation()`.
	else if (!result.complete) {
		unCheckElement(billingCard)
	}
	// Validate event
	formValidation()
	// Card field is missing or has incorrect data, e.g. expiration date is in the past
	if (result.error) {
		setText('#card-errors', result.error.message)
		return false
	}
	emptyText('#card-errors')
	return true
}

// Called on successful Stripe form submission, or if Stripe timed-out, since may still have charged customer’s card
const successfulSubmission = () => {
	// Hide processing...
	hideElement('.notification-modal.processing')
	// ...and redirect to success page.
	window.location.href = containsUrl('ecstaticliving.com')
		? 'https://www.ecstaticliving.com/registration'
		: 'https://ecstaticliving.webflow.io/registration'
	return true
}

// Called whenever any submission
const indicateFailedSubmission = type => {
	resetForm()
	hideElement('.notification-modal.processing')
	// Show card error notification
	if (type === 'stripe') showElement('.notification-modal.card-error')
	// Show form error notification.
	else if (type === 'form') showElement('.notification-modal.form-error')
	return false
}


// Begin
card.mount('#card-element')
card.addEventListener('change', result => paymentValidation(result))
onClick('#button-stripe-error', () => hideElement('.notification-modal.card-error'))


// Always allow pay now button to be clicked
onClick(paymentButton, e => {

	// Prevent accidental submission of form through 'enter' key
	e.preventDefault()
	if (e.which === 13) return false

	// If form hasn’t correctly been filled out...
	if (!formValidation()) {
		// ...show where there are errors...
		showErrorsInForm()
		// ...and as long as there is no Stripe error message, fill in the error box with a pointer for customer to look for missing information...
		if (isBlank('#card-errors')) {
			setText('#card-errors', 'Oops! There’s some missing information.')
		}
		// ...and interrupt payment process.
		return false
	}

	// If all has been correctly filled out, save form.
	saveForm(page())

	// Update form submission fields
	setValue('#party', partyName())
	setValue('#trafficsource', urlString && urlString.source ? urlString.source : 'ELI')
	setValue('#charge-description', chargeDescription)
	setValue('#charge-amount', finalAmount())
	setValue('#event-option-total', getValue(eventSelect) * 100)
	setValue('#event-affiliate', getValue(eventAffiliateCode) ? getValue(eventAffiliateCode) : '- none -')
	setValue('#question-diet', getValue(eventDietDetails) ? getValue(eventDietDetails) : '- none -')
	setValue('#question-special', getValue(eventSpecialDetails) ? getValue(eventSpecialDetails) : '- none -')

	// Initiate payment: first, check to see if card is valid.
	const stripeCard = stripe.createSource(card, {
		owner: {
			name: getValue(billingFirstName) + ' ' + getValue(billingLastName),
			address: {
				line1: getValue(billingStreet),
				city: getValue(billingCity),
				state: getValue(billingState),
				postal_code: getValue(billingPostal),
				country: getValue(billingCountry)
			},
			email: getValue(eventEmail)
		}
	})

	console.log(stripeCard)

	// Send result to be validated
	if (paymentValidation(stripeCard)) {

		// If card is valid, indicate processing...
		showElement('.notification-modal.processing')

		try {

			// ...and submit reg form
			const formSubmit = await formSubmission({ data: createForm(), url: formUrl })

			// Once reg form is submitted...
			if (formSubmit) {

				try {

					// On successful payment submission, hide processing and redirect to success page.
					return await formSubmission({ data: stripeData, url: stripeUrl }) ? successfulSubmission() : false

				}
				// ...on Stripe error...
				catch (err) {

					// ...if `update card`, $0 charge to save credit card details will cause error; do not indicate as error.
					if (page() === 'Custom' && err.responseJSON && err.responseJSON.message === 'Invalid positive integer') {
						window.location.href = containsUrl('ecstaticliving.com')
							? 'https://www.ecstaticliving.com/updated-card'
							: 'https://ecstaticliving.webflow.io/updated-card'
						return true
					}

					// If error occurred during payment submission, notify staff of error via a new form submission.
					const formData = createForm()
					formData.fields = err.statusText === 'timeout'
						? { ERROR: 'Did not receive successful payment confirmation from Stripe on previous registration made by ' + formData.fields.Party + '. Staff, please verify that payment went through. Customer was informed that registration completed successfully. If Stripe payment exists, no further action has to be taken; if Stripe payment is missing, please reach out to customer for payment.' }
						: { ERROR: 'The following error occurred on the previous registration made by ' + formData.fields.Party + '. Customer was notified of error, and payment likely did not go through. Error: ' + err }

					const errorHandling = ({ status }) => {
						console.error(status)
						// ...if Stripe timed out, it’s possible that Stripe charge went through, but too late. So we want to prevent customer from being told that it didn’t work, even though payment went through.
						if (status === 'timeout') {
							successfulSubmission()
						}
						else {
							// ...all other errors, indicate failed payment submission.
							indicateFailedSubmission('stripe')
						}
					}

					try {
						// Submit reg form follow-up to staff, and indicate error
						const formSubmit = await formSubmission({ data: formData, url: formUrl })
						// Once follow-up form has been submitted to office...
						if (formSubmit) {
							// ...do error handling
							errorHandling({ status: err.statusText })
						}
					}
					catch (newError) {
						// Do error handling also if reg form follow-up failed to get sent.
						errorHandling({ status: err.statusText })
					}

				}
			}

		}
		catch (err) {
			// Webflow form failed or timed out
			indicateFailedSubmission('form')
		}

	}
	
})