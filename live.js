/*
Code ©2018 Ecstatic Living Institute. All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
const mode = window.location.href.indexOf('ecstaticliving.com') > -1 ? 'production' : 'development'

if (mode === 'production') {
	console.log('Welcome to EcstaticLiving.com')
} else {
	console.log('TEST code at ', window.location.href)
}

let recaptchaPassed = false
const recaptchaServer =
	'https://wt-d2bd89d1d23e6c320f5aff229c206923-0.sandbox.auth0-extend.com/recaptcha'
grecaptcha.ready(function() {
	grecaptcha
		.execute('6LcQUqwUAAAAAN1xfTSh_9TYo_lGX48SDEsW6mqz', { action: 'homepage' })
		.then(function(token) {
			$.ajax({
				type: 'POST',
				url: recaptchaServer,
				crossDomain: true,
				data: {
					token
				}
			})
				// Success
				.then(function(res) {
					console.log(res)
					recaptchaPassed = res && res.success && res.score > 0.7 ? true : false
					// Do something
				})
				// Failure
				.catch(function(err) {
					console.error(err)
					// Prevent something
				})
		})
})

// DECLARATIONS
// General
const $main = $('.main'),
	$mainSection = $('.main-section'),
	// Nav Menu
	$navMenu = $('.navigation-menu'),
	$navContainer = $('.nav-container'),
	// Contact
	$contactForm = $('.contact_form'),
	$contactSection = $('.contact-section'),
	$receivedSection = $('.received-section')

// Initialization Module
const siteUrl =
	mode === 'production' ? 'https://www.ecstaticliving.com/' : 'https://ecstaticliving.webflow.io/'

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
if (window.location.href.endsWith('/update')) {
	page = 'Custom'
}
if (window.location.href.endsWith('/contact')) {
	page = 'Contact'
}

// NAV MENU
const $navButton = $('.menu-icon')
const $navClose = $('.nav-close')
// If nav menu is opened
$navButton.on('click', function() {
	//	If nav menu is opened
	if ($navClose.is(':hidden')) {
		$navContainer.show().animate(
			{
				marginLeft: '0%'
			},
			500
		)
		$navClose.fadeTo(1000, 1).show()
	} else {
		$navContainer.animate(
			{
				marginLeft: '100%'
			},
			500
		)
		$navClose.fadeTo(1000, 0).hide()
	}
})
// If nav menu is closed
$navClose.on('click', function() {
	$navButton.trigger('click')
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
	$contactForm.submit()
	$contactSection.fadeTo(500, 0)
	$contactSection.hide()
	$receivedSection.show()
	$receivedSection.fadeTo(500, 1)
})

// FORMS

// Countries
var countries = [
	{ seperator: true },
	{ value: 'US', label: 'United States' },
	{ value: 'CA', label: 'Canada' },
	{ value: 'MX', label: 'Mexico' },
	{ value: 'FR', label: 'France' },
	{ seperator: true },
	{ value: 'AF', label: 'Afghanistan' },
	{ value: 'AX', label: 'Åland Islands' },
	{ value: 'AL', label: 'Albania' },
	{ value: 'DZ', label: 'Algeria' },
	{ value: 'AS', label: 'American Samoa' },
	{ value: 'AD', label: 'Andorra' },
	{ value: 'AO', label: 'Angola' },
	{ value: 'AI', label: 'Anguilla' },
	{ value: 'AQ', label: 'Antarctica' },
	{ value: 'AG', label: 'Antigua and Barbuda' },
	{ value: 'AR', label: 'Argentina' },
	{ value: 'AM', label: 'Armenia' },
	{ value: 'AW', label: 'Aruba' },
	{ value: 'AU', label: 'Australia' },
	{ value: 'AT', label: 'Austria' },
	{ value: 'AZ', label: 'Azerbaijan' },
	{ value: 'BS', label: 'Bahamas' },
	{ value: 'BH', label: 'Bahrain' },
	{ value: 'BD', label: 'Bangladesh' },
	{ value: 'BB', label: 'Barbados' },
	{ value: 'BY', label: 'Belarus' },
	{ value: 'BE', label: 'Belgium' },
	{ value: 'BZ', label: 'Belize' },
	{ value: 'BJ', label: 'Benin' },
	{ value: 'BM', label: 'Bermuda' },
	{ value: 'BT', label: 'Bhutan' },
	{ value: 'BO', label: 'Bolivia' },
	{ value: 'BA', label: 'Bosnia and Herzegovina' },
	{ value: 'BW', label: 'Botswana' },
	{ value: 'BV', label: 'Bouvet Island' },
	{ value: 'BR', label: 'Brazil' },
	{ value: 'IO', label: 'British Indian Ocean Territory' },
	{ value: 'BN', label: 'Brunei Darussalam' },
	{ value: 'BG', label: 'Bulgaria' },
	{ value: 'BF', label: 'Burkina Faso' },
	{ value: 'BI', label: 'Burundi' },
	{ value: 'KH', label: 'Cambodia' },
	{ value: 'CM', label: 'Cameroon' },
	{ value: 'CV', label: 'Cape Verde' },
	{ value: 'KY', label: 'Cayman Islands' },
	{ value: 'CF', label: 'Central African Republic' },
	{ value: 'TD', label: 'Chad' },
	{ value: 'CL', label: 'Chile' },
	{ value: 'CN', label: 'China, People’s Republic of' },
	{ value: 'CX', label: 'Christmas Island' },
	{ value: 'CC', label: 'Cocos (Keeling) Islands' },
	{ value: 'CO', label: 'Colombia' },
	{ value: 'KM', label: 'Comoros' },
	{ value: 'CG', label: 'Congo' },
	{ value: 'CD', label: 'Congo, The Democratic Republic of the' },
	{ value: 'CK', label: 'Cook Islands' },
	{ value: 'CR', label: 'Costa Rica' },
	{ value: 'CI', label: 'Cote D’Ivoire' },
	{ value: 'HR', label: 'Croatia' },
	{ value: 'CU', label: 'Cuba' },
	{ value: 'CY', label: 'Cyprus' },
	{ value: 'CZ', label: 'Czech Republic' },
	{ value: 'DK', label: 'Denmark' },
	{ value: 'DJ', label: 'Djibouti' },
	{ value: 'DM', label: 'Dominica' },
	{ value: 'DO', label: 'Dominican Republic' },
	{ value: 'EC', label: 'Ecuador' },
	{ value: 'EG', label: 'Egypt' },
	{ value: 'SV', label: 'El Salvador' },
	{ value: 'GQ', label: 'Equatorial Guinea' },
	{ value: 'ER', label: 'Eritrea' },
	{ value: 'EE', label: 'Estonia' },
	{ value: 'ET', label: 'Ethiopia' },
	{ value: 'FK', label: 'Falkland Islands (Malvinas)' },
	{ value: 'FO', label: 'Faroe Islands' },
	{ value: 'FJ', label: 'Fiji' },
	{ value: 'FI', label: 'Finland' },
	{ value: 'GF', label: 'French Guiana' },
	{ value: 'PF', label: 'French Polynesia' },
	{ value: 'TF', label: 'French Southern Territories' },
	{ value: 'GA', label: 'Gabon' },
	{ value: 'GM', label: 'Gambia' },
	{ value: 'GE', label: 'Georgia' },
	{ value: 'DE', label: 'Germany' },
	{ value: 'GH', label: 'Ghana' },
	{ value: 'GI', label: 'Gibraltar' },
	{ value: 'GR', label: 'Greece' },
	{ value: 'GL', label: 'Greenland' },
	{ value: 'GD', label: 'Grenada' },
	{ value: 'GP', label: 'Guadeloupe' },
	{ value: 'GU', label: 'Guam' },
	{ value: 'GT', label: 'Guatemala' },
	{ value: 'GG', label: 'Guernsey' },
	{ value: 'GN', label: 'Guinea' },
	{ value: 'GW', label: 'Guinea-Bissau' },
	{ value: 'GY', label: 'Guyana' },
	{ value: 'HT', label: 'Haiti' },
	{ value: 'HM', label: 'Heard Island and Mcdonald Islands' },
	{ value: 'VA', label: 'Holy See (Vatican City State)' },
	{ value: 'HN', label: 'Honduras' },
	{ value: 'HK', label: 'Hong Kong' },
	{ value: 'HU', label: 'Hungary' },
	{ value: 'IS', label: 'Iceland' },
	{ value: 'IN', label: 'India' },
	{ value: 'ID', label: 'Indonesia' },
	{ value: 'IR', label: 'Iran, Islamic Republic Of' },
	{ value: 'IQ', label: 'Iraq' },
	{ value: 'IE', label: 'Ireland' },
	{ value: 'IM', label: 'Isle of Man' },
	{ value: 'IL', label: 'Israel' },
	{ value: 'IT', label: 'Italy' },
	{ value: 'JM', label: 'Jamaica' },
	{ value: 'JP', label: 'Japan' },
	{ value: 'JE', label: 'Jersey' },
	{ value: 'JO', label: 'Jordan' },
	{ value: 'KZ', label: 'Kazakhstan' },
	{ value: 'KE', label: 'Kenya' },
	{ value: 'KI', label: 'Kiribati' },
	{ value: 'KP', label: 'Democratic People’s Republic of Korea' },
	{ value: 'KR', label: 'Korea, Republic of' },
	{ value: 'XK', label: 'Kosovo' },
	{ value: 'KW', label: 'Kuwait' },
	{ value: 'KG', label: 'Kyrgyzstan' },
	{ value: 'LA', label: 'Lao People’s Democratic Republic' },
	{ value: 'LV', label: 'Latvia' },
	{ value: 'LB', label: 'Lebanon' },
	{ value: 'LS', label: 'Lesotho' },
	{ value: 'LR', label: 'Liberia' },
	{ value: 'LY', label: 'Libyan Arab Jamahiriya' },
	{ value: 'LI', label: 'Liechtenstein' },
	{ value: 'LT', label: 'Lithuania' },
	{ value: 'LU', label: 'Luxembourg' },
	{ value: 'MO', label: 'Macao' },
	{ value: 'MK', label: 'Macedonia, The Former Yugoslav Republic of' },
	{ value: 'MG', label: 'Madagascar' },
	{ value: 'MW', label: 'Malawi' },
	{ value: 'MY', label: 'Malaysia' },
	{ value: 'MV', label: 'Maldives' },
	{ value: 'ML', label: 'Mali' },
	{ value: 'MT', label: 'Malta' },
	{ value: 'MH', label: 'Marshall Islands' },
	{ value: 'MQ', label: 'Martinique' },
	{ value: 'MR', label: 'Mauritania' },
	{ value: 'MU', label: 'Mauritius' },
	{ value: 'YT', label: 'Mayotte' },
	{ value: 'FM', label: 'Micronesia, Federated States of' },
	{ value: 'MD', label: 'Moldova, Republic of' },
	{ value: 'MC', label: 'Monaco' },
	{ value: 'MN', label: 'Mongolia' },
	{ value: 'ME', label: 'Montenegro' },
	{ value: 'MS', label: 'Montserrat' },
	{ value: 'MA', label: 'Morocco' },
	{ value: 'MZ', label: 'Mozambique' },
	{ value: 'MM', label: 'Myanmar' },
	{ value: 'NA', label: 'Namibia' },
	{ value: 'NR', label: 'Nauru' },
	{ value: 'NP', label: 'Nepal' },
	{ value: 'NL', label: 'Netherlands' },
	{ value: 'AN', label: 'Netherlands Antilles' },
	{ value: 'NC', label: 'New Caledonia' },
	{ value: 'NZ', label: 'New Zealand' },
	{ value: 'NI', label: 'Nicaragua' },
	{ value: 'NE', label: 'Niger' },
	{ value: 'NG', label: 'Nigeria' },
	{ value: 'NU', label: 'Niue' },
	{ value: 'NF', label: 'Norfolk Island' },
	{ value: 'MP', label: 'Northern Mariana Islands' },
	{ value: 'NO', label: 'Norway' },
	{ value: 'OM', label: 'Oman' },
	{ value: 'PK', label: 'Pakistan' },
	{ value: 'PW', label: 'Palau' },
	{ value: 'PS', label: 'Palestine, State of' },
	{ value: 'PA', label: 'Panama' },
	{ value: 'PG', label: 'Papua New Guinea' },
	{ value: 'PY', label: 'Paraguay' },
	{ value: 'PE', label: 'Peru' },
	{ value: 'PH', label: 'Philippines' },
	{ value: 'PN', label: 'Pitcairn' },
	{ value: 'PL', label: 'Poland' },
	{ value: 'PT', label: 'Portugal' },
	{ value: 'PR', label: 'Puerto Rico' },
	{ value: 'QA', label: 'Qatar' },
	{ value: 'RE', label: 'Reunion' },
	{ value: 'RO', label: 'Romania' },
	{ value: 'RU', label: 'Russian Federation' },
	{ value: 'RW', label: 'Rwanda' },
	{ value: 'SH', label: 'Saint Helena' },
	{ value: 'KN', label: 'Saint Kitts and Nevis' },
	{ value: 'LC', label: 'Saint Lucia' },
	{ value: 'PM', label: 'Saint Pierre and Miquelon' },
	{ value: 'VC', label: 'Saint Vincent and the Grenadines' },
	{ value: 'WS', label: 'Samoa' },
	{ value: 'SM', label: 'San Marino' },
	{ value: 'ST', label: 'Sao Tome and Principe' },
	{ value: 'SA', label: 'Saudi Arabia' },
	{ value: 'SN', label: 'Senegal' },
	{ value: 'RS', label: 'Serbia' },
	{ value: 'SC', label: 'Seychelles' },
	{ value: 'SL', label: 'Sierra Leone' },
	{ value: 'SG', label: 'Singapore' },
	{ value: 'SK', label: 'Slovakia' },
	{ value: 'SI', label: 'Slovenia' },
	{ value: 'SB', label: 'Solomon Islands' },
	{ value: 'SO', label: 'Somalia' },
	{ value: 'ZA', label: 'South Africa' },
	{ value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
	{ value: 'ES', label: 'Spain' },
	{ value: 'LK', label: 'Sri Lanka' },
	{ value: 'SD', label: 'Sudan' },
	{ value: 'SR', label: 'Suriname' },
	{ value: 'SJ', label: 'Svalbard and Jan Mayen' },
	{ value: 'SZ', label: 'Swaziland' },
	{ value: 'SE', label: 'Sweden' },
	{ value: 'CH', label: 'Switzerland' },
	{ value: 'SY', label: 'Syrian Arab Republic' },
	{ value: 'TW', label: 'Taiwan, Republic of China' },
	{ value: 'TJ', label: 'Tajikistan' },
	{ value: 'TZ', label: 'Tanzania, United Republic of' },
	{ value: 'TH', label: 'Thailand' },
	{ value: 'TL', label: 'Timor-Leste' },
	{ value: 'TG', label: 'Togo' },
	{ value: 'TK', label: 'Tokelau' },
	{ value: 'TO', label: 'Tonga' },
	{ value: 'TT', label: 'Trinidad and Tobago' },
	{ value: 'TN', label: 'Tunisia' },
	{ value: 'TR', label: 'Turkey' },
	{ value: 'TM', label: 'Turkmenistan' },
	{ value: 'TC', label: 'Turks and Caicos Islands' },
	{ value: 'TV', label: 'Tuvalu' },
	{ value: 'UG', label: 'Uganda' },
	{ value: 'UA', label: 'Ukraine' },
	{ value: 'AE', label: 'United Arab Emirates' },
	{ value: 'GB', label: 'United Kingdom' },
	{ value: 'UM', label: 'United States Minor Outlying Islands' },
	{ value: 'UY', label: 'Uruguay' },
	{ value: 'UZ', label: 'Uzbekistan' },
	{ value: 'VU', label: 'Vanuatu' },
	{ value: 'VE', label: 'Venezuela' },
	{ value: 'VN', label: 'Viet Nam' },
	{ value: 'VG', label: 'Virgin Islands, British' },
	{ value: 'VI', label: 'Virgin Islands, U.S.' },
	{ value: 'WF', label: 'Wallis and Futuna' },
	{ value: 'EH', label: 'Western Sahara' },
	{ value: 'YE', label: 'Yemen' },
	{ value: 'ZM', label: 'Zambia' },
	{ value: 'ZW', label: 'Zimbabwe' }
]
for (var i = 0; i < countries.length; i++) {
	if (countries[i].seperator) {
		$('#country').append('<option disabled>──────────</option>')
	} else {
		const country =
			countries[i].label === 'United States'
				? '<option value="' + countries[i].value + '" selected>' + countries[i].label + '</option>'
				: '<option value="' + countries[i].value + '">' + countries[i].label + '</option>'
		$('#country').append(country)
	}
}

// Save Form
function saveForm(formType) {
	var values = {}
	$('input, textarea, select').each(function() {
		if ($(this).is(':radio')) {
			if ($(this).is(':checked')) {
				values[$(this).attr('name')] = $(this).val()
			}
		} else if ($(this).attr('name') !== 'Event-Invite-Code') {
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
				} else {
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
	if (formType === 'Event' && $eventForm[0]) {
		$eventForm[0].reset()
	} else if (formType === 'Custom' && $customForm[0]) {
		$customForm[0].reset()
	}
}

// FORMS AND QUESTIONNAIRS
if (window.location.href.indexOf('/forms/let-questionnaire') > -1) {
	repopulateForm('LET')
	$('.form.let').parsley()
	$('#let-button').on('click', function() {
		saveForm('LET')
	})
}
if (window.location.href.indexOf('/forms/elf-application') > -1) {
	repopulateForm('ELF')
	$('.form.elf').parsley()
	$('#elf-button').on('click', function() {
		saveForm('ELF')
	})
}
if (window.location.href.indexOf('/forms/ctt-application') > -1) {
	repopulateForm('CTT')
	$('.form.ctt').parsley()
	$('#ctt-button').on('click', function() {
		saveForm('CTT')
	})
}

// EVENT REGISTRATION
const $eventForm = $('#wf-form-Event-Registration')

// Hidden fields
const eventCode = $('#event-code')
		.text()
		.toUpperCase(),
	eventTitle = $('#event-name').text(), // Stripe description
	eventStartDate = $('#event-start').text(),
	eventDates = $('#event-dates').text(),
	eventVenue = $('#event-venue').text(),
	eventDepositAmount = parseFloat($('#event-deposit-amount').text()).toFixed(2),
	eventDepositDate = $('#event-deposit-date').text(),
	eventBasePrice = parseFloat($('#event-base-price').text()).toFixed(2),
	eventBaseCost = parseFloat($('#event-base-cost').text()).toFixed(2)

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
	eventAmountContainer = '.event-container.amount',
	eventAmountDisplay = '#event-amount-display',
	eventAmountShow = '#event-amount-show',
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
	billingCountry = '#country',
	billingCard = '#billing-card'

// SCROLL BUGFIX
function scrollPosition() {
	return (
		(window.pageYOffset || document.documentElement.scrollTop) -
		(document.documentElement.clientTop || 0)
	)
}

// PARTICIPANTS
function participants() {
	if (
		$(eventStatus)
			.find('option:selected')
			.val() === 'Couple' ||
		$(eventStatus)
			.find('option:selected')
			.val() === 'Two Singles (paired)'
	) {
		return 2
	} else if (
		$(eventStatus)
			.find('option:selected')
			.val() === 'Single'
	) {
		return 1
	}
}

function paymentQty() {
	return participants() === 2 && $(eventPayBoth).is(':checked') ? 2 : 1
}

function depositAmount() {
	return parseFloat(eventDepositAmount * paymentQty()).toFixed(2)
}

// FORM VALIDATION
// Affiliate code, e.g. MADA25TM1710FS
function affiliateCode(code) {
	var obj = new Object()
	;(obj.discount = function() {
		const discount =
			100 - parseInt(code.substr(4, 2), 10) === 90
				? // Assuming no discount, only to unlock event, e.g. ****10********
				  0
				: // With discount
				  100 - parseInt(code.substr(4, 2), 10)
		return discount === 0 ||
			discount === 25 ||
			discount === 50 ||
			discount === 75 ||
			discount === 100
			? discount
			: null
	}),
		(obj.verify = function() {
			return (
				code.substr(code.length - eventCode.length).toLowerCase() === eventCode.toLowerCase() &&
				this.discount() !== null
			)
		})
	return obj
}
// Affiliate Code Validation
function eventAffiliateValidation() {
	if (isPrivateEvent()) {
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
		$(eventFirstName).val() !== '' &&
		!$(eventFirstName)
			.val()
			.includes(' ') &&
		$(eventLastName).val() !== '' &&
		!$(eventLastName)
			.val()
			.includes(' ') &&
		$(eventEmail).val() !== '' &&
		$(eventMobile).val() !== '' &&
		$(eventBirthdate).val() !== '' &&
		($(eventFemale).is(':checked') || $(eventMale).is(':checked') || $(eventOther).is(':checked'))
	) {
		return true
	}
	return false
}
// Details Validation
function detailsValidation() {
	if (
		$(eventReferral).val() !== '' &&
		(($(eventExperienceYes).is(':checked') && $(eventExperienceDetails).val() !== '') ||
			$(eventExperienceNo).is(':checked')) &&
		(($(eventDietYes).is(':checked') && $(eventDietDetails).val() !== '') ||
			$(eventDietNo).is(':checked')) &&
		(($(eventSpecialYes).is(':checked') && $(eventSpecialDetails).val() !== '') ||
			$(eventSpecialNo).is(':checked'))
	) {
		return true
	}
	return false
}
// Partner Validatation
function partnerValidation() {
	if (
		(participants() === 2 &&
			$(eventPartnerFirstName).val() !== '' &&
			$(eventPartnerLastName).val() !== '' &&
			($(eventPartnerFemale).is(':checked') ||
				$(eventPartnerMale).is(':checked') ||
				$(eventPartnerOther).is(':checked')) &&
			($(eventPayBoth).is(':checked') || $(eventPayMe).is(':checked'))) ||
		participants() === 1
	) {
		return true
	}
	return false
}
// Event Options Validatation
function eventOptionValidation() {
	if (
		$(eventSelect).val() &&
		(($(eventDepositContainer).is(':visible') &&
			($(eventDepositFull).is(':checked') || $(eventDepositDeposit).is(':checked'))) ||
			$(eventDepositContainer).is(':hidden'))
	) {
		return true
	}
	return false
}
// Billing Validation
// Removed for testing purposes:  && $(billingCard).is(':checked')
function billingValidation() {
	if (
		$(billingFirstName).val() !== '' &&
		$(billingLastName).val() !== '' &&
		$(billingStreet).val() !== '' &&
		$(billingCity).val() !== '' &&
		$(billingState).val() !== '' &&
		$(billingPostal).val() !== '' &&
		$(billingCountry).val() !== ''
	) {
		return true
	}
	return false
}
// Complete Validation
function eventFormValidation() {
	if (
		eventAffiliateValidation() &&
		personalValidation() &&
		detailsValidation() &&
		partnerValidation() &&
		eventOptionValidation() &&
		$(eventTerms).is(':checked') &&
		billingValidation()
	) {
		$('#card-errors').text('')
		$(paymentButton).css({ 'background-color': '#800000' })
		$(paymentButton).css({ color: '#ffffff' })
		return true
	}
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ color: '#333333' })
	return false
}

// VISUAL ERROR INDICATORS
function eventAffiliateShowErrors() {
	if (isPrivateEvent()) {
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
	if (!eventAffiliateValidation()) {
		$(eventInviteCode).css(errorInput)
	} else {
		$(eventInviteCode).css(clearInput)
	}
	if (!$(eventTerms).is(':checked')) {
		$(eventTermsValidation).css(errorRadio)
	} else {
		$(eventTermsValidation).css(clearRadio)
	}
	if (
		$(eventDepositContainer).is(':visible') &&
		!$(eventDepositFull).is(':checked') &&
		!$(eventDepositDeposit).is(':checked')
	) {
		$(eventDepositValidation).css(errorRadio)
	} else {
		$(eventDepositValidation).css(clearRadio)
	}
	if (participants() === 2 && !$(eventPayBoth).is(':checked') && !$(eventPayMe).is(':checked')) {
		$(eventPayValidation).css(errorRadio)
	} else {
		$(eventPayValidation).css(clearRadio)
	}
	if (
		participants() === 2 &&
		!$(eventPartnerFemale).is(':checked') &&
		!$(eventPartnerMale).is(':checked') &&
		!$(eventPartnerOther).is(':checked')
	) {
		$(eventPartnerGenderValidation).css(errorRadio)
	} else {
		$(eventPartnerGenderValidation).css(clearRadio)
	}
	if (
		participants() === 2 &&
		($(eventPartnerFirstName).val() !== '' || $(eventPartnerLastName).val() !== '')
	) {
		$(eventPartnerFirstName).css(errorInput)
		$(eventPartnerLastName).css(errorInput)
		$(eventPartnerFirstName).focus()
	} else {
		$(eventPartnerFirstName).css(clearInput)
		$(eventPartnerLastName).css(clearInput)
	}
	if (
		($(eventAffiliateYes).is(':checked') && $(eventAffiliateCode).val() === '') ||
		(!$(eventAffiliateNo).is(':checked') && !$(eventAffiliateYes).is(':checked'))
	) {
		$(eventAffiliateParsleyError).css(errorRadio)
	} else {
		$(eventAffiliateParsleyError).css(clearRadio)
	}
	if (!$(eventSpecialYes).is(':checked') && !$(eventSpecialNo).is(':checked')) {
		$(eventSpecialParsleyError).css(errorRadio)
	} else {
		$(eventSpecialParsleyError).css(clearRadio)
	}
	if ($(eventSpecialYes).is(':checked') && $(eventSpecialDetails).val() === '') {
		$(eventSpecialDetails).css(errorInput)
	} else {
		$(eventSpecialDetails).css(clearInput)
	}
	if (!$(eventDietYes).is(':checked') && !$(eventDietNo).is(':checked')) {
		$(eventDietParsleyError).css(errorRadio)
	} else {
		$(eventDietParsleyError).css(clearRadio)
	}
	if ($(eventDietYes).is(':checked') && $(eventDietDetails).val() === '') {
		$(eventDietDetails).css(errorInput)
	} else {
		$(eventDietDetails).css(clearInput)
	}
	if (!$(eventExperienceYes).is(':checked') && !$(eventExperienceNo).is(':checked')) {
		$(eventExperienceParsleyError).css(errorRadio)
	} else {
		$(eventExperienceParsleyError).css(clearRadio)
	}
	if ($(eventExperienceYes).is(':checked') && $(eventExperienceDetails).val() === '') {
		$(eventExperienceDetails).css(errorInput)
	} else {
		$(eventExperienceDetails).css(clearInput)
	}
	if (
		!$(eventFemale).is(':checked') &&
		!$(eventMale).is(':checked') &&
		!$(eventOther).is(':checked')
	) {
		$(eventGenderValidation).css(errorRadio)
	} else {
		$(eventGenderValidation).css(clearRadio)
	}
	$eventForm.parsley().validate()
}

// SHOW/HIDE FORM ELEMENTS
function isPrivateEvent() {
	return $(eventInviteBox).is(':visible')
}
// Event Invite Code
function eventInvitePassShow() {
	const text =
		eventAffiliateValidation() && affiliateCode($(eventInviteCode).val()).discount() > 0
			? 'Congrats! Invite code accepted!<br />$' +
			  affiliateCode($(eventInviteCode).val()).discount() +
			  ' per person discount applied! Continue below.'
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
	const text =
		eventAffiliateValidation() && affiliateCode($(eventAffiliateCode).val()).discount() > 0
			? 'Congrats! Code accepted!<br />$' +
			  affiliateCode($(eventAffiliateCode).val()).discount() +
			  ' per person discount applied!'
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
	$(
		eventPartnerFemale +
			',' +
			eventPartnerMale +
			',' +
			eventPartnerOther +
			',' +
			eventPayBoth +
			',' +
			eventPayMe
	).prop('checked', false)
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
function showAmount() {
	$(eventAmountContainer).show()
	window.scrollTo(0, scrollPosition() + 1)
}
function hideAmount() {
	$(eventAmountDisplay).val('')
	$(eventAmountContainer).hide()
}

// EVENT OPTIONS AND PRICE CALCULATION
// Calculates affiliate code discount
function eventAffiliateDiscount() {
	// Test if discount even applies
	if (eventAffiliateValidation()) {
		// Invite Code
		if (isPrivateEvent()) {
			return affiliateCode($(eventInviteCode).val()).discount()
		}
		// Affiliate Code
		else if ($(eventAffiliateYes).is(':checked')) {
			return affiliateCode($(eventAffiliateCode).val()).discount()
		}
	}
	return null
}
// Determines whether event is for both couples & singles, couples-only, or singles-only
function setEventStatus() {
	$(eventStatus).empty()
	if ($(eventSpecialRegistration).text() === 'Couples only') {
		$(eventStatus).append(
			$('<option>', {
				value: '',
				text: 'Register as...'
			})
		)
		$(eventStatus).append(
			$('<option>', {
				value: 'Couple',
				text: 'Couple'
			})
		)
		$(eventStatus).append(
			$('<option>', {
				value: 'Two Singles (paired)',
				text: 'Two Singles (paired)'
			})
		)
	} else if ($(eventSpecialRegistration).text() === 'Singles only') {
		$(eventStatus).append(
			$('<option>', {
				value: 'Singles-only event',
				text: 'Single'
			})
		)
	} else {
		$(eventStatus).append(
			$('<option>', {
				value: '',
				text: 'Register as...'
			})
		)
		$(eventStatus).append(
			$('<option>', {
				value: 'Couple',
				text: 'Couple'
			})
		)
		$(eventStatus).append(
			$('<option>', {
				value: 'Single',
				text: 'Single'
			})
		)
		$(eventStatus).append(
			$('<option>', {
				value: 'Two Singles (paired)',
				text: 'Two Singles (paired)'
			})
		)
	}
}

// Get Lodging Code
function getLodging() {
	var eventOptions = $('#event-options')
		.text()
		.split(' | ')
	return eventOptions[$(eventSelect + ' option:selected').index() - 1]
}

function getFullAmount() {
	var eventPrices = $('#event-prices')
		.text()
		.split(' | ')
	return (
		parseFloat(eventPrices[$(eventSelect + ' option:selected').index() - 1]) * paymentQty()
	).toFixed(2)
}

//	Adds event options & prices based on CMS input
function setEventPrices() {
	hideAmount()
	var people = ''
	if (paymentQty() === 2) {
		people = 'for both'
	} else if (paymentQty() === 1 && participants() === 2) {
		people = 'per person'
	}
	var eventOptions = $('#event-options')
		.text()
		.split(' | ')
	var eventPrices = $('#event-prices')
		.text()
		.split(' | ')
	var eventNotes = $('#event-notes')
		.text()
		.includes('|')
		? $('#event-notes')
				.text()
				.split('|')
		: $('#event-notes')
				.text()
				.split(',')
	$(eventSelect).empty()
	if (eventOptions.length > 0) {
		$(eventSelect).append(
			$('<option>', {
				value: '',
				text: 'Event option...'
			})
		)
	}
	const spacer = people ? ' ' : ''
	const closer = people || people === '' ? ')' : ''
	for (var i = 0; i < eventOptions.length; i++) {
		// Event price cannot be less than $0 after discount is applied
		const eventSelectPrice =
			(eventPrices[i] - eventAffiliateDiscount()) * paymentQty() > 0
				? (eventPrices[i] - eventAffiliateDiscount()) * paymentQty()
				: 0
		const affiliateDiscountText = eventAffiliateDiscount() > 0 ? ' including discount' : ''
		const eventNote = eventNotes[i] ? eventNotes[i] : ''
		const eventSelectText =
			eventOptions[i] +
			' ($' +
			eventSelectPrice +
			spacer +
			people +
			affiliateDiscountText +
			closer +
			eventNote
		$(eventSelect).append(
			$('<option>', {
				value: eventSelectPrice,
				text: eventSelectText
			})
		)
	}
	$(eventDepositText).text(
		'Pay deposit only ($' + parseInt(depositAmount(), 10) + spacer + people + ')'
	)
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

	if (isPrivateEvent()) {
		eventInvitePassHide()
		eventInviteFailHide()
	}
	setEventStatus()
	setEventPrices()
	$('#eventcode').val(eventCode)
	if ($(eventAffiliateYes).is(':checked')) {
		showAffiliate()
	} else {
		hideAffiliate()
	}
	if ($(eventExperienceYes).is(':checked')) {
		showExperience()
	} else {
		hideExperience()
	}
	if ($(eventDietYes).is(':checked')) {
		showDiet()
	} else {
		hideDiet()
	}
	if ($(eventSpecialYes).is(':checked')) {
		showSpecial()
	} else {
		hideSpecial()
	}
	if (participants() !== 2) {
		hidePartner()
	} else {
		showPartner()
	}
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
	$(paymentButton).css({ color: '#333333' })

	// If URL contains affiliate code, add to invite field
	const affiliateString = window.location.search
		.slice(1)
		.split('&')
		.map(item => ({ [item.split('=')[0]]: item.split('=')[1] }))
		.find(item => item.affiliate)

	// If private event...
	if (isPrivateEvent()) {
		// Hide the affiliate code box
		$(eventAffiliateSelectionContainer).hide()
		if (affiliateString && affiliateString.affiliate) {
			// Add the affiliate code from the URL into the invite code box
			$(eventInviteCode).val(affiliateString.affiliate)
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
		if (affiliateString && affiliateString.affiliate) {
			// Check the affiliate radio button
			$(eventAffiliateYes).prop('checked', true)
			// Show whether the affiliate code is valid or invalid
			showAffiliate()
			// Add the affiliate code from the URL into the affiliate code box
			$(eventAffiliateCode).val(affiliateString.affiliate)
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
	$('.form-input').keypress(function(e) {
		if (e.which === 13) {
			e.preventDefault()
			return false
		}
	})
}

if (page === 'Event') {
	// EVENT FORM ONCHANGE EVENTS
	if (isPrivateEvent()) {
		// If private event, hide registration form until successful invite code has been entered
		$(eventRegForm).hide()
		$(eventInviteButton).on('click', function(e) {
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
		$(eventAffiliateNo + ',' + eventAffiliateYes).on('change', function() {
			// Show errors, if any
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
			// Validate form
			eventFormValidation()
			if ($(eventAffiliateYes).is(':checked')) showAffiliate()
			if ($(eventAffiliateNo).is(':checked')) hideAffiliate()
		})
		$(eventAffiliateCode).on('change', function() {
			if ($(eventAffiliateYes).is(':checked')) {
				// Show errors, if any
				eventAffiliateShowErrors()
				// Adjust prices
				setEventPrices()
			}
		})
	}
	$(eventFirstName).on('change', function() {
		$(billingFirstName).val($(eventFirstName).val())
	})
	$(eventLastName).on('change', function() {
		$(billingLastName).val($(eventLastName).val())
	})
	$(eventExperienceNo + ',' + eventExperienceYes).on('change', function() {
		if ($(eventExperienceYes).is(':checked')) showExperience()
		if ($(eventExperienceNo).is(':checked')) hideExperience()
	})
	$(eventDietNo + ',' + eventDietYes).on('change', function() {
		if ($(eventDietYes).is(':checked')) showDiet()
		if ($(eventDietNo).is(':checked')) hideDiet()
	})
	$(eventSpecialNo + ',' + eventSpecialYes).on('change', function() {
		if ($(eventSpecialYes).is(':checked')) showSpecial()
		if ($(eventSpecialNo).is(':checked')) hideSpecial()
	})
	$(eventStatus).on('change', function() {
		participants() === 2 ? showPartner() : hidePartner()
	})
	$(eventPayBoth + ',' + eventPayMe).on('change', function() {
		setEventPrices()
	})
	const eventFieldsPersonal =
		eventFirstName +
		',' +
		eventLastName +
		',' +
		eventEmail +
		',' +
		eventMobile +
		',' +
		eventBirthdate +
		',' +
		eventFemale +
		',' +
		eventMale +
		',' +
		eventOther
	const eventFieldsDetails =
		eventReferral +
		',' +
		eventExperienceYes +
		',' +
		eventExperienceNo +
		',' +
		eventExperienceDetails +
		',' +
		eventDietYes +
		',' +
		eventDietNo +
		',' +
		eventDietDetails +
		',' +
		eventSpecialYes +
		',' +
		eventSpecialNo +
		',' +
		eventSpecialDetails
	const eventFieldsPartner =
		eventStatus +
		',' +
		eventPartnerFirstName +
		',' +
		eventPartnerLastName +
		',' +
		eventPartnerFemale +
		',' +
		eventPartnerMale +
		',' +
		eventPartnerOther +
		',' +
		eventPayBoth +
		',' +
		eventPayMe
	const eventFieldsOptions = eventSelect
	const eventFieldsBilling =
		billingFirstName +
		',' +
		billingLastName +
		',' +
		billingStreet +
		',' +
		billingCity +
		',' +
		billingState +
		',' +
		billingPostal +
		',' +
		billingCountry
	$(
		eventFieldsPersonal +
			',' +
			eventFieldsDetails +
			',' +
			eventFieldsPartner +
			',' +
			eventFieldsOptions +
			',' +
			eventTerms +
			',' +
			eventFieldsBilling
	).on('change', function() {
		saveForm(page)
		eventFormValidation()
	})
	$(billingState).keypress(function(e) {
		if (this.value.length >= 2) {
			e.preventDefault()
		}
	})
	$(eventSelect + ',' + eventDepositFull + ',' + eventDepositDeposit).on('change', function() {
		const amount =
			$(eventDepositDeposit).is(':checked') && new Date() < new Date(eventDepositDate)
				? depositAmount()
				: $(eventSelect).val()
		$(eventAmountDisplay).text('Total: $' + amount)
		if ($(eventAmountShow).text() === 'Yes') {
			showAmount()
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
	customPurpose = '#custom-purpose',
	customTerms = '#custom-terms',
	customTermsValidation = '#custom-terms-validation'

// CUSTOM AMOUNT
// Complete Validation
function customChargeValidation() {
	if (
		$(customFirstName).val() !== '' &&
		$(customLastName).val() !== '' &&
		$(customEmail).val() !== '' &&
		$(customMobile).val() !== '' &&
		$(customSelect).val() &&
		$(customPurpose).val() !== '' &&
		$(customTerms).is(':checked') &&
		billingValidation()
	) {
		$('#card-errors').text('')
		$(paymentButton).css({ 'background-color': '#800000' })
		$(paymentButton).css({ color: '#ffffff' })
		return true
	}
	$(paymentButton).css({ 'background-color': '#f5f5f5' })
	$(paymentButton).css({ color: '#333333' })
	return false
}

function showErrorsInCustomForm() {
	const errorRadio = { 'background-color': '#fdd' }
	const clearRadio = { 'background-color': 'transparent' }
	if (!$(customTerms).is(':checked')) {
		$(customTermsValidation).css(errorRadio)
	} else {
		$(customTermsValidation).css(clearRadio)
	}
	$customForm.parsley().validate()
}

function setCustomChargeSelect() {
	//	Adds options & prices based on CMS input
	var customOptions = $('#custom-options')
		.text()
		.split(' | ')
	var customPrices = $('#custom-prices')
		.text()
		.split(' | ')
	$(customSelect).empty()
	if (customOptions.length > 0) {
		$(customSelect).append(
			$('<option>', {
				value: '',
				text: 'Select an option...'
			})
		)
	}
	for (var i = 0; i < customOptions.length; i++) {
		$(customSelect).append(
			$('<option>', {
				value: customPrices[i],
				text: customOptions[i] + ' - $' + customPrices[i]
			})
		)
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
	$(paymentButton).css({ color: '#333333' })
}

// CUSTOM CHARGE FORM: BEGIN SEQUENCE
if (page === 'Custom') {
	// CUSTOM CHARGE ONCHANGE EVENTS
	$(customFirstName).on('change', function() {
		$(billingFirstName).val($(eventFirstName).val())
	})
	$(customLastName).on('change', function() {
		$(billingLastName).val($(eventLastName).val())
	})
	$(
		customFirstName +
			',' +
			customLastName +
			',' +
			customEmail +
			',' +
			customMobile +
			',' +
			customSelect +
			',' +
			customPurpose +
			',' +
			customTerms +
			',' +
			billingFirstName +
			',' +
			billingLastName +
			',' +
			billingStreet +
			',' +
			billingCity +
			',' +
			billingState +
			',' +
			billingPostal +
			',' +
			billingCountry
	).on('change', function() {
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
$('#form-clear').on('click', function() {
	clearForm(page)
})
$('#form-load').on('click', function() {
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
	var i = null
	return (
		(n = n || {}),
		e.find(':input:not([type="submit"])').each(function(r, o) {
			var a = $(o),
				s = a.attr('type'),
				u = a.attr('data-name') || a.attr('name') || 'Field ' + (r + 1),
				l = a.val()
			if (('checkbox' === s && (l = a.is(':checked')), 'radio' === s)) {
				if (null === n[u] || 'string' == typeof n[u]) return
				l = e.find('input[name="' + a.attr('name') + '"]:checked').val() || null
			}
			'string' == typeof l && (l = $.trim(l)), (n[u] = l), (i = i || verification(a, s, u, l))
		}),
		i
	)
}

function verification(t, e, n, i) {
	var r = null,
		k = /e(-)?mail/i,
		_ = /^\S+@\S+$/
	return (
		'password' === e
			? (r = 'Passwords cannot be submitted.')
			: t.attr('required') &&
			  (i
					? (k.test(n) || k.test(t.attr('type'))) &&
					  (_.test(i) || (r = 'Please enter a valid email address for: ' + n))
					: (r = 'Please fill out the required field: ' + n)),
		r
	)
}
function createForm() {
	var formName = '',
		formSubmit = ''
	if (page === 'Event') {
		formName = 'Event Registration'
		formSubmit = $eventForm
	} else if (page === 'Custom') {
		formName = 'Custom Charge'
		formSubmit = $customForm
	}
	var formData = {
		name: formName,
		source: window.location.href,
		test: false,
		fields: {},
		dolphin: false
	}
	var error = conversion(formSubmit, formData.fields)
	if (error) {
		alert(error)
		throw error
	}
	return formData
}

// Payment
function successfulSubmission() {
	window.location.href =
		page === 'Event' ? siteUrl + 'registration' : siteUrl + 'updated-card-charged'
}
function indicateFailedSubmission(type) {
	if (page === 'Event') {
		resetEventForm()
	} else if (page === 'Custom') {
		resetCustomChargeForm()
	}
	$('.button.processing')
		.removeClass('processing')
		.addClass('pay')
	$('.button.pay').attr('disabled', false)
	// Show card error notification
	if (type === 'stripe') {
		console.error('Stripe error')
		$('.notification-modal.card-error').show()
	}
	// Show form error notification. TODO: create form error notification
	else if (type === 'webflow') {
		console.error('Form error')
		$('.notification-modal.form-error').show()
	}
}

function stripeSourceHandler(data) {
	const stripeURL =
		mode === 'production'
			? 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe'
			: 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe-test'
	$('.stripe.processing').show()
	$('.stripe.error').hide()
	$('.button.pay')
		.val(null)
		.removeClass('pay')
		.addClass('processing')
		.show()
	// Webflow submission
	$.ajax({
		type: 'POST',
		url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
		crossDomain: true,
		data: createForm(),
		dataType: 'json'
	})
		// Stripe submission
		.then(function(res) {
			return (
				$.ajax({
					type: 'POST',
					url: stripeURL,
					crossDomain: true,
					data: {
						chargeAmount: data.chargeAmount,
						chargeDescription: data.chargeDescription,
						customerDescription: data.customerDescription,
						customerEmail: data.customerEmail,
						event: data.event,
						party: data.party,
						phone: data.phone,
						participantFirstName: data.participantFirstName,
						participantLastName: data.participantLastName,
						partnerFirstName: data.partnerFirstName,
						partnerLastName: data.partnerLastName,
						quantity: data.quantity,
						priceFullTotal: data.priceFullTotal,
						priceDiscountTotal: data.priceDiscountTotal,
						priceBaseTotal: data.priceBaseTotal,
						costBaseTotal: data.costBaseTotal,
						priceDepositTotal: data.priceDepositTotal,
						priceBalanceDate: data.priceBalanceDate,
						lodging: data.lodging,
						source: data.source
					},
					timeout: 15000
				})
					// Stripe charge succeeded
					.then(function(res) {
						successfulSubmission()
					})
					// Stripe charge failed or timed out
					.catch(function(err) {
						console.error(err)
						// $0 charge to save credit card details on custom charge form
						if (
							err.responseJSON &&
							err.responseJSON.message === 'Invalid positive integer' &&
							page === 'Custom'
						) {
							window.location.href = siteUrl + 'updated-card'
						} else {
							const formData = createForm()
							const errMessage = err && err.statusText ? err.statusText : '(unknown)'
							// TODO: add browser and OS information to error handling
							formData.fields =
								err.statusText === 'timeout'
									? {
											ERROR:
												'Did not receive successful payment confirmation from Stripe on previous registration made by ' +
												formData.fields.Party +
												'. Staff, please verify that payment went through. Customer was informed that registration completed successfully. If Stripe payment exists, no further action has to be taken; if Stripe payment is missing, please reach out to customer for payment.',
											BROWSER: '',
											OS: ''
									  }
									: {
											ERROR:
												'The following error occurred on the previous registration made by ' +
												formData.fields.Party +
												'. Customer was notified of error, and payment likely did not go through. Error: ' +
												errMessage,
											BROWSER: '',
											OS: ''
									  }
							$.ajax({
								type: 'POST',
								url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
								crossDomain: true,
								data: formData,
								dataType: 'json'
							})
								// Redirect customer to successful event.
								.then(function(res) {
									// On timeout, it’s possible that Stripe charge went through, but too late. So we want to prevent customer from being told that it didn’t work, even though payment went through.
									if (err.statusText === 'timeout') {
										successfulSubmission()
									} else {
										indicateFailedSubmission('stripe')
									}
								})
								.catch(function() {
									indicateFailedSubmission('stripe')
								})
						}
						return false
					})
			)
		})
		// Webflow form failed or timed out
		.catch(function(err) {
			indicateFailedSubmission('webflow')
		})
}

const stripe =
	mode === 'production'
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
			color: '#666'
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
	$('.notification-modal.card-error').hide()
})

// Prevent form from being submitted. This is being done manually in stripeSourceHandler()
$($eventForm).on('submit', function(e) {
	return false
})

$(payButton).on('click', function(e) {
	// Prevent accidental submission of form through 'enter' key
	if (e.which === 13) {
		return false
	}
	$('.button.pay').attr('disabled', true)
	e.preventDefault()
	if (page === 'Event') {
		try {
			if (!eventFormValidation()) {
				$('.button.pay').attr('disabled', false)
				showErrorsInEventForm()
				// If there’s no Stripe error message
				if ($('#card-errors').text() === '') {
					$('#card-errors').text('Oops! There’s some missing information.')
				}
				return false
			}
		} catch (err) {
			$('.button.pay').attr('disabled', false)
			alert(err)
		}
	} else if (page === 'Custom') {
		if (!customChargeValidation()) {
			$('.button.pay').attr('disabled', false)
			showErrorsInCustomForm()
			// If there’s no Stripe error message
			if ($('#card-errors').text() === '') {
				$('#card-errors').text('Oops! There’s some missing information.')
			}
			return false
		}
	}
	saveForm(page)
	var customerDescription = '',
		customerEmail = '',
		chargeDescription = '',
		chargeAmount = 0
	if (page === 'Event') {
		// Variables
		chargeAmount = $(eventDepositDeposit).is(':checked')
			? depositAmount() * 100
			: $(eventSelect).val() * 100
		const eventDeposit = $(eventDepositDeposit).is(':checked') ? 'deposit' : 'full'
		customerDescription = $(eventFirstName).val() + ' ' + $(eventLastName).val()
		customerEmail = $(eventEmail).val()
		chargeDescription =
			eventCode +
			' “' +
			eventTitle +
			'” ' +
			eventDeposit +
			' (' +
			eventDates +
			' at ' +
			eventVenue +
			') ' +
			getLodging()
		// Form Variable: Party
		var party = ''
		if (participants() === 1) {
			party = $(eventFirstName).val() + ' ' + $(eventLastName).val()
		} else if (participants() === 2) {
			if ($(eventLastName).val() === $(eventPartnerLastName).val()) {
				party =
					$(eventFirstName).val() +
					' & ' +
					$(eventPartnerFirstName).val() +
					' ' +
					$(eventLastName).val()
			} else {
				party =
					$(eventFirstName).val() +
					' ' +
					$(eventLastName).val() +
					' & ' +
					$(eventPartnerFirstName).val() +
					' ' +
					$(eventPartnerLastName).val()
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
	} else if (page === 'Custom') {
		// Stripe variables
		chargeAmount = $(customSelect).val() * 100
		customerDescription =
			$(customFirstName).val() + ' ' + $(customLastName).val() + ' <' + $(customEmail).val() + '>'
		customerEmail = $(customEmail).val()
		chargeDescription =
			'Custom Charge: ' +
			$(customSelect + ' option:selected')
				.text()
				.substring(0, $(customSelect + ' option:selected').text().length - 16)
	}
	// Form Variable: Charge Description
	$('#charge-description').val(chargeDescription)
	// Form Variable: Charge Amount
	$('#charge-amount').val(parseInt(chargeAmount, 10))
	// Form Variable: Event Option Total
	$('#event-option-total').val($(eventSelect).val() * 100)
	// Form Variable: Event Affiliate Code
	const affiliateCodeValue = $(eventAffiliateCode).val() ? $(eventAffiliateCode).val() : '- none -'
	$('#event-affiliate').val(affiliateCodeValue)
	// Form Variable: Question Diet
	const dietValue = $(eventDietDetails).val() ? $(eventDietDetails).val() : '- none -'
	$('#question-diet').val(dietValue)
	// Form Variable: Question Special
	const specialValue = $(eventSpecialDetails).val() ? $(eventSpecialDetails).val() : '- none -'
	$('#question-special').val(specialValue)
	stripe
		.createSource(card, {
			owner: {
				name: $(billingFirstName).val() + ' ' + $(billingLastName).val(),
				address: {
					line1: $(billingStreet).val(),
					city: $(billingCity).val(),
					state: $(billingState).val(),
					postal_code: $(billingPostal).val(),
					country: $(billingCountry).val()
				},
				email: customerEmail
			}
		})
		.then(function(result) {
			paymentValidation(result)
			if (result.error) {
				$('.button.pay').attr('disabled', false)
				$('#card-errors').text(result.error.message)
				return false
			} else {
				stripeSourceHandler({
					chargeAmount: chargeAmount,
					chargeDescription: chargeDescription,
					customerDescription: customerDescription,
					customerEmail: customerEmail,
					event: eventCode,
					party: party,
					phone: $(eventMobile).val(),
					participantFirstName: $(eventFirstName).val(),
					participantLastName: $(eventLastName).val(),
					partnerFirstName: $(eventPartnerFirstName).val(),
					partnerLastName: $(eventPartnerLastName).val(),
					quantity: paymentQty(),
					priceFullTotal: getFullAmount(),
					priceDiscountTotal: eventAffiliateDiscount(),
					priceBaseTotal: !isNaN(eventBasePrice) ? (eventBasePrice * paymentQty()).toFixed(2) : 0,
					costBaseTotal: !isNaN(eventBaseCost) ? (eventBaseCost * paymentQty()).toFixed(2) : 0,
					priceDepositTotal: $(eventDepositDeposit).is(':checked')
						? (chargeAmount / 100).toFixed(2)
						: 0,
					priceBalanceDate: eventDepositDate,
					lodging: getLodging(),
					source: result.source.id
				})
			}
		})
		.catch(function(error) {
			$('.button.pay').attr('disabled', false)
			alert(error)
		})
})
