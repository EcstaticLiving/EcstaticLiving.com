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
	let random = 0
	const hero = document.getElementsByClassName('hero-slide')[0]
	do {
		random = Math.floor(Math.random() * 4) + 1
	} while (
		(random === 1 && hero.classList.contains('1'))
		|| (random === 2 && hero.classList.contains('2'))
		|| (random === 3 && hero.classList.contains('3'))
		|| (random === 4 && hero.classList.contains('4'))
	)
	hero.classList.remove('1')
	hero.classList.remove('2')
	hero.classList.remove('3')
	hero.classList.remove('4')
	switch (random) {
		case 2:		hero.classList.add('2'); break;
		case 3:		hero.classList.add('3'); break;
		case 4:		hero.classList.add('4'); break;
		default:	hero.classList.add('1'); break;
	}	
}