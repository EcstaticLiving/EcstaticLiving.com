// Nav Module
const $navButton = $('.menu-icon')
const $navClose = $('.nav-close')

//	NAV MENU
$navButton.on('click', function() {
	//	If nav menu is opened
	if ($navClose.is(':hidden')) {
		$navContainer.show().animate({
			marginLeft: '0%'
		}, 500)
		$navClose.fadeTo(1000, 1).show()
	} else {
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
	if (($registerModal.is(':visible')) || ($confirmationModal.is(':visible')) || ($contactModal.is(':visible'))) {
		$registerModal.fadeOut()
		$confirmationModal.fadeOut()
		$contactModal.fadeOut()
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
