const MAX_SLIDES = 2
const slideClasses = ['one', 'two', 'three', 'four', 'five', 'six']

// If window orientation changes
const getDevice = () => {
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (Math.max(windowWidth, windowHeight) >= 1025) {
		return 'desktop'
	}
	if (Math.min(windowWidth, windowHeight) >= 641) {
		return 'tablet'
	}
	return 'mobile'
}
const deviceOrientation = windowWidth > windowHeight
	? 'landscape'
	: 'portrait'


// Preload images and randomly rotate
if (window.location.pathname === '/') {
	// Randomly use different hero images from 1 to 4
	let randomSlide = 0
	const hero = document.getElementsByClassName('hero-slide')[0]
	do {
		randomSlide = Math.floor(Math.random() * MAX_SLIDES) + 1
	}
	// Don’t use same slide
	while (randomSlide === 1 && hero.classList.contains(slideClasses[randomSlide - 1]))
	for (let slideClass in slideClasses) {
		hero.classList.remove(slideClass)
	}
	hero.classList.add(slideClasses[randomSlide - 1])
}