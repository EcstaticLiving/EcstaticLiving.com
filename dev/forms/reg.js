// Event Reg Form
const eventForm = getElementByClassName('reg-form', 0)

// Hidden fields
const eventCode = getText(getElementById('event-code')).toUpperCase(),
eventTitle = getText(getElementById('event-name')),
eventDates = getText(getElementById('event-dates')),
eventVenue = getText(getElementById('event-venue')),
eventDepositAmount = parseFloat(getText(getElementById('event-deposit-amount'))).toFixed(2),
eventDepositDate = getText(getElementById('event-deposit-date')),
eventBasePrice = parseFloat(getText(getElementById('event-base-price'))).toFixed(2),
eventBaseCost = parseFloat(getText(getElementById('event-base-cost'))).toFixed(2),
eventStatusRestriction = getText(getElementById('event-status-restriction'))

// Event form
const eventRegForm = getElementByClassName('event-container reg-form')

// Invite-only
const eventInviteButton = getElementById('event-invitecode-button'),
eventInviteBox = getElementById('event-invitecode-box'),
eventInviteCode = getElementById('event-invitecode-code'),
eventInvitePass = getElementById('event-invitecode-pass'),
eventInviteFail = getElementById('event-invitecode-fail')

// Personal
const eventFirstName = getElementById('event-firstname'),
eventLastName = getElementById('event-lastname'),
eventEmail = getElementById('event-email'),
eventMobile = getElementById('event-mobile'),
eventBirthdate = getElementById('event-birthdate'),
eventGenderValidation = getElementById('event-gender-validation'),
eventFemale = getElementById('event-gender-female'),
eventMale = getElementById('event-gender-male'),
eventOther = getElementById('event-gender-other')

// Details
const eventReferral = getElementById('event-referral'),
eventExperienceContainer = getElementByClassName('event-container experience'),
eventExperienceValidation = getElementById('event-experience-validation'),
eventExperienceYes = getElementById('event-experience-yes'),
eventExperienceNo = getElementById('event-experience-no'),
eventExperienceDetails = getElementById('event-experience-details'),
eventDietContainer = getElementByClassName('event-container diet'),
eventDietValidation = getElementById('event-diet-validation'),
eventDietYes = getElementById('event-diet-yes'),
eventDietNo = getElementById('event-diet-no'),
eventDietDetails = getElementById('event-diet-details'),
eventSpecialContainer = getElementByClassName('event-container special'),
eventSpecialValidation = getElementById('event-special-validation'),
eventSpecialYes = getElementById('event-special-yes'),
eventSpecialNo = getElementById('event-special-no'),
eventSpecialDetails = getElementById('event-special-details')

// Affiliate Code
const eventAffiliateContainer = getElementByClassName('event-container affiliate'),
eventAffiliateCodeContainer = getElementByClassName('event-container affiliate-code'),
eventAffiliateValidation = getElementById('event-affiliate-validation'),
eventAffiliateYes = getElementById('event-affiliate-yes'),
eventAffiliateNo = getElementById('event-affiliate-no'),
eventAffiliateCode = getElementById('event-affiliate-code'),
eventAffiliatePass = getElementById('event-affiliate-pass'),
eventAffiliateFail = getElementById('event-affiliate-fail')
const urlDiscountCode = urlString && urlString.affiliate
	? urlString.affiliate
	: null

// Event Status: Couples, Singles, Both
const eventStatus = getElementById('event-status'),
eventPartnerContainer = getElementByClassName('event-container partner'),
eventPartnerFirstName = getElementById('event-partner-firstname'),
eventPartnerLastName = getElementById('event-partner-lastname'),
eventPartnerGenderValidation = getElementById('event-partner-gender-validation'),
eventPartnerFemale = getElementById('event-partner-gender-female'),
eventPartnerMale = getElementById('event-partner-gender-male'),
eventPartnerOther = getElementById('event-partner-gender-other'),
eventPayValidation = getElementById('event-pay-validation'),
eventPayBoth = getElementById('event-pay-both'),
eventPayMe = getElementById('event-pay-me')

// Registration options
const eventOption = getElementById('event-option'),
eventOptions = getText(getElementById('event-options')).split(' | '),
eventNotes = getText(getElementById('event-notes')).includes('|')
	? getText(getElementById('event-notes')).split('|')
	: getText(getElementById('event-notes')).split(',')

