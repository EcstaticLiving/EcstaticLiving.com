const formLoad = getElementById('form-load')
const formClear = getElementById('form-clear')

// Clear reg form
const clearForm = formType => {
	if (localStorage.getItem('EcstaticLiving:' + formType)) showElement(formLoad)
	else hideElement(formLoad)
	hideElement(formClear)
	hideElement(getElementByClassName('w-form-done'))
	hideElement(getElementByClassName('w-form-fail'))
	if (formType === 'Event') {
		formReset(regForm)
	} else if (formType === 'Update') {
		formReset(customForm)
	}
}

// Save reg form
const saveForm = formType => {
	let values = {}
	const elements = [
		...getElementsByTag('input'),
		...getElementsByTag('textarea'),
		...getElementsByTag('select')
	]
	elements.forEach(element => {
		const name = getAttribute(element, 'name')
		if (
			isChecked(element) ||
			(name &&
				name !== '#event-invitecode-code' &&
				name !== '#event-affiliate-code' &&
				name !== '#event-parnter-firstname' &&
				name !== '#event-parnter-lastname')
		) {
			values[name] = getValue(element)
		}
	})
	localStorage.setItem('EcstaticLiving:' + formType, JSON.stringify(values))
}

// Repopulate saved reg form
const repopulateForm = formType => {
	if (localStorage.getItem('EcstaticLiving:' + formType)) {
		hideElement(formLoad)
		showElement(formClear)
		let values = JSON.parse(localStorage.getItem('EcstaticLiving:' + formType))
		try {
			for (let item in values) {
				if (isRadio('*[name=' + item + ']')) {
					isChecked('input[name=' + item + '][value="' + values[item] + '"]')
				} else {
					setValue('*[name=' + item + ']', values[item])
				}
			}
		} catch (err) {
			localStorage.removeItem('EcstaticLiving:' + formType)
		}
	}
}

const paymentButtonContinue = () => {
	emptyText(billingCardError)
	paymentButton.classList.add('active')
}

const paymentButtonDisabled = () => {
	paymentButton.classList.remove('active')
}

// Invite-only event
const isInviteOnlyEvent = () => isVisible(eventInviteBox)

// # of participants
const participants = () =>
	getValue(eventStatus) === 'Couple' ||
	getValue(eventStatus) === 'Two Singles (paired)'
		? 2
		: 1

// # of people paid for
const paymentQty = () =>
	participants() === 2 && isChecked(eventPayBoth) ? 2 : 1

// Deposit amount
const depositAmount = () =>
	eventDepositAmount
		? parseFloat(eventDepositAmount * paymentQty()).toFixed(2)
		: 0

// Final amount
const finalAmount = () =>
	isChecked(eventDepositDeposit) && new Date() < new Date(eventDepositDate)
		? depositAmount()
		: getValue(eventOption)

// Get lodging code
const getLodging = () => eventOptions[getIndex(eventOption) - 1]

