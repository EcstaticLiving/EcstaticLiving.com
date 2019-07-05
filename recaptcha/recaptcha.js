// Uses webtask.io
// wt create ./recaptcha/recaptcha.js --secret secretkey=__KEY__ --meta 'wt-node-dependencies'='{"centra":"latest", "querystring":"latest", "url":"latest"}'

module.exports = (body, callback) => {
  const c = require('centra')
  const qs = require('querystring')
  const {URL} = require('url')

  const verify = async (token, remoteip) => {
		if (!token) throw new Error('Missing reCAPTCHA response.')
		const res = await c('https://www.google.com/recaptcha/api/siteverify', 'POST')
			.query('secret', body.secrets.secretkey)
			.query('response', token)
			.query('remoteip', remoteip || null)
			.timeout(8000)
			.send()
		const responseBody = await res.json()
		return responseBody.success || false
	}

  if (await verify(body.data.token)) {
    console.log('accepted')
  }
  else {
    console.log('denied')
  }
}
