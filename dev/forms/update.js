// Custom charge form
const customForm = '#wf-form-Custom-Charge',
customCode = '#custom-code',
customFirstName = '#custom-firstname',
customLastName = '#custom-lastname',
customEmail = '#custom-email',
customMobile = '#custom-mobile',
customSelect = '#custom-select',
customTerms = '#custom-terms',
customTermsValidation = '#custom-terms-validation',
customOptions = getText('#custom-options').split(' | '),
customPrices = getText('#custom-prices').split(' | ')

const formValidation = () => {
	if (!isBlank(customFirstName) && !isBlank(customLastName) && !isBlank(customEmail) && !isBlank(customMobile) && getValue(customSelect) && isChecked(customTerms) && billingValidation()) {
		emptyText('#card-errors')
		setCss(paymentButton, { 'background-color': '#800000' })
		setCss(paymentButton, { 'color': '#ffffff' })
		return true
	}
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
	return false
}

const showErrorsInForm = () => {
	if (!isChecked(customTerms)) {
    setCss(customTermsValidation, { 'background-color': '#fdd' })
  }
  else {
    setCss(customTermsValidation, { 'background-color': 'transparent' })
  }
	formErrorValidation(customForm)
}

const setCustomChargeSelect = () => {
	//	Adds options & prices based on CMS input
	emptySelect(customSelect)
	if (customOptions.length > 0) {
		appendSelect(customSelect, { text: 'Custom charge option...', value: '' })
	}
	for (let i = 0; i < customOptions.length; i++) {
		appendSelect(customSelect, { text: customOptions[i] + ' - $' + customPrices[i], value: customPrices[i] })
	}
}

const resetForm = () => {
	clearForm(page())
	repopulateForm(page())
	setCustomChargeSelect()
	formErrorInit(customForm)
	showElement(customForm)
	unCheckElement(customTerms)
	formValidation()
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
}

// CUSTOM CHARGE ONCHANGE EVENTS
onChange(customFirstName, () => setValue(billingFirstName, getValue(eventFirstName)))
onChange(customLastName, () => setValue(billingLastName, getValue(eventLastName)))

// If any fields have changed...
for (elem of [customFirstName, customLastName, customEmail, customMobile, customSelect, customTerms, billingFirstName, billingLastName, billingStreet, billingCity, billingState, billingPostal, billingCountry]) {
	// ...validate form to either activate or deactivate Pay Now button.
	onChange(elem, () => formValidation())
}

// RESET CUSTOM CHARGE
resetForm()

onClick(paymentButton, e => {

	if (!formValidation()) {
		showErrorsInForm()
		// If there’s no Stripe error message
		if (isBlank('#card-errors')) {
			setText('#card-errors', 'Oops! There’s some missing information.')
		}
		return false
	}

	// Stripe variables
	chargeAmount = getValue(customSelect) * 100
	customerDescription = getValue(customFirstName) + ' ' + getValue(customLastName) + ' <' + getValue(customEmail) + '>'
	customerEmail = getValue(customEmail)
	chargeDescription = 'Custom Charge: ' + getText(customSelect).substring(0, getText(customSelect).length - 16)

})