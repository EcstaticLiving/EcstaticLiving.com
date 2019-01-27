// Webflow code to submit form

const verification = (t, e, n, i) => {
	let r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/;
	return e === 'password' ? r = 'Passwords cannot be submitted.' : getAttribute(t,'required') && (i ? (k.test(n) || k.test(getAttribute(t,'type'))) && (_.test(i) || (r = 'Please enter a valid email address for: ' + n)) : r = 'Please fill out the required field: ' + n), r
}

const conversion = (e, n) => {
	let i = null
	for (r=0; r<e[0].elements.length; r++) {
		console.log('test #1')
		const o = e[0].elements[r][0]
		if (!o || !getValue(o)) continue
		console.log(o)
		let a = getElementById(o),
			s = getAttribute(a,'type'),
			u = getAttribute(a,'data-name') || getAttribute(a,'name') || 'Field ' + (r + 1),
			l = getValue(a)
		console.log('test #2')
		if (s === 'checkbox' && (l = isChecked(a)), s === 'radio') {
			if (n[u] === null || typeof n[u] == 'string' || s == 'submit') return;
			l = getValue(e.find('input[name="' + getAttribute(a,'name') + '"]:checked')) || null
		}
		console.log('test #3')
		typeof l == 'string' && (l = l.trim()), n[u] = l, i = i || verification(a, s, u, l)
		console.log('test #4')
	}
	return n = n || {}, i
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