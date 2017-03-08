// Stripe Module

//	STRIPE
$(`${regContinue}, ${regContinueMobile}, ${regPayNow}, ${regPayNowMobile}`).on('click', function() {
	var stripeTitle = eventStripeDescriptions.split(' | ')
	saveForm()
	if (device == 'mobile') {
		$registerFormMobile.submit()
		var count = $(regLodgingMobile).prop('selectedIndex') - 1
		if ($(regPayDepositOnlyMobile).is(':checked')) {
			eventPrice *= 100
			var eventDeposit = 'DEPOSIT'
		} else {
			eventPrice = $(regLodgingMobile).val() * 100
			var eventDeposit = 'FULL'
		}
		var customerDescription = `${$(regFirstNameMobile).val()} ${$(regLastNameMobile).val()}`
		var completeFunction = function(data, textStatus, xhr) {
			window.location.href = '/mobile/registered'
		}
		var chargeDescription = `${eventTitle} ${eventDates}, ${eventVenue}, ${$(regLodgingMobile + ' option:selected').text().substring(0, $(regLodgingMobile + ' option:selected').text().length - 17)}, ${eventDeposit}`
	} else {
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
			$modalBackground.css('position', 'fixed')
			$confirmationModal.fadeIn()
		}
		var chargeDescription = `${eventTitle} ${eventDates}, ${eventVenue}, ${$(regLodging + ' option:selected').text().substring(0, $(regLodging + ' option:selected').text().length - 17)}, ${eventDeposit}`
		$modalBackground.css('position', 'absolute')
	}
	if ((window.location.href == `${siteUrl}charge`) || (window.location.href == `${siteUrl}charge#`)) {
		if (device == 'mobile') {
			$customChargeFormMobile.submit()
		} else {
			$customChargeForm.submit()
		}
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
					$modalBackground.css('position', 'absolute')
					console.log(`${textStatus} ${errorThrown}`)
				}
			})
		}
	})
	if (device == 'mobile') {
		$registerModalMobile.fadeOut()
	} else {
		$registerModal.fadeOut()
	}
	handler.open({
		closed: function () {
			if(paymentToken === false) {
				console.log('Stripe closed prior to successful transaction.')
				if (device == 'mobile') {
					resetRegFormMobile()
				} else {
					resetRegForm()
				}
			}
		}
	})
	$(window).on('popstate', function() {
		handler.close()
	})
})
