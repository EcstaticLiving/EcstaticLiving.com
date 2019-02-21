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
		(random === 1 && hero.classList.contains('one'))
		|| (random === 2 && hero.classList.contains('two'))
		|| (random === 3 && hero.classList.contains('three'))
		|| (random === 4 && hero.classList.contains('four'))
	)
	hero.classList.remove('one')
	hero.classList.remove('two')
	hero.classList.remove('three')
	hero.classList.remove('four')
	switch (random) {
		case 2:		hero.classList.add('two'); break;
		case 3:		hero.classList.add('three'); break;
		case 4:		hero.classList.add('four'); break;
		default:	hero.classList.add('one'); break;
	}	
}