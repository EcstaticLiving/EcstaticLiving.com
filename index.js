/*
Code ©2016 Ecstatic Living Institute All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
$(document).ready(function() {

	//	DECLARATIONS
	//	General
	var siteUrl = 'http://www.ecstaticliving.com/',
		$main = $('.main'),
		$mainSection = $('.main-section'),

		//	Nav Menu
		$navMenu = $('.navigation-menu'),
		$navButton = $('.nav-menu-button'),
		$navContainer = $('.nav-container'),
		$navClose = $('.close-menu.nav-menu'),

		//	Intro Modal
		$introModal = $('.modals.introduction'),
		$introModalWindow = $('.modal-window.introduction'),

		//	Contact Modal
		$contactModal = $('.modals.contact'),
		$contactForm = $('.contact-form'),
		$contactSection = $('.contact-section'),
		$receivedSection = $('.received-section'),

		//	Register Modal
		$registerModal = $('.modals.register'),
		$registerModalMobile = $('.modals.register-mobile'),
		$modalBackground = $('.modal-background'),
		$registerForm = $('.form.registration.desktop'),
		$registerFormMobile = $('.form.registration.mobile'),
		$registrationSection = $('.registration-section.desktop'),
		$registrationSectionMobile = $('.registration-section.mobile'),
		$customChargeForm = $('.form.custom-charge.desktop'),
		$customChargeFormMobile = $('.form.custom-charge.mobile'),
		$paymentSection = $('.payment-section.desktop'),
		$paymentSectionMobile = $('.payment-section.mobile'),
		$confirmationModal = $('.modals.confirmation'),
		eventCode = $('.hidden.event-code').text().toLowerCase(),
		eventTitle = $('.hidden.event-title').text(), //	Needed for Stripe long description
		eventStartDate = $('.hidden.event-startdate').text(),
		eventDates = $('.hidden.event-dates').text(),
		eventVenue = $('.hidden.event-venue').text(),
		eventDeposit = $('.hidden.event-deposit').text(),
		eventLodgingOptions = $('.hidden.event-lodgingoptions').text(),
		eventLodgingPrices = $('.hidden.event-lodgingprices').text(),
		eventStripeDescriptions = $('.hidden.event-stripedescriptions').text()

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
		if (device == 'tablet') {
			//	Remove featured workshop on Reg Modal for tablets
			$('#register-column').css({
				'width': '100%'
			})
			$('#feature-column').hide()
			if (deviceOrientation == 'landscape') {
				$introModal.css({
					'padding-top': '25px'
				})
				$introModalWindow.css({
					'width': '520px'
				})
				//	Increase side padding for small screen
				$mainSection.css({
					'padding-left': '100px',
					'padding-right': '100px'
				})
				$registerModal.css({
					'padding-left': '190px',
					'padding-right': '190px'
				})
			} else {
				$introModal.css({
					'padding-top': '50px'
				})
				$introModalWindow.css({
					'width': '360px'
				})
				$mainSection.css({
					'padding-left': '30px',
					'padding-right': '30px'
				})
				$registerModal.css({
					'padding-left': '0px',
					'padding-right': '0px'
				})
			}
		}
	}

	$(window).on('load orientationchange', function() {
		initialize()
	})
	if (window.location.href == `${siteUrl} #1`) {
		$('#header-tab-1').click()
	}
	if (window.location.href == `${siteUrl} #2`) {
		$('#header-tab-2').click()
	}
	if (window.location.href == `${siteUrl} #3`) {
		$('#header-tab-3').click()
	}
	if (window.location.href == `${siteUrl} #4`) {
		$('#header-tab-4').click()
	}

	//	NAV MENU
	$navButton.on('click', function() {
		//	If nav menu is opened
		if ($navClose.is(':hidden')) {
			$modalBackground.css('position', 'fixed')
			if ((window.location.href == siteUrl) && ($('.top-marker').is(':visible'))) {
				$('.banner-container').hide()
			}
			$navContainer.show().animate({
				marginLeft: '0%'
			}, 500)
			$navClose.fadeTo(1000, 1).show()
		} else {
			$modalBackground.css('position', 'absolute')
			if ((window.location.href == siteUrl) && ($('.top-marker').is(':visible'))) {
				$('.banner-container').show()
			}
			$navContainer.animate({
				marginLeft: '100%'
			}, 500)
			$navClose.fadeTo(1000, 0).hide()
		}
	})
	//	If nav menu is closed
	$navClose.on('click', function() {
		$navButton.trigger('click')
	})

	//	SOCIAL SHARE KIT
	SocialShareKit.init({
		title: document.title
	})

	//	INTRO MODAL
	$('#button-modal-intro').on('click', function() {
		if ($(window).width() < 768) {
			window.open(`${siteUrl}mobile/introduction`)
		} //	If on mobile, open “Introduction” window instead of modal
		else {
			$modalBackground.css('position', 'fixed')
			$introModal.fadeTo(500, 1)
		}
	})

	//	CONTACT
	function clearContactModal() {
		$receivedSection.fadeTo(500, 0)
		$receivedSection.hide()
		$contactSection.fadeTo(500, 1)
		$contactSection.show()
		$('.w-form-done').hide()
		$('.w-form-fail').hide()
		$contactForm.show()
	}
	//	When “Contact Us” button is clicked
	$('.modal-contact-trigger').on('click', function() {
		if ($navClose.is(':visible')) {
			$navButton.trigger('click')
		}
		clearContactModal()
			//	If on mobile, open “Contact” window instead of modal
		if ($(window).width() < 768) {
			window.open(`${siteUrl}contact`)
		} else if (window.location.href.indexOf('/contact') == -1) {
			//	Only open “Contact” modal if not on “Contact” page.
			$contactModal.fadeTo(500, 1)
			$modalBackground.css('position', 'fixed')
		}
	})
	if (window.location.href.indexOf('/contact') != -1) {
		clearContactModal()
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
	$('.button.contact-close').on('click', function() {
		if (window.location.href.indexOf('/contact') > -1) {
			window.close()
		} else {
			$contactModal.fadeTo(500, 0).hide()
			$modalBackground.css('position', 'absolute')
		}
	})



	//	EVENT REGISTRATION
	var regButton = '.button.register'
	var regFirstName = '.input-field.register-firstname.desktop',
		regLastName = '.input-field.register-lastname.desktop',
		regEmail = '.input-field.register-email.desktop',
		regMobile = '.input-field.register-mobile.desktop',
		regBirthdate = '.input-field.register-birthdate.desktop',
		regGender = '.input-field.radio.register-gender.desktop',
		regFemale = '.register-female.desktop',
		regMale = '.register-male.desktop',
		regOther = '.register-other.desktop',
		regReferral = '.input-field.register-referral.desktop',
		regExp = '.input-field.register-experience.desktop',
		regExpYes = '.register-experience-yes.desktop',
		regExpNo = '.register-experience-no.desktop',
		regDiet = '.input-field.register-diet.desktop',
		regDietYes = '.register-diet-yes.desktop',
		regDietNo = '.register-diet-no.desktop',
		regType = '.input-field.register-type.desktop',
		regPartnerName = '.input-field.register-partnername.desktop',
		regPartnerGender = '.input-field.radio.register-partnergender.desktop',
		regPartnerFemale = '.register-partner-female.desktop',
		regPartnerMale = '.register-partner-male.desktop',
		regPartnerOther = '.register-partner-other.desktop',
		regPayBothText = '.register-payboth-text.desktop',
		regPayBoth = '.input-field.radio.register-payboth.desktop',
		regPayBothYes = '.register-payboth-yes.desktop',
		regPayBothNo = '.register-payboth-no.desktop',
		regLodging = '.input-field.register-lodging.desktop',
		regPayDeposit = '.register-paydeposit.desktop',
		regPayDepositText = '.register-paydeposit-text.desktop',
		regPayDepositFull = '.input-field.radio.register-paydeposit-full.desktop',
		regPayDepositOnly = '.input-field.radio.register-paydeposit-only.desktop',
		regTerms = '.register-termsandconditions.desktop',
		regContinue = '.button.register-continue.desktop',
		regReturn = '.register-return.desktop',
		regPayNow = '.button.register-paynow.desktop'
	var regFirstNameMobile = '.input-field.register-firstname.mobile',
		regLastNameMobile = '.input-field.register-lastname.mobile',
		regEmailMobile = '.input-field.register-email.mobile',
		regMobileMobile = '.input-field.register-mobile.mobile',
		regBirthdateMobile = '.input-field.register-birthdate.mobile',
		regGenderMobile = '.input-field.radio.register-gender.mobile',
		regFemaleMobile = '.register-female.mobile',
		regMaleMobile = '.register-male.mobile',
		regOtherMobile = '.register-other.mobile',
		regReferralMobile = '.input-field.register-referral.mobile',
		regExpMobile = '.input-field.register-experience.mobile',
		regExpYesMobile = '.register-experience-yes.mobile',
		regExpNoMobile = '.register-experience-no.mobile',
		regDietMobile = '.input-field.register-diet.mobile',
		regDietYesMobile = '.register-diet-yes.mobile',
		regDietNoMobile = '.register-diet-no.mobile',
		regTypeMobile = '.input-field.register-type.mobile',
		regPartnerNameMobile = '.input-field.register-partnername.mobile',
		regPartnerGenderMobile = '.input-field.radio.register-partnergender.mobile',
		regPartnerFemaleMobile = '.register-partner-female.mobile',
		regPartnerMaleMobile = '.register-partner-male.mobile',
		regPartnerOtherMobile = '.register-partner-other.mobile',
		regPayBothTextMobile = '.register-payboth-text.mobile',
		regPayBothMobile = '.input-field.radio.register-payboth.mobile',
		regPayBothYesMobile = '.register-payboth-yes.mobile',
		regPayBothNoMobile = '.register-payboth-no.mobile',
		regLodgingMobile = '.input-field.register-lodging.mobile',
		regPayDepositMobile = '.register-paydeposit.mobile',
		regPayDepositTextMobile = '.register-paydeposit-text.mobile',
		regPayDepositFullMobile = '.input-field.radio.register-paydeposit-full.mobile',
		regPayDepositOnlyMobile = '.input-field.radio.register-paydeposit-only.mobile',
		regTermsMobile = '.register-termsandconditions.mobile',
		regContinueMobile = '.button.register-continue.mobile',
		regReturnMobile = '.register-return.mobile',
		regPayNowMobile = '.button.register-paynow.mobile'
	var $regFeature = $('.register-feature'),
		$regFrame = $('.register-frame')

	//	Hides/reveals workshop information located at the bottom of the Events Template, and featured inside the Reg Modal.
	if (top == window) {
		$regFeature.hide()
	} else {
		$regFeature.show()
	}
	//	? icon inside Registration Modal
	$('#question-mark').jBox('Tooltip', {
		position: {
			x: 'right',
			y: 'center'
		},
		outside: 'x'
	})



	//	CART FUNCTIONS
	function saveForm() {
		var values = {};
		$('input, textarea, select').each(function() {
			if ($(this).is(':radio')) {
				if ($(this).is(':checked')) { values[$(this).attr('name')] = $(this).val() }
			}
			else {
				values[$(this).attr('name')] = $(this).val()
			}
		})
		sessionStorage.setItem('registration', JSON.stringify(values))
	}

	function repopulateForm() {
		if (sessionStorage.getItem('registration')) {
			var values = JSON.parse( sessionStorage.getItem('registration') )
			for (var item in values) {
				if ($('*[name=' + item + ']').is(':radio')) {
					$('input[name=' + item + '][value="' + values[item] + '"]').prop('checked', true)
				}
				else {
					$('*[name=' + item + ']').val(values[item])
				}
			}
			sessionStorage.removeItem('registration')
		}
	}

	function resetChargeFormMobile() {
		$customChargeFormMobile[0].reset()
		repopulateForm()
		$customChargeFormMobile.parsley()
		$customChargeFormMobile.show()
		$(regTermsMobile).attr('checked', false)
		$registerModalMobile.fadeIn()
	}

	function resetChargeForm() {
		$customChargeForm[0].reset()
		repopulateForm()
		$customChargeForm.parsley()
		$customChargeForm.show()
		$(regTerms).attr('checked', false)
		$regFrame.attr('src', `${window.location.href}#register-feature-charge`)
		$registerModal.fadeIn()
		$regFrame.delay(200).fadeTo(1000, 1)
	}

	function determineDepositDate() {
		eventDate = new Date(eventStartDate)
		depositDate = new Date(eventDate)
		if ((eventCode.substring(0, 3) != 'let') && (eventCode.substring(0, 4) != 'ctt')) {
			depositDate.setDate(eventDate.getDate() - 14)
		} else {
			depositDate.setDate(eventDate.getDate() - 21)
		}
		return depositDate
	}

	function resetRegFormMobile() {
		//	Keep background frozen while Reg Modal is loaded
		$modalBackground.css('position', 'fixed')
		$('.w-form-done').hide()
		$('.w-form-fail').hide()
		let depositDate = determineDepositDate()
		$registerFormMobile[0].reset()
		repopulateForm()
		$('.hidden.register-workshop.mobile').val(eventCode)
		if (new Date() < depositDate) {
			$(regPayDepositMobile).show()
			$(regPayDepositFullMobile).prop('checked', true)
		} else {
			$(regPayDepositMobile).hide()
		}
		$('#question-mark').hide()
		$registerFormMobile.parsley()
		$registerFormMobile.show()
		$(regTermsMobile).attr('checked', false)
		checkRegForm()
		$registerModalMobile.fadeIn()
	}

	function resetRegForm() {
		//	Keep background frozen while Reg Modal is loaded
		$modalBackground.css('position', 'fixed')
		$('.w-form-done').hide()
		$('.w-form-fail').hide()
		let depositDate = determineDepositDate()
		$registerForm[0].reset()
		repopulateForm()
		$('.hidden.register-workshop.desktop').val(eventCode)
		if (new Date() < depositDate) {
			$(regPayDeposit).show()
			$(regPayDepositFull).prop('checked', true)
		} else {
			$(regPayDeposit).hide()
		}
		$('#question-mark').show()
		$registerForm.parsley()
		$registerForm.show()
		$(regTerms).attr('checked', false)
		checkRegForm()
		$regFrame.attr('src', `${window.location.href}#register-feature`)
		$registerModal.fadeIn()
		$regFrame.delay(200).fadeTo(1000, 1)
	}

	function resetLodging(paymentStatus) {
		//	Adds lodging options based on CMS input
		var lodgingOptions = eventLodgingOptions.split(' | ')
		//	Adds lodging prices based on CMS input
		var lodgingPrices = eventLodgingPrices.split(' | ')
		$(regLodging).empty()
		$(regLodgingMobile).empty()
		if (lodgingOptions.length > 0) {
			if ((window.location.href == `${siteUrl}charge`) || (window.location.href == `${siteUrl}charge#`)) {
					$(regLodging + ', ' + regLodgingMobile).append($('<option>', {
						value: '',
						text: 'Select charge amount...'
					}))
			} else {
					$(regLodging + ', ' + regLodgingMobile).append($('<option>', {
						value: '',
						text: 'Event option...'
					}))
			}
		}
		paymentStatus = (paymentStatus) ? paymentStatus : ''
		const factor = (paymentStatus === 'for both') ? 2 : 1
		const spacer = (paymentStatus) ? ' ' : ''
		const closer = (paymentStatus || paymentStatus === '') ? ')' : ''
		for (let i = 0; i < lodgingOptions.length; i++) {
			$(regLodging).append($('<option>', {
				value: lodgingPrices[i] * factor,
				text: lodgingOptions[i] + ' ($' + lodgingPrices[i] * factor + spacer + paymentStatus + closer
			}))
			$(regLodgingMobile).append($('<option>', {
				value: lodgingPrices[i] * factor,
				text: lodgingOptions[i] + ' ($' + lodgingPrices[i] * factor + spacer + paymentStatus + closer
			}))
		}
		eventPrice = parseInt(eventDeposit) * factor
		$(regPayDepositText).text(`Pay deposit only ($${eventPrice}${spacer}${paymentStatus})`)
		$(regPayDepositTextMobile).text(`Pay deposit only ($${eventPrice}${spacer}${paymentStatus})`)
	}

	$(regButton).on('click', function() {
		// Causes Reg section to scroll smoothly on iOS
		document.getElementById('registration-section').style.webkitOverflowScrolling = 'touch'
		document.getElementById('registration-section-mobile').style.webkitOverflowScrolling = 'touch'
		resetLodging()
		if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
			if (device === 'mobile') { resetChargeFormMobile() }
			else { resetChargeForm() }
		} else {
			hideExperience()
			hideDiet()
			hidePartner()
			deActivateRegContinue()
			if (device == 'mobile') { resetRegFormMobile() }
			else { resetRegForm() }
		}
	})

	function deActivateRegContinue() {
		$(regContinue).prop('disabled', true)
		$(regContinue).css('background-color', '#cccccc')
		$(regContinueMobile).prop('disabled', true)
		$(regContinueMobile).css('background-color', '#cccccc')
	}

	function checkRegForm() {
		if (device == 'mobile') {
			if (
				(($(regFirstNameMobile).val() != '') && ($(regLastNameMobile).val() != '') && ($(regEmailMobile).val() != '') && ($(regMobileMobile).val() != '') && ($(regBirthdateMobile).val() != '')) &&
				(($(regFemaleMobile).is(':checked')) || ($(regMaleMobile).is(':checked')) || ($(regOtherMobile).is(':checked'))) &&
				(($(regReferralMobile).val() != '')) &&
				((($(regExpYesMobile).is(':checked')) && ($(regExpMobile).val() != '')) || ($(regExpNoMobile).is(':checked'))) &&
				((($(regDietYesMobile).is(':checked')) && ($(regDietMobile).val() != '')) || ($(regDietNoMobile).is(':checked'))) &&
				((
					(($(regTypeMobile).val() == 'Couple') || ($(regTypeMobile).val() == 'Two Singles (paired)')) &&
					($(regPartnerNameMobile).val() != '') &&
					(($(regPartnerFemaleMobile).is(':checked')) || ($(regPartnerMaleMobile).is(':checked')) || ($(regPartnerOtherMobile).is(':checked'))) &&
					($(regPayBothYesMobile).is(':checked') || ($(regPayBothNoMobile).is(':checked')))
				) || ($(regTypeMobile).val() == 'Single')) &&
				($(regLodgingMobile).val() != '') &&
				(($(regPayDepositMobile).is(':visible') && ($(regPayDepositFullMobile).is(':checked') || $(regPayDepositOnlyMobile).is(':checked'))) || ($(regPayDepositMobile).is(':hidden'))) &&
				($(regTermsMobile).is(':checked'))
			) {
				$(regContinueMobile).prop('disabled', false)
				$(regContinueMobile).css('background-color', '#9b3831')
			} else {
				deActivateRegContinue()
			}
		} else {
			if (
				(($(regFirstName).val() != '') && ($(regLastName).val() != '') && ($(regEmail).val() != '') && ($(regMobile).val() != '') && ($(regBirthdate).val() != '')) &&
				(($(regFemale).is(':checked')) || ($(regMale).is(':checked')) || ($(regOther).is(':checked'))) &&
				(($(regReferral).val() != '')) &&
				((($(regExpYes).is(':checked')) && ($(regExp).val() != '')) || ($(regExpNo).is(':checked'))) &&
				((($(regDietYes).is(':checked')) && ($(regDiet).val() != '')) || ($(regDietNo).is(':checked'))) &&
				((
					(($(regType).val() == 'Couple') || ($(regType).val() == 'Two Singles (paired)')) &&
					($(regPartnerName).val() != '') &&
					(($(regPartnerFemale).is(':checked')) || ($(regPartnerMale).is(':checked')) || ($(regPartnerOther).is(':checked'))) &&
					($(regPayBothYes).is(':checked') || ($(regPayBothNo).is(':checked')))
				) || ($(regType).val() == 'Single')) &&
				($(regLodging).val() != '') &&
				(($(regPayDeposit).is(':visible') && ($(regPayDepositFull).is(':checked') || $(regPayDepositOnly).is(':checked'))) || ($(regPayDeposit).is(':hidden'))) &&
				($(regTerms).is(':checked'))
			) {
				$(regContinue).prop('disabled', false)
				$(regContinue).css('background-color', '#9b3831')
			} else {
				deActivateRegContinue()
			}
		}
	}
	$(regFirstName + ',' + regLastName + ',' + regEmail + ',' + regMobile + ',' + regBirthdate + ',' + regFemale + ',' + regMale + ',' + regOther + ',' + regReferral + ',' + regExp + ',' + regDiet + ',' + regType + ',' + regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regLodging + ',' + regTerms).on('change', function() {
		//	Disable reg form verification for Charge form
		if ((window.location.href != `${siteUrl}charge`) && (window.location.href != `${siteUrl}charge#`)) {
			checkRegForm()
		}
	})
	$(regFirstNameMobile + ',' + regLastNameMobile + ',' + regEmailMobile + ',' + regMobileMobile + ',' + regBirthdateMobile + ',' + regFemaleMobile + ',' + regMaleMobile + ',' + regOtherMobile + ',' + regReferralMobile + ',' + regExpMobile + ',' + regDietMobile + ',' + regTypeMobile + ',' + regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regLodgingMobile + ',' + regTermsMobile).on('change', function() {
		//	Disable reg form verification for Charge form
		if ((window.location.href != `${siteUrl}charge`) && (window.location.href != `${siteUrl}charge`)) {
			checkRegForm()
		}
	})

	function showExperience() {
		$(regExp).show()
		$(regExp).prop('disabled', false)
		$(regExp).animate({
			top: 40,
			opacity: 1
		}, 200)
		$(regExpMobile).show()
		$(regExpMobile).prop('disabled', false)
		$(regExpMobile).animate({
			top: 40,
			opacity: 1
		}, 200)
	}

	function hideExperience() {
		$(regExp).val('')
		$(regExp).animate({
			top: 0,
			opacity: 0
		}, 200)
		$(regExp).prop('disabled', true)
		$(regExp).hide()
		$(regExpMobile).val('')
		$(regExpMobile).animate({
			top: 0,
			opacity: 0
		}, 200)
		$(regExpMobile).prop('disabled', true)
		$(regExpMobile).hide()
	}
	$(regExpNo + ',' + regExpYes).change(function() {
		if ($(regExpYes).is(':checked')) showExperience()
		if ($(regExpNo).is(':checked')) hideExperience()
	})
	$(regExpNoMobile + ',' + regExpYesMobile).change(function() {
		if ($(regExpYesMobile).is(':checked')) showExperience()
		if ($(regExpNoMobile).is(':checked')) hideExperience()
	})

	function showDiet() {
		$(regDiet).show()
		$(regDiet).prop('disabled', false)
		$(regDiet).animate({
			top: 0,
			opacity: 1
		}, 200)
		$(regDietMobile).show()
		$(regDietMobile).prop('disabled', false)
		$(regDietMobile).animate({
			top: 0,
			opacity: 1
		}, 200)
	}

	function hideDiet() {
		$(regDiet).val('')
		$(regDiet).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(regDiet).prop('disabled', true)
		$(regDiet).hide()
		$(regDietMobile).val('')
		$(regDietMobile).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(regDietMobile).prop('disabled', true)
		$(regDietMobile).hide()
	}
	$(regDietNo + ',' + regDietYes).change(function() {
		if ($(regDietYes).is(':checked')) showDiet()
		if ($(regDietNo).is(':checked')) hideDiet()
	})
	$(regDietNoMobile + ',' + regDietYesMobile).change(function() {
		if ($(regDietYesMobile).is(':checked')) showDiet()
		if ($(regDietNoMobile).is(':checked')) hideDiet()
	})

	function showPartner() {
		if (device == 'mobile') {
			$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).show()
			$(regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('disabled', false)
			$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).animate({
				top: 0,
				opacity: 1
			}, 200)
			if ($(regPayBothYesMobile).is(':checked')) {
				resetLodging('for both')
			} else {
				resetLodging('per person')
			}
		} else {
			$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).show()
			$(regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('disabled', false)
			$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).animate({
				top: 0,
				opacity: 1
			}, 200)
			if ($(regPayBothYes).is(':checked')) {
				resetLodging('for both')
			} else {
				resetLodging('per person')
			}
		}
	}

	function hidePartner() {
		if (device == 'mobile') {
			$(regPartnerNameMobile).val('')
			$(regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('checked', false)
			$(regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('disabled', true)
			$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).animate({
				top: -40,
				opacity: 0
			}, 200)
			$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).hide()
		} else {
			$(regPartnerName).val('')
			$(regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('checked', false)
			$(regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('disabled', true)
			$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).animate({
				top: -40,
				opacity: 0
			}, 200)
			$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).hide()
		}
		resetLodging()
	}

	function participants() {
		if (device == 'mobile') {
			if (($(regTypeMobile).find('option:selected').val() == 'Couple') || ($(regTypeMobile).find('option:selected').val() == 'Two Singles (paired)')) {
				return 2
			} else if ($(regTypeMobile).find('option:selected').val() == 'Single') {
				return 1
			}
		} else {
			if (($(regType).find('option:selected').val() == 'Couple') || ($(regType).find('option:selected').val() == 'Two Singles (paired)')) {
				return 2
			} else if ($(regType).find('option:selected').val() == 'Single') {
				return 1
			}
		}
	}
	$(`${regType}, ${regTypeMobile}`).change(function() {
		if (participants() == 2) {
			showPartner()
		} else {
			hidePartner()
		}
	})
	$(regPayBothNo + ',' + regPayBothYes).change(function() {
		if ($(regPayBothYes).is(':checked')) {
			resetLodging('for both')
		} else if (participants() == 2) {
			resetLodging('per person')
		} else {
			resetLodging('')
		}
	})
	$(regPayBothNoMobile + ',' + regPayBothYesMobile).change(function() {
		if ($(regPayBothYesMobile).is(':checked')) {
			resetLodging('for both')
		} else if (participants() == 2) {
			resetLodging('per person')
		} else {
			resetLodging('')
		}
	})

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
				paymentToken = true;
				$.ajax({
					type: 'GET',
					url: 'http://www.lifepurposeapp.com/temp/stripe_charge.php',
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

	//	CLOSE MODALS, WINDOWS
	function closeModals() {
		if (($registerModal.is(':visible')) || ($registerModalMobile.is(':visible')) || ($confirmationModal.is(':visible')) || ($contactModal.is(':visible')) || ($introModal.is(':visible'))) {
			$modalBackground.css('position', 'absolute')
			$registerModal.fadeOut()
			$registerModalMobile.fadeOut()
			$confirmationModal.fadeOut()
			$contactModal.fadeOut()
			$introModal.fadeOut()
		}
	}
	$('.close-modal, .button.notice, .button.contact-close, .close-mobile-reg').click(closeModals)
	$('#registration-ok-button').on(closeModals)
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			closeModals()
		}
	})
	$('.close-event, .navigate-back').on('click', function() {
		if (document.referrer == '') {
			window.location.href = '/'
		} else {
			parent.history.back()
		}
		return false
	})

})
