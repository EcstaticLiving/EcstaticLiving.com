const MAX_SLIDES = 2
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
if (window.location.pathname === '/') {
	const hero = document.getElementsByClassName('hero-slide')[0]
	hero.classList.add('fade')
	// Slide in Hero Text
	for (let i = 0; i++; i<3) {
		const title = document.getElementsByClassName('hero-slide-title ' + literalNumbers[i])[0]
		console.log(title)
		title.classList.add('fade-slide')
	}
}