// Return url search keys and values
const urlString = Object.assign({}, ...window.location.search.slice(1).split('&').map(item => {
	const property = item.split('=')[0]
	return { [property]: item.split('=')[1] }
}))

// Form page
const isFormPage = () => page() === 'Event' || page() === 'Update'

// Global error checking variable; only activated once “Secure Payment” button is pressed
let DISPLAYERRORS = false

// Hidden fields
const eventCode = getText(getElementById('event-code')).toUpperCase(),
eventName = getText(getElementById('event-name')),
eventDates = getText(getElementById('event-dates')),
eventVenue = getText(getElementById('event-venue')),
eventDepositAmount = parseFloat(getText(getElementById('event-deposit-amount'))).toFixed(2),
eventDepositDate = getText(getElementById('event-deposit-date')),
eventBasePrice = parseFloat(getText(getElementById('event-base-price'))).toFixed(2),
eventBaseCost = parseFloat(getText(getElementById('event-base-cost'))).toFixed(2),
eventStatusRestriction = getText(getElementById('event-status-restriction'))

// Invite-only
const eventInviteButton = getElementById('event-invitecode-button'),
eventInviteBox = getElementById('event-invitecode-box'),
eventInviteCode = getElementById('event-invitecode-code'),
eventInvitePass = getElementById('event-invitecode-pass'),
eventInviteFail = getElementById('event-invitecode-fail')

// Personal
const eventFirstName = getElementById('event-firstname'),
eventLastName = getElementById('event-lastname'),
eventEmail = getElementById('event-email'),
eventMobile = getElementById('event-mobile'),
eventBirthdate = getElementById('event-birthdate'),
eventGenderValidation = getElementById('event-gender-validation'),
eventFemale = getElementById('event-gender-female'),
eventMale = getElementById('event-gender-male'),
eventOther = getElementById('event-gender-other')

// Format
formatPhone(eventMobile)
formatDate(eventBirthdate)

// Details
const eventReferral = getElementById('event-referral'),
eventReferralValidation = getElementById('event-referral-validation'),
eventExperienceContainer = getElementByClassName('container experience'),
eventExperienceValidation = getElementById('event-experience-validation'),
eventExperienceYes = getElementById('event-experience-yes'),
eventExperienceNo = getElementById('event-experience-no'),
eventExperienceDetails = getElementById('event-experience-details'),
eventDietContainer = getElementByClassName('container diet'),
eventDietValidation = getElementById('event-diet-validation'),
eventDietYes = getElementById('event-diet-yes'),
eventDietNo = getElementById('event-diet-no'),
eventDietDetails = getElementById('event-diet-details'),
eventSpecialContainer = getElementByClassName('container special'),
eventSpecialValidation = getElementById('event-special-validation'),
eventSpecialYes = getElementById('event-special-yes'),
eventSpecialNo = getElementById('event-special-no'),
eventSpecialDetails = getElementById('event-special-details')

// Affiliate Code
const eventAffiliateContainer = getElementByClassName('container affiliate'),
eventAffiliateCodeContainer = getElementByClassName('container affiliate-code'),
eventAffiliateValidation = getElementById('event-affiliate-validation'),
eventAffiliateYes = getElementById('event-affiliate-yes'),
eventAffiliateNo = getElementById('event-affiliate-no'),
eventAffiliateCode = getElementById('event-affiliate-code'),
eventAffiliatePass = getElementById('event-affiliate-pass'),
eventAffiliateFail = getElementById('event-affiliate-fail')
const urlDiscountCode = urlString && urlString.affiliate
	? urlString.affiliate
	: null

// Event Status: Couples, Singles, Both
const eventStatus = getElementById('event-status'),
eventStatusValidation = getElementById('event-status-validation'),
eventPartnerContainer = getElementByClassName('container partner'),
eventPartnerFirstName = getElementById('event-partner-firstname'),
eventPartnerLastName = getElementById('event-partner-lastname'),
eventPartnerGenderValidation = getElementById('event-partner-gender-validation'),
eventPartnerFemale = getElementById('event-partner-gender-female'),
eventPartnerMale = getElementById('event-partner-gender-male'),
eventPartnerOther = getElementById('event-partner-gender-other'),
eventPayValidation = getElementById('event-pay-validation'),
eventPayBoth = getElementById('event-pay-both'),
eventPayMe = getElementById('event-pay-me')

