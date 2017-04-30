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
