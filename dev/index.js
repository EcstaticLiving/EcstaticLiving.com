// Code ©2017 - 2019 Ecstatic Life Inc. All rights reserved.
console.log(window.location.href.indexOf('ecstaticliving.com') > -1 ? 'Welcome to EcstaticLiving.com' : 'TEST code at ', window.location.href)

// Element Event Listeners
const onClick = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('click', e => f(e)) : null
const onChange = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('change', e => f(e)) : null
const onInput = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('input', f) : null
const onLoad = (elem, f) => elem.addEventListener('load', f)
const onOrientationChange = (elem, f) => elem.addEventListener('orientationchange', f)
const onSubmit = (elem, f) => document.body.classList.contains(elem) ? elem.addEventListener('submit', f) : null
const onKeyPress = (elem, f) => elem.addEventListener('keypress', e => f(e))
// Form behaviours
const formSubmit = elem => elem.submit()
const formErrorInit = elem => elem.parsley()
const formErrorValidation = elem => elem.parsley().validate()
const formReset = elem => elem[0].reset()
// Element Collections
const getAttribute = (elem, attribute) => elem.getAttribute(attribute)
const getElementById = elem => document.getElementById(elem)
const getElementByClassName = (className, i) => document.getElementsByClassName(className)[i]
const getElementsByClassName = className => document.getElementsByClassName(className)
const getElementsByTag = tag => document.getElementsByTagName(tag)
// Element Conditions
const isInput = elem => elem.type === 'input'
const isRadio = elem => elem.type === 'radio'
const isBlank = elem => getValue(elem) === '' && getValue(elem) === ''
const isChecked = elem => elem.checked
const isVisible = elem => elem.style.display
// Element Behaviours
const clickElement = elem => elem.click()
const focusElement = elem => elem.focus()
const hideElement = elem => elem.style.display = 'none'
const showElement = elem => elem.style.display = 'block'
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
const appendSelect = (elem, option) => elem.appendChild(option)
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
	window.scrollTo(0, (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0) + 1)
}