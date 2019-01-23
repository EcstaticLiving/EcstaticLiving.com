// Prevent form from being submitted. This is being done manually in on click paymentButton
$(eventForm).on('submit', () => false)

// Clear form
$('#form-clear').on('click', () => clearForm(page()))

// Load form
$('#form-load').on('click', () => repopulateForm(page()))

// Invite-only
$(eventInviteButton).on('click', e => {
	e.preventDefault()
	// Show errors, if any
	inviteOnlyCodeVerification()
	// Adjust prices
	setEventPrices()
})

// Affiliate yes/no?
$(eventAffiliateNo + ',' + eventAffiliateYes).on('change', () => {
	// If affiliate code, show code input field...
	if (isChecked(eventAffiliateYes)) showAndScrollTo(eventAffiliateCodeContainer)
	// ...otherwise, hide it.
	else {
		emptyValue(eventAffiliateCodeContainer)
		hideElement(eventAffiliateCodeContainer)
	}
})

// Affiliate box
$(eventAffiliateCode).on('change', () => {
	// Show errors, if any
	affiliateCodeVerification()
	// Adjust prices
	setEventPrices()
})

// Personal
$(eventFirstName).on('change', () => setValue(billingFirstName, getValue(eventFirstName)))
$(eventLastName).on('change', () => setValue(billingLastName, getValue(eventLastName)))

// Details
$(eventExperienceNo + ',' + eventExperienceYes).on('change', () => {
	if (isChecked(eventExperienceYes)) showAndScrollTo(eventExperienceContainer)
	if (isChecked(eventExperienceNo)) {
		emptyValue(eventExperienceDetails)
		hideElement(eventExperienceContainer)
	}
})
$(eventDietNo + ',' + eventDietYes).on('change', () => {
	if (isChecked(eventDietYes)) showAndScrollTo(eventDietContainer)
	if (isChecked(eventDietNo)) {
		emptyValue(eventDietDetails)
		hideElement(eventDietContainer)
	}
})
$(eventSpecialNo + ',' + eventSpecialYes).on('change', () => {
	if (isChecked(eventSpecialYes)) showAndScrollTo(eventSpecialContainer)
	if (isChecked(eventSpecialNo)) {
		emptyValue(eventSpecialDetails)
		hideElement(eventSpecialContainer)
	}
})

// Partner
$(eventStatus).on('change', () => participants() === 2 ? showPartner() : hidePartner())
$(eventPayBoth + ',' + eventPayMe).on('change', () => setEventPrices())

// All fields
$(eventAllFields).on('change', () => {
	// Save form whenever a single field has changed...
	saveForm(page())
	// ...and keep validating form to either activate or deactivate Pay Now button.
	formValidation()
})

// To display grand total (optional feature)
$(eventSelect + ',' + eventDepositFull + ',' + eventDepositDeposit).on('change', () => {
	setText(eventAmountDisplay, 'Total: $' + finalAmount())
	if (getText(eventAmountShow) === 'Yes') showAndScrollTo(eventAmountContainer)
})