// Create name of party
const partyName = () => {
	if (participants() === 2) {
		return getValue(eventLastName) === getValue(eventPartnerLastName)
			? getValue(eventFirstName) +
					' & ' +
					getValue(eventPartnerFirstName) +
					' ' +
					getValue(eventLastName)
			: getValue(eventFirstName) +
					' ' +
					getValue(eventLastName) +
					' & ' +
					getValue(eventPartnerFirstName) +
					' ' +
					getValue(eventPartnerLastName)
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
	// New system, e.g. MADAC00TM1710FS: 4 digit unique + 3 digit discount + event code
	const indicator = discountCode.replace(eventCode, '').substr(4, 1)
	if (indicator === 'A' || indicator === 'B' || indicator === 'C') {
		const discount = discountCode.replace(eventCode, '').substr(4, 3)
		switch (discount) {
			case 'C00':
				return 300
			case 'C25':
				return 275
			case 'C55':
				return 250
			case 'C75':
				return 225
			case 'B00':
				return 200
			case 'B25':
				return 175
			case 'B55':
				return 150
			case 'B75':
				return 125
			case 'A00':
				return 100
			case 'A25':
				return 75
			case 'A55':
				return 50
			case 'A75':
				return 25
			case 'A10':
				return 0
			default:
				return null
		}
	}
	// Old system, e.g. MADA25TM1710FS: 4 digit unique + 2 digit discount + event code
	else {
		const discount =
			parseInt(discountCode.substr(4, 2), 10) === 10
				? // Assuming no discount, only to unlock event, e.g. ****10********
				  0
				: // With discount
				  100 - parseInt(discountCode.substr(4, 2), 10)
		return discount === 0 ||
			discount === 25 ||
			discount === 50 ||
			discount === 75 ||
			discount === 100
			? discount
			: null
	}
}

// Check to see if discount code applies to this event
const discountCodeValidation = () => {
	const code = isInviteOnlyEvent()
		? getValue(eventInviteCode)
		: getValue(eventAffiliateCode)
	// const regex = new RegExp("([a-zA-Z0-9]){16,17}$")
	return code && code.length > 0
		? // Each invite or affiliate code ends with event code
		  code.substr(code.length - eventCode.length).toLowerCase() ===
				eventCode.toLowerCase() && calculateDiscount(code) !== null
		: true
}

// Get discount amount based on either invite field or affiliate code field
const getDiscount = () =>
	discountCodeValidation()
		? calculateDiscount(
				isInviteOnlyEvent()
					? getValue(eventInviteCode)
					: getValue(eventAffiliateCode)
		  )
		: null

//	Adds event options & prices based on CMS input
const setEventPrices = () => {
	// Remove final amount display
	emptyValue(eventAmountDisplay)
	hideElement(eventAmountContainer)
	// Reset event options
	emptySelect(eventOption)
	let option = document.createElement('option')
	option.text = 'Event option...'
	option.value = ''
	appendSelect(eventOption, option)
	const people = paymentQty() === 2 ? 'for both' : 'per person'
	const paymentClarification = participants() === 2 ? ' ' + people : ''
	// Create dropdown
	for (let i = 0; i < eventOptions.length; i++) {
		let addOption = document.createElement('option')
		// Event price cannot be less than $0 after discount is applied
		const eventSelectPrice =
			(eventPrices[i] - getDiscount()) * paymentQty() > 0
				? (eventPrices[i] - getDiscount()) * paymentQty()
				: 0
		const affiliateDiscountText = getDiscount() > 0 ? ' including discount' : ''
		const eventNote = eventNotes[i] ? eventNotes[i] : ''
		addOption.text =
			eventOptions[i] +
			' ($' +
			eventSelectPrice +
			paymentClarification +
			affiliateDiscountText +
			')' +
			eventNote
		addOption.value = eventSelectPrice
		appendSelect(eventOption, addOption)
	}
	// Update `Pay deposit only` field with actual deposit amount: `Pay deposit only ($...)`
	setText(
		eventDepositText,
		'Pay deposit only ($' +
			parseInt(depositAmount(), 10) +
			paymentClarification +
			')'
	)
}

// Complete validation
const formValidation = () => {
	// Name & Gender validation
	const personalValidation = () => {
		return (
			!isBlank(eventFirstName) &&
			!getValue(eventFirstName).includes(' ') &&
			!isBlank(eventLastName) &&
			!getValue(eventLastName).includes(' ') &&
			!isBlank(eventEmail) &&
			!isBlank(eventMobile) &&
			!isBlank(eventBirthdate) &&
			(isChecked(eventFemale) || isChecked(eventMale) || isChecked(eventOther))
		)
	}

	// Details validation
	const detailsValidation = () => {
		return (
			!isBlank(eventReferral) &&
			((isChecked(eventExperienceYes) && !isBlank(eventExperienceDetails)) ||
				isChecked(eventExperienceNo)) &&
			((isChecked(eventDietYes) && !isBlank(eventDietDetails)) ||
				isChecked(eventDietNo)) &&
			((isChecked(eventSpecialYes) && !isBlank(eventSpecialDetails)) ||
				isChecked(eventSpecialNo))
		)
	}

	// Partner validation
	const partnerValidation = () => {
		return (
			(participants() === 2 &&
				!isBlank(eventPartnerFirstName) &&
				!isBlank(eventPartnerLastName) &&
				(isChecked(eventPartnerFemale) ||
					isChecked(eventPartnerMale) ||
					isChecked(eventPartnerOther)) &&
				(isChecked(eventPayBoth) || isChecked(eventPayMe))) ||
			participants() === 1
		)
	}

	// Event Options validation
	const eventOptionValidation = () => {
		return (
			getValue(eventOption) &&
			((isVisible(eventDepositContainer) &&
				(isChecked(eventDepositFull) || isChecked(eventDepositDeposit))) ||
				!isVisible(eventDepositContainer))
		)
	}

	// Terms validation
	const termsValidation = () => isChecked(eventTerms)

	// Billing validation
	const billingValidation = () => {
		return (
			!isBlank(billingFirstName) &&
			!isBlank(billingLastName) &&
			!isBlank(billingStreet) &&
			!isBlank(billingCity) &&
			!isBlank(billingState) &&
			!isBlank(billingPostal) &&
			!isBlank(billingCountry) &&
			isChecked(billingCard)
		)
	}

	// Show or hide errors in form
	if (DISPLAYERRORS) {
		showErrorsInForm()
	}

	if (
		discountCodeValidation() &&
		personalValidation() &&
		detailsValidation() &&
		partnerValidation() &&
		eventOptionValidation() &&
		termsValidation() &&
		billingValidation()
	) {
		// Change color of pay now button to red
		paymentButtonContinue()
		return true
	}
	// Change color of pay now button to grey
	paymentButtonDisabled()
	return false
}

const showRegFormHideInviteBox = () => {
	// Hide invite only field and button...
	hideElement(eventInviteCode)
	hideElement(eventInviteButton)
	// ...show reg form
	showElement(regFormVisibility)
}
const hideRegFormShowInviteBox = () => {
	// Show invite code box...
	showElement(eventInviteCode)
	showElement(eventInviteButton)
	// ...and hide reg form...
	hideElement(regFormVisibility)
}

// Show errors for affiliate code or invite code
const inviteOnlyCodeVerification = () => {
	// If the code exists, i.e. has either been entered manually or gotten from URL...
	if (getValue(eventInviteCode).length > 0) {
		// ...but if not valid...
		if (!discountCodeValidation()) {
			// ...hide reg form...
			hideRegFormShowInviteBox()
			// ...and indicate error.
			emptyHideText(eventInvitePass)
			const html =
				'The invitation code you entered is invalid.<br />For assistance, please call us at 707-987-3456.'
			setHtml(eventInviteFail, html)
			showElement(eventInviteFail)
			focusElement(eventInviteCode)
		}
		// ...if code is valid...
		else {
			// ...show reg form
			showRegFormHideInviteBox()
			// ...and hide any fail text...
			emptyHideText(eventInviteFail)
			// ...and indicate pass.
			const text =
				calculateDiscount(getValue(eventInviteCode)) > 0
					? 'Congrats! Invite code accepted!<br />$' +
					  calculateDiscount(getValue(eventInviteCode)) +
					  ' per person discount applied! Continue below.'
					: 'Congrats! Invite code accepted!<br />Continue below.'
			setHtml(eventInvitePass, text)
			showAndScrollTo(eventInvitePass)
		}
	}
	// If code doesn’t exist...
	else {
		// ...hide reg form...
		hideRegFormShowInviteBox()
		// ...and hide previous pass/fail messages
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
				const text =
					calculateDiscount(getValue(eventAffiliateCode)) > 0
						? 'Congrats! Code accepted!<br />$' +
						  calculateDiscount(getValue(eventAffiliateCode)) +
						  ' per person discount applied!'
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
	const showOrClearError = ({ condition, element, noborder = false }) => {
		// Set CSS for errors and no errors
		const cssError = {
			property: 'style',
			value: 'border: 1px solid #b00000; background-color: #fdd;'
		}
		const cssClear = noborder
			? {
					property: 'style',
					value: 'border: 0px solid transparent; background-color: #fff;'
			  }
			: {
					property: 'style',
					value: 'border: 1px solid #ccc; background-color: #fff;'
			  }
		setCss(element, condition ? cssError : cssClear)
	}
	// Cycle through each element based on particular conditions
	showOrClearError({
		condition: !discountCodeValidation(),
		element: eventInviteCode
	})
	showOrClearError({
		condition: !isChecked(billingCard),
		element: billingCardElement
	})
	showOrClearError({
		condition: !getValue(billingCountry),
		element: billingCountryValidation,
		noborder: true
	})
	showOrClearError({
		condition: !isValidAlphaNum(billingPostal),
		element: billingPostal
	})
	showOrClearError({
		condition: !isValidText(billingState),
		element: billingState
	})
	showOrClearError({
		condition: !isValidText(billingCity),
		element: billingCity
	})
	showOrClearError({
		condition: !isValidAlphaNum(billingStreet),
		element: billingStreet
	})
	showOrClearError({
		condition: !isValidText(billingLastName),
		element: billingLastName
	})
	showOrClearError({
		condition: !isValidText(billingFirstName),
		element: billingFirstName
	})
	showOrClearError({
		condition: !isChecked(eventTerms),
		element: eventTermsValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			isVisible(eventDepositContainer) &&
			!isChecked(eventDepositFull) &&
			!isChecked(eventDepositDeposit),
		element: eventDepositValidation,
		noborder: true
	})
	showOrClearError({
		condition: !getValue(eventOption),
		element: eventOptionValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			participants() === 2 &&
			!isChecked(eventPayBoth) &&
			!isChecked(eventPayMe),
		element: eventPayValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			participants() === 2 &&
			!isChecked(eventPartnerFemale) &&
			!isChecked(eventPartnerMale) &&
			!isChecked(eventPartnerOther),
		element: eventPartnerGenderValidation,
		noborder: true
	})
	showOrClearError({
		condition: participants() === 2 && !isValidText(eventPartnerFirstName),
		element: eventPartnerFirstName
	})
	showOrClearError({
		condition: participants() === 2 && !isValidText(eventPartnerLastName),
		element: eventPartnerLastName
	})
	showOrClearError({
		condition: !getValue(eventStatus),
		element: eventStatusValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			(isChecked(eventAffiliateYes) && isBlank(eventAffiliateCode)) ||
			(!isChecked(eventAffiliateNo) && !isChecked(eventAffiliateYes)),
		element: eventAffiliateValidation,
		noborder: true
	})
	showOrClearError({
		condition: !isChecked(eventSpecialYes) && !isChecked(eventSpecialNo),
		element: eventSpecialValidation,
		noborder: true
	})
	showOrClearError({
		condition: isChecked(eventSpecialYes) && !isValidText(eventSpecialDetails),
		element: eventSpecialDetails
	})
	showOrClearError({
		condition: !isChecked(eventDietYes) && !isChecked(eventDietNo),
		element: eventDietValidation,
		noborder: true
	})
	showOrClearError({
		condition: isChecked(eventDietYes) && !isValidText(eventDietDetails),
		element: eventDietDetails
	})
	showOrClearError({
		condition: !isChecked(eventExperienceYes) && !isChecked(eventExperienceNo),
		element: eventExperienceValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			isChecked(eventExperienceYes) && !isValidText(eventExperienceDetails),
		element: eventExperienceDetails
	})
	showOrClearError({
		condition: !getValue(eventReferral),
		element: eventReferralValidation,
		noborder: true
	})
	showOrClearError({
		condition:
			!isChecked(eventFemale) &&
			!isChecked(eventMale) &&
			!isChecked(eventOther),
		element: eventGenderValidation
	})
	showOrClearError({
		condition: !isValidDate(eventBirthdate),
		element: eventBirthdate
	})
	showOrClearError({
		condition: !isValidPhone(eventMobile),
		element: eventMobile
	})
	showOrClearError({
		condition: !isValidEmail(eventEmail),
		element: eventEmail
	})
	showOrClearError({
		condition: !isValidText(eventLastName),
		element: eventLastName
	})
	showOrClearError({
		condition: !isValidText(eventFirstName),
		element: eventFirstName
	})
	formErrorValidation(regForm)
}

// RESET EVENT FORM
const initForm = (clearAndRepopulate = true) => {
	// Reset all radio buttons
	checkElement(eventExperienceNo)
	checkElement(eventDietNo)
	checkElement(eventSpecialNo)
	checkElement(eventAffiliateNo)

	// Clear and repopulate form
	if (clearAndRepopulate) {
		clearForm(page())
		repopulateForm(page())
	}
	// unless reg form is pre-filled with other variables.
	else {
		hideElement(formLoad)
		showElement(formClear)
	}

	// Set event code for form submission
	setValue(getElementById('eventcode'), eventCode)

	// Determines whether event is for both couples & singles, couples-only, or singles-only
	emptySelect(eventStatus)
	if (eventStatusRestriction === 'Couples only') {
		let option = document.createElement('option')
		option.text = 'Register as...'
		option.value = ''
		appendSelect(eventStatus, option)
		option = document.createElement('option')
		option.text = 'Couple'
		option.value = 'Couple'
		appendSelect(eventStatus, option)
		option = document.createElement('option')
		option.text = 'Two Singles (paired)'
		option.value = 'Two Singles (paired)'
		appendSelect(eventStatus, option)
	} else if (eventStatusRestriction === 'Singles only') {
		let option = document.createElement('option')
		option.text = 'Single'
		option.value = 'Singles-only event'
		appendSelect(eventStatus, option)
	} else {
		let option = document.createElement('option')
		option.text = 'Register as...'
		option.value = ''
		appendSelect(eventStatus, option)
		option = document.createElement('option')
		option.text = 'Couple'
		option.value = 'Couple'
		appendSelect(eventStatus, option)
		option = document.createElement('option')
		option.text = 'Single'
		option.value = 'Single'
		appendSelect(eventStatus, option)
		option = document.createElement('option')
		option.text = 'Two Singles (paired)'
		option.value = 'Two Singles (paired)'
		appendSelect(eventStatus, option)
	}

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
	// formErrorInit(regForm)
	// ...and show it.
	showElement(regForm)
}
