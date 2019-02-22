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

	// Add event listener to cycle through all hero messages on arrow click
	const rightArrow = getElementByClassName('hero-arrow right')
	console.log(rightArrow)
	rightArrow.addEventListener('click', () => {
		console.log('clicked')
		const tabs = getElementByClassName('hero-slider')
		for (let i = 0; i < tabs.length; i++) {
			console.log(tabs[i])
			if (tabs[i].classList.contains('w-tab-pane w--tab-active')) {
				console.log(i)
				// Remove active tab
				tabs[i].classList.remove('w--tab-active')
				// Add active status to next tab
				if (i === tabs.length - 1) {
					tabs[0].addClass('w--tab-active')
				}
				else {
					tabs[i + 1].addClass('w--tab-active')
				}
				break
			}
		}
	})

}