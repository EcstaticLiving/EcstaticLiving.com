// Declarations Module

//	DECLARATIONS
//	General
const
$main = $('.main'),
$mainSection = $('.main-section'),

//	Nav Menu
$navMenu = $('.navigation-menu'),
$navContainer = $('.nav-container'),

//	Contact Modal
$contactForm = $('.contact-form'),
$contactSection = $('.contact-section'),
$receivedSection = $('.received-section'),

//	Register Modal
$registerModal = $('.modals.register'),
$mainContainer = $('.main-container'),
$registerForm = $('.form.registration'),
$registrationSection = $('.registration-section'),
$customChargeForm = $('.form.custom-charge'),
$paymentSection = $('.payment-section'),
$confirmationModal = $('.modals.confirmation'),
eventCode = $('.hidden.event-code').text().toLowerCase(),
eventTitle = $('.hidden.event-title').text(), //	Needed for Stripe long description
eventStartDate = $('.hidden.event-startdate').text(),
eventDates = $('.hidden.event-dates').text(),
eventVenue = $('.hidden.event-venue').text(),
eventDeposit = $('.hidden.event-deposit').text(),
eventDepositDue = isNaN(parseInt($('.hidden.event-depositdue').text(), 10)) ? 14 : parseInt($('.hidden.event-depositdue').text(), 10),
eventLodgingOptions = $('.hidden.event-lodgingoptions').text(),
eventLodgingPrices = $('.hidden.event-lodgingprices').text(),
eventStripeDescriptions = $('.hidden.event-stripedescriptions').text()
