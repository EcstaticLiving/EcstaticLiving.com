//	CONTACT
if (window.location.href.indexOf('/contact') != -1) {
	$receivedSection.fadeTo(500, 0)
	$receivedSection.hide()
	$contactSection.fadeTo(500, 1)
	$contactSection.show()
	$('.w-form-done').hide()
	$('.w-form-fail').hide()
	$contactForm.show()
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
