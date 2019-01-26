// Event Reg Form
const eventForm = '#wf-form-Event-Registration'

// Hidden fields
const eventCode = getText('#event-code').toUpperCase(),
eventTitle = getText('#event-name'),
eventDates = getText('#event-dates'),
eventVenue = getText('#event-venue'),
eventDepositAmount = parseFloat(getText('#event-deposit-amount')).toFixed(2),
eventDepositDate = getText('#event-deposit-date'),
eventBasePrice = parseFloat(getText('#event-base-price')).toFixed(2),
eventBaseCost = parseFloat(getText('#event-base-cost')).toFixed(2),
eventStatusRestriction = getText('#event-status-restriction')

// Event form
const eventRegForm = '.event-container.reg-form'

// Invite-only
const eventInviteButton = '#event-invitecode-button',
eventInviteBox = '#event-invitecode-box',
eventInviteCode = '#event-invitecode-code',
eventInvitePass = '#event-invitecode-pass',
eventInviteFail = '#event-invitecode-fail'

// Personal
const eventFirstName = '#event-firstname',
eventLastName = '#event-lastname',
eventEmail = '#event-email',
eventMobile = '#event-mobile',
eventBirthdate = '#event-birthdate',
eventGenderValidation = '#event-gender-validation',
eventFemale = '#event-gender-female',
eventMale = '#event-gender-male',
eventOther = '#event-gender-other'

// Details
const eventReferral = '#event-referral',
eventExperienceContainer = '.event-container.experience',
eventExperienceValidation = '#event-experience-validation',
eventExperienceYes = '#event-experience-yes',
eventExperienceNo = '#event-experience-no',
eventExperienceDetails = '#event-experience-details',
eventDietContainer = '.event-container.diet',
eventDietValidation = '#event-diet-validation',
eventDietYes = '#event-diet-yes',
eventDietNo = '#event-diet-no',
eventDietDetails = '#event-diet-details',
eventSpecialContainer = '.event-container.special',
eventSpecialValidation = '#event-special-validation',
eventSpecialYes = '#event-special-yes',
eventSpecialNo = '#event-special-no',
eventSpecialDetails = '#event-special-details'

// Affiliate Code
const eventAffiliateContainer = '.event-container.affiliate',
eventAffiliateCodeContainer = '.event-container.affiliate-code',
eventAffiliateValidation = '#event-affiliate-validation',
eventAffiliateYes = '#event-affiliate-yes',
eventAffiliateNo = '#event-affiliate-no',
eventAffiliateCode = '#event-affiliate-code',
eventAffiliatePass = '#event-affiliate-pass',
eventAffiliateFail = '#event-affiliate-fail'
const urlDiscountCode = urlString && urlString.affiliate
	? urlString.affiliate
	: null

// Event Status: Couples, Singles, Both
const eventStatus = '#event-status',
eventPartnerContainer = '.event-container.partner',
eventPartnerFirstName = '#event-partner-firstname',
eventPartnerLastName = '#event-partner-lastname',
eventPartnerGenderValidation = '#event-partner-gender-validation',
eventPartnerFemale = '#event-partner-gender-female',
eventPartnerMale = '#event-partner-gender-male',
eventPartnerOther = '#event-partner-gender-other',
eventPayValidation = '#event-pay-validation',
eventPayBoth = '#event-pay-both',
eventPayMe = '#event-pay-me'

// Registration options
const eventSelect = '#event-select',
eventOptions = getText('#event-options').split(' | '),
eventNotes = getText('#event-notes').includes('|')
	? getText('#event-notes').split('|')
	: getText('#event-notes').split(',')

// Pricing
const eventPrices = getText('#event-prices').split(' | '),
eventDepositContainer = '.event-container.deposit',
eventDepositValidation = '#event-deposit-validation',
eventDepositText = '#event-deposit-text',
eventDepositFull = '#event-deposit-full',
eventDepositDeposit = '#event-deposit-deposit',
eventAmountContainer = '.event-container.amount',
eventAmountDisplay = '#event-amount-display',
eventAmountShow = '#event-amount-show'

// Terms
const eventTermsValidation = '#event-terms-validation',
eventTerms = '#event-terms'

// Stripe billing variables
const billingFirstName = '#billing-firstname',
billingLastName = '#billing-lastname',
billingStreet = '#billing-street',
billingCity = '#billing-city',
billingState = '#billing-state',
billingPostal = '#billing-postal',
billingCountry = '#country',
billingCard = '#billing-card',
billingCardError = '#billing-card-error'

