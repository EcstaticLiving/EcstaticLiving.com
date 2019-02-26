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
	const sectionBoxes = getElementsByClassName('section boxes')
	const boxContainer = getElementsByClassName('box-container')
	let sectionBoxesHeight, boxContainerWidth
	// Use desktop dimensions
	if (window.innerWidth >= 1240) {
		sectionBoxesHeight = '200px'
		boxContainerWidth = ''
	}
	// iPad portrait, and dimensions that are smaller than desktop, yet still larger than iPad portrait (such as iPad landscape)
	else if (window.innerWidth >= 768) {
		sectionBoxesHeight = '500px'
		boxContainerWidth = '768px'
	}
	// iPhone landscape and portrait
	else {
		sectionBoxesHeight = '1100px'
		boxContainerWidth = ''
	}
	// Do this for all box section and containers on homepage
	for (let i = 0; i < boxContainer.length; i++) {
		sectionBoxes[i].style.height = sectionBoxesHeight
		boxContainer[i].style.width = boxContainerWidth
	}
}

// Preload images and randomly rotate
const fadeInTab = tabIndex => {
	// Make tab and clickable elements visible
	ALL_TABS[tabIndex].classList.add('display')
	const heroButton = getElementByClassName('hero-button', tabIndex)
	const heroArrows = getElementByClassName('arrows', tabIndex)
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
	const heroArrows = getElementByClassName('arrows', tabIndex)
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
	ALL_TABS[0].classList.remove('fade')
	ALL_TABS[0].classList.remove('display')
	for (let i = 0; i < 3; i++) {
		const title = getElementByClassName('hero-title ' + NUMBER_CLASS[i], 0)
		title.classList.remove('fade-move')
	}
	const heroButton = getElementByClassName('hero-button', 0)
	heroButton.classList.remove('fade-move')
	heroButton.classList.remove('display')
	const heroArrows = getElementByClassName('arrows', 0)
	heroArrows.classList.remove('fade-move')
	heroArrows.classList.remove('display')

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