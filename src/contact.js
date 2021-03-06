const initiateContactForm = () => {
	fadeElement('received-section', 500, 0)
	hideElement('received-section')
	fadeElement('contact-section', 500, 1)
	showElement('contact-section')
	hideElement('w-form-done')
	hideElement('w-form-fail')
	showElement('contact-form')
}

const submitContactForm = () => {
	formErrorInitialization('contact-form')
	if (formErrorValidation('contact-form')) {
		formSubmit('contact-form')
		fadeElement('contact-section', 500, 0)
		hideElement('contact-section')
		showElement('received-section')
		fadeElement('received-section', 500, 1)
	}
}
initiateContactForm()
// Contact form complete, send user to confirmation
onClick('button contact', () => submitContactForm())
