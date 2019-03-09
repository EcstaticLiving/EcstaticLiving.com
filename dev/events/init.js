// Opening for events
const eventTitle = getElementByClassName('event-title', 0)
const eventSubtitle = getElementByClassName('event-subtitle', 0)
const eventDetails = getElementByClassName('event-details', 0)
// Fade in first slide
eventTitle.classList.add('fade-move')
eventSubtitle.classList.add('fade-move')
eventDetails.classList.add('fade-move')
// Email signup form
setTimeout(() => changeEmailContainerBackground(getElementByClassName('email-container-background', 0)), 600)

// Event listener for if reg form is closed
const regFormButtons = getElementsByClassName('button register')
const regFormModalStatus = getElementByClassName('modal-status registration', 0)
const regFormModal = getElementByClassName('modal registration', 0)
const regFormModalWindow = getElementByClassName('modal-window registration', 0)
const regFormContainer = getElementByClassName('container reg-form', 0)
for (let i = 0; i < regFormButtons.length; i++) {
	onClick(regFormButtons[i], () => {
		// Show reg form: browser error that doesn’t show opacity of elements inside modal window unless body is scrolled to top
		window.scrollTo(0, 0)
		setTimeout(() => {
			// Unhide modal
			showElement(regFormModalStatus)
			// Fade in modal
			regFormModal.classList.add('fade')
			// Fade in window
			regFormModalWindow.classList.add('fade')
			// Scroll to top
			regFormContainer.scrollTop = 0
			// Prevent background from scrolling
			document.body.style.overflow = 'hidden'
		}, 100)
	})
}

const regFormClose = getElementByClassName('reg-form-close', 0)
onClick(regFormClose, () => {
	// Reallow background to scroll
	document.body.style.overflow = 'visible'
	// Fade out modal
	regFormModal.classList.remove('fade')
	// Fade out window
	regFormModalWindow.classList.remove('fade')
	// Hide modal
	setTimeout(() => hideElement(regFormModalStatus), 200)
})

// Event summary “Read more...” expansion
getElementByClassName('text read-more', 0).addEventListener('mouseover', () => {
	hideElement(getElementByClassName('text read-more'))
	hideElement(getElementByClassName('text summary'))
	getElementByClassName('text description').classList.add('display')
	setTimeout(() => getElementByClassName('text description display').classList.add('fade'), 100)
})

// Prevent accidental submission of form through 'enter' key
onKeyPress(document, e => {
	if (isInput(e.target) && e.which === 13) {
		e.preventDefault()
		return false
	}
})