// Registration options
const eventOption = getElementById('event-option'),
eventOptionValidation = getElementById('event-option-validation'),
eventOptions = getText(getElementById('event-options')).split(' | '),
eventNotes = getText(getElementById('event-notes')).includes('|')
	? getText(getElementById('event-notes')).split('|')
	: getText(getElementById('event-notes')).split(',')

// Pricing
const eventPrices = getText(getElementById('event-prices')).split(' | '),
eventDepositContainer = getElementByClassName('container deposit'),
eventDepositValidation = getElementById('event-deposit-validation'),
eventDepositText = getElementById('event-deposit-text'),
eventDepositFull = getElementById('event-deposit-full'),
eventDepositDeposit = getElementById('event-deposit-deposit'),
eventAmountContainer = getElementByClassName('container amount'),
eventAmountDisplay = getElementById('event-amount-display'),
eventAmountShow = getElementById('event-amount-show')

// Terms
const eventTermsValidation = getElementById('event-terms-validation'),
eventTerms = getElementById('event-terms')

// Stripe billing variables
const billingFirstName = getElementById('billing-firstname'),
billingLastName = getElementById('billing-lastname'),
billingStreet = getElementById('billing-street'),
billingCity = getElementById('billing-city'),
billingState = getElementById('billing-state'),
billingPostal = getElementById('billing-postal'),
billingCountryValidation = getElementById('billing-country-validation'),
billingCountry = getElementById('country'),
billingCard = getElementById('billing-card'),
billingCardElement = getElementById('billing-card-element'),
billingCardError = getElementById('billing-card-error')

// Pay now
const paymentButton = getElementByClassName('payment-button')

