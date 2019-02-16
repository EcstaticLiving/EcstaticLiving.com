// EMAIL NEWSLETTER SIGNUPS
	
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

// 2. Only once all fields are entered and verification question has been answered, enable button.
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
        // return true if all fields have been filled out and verification answer is correct
        return (
          ((inputField === 'first_name' || inputField === 'last_name') && field.value.length > 1)
          || (inputField === 'email' && field.value.length > 4 && emailRegex.test(field.value))
          || inputField === 'verification'
        )
      })
      const showAlert = formFields.every(inputField => {
        const field = document.getElementById(inputCategory + '_' + inputField)
        return (
          // Only show alert once every field has been touched...
          field.value.length > 0
          // ...and...
          && (
            // ...user is in verification field...
            (
              e.target.id.includes('verification')
              && (
                // ...and user is either typing an incorrect verification code...
                (field.value !== '3' && field.value !== 't' && field.value !== 'th' && field.value !== 'thr' && field.value !== 'thre' && field.value !== 'three')
                // ...or user is typing correct verification code, but other fields are still incomplete
                || (
                  (field.value === '3' || field.value === 't' || field.value === 'th' || field.value === 'thr' || field.value === 'thre' || field.value === 'three') && !complete
                )
              )
            )
            // ...or user is not in verification field, and other fields are incomplete
            || (!e.target.id.includes('verification') && !complete)
          )
        )
      })
      const verificationComplete = document.getElementById(inputCategory + '_verification').value === '3' || document.getElementById(inputCategory + '_verification').value === 'three'
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
      if (complete && !showAlert && verificationComplete) {
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