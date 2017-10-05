/*
Code ©2017 Ecstatic Living Institute All rights reserved.
Created by Conscious Apps Inc. www.consciousapps.com
*/
var Webflow = Webflow || [];
Webflow.push(function () {
	var head = document.getElementsByTagName('head')[0]
	var js = document.createElement('script')
	js.type = 'text/javascript'
	// Load test code
	if (window.location.href.indexOf('ecstaticliving.webflow.io') > -1) {
		js.src = 'test.js'
	} else
	// Load public code
	if (window.location.href.indexOf('ecstaticliving.com') > -1) {
		js.src = 'live.js'
	}
	head.appendChild(js)
})
