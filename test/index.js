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
// Values
const getValue = elem => $(elem).val()
const emptyValue = elem => $(elem).val('')
const setValue = (elem, val) => $(elem).val(val)
// Text
const getText = elem => $(elem).text()
const setText = (elem, val) => $(elem).text(val)
const emptyText = elem => $(elem).text('')
const properCase = text => text.toLowerCase().charAt(0).toUpperCase() + value.slice(1)
// Select
const emptySelect = elem => $(elem).empty()
const appendSelect = (elem, option) => $(elem).append(option)
// HTML
const setHtml = (elem, val) => $(elem).html(val)
const setCss = (elem, css) => $(elem).css(css)
// Check radio
const checkElement = elem => $(elem).prop('checked', true)
const unCheckElement = elem => $(elem).prop('checked', false)
// Element Event Listeners
const onClick = (elem, f) => $(elem).on('click', f) // elem.addEventListener('click', f)
const onChange = (elem, f) => $(elem).on('change', f) // elem.addEventListener('change', f)
const onSubmit = (elem, f) => $(elem).on('submit', f) // elem.addEventListener('submit', f)
// Element Conditions
const isRadio = elem => $(elem).is(':radio')
const isBlank = elem => getText(elem) === '' && getValue(elem) === ''
const isChecked = elem => $(elem).is(':checked')
const isVisible = elem => $(elem).is(':visible')
// Element Behaviours
const animate = (elem, style, time) => $(elem).animate(style, time)
const click = (elem) => $(elem).trigger('click')
const focusElement = elem => $(elem).focus()
const fadeTo = (elem, time, opacity) => $(elem).fadeTo(time, opacity)
const hideElement = elem => $(elem).hide()
const showElement = elem => $(elem).show()
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

const setOrientation = () => {
  let device = 'mobile'
	if (Math.min(windowWidth, windowHeight) >= 641) {
		device = 'tablet'
	}
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (Math.max(windowWidth, windowHeight) >= 1025) {
		device = 'desktop'
  }
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
		animate('.nav-container', { marginLeft: '0%' }, 500)
		showElement('.nav-close')
		fadeTo('.nav-close', 1000, 1)
  }
  else {
		animate('.nav-container', { marginLeft: '100%' }, 500)
		fadeTo('.nav-close', 1000, 0)
		setTimeout(1000, () => hideElement('.nav-close'))
	}
}

const goToLastPage = () => {
	if (document.referrer === '') {
		window.location.href = '/'
  }
  else {
		parent.history.back()
	}
	return false
}

// If window orientation changes
$(window).on('load orientationchange', () => setOrientation())
// If nav menu is opened
$('.menu-icon').on('click', () => openCloseNavMenu())
// If nav menu is closed
$('.nav-close').on('click', () => click('.menu-icon'))
// Social Share Kit
SocialShareKit.init({ title: document.title })
// Back Button
$('.navigate-back').on('click', () => goToLastPage())