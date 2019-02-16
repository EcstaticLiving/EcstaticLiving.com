// Code ©2017 - 2019 Ecstatic Life Inc. All rights reserved.
console.log(window.location.href.indexOf('ecstaticliving.com') > -1 ? 'Welcome to EcstaticLiving.com' : 'TEST code at ', window.location.href)

// CONSTANTS

// Window
const windowWidth = $(window).width()
const windowHeight = $(window).height()
// Urls
const containsUrl = str => window.location.href.indexOf(str) > -1
const endsWithUrl = str => window.location.href.endsWith(str)
// Return url search keys and values
const urlString = Object.assign({}, ...window.location.search.slice(1).split('&').map((item) => {
	const property = item.split('=')[0]
	return { [property]: item.split('=')[1] }
}))
// Element Event Listeners
const onClick = (elem, f) => document.body.contains(elem) ? elem.addEventListener('click', e => f(e)) : null
const onChange = (elem, f) => document.body.contains(elem) ? elem.addEventListener('change', e => f(e)) : null
const onInput = (elem, f) => document.body.contains(elem) ? elem.addEventListener('input', f) : null
const onLoad = (elem, f) => {
	console.log(elem)
	document.body.contains(elem) ? elem.addEventListener('load', f) : null
}
const onOrientationChange = (elem, f) => document.body.contains(elem) ? elem.addEventListener('orientationchange', f) : null
const onSubmit = (elem, f) => document.body.contains(elem) ? elem.addEventListener('submit', f) : null
const onKeyPress = (elem, f) => document.body.contains(elem) ? elem.addEventListener('keypress', e => f(e)) : null
// Form behaviours
const formSubmit = elem => document.body.contains(elem) ? $(elem).submit() : null
const formErrorInit = elem => document.body.contains(elem) ? $(elem).parsley() : null
const formErrorValidation = elem => document.body.contains(elem) ? $(elem).parsley().validate() : null
const formReset = elem => document.body.contains(elem) ? $(elem)[0].reset() : null
// Element Collections
const getElementById = elem => document.body.contains(elem) ? $(elem) : null
const getAttribute = (elem, attribute) => document.body.contains(elem) ? elem.getAttribute(attribute) : null
const getElementsByTag = tag => document.body.contains(elem) ? document.getElementsByTagName(tag) : null
// Element Conditions
const isInput = elem => document.body.contains(elem) ? $(elem).is('input') : null
const isRadio = elem => document.body.contains(elem) ? $(elem).is(':radio') : null
const isBlank = elem => document.body.contains(elem) ? getValue(elem) === '' && getValue(elem) === '' : null
const isChecked = elem => document.body.contains(elem) ? $(elem).is(':checked') : null
const isVisible = elem => document.body.contains(elem) ? $(elem).is(':visible') : null
// Element Behaviours
const animateElement = (elem, style, time) => document.body.contains(elem) ? $(elem).animate(style, time) : null
const clickElement = elem => document.body.contains(elem) ? $(elem).trigger('click') : null
const focusElement = elem => document.body.contains(elem) ? $(elem).focus() : null
const fadeElement = (elem, time, opacity) => document.body.contains(elem) ? $(elem).fadeTo(time, opacity) : null
const hideElement = elem => document.body.contains(elem) ? $(elem).hide() : null
const showElement = elem => document.body.contains(elem) ? $(elem).show() : null
// Values
const getValue = elem => document.body.contains(elem) ? $(elem).val() : null
const emptyValue = elem => document.body.contains(elem) ? $(elem).val('') : null
const setValue = (elem, val) => document.body.contains(elem) ? $(elem).val(val) : null
// Text
const getText = elem => document.body.contains(elem) ? $(elem).text() : null
const setText = (elem, val) => document.body.contains(elem) ? $(elem).text(val) : null
const emptyText = elem => document.body.contains(elem) ? $(elem).text('') : null
const properCase = text => document.body.contains(elem) ? text.toLowerCase().charAt(0).toUpperCase() + text.slice(1) : null
// Select
const emptySelect = elem => document.body.contains(elem) ? $(elem).empty() : null
const appendSelect = (elem, option) => document.body.contains(elem) ? $(elem).append(option) : null
const getIndex = elem => document.body.contains(elem) ? $(elem).index() : null
// HTML
const setHtml = (elem, val) => document.body.contains(elem) ? $(elem).html(val) : null
const setCss = (elem, css) => document.body.contains(elem) ? $(elem).css(css) : null
// Check radio
const checkElement = elem => document.body.contains(elem) ? $(elem).prop('checked', true) : null
const unCheckElement = elem => document.body.contains(elem) ? $(elem).prop('checked', false) : null
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
	window.scrollTo(0, (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0) + 1)
}


const page = () => {
  if (containsUrl('/events/'))  return 'Event'
  if (endsWithUrl('/update'))   return 'Update'
  return null
}
const isFormPage = () => page() === 'Event' || page() === 'Update'

const getDevice = () => {
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (Math.max(windowWidth, windowHeight) >= 1025) {
		return 'desktop'
	}
	if (Math.min(windowWidth, windowHeight) >= 641) {
		return 'tablet'
	}
	return 'mobile'
}

const setOrientation = () => {
  const device = getDevice()
  const deviceOrientation = windowWidth > windowHeight
    ? 'landscape'
    : 'portrait'
	if (device === 'tablet' && deviceOrientation === 'landscape') {
		//	Increase side padding for small screen
		setCss('.main-section', { 'padding-left': '100px', 'padding-right': '100px' })
	}
	else if (device === 'tablet') {
		setCss('.main-section', { 'padding-left': '30px', 'padding-right': '30px' })
	}
}

const openCloseNavMenu = () => {
	//	If nav menu is opened
	if (!isVisible('.nav-close')) {
		showElement('.nav-container')
		animateElement('.nav-container', { marginLeft: '0%' }, 500)
		showElement('.nav-close')
		fadeElement('.nav-close', 1000, 1)
  }
  else {
		animateElement('.nav-container', { marginLeft: '100%' }, 500)
		fadeElement('.nav-close', 1000, 0)
		setTimeout(1000, () => hideElement('.nav-close'))
	}
}

const goToPreviousPage = () => {
	if (document.referrer === '') {
		window.location.href = '/'
  }
  else {
		parent.history.back()
	}
	return false
}

// If window orientation changes
window.onload = setOrientation()
window.onorientationchange = setOrientation()
// Social Share Kit
SocialShareKit.init({ title: document.title })
// Back Button
onClick('.navigate-back', () => goToPreviousPage())
// On scroll, activate menu bar gradient
const menuBarGradient = document.getElementsByClassName('menu-bar-gradient')[0]
window.onscroll = () => {
	if (window.scrollY > 0 && !menuBarGradient.classList.contains('scroll')) {
		menuBarGradient.classList.add('scroll')
	}
	else if (window.scrollY === 0 && menuBarGradient.classList.contains('scroll')) {
		menuBarGradient.classList.remove('scroll')
	}
}