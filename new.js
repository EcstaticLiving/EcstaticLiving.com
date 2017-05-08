/*
Code ©2017 Ecstatic Living Institute All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
var Webflow = Webflow || [];
Webflow.push(function () {

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
$receivedSection = $('.received-section')

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

// Countries
var countriesfile = "United States, Canada, Afghanistan, Albania, Algeria, Andorra, Angola, Antigua & Deps, Argentina, Armenia, Australia, Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, Belgium, Belize, Benin, Bhutan, Bolivia, Bosnia Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina, Burma, Burundi, Cambodia, Cameroon, Cape Verde, Central African Rep, Chad, Chile, People's Republic of China, Republic of China, Colombia, Comoros, Democratic Republic of the Congo, Republic of the Congo, Costa Rica, Croatia, Cuba, Cyprus, Czech Republic, Danzig, Denmark, Djibouti, Dominica, Dominican Republic, East Timor, Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Estonia, Ethiopia, Fiji, Finland, France, Gabon, Gaza Strip, The Gambia, Georgia, Germany, Ghana, Greece, Grenada, Guatemala, Guinea, Guinea-Bissau, Guyana, Haiti, Holy Roman Empire, Honduras, Hungary, Iceland, India, Indonesia, Iran, Iraq, Republic of Ireland, Israel, Italy, Ivory Coast, Jamaica, Japan, Jonathanland, Jordan, Kazakhstan, Kenya, Kiribati, North Korea, South Korea, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Macedonia, Madagascar, Malawi, Malaysia, Maldives, Mali, Malta, Marshall Islands, Mauritania, Mauritius, Mexico, Micronesia, Moldova, Monaco, Mongolia, Montenegro, Morocco, Mount Athos, Mozambique, Namibia, Nauru, Nepal, Newfoundland, Netherlands, New Zealand, Nicaragua, Niger, Nigeria, Norway, Oman, Ottoman Empire, Pakistan, Palau, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Poland, Portugal, Prussia, Qatar, Romania, Rome, Russian Federation, Rwanda, St Kitts & Nevis, St Lucia, Saint Vincent & the, Grenadines, Samoa, San Marino, Sao Tome & Principe, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, Solomon Islands, Somalia, South Africa, Spain, Sri Lanka, Sudan, Suriname, Swaziland, Sweden, Switzerland, Syria, Tajikistan, Tanzania, Thailand, Togo, Tonga, Trinidad & Tobago, Tunisia, Turkey, Turkmenistan, Tuvalu, Uganda, Ukraine, United Arab Emirates, United Kingdom, Uruguay, Uzbekistan, Vanuatu, Vatican City, Venezuela, Vietnam, Yemen, Zambia, Zimbabwe";
var countries = countriesfile.split(', ');
for(var i = 0; i < countries.length; i++) {
	if (window.location.href.indexOf('/events/') > -1) {
		$('#event-billing-country').append('<option value="' + countries[i] + '">' + countries[i] + '</option>');
	} else {
		$('#country').append('<option value="' + countries[i] + '">' + countries[i] + '</option>');
	}
}

// Save Form
function saveForm(eventId) {
	var values = {};
	$('input, textarea, select').each(function() {
		if ($(this).is(':radio')) {
			if ($(this).is(':checked')) { values[$(this).attr('name')] = $(this).val() }
		}
		else {
			values[$(this).attr('name')] = $(this).val()
		}
	})
	localStorage.setItem(`EcstaticLiving:${eventId}`, JSON.stringify(values))
}

// Repopulate Saved Form
function repopulateForm(eventId) {
	if (localStorage.getItem(`EcstaticLiving:${eventId}`)) {
		var values = JSON.parse(localStorage.getItem(`EcstaticLiving:${eventId}`))
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



// FORMS AND QUESTIONNAIRS
if (window.location.href.indexOf('/forms/let-questionnaire') > -1) {
	repopulateForm('LET')
	$('.form.let').parsley()
	$('#let-button').on('click', function() { saveForm('LET') })
}
if (window.location.href.indexOf('/forms/elf-application') > -1) {
	repopulateForm('ELF')
	$('.form.elf').parsley()
	$('#elf-button').on('click', function() { saveForm('ELF') })
}
if (window.location.href.indexOf('/forms/ctt-application') > -1) {
	repopulateForm('CTT')
	$('.form.ctt').parsley()
	$('#ctt-button').on('click', function() { saveForm('CTT') })
}





// EVENT REGISTRATION
$eventForm = $('.form.registration'),
eventCode = $('#event-code').text().toLowerCase(),
eventTitle = $('#event-name').text(), // Stripe description
eventStartDate = $('#event-start').text(),
eventDates = $('#event-dates').text(),
eventVenue = $('#event-venue').text(),
eventDepositAmount = $('#event-deposit-amount').text(),
eventDepositDate = $('#event-deposit-date').text()

// Event variables
const payButton = '.button.pay',
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
eventSelect = '#event-option',
eventDepositContainer = '.event-container.deposit',
eventDepositText = '#event-deposit-text',
eventDepositFull = '#event-deposit-full',
eventDepositDeposit = '#event-deposit-deposit',
eventTerms = '#event-terms',
eventButton = '#event-button'

// Stripe billing variables
const billingFirstName = '#event-billing-firstname',
billingLastName = '#event-billing-lastname',
billingStreet = '#event-billing-street',
billingCity = '#event-billing-city',
billingState = '#event-billing-state',
billingPostal = '#event-billing-postal',
billingCountry = '#event-billing-country',
billingCard = '#card-details'

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
function validationPartner() {
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
function validationEventOptions() {
	if ($(eventSelect).val() && (
		($(eventDepositContainer).is(':visible') && ($(eventDepositFull).is(':checked') || $(eventDepositDeposit).is(':checked'))
		|| $(eventDepositContainer).is(':hidden'))
	)) {
		return true
	}
	return false
}
function validationBilling() {
	if ($(billingFirstName).val() !== '' && $(billingLastName).val() !== '' && $(billingStreet).val() !== '' && $(billingCity).val() !== ''
		&& $(billingState).val() !== '' && $(billingPostal).val() !== '' && $(billingCountry).val() !== '' && $(billingCard).is(':checked')) {
		return true
	}
	return false
}
function eventValidation() {
	if (validationPersonal() && validationDetails() && validationPartner() && validationEventOptions() && $(eventTerms).is(':checked') && validationBilling()) {
		$(eventButton).prop('disabled', false)
		$(eventButton).css({ 'background-color': '#800000' })
		$(eventButton).css({ 'color': '#ffffff' })
		return true
	}
	$(eventButton).prop('disabled', true)
	$(eventButton).css({ 'background-color': '#f5f5f5' })
	$(eventButton).css({ 'color': '#333333' })
	return false
}

// PARTNERSHIP
function showPartner() {
	$(eventPartnerContainer).show()
	$(eventPartnerContainer).animate({
		top: 0,
		opacity: 1
	}, 200)
	if ($(eventPayBoth).is(':checked')) {
		setEventSelect('for both')
	} else {
		setEventSelect('per person')
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
	setEventSelect()
}

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

// EVENT OPTIONS
function setEventSelect(people) {
	//	Adds event options & prices based on CMS input
	var eventOptions = $('#event-options').text().split(' | ')
	var eventPrices = $('#event-prices').text().split(' | ')
	$(eventSelect).empty()
	if (eventOptions.length > 0) {
		$(eventSelect).append($('<option>', {
			value: '',
			text: 'Event option...'
		}))
	}
	people = people ? people : ''
	const paymentFactor = (people === 'for both') ? 2 : 1
	const spacer = people ? ' ' : ''
	const closer = (people || people === '') ? ')' : ''
	for (var i = 0; i < eventOptions.length; i++) {
		$(eventSelect).append($('<option>', {
			value: eventPrices[i] * paymentFactor,
			text: eventOptions[i] + ' ($' + eventPrices[i] * paymentFactor + spacer + people + closer
		}))
	}
	const eventDepositPrice = parseInt(eventDepositAmount) * paymentFactor
	$(eventDepositText).text(`Pay deposit only ($${eventDepositPrice}${spacer}${people})`)
}

function resetEventForm() {
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	$eventForm[0].reset()
	repopulateForm('Event')
	if ($(eventPayBoth).is(':checked')) {
		setEventSelect('for both')
	} else if (participants() === 2) {
		setEventSelect('per person')
	} else {
		setEventSelect('')
	}
	$('#event').val(eventCode)
	if ($(eventExperienceNo).is(':checked')) hideExperience()
	if ($(eventDietNo).is(':checked')) hideDiet()
	if (participants() === 1) hidePartner()
	if (new Date() < new Date(eventDepositDate)) {
		$(eventDepositContainer).show()
		$(eventDepositFull).prop('checked', true)
	} else {
		$(eventDepositContainer).hide()
	}
	$eventForm.parsley()
	$eventForm.show()
	$(eventTerms).attr('checked', false)
	eventValidation()
}





// CUSTOM CHARGE
const $customForm = $('.form.custom-charge'),
customCode = '#custom-code',
customFirstName = '#custom-firstname',
customLastName = '#custom-lastname',
customEmail = '#custom-email',
customSelect = '#custom-select',
customTerms = '#custom-terms',
customCard = '#card-details',
customButton = '#custom-button'


// CUSTOM AMOUNT
function customValidation() {
	if ($(customFirstName).val() !== '' && $(customLastName).val() !== '' && $(customSelect).val() !== '' && $(customTerms).is(':checked') && $(customCard).is(':checked')) {
		$(customButton).prop('disabled', false)
		$(customButton).css({ 'background-color': '#800000' })
		$(customButton).css({ 'color': '#ffffff' })
		return true
	}
	$(customButton).prop('disabled', true)
	$(customButton).css({ 'background-color': '#f5f5f5' })
	$(customButton).css({ 'color': '#333333' })
	return false
}
$(customFirstName + ',' + customLastName + ',' + customSelect + ',' + customTerms + ',' + customCard).on('change', function () {
	customValidation()
})

function setCustomSelect() {
	//	Adds options & prices based on CMS input
	var customOptions = $('#custom-options').text().split(' | ')
	var customPrices = $('#custom-prices').text().split(' | ')
	$(customSelect).empty()
	if (customOptions.length > 0) {
		$(customSelect).append($('<option>', {
			value: '',
			text: 'Custom charge option...'
		}))
	}
	for (var i = 0; i < customOptions.length; i++) {
		$(customSelect).append($('<option>', {
			value: customPrices[i],
			text: customOptions[i] + ' - $' + customPrices[i]
		}))
	}
}

function resetCustomForm() {
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	$customForm[0].reset()
	repopulateForm('Custom')
	setCustomSelect()
	$customForm.parsley()
	$customForm.show()
	$(customTerms).attr('checked', false)
	customValidation()
}





// EVENT or CUSTOM CHARGE mode
var payMode = ''
if (window.location.href.indexOf('/events/') > -1) {
	payMode = 'Event'
	$(eventFirstName).on('change', function () {
		$(billingFirstName).val($(eventFirstName).val())
	})
	$(eventLastName).on('change', function () {
		$(billingLastName).val($(eventLastName).val())
	})
	$(eventDietNo + ',' + eventDietYes).on('change', function () {
		if ($(eventDietYes).is(':checked')) showDiet()
		if ($(eventDietNo).is(':checked')) hideDiet()
	})
	$(eventExperienceNo + ',' + eventExperienceYes).on('change', function () {
		if ($(eventExperienceYes).is(':checked')) showExperience()
		if ($(eventExperienceNo).is(':checked')) hideExperience()
	})
	$(eventStatus).on('change', function () {
		participants() === 2 ? showPartner() : hidePartner()
	})
	$(eventPayBoth + ',' + eventPayMe).on('change', function () {
		if ($(eventPayBoth).is(':checked')) {
			setEventSelect('for both')
		} else if (participants() === 2) {
			setEventSelect('per person')
		} else {
			setEventSelect('')
		}
	})
	const eventFieldsPersonal = eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther
	const eventFieldsDetails = eventReferral + ',' + eventExperienceYes + ',' + eventExperienceNo + ',' + eventExperienceDetails + ',' + eventDietYes + ',' + eventDietNo + ',' + eventDietDetails
	const eventFieldsPartner = eventStatus + ',' + eventPartnerName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther
	const eventFieldsOptions = eventSelect
	const eventFieldsBilling = billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry
	$(eventFieldsPersonal + ',' + eventFieldsDetails + ',' + eventFieldsPartner + ',' + eventFieldsOptions + ',' + eventTerms + ',' + eventFieldsBilling).on('change', function () {
		eventValidation()
	})
	resetEventForm()
} else if (window.location.href.indexOf('/charge') > -1) {
	payMode = 'Custom'
	resetCustomForm()
} else {
	payMode = null
}



// STRIPE
function paymentValidation(result) {
	const displayError = document.getElementById('card-errors')
	if (result.error) {
		displayError.textContent = result.error.message
	} else {
		displayError.textContent = ''
	}
	if (result.complete) {
		if (payMode === 'Event') {
			$(billingCard).prop('checked', true)
			eventValidation()
		} else {
			$(customCard).prop('checked', true)
			customValidation()
		}
	} else {
		if (payMode === 'Event') {
			$(billingCard).prop('checked', false)
			eventValidation()
		} else {
			$(customCard).prop('checked', false)
			customValidation()
		}
	}
}

// LIVE: https://wt-607887792589a1d1a518ce2c83b6dddd-0.run.webtask.io/stripe
// TEST: https://wt-607887792589a1d1a518ce2c83b6dddd-0.run.webtask.io/stripe-test
function stripeTokenHandler(token, data) {
	$.ajax({
		type: 'POST',
		url: 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.run.webtask.io/stripe-test',
		crossDomain: true,
		data: {
			'stripeToken': token.id,
			'stripeEmail': data.customerEmail,
			'stripeCustomer': data.customerDescription,
			'stripeCharge': data.chargeDescription,
			'stripeAmount': data.chargeAmount
		}
	})
	.then(function (res) {
		if (payMode === 'Event') {
			window.location.href = `${siteUrl}registered`
		} else {
			window.location.href = `${siteUrl}success`
		}
	})
	.fail(function (err) {
		alert('The payment did not go through. Please try again.');
		console.log(err);
	})
}

// LIVE: pk_live_0rULIvKhv6aSLqI49Ae5rflI
// TEST: pk_test_QO6tO6bHny3y10LjH96f4n3p
const stripe = Stripe('pk_test_QO6tO6bHny3y10LjH96f4n3p')
const elements = stripe.elements()
var fontSize = '';
// Desktop, tablet, and iPhone 6Plus: 16px, iPhone 6 or smaller: 12px
fontSize = (Math.min($(window).width(), $(window).height()) < 414) ? '13px' : '16px'
// iPhone 5: 11px
fontSize = (Math.min($(window).width(), $(window).height()) < 375) ? '11px' : fontSize
style = {
	base: {
		fontFamily: 'Lato',
		fontWeight: 300,
		color: '#333',
		fontSize,
		lineHeight: '24px',
		'::placeholder': {
			color: '#666',
		}
	},
	invalid: {
		color: '#b00000',
		':focus': {
			color: '#800000'
		}
	}
}
const card = elements.create('card', {
	hidePostalCode: true,
	style
})
card.mount('#card-element')
card.addEventListener('change', (result) => {
	paymentValidation(result)
})

$(`${payButton}`).on('click', function(e) {
	e.preventDefault()
	saveForm(payMode)
	var customerDescription = '', customerEmail = '', chargeDescription = '', chargeAmount = 0, count = 0
	if (payMode === 'Event') {
		count = $(eventSelect).prop('selectedIndex') - 1
		chargeAmount = $(eventDepositDeposit).is(':checked') ? eventDepositPrice * 100 : $(eventSelect).val() * 100
		const eventDeposit = $(eventDepositDeposit).is(':checked') ? 'DEPOSIT' : 'FULL'
		customerDescription = $(eventFirstName).val() + ' ' + $(eventLastName).val() + ' <' + $(eventEmail).val() + '>'
		customerEmail = $(eventEmail).val()
		chargeDescription = `${eventTitle} ${eventDates}, ${eventVenue}, ${$(eventSelect + ' option:selected').text().substring(0, $(eventSelect + ' option:selected').text().length - 16)}, ${eventDeposit}`
	} else {
		count = $(customSelect).prop('selectedIndex') - 1
		chargeAmount = $(customSelect).val() * 100
		customerDescription = $(customFirstName).val() + ' ' + $(customLastName).val() + ' <' + $(customEmail).val() + '>'
		customerEmail = $(customEmail).val()
		chargeDescription = `Custom Charge: ${$(customSelect + ' option:selected').text().substring(0, $(customSelect + ' option:selected').text().length - 16)}`
	}

	const billingData = {
		name: $(billingFirstName).val() + ' ' + $(billingLastName).val(),
		address_line1: $(billingStreet).val(),
		address_city: $(billingCity).val(),
		address_state: $(billingState).val(),
		address_zip: $(billingPostal).val(),
		address_country: $(billingCountry).val()
	}
	const serverData = {
		customerDescription,
		customerEmail,
		chargeDescription,
		chargeAmount
	}
	alert(card)
	stripe.createToken(card, billingData)
	.then(function(result) {
		if (result.error) {
			paymentValidation(result)
		} else {
			if (payMode === 'Event') {
				$eventForm.submit()
			} else {
				$customForm.submit()
			}
			stripeTokenHandler(result.token, serverData)
		}
	})
})

})
