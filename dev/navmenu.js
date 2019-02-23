const navHamburger = getElementByClassName('menu-link hamburger')
const navClose = getElementByClassName('nav-close')
const navContainer = getElementByClassName('nav-container')
// If nav menu is opened
onClick(navHamburger, () => {
	//	If nav menu is opened
	if (!isVisible(navClose)) {
		navContainer.classList.add('display')
		setTimeout(() => navContainer.classList.add('fade'), 100)
	}
	else {
		navContainer.classList.remove('fade')
	}
})
// If nav menu is closed
onClick(navClose, () => clickElement(navHamburger))