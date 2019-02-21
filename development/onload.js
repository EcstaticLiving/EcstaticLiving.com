const MAX_SLIDES = 2

// Preload images and randomly rotate
if (window.location.pathname === '/') {
	const hero = document.getElementsByClassName('hero-slide')[0]
	hero.classList.add('fade')
	// Slide in Hero Text
	setTimeout(() => {
		const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']
		for (let i = 0; i < 3; i++) {
			const title = document.getElementsByClassName('hero-slide-title ' + literalNumbers[i])[0]
			title.classList.add('fade-slide')
		}
	}, 500)
}