// Event registration module

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
		depositDate.setDate(eventDate.getDate() - eventDepositDue)
	} else {
		depositDate.setDate(eventDate.getDate() - eventDepositDue)
	}
	return depositDate
}

function resetRegForm() {
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
	if (lodgingOptions.length > 0) {
		if ((window.location.href == `${siteUrl}charge`) || (window.location.href == `${siteUrl}charge#`)) {
				$(regLodging).append($('<option>', {
					value: '',
					text: 'Select charge amount...'
				}))
		} else {
				$(regLodging).append($('<option>', {
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
	}
	eventPrice = parseInt(eventDeposit) * factor
	$(regPayDepositText).text(`Pay deposit only ($${eventPrice}${spacer}${paymentStatus})`)
}

$(regButton).on('click', function() {
	// Causes Reg section to scroll smoothly on iOS
	document.getElementById('registration-section').style.webkitOverflowScrolling = 'touch'
	document.getElementById('registration-section-mobile').style.webkitOverflowScrolling = 'touch'
	resetLodging()
	if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
		resetChargeForm()
	} else {
		hideExperience()
		hideDiet()
		hidePartner()
		deActivateRegContinue()
		resetRegForm()
	}
})

function deActivateRegContinue() {
	$(regContinue).prop('disabled', true)
	$(regContinue).css('background-color', '#cccccc')
}

function checkRegForm() {
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
	$(regFirstName + ',' + regLastName + ',' + regEmail + ',' + regMobile + ',' + regBirthdate + ',' + regFemale + ',' + regMale + ',' + regOther + ',' + regReferral + ',' + regExp + ',' + regDiet + ',' + regType + ',' + regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regLodging + ',' + regTerms).on('change', function() {
		//	Disable reg form verification for Charge form
		if ((window.location.href != `${siteUrl}charge`) && (window.location.href != `${siteUrl}charge#`)) {
			checkRegForm()
		}
	})
}

function showExperience() {
	$(regExp).show()
	$(regExp).prop('disabled', false)
	$(regExp).animate({
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
}
$(regExpNo + ',' + regExpYes).change(function() {
	if ($(regExpYes).is(':checked')) showExperience()
	if ($(regExpNo).is(':checked')) hideExperience()
})

function showDiet() {
	$(regDiet).show()
	$(regDiet).prop('disabled', false)
	$(regDiet).animate({
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
}
$(regDietNo + ',' + regDietYes).change(function() {
	if ($(regDietYes).is(':checked')) showDiet()
	if ($(regDietNo).is(':checked')) hideDiet()
})

function showPartner() {
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

function hidePartner() {
	$(regPartnerName).val('')
	$(regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('checked', false)
	$(regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('disabled', true)
	$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).animate({
		top: -40,
		opacity: 0
	}, 200)
	$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).hide()
	resetLodging()
}

function participants() {
	if (($(regType).find('option:selected').val() == 'Couple') || ($(regType).find('option:selected').val() == 'Two Singles (paired)')) {
		return 2
	} else if ($(regType).find('option:selected').val() == 'Single') {
		return 1
	}
}
$(regType).change(function() {
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
