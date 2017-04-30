// Event registration



function participants() {
	if (($(eventStatus).find('option:selected').val() === 'Couple') || ($(eventStatus).find('option:selected').val() === 'Two Singles (paired)')) {
		return 2
	} else if ($(eventStatus).find('option:selected').val() === 'Single') {
		return 1
	}
}



function validationPersonal() {
	if (($(eventFirstName).val() !== '') && ($(eventLastName).val() !== '') && ($(eventEmail).val() !== '') && ($(eventMobile).val() !== '') && ($(eventBirthdate).val() !== '')) &&
		(($(eventFemale).is(':checked')) || ($(eventMale).is(':checked')) || ($(eventOther).is(':checked')))) {
		return true
	}
	return false
}
function validationDetails() {
	if ((($(eventReferral).val() !== '')) &&
		((($(eventExperienceYes).is(':checked')) && ($(eventExperienceDetails).val() !== '')) || ($(eventExperienceNo).is(':checked'))) &&
		((($(eventDietYes).is(':checked')) && ($(eventDietDetails).val() !== '')) || ($(eventDietNo).is(':checked')))) {
		return true
	}
	return false
}
function validationStatus() {
	if (((participants() === 2)
			&& ($(eventPartnerName).val() !== '')
			&& (($(eventPartnerFemale).is(':checked')) || ($(eventPartnerMale).is(':checked')) || ($(eventPartnerOther).is(':checked')))
			&& ($(eventPayBoth).is(':checked') || ($(eventPayMe).is(':checked'))))
		|| (participants() === 1)) {
		return true
	}
	return false
}
function validationLodging() {
	if (($(eventLodging).val() !== '') && (
		($(eventDepositContainer).is(':visible') && ($(eventDepositFull).is(':checked') || $(eventDepositDeposit).is(':checked')))
		|| ($(eventDepositContainer).is(':hidden'))
	)) {
		return true
	}
	return false
}
function eventValidation() {
	if (validationPersonal() && validationDetails() && validationStatus() && validationLodging() && $(eventTerms).is(':checked')) {
		$(eventButton).prop('disabled', false)
		$(eventButton).css('background-color', '#800000')
	} else {
		$(eventButton).prop('disabled', true)
		$(regContinue).css('background-color', '')
	}
}
$(eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther + ',' + eventReferral + ',' + eventExperienceDetails + ',' + eventDietDetails + ',' + eventStatus + ',' + eventPartnerName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventLodging + ',' + eventTerms).on('change', function () {
	eventValidation()
})



// Reset Registration
function resetRegistration() {
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	$registerForm[0].reset()
	repopulateForm()
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
	$(regLodging).empty()
	if (lodgingOptions.length > 0) {
		$(regLodging).append($('<option>', {
			value: '',
			text: 'Event option...'
		}))
	}
	paymentStatus = paymentStatus ? paymentStatus : ''
	const factor = (paymentStatus === 'for both') ? 2 : 1
	const spacer = paymentStatus ? ' ' : ''
	const closer = (paymentStatus || paymentStatus === '') ? ')' : ''
	for (let i = 0; i < lodgingOptions.length; i++) {
		$(regLodging).append($('<option>', {
			value: lodgingPrices[i] * factor,
			text: lodgingOptions[i] + ' ($' + lodgingPrices[i] * factor + spacer + paymentStatus + closer
		}))
	}
	eventPrice = parseInt(eventDeposit) * factor
	$(eventDepositText).text(`Pay deposit only ($${eventPrice}${spacer}${paymentStatus})`)
}



// EVENT PAGE
if (window.location.href.indexOf('/contact') > -1) {
	resetLodging()
	hideExperience()
	hideDiet()
	hidePartner()
	eventValidation()
	resetRegistration()
}
