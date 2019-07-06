// EMAIL NEWSLETTER SIGNUPS

// 1. Define all input fields
const emailBoxNames = [
	'hero', // homepage hero email signup
	'promo', // homepage promo email signup
	'event1', // events pre-reg (top)
	'event2' // events pre-reg (bottom)
]
const emailBoxFields = [
	'first_name',
	'last_name',
	'email',
	'questions', // Only for homepage hero
	'phone' // Only on events page
]

const recaptchaServer =
	'https://wt-d2bd89d1d23e6c320f5aff229c206923-0.sandbox.auth0-extend.com/recaptcha'
grecaptcha.ready(() => {
	grecaptcha
		.execute('6LcQUqwUAAAAAN1xfTSh_9TYo_lGX48SDEsW6mqz', { action: 'homepage' })
		.then(token => {
			$.ajax({
				type: 'POST',
				url: recaptchaServer,
				crossDomain: true,
				data: {
					token
				}
			})
				// Success
				.then(res => {
					console.log(res)
					if (res && res.success && res.score > 0.8) {
						emailBoxNames.forEach(emailBoxName => {
							const alertField = getElementById(emailBoxName + '_alert')
							const emailBoxForm = getElementById(emailBoxName + '_form')
							const buttonField = getElementById(emailBoxName + '_button')

							// 2. Assign button function to all relevant fields, and trigger submit if user presses enter
							if (buttonField) {
								buttonField.addEventListener('click', () => {
									// If email box is used on homepage...
									if (emailBoxName === 'hero' || emailBoxName === 'promo') {
										// ...collect email newsletter
										emailBoxForm.action = 'https://app.getresponse.com/add_subscriber.html'
										emailBoxForm.submit()
									}
									// ...otherwise, bring up reg form, since used in events page
									else {
										emailBoxFields.forEach(checkEmailBoxField => {
											// Transfer data onto reg form where it can be either used or cleared...
											const field = getElementById(emailBoxName + '_' + checkEmailBoxField)
											if (checkEmailBoxField === 'first_name') {
												eventFirstName.value = field.value
											} else if (checkEmailBoxField === 'last_name') {
												eventLastName.value = field.value
											} else if (checkEmailBoxField === 'email') {
												eventEmail.value = field.value
											} else if (checkEmailBoxField === 'phone') {
												eventMobile.value = field.value
											}
										})
										// Don’t clear and repopulate to preserve first, last name, email, phone
										showRegForm(false)
									}
								})
							}

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
										}

										// Check to see if every field has been filled out correctly...
										const valid = emailBoxFields.every(checkEmailBoxField => {
											const checkField = getElementById(emailBoxName + '_' + checkEmailBoxField)
											// If field doesn’t exist, return true.
											if (!checkField) return true
											// return true if all fields have been filled out
											return (
												// First and last names have to have at least 2 characters each...
												((checkEmailBoxField === 'first_name' ||
													checkEmailBoxField === 'last_name') &&
													checkField.value.length > 1) ||
												// ...email has to be at least 4 characters and valid...
												(checkEmailBoxField === 'email' &&
													checkField.value.length > 4 &&
													standardisationEmail.test(checkField.value)) ||
												// Any other fields have to be at least 1 character long.
												checkField.value.length > 0
											)
										})
										// Only show alert once every field has been touched...
										const everyFieldHasBeenFilledOut = emailBoxFields.every(
											checkEmailBoxField =>
												!getElementById(emailBoxName + '_' + checkEmailBoxField) ||
												getElementById(emailBoxName + '_' + checkEmailBoxField).value.length > 0
										)
										// Only show alert if all fields have been filled out somewhat, but not yet validated
										if (emailBoxName === 'hero' && !valid && everyFieldHasBeenFilledOut) {
											alertField.classList.remove('hidden')
											buttonField.disabled = true
											emailBoxForm.action = ''
											emailBoxForm.removeEventListener('click', () => null)
										}
										// ...and if all’s good to go, change button class to active.
										else {
											alertField.classList.add('hidden')
											buttonField.disabled = false
										}
										const key = e.which || e.keyCode
										// If `enter` key is pressed, attempt to submit emailBoxForm
										if (key === 13) {
											buttonField.click()
										}
									})
								}
							})
						})
					}
				})
		})
})
