// Stripe Module

//	STRIPE
$(`${regContinue}, ${regPayNow}`).on('click', function() {
	var stripeTitle = eventStripe.split(' | ')
	saveForm()
	$registerForm.submit()
	var count = $(regLodging).prop('selectedIndex') - 1
	if ($(regPayDepositOnly).is(':checked')) {
		eventPrice *= 100
		var eventDeposit = 'DEPOSIT'
	} else {
		eventPrice = $(regLodging).val() * 100
		var eventDeposit = 'FULL'
	}
	var customerDescription = `${$(regFirstName).val()} ${$(regLastName).val()}`
	var completeFunction = function(data, textStatus, xhr) {
		$confirmationSection.fadeIn()
	}
	var chargeDescription = `${eventTitle} ${eventDates}, ${eventVenue}, ${$(regLodging + ' option:selected').text().substring(0, $(regLodging + ' option:selected').text().length - 17)}, ${eventDeposit}`
	if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
		$customChargeForm.submit()
		var chargeDescription = 'Custom Charge'
	}
	let paymentToken = false
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
				resetRegForm()
			}
		}
	})
	$(window).on('popstate', function() {
		handler.close()
	})
})
