// CONSTANTS

// Stripe url
const stripeUrl = containsUrl('ecstaticliving.com')
	? 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe'
	: 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe-test'

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

// Stripe Charge Description
const chargeDescription = eventTitle + ' ' + eventDates + ', ' + eventVenue + ', ' + getText(eventSelect).substring(0, getText(eventSelect).length - 16) + ', ' + isChecked(eventDepositDeposit) ? 'DEPOSIT' : 'FULL'


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
	else {
		emptyText('#card-errors')
	}
}

const successfulSubmission = () => {
	hideElement('.notification-modal.processing')
	const siteUrl = containsUrl('ecstaticliving.com')
		? 'https://www.ecstaticliving.com/'
		: 'https://ecstaticliving.webflow.io/'
	window.location.href = page() === 'Event'
		? siteUrl + 'registration'
		: siteUrl + 'updated-card-charged'
}

const indicateFailedSubmission = type => {
	resetForm()
	hideElement('.notification-modal.processing')
	// Show card error notification
	if (type === 'stripe') showElement('.notification-modal.card-error')
	// Show form error notification.
	else if (type === 'form') showElement('.notification-modal.form-error')
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

	// Form submission fields
	setValue('#party', partyName())
	setValue('#trafficsource', urlString && urlString.source ? urlString.source : 'ELI')
	setValue('#charge-description', chargeDescription)
	setValue('#charge-amount', finalAmount())
	setValue('#event-option-total', getValue(eventSelect) * 100)
	setValue('#event-affiliate', getValue(eventAffiliateCode) ? getValue(eventAffiliateCode) : '- none -')
	setValue('#question-diet', getValue(eventDietDetails) ? getValue(eventDietDetails) : '- none -')
	setValue('#question-special', getValue(eventSpecialDetails) ? getValue(eventSpecialDetails) : '- none -')

	// Initiate payment: first, check to see if card is valid.
	stripe.createSource(card, {
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
		.then(result => {
			paymentValidation(result)
			if (result.error) {
				setText('#card-errors', result.error.message)
				return false
			}
			else {
				const selected = $(eventSelect).index() - 1


				showElement('.stripe.processing')
				hideElement('.stripe.error')
				showElement('.notification-modal.processing')
				// Webflow submission
				$.ajax({
					type: 'POST',
					url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
					crossDomain: true,
					data: createForm(),
					dataType: 'json'
				})
					// Stripe submission
					.then(res => {
						return $.ajax({
							type: 'POST',
							url: stripeUrl,
							crossDomain: true,
							data: {
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
								'lodging': eventOptions[selected],
								'source': result.source.id
							},
							timeout: 15000
						})
							// Stripe charge succeeded
							.then(res => successfulSubmission())
							// Stripe charge failed or timed out
							.catch(err => {
								console.error(err)
								// $0 charge to save credit card details on custom charge form
								if (err.responseJSON && err.responseJSON.message === 'Invalid positive integer' && page() === 'Custom') {
									window.location.href = containsUrl('ecstaticliving.com')
										? 'https://www.ecstaticliving.com/updated-card'
										: 'https://ecstaticliving.webflow.io/updated-card'
								}
								else {
									const formData = createForm()
									formData.fields = err.statusText === 'timeout'
										? {
											ERROR: 'Did not receive successful payment confirmation from Stripe on previous registration made by ' + formData.fields.Party + '. Staff, please verify that payment went through. Customer was informed that registration completed successfully. If Stripe payment exists, no further action has to be taken; if Stripe payment is missing, please reach out to customer for payment.'
										}
										: {
											ERROR: 'The following error occurred on the previous registration made by ' + formData.fields.Party + '. Customer was notified of error, and payment likely did not go through. Error: ' + err
										}
									$.ajax({
										type: 'POST',
										url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
										crossDomain: true,
										data: formData,
										dataType: 'json'
									})
										// Redirect customer to successful event.
										.then(res => {
											// On timeout, it’s possible that Stripe charge went through, but too late. So we want to prevent customer from being told that it didn’t work, even though payment went through.
											if (err.statusText === 'timeout') {
												successfulSubmission()
											}
											else {
												indicateFailedSubmission('stripe')
											}
										})
										.catch(err => indicateFailedSubmission('stripe'))
								}
								return false
							})
					})
					// Webflow form failed or timed out
					.catch(err => indicateFailedSubmission('form'))

			}
		})
		.catch(err => alert(err))
})