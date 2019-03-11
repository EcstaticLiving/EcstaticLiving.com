// EMAIL NEWSLETTER SIGNUPS

const changeEmailContainerBackground = elem => {
	// If background image is so complex that email signup form needs a dark background instead of a transparent background...
	let visible = false
	for (let i = 0; i < elem.children.length; i++) {
		// Element with class `email container background` has conditional visibility in Webflow, so Webflow tags a new class called `w-condition-invisible` if Collection determines it invisible
		visible = elem.children[i].className.includes('w-condition-invisible')
		if (visible) {
			break
		}
	}
	const color = !visible
		? '#fff'
		: '#333'
	const mode = !visible
		? 'add'
		: 'remove'
	for (let i = 0; i < elem.children.length; i++) {
		// Elements are contained inside `email-form` class...
		if (elem.children[i].className === 'email-form') {
      console.log(elem.children[i])
			for (let j = 0; j < elem.children[i].length; j++) {
				const element = elem.children[i][j]
				console.log(element)
				// ...then make the email signup box title white instead of charcoal.
				if (element.className.includes('title small') || element.className.includes('button transparent')) {
					element.style.color = color
				}
				else if (element.className.includes('input') || element.className.includes('textarea')) {
					if (mode === 'add') {
						element.classList.add('white-placeholder')
					}
					else {
						element.classList.remove('white-placeholder')
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