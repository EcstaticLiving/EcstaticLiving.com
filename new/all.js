// Code ©2017 - 2019 Ecstatic Life Inc. All rights reserved.
console.log(window.location.href.indexOf('ecstaticliving.com') > -1 ? 'Welcome to EcstaticLiving.com' : 'TEST code at ', window.location.href)

// Window
const width = $(window).width()
const height = $(window).height()
// Urls
const containsUrl = (str) => window.location.href.indexOf(str) > -1
const endsWithUrl = (str) => window.location.href.endsWith(str)
// Values
const getValue = elem => $(elem).val()
const emptyValue = elem => $(elem).val('')
const setValue = (elem, val) => $(elem).val(val)
// Text
const getText = elem => $(elem).text()
const setText = (elem, val) => $(elem).text(val)
const emptyText = elem => $(elem).text('')
// HTML
const setHtml = (elem, val) => $(elem).html(val)
const setCss = (elem, css) => $(elem).css(css)
// Element Conditions
const isRadio = elem => $(elem).is(':radio')
const isBlank = elem => getText(elem) === '' && getValue(elem) === ''
const isChecked = elem => $(elem).is(':checked')
const isVisible = elem => $(elem).is(':visible')
// Element Behaviours
const animate = (elem, style, time) => $(elem).animate(style, time)
const click = (elem) => $(elem).trigger('click')
const focus = elem => $(elem).focus()
const fadeTo = (elem, time, opacity) => $(elem).fadeTo(time, opacity)
const hide = elem => $(elem).hide()
const show = elem => $(elem).show()


const setOrientation = () => {
  let device = 'mobile'
	if (Math.min(width, height) >= 641) {
		device = 'tablet'
	}
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (Math.max(width, height) >= 1025) {
		device = 'desktop'
  }
  const deviceOrientation = width > height
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
		show('.nav-container')
		animate('.nav-container', { marginLeft: '0%' }, 500)
		show('.nav-close')
		fadeTo('.nav-close', 1000, 1)
  }
  else {
		animate('.nav-container', { marginLeft: '100%' }, 500)
		fadeTo('.nav-close', 1000, 0)
		setTimeout(1000, () => hide('.nav-close'))
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