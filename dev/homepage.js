// Load all tabs
const tabs = getElementsByClassName('hero-slide-container')
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
const fadeInSlide = (tabNumber, initiate) => {
	// Fade in Hero Image
	if (initiate) {
		const hero = getElementByClassName('hero-slide', tabNumber)
		hero.classList.add('fade')
	}
	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i], tabNumber)
			title.classList.add('fade-slide')
		}
	}, 500)
	// Slide in Hero Button
	setTimeout(() => {
		const heroButton = getElementByClassName('hero-button', tabNumber)
		heroButton.classList.add('fade-slide')
	}, 800)
	// Slide in Hero Arrows
	setTimeout(() => {
		const heroArrows = getElementByClassName('hero-arrows', tabNumber)
		heroArrows.classList.add('fade-slide')
	}, 1100)
}

const resetSlide = tabNumber => {
	// Hide Hero Image
	// const hero = getElementByClassName('hero-slide', tabNumber)
	// hero.classList.remove('fade')
	// hero.classList.remove('w-dyn-item')
	// Hide Hero Text
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + literalNumbers[i], tabNumber)
		title.classList.remove('fade-slide')
	}
	// Hide Hero Button
	const heroButton = getElementByClassName('hero-button', tabNumber)
	heroButton.classList.remove('fade-slide')
	// Hide Hero Arrows
	const heroArrows = getElementByClassName('hero-arrows', tabNumber)
	heroArrows.classList.remove('fade-slide')
}



// Begin
if (window.location.pathname === '/') {

	// Add event listener to cycle through all hero messages on arrow click
	const rightArrows = getElementsByClassName('hero-arrow right')
	for (let i = 0; i < rightArrows.length; i++) {
		rightArrows[i].addEventListener('click', () => {
			// Get current and next tab
			let tabNumber
			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i].classList.contains('w--tab-active')) {
					tabNumber = i === tabs.length - 1
						? { current: i, next: 0 }
						: { current: i, next: i + 1 }
				}
			}
			const heroTabs = getElementsByClassName('hero-tab')
			heroTabs[tabNumber.next].click()
			// Deactivate current tab
			// tabs[tabNumber.current].classList.remove('w--tab-active')
			// Activate new tab
			// tabs[tabNumber.next].classList.add('w--tab-active')
			// Fade in new slide
			fadeInSlide(tabNumber.next, false)
			// Reset current slide
			resetSlide(tabNumber.current)
		})
	}

	// Fade in first slide
	fadeInSlide(0, true)

}