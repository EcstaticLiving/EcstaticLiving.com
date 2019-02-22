// Load all tabs
const tabs = getElementsByClassName('hero-tab')
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
const fadeInTab = tabIndex => {
	// Fade in Hero Image
	tabs[tabIndex].classList.add('fade-in')
	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i], tabIndex)
			title.classList.add('fade-slide')
		}
	}, 500)
	// Slide in Hero Button
	setTimeout(() => {
		const heroButton = getElementByClassName('hero-button', tabIndex)
		heroButton.classList.add('fade-slide')
	}, 800)
	// Slide in Hero Arrows
	setTimeout(() => {
		const heroArrows = getElementByClassName('hero-arrows', tabIndex)
		heroArrows.classList.add('fade-slide')
	}, 1100)
}

const resetSlide = tabIndex => {
	// Hide Hero Text
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + literalNumbers[i], tabIndex)
		title.classList.remove('fade-slide')
	}
	// Hide Hero Button
	const heroButton = getElementByClassName('hero-button', tabIndex)
	heroButton.classList.remove('fade-slide')
	// Hide Hero Arrows
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroArrows.classList.remove('fade-slide')
}



// Begin
if (window.location.pathname === '/') {

	// Add event listener to cycle through all hero messages on arrow click
	const rightArrows = getElementsByClassName('hero-arrow right')
	for (let i = 0; i < rightArrows.length; i++) {
		rightArrows[i].addEventListener('click', () => {
			// Get current and next image
			let tabIndex
			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i].classList.contains('w--tab-active')) {
					tabIndex = i === tabs.length - 1
						? { current: i, next: 0 }
						: { current: i, next: i + 1 }
				}
			}
			// Deactivate current tab
			tabs[tabIndex.current].classList.add('fade-out')
			// Fade in new slide
			fadeInTab(tabIndex.next)
			// Reset current slide
			resetSlide(tabIndex.current)
		})
	}

	// Fade in first slide
	fadeInTab(0)

}