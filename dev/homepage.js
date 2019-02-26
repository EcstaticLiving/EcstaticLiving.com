// Load all tabs
const ALL_TABS = getElementsByClassName('hero-tab')
const NUMBER_CLASS = ['one', 'two', 'three', 'four', 'five', 'six']
let ACTIVE_TAB_INDEX = 0

// Calculate Section.Hero height
const setHeroHeight = () => {
	const heroSection = getElementByClassName('section hero')
	if (
		deviceType() === 'desktop'
		|| (deviceType() === 'large tablet' && deviceOrientation() === 'landscape')
		|| deviceType() === 'tablet'
		|| deviceType() === 'mobile'
	) {
		// Set min height on mobile to 550px
		heroSection.style.height = deviceType() === 'mobile' && deviceOrientation() === 'landscape'
			? Math.max(window.innerHeight * 0.95 + 'px', '550px')
			: window.innerHeight * 0.95 + 'px'
	}
	else {
		heroSection.style.height = window.innerHeight * 0.5 + 'px'
	}
}

// Set width of boxes section for width that’s smaller than desktop yet larger than iPad portrait; not configurable in Webflow interface.
const setBoxSections = () => {
	const boxSections = getElementsByClassName('section boxes')
	const boxContainers = getElementsByClassName('box-container')
	let sectionHeight, containerWidth
	if (window.innerWidth >= 930 && window.innerWidth < 1240) {
		sectionHeight = '500px'
		containerWidth = '768px'
	}
	else {
		sectionHeight = '200px'
		containerWidth = ''
	}
	// Do this for all box section and containers on homepage
	for (let i = 0; i < boxContainers.length; i++) {
		boxSections[i].style.height = sectionHeight
		boxContainers[i].style.width = containerWidth
	}
}

// Preload images and randomly rotate
const fadeInTab = tabIndex => {
	// Make tab and clickable elements visible
	ALL_TABS[tabIndex].classList.add('display')
	const heroButton = getElementByClassName('hero-button', tabIndex)
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroButton.classList.add('display')
	heroArrows.classList.add('display')
	// Fade in image
	setTimeout(() => ALL_TABS[tabIndex].classList.add('fade'), 100)
	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + NUMBER_CLASS[i], tabIndex)
			title.classList.add('fade-move')
		}
	}, 500)
	// Slide in Hero Button
	setTimeout(() => heroButton.classList.add('fade-move'), 800)
	// Slide in Hero Arrows
	setTimeout(() => heroArrows.classList.add('fade-move'), 1100)
}

const resetSlide = tabIndex => {
	// Hide Hero Text
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + NUMBER_CLASS[i], tabIndex)
		title.classList.remove('fade-move')
	}
	// Hide Hero Button
	const heroButton = getElementByClassName('hero-button', tabIndex)
	heroButton.classList.remove('fade-move')
	// Hide Hero Arrows
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroArrows.classList.remove('fade-move')
	// Make tab and clickable elements invisible
	ALL_TABS[tabIndex].classList.remove('display')
	heroButton.classList.remove('display')
	heroArrows.classList.remove('display')
}

const transitionTabs = ({ currentTab, nextTab }) => {
	// Fade out current tab
	ALL_TABS[currentTab].classList.remove('fade')
	// Fade in new slide
	fadeInTab(nextTab)
	// Reset current slide
	setTimeout(() => resetSlide(currentTab), 500)
}


// Begin
if (window.location.pathname === '/') {

	windowEventListener(['onload', 'orientationchange', 'resize'], () => {
		// Recalculate hero height on orientation change
		setHeroHeight()
		// As well as box section and container dimensions
		setBoxSections()
	})
 
	// Add event listener to cycle through all hero messages on arrow click
	const leftArrows = getElementsByClassName('arrow left')
	const rightArrows = getElementsByClassName('arrow right')
	for (let tabIndex = 0; tabIndex < rightArrows.length; tabIndex++) {
		// Cycle forward
		rightArrows[tabIndex].addEventListener('click', () => {
			ACTIVE_TAB_INDEX = tabIndex === ALL_TABS.length - 1 ? 0 : tabIndex + 1
			transitionTabs({ currentTab: tabIndex, nextTab: ACTIVE_TAB_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
		// Cycle backward
		leftArrows[tabIndex].addEventListener('click', () => {
			ACTIVE_TAB_INDEX = tabIndex === 0 ? ALL_TABS.length - 1 : tabIndex - 1
			transitionTabs({ currentTab: tabIndex, nextTab: ACTIVE_TAB_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
	}

	// Remove display classes on init
	ALL_TABS[0].classList.remove('display fade')
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + NUMBER_CLASS[i], 0)
		title.classList.remove('fade-move')
	}
	const heroButton = getElementByClassName('hero-button', tabIndex)
	heroButton.classList.remove('display fade-move')
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroArrows.classList.remove('display fade-move')

	// Set hero height
	setHeroHeight()
	// Fade in first slide
	fadeInTab(0)

	// Switch tabs periodically
	const tabInterval = setInterval(() => {
		const currentTab = ACTIVE_TAB_INDEX
		ACTIVE_TAB_INDEX = ACTIVE_TAB_INDEX === ALL_TABS.length - 1 ? 0 : ACTIVE_TAB_INDEX + 1
		transitionTabs({ currentTab, nextTab: ACTIVE_TAB_INDEX })
	}, 8000)

}