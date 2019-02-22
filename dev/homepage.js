// Load all tabs
const tabs = getElementsByClassName('hero-tab')
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
const fadeInTab = tabIndex => {

	// Make tab and clickable elements visible
	tabs[tabIndex].classList.add('display')
	const heroButton = getElementByClassName('hero-button', tabIndex)
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroButton.classList.add('display')
	heroArrows.classList.add('display')

	// Fade in image
	setTimeout(() => tabs[tabIndex].classList.add('fade'), 100)

	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i], tabIndex)
			title.classList.add('fade-slide')
		}
	}, 500)

	// Slide in Hero Button
	setTimeout(() => heroButton.classList.add('fade-slide'), 800)

	// Slide in Hero Arrows
	setTimeout(() => heroArrows.classList.add('fade-slide'), 1100)

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
	
	// Make tab and clickable elements invisible
	tabs[tabIndex].classList.remove('display')
	heroButton.classList.remove('display')
	heroArrows.classList.remove('display')

}

// Begin
if (window.location.pathname === '/') {

	// Add event listener to cycle through all hero messages on arrow click
	const rightArrows = getElementsByClassName('hero-arrow right')
	for (let tabIndex = 0; tabIndex < rightArrows.length; tabIndex++) {
		rightArrows[tabIndex].addEventListener('click', () => {
			// Get next image
			const nextTabIndex = tabIndex === tabs.length - 1
				? 0
				: tabIndex + 1
			// Fade out current tab
			console.log(tabIndex)
			tabs[tabIndex].classList.remove('fade')
			// Fade in new slide
			fadeInTab(nextTabIndex)
			// Reset current slide
			setTimeout(() => resetSlide(tabIndex), 500)
		})
	}

	// Fade in first slide
	fadeInTab(0)

}