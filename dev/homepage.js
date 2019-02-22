// Load all tabs
const tabs = getElementsByClassName('hero-slide-container')
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
const fadeInSlide = slideNumber => {
	// Make sure arrows are hidden
	const heroArrows = getElementByClassName('hero-arrows', 0)
	heroArrows.classList.remove('fade-slide')
	// Hero Image
	const hero = getElementByClassName('hero-slide', slideNumber)
	hero.classList.add('fade')
	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i], slideNumber)
			title.classList.add('fade-slide')
		}
	}, 500)
	// Slide in Hero Button
	setTimeout(() => {
		const heroButton = getElementByClassName('hero-button', slideNumber)
		heroButton.classList.add('fade-slide')
	}, 800)
	// Slide in Hero Arrows
	setTimeout(() => {
		heroArrows.classList.add('fade-slide')
	}, 1100)
}

const resetSlide = slideNumber => {
	// Hide Hero Text
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + literalNumbers[i], slideNumber)
		title.classList.remove('fade-slide')
	}
	// Hide Hero Button
	const heroButton = getElementByClassName('hero-button', slideNumber)
	heroButton.classList.remove('fade-slide')
}

const getSlideNumber = () => {
	let obj
	for (let i = 0; i < tabs.length; i++) {
		if (tabs[i].classList.contains('w--tab-active')) {
			obj = i === tabs.length - 1
				? { current: i, next: 0 }
				: { current: i, next: i + 1 }
		}
	}
	return obj
}

// Begin
if (window.location.pathname === '/') {

	fadeInSlide(0)

	// Add event listener to cycle through all hero messages on arrow click
	const rightArrow = getElementByClassName('hero-arrow right', 0)
	rightArrow.addEventListener('click', () => {
			const slideNumber = getSlideNumber()
			// Deactivate current tab
			tabs[slideNumber.current].classList.remove('w--tab-active')
			// Activate new tab
			tabs[slideNumber.next].classList.add('w--tab-active')
			// Fade in new slide
			fadeInSlide(slideNumber.next)
			// Reset current slide
			resetSlide(slideNumber.current)
	})

}