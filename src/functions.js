// Code ©2017 - 2019 Ecstatic Life Inc. All rights reserved.
console.log(window.location.href.indexOf('ecstaticliving.com') > -1 ? 'Welcome to EcstaticLiving.com' : 'TEST code at ', window.location.href)

// Urls
const containsUrl = str => window.location.href.indexOf(str) > -1
const endsWithUrl = str => window.location.href.endsWith(str)

// Page
const page = () => {
  if (containsUrl('/events/'))  					return 'Event'
  if (endsWithUrl('/update'))  						return 'Update'
  return null
}

// Device
const deviceOrientation = () => window.innerWidth > window.innerHeight
	? 'landscape'
	: 'portrait'

const deviceType = () => {
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (
		(deviceOrientation() === 'portrait' && window.innerWidth > 1024)
		|| (deviceOrientation() === 'landscape' && window.innerWidth > 1366)
	) {
		return 'desktop'
	}
	if (
		(deviceOrientation() === 'portrait' && window.innerWidth > 768)
		|| (deviceOrientation() === 'landscape' && window.innerWidth > 1024)
	) {
		return 'large tablet'
	}
	if (
		(deviceOrientation() === 'portrait' && window.innerWidth > 414)
		|| (deviceOrientation() === 'landscape' && window.innerWidth > 736)
	) {
		return 'tablet'
	}
	return 'mobile'
}

// Format input fields
const formatPhone = elem => {
	let intTel = window.intlTelInput(elem, {
		// Need to use cleave.js for validation instead, since IntTel removed formatting-as-you-type: https://github.com/jackocnr/intl-tel-input/issues/346
		formatOnDisplay: false,
		nationalMode: false,
		preferredCountries: ['us', 'ca'],
		separateDialCode: false,
		utilsScript: 'https://ecstaticliving.github.io/ecstaticliving.com/src/other/inttel-utils.js'
	})
	// Uses cleave.js for format-as-you-type validation
	const cleave = new Cleave(elem, {
		phone: true,
		phoneRegionCode: 'us'
	})
	elem.addEventListener("countrychange", e => cleave.phoneRegionCode = intTel.getSelectedCountryData().iso2)
}
const formatDate = elem => {
	new Cleave(elem, {
		date: true,
    delimiter: '/',
    datePattern: ['m', 'd', 'Y']
	})
}
const phoneInputs = document.querySelectorAll('input[name="phone"]')
phoneInputs.forEach(phoneInput => formatPhone(phoneInput))

// Element Collections
const querySelectorAll = (className, i) => document.querySelectorAll(className)[i || 0]
const querySelector = className => document.querySelector(className)
const getAttribute = (elem, attribute) => elem.getAttribute(attribute)
const getElementById = elem => document.getElementById(elem)
const getElementByClassName = (className, i) => document.getElementsByClassName(className)[i || 0]
const getElementsByClassName = className => document.getElementsByClassName(className)
const getElementsByTag = tag => document.getElementsByTagName(tag)

// Window Event Listener
const windowEventListener = (triggers, f) => triggers.forEach(trigger => window.addEventListener(trigger, f))

// Element Event Listeners
const onClick = (elem, f) => elem.addEventListener('click', e => f(e))
const onChange = (elem, f) => elem.addEventListener('change', e => f(e))
const onInput = (elem, f) => elem.addEventListener('input', f)
const onKeyPress = (elem, f) => elem.addEventListener('keypress', e => f(e))
const onLoad = (elem, f) => elem.addEventListener('load', f)
const onOrientationChange = (elem, f) => elem.addEventListener('orientationchange', f)
const onScroll = (elem, f) => elem.addEventListener('scroll', f)
const onSubmit = (elem, f) => elem.addEventListener('submit', f)

// Form behaviours
const formSubmit = elem => elem.submit()
const formErrorInit = elem => elem.parsley()
const formErrorValidation = elem => {
	console.log(elem)
	elem.parsley().validate()
}
const formReset = elem => elem.reset()

// Element Conditions
const isInput = elem => elem.type === 'input'
const isRadio = elem => elem.type === 'radio'
const isBlank = elem => getValue(elem) === '' && getValue(elem) === ''
const isChecked = elem => elem.checked
const isVisible = elem => elem.style.display

// Element Behaviours
const animateElement = (elem, keyframes, options) => elem.animate(keyframes, options)
const clickElement = elem => elem.click()
const fadeInElement = elem => elem.style.opacity = '1.0'
const fadeOutElement = elem => elem.style.opacity = '0'
const focusElement = elem => elem.focus()
const hideElement = elem => elem.style.display = 'none'
const showElement = elem => elem.style.display = 'block'
const flexElement = elem => {
	elem.style.display = 'flex'
	elem.style.flexDirection = 'column'
}

// Values
const getValue = elem => elem.value
const emptyValue = elem => elem.value === ''
const setValue = (elem, val) => elem.value = val

// Text
const getText = elem => elem.textContent
const setText = (elem, val) => elem.textContent = val
const emptyText = elem => elem.textContent = ''
const properCase = text => text.toLowerCase().charAt(0).toUpperCase() + text.slice(1)

// Select
const emptySelect = elem => {
	for (let i = 0; i < elem.options.length; i++) {
		elem.options[i] = null
	}
}
const appendSelect = (elem, option) => elem.add(option)
const getIndex = elem => elem.selectedIndex

// HTML
const setHtml = (elem, val) => elem.innerHTML = val
const setCss = (elem, css) => elem.className = css

// Check radio
const checkElement = elem => elem.checked = true
const unCheckElement = elem => elem.checked = false

// Combined Behaviours
const emptyHideText = elem => {
	emptyText(elem)
	hideElement(elem)
}
const emptyHideValue = elem => {
	emptyValue(elem)
	hideElement(elem)
}
const showAndScrollTo = elem => {
	showElement(elem)
	window.scrollTo(0, (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) + 1)
}