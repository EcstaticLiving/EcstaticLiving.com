// DESIGN

const changeEmailContainerBackground = ({ visible = false }) => {
	const color = visible
		? '#fff'
		: '#333'
	const mode = visible
		? 'add'
		: 'remove'
	// Make the email signup box title and button white instead of charcoal.
	const title = document.querySelectorAll('div.title.email')[0]
	if (title) {
		title.style.color = color
	}
	const button = document.querySelectorAll('a.button.transparent')[0]
	if (button) {
		button.style.color = color
	}
	const inputFields = document.querySelectorAll('div.email-box input')
	const textareaFields = document.querySelectorAll('div.email-box textarea')
	for (let i = 0; i < inputFields.length; i++) {
		const inputField = inputFields[i]
		if (mode === 'add') {
			inputField.classList.add('white-placeholder')
		}
		else {
			inputField.classList.remove('white-placeholder')
		}
	}
	for (let i = 0; i < textareaFields.length; i++) {
		const textareaField = textareaFields[i]
		if (mode === 'add') {
			textareaField.classList.add('white-placeholder')
		}
		else {
			textareaField.classList.remove('white-placeholder')
		}
	}
}