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

				// Make sure first and last names don’t contain spaces
				if (e.target.name === 'first_name' || e.target.name === 'last_name') {
					field.value = standardisationName(field.value)
				}
				// Set phone number according to national format
				else if (e.target.name === 'phone') {
					let iti = intlTelInput(field)
					console.log(e.target)
					iti.setNumber(e.target.value.toString())
					console.log(iti.getNumber())
					// Uses cleave.js for validation
					new Cleave(field, {
						phone: true,
						phoneRegionCode: 'US'
					})
				}

				// Check to see if every field has been filled out correctly...
				const valid = emailBoxFields.every(checkEmailBoxField => {
					const checkField = getElementById(emailBoxName + '_' + checkEmailBoxField)
					// If field doesn’t exist, return true.
					if (!checkField)	return true
					// return true if all fields have been filled out
					return (
						// First and last names have to have at least 2 characters each...
						((checkEmailBoxField === 'first_name' || checkEmailBoxField === 'last_name') && checkField.value.length > 1)
						// ...email has to be at least 4 characters and valid...
						|| (checkEmailBoxField === 'email' && checkField.value.length > 4 && standardisationEmail.test(checkField.value))
						// Any other fields have to be at least 1 character long.
						|| checkField.value.length > 0
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
					buttonField.disabled = true
					emailBoxForm.action = ''
					emailBoxForm.removeEventListener('click', () => null)
				}
				// ...and if all’s good to go, change button class to active, and submit emailBoxForm.
				else {
					alertField.classList.add('hidden')
					buttonField.disabled = false
					buttonField.addEventListener('click', () => {
						// If email box is used on homepage...
						if (emailBoxName === 'hero') {
							// ...collect email newsletter
							emailBoxForm.action = 'https://app.getresponse.com/add_subscriber.html'
							emailBoxForm.submit()
						}
						// ...otherwise, bring up reg form, since used in events page
						else {
							emailBoxFields.forEach(checkEmailBoxField => {
								// Transfer data onto reg form where it can be either used or cleared...
								const field = getElementById(emailBoxName + '_' + checkEmailBoxField)
								// and clear it from email box for privacy.
								if (checkEmailBoxField === 'first_name') {
									eventFirstName.value = field.value
									field.value = ''
								}
								else if (checkEmailBoxField === 'last_name') {
									eventLastName.value = field.value
									field.value = ''
								}
								else if (checkEmailBoxField === 'email') {
									eventEmail.value = field.value
									field.value = ''
								}
								else if (checkEmailBoxField === 'phone') {
									eventMobile.value = field.value
									field.value = ''
								}
							})
							showRegForm()
						}
					})
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