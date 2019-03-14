// Opening for events
const eventTitles = getElementsByClassName('event-title')
const eventSubtitles = getElementsByClassName('event-subtitle')
const eventDetails = getElementsByClassName('event-details')
console.log(eventTitles)
for (let i = 0; i < eventTitles.length; i++) {
	// Fade in
	eventTitles[i].classList.add('fade-move')
	eventSubtitles[i].classList.add('fade-move')
	eventDetails[i].classList.add('fade-move')
	// Email signup form
	// If background image is so complex that email signup form needs a dark background instead of a transparent background...
	const emailBox = getElementsByClassName('email-box')[i]
	console.log(emailBox)
	// emailBox with class `email container background` has conditional visibility in Webflow, so Webflow tags a new class called `w-condition-invisible` if collection determines it’s invisible
	const visible = emailBox.querySelector('div.email-container-background.w-condition-invisible') === null
	console.log(visible)
	changeEmailContainerBackground({ visible })
}


// Reg Form elements
const regFormButtons = getElementsByClassName('button register')
const regFormModalBackground = querySelector('div.modal-background')
const regFormModalStatus = querySelector('div.modal-status.registration')
const regFormModal = querySelector('div.modal.registration')
const regFormModalWindow = querySelector('div.modal-window.registration')
const regFormContainer = getElementByClassName('container reg-form')

const showRegForm = () => {
	// Unhide modal & background
	showElement(regFormModalBackground)
	showElement(regFormModalStatus)
	// Fade in background after it’s been made visible
	setTimeout(() => fadeInElement(regFormModalBackground), 100)
	// Show reg form: browser error that doesn’t show opacity of elements inside modal window unless body is scrolled to top
	setTimeout(() => window.scrollTo(0, 0), 200)
	setTimeout(() => {
		// Scroll to top
		regFormContainer.scrollTop = 0
		// Prevent background from scrolling
		document.body.style.overflow = 'hidden'
	}, 400)
	
}

const closeRegForm = () => {
	// Reallow background to scroll
	document.body.style.overflow = 'visible'
	// Fade out window
	fadeOutElement(regFormModalStatus)
	// Fade out modal background
	fadeOutElement(regFormModalBackground)
	// Hide modal
	setTimeout(() => {
		hideElement(regFormModalStatus)
		hideElement(regFormModalBackground)
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