// Declarations Module

// DECLARATIONS
// General
const $main = $('.main'),
$mainSection = $('.main-section'),

// Nav Menu
$navMenu = $('.navigation-menu'),
$navContainer = $('.nav-container'),

// Contact
$contactForm = $('.contact-form'),
$contactSection = $('.contact-section'),
$receivedSection = $('.received-section'),

// Custom Charge
$customChargeForm = $('.form.custom-charge'),

// Registration
$registrationSection = $('.registration-section'),
$confirmationSection = $('.confirmation-section'),
$registerForm = $('.form.registration'),
eventCode = $('#event-code').text().toLowerCase(),
eventTitle = $('#event-name').text(), // Stripe description
eventStartDate = $('#event-start').text(),
eventDates = $('#event-dates').text(),
eventVenue = $('#event-venue').text(),
eventDepositAmount = $('#event-deposit-amount').text(),
eventDepositDate = $('#event-deposit-date').text(),
eventLodgingOptions = $('#event-lodging-options').text(),
eventLodgingPrices = $('#event-lodging-prices').text(),
eventStripe = $('#event-stripe').text()

// Event initialization
const eventButton = '.button.pay',
eventFirstName = '#event-firstname',
eventLastName = '#event-lastname',
eventEmail = '#event-email',
eventMobile = '#event-mobile',
eventBirthdate = '#event-birthdate',
eventFemale = '#event-gender-female',
eventMale = '#event-gender-male',
eventOther = '#event-gender-other',
eventReferral = '#event-referral',
eventExperienceContainer = '.form-row.event-experience',
eventExperienceYes = '#event-experience-yes',
eventExperienceNo = '#event-experience-no',
eventExperienceDetails = '#event-experience-details',
eventDietContainer = '.form-row.event-diet',
eventDietYes = '#event-diet-yes',
eventDietNo = '#event-diet-no',
eventDietDetails = '#event-diet-details'
eventStatus = '#event-status',
eventPartnerContainer = '.form-row.event-partner',
eventPartnerName = '#event-partner-name'
eventPartnerFemale = '#event-partner-gender-female',
eventPartnerMale = '#event-partner-gender-male',
eventPartnerOther = '#event-partner-gender-other',
eventPayBoth = '#event-pay-both',
eventPayMe = '#event-pay-me',
eventLodging = '#event-lodging',
eventDepositContainer = '.form-row-vertical.event-deposit'
eventDepositText = '#event-deposit-text',
eventDepositFull = '#event-deposit-full',
eventDepositDeposit = '#event-deposit-deposit',
eventTerms = '#event-terms',

regContinue = '.button.register-continue',
regReturn = '.register-return',
regPayNow = '.button.register-paynow'
