// EMAIL NEWSLETTER SIGNUPS

const changeEmailContainerBackground = ({ element, visible }) => {
	const color = !visible
		? '#fff'
		: '#333'
	const mode = !visible
		? 'add'
		: 'remove'
	for (let i = 0; i < element.children.length; i++) {
		// Elements are contained inside `email-form` class...
		if (element.children[i].className === 'email-form') {
      // Make the email signup box title and button white instead of charcoal.
      const title = element.children[i].querySelectorAll('div.title.small')[0]
      title.style.color = color
      const button = element.children[i].querySelectorAll('a.button.transparent')[0]
      button.style.color = color
      // Input elements are listed as children...
			for (let j = 0; j < element.children[i].length; j++) {
				const inputElement = element.children[i][j]
				// ...so make the input placeholders white instead of charcoal.
				if (inputElement.className.includes('input') || inputElement.className.includes('textarea')) {
					if (mode === 'add') {
						inputElement.classList.add('white-placeholder')
					}
					else {
						inputElement.classList.remove('white-placeholder')
					}
				}
			}
		}
	}

	}
	
// 1. Define all input fields
const formNames = [
	'hero',
]
const formFields = [
	'first_name',
	'last_name',
	'email',
	'verification'
]

// 2. Only once all fields are entered, enable button.
const verifyEmailSignup = e => {
	formNames.forEach(inputCategory => {
		// If change was made in a certain email signup category...
		if (e.target.id.includes(inputCategory)) {
			// ...check to see if every field has been filled out correctly...
			const complete = formFields.every(inputField => {
				const field = document.getElementById(inputCategory + '_' + inputField)
				if (inputField === 'first_name' || inputField === 'last_name') {
					// Prevent ALL CAPS
					field.value = field.value.toLowerCase()
					// Title case
					field.value = field.value.charAt(0).toUpperCase() + field.value.slice(1)
					// No empty spaces
					if (field.value.includes(' ')) {
						field.value = field.value.replace(' ', '')
					}
				}
				const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
				// return true if all fields have been filled out
				return (
					((inputField === 'first_name' || inputField === 'last_name') && field.value.length > 1)
					|| (inputField === 'email' && field.value.length > 4 && emailRegex.test(field.value))
				)
			})
			const showAlert = formFields.every(inputField => {
				const field = document.getElementById(inputCategory + '_' + inputField)
				return (
					// Only show alert once every field has been touched...
					field.value.length > 0
				)
			})
			// ...and if so, change button class to active, and submit form.
			const buttonField = document.getElementById(inputCategory + '_button')
			const alertField = document.getElementById(inputCategory + '_alert')
			// Only show alert if all fields have been filled out somewhat, but not yet validated
			if (showAlert) {
				alertField.classList.remove('hidden')
			}
			else {
				alertField.classList.add('hidden')
			}
			if (complete && !showAlert) {
				buttonField.classList.remove('disabled')
				const formField = document.getElementById(inputCategory + '_form')
				formField.action = 'https://app.getresponse.com/add_subscriber.html'
				buttonField.addEventListener('click', () => formField.submit())
			}
			// ...otherwise, disable form.
			else {
				buttonField.classList.add('disabled')
				const formField = document.getElementById(inputCategory + '_form')
				formField.action = ''
				buttonField.removeEventListener('click', () => null)
			}
		}
	}) 
}

// 3. Assign enable button function to all relevant fields, and trigger submit if user presses enter
formNames.forEach(inputCategory => {
	formFields.forEach(inputField => {
		const field = document.getElementById(inputCategory + '_' + inputField)
		if (field) {
			field.oninput = verifyEmailSignup
			field.addEventListener('keypress', e => {
				const key = e.which || e.keyCode
				// If `enter` key is pressed, attempt to submit form
				if (key === 13) {
					const buttonField = document.getElementById(inputCategory + '_button')
					buttonField.click()
				}
			})
		}
	})
})