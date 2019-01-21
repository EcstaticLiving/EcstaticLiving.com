// 1. CONSTANTS
const page = () => {
  if (containsUrl('/events/'))  return 'Event'
  if (endsWithUrl('/update'))   return 'Custom'
  return null
}

let countries = [{value:'AF',label:'Afghanistan'},{value:'AX',label:'Åland Islands'},{value:'AL',label:'Albania'},{value:'DZ',label:'Algeria'},{value:'AS',label:'American Samoa'},{value:'AD',label:'Andorra'},{value:'AO',label:'Angola'},{value:'AI',label:'Anguilla'},{value:'AQ',label:'Antarctica'},{value:'AG',label:'Antigua and Barbuda'},{value:'AR',label:'Argentina'},{value:'AM',label:'Armenia'},{value:'AW',label:'Aruba'},{value:'AU',label:'Australia'},{value:'AT',label:'Austria'},{value:'AZ',label:'Azerbaijan'},{value:'BS',label:'Bahamas'},{value:'BH',label:'Bahrain'},{value:'BD',label:'Bangladesh'},{value:'BB',label:'Barbados'},{value:'BY',label:'Belarus'},{value:'BE',label:'Belgium'},{value:'BZ',label:'Belize'},{value:'BJ',label:'Benin'},{value:'BM',label:'Bermuda'},{value:'BT',label:'Bhutan'},{value:'BO',label:'Bolivia'},{value:'BA',label:'Bosnia and Herzegovina'},{value:'BW',label:'Botswana'},{value:'BV',label:'Bouvet Island'},{value:'BR',label:'Brazil'},{value:'IO',label:'British Indian Ocean Territory'},{value:'BN',label:'Brunei Darussalam'},{value:'BG',label:'Bulgaria'},{value:'BF',label:'Burkina Faso'},{value:'BI',label:'Burundi'},{value:'KH',label:'Cambodia'},{value:'CM',label:'Cameroon'},{value:'CA',label:'Canada'},{value:'CV',label:'Cape Verde'},{value:'KY',label:'Cayman Islands'},{value:'CF',label:'Central African Republic'},{value:'TD',label:'Chad'},{value:'CL',label:'Chile'},{value:'CN',label:'China, People’s Republic of'},{value:'CX',label:'Christmas Island'},{value:'CC',label:'Cocos (Keeling) Islands'},{value:'CO',label:'Colombia'},{value:'KM',label:'Comoros'},{value:'CG',label:'Congo'},{value:'CD',label:'Congo, The Democratic Republic of the'},{value:'CK',label:'Cook Islands'},{value:'CR',label:'Costa Rica'},{value:'CI',label:'Cote D’Ivoire'},{value:'HR',label:'Croatia'},{value:'CU',label:'Cuba'},{value:'CY',label:'Cyprus'},{value:'CZ',label:'Czech Republic'},{value:'DK',label:'Denmark'},{value:'DJ',label:'Djibouti'},{value:'DM',label:'Dominica'},{value:'DO',label:'Dominican Republic'},{value:'EC',label:'Ecuador'},{value:'EG',label:'Egypt'},{value:'SV',label:'El Salvador'},{value:'GQ',label:'Equatorial Guinea'},{value:'ER',label:'Eritrea'},{value:'EE',label:'Estonia'},{value:'ET',label:'Ethiopia'},{value:'FK',label:'Falkland Islands (Malvinas)'},{value:'FO',label:'Faroe Islands'},{value:'FJ',label:'Fiji'},{value:'FI',label:'Finland'},{value:'FR',label:'France'},{value:'GF',label:'French Guiana'},{value:'PF',label:'French Polynesia'},{value:'TF',label:'French Southern Territories'},{value:'GA',label:'Gabon'},{value:'GM',label:'Gambia'},{value:'GE',label:'Georgia'},{value:'DE',label:'Germany'},{value:'GH',label:'Ghana'},{value:'GI',label:'Gibraltar'},{value:'GR',label:'Greece'},{value:'GL',label:'Greenland'},{value:'GD',label:'Grenada'},{value:'GP',label:'Guadeloupe'},{value:'GU',label:'Guam'},{value:'GT',label:'Guatemala'},{value:'GG',label:'Guernsey'},{value:'GN',label:'Guinea'},{value:'GW',label:'Guinea-Bissau'},{value:'GY',label:'Guyana'},{value:'HT',label:'Haiti'},{value:'HM',label:'Heard Island and Mcdonald Islands'},{value:'VA',label:'Holy See (Vatican City State)'},{value:'HN',label:'Honduras'},{value:'HK',label:'Hong Kong'},{value:'HU',label:'Hungary'},{value:'IS',label:'Iceland'},{value:'IN',label:'India'},{value:'ID',label:'Indonesia'},{value:'IR',label:'Iran, Islamic Republic Of'},{value:'IQ',label:'Iraq'},{value:'IE',label:'Ireland'},{value:'IM',label:'Isle of Man'},{value:'IL',label:'Israel'},{value:'IT',label:'Italy'},{value:'JM',label:'Jamaica'},{value:'JP',label:'Japan'},{value:'JE',label:'Jersey'},{value:'JO',label:'Jordan'},{value:'KZ',label:'Kazakhstan'},{value:'KE',label:'Kenya'},{value:'KI',label:'Kiribati'},{value:'KP',label:'Democratic People’s Republic of Korea'},{value:'KR',label:'Korea, Republic of'},{value:'XK',label:'Kosovo'},{value:'KW',label:'Kuwait'},{value:'KG',label:'Kyrgyzstan'},{value:'LA',label:'Lao People’s Democratic Republic'},{value:'LV',label:'Latvia'},{value:'LB',label:'Lebanon'},{value:'LS',label:'Lesotho'},{value:'LR',label:'Liberia'},{value:'LY',label:'Libyan Arab Jamahiriya'},{value:'LI',label:'Liechtenstein'},{value:'LT',label:'Lithuania'},{value:'LU',label:'Luxembourg'},{value:'MO',label:'Macao'},{value:'MK',label:'Macedonia, The Former Yugoslav Republic of'},{value:'MG',label:'Madagascar'},{value:'MW',label:'Malawi'},{value:'MY',label:'Malaysia'},{value:'MV',label:'Maldives'},{value:'ML',label:'Mali'},{value:'MT',label:'Malta'},{value:'MH',label:'Marshall Islands'},{value:'MQ',label:'Martinique'},{value:'MR',label:'Mauritania'},{value:'MU',label:'Mauritius'},{value:'YT',label:'Mayotte'},{value:'MX',label:'Mexico'},{value:'FM',label:'Micronesia, Federated States of'},{value:'MD',label:'Moldova, Republic of'},{value:'MC',label:'Monaco'},{value:'MN',label:'Mongolia'},{value:'ME',label:'Montenegro'},{value:'MS',label:'Montserrat'},{value:'MA',label:'Morocco'},{value:'MZ',label:'Mozambique'},{value:'MM',label:'Myanmar'},{value:'NA',label:'Namibia'},{value:'NR',label:'Nauru'},{value:'NP',label:'Nepal'},{value:'NL',label:'Netherlands'},{value:'AN',label:'Netherlands Antilles'},{value:'NC',label:'New Caledonia'},{value:'NZ',label:'New Zealand'},{value:'NI',label:'Nicaragua'},{value:'NE',label:'Niger'},{value:'NG',label:'Nigeria'},{value:'NU',label:'Niue'},{value:'NF',label:'Norfolk Island'},{value:'MP',label:'Northern Mariana Islands'},{value:'NO',label:'Norway'},{value:'OM',label:'Oman'},{value:'PK',label:'Pakistan'},{value:'PW',label:'Palau'},{value:'PS',label:'Palestine, State of'},{value:'PA',label:'Panama'},{value:'PG',label:'Papua New Guinea'},{value:'PY',label:'Paraguay'},{value:'PE',label:'Peru'},{value:'PH',label:'Philippines'},{value:'PN',label:'Pitcairn'},{value:'PL',label:'Poland'},{value:'PT',label:'Portugal'},{value:'PR',label:'Puerto Rico'},{value:'QA',label:'Qatar'},{value:'RE',label:'Reunion'},{value:'RO',label:'Romania'},{value:'RU',label:'Russian Federation'},{value:'RW',label:'Rwanda'},{value:'SH',label:'Saint Helena'},{value:'KN',label:'Saint Kitts and Nevis'},{value:'LC',label:'Saint Lucia'},{value:'PM',label:'Saint Pierre and Miquelon'},{value:'VC',label:'Saint Vincent and the Grenadines'},{value:'WS',label:'Samoa'},{value:'SM',label:'San Marino'},{value:'ST',label:'Sao Tome and Principe'},{value:'SA',label:'Saudi Arabia'},{value:'SN',label:'Senegal'},{value:'RS',label:'Serbia'},{value:'SC',label:'Seychelles'},{value:'SL',label:'Sierra Leone'},{value:'SG',label:'Singapore'},{value:'SK',label:'Slovakia'},{value:'SI',label:'Slovenia'},{value:'SB',label:'Solomon Islands'},{value:'SO',label:'Somalia'},{value:'ZA',label:'South Africa'},{value:'GS',label:'South Georgia and the South Sandwich Islands'},{value:'ES',label:'Spain'},{value:'LK',label:'Sri Lanka'},{value:'SD',label:'Sudan'},{value:'SR',label:'Suriname'},{value:'SJ',label:'Svalbard and Jan Mayen'},{value:'SZ',label:'Swaziland'},{value:'SE',label:'Sweden'},{value:'CH',label:'Switzerland'},{value:'SY',label:'Syrian Arab Republic'},{value:'TW',label:'Taiwan, Republic of China'},{value:'TJ',label:'Tajikistan'},{value:'TZ',label:'Tanzania, United Republic of'},{value:'TH',label:'Thailand'},{value:'TL',label:'Timor-Leste'},{value:'TG',label:'Togo'},{value:'TK',label:'Tokelau'},{value:'TO',label:'Tonga'},{value:'TT',label:'Trinidad and Tobago'},{value:'TN',label:'Tunisia'},{value:'TR',label:'Turkey'},{value:'TM',label:'Turkmenistan'},{value:'TC',label:'Turks and Caicos Islands'},{value:'TV',label:'Tuvalu'},{value:'UG',label:'Uganda'},{value:'UA',label:'Ukraine'},{value:'AE',label:'United Arab Emirates'},{value:'GB',label:'United Kingdom'},{value:'US',label:'United States'},{value:'UM',label:'United States Minor Outlying Islands'},{value:'UY',label:'Uruguay'},{value:'UZ',label:'Uzbekistan'},{value:'VU',label:'Vanuatu'},{value:'VE',label:'Venezuela'},{value:'VN',label:'Viet Nam'},{value:'VG',label:'Virgin Islands, British'},{value:'VI',label:'Virgin Islands, U.S.'},{value:'WF',label:'Wallis and Futuna'},{value:'EH',label:'Western Sahara'},{value:'YE',label:'Yemen'},{value:'ZM',label:'Zambia'},{value:'ZW',label:'Zimbabwe'}]
// Countries
for(let i in countries) {
	const country = countries[i] === 'United States'
		? '<option value="' + countries[i].value + '" selected>' + countries[i].label + '</option>'
		: '<option value="' + countries[i].value + '">' + countries[i].label + '</option>'
  $('#country').append(country)
}

