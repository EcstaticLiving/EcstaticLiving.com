//	Form module
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
		depositDate.setDate(eventDate.getDate() - eventDepositDue)
	} else {
		depositDate.setDate(eventDate.getDate() - eventDepositDue)
	}
	return depositDate
}

function resetRegFormMobile() {
	//	Keep background frozen while Reg Modal is loaded
	$mainContainer.css('position', 'fixed')
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
	$mainContainer.css('position', 'fixed')
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
