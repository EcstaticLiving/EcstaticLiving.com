// Opening for events
const eventTitles = getElementsByClassName('event-title')
const eventSubtitles = getElementsByClassName('event-subtitle')
const eventDetails = getElementsByClassName('event-details')
for (let i = 0; i < eventTitles.length; i++) {
	// Fade in
	// eventTitles[i].classList.add('fade-move')
	// eventSubtitles[i].classList.add('fade-move')
	// eventDetails[i].classList.add('fade-move')
	// Email signup form
	// If background image is so complex that email signup form needs a dark background instead of a transparent background...
	const emailBox = getElementsByClassName('email-box')[i]
	// emailBox with class `email container background` has conditional visibility in Webflow, so Webflow tags a new class called `w-condition-invisible` if collection determines it’s invisible
	const visible =
		emailBox.querySelector(
			'div.email-container-background.w-condition-invisible'
		) === null
	changeEmailContainerBackground({ visible })
}

// Reg Form elements
const regFormButtons = getElementsByClassName('button register')
const regFormContainer = getElementByClassName('reg-form-container')
const regForm = getElementByClassName('reg-form')

// Browserfix is necessary since Safari, Chrome, Firefox (only ones tested) do not render hidden elements outside of initial view upon scroll
const browserFix = () => {
	const elements = regForm.querySelectorAll('input, textarea, div')
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i]
		element.style.opacity = '1.0'
	}
}

// clearAndRepopulate can be set `false` to preserve data (like first name, last name, phone, email) sent to reg form
const showRegForm = (clearAndRepopulate = true) => {
	// Prevent background to scroll
	document.body.style.overflow = 'hidden'
	// Unhide reg form...
	showElement(regFormContainer)
	// ...scroll to top of reg form...
	regFormContainer.scrollTop = 0
	// ...and fade in.
	setTimeout(() => {
		fadeInElement(regFormContainer)
		browserFix()
		initForm(clearAndRepopulate)
	}, 100)
}

const closeRegForm = () => {
	// Reallow background to scroll
	document.body.style.overflow = 'visible'
	// Fade out element
	fadeOutElement(regFormContainer)
	// Hide elements after fade out
	setTimeout(() => hideElement(regFormContainer), 200)
}

// BROWSER FIX: on scroll error
regFormContainer.onscroll = () => browserFix()

// Event listener for if reg form is opened...
for (let i = 0; i < regFormButtons.length; i++) {
	onClick(regFormButtons[i], () => showRegForm())
}
// ...and closed.
const regFormClose = getElementByClassName('reg-form-close')
onClick(regFormClose, () => closeRegForm())
