/*
Code ©2016 Ecstatic Living Institute All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
$(document).ready(function () {
	// DECLARATIONS
	// General
	const $main = $('.main'),
	$mainSection = $('.main-section'),

	// Nav Menu
	$navMenu = $('.navigation-menu'),
	$navContainer = $('.nav-container'),

	// Contact
	$contactForm = $('.contact-form'),
	$contactSection = $('.contact-section'),
	$receivedSection = $('.received-section'),

	// Custom Charge
	$customChargeForm = $('.form.custom-charge')

	// Initialization Module
	const siteUrl = 'https://www.ecstaticliving.com/'

	//	INITIALIZE
	function initialize() {
		if (Math.min($(window).width(), $(window).height()) >= 320) {
			device = 'mobile'
		}
		if (Math.min($(window).width(), $(window).height()) >= 641) {
			device = 'tablet'
		}
		//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
		if (Math.max($(window).width(), $(window).height()) >= 1025) {
			device = 'desktop'
		}
		if ($(window).width() > $(window).height()) {
			deviceOrientation = 'landscape'
		} else {
			deviceOrientation = 'portrait'
		}
		if (device === 'tablet') {
			if (deviceOrientation === 'landscape') {
				//	Increase side padding for small screen
				$mainSection.css({
					'padding-left': '100px',
					'padding-right': '100px'
				})
			} else {
				$mainSection.css({
					'padding-left': '30px',
					'padding-right': '30px'
				})
			}
		}
	}

	$(window).on('load orientationchange', function() {
		initialize()
	})



	// NAV MENU
	const $navButton = $('.menu-icon')
	const $navClose = $('.nav-close')
	// If nav menu is opened
	$navButton.on('click', function() {
		//	If nav menu is opened
		if ($navClose.is(':hidden')) {
			$navContainer.show().animate({
				marginLeft: '0%'
			}, 500)
			$navClose.fadeTo(1000, 1).show()
		} else {
			$navContainer.animate({
				marginLeft: '100%'
			}, 500)
			$navClose.fadeTo(1000, 0).hide()
		}
	})
	// If nav menu is closed
	$navClose.on('click', function() {
		$navButton.trigger('click')
	})

	// SOCIAL SHARE KIT
	SocialShareKit.init({
		title: document.title
	})

	// BACK BUTTON
	$('.navigate-back').on('click', function() {
		if (document.referrer === '') {
			window.location.href = '/'
		} else {
			parent.history.back()
		}
		return false
	})



	//	CONTACT
	if (window.location.href.indexOf('/contact') > -1) {
		$receivedSection.fadeTo(500, 0)
		$receivedSection.hide()
		$contactSection.fadeTo(500, 1)
		$contactSection.show()
		$('.w-form-done').hide()
		$('.w-form-fail').hide()
		$contactForm.show()
	}
	//	Contact form complete, send user to confirmation
	$('.button.contact').on('click', function() {
		$contactForm.parsley()
		if ($contactForm.parsley().validate()) {
			$contactForm.submit()
			$contactSection.fadeTo(500, 0)
			$contactSection.hide()
			$receivedSection.show()
			$receivedSection.fadeTo(500, 1)
		}
	})


	// FORMS
	if (window.location.href.indexOf('/forms/let-questionnaire') > -1) { $('.form.let').parsley() }
	if (window.location.href.indexOf('/forms/elf-application') > -1) { $('.form.elf').parsley() }
	if (window.location.href.indexOf('/forms/ctt-application') > -1) { $('.form.ctt').parsley() }

	// Registration
	$registrationSection = $('.registration-section'),
	$confirmationSection = $('.confirmation-section'),
	$registerForm = $('.form.registration'),
	eventCode = $('#event-code').text().toLowerCase(),
	eventTitle = $('#event-name').text(), // Stripe description
	eventStartDate = $('#event-start').text(),
	eventDates = $('#event-dates').text(),
	eventVenue = $('#event-venue').text(),
	eventDepositAmount = $('#event-deposit-amount').text(),
	eventDepositDate = $('#event-deposit-date').text(),
	eventLodgingOptions = $('#event-lodging-options').text(),
	eventLodgingPrices = $('#event-lodging-prices').text(),
	eventStripe = $('#event-stripe').text()

	// Event initialization
	const eventButton = '.button.register',
	eventFirstName = '#event-firstname',
	eventLastName = '#event-lastname',
	eventEmail = '#event-email',
	eventMobile = '#event-mobile',
	eventBirthdate = '#event-birthdate',
	eventFemale = '#event-gender-female',
	eventMale = '#event-gender-male',
	eventOther = '#event-gender-other',
	eventReferral = '#event-referral',
	eventExperienceContainer = '.event-container.experience',
	eventExperienceYes = '#event-experience-yes',
	eventExperienceNo = '#event-experience-no',
	eventExperienceDetails = '#event-experience-details',
	eventDietContainer = '.event-container.diet',
	eventDietYes = '#event-diet-yes',
	eventDietNo = '#event-diet-no',
	eventDietDetails = '#event-diet-details'
	eventStatus = '#event-status',
	eventPartnerContainer = '.event-container.partner',
	eventPartnerName = '#event-partner-name'
	eventPartnerFemale = '#event-partner-gender-female',
	eventPartnerMale = '#event-partner-gender-male',
	eventPartnerOther = '#event-partner-gender-other',
	eventPayBoth = '#event-pay-both',
	eventPayMe = '#event-pay-me',
	eventLodging = '#event-lodging',
	eventDepositContainer = '.event-container.deposit',
	eventDepositText = '#event-deposit-text',
	eventDepositFull = '#event-deposit-full',
	eventDepositDeposit = '#event-deposit-deposit',
	eventTerms = '#event-terms'

	// SAVE FORM
	function saveEvent() {
		var values = {};
		$('input, textarea, select').each(function() {
			if ($(this).is(':radio')) {
				if ($(this).is(':checked')) { values[$(this).attr('name')] = $(this).val() }
			}
			else {
				values[$(this).attr('name')] = $(this).val()
			}
		})
		const url = window.location.href
		const s = (url.indexOf('/events/') > -1) ? url.split('/').pop() : null
		const eventId = s.substr(0, s.indexOf('#') === -1 ? s.length : s.indexOf('#'))
		localStorage.setItem(`EcstaticLiving:Event`, JSON.stringify(values))
	}

	// REPOPULATE SAVED FORM
	function repopulateEvent() {
		const url = window.location.href
		const s = (url.indexOf('/events/') > -1) ? url.split('/').pop() : null
		const eventId = s.substr(0, s.indexOf('#') === -1 ? s.length : s.indexOf('#'))
		if (localStorage.getItem(`EcstaticLiving:Event`)) {
			var values = JSON.parse(localStorage.getItem(`EcstaticLiving:Event`))
			for (var item in values) {
				if ($('*[name=' + item + ']').is(':radio')) {
					$('input[name=' + item + '][value="' + values[item] + '"]').prop('checked', true)
				}
				else {
					$('*[name=' + item + ']').val(values[item])
				}
			}
		}
	}

	// PARTICIPANTS
	function participants() {
		if (($(eventStatus).find('option:selected').val() === 'Couple') || ($(eventStatus).find('option:selected').val() === 'Two Singles (paired)')) {
			return 2
		} else if ($(eventStatus).find('option:selected').val() === 'Single') {
			return 1
		}
	}

	// FORM VALIDATION
	function validationPersonal() {
		if ($(eventFirstName).val() !== '' && $(eventLastName).val() !== '' && $(eventEmail).val() !== '' && $(eventMobile).val() !== '' && $(eventBirthdate).val() !== '' &&
			($(eventFemale).is(':checked') || $(eventMale).is(':checked') || $(eventOther).is(':checked'))) {
			return true
		}
		return false
	}
	function validationDetails() {
		if ($(eventReferral).val() !== ''
			&& (($(eventExperienceYes).is(':checked') && $(eventExperienceDetails).val() !== '') || $(eventExperienceNo).is(':checked'))
			&& (($(eventDietYes).is(':checked') && $(eventDietDetails).val() !== '') || $(eventDietNo).is(':checked'))) {
			return true
		}
		return false
	}
	function validationStatus() {
		if (
			(participants() === 2
				&& $(eventPartnerName).val() !== ''
				&& ($(eventPartnerFemale).is(':checked') || $(eventPartnerMale).is(':checked') || $(eventPartnerOther).is(':checked'))
				&& ($(eventPayBoth).is(':checked') || $(eventPayMe).is(':checked')))
			|| participants() === 1
		) {
			return true
		}
		return false
	}
	function validationLodging() {
		if ($(eventLodging).val() !== '' && (
			$(eventDepositContainer).is(':visible') && ($(eventDepositFull).is(':checked') || $(eventDepositDeposit).is(':checked'))
		) || $(eventDepositContainer).is(':hidden')) {
			return true
		}
		return false
	}
	function eventValidation() {
		if (validationPersonal() && validationDetails() && validationStatus() && validationLodging() && $(eventTerms).is(':checked')) {
			document.getElementById('register-button').disabled = false
			$(eventButton).css({ 'background-color': '#800000' })
			$(eventButton).css({ 'color': '#ffffff' })
		} else {
			document.getElementById('register-button').disabled = true
			$(eventButton).css({ 'background-color': '#f5f5f5' })
			$(eventButton).css({ 'color': '#333333' })
		}
	}
	$(eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther + ',' + eventReferral + ',' + eventExperienceYes + ',' + eventExperienceNo + ',' + eventExperienceDetails + ',' + eventDietYes + ',' + eventDietNo + ',' + eventDietDetails + ',' + eventStatus + ',' + eventPartnerName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventLodging + ',' + eventTerms).on('change', function () {
		eventValidation()
	})

	// PARTNERSHIP
	function showPartner() {
		$(eventPartnerContainer).show()
		$(eventPartnerContainer).animate({
			top: 0,
			opacity: 1
		}, 200)
		if ($(eventPayBoth).is(':checked')) {
			resetLodging('for both')
		} else {
			resetLodging('per person')
		}
	}

	function hidePartner() {
		$(eventPartnerName).val('')
		$(eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe).prop('checked', false)
		$(eventPartnerContainer).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(eventPartnerContainer).hide()
		resetLodging()
	}

	$(eventStatus).change(function() {
		participants() === 2 ? showPartner() : hidePartner()
	})

	$(eventPayBoth + ',' + eventPayMe).change(function() {
		if ($(eventPayBoth).is(':checked')) {
			resetLodging('for both')
		} else if (participants() === 2) {
			resetLodging('per person')
		} else {
			resetLodging('')
		}
	})

	// PREVIOUS EXPERIENCE
	function showExperience() {
		$(eventExperienceContainer).show()
		$(eventExperienceContainer).animate({
			top: 40,
			opacity: 1
		}, 200)
	}

	function hideExperience() {
		$(eventExperienceDetails).val('')
		$(eventExperienceContainer).animate({
			top: 0,
			opacity: 0
		}, 200)
		$(eventExperienceContainer).hide()
	}

	$(eventExperienceNo + ',' + eventExperienceYes).change(function() {
		if ($(eventExperienceYes).is(':checked')) showExperience()
		if ($(eventExperienceNo).is(':checked')) hideExperience()
	})

	// DIETARY NEEDS
	function showDiet() {
		$(eventDietContainer).show()
		$(eventDietContainer).animate({
			top: 0,
			opacity: 1
		}, 200)
	}

	function hideDiet() {
		$(eventDietDetails).val('')
		$(eventDietContainer).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(eventDietContainer).hide()
	}

	$(eventDietNo + ',' + eventDietYes).change(function() {
		if ($(eventDietYes).is(':checked')) showDiet()
		if ($(eventDietNo).is(':checked')) hideDiet()
	})

	// LODGING
	function resetLodging(paymentStatus) {
		//	Adds lodging options & prices based on CMS input
		var lodgingOptions = eventLodgingOptions.split(' | ')
		var lodgingPrices = eventLodgingPrices.split(' | ')
		$(eventLodging).empty()
		if (lodgingOptions.length > 0) {
			$(eventLodging).append($('<option>', {
				value: '',
				text: 'Event option...'
			}))
		}
		paymentStatus = paymentStatus ? paymentStatus : ''
		const paymentFactor = (paymentStatus === 'for both') ? 2 : 1
		const spacer = paymentStatus ? ' ' : ''
		const closer = (paymentStatus || paymentStatus === '') ? ')' : ''
		for (let i = 0; i < lodgingOptions.length; i++) {
			$(eventLodging).append($('<option>', {
				value: lodgingPrices[i] * paymentFactor,
				text: lodgingOptions[i] + ' ($' + lodgingPrices[i] * paymentFactor + spacer + paymentStatus + closer
			}))
		}
		eventPrice = parseInt(eventDepositAmount) * paymentFactor
		$(eventDepositText).text(`Pay deposit only ($${eventPrice}${spacer}${paymentStatus})`)
	}

	// SHOW REGISTRATION
	function showRegistration() {
		$registrationSection.show()
		$confirmationSection.hide()
	}

	// SHOW CONFIRMATION
	function showConfirmation() {
		$registrationSection.hide()
		$confirmationSection.show()
	}

	function resetEventForm() {
		showRegistration()
		$('.w-form-done').hide()
		$('.w-form-fail').hide()
		$registerForm[0].reset()
		repopulateEvent()
		resetLodging()
		if ($(eventExperienceDetails).val() === '') hideExperience()
		if ($(eventDietDetails).val() === '') hideDiet()
		if ($(eventPartnerName).val() === '') hidePartner()
		eventValidation()
		if (new Date() < new Date(eventDepositDate)) {
			$(eventDepositContainer).show()
			$(eventDepositFull).prop('checked', true)
		} else {
			$(eventDepositContainer).hide()
		}
		$registerForm.parsley()
		$registerForm.show()
		$(eventTerms).attr('checked', false)
		eventValidation()
	}

	// EVENT PAGE
	if (window.location.href.indexOf('/events/') > -1) {
		resetEventForm()
	}



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



	if (window.location.href.indexOf('/charge') > -1) {
		$customChargeForm[0].reset()
		$customChargeForm.parsley()
		$customChargeForm.show()
	}

})