// Event Reg Form
const eventForm = '#wf-form-Event-Registration'
// Hidden fields
const eventCode = getText('#event-code').toUpperCase(),
eventTitle = getText('#event-name'),
eventStartDate = getText('#event-start'),
eventDates = getText('#event-dates'),
eventVenue = getText('#event-venue'),
eventDepositAmount = parseFloat(getText('#event-deposit-amount')).toFixed(2),
eventDepositDate = getText('#event-deposit-date'),
eventBasePrice = parseFloat(getText('#event-base-price')).toFixed(2),
eventBaseCost = parseFloat(getText('#event-base-cost')).toFixed(2)
// Event variables
const eventRegForm = '.event-container.reg-form',
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

// Custom charge form
const customForm = '#wf-form-Custom-Charge',
customCode = '#custom-code',
customFirstName = '#custom-firstname',
customLastName = '#custom-lastname',
customEmail = '#custom-email',
customMobile = '#custom-mobile',
customSelect = '#custom-select',
customTerms = '#custom-terms',
customTermsValidation = '#custom-terms-validation'



// Save reg form
const saveForm = formType => {
	let values = {}
	$('input, textarea, select').each(() => {
    const name = $(this).attr('name')
		if ((isRadio(isChecked(this)) && $(this)) || name !== 'Event-Invite-Code') {
			values[name] = getValue(this)
		}
	})
	localStorage.setItem('EcstaticLiving:' + formType, JSON.stringify(values))
}

