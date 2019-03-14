// DESIGN

const changeEmailContainerBackground = ({ visible = false }) => {
	const color = visible
		? '#fff'
		: '#333'
	const mode = visible
		? 'add'
		: 'remove'
	// Make the email signup box title and button white instead of charcoal.
	const titles = document.querySelectorAll('div.title.email')
	const buttons = document.querySelectorAll('a.button.transparent')
	if (titles.length) {
		for (let i = 0; i < titles.length; i++) {
			titles[i].style.color = color
			buttons[i].style.color = color
		}
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