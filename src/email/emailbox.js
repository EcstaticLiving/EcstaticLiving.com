// EMAIL NEWSLETTER SIGNUPS

// 1. Define all input fields
const emailBoxNames = [
	'hero',		// homepage hero email signup
	'event1',	// events pre-reg (top)
	'event2'	// events pre-reg (bottom)
]
const emailBoxFields = [
	'first_name',
	'last_name',
	'email',
	'questions',	// Only for homepage hero
	'phone'				// Only on events page
]

// 2. Assign enable button function to all relevant fields, and trigger submit if user presses enter
emailBoxNames.forEach(emailBoxName => {
	emailBoxFields.forEach(emailBoxField => {
		const field = getElementById(emailBoxName + '_' + emailBoxField)
		if (field) {
			field.addEventListener('keypress', e => {

				// Check to see if every field has been filled out correctly...
				const valid = emailBoxFields.every(checkEmailBoxField => {
					const field = getElementById(emailBoxName + '_' + checkEmailBoxField)
					// If field doesn’t exist, return true.
					if (!field)	return true
					// Make sure first and last names don’t contain spaces
					if (checkEmailBoxField === 'first_name' || checkEmailBoxField === 'last_name') {
						field.value = standardisationName(field.value)
					}
					// return true if all fields have been filled out
					return (
						// First and last names have to have at least two characters each...
						((checkEmailBoxField === 'first_name' || checkEmailBoxField === 'last_name') && field.value.length > 1)
						// ...email has to be at least 4 characters and valid...
						&& (checkEmailBoxField === 'email' && field.value.length > 4 && standardisationEmail.test(field.value))
					)
				})
				// Only show alert once every field has been touched...
				const everyFieldHasBeenFilledOut = emailBoxFields.every(checkEmailBoxField => !getElementById(emailBoxName + '_' + checkEmailBoxField) || getElementById(emailBoxName + '_' + checkEmailBoxField).value.length > 0)
				const buttonField = getElementById(emailBoxName + '_button')
				const alertField = getElementById(emailBoxName + '_alert')
				const emailBoxForm = getElementById(emailBoxName + '_form')
				// Only show alert if all fields have been filled out somewhat, but not yet validated
				if (!valid && everyFieldHasBeenFilledOut) {
					alertField.classList.remove('hidden')
					buttonField.classList.add('disabled')
					emailBoxForm.action = ''
					emailBoxForm.removeEventListener('click', () => null)
				}
				// ...and if all’s good to go, change button class to active, and submit emailBoxForm.
				else {
					alertField.classList.add('hidden')
					buttonField.classList.remove('disabled')
					emailBoxForm.action = 'https://app.getresponse.com/add_subscriber.html'
					buttonField.addEventListener('click', () => emailBoxForm.submit())
				}
				const key = e.which || e.keyCode
				// If `enter` key is pressed, attempt to submit emailBoxForm
				if (key === 13) {
					const buttonField = getElementById(emailBoxName + '_button')
					buttonField.click()
				}
			})
		}
	})
})