// Repopulate saved reg form
const repopulateForm = formType => {
	if (localStorage.getItem('EcstaticLiving:' + formType)) {
		hide('#form-load')
		show('#form-clear')
		let values = JSON.parse(localStorage.getItem('EcstaticLiving:' + formType))
    try {
      for (let item in values) {
				if (isRadio('*[name=' + item + ']')) {
					isChecked('input[name=' + item + '][value="' + values[item] + '"]')
				}
				else {
          setValue('*[name=' + item + ']', values[item])
				}	
      }
    }
    catch (err) {
			localStorage.removeItem('EcstaticLiving:' + formType)
		}
	}
}

// Clear reg form
const clearForm = formType => {
	show('#form-load')
	hide('#form-clear')
	hide('.w-form-done')
	hide('.w-form-fail')
	if (formType === 'Event' && $(eventForm)[0]) {
		$(eventForm)[0].reset()
  }
  else if (formType === 'Custom' && $(customForm)[0]) {
		$(customForm)[0].reset()
	}
}

// Scroll bugfix
const scrollToPosition = () => window.scrollTo(0, (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0) + 1)

// # of participants
const participants = () => ((getValue($(eventStatus).find('option:selected')) === 'Couple') || (getValue($(eventStatus).find('option:selected')) === 'Two Singles (paired)')) ? 2 : 1

// # of people paid for
const paymentQty = () => participants() === 2 && isChecked(eventPayBoth) ? 2 : 1

// Deposit amount
const depositAmount = () => parseFloat(eventDepositAmount * paymentQty()).toFixed(2)

// Private event
const isPrivateEvent = () => isVisible(eventInviteBox)

// Create name of party
const partyName = () => {
  if (participants() === 2) {
    return getValue(eventLastName) === getValue(eventPartnerLastName)
      ? getValue(eventFirstName) + ' & ' + getValue(eventPartnerFirstName) + ' ' + getValue(eventLastName)
      : getValue(eventFirstName) + ' ' + getValue(eventLastName) + ' & ' + getValue(eventPartnerFirstName) + ' ' + getValue(eventPartnerLastName)
  }
  return getValue(eventFirstName) + ' ' + getValue(eventLastName)
}

// Calculate discount based on discount code
const calculateDiscount = discountCode => { // Affiliate code, e.g. MADA25TM1710FS
  const discount = 100 - parseInt(discountCode.substr(4, 2), 10) === 90
    // Assuming no discount, only to unlock event, e.g. ****10********
    ? 0
    // With discount
    : 100 - parseInt(discountCode.substr(4, 2), 10)
  return (discount === 0 || discount === 25 || discount === 50 || discount === 75 || discount === 100) ? discount : null
}

// Check to see if discount code applies to this event
const discountCodeValidation = () => {
	const discountCode = isPrivateEvent() ? getValue(eventInviteCode) : getValue(eventAffiliateCode)
	return discountCode.substr(discountCode.length - eventCode.length).toLowerCase() === eventCode.toLowerCase() && calculateDiscount(discountCode)
}

// Get discount amount based on either invite field or affiliate code field
const getDiscount = () => discountCodeValidation() && calculateDiscount(isPrivateEvent() ? getValue(eventInviteCode) : getValue(eventAffiliateCode))

// Name & Gender Validation
const personalValidation = () => {
	if (
		!isBlank(eventFirstName) && !getValue(eventFirstName).includes(' ') && !isBlank(eventLastName) && !getValue(eventLastName).includes(' ') && !isBlank(eventEmail) && !isBlank(eventMobile) && !isBlank(eventBirthdate) &&
		(isChecked(eventFemale) || isChecked(eventMale) || isChecked(eventOther))
	) {
		return true
	}
	return false
}

// Details Validation
const detailsValidation = () => {
	return (
		!isBlank(eventReferral)
		&& ((isChecked(eventExperienceYes) && !isBlank(eventExperienceDetails)) || isChecked(eventExperienceNo))
		&& ((isChecked(eventDietYes) && !isBlank(eventDietDetails)) || isChecked(eventDietNo))
		&& ((isChecked(eventSpecialYes) && !isBlank(eventSpecialDetails)) || isChecked(eventSpecialNo))
	)
}

// Partner Validatation
const partnerValidation = () => {
	return (
		(
			participants() === 2
			&& !isBlank(eventPartnerFirstName) && !isBlank(eventPartnerLastName)
			&& (isChecked(eventPartnerFemale) || isChecked(eventPartnerMale) || isChecked(eventPartnerOther))
			&& (isChecked(eventPayBoth) || isChecked(eventPayMe))
		)
		|| participants() === 1
	)
}

// Event Options Validatation
const eventOptionValidation = () => {
	return (
		getValue(eventSelect) && (
    	(
				isVisible(eventDepositContainer)
				&& (isChecked(eventDepositFull) || isChecked(eventDepositDeposit))
			)
			|| !isVisible(eventDepositContainer)
    )
	)
}

