// Opening for events
const eventTitles = getElementsByClassName('event-title')
const eventSubtitles = getElementsByClassName('event-subtitle')
const eventDetails = getElementsByClassName('event-details')
for (let i = 0; i < eventTitles.length; i++) {
	// Fade in
	eventTitles[i].classList.add('fade-move')
	eventSubtitles[i].classList.add('fade-move')
	eventDetails[i].classList.add('fade-move')
	// Email signup form
	// If background image is so complex that email signup form needs a dark background instead of a transparent background...
	const emailBox = getElementsByClassName('email-box')[i]
	// emailBox with class `email container background` has conditional visibility in Webflow, so Webflow tags a new class called `w-condition-invisible` if collection determines it’s invisible
	const visible = emailBox.querySelector('div.email-container-background.w-condition-invisible') === null
	changeEmailContainerBackground({ visible })
}


// Reg Form elements
const regFormButtons = getElementsByClassName('button register')
const regFormBg = getElementByClassName('reg-form-background')
const regFormContainer = getElementByClassName('reg-form-container')

const showRegForm = () => {
	// Prevent background to scroll
	document.body.style.overflow = 'hidden'
	// Unhide reg form background
	showElement(regFormBg)
	setTimeout(() => {
		// Fade in background after 100ms once unhidden
		fadeInElement(regFormBg)
		setTimeout(() => {
			// Once background has successfully faded in after 200ms, scroll to top to prevent fade error on Chrome.
			window.scrollTo(0, 0)
			setTimeout(() => {
				// Once scroll to top has occurred, unhide reg form...
				showElement(regFormContainer)
				// ...scroll to top of reg form...
				regFormContainer.scrollTop = 0
				// ...and fade in.
				setTimeout(() => fadeInElement(regFormContainer), 100)
			}, 100)
		}, 200)
	}, 100)
}

const closeRegForm = () => {
	// Reallow background to scroll
	document.body.style.overflow = 'visible'
	// Fade out elements
	fadeOutElement(regFormBg)
	fadeOutElement(regFormContainer)
	// Hide elements after fade out
	setTimeout(() => {
		hideElement(regFormBg)
		hideElement(regFormContainer)
	}, 200)
}

// Event listener for if reg form is opened...
for (let i = 0; i < regFormButtons.length; i++) {
	onClick(regFormButtons[i], () => showRegForm())
}
// ...and closed.
const regFormClose = getElementByClassName('reg-form-close')
onClick(regFormClose, () => closeRegForm())

// Event summary “Read more...” expansion
getElementByClassName('text read-more').addEventListener('mouseover', () => {
	hideElement(getElementByClassName('text read-more'))
	hideElement(getElementByClassName('text summary'))
	getElementByClassName('text description').classList.add('display')
	setTimeout(() => getElementByClassName('text description display').classList.add('fade'), 100)
})