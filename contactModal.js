// Contact Module

//	CONTACT
function clearContactModal() {
	$receivedSection.fadeTo(500, 0)
	$receivedSection.hide()
	$contactSection.fadeTo(500, 1)
	$contactSection.show()
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	$contactForm.show()
}
//	When “Contact Us” button is clicked
$('.modal-contact-trigger').on('click', function() {
	if ($navClose.is(':visible')) {
		$navButton.trigger('click')
	}
	clearContactModal()
	window.open(`${siteUrl}contact`)
})
if (window.location.href.indexOf('/contact') != -1) {
	clearContactModal()
}
//	Contact form complete, send user to confirmation
$('.button.contact').on('click', function() {
	$contactForm.parsley()
	if ($contactForm.parsley().validate()) {
		$contactForm.submit()
		$contactSection.fadeTo(500, 0)
		$contactSection.hide()
		$receivedSection.show()
		$receivedSection.fadeTo(500, 1)
	}
})
$('.button.contact-close').on('click', function() {
	if (window.location.href.indexOf('/contact') > -1) {
		window.close()
	} else {
		$contactModal.fadeTo(500, 0).hide()
	}
})