// Billing Validation
const billingValidation = () => {
	// TODO: removed for testing purposes:  `&& isChecked(billingCard)`
	return (
		!isBlank(billingFirstName) && !isBlank(billingLastName) && !isBlank(billingStreet) && !isBlank(billingCity)
		&& !isBlank(billingState) && !isBlank(billingPostal) && !isBlank(billingCountry)
	)
}

// Complete Validation
const eventFormValidation = () => {
	if (
		discountCodeValidation() && personalValidation() && detailsValidation() && partnerValidation() && eventOptionValidation() && isChecked(eventTerms) && billingValidation()
	) {
		emptyText('#card-errors')
		setCss(paymentButton, { 'background-color': '#800000' })
		setCss(paymentButton, { 'color': '#ffffff' })
		return true
	}
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
	return false
}

// VISUAL ERROR INDICATORS
const eventAffiliateShowErrors = () => {
	if (isPrivateEvent()) {
		if (getValue(eventInviteCode).length > 0) {
			if (!discountCodeValidation()) {
				hide(eventRegForm)
				emptyHideText(eventInvitePass)
				eventInviteFailShow()
      }
      else {
				show(eventRegForm)
				hide(eventInviteFail)
				eventInvitePassShow()
			}
    }
    else {
			hide(eventRegForm)
			emptyHideText(eventInvitePass)
			hide(eventInviteFail)
		}
	} else if (isChecked(eventAffiliateYes)) {
		if (getValue(eventAffiliateCode).length > 0) {
			if (!discountCodeValidation()) {
				emptyHideText(eventAffiliatePass)
				eventAffiliateFailShow()
			} else {
				emptyHideText(eventAffiliateFail)
				eventAffiliatePassShow()
			}
		} else {
			emptyHideText(eventAffiliatePass)
			emptyHideText(eventAffiliateFail)
		}
	}
}
const showErrorsInEventForm = () => {
  const showError = element => isRadio(element)
    ? setCss(element, { 'background-color': '#fdd' })
    : setCss(element, { 'border-color': '#b00000', 'background-color': '#fdd' })
  const clearError = element => isRadio(element)
    ? setCss(element, { 'background-color': 'transparent' })
    : setCss(element, { 'border-color': '#ccc', 'background-color': '#fff' })
  const indicateError = ({ condition, element }) => {
    if (condition) {
      showError(element)
    }
    else {
      clearError(element)
    }
  }
  indicateError({ condition: !discountCodeValidation(), element: eventInviteCode })
  indicateError({ condition: !isChecked(eventTerms), element: eventTermsValidation })
  indicateError({ condition: isVisible(eventDepositContainer) && !isChecked(eventDepositFull) && !isChecked(eventDepositDeposit), element: 'eventDepositValidation' })
  indicateError({ condition: participants() === 2 && !isChecked(eventPayBoth) && !isChecked(eventPayMe), element: eventPayValidation })
  indicateError({ condition: participants() === 2 && !isChecked(eventPartnerFemale) && !isChecked(eventPartnerMale) && !isChecked(eventPartnerOther), element: eventPartnerGenderValidation })
  if (participants() === 2 && (!isBlank(eventPartnerFirstName) || !isBlank(eventPartnerLastName))) {
		showError(eventPartnerFirstName)
		showError(eventPartnerLastName)
		focus(eventPartnerFirstName)
	}
	else {
    clearError(eventPartnerFirstName)
    clearError(eventPartnerLastName)
	}
  indicateError({ condition: (isChecked(eventAffiliateYes) && isBlank(eventAffiliateCode)) || (!isChecked(eventAffiliateNo) && !isChecked(eventAffiliateYes)), element: eventAffiliateParsleyError })
  indicateError({ condition: !isChecked(eventSpecialYes) && !isChecked(eventSpecialNo), element: eventSpecialParsleyError })
  indicateError({ condition: isChecked(eventSpecialYes) && isBlank(eventSpecialDetails), element: eventSpecialDetails })
  indicateError({ condition: !isChecked(eventDietYes) && !isChecked(eventDietNo), element: eventDietParsleyError })
  indicateError({ condition: isChecked(eventDietYes) && isBlank(eventDietDetails), element: eventDietDetails })
  indicateError({ condition: !isChecked(eventExperienceYes) && !isChecked(eventExperienceNo), element: eventExperienceParsleyError })
  indicateError({ condition: isChecked(eventExperienceYes) && isBlank(eventExperienceDetails), element: eventExperienceDetails })
  indicateError({ condition: !isChecked(eventFemale) && !isChecked(eventMale) && !isChecked(eventOther), element: eventGenderValidation })
	$(eventForm).parsley().validate()
}


// SHOW/HIDE FORM ELEMENTS
// Event Invite Code
const emptyHideText = elem => {
	emptyText(elem)
	hide(elem)
}
const emptyHideValue = elem => {
	emptyValue(elem)
	hide(elem)
}
const showScroll = elem => {
	show(elem)
	scrollToPosition()
}

const eventInvitePassShow = () => {
	const text = calculateDiscount(getValue(eventInviteCode)) > 0
		? 'Congrats! Invite code accepted!<br />$' + calculateDiscount(getValue(eventInviteCode)) + ' per person discount applied! Continue below.'
    : 'Congrats! Invite code accepted!<br />Continue below.'
	setHtml(eventInvitePass, text)
	show(eventInvitePass)
	scrollToPosition()
}
const eventInviteFailShow = () => {
	show(eventInviteFail)
	focus(eventInviteCode)
}
// Affiliate Code
const hideAffiliate = () => {
	emptyValue(eventAffiliateCode)
	hide(eventAffiliateContainer)
}
const eventAffiliatePassShow = () => {
	const text = calculateDiscount(getValue(eventAffiliateCode)) > 0
		? 'Congrats! Code accepted!<br />$' + calculateDiscount(getValue(eventAffiliateCode)) + ' per person discount applied!'
		: 'Congrats! Code accepted!'
  setHtml(eventAffiliatePass, text)
	show(eventAffiliatePass)
	scrollToPosition()
}
const eventAffiliateFailShow = () => {
	const text = 'Sorry, you’ve entered an invalid affiliate code.'
  setHtml(eventAffiliateFail, text)
	show(eventAffiliateFail)
	scrollToPosition()
	focus(eventAffiliateCode)
}

