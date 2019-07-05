// Uses webtask.io
// wt create ./recaptcha/recaptcha.js --secret secretkey=__KEY__ --meta 'wt-node-dependencies'='{"centra":"latest"}'

module.exports = (body, callback) => {
	const c = require('centra')

	const promise = new Promise((resolve, reject) => {
		if (!body.token) throw new Error('Missing reCAPTCHA response.')
		const res = c('https://www.google.com/recaptcha/api/siteverify', 'POST')
			.query('secret', body.secrets.secretkey)
			.query('response', body.token)
			.query('remoteip', body.headers['x-forwarded-for'])
			.timeout(8000)
			.send()
		resolve(res)
	})

	promise.then(res => res.json()).then(res => console.log(res))
}
