if (page() === 'Event' || page() === 'Update') {
	// Load reg form scripts
	const baseScriptUrl = 'https://ecstaticliving.github.io/ecstaticliving.com/src/events/'
	const scripts = ['1-design', '2-elements', '3-emailbox', '4-functions', '5-onchange', '6-webflow', '7-payment']
	// Load scripts synchronously, one after another, to make sure hierarchy is respected.
	const loadScript = index => {
		let js = document.createElement('script')
		js.src = baseScriptUrl + scripts[index] + '.js'
		js.onload = () => {
			// Once final script has loaded, initialise
			if (scripts[index] === '7-payment') {
				resetForm()
			}
			else {
				loadScript(index + 1)
			}
		}
		document.head.appendChild(js)
	}
	loadScript(0)
}