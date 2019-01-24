const initiateContactForm = () => {
	fadeTo('.received-section', 500, 0)
	hide('.received-section')
	fadeTo('.contact-section', 500, 1)
	show('.contact-section')
	hide('.w-form-done')
	hide('.w-form-fail')
	show('.contact-form')
}

const submitContactForm = () => {
	$('.contact-form').parsley()
	if ($('.contact-form').parsley().validate()) {
		$('.contact-form').submit()
		fadeTo('.contact-section', 500, 0)
		hide('.contact-section')
		show('.received-section')
		fadeTo('.received-section', 500, 1)
	}
}
initiateContactForm()
//	Contact form complete, send user to confirmation
$('.button.contact').on('click', () => submitContactForm())