// Pay now
const paymentButton = '#payment-button'


const paymentButtonContinue = () => {
	emptyText(billingCardError)
	setCss(paymentButton, { 'background-color': '#800000' })
	setCss(paymentButton, { 'color': '#ffffff' })
}

const paymentButtonDisabled = () => {
	setCss(paymentButton, { 'background-color': '#f5f5f5' })
	setCss(paymentButton, { 'color': '#333333' })
}

// Invite-only event
const isInviteOnlyEvent = () => isVisible(eventInviteBox)

// # of participants
const participants = () => ((getValue($(eventStatus).find('option:selected')) === 'Couple') || (getValue($(eventStatus).find('option:selected')) === 'Two Singles (paired)')) ? 2 : 1

// # of people paid for
const paymentQty = () => participants() === 2 && isChecked(eventPayBoth) ? 2 : 1

// Deposit amount
const depositAmount = () => eventDepositAmount ? parseFloat(eventDepositAmount * paymentQty()).toFixed(2) : 0

// Final amount
const finalAmount = () => isChecked(eventDepositDeposit) && new Date() < new Date(eventDepositDate) ? depositAmount() : getValue(eventSelect)

// Create name of party
const partyName = () => {
	if (participants() === 2) {
		return getValue(eventLastName) === getValue(eventPartnerLastName)
			? getValue(eventFirstName) + ' & ' + getValue(eventPartnerFirstName) + ' ' + getValue(eventLastName)
			: getValue(eventFirstName) + ' ' + getValue(eventLastName) + ' & ' + getValue(eventPartnerFirstName) + ' ' + getValue(eventPartnerLastName)
	}
	return getValue(eventFirstName) + ' ' + getValue(eventLastName)
}

const showPartner = () => {
	showAndScrollTo(eventPartnerContainer)
}
const hidePartner = () => {
	emptyValue(eventPartnerFirstName)
	emptyValue(eventPartnerLastName)
	unCheckElement(eventPartnerFemale)
	unCheckElement(eventPartnerMale)
	unCheckElement(eventPartnerOther)
	unCheckElement(eventPayBoth)
	unCheckElement(eventPayMe)
	hideElement(eventPartnerContainer)
}

// Calculate discount based on discount code
const calculateDiscount = discountCode => {
	// New system, e.g. MADAC00TM1710FS
	const indicator = discountCode.replace(eventCode, '').substr(4,1)
	if (indicator === 'A' || indicator === 'B' || indicator === 'C') {
		const discount = discountCode.replace(eventCode, '').substr(4,3)
		switch (discount) {
			case 'C00': return 300
			case 'C25': return 275
			case 'C55': return 250
			case 'C75': return 225
			case 'B00': return 200
			case 'B25': return 175
			case 'B55': return 150
			case 'B75': return 125
			case 'A00': return 100
			case 'A25': return 75
			case 'A55': return 50
			case 'A75': return 25
			case 'A10': return 0
			default:		return null
		}
	}
	// Old system, e.g. MADA25TM1710FS
	else {
		const discount = parseInt(discountCode.substr(4, 2), 10) === 10
			// Assuming no discount, only to unlock event, e.g. ****10********
			? 0
			// With discount
			: 100 - parseInt(discountCode.substr(4, 2), 10)
		return (discount === 0 || discount === 25 || discount === 50 || discount === 75 || discount === 100) ? discount : null
	}
}

// Check to see if discount code applies to this event
const discountCodeValidation = () => {
	const discountCode = isInviteOnlyEvent() ? getValue(eventInviteCode) : getValue(eventAffiliateCode)
	return discountCode && discountCode.test(/[a-zA-Z0-9]{16,17}/igm) ? discountCode.substr(discountCode.length - eventCode.length).toLowerCase() === eventCode.toLowerCase() && calculateDiscount(discountCode) : null
}

// Get discount amount based on either invite field or affiliate code field
const getDiscount = () => discountCodeValidation() ? calculateDiscount(isInviteOnlyEvent() ? getValue(eventInviteCode) : getValue(eventAffiliateCode)) : null

