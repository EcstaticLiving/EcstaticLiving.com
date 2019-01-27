// Webflow code to submit form

const verification = (t, e, n, i) => {
	let r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/;
	return e === 'password' ? r = 'Passwords cannot be submitted.' : getAttribute(t,'required') && (i ? (k.test(n) || k.test(getAttribute(t,'type'))) && (_.test(i) || (r = 'Please enter a valid email address for: ' + n)) : r = 'Please fill out the required field: ' + n), r
}

const conversion = (e, n) => {
	let i = null
	console.log(e[0])
	console.log(e.find(':input:not([type=\'submit\'])'))
	return n = n || {}, e.find(':input:not([type=\'submit\'])').each((r, o) => {
		let a = getElementById(o)
		const name = getAttribute(a,'name')
		let s = getAttribute(a,'type'),
			u = getAttribute(a,'data-name') || name || 'Field ' + (r + 1),
			l = getValue(a)
		if (s === 'checkbox' && (l = isChecked(a)), s === 'radio') {
			if (null === n[u] || typeof n[u] == 'string') return;
			l = getValue(e.find('input[name="' + name + '"]:checked')) || null
		}
		typeof l == 'string' && (l = $.trim(l)), n[u] = l, i = i || verification(a, s, u, l)
	}), i
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
	console.log(error)
	if (error) {
		console.error(error)
		throw error
	}
	console.log('Form data:', formData)
	return formData
}