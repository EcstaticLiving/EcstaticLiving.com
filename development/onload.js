const MAX_SLIDES = 1
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']

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
	/*
	const heroTitle = [
		document.getElementsByClassName('hero-slide-title one')[slideNumber],
		document.getElementsByClassName('hero-slide-title two')[slideNumber],
		document.getElementsByClassName('hero-slide-title three')[slideNumber]
	]
	console.log(slideNumber, heroTitle)
	heroTitle.forEach(title => title.classList.add('fade-slide'))	
	*/
}