// Pricing
const eventPrices = getText(getElementById('event-prices')).split(' | '),
eventDepositContainer = getElementByClassName('event-container deposit'),
eventDepositValidation = getElementById('event-deposit-validation'),
eventDepositText = getElementById('event-deposit-text'),
eventDepositFull = getElementById('event-deposit-full'),
eventDepositDeposit = getElementById('event-deposit-deposit'),
eventAmountContainer = getElementByClassName('event-container amount'),
eventAmountDisplay = getElementById('event-amount-display'),
eventAmountShow = getElementById('event-amount-show')

// Terms
const eventTermsValidation = getElementById('event-terms-validation'),
eventTerms = getElementById('event-terms')

// Stripe billing variables
const billingFirstName = getElementById('billing-firstname'),
billingLastName = getElementById('billing-lastname'),
billingStreet = getElementById('billing-street'),
billingCity = getElementById('billing-city'),
billingState = getElementById('billing-state'),
billingPostal = getElementById('billing-postal'),
billingCountry = getElementById('country'),
billingCard = getElementById('billing-card'),
billingCardError = getElementById('billing-card-error')

// Pay now
const paymentButton = getElementById('payment-button')


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
const participants = () => ((getValue(eventStatus) === 'Couple') || (getValue(eventStatus) === 'Two Singles (paired)')) ? 2 : 1

// # of people paid for
const paymentQty = () => participants() === 2 && isChecked(eventPayBoth) ? 2 : 1

// Deposit amount
const depositAmount = () => eventDepositAmount ? parseFloat(eventDepositAmount * paymentQty()).toFixed(2) : 0

// Final amount
const finalAmount = () => isChecked(eventDepositDeposit) && new Date() < new Date(eventDepositDate) ? depositAmount() : getValue(eventOption)

// Get lodging code
const getLodging = () => eventOptions[getIndex(eventOption) - 1]

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
	// const regex = new RegExp("([a-zA-Z0-9]){16,17}$")
	return discountCode && discountCode.length > 0 ? discountCode.substr(discountCode.length - eventCode.length).toLowerCase() === eventCode.toLowerCase() && calculateDiscount(discountCode) : true
}

// Get discount amount based on either invite field or affiliate code field
const getDiscount = () => discountCodeValidation() ? calculateDiscount(isInviteOnlyEvent() ? getValue(eventInviteCode) : getValue(eventAffiliateCode)) : null

//	Adds event options & prices based on CMS input
const setEventPrices = () => {
	// Remove final amount display
	emptyValue(eventAmountDisplay)
	hideElement(eventAmountContainer)
	// Reset event options
	emptySelect(eventOption)
	let option = document.createElement('option')
	if (eventOptions.length > 0) {
		option.text = 'Event option...'
		option.value = ''
		appendSelect(eventOption, option)
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
		option.text = eventOptions[i] + ' ($' + eventSelectPrice + paymentClarification + affiliateDiscountText + ')' + eventNote
		option.value = eventSelectPrice
		appendSelect(eventOption, option)
	}
	// Update `Pay deposit only` field with actual deposit amount: `Pay deposit only ($...)`
	setText(eventDepositText, 'Pay deposit only ($' + parseInt(depositAmount(), 10) + paymentClarification + ')')
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
			getValue(eventOption) && (
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
	formErrorValidation(eventForm)
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
	setValue(getElementById('eventcode'), eventCode)
	
	// Determines whether event is for both couples & singles, couples-only, or singles-only
	emptySelect(eventStatus)
	let option = document.createElement('option')
	if (eventStatusRestriction === 'Couples only') {
		option.text = 'Register as...'
		option.value = ''
		appendSelect(eventStatus, option)
		option.text = 'Couple'
		option.value = 'Couple'
		appendSelect(eventStatus, option)
		option.text = 'Two Singles (paired)'
		option.value = 'Two Singles (paired)'
		appendSelect(eventStatus, option)
	}
	else if (eventStatusRestriction === 'Singles only') {
		option.text = 'Single'
		option.value = 'Singles-only event'
		appendSelect(eventStatus, option)
	}
	else {
		option.text = 'Register as...'
		option.value = ''
		appendSelect(eventStatus, option)
		option.text = 'Couple'
		option.value = 'Couple'
		appendSelect(eventStatus, option)
		option.text = 'Single'
		option.value = 'Single'
		appendSelect(eventStatus, option)
		option.text = 'Two Singles (paired)'
		option.value = 'Two Singles (paired)'
		appendSelect(eventStatus, option)
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
	formErrorInit(eventForm)
	// ...and show it.
	showElement(eventForm)

}


// BEGIN
if (page() === 'Event' || page() === 'Update') {
	resetForm()
}