//	Adds event options & prices based on CMS input
const setEventPrices = () => {
	// Remove final amount display
	emptyValue(eventAmountDisplay)
	hideElement(eventAmountContainer)
	// Reset event options
	emptySelect(eventSelect)
	if (eventOptions.length > 0) {
		appendSelect(eventSelect, '<option value=\'\'>Event option...</option>')
	}
	const people = paymentQty() === 2
			? 'for both'
			: 'per person'
	const paymentClarification = participants() === 2 ? ' ' + people : ''
	// Create dropdown
	for (let i = 0; i < eventOptions.length; i++) {
		// Event price cannot be less than $0 after discount is applied
		const eventSelectPrice = (eventPrices[i] - getDiscount()) * paymentQty() > 0
			? (eventPrices[i] - getDiscount()) * paymentQty()
			: 0
		const affiliateDiscountText = getDiscount() > 0
			? ' including discount'
			: ''
		const eventNote = eventNotes[i]
			? eventNotes[i]
			: ''
		const eventSelectText = eventOptions[i] + ' ($' + eventSelectPrice + paymentClarification + affiliateDiscountText + ')' + eventNote
		appendSelect(eventSelect, '<option value=\'' + eventSelectPrice + '\'>' + eventSelectText + '</option>')
	}
	// Update `Pay deposit only` field with actual deposit amount: `Pay deposit only ($...)`
	setText(eventDepositText, 'Pay deposit only ($' + depositAmount() + paymentClarification + ')')
}

// Complete validation
const formValidation = () => {

	// Name & Gender validation
	const personalValidation = () => {
		return (
			!isBlank(eventFirstName) && !getValue(eventFirstName).includes(' ') && !isBlank(eventLastName) && !getValue(eventLastName).includes(' ') && !isBlank(eventEmail) && !isBlank(eventMobile) && !isBlank(eventBirthdate) &&
			(isChecked(eventFemale) || isChecked(eventMale) || isChecked(eventOther))
		)
	}

	// Details validation
	const detailsValidation = () => {
		return (
			!isBlank(eventReferral)
			&& ((isChecked(eventExperienceYes) && !isBlank(eventExperienceDetails)) || isChecked(eventExperienceNo))
			&& ((isChecked(eventDietYes) && !isBlank(eventDietDetails)) || isChecked(eventDietNo))
			&& ((isChecked(eventSpecialYes) && !isBlank(eventSpecialDetails)) || isChecked(eventSpecialNo))
		)
	}

	// Partner validation
	const partnerValidation = () => {
		return (
			(
				participants() === 2
				&& !isBlank(eventPartnerFirstName) && !isBlank(eventPartnerLastName)
				&& (isChecked(eventPartnerFemale) || isChecked(eventPartnerMale) || isChecked(eventPartnerOther))
				&& (isChecked(eventPayBoth) || isChecked(eventPayMe))
			)
			|| participants() === 1
		)
	}

	// Event Options validation
	const eventOptionValidation = () => {
		return (
			getValue(eventSelect) && (
				(
					isVisible(eventDepositContainer)
					&& (isChecked(eventDepositFull) || isChecked(eventDepositDeposit))
				)
				|| !isVisible(eventDepositContainer)
			)
		)
	}

	// Terms validation
	const termsValidation = () => isChecked(eventTerms)

	// Billing validation
	const billingValidation = () => {
		return (
			!isBlank(billingFirstName) && !isBlank(billingLastName) && !isBlank(billingStreet) && !isBlank(billingCity)
			&& !isBlank(billingState) && !isBlank(billingPostal) && !isBlank(billingCountry) && isChecked(billingCard)
		)
	}

	if (
		discountCodeValidation() && personalValidation() && detailsValidation() && partnerValidation() && eventOptionValidation() && termsValidation() && billingValidation()
	) {
		// Change color of pay now button to red
		paymentButtonContinue()
		return true
	}
	// Change color of pay now button to grey
	paymentButtonDisabled()
	return false
}

// Show errors for affiliate code or invite code
const inviteOnlyCodeVerification = () => {
	// If the code exists, i.e. has either been entered manually or gotten from URL...
	if (getValue(eventInviteCode).length > 0) {
		// ...but if not valid...
		if (!discountCodeValidation()) {
			// ...hide reg form and indicate error.
			hideElement(eventRegForm)
			emptyHideText(eventInvitePass)
			const text = 'The invitation code you entered is invalid.\nFor assistance, please call us at 707-987-3456.'
			setHtml(eventInviteFail, text)
			showElement(eventInviteFail)
			focusElement(eventInviteCode)
		}
		// ...if code is valid...
		else {
			// ...show reg form and indicate pass.
			showElement(eventRegForm)
			emptyHideText(eventInviteFail)
			const text = calculateDiscount(getValue(eventInviteCode)) > 0
				? 'Congrats! Invite code accepted!<br />$' + calculateDiscount(getValue(eventInviteCode)) + ' per person discount applied! Continue below.'
				: 'Congrats! Invite code accepted!<br />Continue below.'
			setHtml(eventInvitePass, text)
			showAndScrollTo(eventInvitePass)
		}
	}
	// If code doesn’t exist, hide reg form.
	else {
		hideElement(eventRegForm)
		emptyHideText(eventInvitePass)
		emptyHideText(eventInviteFail)
	}
}

