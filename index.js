/*
Code ©2018 Ecstatic Living Institute. All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
var Webflow = Webflow || [];
Webflow.push(function () {
	try {
		var script = document.createElement('script')
		script.type = 'text/javascript'
		// Load test code
		if (window.location.href.indexOf('ecstaticliving.webflow.io') > -1) {
			script.src = 'https://ecstaticliving.github.io/ecstaticliving.com/test.js'
		} else
		// Load public code
		if (window.location.href.indexOf('ecstaticliving.com') > -1) {
			script.src = 'https://ecstaticliving.github.io/ecstaticliving.com/live.js'
		}
		document.getElementsByTagName('head')[0].appendChild(script)
	}
	catch(err) {
		alert(err)
	}
})
