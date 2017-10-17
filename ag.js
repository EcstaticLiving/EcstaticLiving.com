// Master
// Version 0.0.1

((window) => {
	'use strict'

	const init = () => {

		// GLOBAL VARIABLES
		var AG = {}

		// FETCH
		const fetchData = (action, server, data, callback) => {
			data.ag_action = action
			data.ag_domain = window.parent.location.hostname
			// Add and test security options: https://www.contextis.com/blog/security-http-headers
			const headers = new Headers({
				"X-Frame-Options": "DENY",
				"Strict-Transport-Security": "max-age=31536000",
				"X-XSS-Protection": "1; mode=block",
				"Content-Security-Policy": "script-src 'self'"
			})

			// Pass through to AffiliateGenius server:
			// - user server: data.ag_server
			// - user publicKey: data.ag_publicKey
			// - action: data.ag_action
			// - domain: data.ag_domain
			return new Promise((resolve, reject) => {
				window.fetch(server, {
					headers,
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({ data })
				})
					.then((response) => {
						if (response.status !== 200 || response.url !== server) {
							console.log(response)
							reject(response)
						}
						response.json()
							.then((jsonData) => resolve(jsonData))
							.catch((error) => {
								console.log(error)
								reject(error)
							})
					})
					.catch((error) => {
						console.log(error)
						reject(error)
					})
			})
		}

		// API CALLS
		const actions = ['getAllCodes', 'getAffiliateCodeData', 'consumeCode']
		actions.forEach((action) => {
			const AG_SERVER = 'https://wt-607887792589a1d1a518ce2c83b6dddd-0.run.webtask.io/ag_AffiliateGenius'
			AG[action] = (data, callback) => {
				fetchData(action, AG_SERVER, data, callback)
					.then((response) => {
						callback(response)
					})
			}
		})

		return AG

	}

	// LOAD API LIBRARY
	if (typeof(AG) === 'undefined') {
		window.AG = init()
	} else {
		console.log('An "AG" library has already defined elsewhere in your code.')
	}

})(window)
