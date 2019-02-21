const MAX_SLIDES = 2
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

// Preload images and randomly rotate
if (window.location.pathname === '/') {
	// Randomly use different hero images from 1 to 4
	let slideNumber = 0
	const hero = document.getElementsByClassName('hero-slide')[0]
	do {
		slideNumber = Math.floor(Math.random() * MAX_SLIDES) + 1
	}
	// Don’t use same slide
	while (slideNumber === 1 && hero.classList.contains(literalNumbers[slideNumber - 1]))
	for (let slideClass in literalNumbers) {
		hero.classList.remove(slideClass)
	}
	hero.classList.add(literalNumbers[slideNumber - 1])
	// Slide in Hero Text
	for (let i = 1; i++; i<4) {
		const title = document.getElementsByClassName('hero-slide-title ' + literalNumbers[i])[slideNumber][0]
		title.classList.add('fade-slide')
	}
}