// Countries
let countries = [{value:'AF',label:'Afghanistan'},{value:'AX',label:'Åland Islands'},{value:'AL',label:'Albania'},{value:'DZ',label:'Algeria'},{value:'AS',label:'American Samoa'},{value:'AD',label:'Andorra'},{value:'AO',label:'Angola'},{value:'AI',label:'Anguilla'},{value:'AQ',label:'Antarctica'},{value:'AG',label:'Antigua and Barbuda'},{value:'AR',label:'Argentina'},{value:'AM',label:'Armenia'},{value:'AW',label:'Aruba'},{value:'AU',label:'Australia'},{value:'AT',label:'Austria'},{value:'AZ',label:'Azerbaijan'},{value:'BS',label:'Bahamas'},{value:'BH',label:'Bahrain'},{value:'BD',label:'Bangladesh'},{value:'BB',label:'Barbados'},{value:'BY',label:'Belarus'},{value:'BE',label:'Belgium'},{value:'BZ',label:'Belize'},{value:'BJ',label:'Benin'},{value:'BM',label:'Bermuda'},{value:'BT',label:'Bhutan'},{value:'BO',label:'Bolivia'},{value:'BA',label:'Bosnia and Herzegovina'},{value:'BW',label:'Botswana'},{value:'BV',label:'Bouvet Island'},{value:'BR',label:'Brazil'},{value:'IO',label:'British Indian Ocean Territory'},{value:'BN',label:'Brunei Darussalam'},{value:'BG',label:'Bulgaria'},{value:'BF',label:'Burkina Faso'},{value:'BI',label:'Burundi'},{value:'KH',label:'Cambodia'},{value:'CM',label:'Cameroon'},{value:'CA',label:'Canada'},{value:'CV',label:'Cape Verde'},{value:'KY',label:'Cayman Islands'},{value:'CF',label:'Central African Republic'},{value:'TD',label:'Chad'},{value:'CL',label:'Chile'},{value:'CN',label:'China, People’s Republic of'},{value:'CX',label:'Christmas Island'},{value:'CC',label:'Cocos (Keeling) Islands'},{value:'CO',label:'Colombia'},{value:'KM',label:'Comoros'},{value:'CG',label:'Congo'},{value:'CD',label:'Congo, The Democratic Republic of the'},{value:'CK',label:'Cook Islands'},{value:'CR',label:'Costa Rica'},{value:'CI',label:'Cote D’Ivoire'},{value:'HR',label:'Croatia'},{value:'CU',label:'Cuba'},{value:'CY',label:'Cyprus'},{value:'CZ',label:'Czech Republic'},{value:'DK',label:'Denmark'},{value:'DJ',label:'Djibouti'},{value:'DM',label:'Dominica'},{value:'DO',label:'Dominican Republic'},{value:'EC',label:'Ecuador'},{value:'EG',label:'Egypt'},{value:'SV',label:'El Salvador'},{value:'GQ',label:'Equatorial Guinea'},{value:'ER',label:'Eritrea'},{value:'EE',label:'Estonia'},{value:'ET',label:'Ethiopia'},{value:'FK',label:'Falkland Islands (Malvinas)'},{value:'FO',label:'Faroe Islands'},{value:'FJ',label:'Fiji'},{value:'FI',label:'Finland'},{value:'FR',label:'France'},{value:'GF',label:'French Guiana'},{value:'PF',label:'French Polynesia'},{value:'TF',label:'French Southern Territories'},{value:'GA',label:'Gabon'},{value:'GM',label:'Gambia'},{value:'GE',label:'Georgia'},{value:'DE',label:'Germany'},{value:'GH',label:'Ghana'},{value:'GI',label:'Gibraltar'},{value:'GR',label:'Greece'},{value:'GL',label:'Greenland'},{value:'GD',label:'Grenada'},{value:'GP',label:'Guadeloupe'},{value:'GU',label:'Guam'},{value:'GT',label:'Guatemala'},{value:'GG',label:'Guernsey'},{value:'GN',label:'Guinea'},{value:'GW',label:'Guinea-Bissau'},{value:'GY',label:'Guyana'},{value:'HT',label:'Haiti'},{value:'HM',label:'Heard Island and Mcdonald Islands'},{value:'VA',label:'Holy See (Vatican City State)'},{value:'HN',label:'Honduras'},{value:'HK',label:'Hong Kong'},{value:'HU',label:'Hungary'},{value:'IS',label:'Iceland'},{value:'IN',label:'India'},{value:'ID',label:'Indonesia'},{value:'IR',label:'Iran, Islamic Republic Of'},{value:'IQ',label:'Iraq'},{value:'IE',label:'Ireland'},{value:'IM',label:'Isle of Man'},{value:'IL',label:'Israel'},{value:'IT',label:'Italy'},{value:'JM',label:'Jamaica'},{value:'JP',label:'Japan'},{value:'JE',label:'Jersey'},{value:'JO',label:'Jordan'},{value:'KZ',label:'Kazakhstan'},{value:'KE',label:'Kenya'},{value:'KI',label:'Kiribati'},{value:'KP',label:'Democratic People’s Republic of Korea'},{value:'KR',label:'Korea, Republic of'},{value:'XK',label:'Kosovo'},{value:'KW',label:'Kuwait'},{value:'KG',label:'Kyrgyzstan'},{value:'LA',label:'Lao People’s Democratic Republic'},{value:'LV',label:'Latvia'},{value:'LB',label:'Lebanon'},{value:'LS',label:'Lesotho'},{value:'LR',label:'Liberia'},{value:'LY',label:'Libyan Arab Jamahiriya'},{value:'LI',label:'Liechtenstein'},{value:'LT',label:'Lithuania'},{value:'LU',label:'Luxembourg'},{value:'MO',label:'Macao'},{value:'MK',label:'Macedonia, The Former Yugoslav Republic of'},{value:'MG',label:'Madagascar'},{value:'MW',label:'Malawi'},{value:'MY',label:'Malaysia'},{value:'MV',label:'Maldives'},{value:'ML',label:'Mali'},{value:'MT',label:'Malta'},{value:'MH',label:'Marshall Islands'},{value:'MQ',label:'Martinique'},{value:'MR',label:'Mauritania'},{value:'MU',label:'Mauritius'},{value:'YT',label:'Mayotte'},{value:'MX',label:'Mexico'},{value:'FM',label:'Micronesia, Federated States of'},{value:'MD',label:'Moldova, Republic of'},{value:'MC',label:'Monaco'},{value:'MN',label:'Mongolia'},{value:'ME',label:'Montenegro'},{value:'MS',label:'Montserrat'},{value:'MA',label:'Morocco'},{value:'MZ',label:'Mozambique'},{value:'MM',label:'Myanmar'},{value:'NA',label:'Namibia'},{value:'NR',label:'Nauru'},{value:'NP',label:'Nepal'},{value:'NL',label:'Netherlands'},{value:'AN',label:'Netherlands Antilles'},{value:'NC',label:'New Caledonia'},{value:'NZ',label:'New Zealand'},{value:'NI',label:'Nicaragua'},{value:'NE',label:'Niger'},{value:'NG',label:'Nigeria'},{value:'NU',label:'Niue'},{value:'NF',label:'Norfolk Island'},{value:'MP',label:'Northern Mariana Islands'},{value:'NO',label:'Norway'},{value:'OM',label:'Oman'},{value:'PK',label:'Pakistan'},{value:'PW',label:'Palau'},{value:'PS',label:'Palestine, State of'},{value:'PA',label:'Panama'},{value:'PG',label:'Papua New Guinea'},{value:'PY',label:'Paraguay'},{value:'PE',label:'Peru'},{value:'PH',label:'Philippines'},{value:'PN',label:'Pitcairn'},{value:'PL',label:'Poland'},{value:'PT',label:'Portugal'},{value:'PR',label:'Puerto Rico'},{value:'QA',label:'Qatar'},{value:'RE',label:'Reunion'},{value:'RO',label:'Romania'},{value:'RU',label:'Russian Federation'},{value:'RW',label:'Rwanda'},{value:'SH',label:'Saint Helena'},{value:'KN',label:'Saint Kitts and Nevis'},{value:'LC',label:'Saint Lucia'},{value:'PM',label:'Saint Pierre and Miquelon'},{value:'VC',label:'Saint Vincent and the Grenadines'},{value:'WS',label:'Samoa'},{value:'SM',label:'San Marino'},{value:'ST',label:'Sao Tome and Principe'},{value:'SA',label:'Saudi Arabia'},{value:'SN',label:'Senegal'},{value:'RS',label:'Serbia'},{value:'SC',label:'Seychelles'},{value:'SL',label:'Sierra Leone'},{value:'SG',label:'Singapore'},{value:'SK',label:'Slovakia'},{value:'SI',label:'Slovenia'},{value:'SB',label:'Solomon Islands'},{value:'SO',label:'Somalia'},{value:'ZA',label:'South Africa'},{value:'GS',label:'South Georgia and the South Sandwich Islands'},{value:'ES',label:'Spain'},{value:'LK',label:'Sri Lanka'},{value:'SD',label:'Sudan'},{value:'SR',label:'Suriname'},{value:'SJ',label:'Svalbard and Jan Mayen'},{value:'SZ',label:'Swaziland'},{value:'SE',label:'Sweden'},{value:'CH',label:'Switzerland'},{value:'SY',label:'Syrian Arab Republic'},{value:'TW',label:'Taiwan, Republic of China'},{value:'TJ',label:'Tajikistan'},{value:'TZ',label:'Tanzania, United Republic of'},{value:'TH',label:'Thailand'},{value:'TL',label:'Timor-Leste'},{value:'TG',label:'Togo'},{value:'TK',label:'Tokelau'},{value:'TO',label:'Tonga'},{value:'TT',label:'Trinidad and Tobago'},{value:'TN',label:'Tunisia'},{value:'TR',label:'Turkey'},{value:'TM',label:'Turkmenistan'},{value:'TC',label:'Turks and Caicos Islands'},{value:'TV',label:'Tuvalu'},{value:'UG',label:'Uganda'},{value:'UA',label:'Ukraine'},{value:'AE',label:'United Arab Emirates'},{value:'GB',label:'United Kingdom'},{value:'US',label:'United States'},{value:'UM',label:'United States Minor Outlying Islands'},{value:'UY',label:'Uruguay'},{value:'UZ',label:'Uzbekistan'},{value:'VU',label:'Vanuatu'},{value:'VE',label:'Venezuela'},{value:'VN',label:'Viet Nam'},{value:'VG',label:'Virgin Islands, British'},{value:'VI',label:'Virgin Islands, U.S.'},{value:'WF',label:'Wallis and Futuna'},{value:'EH',label:'Western Sahara'},{value:'YE',label:'Yemen'},{value:'ZM',label:'Zambia'},{value:'ZW',label:'Zimbabwe'}]

if (getElementById('country')) {
	for(let i in countries) {
		let option = document.createElement('option')
		option.text = countries[i].label
		option.value = countries[i].value
		option.selected = countries[i] === 'United States'
			? true
			: false
		appendSelect(getElementById('country'), option)
	}
}