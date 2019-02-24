// Load all tabs
const tabs = getElementsByClassName('hero-tab')
const literalNumbers = ['one', 'two', 'three', 'four', 'five', 'six']
let activeTab = 0

// Preload images and randomly rotate
const fadeInTab = tabIndex => {

	// Make tab and clickable elements visible
	tabs[tabIndex].classList.add('display')
	const heroButton = getElementByClassName('hero-button', tabIndex)
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroButton.classList.add('display')
	heroArrows.classList.add('display')

	// Fade in image
	setTimeout(() => tabs[tabIndex].classList.add('fade'), 100)

	// Slide in Hero Text
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			const title = getElementByClassName('hero-title ' + literalNumbers[i], tabIndex)
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
		const title = getElementByClassName('hero-title ' + literalNumbers[i], tabIndex)
		title.classList.remove('fade-move')
	}
	// Hide Hero Button
	const heroButton = getElementByClassName('hero-button', tabIndex)
	heroButton.classList.remove('fade-move')
	// Hide Hero Arrows
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroArrows.classList.remove('fade-move')
	
	// Make tab and clickable elements invisible
	tabs[tabIndex].classList.remove('display')
	heroButton.classList.remove('display')
	heroArrows.classList.remove('display')

}

const transitionTabs = ({ currentTab, nextTab }) => {
	// Fade out current tab
	tabs[currentTab].classList.remove('fade')
	// Fade in new slide
	fadeInTab(nextTab)
	// Reset current slide
	setTimeout(() => resetSlide(currentTab), 500)
}

// Begin
if (window.location.pathname === '/') {

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

	// Recalculate hero height on orientation change
	window.addEventListener('orientationchange', () => setHeroHeight())
 
	// Add event listener to cycle through all hero messages on arrow click
	const leftArrows = getElementsByClassName('hero-arrow left')
	const rightArrows = getElementsByClassName('hero-arrow right')
	for (let tabIndex = 0; tabIndex < rightArrows.length; tabIndex++) {
		// Cycle forward
		rightArrows[tabIndex].addEventListener('click', () => {
			activeTab = tabIndex === tabs.length - 1 ? 0 : tabIndex + 1
			transitionTabs({ currentTab: tabIndex, nextTab: activeTab })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
		// Cycle backward
		leftArrows[tabIndex].addEventListener('click', () => {
			activeTab = tabIndex === tabIndex === 0 ? tabs.length - 1 : tabIndex - 1
			transitionTabs({ currentTab: tabIndex, nextTab: activeTab })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
	}

	// Set Hero height
	setHeroHeight()
	// Fade in first slide
	fadeInTab(0)
	// Switch tabs periodically
	const tabInterval = setInterval(() => {
		const currentTab = activeTab
		activeTab = activeTab === tabs.length - 1 ? 0 : activeTab + 1
		transitionTabs({ currentTab, nextTab: activeTab })
	}, 8000)

}