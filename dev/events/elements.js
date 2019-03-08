// Urls
const containsUrl = str => window.location.href.indexOf(str) > -1
const endsWithUrl = str => window.location.href.endsWith(str)

// Return url search keys and values
const urlString = Object.assign({}, ...window.location.search.slice(1).split('&').map(item => {
	const property = item.split('=')[0]
	return { [property]: item.split('=')[1] }
}))

// Page
const page = () => {
  if (containsUrl('/events/'))  					return 'Event'
  if (endsWithUrl('/update'))  						return 'Update'
  return null
}

// Form page
const isFormPage = () => page() === 'Event' || page() === 'Update'

// Event Reg Form
const webflowRegForm = getElementByClassName('reg-form', 0)
const regForm = getElementByClassName('container reg-form')

// Hidden fields
const eventCode = getText(getElementById('event-code')).toUpperCase(),
eventName = getText(getElementById('event-name')),
eventDates = getText(getElementById('event-dates')),
eventVenue = getText(getElementById('event-venue')),
eventDepositAmount = parseFloat(getText(getElementById('event-deposit-amount'))).toFixed(2),
eventDepositDate = getText(getElementById('event-deposit-date')),
eventBasePrice = parseFloat(getText(getElementById('event-base-price'))).toFixed(2),
eventBaseCost = parseFloat(getText(getElementById('event-base-cost'))).toFixed(2),
eventStatusRestriction = getText(getElementById('event-status-restriction'))

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
eventExperienceContainer = getElementByClassName('container experience'),
eventExperienceValidation = getElementById('event-experience-validation'),
eventExperienceYes = getElementById('event-experience-yes'),
eventExperienceNo = getElementById('event-experience-no'),
eventExperienceDetails = getElementById('event-experience-details'),
eventDietContainer = getElementByClassName('container diet'),
eventDietValidation = getElementById('event-diet-validation'),
eventDietYes = getElementById('event-diet-yes'),
eventDietNo = getElementById('event-diet-no'),
eventDietDetails = getElementById('event-diet-details'),
eventSpecialContainer = getElementByClassName('container special'),
eventSpecialValidation = getElementById('event-special-validation'),
eventSpecialYes = getElementById('event-special-yes'),
eventSpecialNo = getElementById('event-special-no'),
eventSpecialDetails = getElementById('event-special-details')

// Affiliate Code
const eventAffiliateContainer = getElementByClassName('container affiliate'),
eventAffiliateCodeContainer = getElementByClassName('container affiliate-code'),
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
eventPartnerContainer = getElementByClassName('container partner'),
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
eventDepositContainer = getElementByClassName('container deposit'),
eventDepositValidation = getElementById('event-deposit-validation'),
eventDepositText = getElementById('event-deposit-text'),
eventDepositFull = getElementById('event-deposit-full'),
eventDepositDeposit = getElementById('event-deposit-deposit'),
eventAmountContainer = getElementByClassName('container amount'),
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