// Partner
const showPartner = () => {
	show(eventPartnerContainer)
	scrollToPosition()
	if (isChecked(eventPayBoth)) {
		setEventPrices('for both')
	} else {
		setEventPrices('per person')
	}
}
const hidePartner = () => {
	emptyValue(eventPartnerFirstName)
	emptyValue(eventPartnerLastName)
	$(eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe).prop('checked', false)
	hide(eventPartnerContainer)
	setEventPrices()
}
const hideExperience = () => {
	emptyValue(eventExperienceDetails)
	hide(eventExperienceContainer)
}
const hideDiet = () => {
	emptyValue(eventDietDetails)
	hide(eventDietContainer)
}
// Special Question
const hideSpecial = () => {
	emptyValue(eventSpecialDetails)
	hide(eventSpecialContainer)
}
const hideAmount = () => {
	emptyValue(eventAmountDisplay)
	hide(eventAmountContainer)
}



// EVENT OPTIONS AND PRICE CALCULATION
// Determines whether event is for both couples & singles, couples-only, or singles-only
const setEventStatus = () => {
	$(eventStatus).empty()
	if (getText(eventSpecialRegistration) === 'Couples only') {
		$(eventStatus).append($('<option>', { text: 'Register as...', value: '' }))
		$(eventStatus).append($('<option>', { text: 'Couple', value: 'Couple' }))
		$(eventStatus).append($('<option>', { text: 'Two Singles (paired)', value: 'Two Singles (paired)' }))
  }
  else if (getText(eventSpecialRegistration) === 'Singles only') {
		$(eventStatus).append($('<option>', { text: 'Single', value: 'Singles-only event' }))
  }
  else {
		$(eventStatus).append($('<option>', { text: 'Register as...', value: '' }))
		$(eventStatus).append($('<option>', { text: 'Couple', value: 'Couple' }))
		$(eventStatus).append($('<option>', { text: 'Single', value: 'Single' }))
		$(eventStatus).append($('<option>', { text: 'Two Singles (paired)', value: 'Two Singles (paired)' }))
	}
}
//	Adds event options & prices based on CMS input
const setEventPrices = () => {
	hideAmount()
	let people = ''
	if (paymentQty() === 2) {
		people = 'for both'
	} else if (paymentQty() === 1 && participants() === 2) {
		people = 'per person'
	}
	let eventOptions = getText('#event-options').split(' | ')
	let eventPrices = getText('#event-prices').split(' | ')
	let eventNotes = getText('#event-notes').includes('|')
		? getText('#event-notes').split('|')
		: getText('#event-notes').split(',')
	$(eventSelect).empty()
	if (eventOptions.length > 0) {
		$(eventSelect).append($('<option>', { text: 'Event option...', value: '' }))
	}
	const spacer = people ? ' ' : ''
	const closer = (people || people === '') ? ')' : ''
	for (let i = 0; i < eventOptions.length; i++) {
		// Event price cannot be less than $0 after discount is applied
		const eventSelectPrice = (eventPrices[i] - getDiscount()) * paymentQty() > 0 ? (eventPrices[i] - getDiscount()) * paymentQty() : 0
		const affiliateDiscountText = getDiscount() > 0 ? ' including discount' : ''
		const eventNote = eventNotes[i] ? eventNotes[i] : ''
		const eventSelectText = eventOptions[i] + ' ($' + eventSelectPrice + spacer + people + affiliateDiscountText + closer + eventNote
		$(eventSelect).append($('<option>', {
			value: eventSelectPrice,
			text: eventSelectText
		}))
  }
  setText(eventDepositText, 'Pay deposit only ($' + depositAmount() + spacer + people + ')')
}


// EVENT FORM RESET
const resetEventForm = () => {
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
		emptyHideText(eventInvitePass)
		hide(eventInviteFail)
	}
	setEventStatus()
	setEventPrices()
	setValue('#eventcode', eventCode)
	if (isChecked(eventAffiliateYes)) {
    showScroll(eventAffiliateContainer)
  }
  else {
    hideAffiliate()
  }
	if (isChecked(eventExperienceYes)) {
    showScroll(eventExperienceContainer)
  }
  else {
    hideExperience()
  }
	if (isChecked(eventDietYes)) {
    showScroll(eventDietContainer)
  }
  else {
    hideDiet()
  }
	if (isChecked(eventSpecialYes)) {
    showScroll(eventSpecialContainer)
  }
  else {
    hideSpecial()
  }
	if (participants() !== 2) {
    hidePartner()
  }
  else {
    showPartner()
  }
	if (new Date() < new Date(eventDepositDate)) {
		show(eventDepositContainer)
		scrollToPosition()
		$(eventDepositFull).prop('checked', true)
  }
  else {
		hide(eventDepositContainer)
	}
	$(eventForm).parsley()
	show(eventForm)
	$(eventTerms).attr('checked', false)
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })

	// If private event...
	if (isPrivateEvent()) {
		// Hide the affiliate code box
		hide(eventAffiliateSelectionContainer)
		// If URL contains affiliate code, add to invite field
		let affiliateString = window.location.search.slice(1).split('=')
		if (affiliateString[0] === 'affiliate') {
			// Add the affiliate code from the URL into the invite code box
			setValue(eventInviteCode, affiliateString[1])
			// Verify affiliate code
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		}
	}
	// If public event...
	else {
		// Show the affiliate code box
		show(eventAffiliateSelectionContainer)
		scrollToPosition()
		// If URL contains affiliate code, add to affiliate field
		let affiliateString = window.location.search.slice(1).split('=')
		if (affiliateString[0] === 'affiliate') {
			// Check the affiliate radio button
			$(eventAffiliateYes).prop('checked', true)
			// Show whether the affiliate code is valid or invalid
			showScroll(eventAffiliateContainer)
			// Add the affiliate code from the URL into the affiliate code box
			setValue(eventAffiliateCode, affiliateString[1])
			// Verify affiliate code
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		}
	}
}


