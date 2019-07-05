// Uses webtask.io
// wt create ./recaptcha/recaptcha.js --secret secretkey=__KEY__ --meta 'wt-node-dependencies'='{"centra":"latest"}'

module.exports = (req, callback) => {
	const c = require('centra')

	const promise = new Promise((resolve, reject) => {
		if (!req.token) throw new Error('Missing reCAPTCHA response.')
		const res = c('https://www.google.com/recaptcha/api/siteverify', 'POST')
			.query('secret', req.secrets.secretkey)
			.query('response', req.body.token)
			.query('remoteip', req.headers['x-forwarded-for'])
			.timeout(8000)
			.send()
		resolve(res)
	})

	promise
		.then(res => res.json())
		.then(res => {
			console.log(res)
			callback(res)
		})
}
