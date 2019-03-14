// EMAIL NEWSLETTER SIGNUPS

// 1. Define all input fields
const formNames = [
	'hero',		// homepage hero email signup
	'event1',	// events pre-reg (top)
	'event2'	// events pre-reg (bottom)
]
const formFields = [
	'first_name',
	'last_name',
	'email',
	'questions',	// Only for homepage hero
	'phone'				// Only on events page
]

// 2. Only once all fields have been entered, enable button.
const verifyEmailSignup = e => {
	formNames.forEach(formName => {
		// If change was made in a certain email signup category...
		if (e.target.id.includes(formName)) {
			// ...check to see if every field has been filled out correctly...
			const complete = formFields.every(formField => {
				const field = getElementById(formName + '_' + formField)
				if (formField === 'first_name' || formField === 'last_name') {
					field.value = standardisationName(field.value)
				}
				// return true if all fields have been filled out
				return (
					((formField === 'first_name' || formField === 'last_name') && field.value.length > 1)
					|| (formField === 'email' && field.value.length > 4 && standardisationEmail.test(field.value))
				)
			})
			// Only show alert once every field has been touched...
			const showAlert = formFields.every(formField => getElementById(formName + '_' + formField).value.length > 0)
			// ...and if so, change button class to active, and submit form.
			const buttonField = getElementById(formName + '_button')
			const alertField = getElementById(formName + '_alert')
			// Only show alert if all fields have been filled out somewhat, but not yet validated
			if (showAlert) {
				alertField.classList.remove('hidden')
			}
			else {
				alertField.classList.add('hidden')
			}
			const form = getElementById(formName + '_form')
			if (complete && !showAlert) {
				buttonField.classList.remove('disabled')
				form.action = 'https://app.getresponse.com/add_subscriber.html'
				buttonField.addEventListener('click', () => form.submit())
			}
			// ...otherwise, disable form.
			else {
				buttonField.classList.add('disabled')
				form.action = ''
				form.removeEventListener('click', () => null)
			}
		}
	}) 
}

// 3. Assign enable button function to all relevant fields, and trigger submit if user presses enter
formNames.forEach(formName => {
	formFields.forEach(formField => {
		const field = getElementById(formName + '_' + formField)
		if (field) {
			field.oninput = verifyEmailSignup
			field.addEventListener('keypress', e => {
				const key = e.which || e.keyCode
				// If `enter` key is pressed, attempt to submit form
				if (key === 13) {
					const buttonField = getElementById(formName + '_button')
					buttonField.click()
				}
			})
		}
	})
})