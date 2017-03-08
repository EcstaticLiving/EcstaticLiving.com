//	NAV MENU
$navButton.on('click', function() {
	//	If nav menu is opened
	if ($navClose.is(':hidden')) {
		$modalBackground.css('position', 'fixed')
		if ((window.location.href == siteUrl) && ($('.top-marker').is(':visible'))) {
			$('.banner-container').hide()
		}
		$navContainer.show().animate({
			marginLeft: '0%'
		}, 500)
		$navClose.fadeTo(1000, 1).show()
	} else {
		$modalBackground.css('position', 'absolute')
		if ((window.location.href == siteUrl) && ($('.top-marker').is(':visible'))) {
			$('.banner-container').show()
		}
		$navContainer.animate({
			marginLeft: '100%'
		}, 500)
		$navClose.fadeTo(1000, 0).hide()
	}
})
//	If nav menu is closed
$navClose.on('click', function() {
	$navButton.trigger('click')
})

//	SOCIAL SHARE KIT
SocialShareKit.init({
	title: document.title
})

//	CLOSE MODALS, WINDOWS
function closeModals() {
	if (($registerModal.is(':visible')) || ($registerModalMobile.is(':visible')) || ($confirmationModal.is(':visible')) || ($contactModal.is(':visible')) || ($introModal.is(':visible'))) {
		$modalBackground.css('position', 'absolute')
		$registerModal.fadeOut()
		$registerModalMobile.fadeOut()
		$confirmationModal.fadeOut()
		$contactModal.fadeOut()
		$introModal.fadeOut()
	}
}
$('.close-modal, .button.notice, .button.contact-close, .close-mobile-reg').click(closeModals)
$('#registration-ok-button').on(closeModals)
$(document).keyup(function(e) {
	if (e.keyCode == 27) {
		closeModals()
	}
})
$('.close-event, .navigate-back').on('click', function() {
	if (document.referrer == '') {
		window.location.href = '/'
	} else {
		parent.history.back()
	}
	return false
})
