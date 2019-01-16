/*
Code ©2018 Ecstatic Living Institute. All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
if (window.location.href.indexOf('ecstaticliving.com') > -1) {
	console.log('Welcome to EcstaticLiving.com')
} else {
	console.log('TEST code at ', window.location.href)
}


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
const siteUrl = window.location.href.indexOf('ecstaticliving.com') > -1
	? 'https://www.ecstaticliving.com/'
	: 'https://ecstaticliving.webflow.io/'

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

var page
if (window.location.href.indexOf('/events/') > -1) {
	page = 'Event'
}
if (window.location.href.indexOf('/update') > -1) {
	page = 'Custom'
}
if (window.location.href.indexOf('/contact') > -1) {
	page = 'Contact'
}

// Browser validation
// The following code is embedded into ecstaticLiving.com/events. Make changes here, then insert into 'Events' template page on EcstaticLiving.com
/* <noscript>
	<div style="width:100%; max-width:400px; margin:auto; border:3px solid maroon; border-radius:10px; padding: 0px 20px 20px 20px; font-size: 18px;">
		<h3>Please enable JavaScript</h3>
		In order to register online, you will need to enable JavaScript. Otherwise, feel free to call us at 707-987-3456 to register by phone. For instructions on how to enable JavaScript on your browser, click the appropriate link below:<br /><br />
		<strong>Mobile</strong>: <a href="http://activatejavascript.org/en/instructions/ios#instructions" target="_blank" class="lpa-link">iOS</a> | <a href="http://activatejavascript.org/en/instructions/android#instructions" target="_blank" class="lpa-link">Android</a>
		<br /><br />
		<strong>Web</strong>: <a href="http://activatejavascript.org/en/instructions/chrome#instructions" target="_blank" class="lpa-link">Chrome</a> | <a href="http://activatejavascript.org/en/instructions/firefox#instructions" target="_blank" class="lpa-link">Firefox</a> | <a href="http://activatejavascript.org/en/instructions/safari#instructions" target="_blank" class="lpa-link">Safari</a> | <a href="http://activatejavascript.org/en/instructions/opera#instructions" target="_blank" class="lpa-link">Opera</a>
	</div>
</noscript>
<script src="https://ecstaticliving.github.io/ecstaticliving.com/platform.js"></script>
<script type="text/javascript">
	const isEdge = platform.name === 'Microsoft Edge'
	const isChrome = platform.name === 'Chrome' || platform.name === 'Chrome Mobile'
	const isFirefox = platform.name === 'Firefox' || platform.name === 'Firefox for iOS' || platform.name === 'Firefox Mobile'
	const isOpera = platform.name === 'Opera' || platform.name === 'Opera Mini' || platform.name === 'Opera Mobile'
	const isSafari = platform.name === 'Safari'
	if (!isEdge && !isChrome && !isFirefox && !isOpera && !isSafari) {
		document.write("<div style=\"width:100%; max-width:450px; margin:auto; border:3px solid maroon; border-radius:10px; padding: 0px 20px 20px 20px; font-size: 18px;\"><center><h3>Please use a different browser</h3></center>In order to register online, you will need to use a different browser. Otherwise, feel free to call us at 707-987-3456 to register by phone. For download links to usable browsers, click the appropriate link below:<br /><br /><strong>PC</strong>: <a href=\"https://www.microsoft.com/en-us/windows/microsoft-edge\" target=\"_blank\">Edge</a> | <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a><br /><br /><strong>Mac</strong>: <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | Safari | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a><br /><br /><strong>Mobile</strong>: <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | Safari | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a></div>")
	}
	const ua = window.navigator.userAgent
	const chromeVersion = parseInt(ua.split('Chrome/')[1], 10)
	const firefoxVersion = parseInt(ua.split('Firefox/')[1], 10)
	const operaVersion = parseInt(ua.split('OPR/')[1], 10)
	const safariVersion = parseInt(ua.split('Safari/')[1], 10)
	const isUCBrowser = ua.indexOf('UCBrowser/') > -1
	if ((isChrome && chromeVersion <= 41) || (isFirefox && firefoxVersion <= 32) || (isOpera && operaVersion <= 28) || (isSafari && !isUCBrowser && safariVersion === 6533)) {
		document.write("<div style=\"width:100%; max-width:450px; margin:auto; border:3px solid maroon; border-radius:10px; padding: 0px 20px 20px 20px; font-size: 18px;\"><center><h3>Please update your browser</h3></center>In order to register online, you will need to update your browser to its latest version. Otherwise, feel free to call us at 707-987-3456 to register by phone. For download links to the most up to date browsers, click the appropriate link below:<br /><br /><strong>PC</strong>: <a href=\"https://www.microsoft.com/en-us/windows/microsoft-edge\" target=\"_blank\">Edge</a> | <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a><br /><br /><strong>Mac</strong>: <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | Safari | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a><br /><br /><strong>Mobile</strong>: <a href=\"https://www.google.com/chrome/index.html\" target=\"_blank\">Chrome</a> | Safari | <a href=\"https://www.mozilla.org/en-US/firefox/new/\" target=\"_blank\">Firefox</a> | <a href=\"http://www.opera.com/download\" target=\"_blank\">Opera</a></div>")
	}
</script> */


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
if (page === 'Contact') {
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
var countries = countriesfile.split(', ')
for(var i = 0; i < countries.length; i++) {
	if (page === 'Event' || page === 'Custom') {
		if (countries[i] === 'United States') {
			$('#billing-country').append('<option value="' + countries[i] + '" selected>' + countries[i] + '</option>')
		} else {
			$('#billing-country').append('<option value="' + countries[i] + '">' + countries[i] + '</option>')
		}
	} else {
		if (countries[i] === 'United States') {
			$('#country').append('<option value="' + countries[i] + '" selected>' + countries[i] + '</option>')
		} else {
			$('#country').append('<option value="' + countries[i] + '">' + countries[i] + '</option>')
		}
	}
}

// Save Form
function saveForm(formType) {
	var values = {};
	$('input, textarea, select').each(function() {
		if ($(this).is(':radio')) {
			if ($(this).is(':checked')) { values[$(this).attr('name')] = $(this).val() }
		}
		else if ($(this).attr('name') !== 'Event-Invite-Code') {
			values[$(this).attr('name')] = $(this).val()
		}
	})
	localStorage.setItem('EcstaticLiving:' + formType, JSON.stringify(values))
}

// Repopulate Saved Form
function repopulateForm(formType) {
	if (localStorage.getItem('EcstaticLiving:' + formType)) {
		$('#form-load').hide()
		$('#form-clear').show()
		var values = JSON.parse(localStorage.getItem('EcstaticLiving:' + formType))
		for (var item in values) {
			try {
				if ($('*[name=' + item + ']').is(':radio')) {
					$('input[name=' + item + '][value="' + values[item] + '"]').prop('checked', true)
				}
				else {
					$('*[name=' + item + ']').val(values[item])
				}	
			} catch (error) {
				localStorage.removeItem('EcstaticLiving:' + formType)
			}
		}
	}
}

// Clear Form
function clearForm(formType) {
	$('#form-load').show()
	$('#form-clear').hide()
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	if (formType === 'Event') {
		$eventForm[0].reset()
	} else if (formType === 'Custom') {
		$customForm[0].reset()
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
const $eventForm = $('#wf-form-Event-Registration'),
eventCode = $('#event-code').text().toUpperCase(),
eventTitle = $('#event-name').text(), // Stripe description
eventStartDate = $('#event-start').text(),
eventDates = $('#event-dates').text(),
eventVenue = $('#event-venue').text(),
eventDepositAmount = $('#event-deposit-amount').text(),
eventDepositDate = $('#event-deposit-date').text()

// Event variables
const payButton = '#payment-button',
eventRegForm = '.event-container.reg-form',
eventInviteButton = '#event-invitecode-button',
eventInviteBox = '#event-invitecode-box',
eventInviteCode = '#event-invitecode-code',
eventInvitePass = '#event-invitecode-pass',
eventInviteFail = '#event-invitecode-fail',
eventSpecialRegistration = '#event-special-options',
eventFirstName = '#event-firstname',
eventLastName = '#event-lastname',
eventEmail = '#event-email',
eventMobile = '#event-mobile',
eventBirthdate = '#event-birthdate',
eventGenderValidation = '#event-gender-validation',
eventFemale = '#event-gender-female',
eventMale = '#event-gender-male',
eventOther = '#event-gender-other',
eventReferral = '#event-referral',
eventExperienceContainer = '.event-container.experience',
eventExperienceParsleyError = '#event-experience-validation',
eventExperienceYes = '#event-experience-yes',
eventExperienceNo = '#event-experience-no',
eventExperienceDetails = '#event-experience-details',
eventDietContainer = '.event-container.diet',
eventDietParsleyError = '#event-diet-validation',
eventDietYes = '#event-diet-yes',
eventDietNo = '#event-diet-no',
eventDietDetails = '#event-diet-details',
eventSpecialContainer = '.event-container.special',
eventSpecialParsleyError = '#event-special-validation',
eventSpecialYes = '#event-special-yes',
eventSpecialNo = '#event-special-no',
eventSpecialDetails = '#event-special-details',
eventAffiliateSelectionContainer = '.event-container.affiliate-selection',
eventAffiliateContainer = '.event-container.affiliate',
eventAffiliateParsleyError = '#event-affiliate-validation',
eventAffiliateYes = '#event-affiliate-yes',
eventAffiliateNo = '#event-affiliate-no',
eventAffiliateCode = '#event-affiliate-code',
eventAffiliatePass = '#event-affiliate-pass',
eventAffiliateFail = '#event-affiliate-fail',
eventStatus = '#event-status',
eventPartnerContainer = '.event-container.partner',
eventPartnerFirstName = '#event-partner-firstname',
eventPartnerLastName = '#event-partner-lastname',
eventPartnerGenderValidation = '#event-partner-gender-validation',
eventPartnerFemale = '#event-partner-gender-female',
eventPartnerMale = '#event-partner-gender-male',
eventPartnerOther = '#event-partner-gender-other',
eventPayValidation = '#event-pay-validation',
eventPayBoth = '#event-pay-both',
eventPayMe = '#event-pay-me',
eventSelect = '#event-option',
eventDepositContainer = '.event-container.deposit',
eventDepositValidation = '#event-deposit-validation',
eventDepositText = '#event-deposit-text',
eventDepositFull = '#event-deposit-full',
eventDepositDeposit = '#event-deposit-deposit',
eventTermsValidation = '#event-terms-validation',
eventTerms = '#event-terms',
paymentButton = '#payment-button'

// Stripe billing variables
const billingFirstName = '#billing-firstname',
billingLastName = '#billing-lastname',
billingStreet = '#billing-street',
billingCity = '#billing-city',
billingState = '#billing-state',
billingPostal = '#billing-postal',
billingCountry = '#billing-country',
billingCard = '#billing-card'


// SCROLL BUGFIX
function scrollPosition() {
	return (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)
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
// Affiliate code, e.g. MADA25TM1710FS
function affiliateCode(code) {
	var obj = new Object()
	obj.discount = function() {
		const discount = 100 - parseInt(code.substr(4, 2), 10) === 90
			// Assuming no discount, only to unlock event, e.g. ****10********
			? 0
			// With discount
			: 100 - parseInt(code.substr(4, 2), 10)
		return (discount === 0 || discount === 25 || discount === 50 || discount === 75 || discount === 100) ? discount : null
	},
	obj.verify = function() {
		return code.substr(code.length - eventCode.length).toLowerCase() === eventCode.toLowerCase() && this.discount() !== null
	}
	return obj
}
// Affiliate Code Validation
function eventAffiliateValidation() {
	if ($(eventInviteBox).is(':visible')) {
		// Private event
		return affiliateCode($(eventInviteCode).val()).verify()
	} else {
		// Public event
		if ($(eventAffiliateYes).is(':checked')) {
			return affiliateCode($(eventAffiliateCode).val()).verify()
		} else if (!$(eventAffiliateNo).is(':checked') && !$(eventAffiliateYes).is(':checked')) {
			return false
		}
	}
	return true
}
// Name & Gender Validation
function personalValidation() {
	if (
		$(eventFirstName).val() !== '' && !$(eventFirstName).val().includes(' ') && $(eventLastName).val() !== '' && !$(eventLastName).val().includes(' ') && $(eventEmail).val() !== '' && $(eventMobile).val() !== '' && $(eventBirthdate).val() !== '' &&
		($(eventFemale).is(':checked') || $(eventMale).is(':checked') || $(eventOther).is(':checked'))
	) {
		return true
	}
	return false
}
// Details Validation
function detailsValidation() {
	if (
		$(eventReferral).val() !== ''
		&& (($(eventExperienceYes).is(':checked') && $(eventExperienceDetails).val() !== '') || $(eventExperienceNo).is(':checked'))
		&& (($(eventDietYes).is(':checked') && $(eventDietDetails).val() !== '') || $(eventDietNo).is(':checked'))
		&& (($(eventSpecialYes).is(':checked') && $(eventSpecialDetails).val() !== '') || $(eventSpecialNo).is(':checked'))
	) {
		return true
	}
	return false
}
// Partner Validatation
function partnerValidation() {
	if (
		(participants() === 2
			&& $(eventPartnerFirstName).val() !== '' && $(eventPartnerLastName).val() !== ''
			&& ($(eventPartnerFemale).is(':checked') || $(eventPartnerMale).is(':checked') || $(eventPartnerOther).is(':checked'))
			&& ($(eventPayBoth).is(':checked') || $(eventPayMe).is(':checked')))
		|| participants() === 1
	) {
		return true
	}
	return false
}
// Event Options Validatation
function eventOptionValidation() {
	if ($(eventSelect).val() && (
		($(eventDepositContainer).is(':visible') && ($(eventDepositFull).is(':checked') || $(eventDepositDeposit).is(':checked'))
		|| $(eventDepositContainer).is(':hidden'))
	)) {
		return true
	}
	return false
}
// Billing Validation
// Removed for testing purposes:  && $(billingCard).is(':checked')
function billingValidation() {
	if ($(billingFirstName).val() !== '' && $(billingLastName).val() !== '' && $(billingStreet).val() !== '' && $(billingCity).val() !== ''
		&& $(billingState).val() !== '' && $(billingPostal).val() !== '' && $(billingCountry).val() !== '') {
		return true
	}
	return false
}
// Complete Validation
function eventFormValidation() {
	if (eventAffiliateValidation() && personalValidation() && detailsValidation() && partnerValidation() && eventOptionValidation() && $(eventTerms).is(':checked') && billingValidation()) {
		$('#card-errors').text('')
		$(paymentButton).css({ 'background-color': '#800000' })
		$(paymentButton).css({ 'color': '#ffffff' })
		return true
	}
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ 'color': '#333333' })
	return false
}


// VISUAL ERROR INDICATORS
function eventAffiliateShowErrors() {
	if ($(eventInviteBox).is(':visible')) {
		if ($(eventInviteCode).val().length > 0) {
			if (!eventAffiliateValidation()) {
				$(eventRegForm).hide()
				eventInvitePassHide()
				eventInviteFailShow()
			} else {
				$(eventRegForm).show()
				eventInviteFailHide()
				eventInvitePassShow()
			}
		} else {
			$(eventRegForm).hide()
			eventInvitePassHide()
			eventInviteFailHide()
		}
	} else if ($(eventAffiliateYes).is(':checked')) {
		if ($(eventAffiliateCode).val().length > 0) {
			if (!eventAffiliateValidation()) {
				eventAffiliatePassHide()
				eventAffiliateFailShow()
			} else {
				eventAffiliateFailHide()
				eventAffiliatePassShow()
			}
		} else {
			eventAffiliatePassHide()
			eventAffiliateFailHide()
		}
	}
}
function showErrorsInEventForm() {
	const errorInput = { 'border-color': '#b00000', 'background-color': '#fdd' }
	const clearInput = { 'border-color': '#ccc', 'background-color': '#fff' }
	const errorRadio = { 'background-color': '#fdd' }
	const clearRadio = { 'background-color': 'transparent' }
	if (!eventAffiliateValidation()) { $(eventInviteCode).css(errorInput); } else { $(eventInviteCode).css(clearInput); }
	if (!$(eventTerms).is(':checked')) { $(eventTermsValidation).css(errorRadio); } else { $(eventTermsValidation).css(clearRadio); }
	if ($(eventDepositContainer).is(':visible') && !$(eventDepositFull).is(':checked') && !$(eventDepositDeposit).is(':checked')) { $(eventDepositValidation).css(errorRadio); } else { $(eventDepositValidation).css(clearRadio); }
	if (participants() === 2 && !$(eventPayBoth).is(':checked') && !$(eventPayMe).is(':checked')) { $(eventPayValidation).css(errorRadio); } else { $(eventPayValidation).css(clearRadio); }
	if (participants() === 2 && !$(eventPartnerFemale).is(':checked') && !$(eventPartnerMale).is(':checked') && !$(eventPartnerOther).is(':checked')) { $(eventPartnerGenderValidation).css(errorRadio); } else { $(eventPartnerGenderValidation).css(clearRadio); }
	if (participants() === 2 && ($(eventPartnerFirstName).val() !== '' || $(eventPartnerLastName).val() !== '')) {
		$(eventPartnerFirstName).css(errorInput)
		$(eventPartnerLastName).css(errorInput)
		$(eventPartnerFirstName).focus()
	}
	else {
		$(eventPartnerFirstName).css(clearInput)
		$(eventPartnerLastName).css(clearInput)
	}
	if (
		($(eventAffiliateYes).is(':checked') && $(eventAffiliateCode).val() === '')
		|| (!$(eventAffiliateNo).is(':checked') && !$(eventAffiliateYes).is(':checked'))
	) { $(eventAffiliateParsleyError).css(errorRadio); } else { $(eventAffiliateParsleyError).css(clearRadio); }
	if (!$(eventSpecialYes).is(':checked') && !$(eventSpecialNo).is(':checked')) { $(eventSpecialParsleyError).css(errorRadio); } else { $(eventSpecialParsleyError).css(clearRadio); }
	if ($(eventSpecialYes).is(':checked') && $(eventSpecialDetails).val() === '') { $(eventSpecialDetails).css(errorInput); } else { $(eventSpecialDetails).css(clearInput); }
	if (!$(eventDietYes).is(':checked') && !$(eventDietNo).is(':checked')) { $(eventDietParsleyError).css(errorRadio); } else { $(eventDietParsleyError).css(clearRadio); }
	if ($(eventDietYes).is(':checked') && $(eventDietDetails).val() === '') { $(eventDietDetails).css(errorInput); } else { $(eventDietDetails).css(clearInput); }
	if (!$(eventExperienceYes).is(':checked') && !$(eventExperienceNo).is(':checked')) { $(eventExperienceParsleyError).css(errorRadio); } else { $(eventExperienceParsleyError).css(clearRadio); }
	if ($(eventExperienceYes).is(':checked') && $(eventExperienceDetails).val() === '') { $(eventExperienceDetails).css(errorInput); } else { $(eventExperienceDetails).css(clearInput); }
	if (!$(eventFemale).is(':checked') && !$(eventMale).is(':checked') && !$(eventOther).is(':checked')) { $(eventGenderValidation).css(errorRadio); } else { $(eventGenderValidation).css(clearRadio); }
	$eventForm.parsley().validate()
}


// SHOW/HIDE FORM ELEMENTS
// Event Invite Code
function eventInvitePassShow() {
	const text = eventAffiliateValidation() && affiliateCode($(eventInviteCode).val()).discount() > 0
		? 'Congrats! Invite code accepted!<br />$' + affiliateCode($(eventInviteCode).val()).discount() + ' per person discount applied! Continue below.'
		: 'Congrats! Invite code accepted!<br />Continue below.'
	$(eventInvitePass).html(text)
	$(eventInvitePass).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function eventInvitePassHide() {
	$(eventInvitePass).text('')
	$(eventInvitePass).hide()
}
function eventInviteFailShow() {
	$(eventInviteFail).show()
	$(eventInviteCode).focus()
}
function eventInviteFailHide() {
	$(eventInviteFail).hide()
}
// Affiliate Code
function showAffiliate() {
	$(eventAffiliateContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function hideAffiliate() {
	$(eventAffiliateCode).val('')
	$(eventAffiliateContainer).hide()
}
function eventAffiliatePassShow() {
	const text = eventAffiliateValidation() && affiliateCode($(eventAffiliateCode).val()).discount() > 0
		? 'Congrats! Code accepted!<br />$' + affiliateCode($(eventAffiliateCode).val()).discount() + ' per person discount applied!'
		: 'Congrats! Code accepted!'
	$(eventAffiliatePass).html(text)
	$(eventAffiliatePass).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function eventAffiliatePassHide() {
	$(eventAffiliatePass).text('')
	$(eventAffiliatePass).hide()
}
function eventAffiliateFailShow() {
	const text = 'Sorry, you’ve entered an invalid affiliate code.'
	$(eventAffiliateFail).html(text)
	$(eventAffiliateFail).show()
	window.scrollTo(0, scrollPosition() + 1)
	$(eventAffiliateCode).focus()
}
function eventAffiliateFailHide() {
	$(eventAffiliateFail).text('')
	$(eventAffiliateFail).hide()
}
// Partner
function showPartner() {
	$(eventPartnerContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
	if ($(eventPayBoth).is(':checked')) {
		setEventPrices('for both')
	} else {
		setEventPrices('per person')
	}
}
function hidePartner() {
	$(eventPartnerFirstName).val('')
	$(eventPartnerLastName).val('')
	$(eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe).prop('checked', false)
	$(eventPartnerContainer).hide()
	setEventPrices()
}
// Previous Experience
function showExperience() {
	$(eventExperienceContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function hideExperience() {
	$(eventExperienceDetails).val('')
	$(eventExperienceContainer).hide()
}
// Dietary Needs
function showDiet() {
	$(eventDietContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function hideDiet() {
	$(eventDietDetails).val('')
	$(eventDietContainer).hide()
}
// Special Question
function showSpecial() {
	$(eventSpecialContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function hideSpecial() {
	$(eventSpecialDetails).val('')
	$(eventSpecialContainer).hide()
}


// EVENT OPTIONS AND PRICE CALCULATION
// Calculates affiliate code discount
function eventAffiliateDiscount() {
	// Test if discount even applies
	if (eventAffiliateValidation()) {
		// Invite Code
		if ($(eventInviteBox).is(':visible')) {
			return affiliateCode($(eventInviteCode).val()).discount()
		} else
		// Affiliate Code
		if ($(eventAffiliateYes).is(':checked')) {
			return affiliateCode($(eventAffiliateCode).val()).discount()
		}
	}
	return null
}
// Determines whether event is for both couples & singles, couples-only, or singles-only
function setEventStatus() {
	$(eventStatus).empty()
	if ($(eventSpecialRegistration).text() === 'Couples only') {
		$(eventStatus).append($('<option>', {
			value: '',
			text: 'Register as...'
		}))
		$(eventStatus).append($('<option>', {
			value: 'Couple',
			text: 'Couple'
		}))
		$(eventStatus).append($('<option>', {
			value: 'Two Singles (paired)',
			text: 'Two Singles (paired)'
		}))
	} else
	if ($(eventSpecialRegistration).text() === 'Singles only') {
		$(eventStatus).append($('<option>', {
			value: 'Singles-only event',
			text: 'Single'
		}))
	} else {
		$(eventStatus).append($('<option>', {
			value: '',
			text: 'Register as...'
		}))
		$(eventStatus).append($('<option>', {
			value: 'Couple',
			text: 'Couple'
		}))
		$(eventStatus).append($('<option>', {
			value: 'Single',
			text: 'Single'
		}))
		$(eventStatus).append($('<option>', {
			value: 'Two Singles (paired)',
			text: 'Two Singles (paired)'
		}))
	}
}
//	Adds event options & prices based on CMS input
function setEventPrices() {
	var people = ''
	if ($(eventPayBoth).is(':checked')) {
		people = 'for both'
	} else if (participants() === 2) {
		people = 'per person'
	}
	var eventOptions = $('#event-options').text().split(' | ')
	var eventPrices = $('#event-prices').text().split(' | ')
	var eventNotes = $('#event-notes').text().split('|')
	$(eventSelect).empty()
	if (eventOptions.length > 0) {
		$(eventSelect).append($('<option>', {
			value: '',
			text: 'Event option...'
		}))
	}
	const paymentFactor = (people === 'for both') ? 2 : 1
	const spacer = people ? ' ' : ''
	const closer = (people || people === '') ? ')' : ''
	for (var i = 0; i < eventOptions.length; i++) {
		// Event price cannot be less than $0 after discount is applied
		const eventSelectPrice = (eventPrices[i] - eventAffiliateDiscount()) * paymentFactor > 0 ? (eventPrices[i] - eventAffiliateDiscount()) * paymentFactor : 0
		const affiliateDiscountText = eventAffiliateDiscount() > 0 ? ' including discount' : ''
		const eventNote = eventNotes[i] ? eventNotes[i] : ''
		const eventSelectText = eventOptions[i] + ' ($' + eventSelectPrice + spacer + people + affiliateDiscountText + closer + eventNote
		$(eventSelect).append($('<option>', {
			value: eventSelectPrice,
			text: eventSelectText
		}))
	}
	const eventDepositPrice = parseInt(eventDepositAmount) * paymentFactor
	$(eventDepositText).text('Pay deposit only ($' + eventDepositPrice + spacer + people + ')')
}


// EVENT FORM RESET
function resetEventForm() {
	clearForm('Event')
	hideAffiliate()
	hideExperience()
	hideDiet()
	hideSpecial()
	$(eventExperienceNo).prop('checked', true)
	$(eventDietNo).prop('checked', true)
	$(eventSpecialNo).prop('checked', true)
	$(eventAffiliateNo).prop('checked', true)

	repopulateForm('Event')

	if ($(eventInviteBox).is(':visible')) {
		eventInvitePassHide()
		eventInviteFailHide()
	}
	setEventStatus()
	setEventPrices()
	$('#eventcode').val(eventCode)
	if ($(eventAffiliateYes).is(':checked')) { showAffiliate() } else { hideAffiliate() }
	if ($(eventExperienceYes).is(':checked')) { showExperience() } else { hideExperience() }
	if ($(eventDietYes).is(':checked')) { showDiet() } else { hideDiet() }
	if ($(eventSpecialYes).is(':checked')) { showSpecial() } else { hideSpecial() }
	if (participants() !== 2) { hidePartner() } else { showPartner() }
	if (new Date() < new Date(eventDepositDate)) {
		$(eventDepositContainer).show()
		window.scrollTo(0, scrollPosition() + 1)
		$(eventDepositFull).prop('checked', true)
	} else {
		$(eventDepositContainer).hide()
	}
	$eventForm.parsley()
	$eventForm.show()
	$(eventTerms).attr('checked', false)
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ 'color': '#333333' })

	// If private event...
	if ($(eventInviteBox).is(':visible')) {
		// Hide the affiliate code box
		$(eventAffiliateSelectionContainer).hide()
		// If URL contains affiliate code, add to invite field
		var affiliateString = window.location.search.slice(1).split('=')
		if (affiliateString[0] === 'affiliate') {
			// Add the affiliate code from the URL into the invite code box
			$(eventInviteCode).val(affiliateString[1])
			// Verify affiliate code
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		}
	}
	// If public event...
	else {
		// Show the affiliate code box
		$(eventAffiliateSelectionContainer).show()
		window.scrollTo(0, scrollPosition() + 1)
		// If URL contains affiliate code, add to affiliate field
		var affiliateString = window.location.search.slice(1).split('=')
		if (affiliateString[0] === 'affiliate') {
			// Check the affiliate radio button
			$(eventAffiliateYes).prop('checked', true)
			// Show whether the affiliate code is valid or invalid
			showAffiliate()
			// Add the affiliate code from the URL into the affiliate code box
			$(eventAffiliateCode).val(affiliateString[1])
			// Verify affiliate code
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		}
	}
}


// EVENT FORM: BEGIN SEQUENCE
if (page === 'Event' || page === 'Custom') {

	// Prevent accidental submission of form through 'enter' key
	$('.form-input').keypress(function (e) {
		if (e.which === 13) {
			e.preventDefault()
			return false
		}
	})

}

if (page === 'Event') {

	// EVENT FORM ONCHANGE EVENTS
	if ($(eventInviteBox).is(':visible')) {
		// If private event, hide registration form until successful invite code has been entered
		$(eventRegForm).hide()
		$(eventInviteButton).on('click', function (e) {
			e.preventDefault()
			// Show errors, if any
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		})
	} else {
		// Make sure event reg form is shown if not private event
		$(eventRegForm).show()
		// Affiliate code shown on public events, not private events
		$(eventAffiliateNo + ',' + eventAffiliateYes).on('change', function () {
			// Show errors, if any
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
			// Validate form
			eventFormValidation()
			if ($(eventAffiliateYes).is(':checked')) showAffiliate()
			if ($(eventAffiliateNo).is(':checked')) hideAffiliate()
		})
		$(eventAffiliateCode).on('change', function () {
			if ($(eventAffiliateYes).is(':checked')) {
				// Show errors, if any
				eventAffiliateShowErrors()
				// Adjust prices
				setEventPrices()
			}
		})
	}
	$(eventFirstName).on('change', function () {
		$(billingFirstName).val($(eventFirstName).val())
	})
	$(eventLastName).on('change', function () {
		$(billingLastName).val($(eventLastName).val())
	})
	$(eventExperienceNo + ',' + eventExperienceYes).on('change', function () {
		if ($(eventExperienceYes).is(':checked')) showExperience()
		if ($(eventExperienceNo).is(':checked')) hideExperience()
	})
	$(eventDietNo + ',' + eventDietYes).on('change', function () {
		if ($(eventDietYes).is(':checked')) showDiet()
		if ($(eventDietNo).is(':checked')) hideDiet()
	})
	$(eventSpecialNo + ',' + eventSpecialYes).on('change', function () {
		if ($(eventSpecialYes).is(':checked')) showSpecial()
		if ($(eventSpecialNo).is(':checked')) hideSpecial()
	})
	$(eventStatus).on('change', function () {
		participants() === 2 ? showPartner() : hidePartner()
	})
	$(eventPayBoth + ',' + eventPayMe).on('change', function () {
		setEventPrices()
	})
	const eventFieldsPersonal = eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther
	const eventFieldsDetails = eventReferral + ',' + eventExperienceYes + ',' + eventExperienceNo + ',' + eventExperienceDetails + ',' + eventDietYes + ',' + eventDietNo + ',' + eventDietDetails + ',' + eventSpecialYes + ',' + eventSpecialNo + ',' + eventSpecialDetails
	const eventFieldsPartner = eventStatus + ',' + eventPartnerFirstName + ',' + eventPartnerLastName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe
	const eventFieldsOptions = eventSelect
	const eventFieldsBilling = billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry
	$(eventFieldsPersonal + ',' + eventFieldsDetails + ',' + eventFieldsPartner + ',' + eventFieldsOptions + ',' + eventTerms + ',' + eventFieldsBilling).on('change', function() {
		saveForm(page)
		eventFormValidation()
	})
	$(billingState).keypress(function(e) {
		if (this.value.length >= 2) {
			e.preventDefault()
		}
	})

	// RESET EVENT FORM
	resetEventForm()
}





// CUSTOM CHARGE
const $customForm = $('#wf-form-Custom-Charge'),
customCode = '#custom-code',
customFirstName = '#custom-firstname',
customLastName = '#custom-lastname',
customEmail = '#custom-email',
customMobile = '#custom-mobile',
customSelect = '#custom-select',
customTerms = '#custom-terms',
customTermsValidation = '#custom-terms-validation'

// CUSTOM AMOUNT
// Complete Validation
function customChargeValidation() {
	if ($(customFirstName).val() !== '' && $(customLastName).val() !== '' && $(customEmail).val() !== '' && $(customMobile).val() !== '' && $(customSelect).val() && $(customTerms).is(':checked') && billingValidation()) {
		$('#card-errors').text('')
		$(paymentButton).css({ 'background-color': '#800000' })
		$(paymentButton).css({ 'color': '#ffffff' })
		return true
	}
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ 'color': '#333333' })
	return false
}

function showErrorsInCustomForm() {
	const errorInput = { 'border-color': '#b00000', 'background-color': '#fdd' }
	const clearInput = { 'border-color': '#ccc', 'background-color': '#fff' }
	const errorRadio = { 'background-color': '#fdd' }
	const clearRadio = { 'background-color': 'transparent' }
	if (!$(customTerms).is(':checked')) { $(customTermsValidation).css(errorRadio); } else { $(customTermsValidation).css(clearRadio); }
	$customForm.parsley().validate()
}

function setCustomChargeSelect() {
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

function resetCustomChargeForm() {
	clearForm('Custom')
	repopulateForm('Custom')
	setCustomChargeSelect()
	$customForm.parsley()
	$customForm.show()
	$(customTerms).attr('checked', false)
	customChargeValidation()
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ 'color': '#333333' })
}


// CUSTOM CHARGE FORM: BEGIN SEQUENCE
if (page === 'Custom') {

	// CUSTOM CHARGE ONCHANGE EVENTS
	$(customFirstName).on('change', function () {
		$(billingFirstName).val($(eventFirstName).val())
	})
	$(customLastName).on('change', function () {
		$(billingLastName).val($(eventLastName).val())
	})
	$(customFirstName + ',' + customLastName + ',' + customEmail + ',' + customMobile + ',' + customSelect + ',' + customTerms + ',' + billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry).on('change', function () {
		customChargeValidation()
	})

	// RESET CUSTOM CHARGE
	resetCustomChargeForm()
}



// Show / hide populate and clear forms
if (localStorage.getItem('EcstaticLiving:' + page)) {
	$('#form-load').hide()
	$('#form-clear').show()
} else {
	$('#form-load').hide()
	$('#form-clear').hide()
}
$('#form-clear').on('click', function () {
	clearForm(page)
})
$('#form-load').on('click', function () {
	repopulateForm(page)
})



// STRIPE
function paymentValidation(result) {
	if (result.complete) {
		// Check hidden field to enable eventFormValidation() or customChargeValidation() to pass
		$(billingCard).prop('checked', true)
	}
	if (!result.complete) {
		$(billingCard).prop('checked', false)
	}
	// Validate event
	if (page === 'Event') {
		eventFormValidation()
	} else if (page === 'Custom') {
		customChargeValidation()
	}
	if (result.error) {
		$('#card-errors').text(result.error.message)
		return false
	} else {
		$('#card-errors').text('')
	}
}

// Webflow code to submit form
function conversion(e, n) {
	var i = null;
	return n = n || {}, e.find(':input:not([type="submit"])').each(function(r, o) {
		var a = $(o),
			s = a.attr("type"),
			u = a.attr("data-name") || a.attr("name") || "Field " + (r + 1),
			l = a.val()
		if ("checkbox" === s && (l = a.is(":checked")), "radio" === s) {
			if (null === n[u] || "string" == typeof n[u]) return;
			l = e.find('input[name="' + a.attr("name") + '"]:checked').val() || null
		}
		"string" == typeof l && (l = $.trim(l)), n[u] = l, i = i || verification(a, s, u, l)
	}), i
}

function verification(t, e, n, i) {
	var r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/;
	return "password" === e ? r = "Passwords cannot be submitted." : t.attr("required") && (i ? (k.test(n) || k.test(t.attr("type"))) && (_.test(i) || (r = "Please enter a valid email address for: " + n)) : r = "Please fill out the required field: " + n), r
}

// Payment
function stripeTokenHandler(data) {
	const stripeURL = window.location.href.indexOf('ecstaticliving.com') > -1
		? 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe'
		: 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe-test'
	$('.stripe.processing').show()
	$('.stripe.error').hide()
	$('.notification-modal.processing').show()
	$.ajax({
		type: 'POST',
		url: stripeURL,
		crossDomain: true,
		data: {
			'chargeAmount': data.chargeAmount,
			'chargeDescription': data.chargeDescription,
			'customerDescription': data.customerDescription,
			'customerEmail': data.customerEmail,
			'event': data.event,
			'party': data.party,
			'participantFirstName': data.participantFirstName,
			'participantLastName': data.participantLastName,
			'partnerFirstName': data.partnerFirstName,
			'partnerLastName': data.partnerLastName,
			'quantity': data.quantity,
			'token': data.token
		},
		timeout: 10000
	})
		.then(function (res) {
			$('.notification-modal.processing').hide()
			var name = '', formSubmit = '', success = ''
			if (page === 'Event') {
				name = 'Event Registration'
				formSubmit = $eventForm
				success = siteUrl + 'registration'
			} else if (page === 'Custom') {
				name = 'Custom Charge'
				formSubmit = $customForm
				success = siteUrl + 'updated-card-changed'
			}
			var r = {
				name: name,
				source: window.location.href,
				test: false,
				fields: {},
				dolphin: false
			}
			var error = conversion(formSubmit, r.fields)
			if (error) {
				alert(error)
				throw error
			}
			return $.ajax({
				type: 'POST',
				url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
				crossDomain: true,
				data: r,
				dataType: 'json'
			})
			.then(function(response) {
				console.log(response)
				window.location.href = success
			})
		})
		.fail(function (err) {
			console.log(err)
			// $0 charge to save credit card details on custom charge form
			if (err.responseJSON && err.responseJSON.message === 'Invalid positive integer' && page === 'Custom') {
				window.location.href = siteUrl + 'updated-card'
			} else {
				if (page === 'Event') {
					resetEventForm()
				} else if (page === 'Custom') {
					resetCustomChargeForm()
				}
				$('.notification-modal.processing').hide()
				$('.notification-modal.error').show()
			}
			return false
		})
}

const stripe = window.location.href.indexOf('ecstaticliving.com') > -1
	? Stripe('pk_live_0rULIvKhv6aSLqI49Ae5rflI')
	: Stripe('pk_test_QO6tO6bHny3y10LjH96f4n3p')
const elements = stripe.elements()
style = {
	base: {
		fontFamily: 'Lato',
		fontWeight: 300,
		color: '#333',
		fontSize: '16px',
		lineHeight: '24px',
		'::placeholder': {
			color: '#666',
		}
	},
	invalid: {
		color: '#b00000',
		':focus': {
			color: '#b00000'
		}
	}
}
const card = elements.create('card', {
	hidePostalCode: true,
	style
})
if (page === 'Event' || page === 'Custom') {
	card.mount('#card-element')
	card.addEventListener('change', function(result) {
		paymentValidation(result)
	})
}

$('#button-stripe-error').on('click', function() {
	$('.notification-modal.error').hide()
})

// Prevent form from being submitted. This is being done manually in stripeTokenHandler()
$($eventForm).on('submit', function(e) {
	return false
})

$(payButton).on('click', function(e) {
	// Prevent accidental submission of form through 'enter' key
	if (e.which === 13) {
		return false
	}
	e.preventDefault()
	if (page === 'Event') {
		try {
			if (!eventFormValidation()) {
				showErrorsInEventForm()
				// If there’s no Stripe error message
				if ($('#card-errors').text() === '') {
					$('#card-errors').text('Oops! There’s some missing information.')
				}
				return false
			}
		}
		catch(err) {
			alert(err)
		}
	} else if (page === 'Custom') {
		if (!customChargeValidation()) {
			showErrorsInCustomForm()
			// If there’s no Stripe error message
			if ($('#card-errors').text() === '') {
				$('#card-errors').text('Oops! There’s some missing information.')
			}
			return false
		}
	}
	saveForm(page)
	var customerDescription = '', customerEmail = '', chargeDescription = '', chargeAmount = 0
	if (page === 'Event') {
		// Variables
		const paymentFactor = ($(eventPayBoth).is(':checked'))
			? 2
			: 1
		const eventDepositPrice = parseInt(eventDepositAmount) * paymentFactor
		chargeAmount = $(eventDepositDeposit).is(':checked')
			? eventDepositPrice * 100
			: $(eventSelect).val() * 100
		const eventDeposit = $(eventDepositDeposit).is(':checked') ? 'DEPOSIT' : 'FULL'
		customerDescription = $(eventFirstName).val() + ' ' + $(eventLastName).val() + ' <' + $(eventEmail).val() + '>'
		customerEmail = $(eventEmail).val()
		chargeDescription = eventTitle + ' ' + eventDates + ', ' + eventVenue + ', ' + $(eventSelect + ' option:selected').text().substring(0, $(eventSelect + ' option:selected').text().length - 16) + ', ' + eventDeposit
		// Form Variable: Party
		var party = ''
		if (participants() === 1) {
			party = $(eventFirstName).val() + ' ' + $(eventLastName).val()
		}
		else if (participants() === 2) {
			if ($(eventLastName).val() === $(eventPartnerLastName).val()) {
				party = $(eventFirstName).val() + ' & ' + $(eventPartnerFirstName).val() + ' ' + $(eventLastName).val()
			} else {
				party = $(eventFirstName).val() + ' ' + $(eventLastName).val() + ' & ' + $(eventPartnerFirstName).val() + ' ' + $(eventPartnerLastName).val()
			}
		}
		$('#party').val(party)
		// Form Variable: Traffic Source
		var trafficSource = window.location.search.slice(1).split('=')
		if (window.location.search && trafficSource[0] === 'source') {
			$('#trafficsource').val(trafficSource[1])
		} else {
			$('#trafficsource').val('ELI')
		}
	}
	else if (page === 'Custom') {
		// Stripe variables
		chargeAmount = $(customSelect).val() * 100
		customerDescription = $(customFirstName).val() + ' ' + $(customLastName).val() + ' <' + $(customEmail).val() + '>'
		customerEmail = $(customEmail).val()
		chargeDescription = 'Custom Charge: ' + $(customSelect + ' option:selected').text().substring(0, $(customSelect + ' option:selected').text().length - 16)
	}
	// Form Variable: Charge Description
	$('#charge-description').val(chargeDescription)
	// Form Variable: Charge Amount
	$('#charge-amount').val(parseInt(chargeAmount, 10))
	// Form Variable: Event Option Total
	$('#event-option-total').val($(eventSelect).val() * 100)
	// Form Variable: Event Affiliate Code
	const affiliateCodeValue = $(eventAffiliateCode).val()
		? $(eventAffiliateCode).val()
		: '- none -'
	$('#event-affiliate').val(affiliateCodeValue)
	// Form Variable: Question Diet
	const dietValue = $(eventDietDetails).val()
		? $(eventDietDetails).val()
		: '- none -'
	$('#question-diet').val(dietValue)
	// Form Variable: Question Special
	const specialValue = $(eventSpecialDetails).val()
		? $(eventSpecialDetails).val()
		: '- none -'
	$('#question-special').val(specialValue)
	const billingData = {
		name: $(billingFirstName).val() + ' ' + $(billingLastName).val(),
		address_line1: $(billingStreet).val(),
		address_line2: '',
		address_city: $(billingCity).val(),
		address_state: $(billingState).val(),
		address_zip: $(billingPostal).val(),
		address_country: $(billingCountry).val()
	}
	stripe.createToken(card, billingData)
		.then(function (result) {
			paymentValidation(result)
			if (result.error) {
				$('#card-errors').text(result.error.message)
				return false
			}
			else {
				stripeTokenHandler({
					'chargeAmount': chargeAmount,
					'chargeDescription': chargeDescription,
					'customerDescription': customerDescription,
					'customerEmail': customerEmail,
					'event': eventCode,
					'party': party,
					'participantFirstName': eventFirstName,
					'participantLastName': eventLastName,
					'partnerFirstName': eventPartnerFirstName,
					'partnerLastName': eventPartnerFirstName,
					'quantity': participants() === 2 && $(eventPayBoth).is(':checked') ? 2 : 1,
					'token': result.token.id
				})
			}
		})
		.catch(function (error) {
			alert(error)
		})
})
