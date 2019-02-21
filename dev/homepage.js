// Preload images and randomly rotate
if (window.location.pathname === '/') {

	const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

	// Hero Image
	const hero = document.getElementsByClassName('hero-slide')[0]
	hero.classList.add('fade')

	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = document.getElementsByClassName('hero-slide-title ' + literalNumbers[i])[0]
			title.classList.add('fade-slide')
		}
	}, 500)

	// Slide in Hero Button
	setTimeout(() => {
		const heroButton = document.getElementsByClassName('hero-button')[0]
		heroButton.classList.add('fade-slide')
	}, 600)

	// Slide in Hero Arrows
	setTimeout(() => {
		const heroArrows = document.getElementsByClassName('hero-slider-arrows')[0]
		heroArrows.classList.add('fade-slide')
	}, 700)

}