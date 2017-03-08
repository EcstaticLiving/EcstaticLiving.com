// Declarations Module

//	DECLARATIONS
//	General
const
$main = $('.main'),
$mainSection = $('.main-section'),

//	Nav Menu
$navMenu = $('.navigation-menu'),
$navContainer = $('.nav-container'),
$navClose = $('.close-menu.nav-menu'),

//	Intro Modal
$introModal = $('.modals.introduction'),
$introModalWindow = $('.modal-window.introduction'),

//	Contact Modal
$contactModal = $('.modals.contact'),
$contactForm = $('.contact-form'),
$contactSection = $('.contact-section'),
$receivedSection = $('.received-section'),

//	Register Modal
$registerModal = $('.modals.register'),
$registerModalMobile = $('.modals.register-mobile'),
$modalBackground = $('.modal-background'),
$registerForm = $('.form.registration.desktop'),
$registerFormMobile = $('.form.registration.mobile'),
$registrationSection = $('.registration-section.desktop'),
$registrationSectionMobile = $('.registration-section.mobile'),
$customChargeForm = $('.form.custom-charge.desktop'),
$customChargeFormMobile = $('.form.custom-charge.mobile'),
$paymentSection = $('.payment-section.desktop'),
$paymentSectionMobile = $('.payment-section.mobile'),
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
