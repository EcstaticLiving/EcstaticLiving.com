//	INTRO MODAL
$('#button-modal-intro').on('click', function() {
	if ($(window).width() < 768) {
		window.open(`${siteUrl}mobile/introduction`)
	} //	If on mobile, open “Introduction” window instead of modal
	else {
		$modalBackground.css('position', 'fixed')
		$introModal.fadeTo(500, 1)
	}
})
