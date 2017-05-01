// Stripe Module

//	STRIPE
$(`${eventButton}`).on('click', function() {
	var stripeTitle = eventStripe.split(' | ')
	saveEvent()
	var completeFunction = () => window.location.href = `${siteUrl}/registered`
	if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
		$customChargeForm.submit()
		var customerDescription = `${$(customFirstName).val()} ${$(customLastName).val()}`
		var chargeDescription = 'Custom Charge'
	} else {
		$registerForm.submit()
		var count = $(eventLodging).prop('selectedIndex') - 1
		if ($(eventDepositDeposit).is(':checked')) {
			eventPrice *= 100
			var eventDeposit = 'DEPOSIT'
		} else {
			eventPrice = $(eventLodging).val() * 100
			var eventDeposit = 'FULL'
		}
		var customerDescription = `${$(eventFirstName).val()} ${$(eventLastName).val()}`
		var chargeDescription = `${eventTitle} ${eventDates}, ${eventVenue}, ${$(eventLodging + ' option:selected').text().substring(0, $(eventLodging + ' option:selected').text().length - 17)}, ${eventDeposit}`
	}
	let paymentToken = false
	// pk_test_4kIoImMu4SrlfXGmfnApGp7E
	// pk_live_Vrm4z9BrnRFFE1PvogsOKiq5
	var handler = StripeCheckout.configure({
		key: 'pk_live_Vrm4z9BrnRFFE1PvogsOKiq5',
		image: 'https://daks2k3a4ib2z.cloudfront.net/564aac835a5735b1375b5cdf/56b9741e0758a4b421e7aa05_ELI-Logo-color-heart.jpg',
		locale: 'auto',
		name: 'Ecstatic Living',
		description: stripeTitle[count],
		billingAddress: true,
		amount: eventPrice,
		token: function(token) {
			paymentToken = true
			$.ajax({
				type: 'GET',
				url: 'https://www.ecstaticliving.institute/stripe/stripe_charge.php',
				crossDomain: true,
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'jsonpCallback',
				data: {
					'token_id': token.id,
					'email_address': customerDescription + ' <' + token.email + '>',
					'customerDescription': customerDescription,
					'amount': eventPrice,
					'chargeDescription': chargeDescription
				},
				success: completeFunction,
				complete: completeFunction,
				error: function(xhr, textStatus, errorThrown) {
					console.log(`${textStatus} ${errorThrown}`)
				}
			})
		}
	})
	handler.open({
		closed: function () {
			if(paymentToken === false) {
				console.log('Stripe closed prior to successful transaction.')
				resetEventForm()
			}
		}
	})
	$(window).on('popstate', function() {
		handler.close()
	})
})
