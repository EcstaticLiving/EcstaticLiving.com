const navHamburger = getElementByClassName('menu-link hamburger')
const navClose = getElementByClassName('nav-close')
const navContainer = getElementByClassName('nav-container')
// If nav menu is opened
onClick(navHamburger, () => {
	//	If nav menu is open, close...
	if (navContainer.classList.contains('display')) {
    navContainer.classList.remove('fade')
    setTimeout(() => navContainer.classList.remove('display'), 500)
  }
  // ...otherwise open.
	else {
		navContainer.classList.add('display')
		setTimeout(() => navContainer.classList.add('fade'), 100)
	}
})
// If nav menu is closed
onClick(navClose, () => navHamburger.click())
// On scroll
const menuBarContainer = getElementByClassName('menu-bar-container')
window.onscroll = () => {
	if (window.scrollY >= 100 && !menuBarContainer.classList.contains('scroll')) {
		menuBarContainer.classList.add('scroll')
	}
	else if (window.scrollY < 100 && menuBarContainer.classList.contains('scroll')) {
		menuBarContainer.classList.remove('scroll')
	}
}