// EVENT FORM: BEGIN SEQUENCE
if (page() === 'Event' || page() === 'Custom') {

	// Prevent accidental submission of form through 'enter' key
	$('.form-input').keypress(e => {
		if (e.which === 13) {
			e.preventDefault()
			return false
		}
	})

}

if (page() === 'Event') {

	// EVENT FORM ONCHANGE EVENTS
	if (isPrivateEvent()) {
		// If private event, hide registration form until successful invite code has been entered
		hide(eventRegForm)
		$(eventInviteButton).on('click', e => {
			e.preventDefault()
			// Show errors, if any
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
		})
	}
	else {
		// Make sure event reg form is shown if not private event
		show(eventRegForm)
		// Affiliate code shown on public events, not private events
		$(eventAffiliateNo + ',' + eventAffiliateYes).on('change', () => {
			// Show errors, if any
			eventAffiliateShowErrors()
			// Adjust prices
			setEventPrices()
			// Validate form
			eventFormValidation()
			if (isChecked(eventAffiliateYes)) showScroll(eventAffiliateContainer)
			if (isChecked(eventAffiliateNo)) hideAffiliate()
		})
		$(eventAffiliateCode).on('change', () => {
			if (isChecked(eventAffiliateYes)) {
				// Show errors, if any
				eventAffiliateShowErrors()
				// Adjust prices
				setEventPrices()
			}
		})
	}
	$(eventFirstName).on('change', () => setValue(billingFirstName, getValue(eventFirstName)))
	$(eventLastName).on('change', () => setValue(billingLastName, getValue(eventLastName)))
	$(eventExperienceNo + ',' + eventExperienceYes).on('change', () => {
		if (isChecked(eventExperienceYes)) showScroll(eventExperienceContainer)
		if (isChecked(eventExperienceNo)) hideExperience()
	})
	$(eventDietNo + ',' + eventDietYes).on('change', () => {
		if (isChecked(eventDietYes)) showScroll(eventDietContainer)
		if (isChecked(eventDietNo)) hideDiet()
	})
	$(eventSpecialNo + ',' + eventSpecialYes).on('change', () => {
		if (isChecked(eventSpecialYes)) showScroll(eventSpecialContainer)
		if (isChecked(eventSpecialNo)) hideSpecial()
	})
	$(eventStatus).on('change', () => participants() === 2 ? showPartner() : hidePartner())
	$(eventPayBoth + ',' + eventPayMe).on('change', () => setEventPrices())
	const eventFieldsPersonal = eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther
	const eventFieldsDetails = eventReferral + ',' + eventExperienceYes + ',' + eventExperienceNo + ',' + eventExperienceDetails + ',' + eventDietYes + ',' + eventDietNo + ',' + eventDietDetails + ',' + eventSpecialYes + ',' + eventSpecialNo + ',' + eventSpecialDetails
	const eventFieldsPartner = eventStatus + ',' + eventPartnerFirstName + ',' + eventPartnerLastName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe
	const eventFieldsOptions = eventSelect
	const eventFieldsBilling = billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry
	$(eventFieldsPersonal + ',' + eventFieldsDetails + ',' + eventFieldsPartner + ',' + eventFieldsOptions + ',' + eventTerms + ',' + eventFieldsBilling).on('change', () => {
		saveForm(page)
		eventFormValidation()
	})
	$(billingState).keypress((e) => {
		if (this.value.length >= 2) {
			e.preventDefault()
		}
	})
	$(eventSelect + ',' + eventDepositFull + ',' + eventDepositDeposit).on('change', () => {
		const amount = isChecked(eventDepositDeposit) && new Date() < new Date(eventDepositDate)
			? depositAmount()
			: getValue(eventSelect)
		setText(eventAmountDisplay, 'Total: $' + amount)
		if (getText(eventAmountShow) === 'Yes') { showScroll(eventAmountContainer) }
	})

	// RESET EVENT FORM
	resetEventForm()
}






// CUSTOM AMOUNT
// Complete Validation
const customChargeValidation = () => {
	if (!isBlank(customFirstName) && !isBlank(customLastName) && !isBlank(customEmail) && !isBlank(customMobile) && getValue(customSelect) && isChecked(customTerms) && billingValidation()) {
		emptyText('#card-errors')
		setCss(paymentButton, { 'background-color': '#800000' })
		setCss(paymentButton, { 'color': '#ffffff' })
		return true
	}
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
	return false
}

const showErrorsInCustomForm = () => {
	if (!isChecked(customTerms)) {
    setCss(customTermsValidation, { 'background-color': '#fdd' })
  }
  else {
    setCss(customTermsValidation, { 'background-color': 'transparent' })
  }
	$(customForm).parsley().validate()
}

const setCustomChargeSelect = () => {
	//	Adds options & prices based on CMS input
	let customOptions = getText('#custom-options').split(' | ')
	let customPrices = getText('#custom-prices').split(' | ')
	$(customSelect).empty()
	if (customOptions.length > 0) {
		$(customSelect).append($('<option>', { text: 'Custom charge option...', value: '' }))
	}
	for (let i = 0; i < customOptions.length; i++) {
		$(customSelect).append($('<option>', { text: customOptions[i] + ' - $' + customPrices[i], value: customPrices[i] }))
	}
}

const resetCustomChargeForm = () => {
	clearForm('Custom')
	repopulateForm('Custom')
	setCustomChargeSelect()
	$(customForm).parsley()
	show(customForm)
	$(customTerms).attr('checked', false)
	customChargeValidation()
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
}


// CUSTOM CHARGE FORM: BEGIN SEQUENCE
if (page() === 'Custom') {

	// CUSTOM CHARGE ONCHANGE EVENTS
	$(customFirstName).on('change', () => setValue(billingFirstName, getValue(eventFirstName)))
	$(customLastName).on('change', () => setValue(billingLastName, getValue(eventLastName)))
	$(customFirstName + ',' + customLastName + ',' + customEmail + ',' + customMobile + ',' + customSelect + ',' + customTerms + ',' + billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry).on('change', () => {
		customChargeValidation()
	})

	// RESET CUSTOM CHARGE
	resetCustomChargeForm()
}



