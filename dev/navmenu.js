const navHamburger = getElementByClassName('menu-link hamburger')
const navClose = getElementByClassName('nav-close')
const navContainer = getElementByClassName('nav-container')
// If nav menu is opened
onClick(navHamburger, () => {
  console.log(isVisible(navContainer))
	//	If nav menu is opened
	if (!isVisible(navContainer)) {
		navContainer.classList.add('display')
		setTimeout(() => navContainer.classList.add('fade'), 100)
	}
	else {
		navContainer.classList.remove('fade')
	}
})
// If nav menu is closed
onClick(navClose, () => navHamburger.click())