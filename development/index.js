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
const onClick = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('click', e => f(e)) : null
const onChange = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('change', e => f(e)) : null
const onInput = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('input', f) : null
const onLoad = (elem, f) => elem.addEventListener('load', f)
const onOrientationChange = (elem, f) => elem.addEventListener('orientationchange', f)
const onSubmit = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('submit', f) : null
const onKeyPress = (elem, f) => elem.addEventListener('keypress', e => f(e))
// Form behaviours
const formSubmit = elem => $(elem).submit()
const formErrorInit = elem => $(elem).parsley()
const formErrorValidation = elem => $(elem).parsley().validate()
const formReset = elem => $(elem)[0].reset()
// Element Collections
const getElementById = elem => $(elem)
const getAttribute = (elem, attribute) => elem.getAttribute(attribute)
const getElementsByTag = tag => document.getElementsByTagName(tag)
// Element Conditions
const isInput = elem => $(elem).is('input')
const isRadio = elem => $(elem).is(':radio')
const isBlank = elem => getValue(elem) === '' && getValue(elem) === ''
const isChecked = elem => $(elem).is(':checked')
const isVisible = elem => $(elem).is(':visible')
// Element Behaviours
const animateElement = (elem, style, time) => $(elem).animate(style, time)
const clickElement = elem => $(elem).trigger('click')
const focusElement = elem => $(elem).focus()
const fadeElement = (elem, time, opacity) => $(elem).fadeTo(time, opacity)
const hideElement = elem => $(elem).hide()
const showElement = elem => $(elem).show()
// Values
const getValue = elem => $(elem).val()
const emptyValue = elem => $(elem).val('')
const setValue = (elem, val) => $(elem).val(val)
// Text
const getText = elem => $(elem).text()
const setText = (elem, val) => $(elem).text(val)
const emptyText = elem => $(elem).text('')
const properCase = text => text.toLowerCase().charAt(0).toUpperCase() + text.slice(1)
// Select
const emptySelect = elem => $(elem).empty()
const appendSelect = (elem, option) => $(elem).append(option)
const getIndex = elem => $(elem).index()
// HTML
const setHtml = (elem, val) => $(elem).html(val)
const setCss = (elem, css) => $(elem).css(css)
// Check radio
const checkElement = elem => $(elem).prop('checked', true)
const unCheckElement = elem => $(elem).prop('checked', false)
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
	if (window.location.pathname === '/')   return 'Homepage'
  if (containsUrl('/events/'))  					return 'Event'
  if (endsWithUrl('/update'))  						return 'Update'
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

// On scroll, activate menu bar gradient
const menuBarGradient = document.getElementsByClassName('menu-bar-gradient-black')[0] || document.getElementsByClassName('menu-bar-gradient-white')[0]
window.onscroll = () => {
	if (window.scrollY > 0 && !menuBarGradient.classList.contains('scroll')) {
		menuBarGradient.classList.add('scroll')
	}
	else if (window.scrollY === 0 && menuBarGradient.classList.contains('scroll')) {
		menuBarGradient.classList.remove('scroll')
	}
}

if (page() === 'Homepage') {
	// Randomly use different hero images from 1 to 4
	let random = 0
	do {
		random = Math.floor(Math.random() * 4) + 1
	} while (
		(random === 1 && hero.classList.contains('one'))
		|| (random === 2 && hero.classList.contains('two'))
		|| (random === 3 && hero.classList.contains('three'))
		|| (random === 4 && hero.classList.contains('four'))
	)
	const hero = document.getElementsByClassName('hero-container')[0]
	hero.classList.remove('one')
	hero.classList.remove('two')
	hero.classList.remove('three')
	hero.classList.remove('four')
	switch (random) {
		case 2:		hero.classList.add('two'); break;
		case 3:		hero.classList.add('three'); break;
		case 4:		hero.classList.add('four'); break;
		default:	hero.classList.add('one'); break;
	}	
}