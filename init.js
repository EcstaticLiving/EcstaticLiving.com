// Initialization Module
const siteUrl = 'https://www.ecstaticliving.com/'

//	INITIALIZE
function initialize() {
	if (Math.min($(window).width(), $(window).height()) >= 320) {
		device = 'mobile'
	}
	if (Math.min($(window).width(), $(window).height()) >= 641) {
		device = 'tablet'
	}
	//	Some large tablets exist, but for all intents and purposes, we’ll treat them as desktops.
	if (Math.max($(window).width(), $(window).height()) >= 1025) {
		device = 'desktop'
	}
	if ($(window).width() > $(window).height()) {
		deviceOrientation = 'landscape'
	} else {
		deviceOrientation = 'portrait'
	}
	if (device == 'tablet') {
		//	Remove featured workshop on Reg Modal for tablets
		$('#register-column').css({ 'width': '100%' })
		$('#feature-column').hide()
		if (deviceOrientation == 'landscape') {
			//	Increase side padding for small screen
			$mainSection.css({
				'padding-left': '100px',
				'padding-right': '100px'
			})
			$registerModal.css({
				'padding-left': '190px',
				'padding-right': '190px'
			})
		} else {
			$mainSection.css({
				'padding-left': '30px',
				'padding-right': '30px'
			})
			$registerModal.css({
				'padding-left': '0px',
				'padding-right': '0px'
			})
		}
	}
}

$(window).on('load orientationchange', function() {
	initialize()
})
if (window.location.href == `${siteUrl} #1`) {
	$('#header-tab-1').click()
}
if (window.location.href == `${siteUrl} #2`) {
	$('#header-tab-2').click()
}
if (window.location.href == `${siteUrl} #3`) {
	$('#header-tab-3').click()
}
if (window.location.href == `${siteUrl} #4`) {
	$('#header-tab-4').click()
}
