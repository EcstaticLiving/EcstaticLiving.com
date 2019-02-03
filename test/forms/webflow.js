// Webflow code to submit form
const conversion = (e, n) => {

	let i = null

	// n stores names already with values (good for checkbox/radio)
	n = n || {}

	const nodelist = e[0].querySelectorAll('input:not([type="submit"])')
	console.log(nodelist)

	nodelist.forEach((item, index) => {
		// If we already have an error, exit early
		if (i) {
			return
		}
		let s = item.type,
			u = item.getAttribute("data-name") || item.getAttribute("name") || "Field " + (index + 1),
			l = item.value

		// Checkbox/radio uses checked attribute and should be handled seperately
		if ("checkbox" === s ||"radio" === s) {
			// If we already have a value for radio/checkbox of this name, exit early
			if (null === n[u] || "string" == typeof n[u]) return
			// get value
			const elem = e[0].querySelector('input[name="' + item.getAttribute("name") + '"]:checked')
			l = elem && elem.value || null
		}

		if("string" == typeof l) {
			(l = l.trim())
		}
		n[u] = l
		i = verification(item, s, u, l)

	})

	return i

}

const verification = (item, e, n, i) => {
	let r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/
	if ("password" === e) {
		return "Passwords cannot be submitted."
	}
	if (!item.getAttribute("required")) {
		return r
	}
	if (!i){
		return "Please fill out the required field: " + n
	}
	if ((k.test(n) || k.test(item.getAttribute("type"))) && _.test(i)) {
		return "Please enter a valid email address for: " + n
	}
	return null
}

const createForm = () => {
	let formData = {
		name: page() === 'Event' ? 'Event Registration' : 'Custom Charge',
		source: window.location.href,
		test: false,
		fields: {},
		dolphin: false
	}
	let error = conversion(page() === 'Event' ? getElementById(eventForm) : getElementById(customForm), formData.fields)
	if (error) {
		throw error
	}
	console.log(formData)
	return formData
}
