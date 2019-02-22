// Preload images and randomly rotate
const newSlide = () => {

	const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

	// Hero Image
	const hero = getElementByClassName('hero-slide')
	hero.classList.add('fade')

	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i])
			title.classList.add('fade-slide')
		}
	}, 500)

	// Slide in Hero Button
	setTimeout(() => {
		const heroButton = getElementByClassName('hero-button')
		heroButton.classList.add('fade-slide')
	}, 800)

	// Slide in Hero Arrows
	setTimeout(() => {
		const heroArrows = getElementByClassName('hero-arrows')
		heroArrows.classList.add('fade-slide')
	}, 1100)

}

// Begin
if (window.location.pathname === '/') {

	newSlide()
	const rightArrow = getElementByClassName('hero-arrow right')
	onClick(rightArrow, () => {
		const firstTab = getElementByClassName('hero-slider:first')
		const activeTab = getElementByClassName('hero-slider w-tab-pane w--tab-active').removeClass('w--tab-active').next('hero-slider')
		if (activeTab.length) {
			activeTab.addClass('w--tab-active')
		}
		else {
	
		}
	})
}