// Show / hide populate and clear forms
if (localStorage.getItem('EcstaticLiving:' + page)) {
	hide('#form-load')
	show('#form-clear')
}
else {
	hide('#form-load')
	hide('#form-clear')
}
$('#form-clear').on('click', () => clearForm(page))
$('#form-load').on('click', () => repopulateForm(page))



// STRIPE
const paymentValidation = (result) => {
	if (result.complete) {
		// Check hidden field to enable eventFormValidation() or customChargeValidation() to pass
		$(billingCard).prop('checked', true)
	}
	if (!result.complete) {
		$(billingCard).prop('checked', false)
	}
	// Validate event
	if (page() === 'Event') {
		eventFormValidation()
	} else if (page() === 'Custom') {
		customChargeValidation()
	}
	if (result.error) {
		setText('#card-errors', result.error.message)
		return false
	} else {
		emptyText('#card-errors')
	}
}

// Webflow code to submit form
const conversion = (e, n) => {
	let i = null;
	return n = n || {}, e.find(':input:not([type="submit"])').each((r, o) => {
		let a = $(o),
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
const verification = (t, e, n, i) => {
	let r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/;
	return "password" === e ? r = "Passwords cannot be submitted." : t.attr("required") && (i ? (k.test(n) || k.test(t.attr("type"))) && (_.test(i) || (r = "Please enter a valid email address for: " + n)) : r = "Please fill out the required field: " + n), r
}
const createForm = () => {
	let formData = {
		name: page() === 'Event' ? 'Event Registration' : 'Custom Charge',
		source: window.location.href,
		test: false,
		fields: {},
		dolphin: false
	}
	let error = conversion(page() === 'Event' ? $(eventForm) : $(customForm), formData.fields)
	if (error) {
		alert(error)
		throw error
	}
	return formData
}

// Payment
const successfulSubmission = () => {
	hide('.notification-modal.processing')
	const siteUrl = containsUrl('ecstaticliving.com')
		? 'https://www.ecstaticliving.com/'
		: 'https://ecstaticliving.webflow.io/'
	window.location.href = page() === 'Event'
		? siteUrl + 'registration'
		: siteUrl + 'updated-card-charged'
}
const indicateFailedSubmission = (type) => {
	if (page() === 'Event') {
		resetEventForm()
	}
	else if (page() === 'Custom') {
		resetCustomChargeForm()
	}
	hide('.notification-modal.processing')
	// Show card error notification
	if (type === 'stripe') {
		console.error('Stripe error')
		show('.notification-modal.card-error')
	}
	// Show form error notification. TODO: create form error notification
	else if (type === 'webflow') {
		console.error('Form error')
		show('.notification-modal.form-error')
	}
}

const stripeSourceHandler = (data) => {
	show('.stripe.processing')
	hide('.stripe.error')
	show('.notification-modal.processing')
	// Webflow submission
	$.ajax({
		type: 'POST',
		url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
		crossDomain: true,
		data: createForm(),
		dataType: 'json'
	})
		// Stripe submission
		.then(res => {
			return $.ajax({
				type: 'POST',
				url: containsUrl('ecstaticliving.com')
          ? 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe'
          : 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.sandbox.auth0-extend.com/stripe-test',
				crossDomain: true,
				data: {
					'chargeAmount': data.chargeAmount,
					'chargeDescription': data.chargeDescription,
					'customerDescription': data.customerDescription,
					'customerEmail': data.customerEmail,
					'event': data.event,
					'party': data.party,
					'phone': data.phone,
					'participantFirstName': data.participantFirstName,
					'participantLastName': data.participantLastName,
					'partnerFirstName': data.partnerFirstName,
					'partnerLastName': data.partnerLastName,
					'quantity': data.quantity,
					'rate': data.rate,
					'priceFull': data.priceFull,
					'priceDiscount': data.priceDiscount,
					'priceBase': data.priceBase,
					'costBase': data.costBase,
					'priceDeposit': data.priceDeposit,
					'priceBalanceDate': data.priceBalanceDate,
					'lodging': data.lodging,
					'source': data.source
				},
				timeout: 15000
			})
				// Stripe charge succeeded
				.then(res => {
					successfulSubmission()
				})
				// Stripe charge failed or timed out
				.catch(err => {
					console.error(err)
					// $0 charge to save credit card details on custom charge form
					if (err.responseJSON && err.responseJSON.message === 'Invalid positive integer' && page() === 'Custom') {
						window.location.href = containsUrl('ecstaticliving.com')
							? 'https://www.ecstaticliving.com/updated-card'
							: 'https://ecstaticliving.webflow.io/updated-card'
					}
					else {
						const formData = createForm()
						formData.fields = err.statusText === 'timeout'
							? {
								ERROR: 'Did not receive successful payment confirmation from Stripe on previous registration made by ' + formData.fields.Party + '. Staff, please verify that payment went through. Customer was informed that registration completed successfully. If Stripe payment exists, no further action has to be taken; if Stripe payment is missing, please reach out to customer for payment.'
							}
							: {
								ERROR: 'The following error occurred on the previous registration made by ' + formData.fields.Party + '. Customer was notified of error, and payment likely did not go through. Error: ' + err
							}
						$.ajax({
							type: 'POST',
							url: 'https://webflow.com/api/v1/form/564aac835a5735b1375b5cdf',
							crossDomain: true,
							data: formData,
							dataType: 'json'
						})
							// Redirect customer to successful event.
							.then(res => {
								// On timeout, it’s possible that Stripe charge went through, but too late. So we want to prevent customer from being told that it didn’t work, even though payment went through.
								if (err.statusText === 'timeout') {
									successfulSubmission()
								}
								else {
									indicateFailedSubmission('stripe')
								}
							})
							.catch(err => indicateFailedSubmission('stripe'))
					}
					return false
				})
		})
		// Webflow form failed or timed out
		.catch(err => indicateFailedSubmission('webflow'))
}

const elements = containsUrl('ecstaticliving.com')
	? Stripe('pk_live_0rULIvKhv6aSLqI49Ae5rflI').elements()
	: Stripe('pk_test_QO6tO6bHny3y10LjH96f4n3p').elements()
const card = elements.create('card', {
	hidePostalCode: true,
	style: {
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
})
if (page() === 'Event' || page() === 'Custom') {
	card.mount('#card-element')
	card.addEventListener('change', result => paymentValidation(result))
}

$('#button-stripe-error').on('click', () => hide('.notification-modal.card-error'))

// Prevent form from being submitted. This is being done manually in stripeSourceHandler()
$(eventForm).on('submit', () => false)

$(paymentButton).on('click', (e) => {
	// Prevent accidental submission of form through 'enter' key
	if (e.which === 13) {
		return false
	}
	e.preventDefault()
	if (page() === 'Event') {
		try {
			if (!eventFormValidation()) {
				showErrorsInEventForm()
				// If there’s no Stripe error message
				if (isBlank('#card-errors')) {
					setText('#card-errors', 'Oops! There’s some missing information.')
				}
				return false
			}
		}
		catch(err) {
			alert(err)
		}
  }
  else if (page() === 'Custom') {
		if (!customChargeValidation()) {
			showErrorsInCustomForm()
			// If there’s no Stripe error message
			if (isBlank('#card-errors')) {
				setText('#card-errors', 'Oops! There’s some missing information.')
			}
			return false
		}
	}
	saveForm(page)
	let customerDescription = '', customerEmail = '', chargeDescription = '', chargeAmount = 0
	if (page() === 'Event') {
		// Variables
		chargeAmount = isChecked(eventDepositDeposit)
			? depositAmount() * 100
			: getValue(eventSelect) * 100
		customerDescription = getValue(eventFirstName) + ' ' + getValue(eventLastName) + ' <' + getValue(eventEmail) + '>'
		customerEmail = getValue(eventEmail)
		chargeDescription = eventTitle + ' ' + eventDates + ', ' + eventVenue + ', ' + getText(eventSelect + ' option:selected').substring(0, getText(eventSelect + ' option:selected').length - 16) + ', ' + isChecked(eventDepositDeposit) ? 'DEPOSIT' : 'FULL'
    // Form Variable: Party
    setValue('#party', partyName())
		// Form Variable: Traffic Source
    let trafficSource = window.location.search.slice(1).split('=')
    setValue('#trafficsource', window.location.search && trafficSource[0] === 'source' ? trafficSource[1] : 'ELI')
	}
	else if (page() === 'Custom') {
		// Stripe variables
		chargeAmount = getValue(customSelect) * 100
		customerDescription = getValue(customFirstName) + ' ' + getValue(customLastName) + ' <' + getValue(customEmail) + '>'
		customerEmail = getValue(customEmail)
		chargeDescription = 'Custom Charge: ' + getText(customSelect + ' option:selected').substring(0, getText(customSelect + ' option:selected').length - 16)
	}
	// Form Variable: Charge Description
	setValue('#charge-description', chargeDescription)
  // Form Variable: Charge Amount
  setValue('#charge-amount', parseInt(chargeAmount, 10))
  // Form Variable: Event Option Total
  setValue('#event-option-total', getValue(eventSelect) * 100)
	// Form Variable: Event Affiliate Code
	const affiliateCodeValue = getValue(eventAffiliateCode)
		? getValue(eventAffiliateCode)
		: '- none -'
	setValue('#event-affiliate', affiliateCodeValue)
	// Form Variable: Question Diet
	const dietValue = getValue(eventDietDetails)
		? getValue(eventDietDetails)
		: '- none -'
	setValue('#question-diet', dietValue)
	// Form Variable: Question Special
	const specialValue = getValue(eventSpecialDetails)
		? getValue(eventSpecialDetails)
		: '- none -'
	setValue('#question-special', specialValue)
	stripe.createSource(card, {
		owner: {
			name: getValue(billingFirstName) + ' ' + getValue(billingLastName),
			address: {
				line1: getValue(billingStreet),
				city: getValue(billingCity),
				state: getValue(billingState),
				postal_code: getValue(billingPostal),
				country: getValue(billingCountry)
			},
			email: customerEmail
		}
	})
		.then(result => {
			paymentValidation(result)
			if (result.error) {
				setText('#card-errors', result.error.message)
				return false
			}
			else {
				let eventOptions = getText('#event-options').split(' | ')
				let eventPrices = getText('#event-prices').split(' | ')
				const selected = $(eventSelect + ' option:selected').index() - 1
				stripeSourceHandler({
					'chargeAmount': chargeAmount,
					'chargeDescription': chargeDescription,
					'customerDescription': customerDescription,
					'customerEmail': customerEmail,
					'event': eventCode,
					'party': partyName(),
					'phone': getValue(eventMobile),
					'participantFirstName': getValue(eventFirstName),
					'participantLastName': getValue(eventLastName),
					'partnerFirstName': getValue(eventPartnerFirstName),
					'partnerLastName': getValue(eventPartnerLastName),
					'quantity': paymentQty(),
					'rate': ((chargeAmount/paymentQty())/100).toFixed(2),
					'priceFull': (eventPrices[selected] * paymentQty()).toFixed(2),
					'priceDiscount': getDiscount(),
					'priceBase': !isNaN(eventBasePrice) ? (eventBasePrice * paymentQty()).toFixed(2) : 0,
					'costBase': !isNaN(eventBaseCost) ? (eventBaseCost * paymentQty()).toFixed(2) : 0,
					'priceDeposit': isChecked(eventDepositDeposit) ? (chargeAmount/100).toFixed(2) : 0,
					'priceBalanceDate': eventDepositDate,
					'lodging': eventOptions[selected],
					'source': result.source.id
				})
			}
		})
		.catch(err => alert(err))
})
