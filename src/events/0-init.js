// Urls
const containsUrl = str => window.location.href.indexOf(str) > -1
const endsWithUrl = str => window.location.href.endsWith(str)

const page = () => {
	if (endsWithUrl('/')) return 'Home'
	if (containsUrl('/events/')) return 'Event'
	if (endsWithUrl('/teachers')) return 'Teachers'
	if (endsWithUrl('/update')) return 'Update'
	return null
}

if (page() === 'Event' || page() === 'Update') {
	// Load reg form scripts
	const baseScriptUrl =
		'https://ecstaticliving.github.io/ecstaticliving.com/src/events/'
	const scripts = [
		'1-design',
		'2-elements',
		'3-functions',
		'4-onchange',
		'5-webflow',
		'6-payment'
	]
	// Load scripts synchronously, one after another, to make sure hierarchy is respected.
	const loadScript = index => {
		let js = document.createElement('script')
		js.src = baseScriptUrl + scripts[index] + '.js'
		js.onload = () => {
			// Once final script has loaded, initialise
			if (index !== scripts.length - 1) {
				loadScript(index + 1)
			}
		}
		document.head.appendChild(js)
	}
	loadScript(0)
}