let countries = [{value:'AF',label:'Afghanistan'},{value:'AX',label:'Åland Islands'},{value:'AL',label:'Albania'},{value:'DZ',label:'Algeria'},{value:'AS',label:'American Samoa'},{value:'AD',label:'Andorra'},{value:'AO',label:'Angola'},{value:'AI',label:'Anguilla'},{value:'AQ',label:'Antarctica'},{value:'AG',label:'Antigua and Barbuda'},{value:'AR',label:'Argentina'},{value:'AM',label:'Armenia'},{value:'AW',label:'Aruba'},{value:'AU',label:'Australia'},{value:'AT',label:'Austria'},{value:'AZ',label:'Azerbaijan'},{value:'BS',label:'Bahamas'},{value:'BH',label:'Bahrain'},{value:'BD',label:'Bangladesh'},{value:'BB',label:'Barbados'},{value:'BY',label:'Belarus'},{value:'BE',label:'Belgium'},{value:'BZ',label:'Belize'},{value:'BJ',label:'Benin'},{value:'BM',label:'Bermuda'},{value:'BT',label:'Bhutan'},{value:'BO',label:'Bolivia'},{value:'BA',label:'Bosnia and Herzegovina'},{value:'BW',label:'Botswana'},{value:'BV',label:'Bouvet Island'},{value:'BR',label:'Brazil'},{value:'IO',label:'British Indian Ocean Territory'},{value:'BN',label:'Brunei Darussalam'},{value:'BG',label:'Bulgaria'},{value:'BF',label:'Burkina Faso'},{value:'BI',label:'Burundi'},{value:'KH',label:'Cambodia'},{value:'CM',label:'Cameroon'},{value:'CA',label:'Canada'},{value:'CV',label:'Cape Verde'},{value:'KY',label:'Cayman Islands'},{value:'CF',label:'Central African Republic'},{value:'TD',label:'Chad'},{value:'CL',label:'Chile'},{value:'CN',label:'China, People’s Republic of'},{value:'CX',label:'Christmas Island'},{value:'CC',label:'Cocos (Keeling) Islands'},{value:'CO',label:'Colombia'},{value:'KM',label:'Comoros'},{value:'CG',label:'Congo'},{value:'CD',label:'Congo, The Democratic Republic of the'},{value:'CK',label:'Cook Islands'},{value:'CR',label:'Costa Rica'},{value:'CI',label:'Cote D’Ivoire'},{value:'HR',label:'Croatia'},{value:'CU',label:'Cuba'},{value:'CY',label:'Cyprus'},{value:'CZ',label:'Czech Republic'},{value:'DK',label:'Denmark'},{value:'DJ',label:'Djibouti'},{value:'DM',label:'Dominica'},{value:'DO',label:'Dominican Republic'},{value:'EC',label:'Ecuador'},{value:'EG',label:'Egypt'},{value:'SV',label:'El Salvador'},{value:'GQ',label:'Equatorial Guinea'},{value:'ER',label:'Eritrea'},{value:'EE',label:'Estonia'},{value:'ET',label:'Ethiopia'},{value:'FK',label:'Falkland Islands (Malvinas)'},{value:'FO',label:'Faroe Islands'},{value:'FJ',label:'Fiji'},{value:'FI',label:'Finland'},{value:'FR',label:'France'},{value:'GF',label:'French Guiana'},{value:'PF',label:'French Polynesia'},{value:'TF',label:'French Southern Territories'},{value:'GA',label:'Gabon'},{value:'GM',label:'Gambia'},{value:'GE',label:'Georgia'},{value:'DE',label:'Germany'},{value:'GH',label:'Ghana'},{value:'GI',label:'Gibraltar'},{value:'GR',label:'Greece'},{value:'GL',label:'Greenland'},{value:'GD',label:'Grenada'},{value:'GP',label:'Guadeloupe'},{value:'GU',label:'Guam'},{value:'GT',label:'Guatemala'},{value:'GG',label:'Guernsey'},{value:'GN',label:'Guinea'},{value:'GW',label:'Guinea-Bissau'},{value:'GY',label:'Guyana'},{value:'HT',label:'Haiti'},{value:'HM',label:'Heard Island and Mcdonald Islands'},{value:'VA',label:'Holy See (Vatican City State)'},{value:'HN',label:'Honduras'},{value:'HK',label:'Hong Kong'},{value:'HU',label:'Hungary'},{value:'IS',label:'Iceland'},{value:'IN',label:'India'},{value:'ID',label:'Indonesia'},{value:'IR',label:'Iran, Islamic Republic Of'},{value:'IQ',label:'Iraq'},{value:'IE',label:'Ireland'},{value:'IM',label:'Isle of Man'},{value:'IL',label:'Israel'},{value:'IT',label:'Italy'},{value:'JM',label:'Jamaica'},{value:'JP',label:'Japan'},{value:'JE',label:'Jersey'},{value:'JO',label:'Jordan'},{value:'KZ',label:'Kazakhstan'},{value:'KE',label:'Kenya'},{value:'KI',label:'Kiribati'},{value:'KP',label:'Democratic People’s Republic of Korea'},{value:'KR',label:'Korea, Republic of'},{value:'XK',label:'Kosovo'},{value:'KW',label:'Kuwait'},{value:'KG',label:'Kyrgyzstan'},{value:'LA',label:'Lao People’s Democratic Republic'},{value:'LV',label:'Latvia'},{value:'LB',label:'Lebanon'},{value:'LS',label:'Lesotho'},{value:'LR',label:'Liberia'},{value:'LY',label:'Libyan Arab Jamahiriya'},{value:'LI',label:'Liechtenstein'},{value:'LT',label:'Lithuania'},{value:'LU',label:'Luxembourg'},{value:'MO',label:'Macao'},{value:'MK',label:'Macedonia, The Former Yugoslav Republic of'},{value:'MG',label:'Madagascar'},{value:'MW',label:'Malawi'},{value:'MY',label:'Malaysia'},{value:'MV',label:'Maldives'},{value:'ML',label:'Mali'},{value:'MT',label:'Malta'},{value:'MH',label:'Marshall Islands'},{value:'MQ',label:'Martinique'},{value:'MR',label:'Mauritania'},{value:'MU',label:'Mauritius'},{value:'YT',label:'Mayotte'},{value:'MX',label:'Mexico'},{value:'FM',label:'Micronesia, Federated States of'},{value:'MD',label:'Moldova, Republic of'},{value:'MC',label:'Monaco'},{value:'MN',label:'Mongolia'},{value:'ME',label:'Montenegro'},{value:'MS',label:'Montserrat'},{value:'MA',label:'Morocco'},{value:'MZ',label:'Mozambique'},{value:'MM',label:'Myanmar'},{value:'NA',label:'Namibia'},{value:'NR',label:'Nauru'},{value:'NP',label:'Nepal'},{value:'NL',label:'Netherlands'},{value:'AN',label:'Netherlands Antilles'},{value:'NC',label:'New Caledonia'},{value:'NZ',label:'New Zealand'},{value:'NI',label:'Nicaragua'},{value:'NE',label:'Niger'},{value:'NG',label:'Nigeria'},{value:'NU',label:'Niue'},{value:'NF',label:'Norfolk Island'},{value:'MP',label:'Northern Mariana Islands'},{value:'NO',label:'Norway'},{value:'OM',label:'Oman'},{value:'PK',label:'Pakistan'},{value:'PW',label:'Palau'},{value:'PS',label:'Palestine, State of'},{value:'PA',label:'Panama'},{value:'PG',label:'Papua New Guinea'},{value:'PY',label:'Paraguay'},{value:'PE',label:'Peru'},{value:'PH',label:'Philippines'},{value:'PN',label:'Pitcairn'},{value:'PL',label:'Poland'},{value:'PT',label:'Portugal'},{value:'PR',label:'Puerto Rico'},{value:'QA',label:'Qatar'},{value:'RE',label:'Reunion'},{value:'RO',label:'Romania'},{value:'RU',label:'Russian Federation'},{value:'RW',label:'Rwanda'},{value:'SH',label:'Saint Helena'},{value:'KN',label:'Saint Kitts and Nevis'},{value:'LC',label:'Saint Lucia'},{value:'PM',label:'Saint Pierre and Miquelon'},{value:'VC',label:'Saint Vincent and the Grenadines'},{value:'WS',label:'Samoa'},{value:'SM',label:'San Marino'},{value:'ST',label:'Sao Tome and Principe'},{value:'SA',label:'Saudi Arabia'},{value:'SN',label:'Senegal'},{value:'RS',label:'Serbia'},{value:'SC',label:'Seychelles'},{value:'SL',label:'Sierra Leone'},{value:'SG',label:'Singapore'},{value:'SK',label:'Slovakia'},{value:'SI',label:'Slovenia'},{value:'SB',label:'Solomon Islands'},{value:'SO',label:'Somalia'},{value:'ZA',label:'South Africa'},{value:'GS',label:'South Georgia and the South Sandwich Islands'},{value:'ES',label:'Spain'},{value:'LK',label:'Sri Lanka'},{value:'SD',label:'Sudan'},{value:'SR',label:'Suriname'},{value:'SJ',label:'Svalbard and Jan Mayen'},{value:'SZ',label:'Swaziland'},{value:'SE',label:'Sweden'},{value:'CH',label:'Switzerland'},{value:'SY',label:'Syrian Arab Republic'},{value:'TW',label:'Taiwan, Republic of China'},{value:'TJ',label:'Tajikistan'},{value:'TZ',label:'Tanzania, United Republic of'},{value:'TH',label:'Thailand'},{value:'TL',label:'Timor-Leste'},{value:'TG',label:'Togo'},{value:'TK',label:'Tokelau'},{value:'TO',label:'Tonga'},{value:'TT',label:'Trinidad and Tobago'},{value:'TN',label:'Tunisia'},{value:'TR',label:'Turkey'},{value:'TM',label:'Turkmenistan'},{value:'TC',label:'Turks and Caicos Islands'},{value:'TV',label:'Tuvalu'},{value:'UG',label:'Uganda'},{value:'UA',label:'Ukraine'},{value:'AE',label:'United Arab Emirates'},{value:'GB',label:'United Kingdom'},{value:'US',label:'United States'},{value:'UM',label:'United States Minor Outlying Islands'},{value:'UY',label:'Uruguay'},{value:'UZ',label:'Uzbekistan'},{value:'VU',label:'Vanuatu'},{value:'VE',label:'Venezuela'},{value:'VN',label:'Viet Nam'},{value:'VG',label:'Virgin Islands, British'},{value:'VI',label:'Virgin Islands, U.S.'},{value:'WF',label:'Wallis and Futuna'},{value:'EH',label:'Western Sahara'},{value:'YE',label:'Yemen'},{value:'ZM',label:'Zambia'},{value:'ZW',label:'Zimbabwe'}]

// Countries
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

// Load reg form scripts
const baseScriptUrl = 'https://ecstaticliving.github.io/ecstaticliving.com/dev/events/'
const scripts = ['elements', 'functions', 'onchange', 'webflow', 'payment']
// Load scripts synchronously, one after another, to make sure hierarchy is respected.
const loadScript = index => {
	let js = document.createElement('script')
	js.src = baseScriptUrl + scripts[index] + '.js'
	js.onload = () => {
		// Once final script has loaded, initialise
		if (scripts[index] === 'payment' && (page() === 'Event' || page() === 'Update')) {
			resetForm()
			scriptsHaveBeenLoaded = true
		}
		else {
			loadScript(index + 1)
		}
	}
	document.head.appendChild(js)
}
loadScript(0)
