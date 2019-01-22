$('#form-clear').on('click', () => clearForm(page()))
$('#form-load').on('click', () => repopulateForm(page()))

$(eventInviteButton).on('click', e => {
	e.preventDefault()
	// Show errors, if any
	eventAffiliateShowErrors()
	// Adjust prices
	setEventPrices()
})
$(eventAffiliateNo + ',' + eventAffiliateYes).on('change', () => {
	// Show errors, if any
	eventAffiliateShowErrors()
	// Adjust prices
	setEventPrices()
	// Validate form
	eventFormValidation()
	if (isChecked(eventAffiliateYes)) showAndScrollTo(eventAffiliateContainer)
	if (isChecked(eventAffiliateNo)) hideAffiliate()
})
$(eventAffiliateCode).on('change', () => {
	if (isChecked(eventAffiliateYes)) {
		// Show errors, if any
		eventAffiliateShowErrors()
		// Adjust prices
		setEventPrices()
	}
})
$(eventFirstName).on('change', () => setValue(billingFirstName, getValue(eventFirstName)))
$(eventLastName).on('change', () => setValue(billingLastName, getValue(eventLastName)))
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
$(eventStatus).on('change', () => participants() === 2 ? showPartner() : hidePartner())
$(eventPayBoth + ',' + eventPayMe).on('change', () => setEventPrices())

$(eventFirstName + ',' + eventLastName + ',' + eventEmail + ',' + eventMobile + ',' + eventBirthdate + ',' + eventFemale + ',' + eventMale + ',' + eventOther + ',' + eventReferral + ',' + eventExperienceYes + ',' + eventExperienceNo + ',' + eventExperienceDetails + ',' + eventDietYes + ',' + eventDietNo + ',' + eventDietDetails + ',' + eventSpecialYes + ',' + eventSpecialNo + ',' + eventSpecialDetails + ',' + eventStatus + ',' + eventPartnerFirstName + ',' + eventPartnerLastName + ',' + eventPartnerFemale + ',' + eventPartnerMale + ',' + eventPartnerOther + ',' + eventPayBoth + ',' + eventPayMe + ',' + eventSelect + ',' + eventTerms + ',' + billingFirstName + ',' + billingLastName + ',' + billingStreet + ',' + billingCity + ',' + billingState + ',' + billingPostal + ',' + billingCountry).on('change', () => {
	saveForm(page)
	eventFormValidation()
})

$(eventSelect + ',' + eventDepositFull + ',' + eventDepositDeposit).on('change', () => {
	const amount = isChecked(eventDepositDeposit) && new Date() < new Date(eventDepositDate)
		? depositAmount()
		: getValue(eventSelect)
	setText(eventAmountDisplay, 'Total: $' + amount)
	if (getText(eventAmountShow) === 'Yes') { showAndScrollTo(eventAmountContainer) }
})