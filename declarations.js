// Declarations Module

// DECLARATIONS
// General
const
$main = $('.main'),
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
eventCode = $('#Event-Code').text().toLowerCase(),
eventTitle = $('#Event-Name').text(), //	Needed for Stripe long description
eventStartDate = $('#Event-Start').text(),
eventDates = $('#Event-Dates').text(),
eventVenue = $('#Event-Venue').text(),
eventDeposit = $('#Event-Deposit').text(),
eventDepositDate = $('#Event-Deposit-Date').text(),
eventLodgingOptions = $('#Event-Lodging-Options').text(),
eventLodgingPrices = $('#Event-Lodging-Prices').text(),
eventStripe = $('#Event-Stripe').text()
