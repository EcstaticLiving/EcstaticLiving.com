const navHamburger = getElementByClassName('menu-link hamburger')
const navClose = getElementByClassName('nav-close')
const navContainer = getElementByClassName('nav-container')
// If nav menu is opened
onClick(navHamburger, () => {
	//	If nav menu is opened
	if (!isVisible(navClose)) {
		showElement(navContainer)
		animateElement(navContainer, [{ marginLeft: '0%' }], { duration: 500 })
		showElement(navClose)
		fadeElement(navClose, 1000, 1)
  }
  else {
		animateElement(navContainer, [{ marginLeft: '100%' }], { duration: 500 })
		fadeElement(navClose, 1000, 0)
		setTimeout(1000, () => hideElement(navClose))
	}
})
// If nav menu is closed
onClick(navClose, () => clickElement(navHamburger))