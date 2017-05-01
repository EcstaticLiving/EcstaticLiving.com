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
const eventButton = '.button.pay',
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
	localStorage.setItem('EcstaticLiving:Event', JSON.stringify(values))
}

// REPOPULATE SAVED FORM
function repopulateEvent() {
	if (localStorage.getItem('EcstaticLiving:Event')) {
		var values = JSON.parse(localStorage.getItem('EcstaticLiving:Event'))
		for (var item in values) {
			if ($('*[name=' + item + ']').is(':radio')) {
				$('input[name=' + item + '][value="' + values[item] + '"]').prop('checked', true)
			}
			else {
				$('*[name=' + item + ']').val(values[item])
			}
		}
		localStorage.removeItem('EcstaticLiving:Event')
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
		console.log('*** VALID ***');
		$(eventButton).prop('disabled', false)
		document.getElementById('register-button').style.background = 'linear-gradient(bottom left, #800000, #b00000)'
		$(eventButton).css('color', '#333333')
	} else {
		console.log('invalid');
		$(eventButton).prop('disabled', true)
		document.getElementById('register-button').style.background = ''
		$(eventButton).css('color', '#ffffff')
	}
}
$(eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther + ',' + eventReferral + ',' + eventExperienceDetails + ',' + eventDietDetails + ',' + eventStatus + ',' + eventPartnerName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventLodging + ',' + eventTerms).on('change', function () {
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
