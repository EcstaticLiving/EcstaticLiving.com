// Webflow code to submit form
const conversion = (e, n) => {
	let i = null;
	return n = n || {}, e.find(':input:not([type="submit"])').each((r, o) => {
		let a = $(o),
			s = a.attr("type"),
			u = a.attr("data-name") || a.attr("name") || "Field " + (r + 1),
			l = a.val()
		if ("checkbox" === s && (l = a.is(":checked")), "radio" === s) {
			if (null === n[u] || "string" == typeof n[u]) return;
			l = e.find('input[name="' + a.attr("name") + '"]:checked').val() || null
		}
		"string" == typeof l && (l = $.trim(l)), n[u] = l, i = i || verification(a, s, u, l)
	}), i
}

const verification = (t, e, n, i) => {
	let r = null, k = /e(-)?mail/i, _ = /^\S+@\S+$/;
	return "password" === e ? r = "Passwords cannot be submitted." : t.attr("required") && (i ? (k.test(n) || k.test(t.attr("type"))) && (_.test(i) || (r = "Please enter a valid email address for: " + n)) : r = "Please fill out the required field: " + n), r
}

const createForm = () => {
	let formData = {
		name: page() === 'Event' ? 'Event Registration' : 'Custom Charge',
		source: window.location.href,
		test: false,
		fields: {},
		dolphin: false
	}
	let error = conversion(page() === 'Event' ? $(eventForm) : $(customForm), formData.fields)
	if (error) {
		alert(error)
		throw error
	}
	return formData
}