const affiliateCodeVerification = () => {
	// If `Do you have an affiliate code?` is checked...
	if (isChecked(eventAffiliateYes)) {
		// If the code exists, i.e. has either been entered manually or gotten from URL...
		if (getValue(eventAffiliateCode).length > 0) {
			// ...but if not valid...
			if (!discountCodeValidation()) {
				// ...indicate error.
				emptyHideText(eventAffiliatePass)
				const text = 'Sorry, you’ve entered an invalid affiliate code.'
				setHtml(eventAffiliateFail, text)
				showAndScrollTo(eventAffiliateFail)
				focusElement(eventAffiliateCode)
			}
			// ...if code is valid...
			else {
				// ...indicate pass.
				emptyHideText(eventAffiliateFail)
				const text = calculateDiscount(getValue(eventAffiliateCode)) > 0
					? 'Congrats! Code accepted!<br />$' + calculateDiscount(getValue(eventAffiliateCode)) + ' per person discount applied!'
					: 'Congrats! Code accepted!'
				setHtml(eventAffiliatePass, text)
				showAndScrollTo(eventAffiliatePass)
			}
		}
		// If code doesn’t exist, hide pass/fail messages.
		else {
			emptyHideText(eventAffiliatePass)
			emptyHideText(eventAffiliateFail)
		}
	}
}

const showErrorsInForm = () => {
	// Set CSS for errors and no errors
	const showError = element => isRadio(element)
		? setCss(element, { 'background-color': '#fdd' })
		: setCss(element, { 'border-color': '#b00000', 'background-color': '#fdd' })
	const clearError = element => isRadio(element)
		? setCss(element, { 'background-color': 'transparent' })
		: setCss(element, { 'border-color': '#ccc', 'background-color': '#fff' })
	const showClearError = ({ condition, element }) => {
		if (condition) {
			showError(element)
			if (!isRadio(element)) focusElement(element)
		}
		else clearError(element)
	}
	// Cycle through each element based on particular conditions
	showClearError({ condition: !discountCodeValidation(), element: eventInviteCode })
	showClearError({ condition: !isChecked(eventTerms), element: eventTermsValidation })
	showClearError({ condition: isVisible(eventDepositContainer) && !isChecked(eventDepositFull) && !isChecked(eventDepositDeposit), element: 'eventDepositValidation' })
	showClearError({ condition: participants() === 2 && !isChecked(eventPayBoth) && !isChecked(eventPayMe), element: eventPayValidation })
	showClearError({ condition: participants() === 2 && !isChecked(eventPartnerFemale) && !isChecked(eventPartnerMale) && !isChecked(eventPartnerOther), element: eventPartnerGenderValidation })
	showClearError({ condition: participants() === 2 && isBlank(eventPartnerFirstName), element: eventPartnerFirstName })
	showClearError({ condition: participants() === 2 && isBlank(eventPartnerLastName), element: eventPartnerLastName })
	showClearError({ condition: (isChecked(eventAffiliateYes) && isBlank(eventAffiliateCode)) || (!isChecked(eventAffiliateNo) && !isChecked(eventAffiliateYes)), element: eventAffiliateValidation })
	showClearError({ condition: !isChecked(eventSpecialYes) && !isChecked(eventSpecialNo), element: eventSpecialValidation })
	showClearError({ condition: isChecked(eventSpecialYes) && isBlank(eventSpecialDetails), element: eventSpecialDetails })
	showClearError({ condition: !isChecked(eventDietYes) && !isChecked(eventDietNo), element: eventDietValidation })
	showClearError({ condition: isChecked(eventDietYes) && isBlank(eventDietDetails), element: eventDietDetails })
	showClearError({ condition: !isChecked(eventExperienceYes) && !isChecked(eventExperienceNo), element: eventExperienceValidation })
	showClearError({ condition: isChecked(eventExperienceYes) && isBlank(eventExperienceDetails), element: eventExperienceDetails })
	showClearError({ condition: !isChecked(eventFemale) && !isChecked(eventMale) && !isChecked(eventOther), element: eventGenderValidation })
	$(eventForm).parsley().validate()
}



