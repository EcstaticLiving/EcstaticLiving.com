// Prevent form from being submitted. This is being done manually in on click paymentButton
onSubmit(eventForm, () => null)

// Clear form
onClick('#form-clear', () => clearForm(page()))

// Load form
onClick('#form-load', () => repopulateForm(page()))

// Invite-only
onClick(eventInviteButton, () => e => {
	e.preventDefault()
	// Show errors, if any
	inviteOnlyCodeVerification()
	// Adjust prices
	setEventPrices()
})

// Affiliate yes/no?
for (elem of [eventAffiliateYes, eventAffiliateNo]) {
	onChange(elem, () => {
		// If affiliate code, show code input field...
		if (isChecked(eventAffiliateYes)) showAndScrollTo(eventAffiliateCodeContainer)
		// ...otherwise, hide it.
		else {
			emptyValue(eventAffiliateCodeContainer)
			hideElement(eventAffiliateCodeContainer)
		}
	})
}

// Affiliate box
onChange(eventAffiliateCode, () => {
	// Show errors, if any
	affiliateCodeVerification()
	// Adjust prices
	setEventPrices()
})

// Personal
onChange(eventFirstName, () => setValue(billingFirstName, getValue(eventFirstName)))
onChange(eventLastName, () => setValue(billingLastName, getValue(eventLastName)))

// Details
[eventExperienceYes, eventExperienceNo].forEach(elem => onChange(elem, () => {
	if (isChecked(eventExperienceYes)) showAndScrollTo(eventExperienceContainer)
	if (isChecked(eventExperienceNo)) {
		emptyValue(eventExperienceDetails)
		hideElement(eventExperienceContainer)
	}
}))
[eventDietYes, eventDietNo].forEach(elem => onChange(elem, () => {
	if (isChecked(eventDietYes)) showAndScrollTo(eventDietContainer)
	if (isChecked(eventDietNo)) {
		emptyValue(eventDietDetails)
		hideElement(eventDietContainer)
	}
}))
[eventSpecialYes, eventSpecialNo].forEach(elem => onChange(elem, () => {
	if (isChecked(eventSpecialYes)) showAndScrollTo(eventSpecialContainer)
	if (isChecked(eventSpecialNo)) {
		emptyValue(eventSpecialDetails)
		hideElement(eventSpecialContainer)
	}
}))

// Partner
onChange(eventStatus, () => participants() === 2 ? showPartner() : hidePartner())
onChange(eventPayBoth, () => setEventPrices())
onChange(eventPayMe, () => setEventPrices())

// All reg fields
[
	eventFirstName, eventLastName, eventEmail, eventMobile, eventBirthdate, eventFemale, eventMale, eventOther, eventReferral, eventExperienceYes, eventExperienceNo, eventExperienceDetails, eventDietYes, eventDietNo, eventDietDetails, eventSpecialYes, eventSpecialNo, eventSpecialDetails, eventStatus, eventPartnerFirstName, eventPartnerLastName, eventPartnerFemale, eventPartnerMale, eventPartnerOther, eventPayBoth, eventPayMe, eventSelect, eventTerms, billingFirstName, billingLastName, billingStreet, billingCity, billingState, billingPostal, billingCountry
].forEach(elem => onChange(elem, () => {
	// Save form whenever a single field has changed...
	saveForm(page())
	// ...and keep validating form to either activate or deactivate Pay Now button.
	formValidation()
}))

// To display grand total (optional feature)
[eventSelect, eventDepositFull, eventDepositDeposit].forEach(elem => onChange(elem, () => {
	setText(eventAmountDisplay, 'Total: $' + finalAmount())
	if (getText(eventAmountShow) === 'Yes') showAndScrollTo(eventAmountContainer)
}))