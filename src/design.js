// Constants
const NUMBER_CLASS = ['one', 'two', 'three', 'four', 'five', 'six']
const ALL_TABS = getElementsByClassName('hero-tab')
let ACTIVE_TAB_INDEX = 0
const ALL_REVIEWS = getElementsByClassName('reviews-review')
let ACTIVE_REVIEW_INDEX = 0

// Calculate Section.Hero height
const setHeroHeight = () => {
	const heroSection = getElementByClassName('section section-hero')
	if (heroSection) {
		// Remove height of menu bar
		const heroHeight = window.innerHeight - 125
		if (
			deviceType() === 'desktop'
			|| (deviceType() === 'large tablet' && deviceOrientation() === 'landscape')
			|| deviceType() === 'tablet'
			|| deviceType() === 'mobile'
		) {
			// Set min height on mobile to 550px
			heroSection.style.height = deviceType() === 'mobile' && deviceOrientation() === 'landscape'
				? Math.max(heroHeight * 0.95 + 'px', '550px')
				: heroHeight * 0.95 + 'px'
		}
		else {
			heroSection.style.height = heroHeight * 0.5 + 'px'
		}
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

// Fade in tab
const fadeInHeroTab = tabIndex => {
	// For hero on homepage
	const heroButton = getElementByClassName('hero-button', tabIndex)
	// Make tab and clickable elements visible
	ALL_TABS[tabIndex].classList.add('display')
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
	// If background image is so complex that email signup form needs a dark background instead of a transparent background, change email box elements to white
	const emailBox = getElementByClassName('email-box', tabIndex)
	// emailBox with class `email container background` has conditional visibility in Webflow, so Webflow tags a new class called `w-condition-invisible` if collection determines it’s invisible
	const visible = emailBox.querySelectorAll('div.email-container-background.w-condition-invisible').length === 0
	setTimeout(() => changeEmailContainerBackground({ visible }), 500)
}

const resetHeroTab = tabIndex => {
	// Hide Hero Text
	const heroButton = getElementByClassName('hero-button', tabIndex)
	for (let i = 0; i < 3; i++) {
		const heroTitle = getElementByClassName('hero-title ' + NUMBER_CLASS[i], tabIndex)
		heroTitle.classList.remove('fade-move')
	}
	// Hide Hero Button
	heroButton.classList.remove('fade-move')
	heroButton.classList.remove('display')
	// Hide Hero Arrows
	const heroArrows = getElementByClassName('hero-arrows', tabIndex)
	heroArrows.classList.remove('fade-move')
	heroArrows.classList.remove('display')
	// Hide Tab
	ALL_TABS[tabIndex].classList.remove('fade')
	ALL_TABS[tabIndex].classList.remove('display')
}

const transitionTabs = ({ currentTab, nextTab }) => {
	// Fade out current tab
	ALL_TABS[currentTab].classList.remove('fade')
	// Fade in new slide
	fadeInHeroTab(nextTab)
	// Reset current slide
	setTimeout(() => resetHeroTab(currentTab), 500)
}

const fadeInReview = reviewIndex => {
	// Make review tab and clickable elements visible
	ALL_REVIEWS[reviewIndex].classList.add('display')
	ALL_REVIEWS[reviewIndex].classList.add('fade')
	// Fade in elements
	const reviewsQuoteMark = getElementByClassName('reviews-quote-mark', reviewIndex)
	const reviewsQuote = getElementByClassName('reviews-quote', reviewIndex)
	const reviewsQuotees = getElementByClassName('reviews-quotee', reviewIndex)
	const reviewsArrows = getElementByClassName('reviews-arrows', reviewIndex)
	reviewsArrows.classList.add('display')
	setTimeout(() => reviewsQuoteMark.classList.add('fade-move'), 100)
	setTimeout(() => reviewsQuote.classList.add('fade-move'), 200)
	setTimeout(() => reviewsQuotees.classList.add('fade-move'), 400)
	setTimeout(() => reviewsArrows.classList.add('fade-move'), 800)
}

const resetReview = reviewIndex => {
	const reviewsQuoteMark = getElementByClassName('reviews-quote-mark', reviewIndex)
	const reviewsQuote = getElementByClassName('reviews-quote', reviewIndex)
	const reviewsQuotees = getElementByClassName('reviews-quotee', reviewIndex)
	const reviewsArrows = getElementByClassName('reviews-arrows', reviewIndex)
	reviewsQuoteMark.classList.remove('fade-move')
	reviewsQuote.classList.remove('fade-move')
	reviewsQuotees.classList.remove('fade-move')
	reviewsArrows.classList.remove('fade-move')
	reviewsArrows.classList.remove('display')
	// Hide Review Tab
	ALL_REVIEWS[reviewIndex].classList.remove('fade')
	ALL_REVIEWS[reviewIndex].classList.remove('display')
}

const transitionReviews = ({ currentReview, nextReview }) => {
	// Fade out current tab
	ALL_REVIEWS[currentReview].classList.remove('fade')
	// Fade in new slide
	setTimeout(() => {
		ALL_REVIEWS[currentReview].classList.remove('display')
		fadeInReview(nextReview)
	}, 500)
	// Fade out current review tab
	setTimeout(() => resetReview(currentReview), 1000)
}


windowEventListener(['load', 'orientationchange', 'resize'], () => {
	// Recalculate hero height on orientation change
	setHeroHeight()
	// As well as box section and container dimensions
	setBoxSections()
})

// Event summary “Read more...” expansion
if (getElementByClassName('text read-more')) {
	getElementByClassName('text read-more').addEventListener('mouseover', () => {
		hideElement(getElementByClassName('text read-more'))
		hideElement(getElementByClassName('text summary'))
		getElementByClassName('text description').classList.add('display')
		setTimeout(() => getElementByClassName('text description display').classList.add('fade'), 100)
	})
}

// Begin
if (window.location.pathname === '/') {
 
	// Add event listener to cycle through all hero messages on arrow click
	const leftHeroArrows = getElementsByClassName('hero-arrow left')
	const rightHeroArrows = getElementsByClassName('hero-arrow right')
	for (let tabIndex = 0; tabIndex < rightHeroArrows.length; tabIndex++) {
		// Cycle forward
		rightHeroArrows[tabIndex].addEventListener('click', () => {
			ACTIVE_TAB_INDEX = tabIndex === ALL_TABS.length - 1 ? 0 : tabIndex + 1
			transitionTabs({ currentTab: tabIndex, nextTab: ACTIVE_TAB_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
		// Cycle backward
		leftHeroArrows[tabIndex].addEventListener('click', () => {
			ACTIVE_TAB_INDEX = tabIndex === 0 ? ALL_TABS.length - 1 : tabIndex - 1
			transitionTabs({ currentTab: tabIndex, nextTab: ACTIVE_TAB_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(tabInterval)
		})
	}

	// Add event listener to cycle through all reviews on arrow click
	const leftReviewsArrows = getElementsByClassName('reviews-arrow left')
	const rightReviewsArrows = getElementsByClassName('reviews-arrow right')
	for (let reviewIndex = 0; reviewIndex < rightReviewsArrows.length; reviewIndex++) {
		// Cycle forward
		rightReviewsArrows[reviewIndex].addEventListener('click', () => {
			ACTIVE_REVIEW_INDEX = reviewIndex === ALL_REVIEWS.length - 1 ? 0 : reviewIndex + 1
			transitionReviews({ currentReview: reviewIndex, nextReview: ACTIVE_REVIEW_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(reviewInterval)
		})
		// Cycle backward
		leftReviewsArrows[reviewIndex].addEventListener('click', () => {
			ACTIVE_REVIEW_INDEX = reviewIndex === 0 ? ALL_REVIEWS.length - 1 : reviewIndex - 1
			transitionReviews({ currentReview: reviewIndex, nextReview: ACTIVE_REVIEW_INDEX })
			// Interrupt auto-cycling if user manually clicked arrow
			clearInterval(reviewInterval)
		})
	}

	// Remove display classes on init for hero tabs
	resetHeroTab(0)

	// Remove display classes on init for reviews
	resetReview(0)

	// Set hero height
	setHeroHeight()

	// Fade in first slide
	fadeInHeroTab(0)

	// Fade in first review
	fadeInReview(0)

	// Switch tabs periodically
	const tabInterval = setInterval(() => {
		const currentTab = ACTIVE_TAB_INDEX
		ACTIVE_TAB_INDEX = ACTIVE_TAB_INDEX === ALL_TABS.length - 1 ? 0 : ACTIVE_TAB_INDEX + 1
		transitionTabs({ currentTab, nextTab: ACTIVE_TAB_INDEX })
	}, 8000)
	// Switch reviews periodically
	const reviewInterval = setInterval(() => {
		const currentReview = ACTIVE_REVIEW_INDEX
		ACTIVE_REVIEW_INDEX = ACTIVE_REVIEW_INDEX === ALL_REVIEWS.length - 1 ? 0 : ACTIVE_REVIEW_INDEX + 1
		transitionReviews({ currentReview, nextReview: ACTIVE_REVIEW_INDEX })
	}, 8000)

}