// RESET EVENT FORM
const resetForm = () => {

	// Reset all radio buttons
	checkElement(eventExperienceNo)
	checkElement(eventDietNo)
	checkElement(eventSpecialNo)
	checkElement(eventAffiliateNo)

	// Clear and repopulate form
	clearForm(page())
	repopulateForm(page())

	// Set event code for form submission
	setValue('#eventcode', eventCode)
	
	// Determines whether event is for both couples & singles, couples-only, or singles-only
	emptySelect(eventStatus)
	if (eventStatusRestriction === 'Couples only') {
		appendSelect(eventStatus, '<option value:\'\'>Register as...</option>')
		appendSelect(eventStatus, '<option value:\'Couple\'>Couple</option>')
		appendSelect(eventStatus, '<option value:\'Two Singles (paired)\'>Two Singles (paired)</option>')
	}
	else if (eventStatusRestriction === 'Singles only') {
		appendSelect(eventStatus, '<option value:\'Singles-only event\'>Single</option>')
	}
	else {
		appendSelect(eventStatus, '<option value:\'\'>Register as...</option>')
		appendSelect(eventStatus, '<option value:\'Couple\'>Couple</option>')
		appendSelect(eventStatus, '<option value:\'Single\'>Single</option>')
		appendSelect(eventStatus, '<option value:\'Two Singles (paired)\'>Two Singles (paired)</option>')
	}

	// Reset event prices
	setEventPrices()

	// Show or hide containers based on previous selection from repopulateForm()
	if (isChecked(eventAffiliateYes)) showAndScrollTo(eventAffiliateCodeContainer)
	else {
		emptyValue(eventAffiliateCode)
		hideElement(eventAffiliateCodeContainer)
	}
	if (isChecked(eventExperienceYes)) showAndScrollTo(eventExperienceContainer)
	else {
		emptyValue(eventExperienceDetails)
		hideElement(eventExperienceContainer)
	}
	if (isChecked(eventDietYes)) showAndScrollTo(eventDietContainer)
	else {
		emptyValue(eventDietDetails)
		hideElement(eventDietContainer)
	}
	if (isChecked(eventSpecialYes)) showAndScrollTo(eventSpecialContainer)
	else {
		emptyValue(eventSpecialDetails)
		hideElement(eventSpecialContainer)
	}
	
	// Show partner
	if (participants() === 2) showPartner()
	// Hide partner
	else hidePartner()

	// If event still lets registrant pay deposit, show deposit option...
	if (new Date() < new Date(eventDepositDate)) {
		showAndScrollTo(eventDepositContainer)
		checkElement(eventDepositFull)
	}
	// ...otherwise hide deposit option.
	else hideElement(eventDepositContainer)

	// If invite-only event...
	if (isInviteOnlyEvent()) {
		// ...hide pass/fail text
		emptyHideText(eventInvitePass)
		emptyHideText(eventInviteFail)
		// Hide the affiliate code box
		hideElement(eventAffiliateContainer)
		// If the URL has a discount code...
		if (urlDiscountCode) {
			// ...add the discount code from the URL into the invite code box
			setValue(eventInviteCode, urlDiscountCode)
		}
		// If invite-only event, hide registration form until successful invite code has been entered.
		inviteOnlyCodeVerification()
	}
	// Else, if event is open to anyone...
	else {
		// ...show the affiliate code box
		showAndScrollTo(eventAffiliateContainer)
		// If the URL has a discount code...
		if (urlDiscountCode) {
			// ...check the affiliate radio button...
			checkElement(eventAffiliateYes)
			// ...show whether the affiliate code is valid or invalid...
			showAndScrollTo(eventAffiliateCodeContainer)
			// ...and add the discount code from the URL into the affiliate code box.
			setValue(eventAffiliateCode, urlDiscountCode)
		}
		// Make sure event reg form is shown if public event, and verify affiliate code, if any.
		affiliateCodeVerification()
	}

	// Adjust prices
	setEventPrices()

	// Make sure Terms and Conditions is unchecked
	unCheckElement(eventTerms)

	// And reset Pay Now button.
	paymentButtonDisabled()

	// Connect the error checking function to the form...
	$(eventForm).parsley()
	// ...and show it.
	showElement(eventForm)

}


// BEGIN
if (page() === 'Event' || page() === 'Update') {
	resetForm()
}